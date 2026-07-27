/**
 * build-recipes.js
 * 扫描 recipes-market/ 文件夹，动态生成 index.json 和 recipes-data.js
 *
 * 用法: node build-recipes.js
 * 输出: recipes-market/index.json     (完整索引，含 by_app/by_tag/by_author)
 *       recipes-data.js               (浏览器端加载的 JS 数据文件)
 */

const fs = require('fs');
const path = require('path');

const MARKET_DIR = path.join(__dirname, 'recipes-market');
const INDEX_FILE = path.join(MARKET_DIR, 'index.json');
const OUTPUT_FILE = path.join(__dirname, 'recipes-data.js');

// 必填元数据字段
const REQUIRED_FIELDS = ['id', 'name', 'version', 'author', 'description', 'icon', 'links'];
const REQUIRED_LINK_FIELDS = ['app_id', 'app_name', 'min_version', 'role'];

// 预定义标签列表（用于警告不在列表中的标签）
const KNOWN_TAGS = new Set([
    'AI', 'CLI', '数据', '办公', '自动化', 'OCR', '翻译', 'IDE', '终端',
    '文件', '消息', '实时', '可视化', 'RPC', '多语言', '数据库', 'SQL',
    '网络', '调度', '日志', '监控', 'Git', 'CI', '视频', '多媒体', 'API',
    '配置', '邮件', 'PDF', '安全', 'IoT', '硬件', 'Docker', '容器',
    '设计', '金融', '语音', '分析', 'Markdown', '编辑器', '剪贴板', '工具',
    '日历', '图片', '批量', '代理', '密钥', '通知', '队列', '报告', 'ETL', '监控',
]);

let errors = 0;
let warnings = 0;

function error(msg) { console.error(`  ❌ ${msg}`); errors++; }
function warn(msg) { console.warn(`  ⚠️  ${msg}`); warnings++; }
function ok(msg) { console.log(`  ✅ ${msg}`); }

/**
 * 从 Python 文件中提取 @KNOTLINK_RECIPE / @END_KNOTLINK_RECIPE 块中的 JSON
 */
function parseRecipeMeta(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // 匹配 @KNOTLINK_RECIPE ... @END_KNOTLINK_RECIPE 之间的内容
    const match = content.match(/@KNOTLINK_RECIPE\s*\n([\s\S]*?)\n\s*@END_KNOTLINK_RECIPE/);
    if (!match) {
        error(`${filePath}: 未找到 @KNOTLINK_RECIPE 元数据块`);
        return null;
    }

    try {
        const meta = JSON.parse(match[1]);
        return meta;
    } catch (e) {
        error(`${filePath}: 元数据 JSON 解析失败: ${e.message}`);
        return null;
    }
}

/**
 * 校验单个配方的元数据
 */
function validateRecipe(meta, relPath) {
    if (!meta) return false;

    let valid = true;

    // 检查必填字段
    for (const field of REQUIRED_FIELDS) {
        if (!meta[field]) {
            error(`${relPath}: 缺少必填字段 "${field}"`);
            valid = false;
        }
    }

    // 校验 id 格式
    if (meta.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.id)) {
        error(`${relPath}: id 格式无效 "${meta.id}"（应为小写字母+数字+连字符）`);
        valid = false;
    }

    // 校验 version 格式（semver 宽松）
    if (meta.version && !/^\d+\.\d+\.\d+/.test(meta.version)) {
        warn(`${relPath}: version 格式建议使用 semver（如 1.2.0），当前为 "${meta.version}"`);
    }

    // 校验 icon
    if (meta.icon && typeof meta.icon === 'string' && meta.icon.length > 2) {
        warn(`${relPath}: icon 建议使用单个 emoji 字符，当前为 "${meta.icon}"`);
    }

    // 校验 tags
    if (meta.tags) {
        if (!Array.isArray(meta.tags)) {
            error(`${relPath}: tags 必须是数组`);
            valid = false;
        } else {
            if (meta.tags.length === 0) {
                warn(`${relPath}: tags 为空，建议至少添加 1 个标签`);
            }
            if (meta.tags.length > 5) {
                warn(`${relPath}: tags 超过 5 个（${meta.tags.length}），建议精简`);
            }
            for (const tag of meta.tags) {
                if (!KNOWN_TAGS.has(tag)) {
                    warn(`${relPath}: 标签 "${tag}" 不在预定义列表中，建议添加或更新列表`);
                }
            }
        }
    }

    // 校验 links
    if (meta.links) {
        if (!Array.isArray(meta.links)) {
            error(`${relPath}: links 必须是数组`);
            valid = false;
        } else if (meta.links.length === 0) {
            error(`${relPath}: links 至少需要一个联动应用`);
            valid = false;
        } else {
            for (let i = 0; i < meta.links.length; i++) {
                const link = meta.links[i];
                for (const field of REQUIRED_LINK_FIELDS) {
                    if (!link[field]) {
                        error(`${relPath}: links[${i}] 缺少字段 "${field}"`);
                        valid = false;
                    }
                }
                // app_id 格式校验（支持 0x 十六进制和倒置域名两种）
                if (link.app_id && !/^(0x[0-9A-Fa-f]{8}|[a-z0-9]+([.-][a-z0-9]+)*\.[a-z]{2,}(\.[a-z0-9]+)*)$/.test(link.app_id)) {
                    warn(`${relPath}: links[${i}].app_id 格式异常: "${link.app_id}"`);
                }
            }
        }
    }

    // 校验 author 与文件夹名一致
    const dirAuthor = relPath.split('/')[0];
    if (meta.author && meta.author !== dirAuthor) {
        warn(`${relPath}: author "${meta.author}" 与文件夹名 "${dirAuthor}" 不一致`);
    }

    return valid;
}

/**
 * 扫描 recipes-market/ 目录
 */
function scanRecipes() {
    const recipes = [];
    const seenIds = new Set();

    if (!fs.existsSync(MARKET_DIR)) {
        error(`recipes-market/ 目录不存在`);
        return recipes;
    }

    const authorDirs = fs.readdirSync(MARKET_DIR, { withFileTypes: true })
        .filter(e => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.'));

    if (authorDirs.length === 0) {
        console.log('  📁 recipes-market/ 暂无配方提交');
        return recipes;
    }

    for (const authorDir of authorDirs) {
        const authorPath = path.join(MARKET_DIR, authorDir.name);
        console.log(`  👤 ${authorDir.name}/`);

        const pyFiles = fs.readdirSync(authorPath, { withFileTypes: true })
            .filter(e => e.isFile() && e.name.endsWith('.py') && !e.name.startsWith('_'));

        if (pyFiles.length === 0) {
            console.log('    (无 .py 文件)');
            continue;
        }

        for (const pyFile of pyFiles) {
            const filePath = path.join(authorPath, pyFile.name);
            const relPath = `${authorDir.name}/${pyFile.name}`;
            console.log(`    📜 ${pyFile.name}`);

            const meta = parseRecipeMeta(filePath);
            if (!meta) continue;

            // 检查 id 重复
            if (seenIds.has(meta.id)) {
                error(`${relPath}: id "${meta.id}" 与已有配方重复`);
                continue;
            }
            seenIds.add(meta.id);

            // 校验
            const valid = validateRecipe(meta, relPath);

            // 构建配方记录（只保留网站所需字段 + 路径）
            const recipe = {
                id: meta.id,
                name: meta.name,
                version: meta.version,
                author: meta.author,
                description: meta.description,
                icon: meta.icon,
                tags: meta.tags || [],
                links: meta.links || [],
                license: meta.license || 'MIT',
                created: meta.created || '',
                updated: meta.updated || '',
                requires: meta.requires || null,
                path: relPath,
                valid: valid,
            };
            recipes.push(recipe);

            if (valid) {
                ok(`${meta.name} v${meta.version}`);
            }
        }
        console.log('');
    }

    return recipes;
}

/**
 * 构建反向索引
 */
function buildIndex(recipes) {
    const byApp = {};    // app_id → [recipe_path, ...]
    const byTag = {};    // tag → [recipe_path, ...]
    const byAuthor = {}; // author → [recipe_path, ...]

    for (const recipe of recipes) {
        const rp = recipe.path;

        // 按应用索引
        for (const link of recipe.links) {
            if (!byApp[link.app_id]) byApp[link.app_id] = [];
            if (!byApp[link.app_id].includes(rp)) {
                byApp[link.app_id].push(rp);
            }
        }

        // 按标签索引
        for (const tag of recipe.tags) {
            if (!byTag[tag]) byTag[tag] = [];
            if (!byTag[tag].includes(rp)) {
                byTag[tag].push(rp);
            }
        }

        // 按作者索引
        if (!byAuthor[recipe.author]) byAuthor[recipe.author] = [];
        if (!byAuthor[recipe.author].includes(rp)) {
            byAuthor[recipe.author].push(rp);
        }
    }

    return { byApp, byTag, byAuthor };
}

// =========================================
// 主流程
// =========================================
console.log('🔍 扫描 recipes-market/ 目录...\n');

const recipes = scanRecipes();
const validRecipes = recipes.filter(r => r.valid);

console.log(`\n📊 扫描完成: ${recipes.length} 个配方 (有效: ${validRecipes.length}, 错误: ${errors}, 警告: ${warnings})`);

if (errors > 0) {
    console.log('\n⚠️  存在错误，仍将生成索引（无效配方已标记）。请修复后重新运行。\n');
}

// 构建索引
const index = buildIndex(validRecipes);

// =========================================
// 生成 index.json
// =========================================
const indexData = {
    generated_at: new Date().toISOString(),
    total: validRecipes.length,
    recipes: {},
    by_app: index.byApp,
    by_tag: index.byTag,
    by_author: index.byAuthor,
};

// 填充 recipes 字典
for (const recipe of validRecipes) {
    indexData.recipes[recipe.path] = {
        name: recipe.name,
        version: recipe.version,
        author: recipe.author,
        description: recipe.description,
        icon: recipe.icon,
        tags: recipe.tags,
        links: recipe.links,
        created: recipe.created,
        updated: recipe.updated,
        requires: recipe.requires,
    };
}

fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2), 'utf-8');
console.log(`📄 已生成: ${INDEX_FILE}`);

// =========================================
// 生成 recipes-data.js
// =========================================
const allTags = [...new Set(validRecipes.flatMap(r => r.tags))].sort();
const allApps = [...new Set(validRecipes.flatMap(r => r.links.map(l => l.app_id)))].sort();

const jsOutput = `/**
 * recipes-data.js — 自动生成，请勿手动编辑
 * 由 build-recipes.js 扫描 recipes-market/ 文件夹生成
 * 生成时间: ${new Date().toISOString()}
 * 配方总数: ${validRecipes.length}
 * 标签: ${allTags.join(', ')}
 */
window.__KNOTLINK_RECIPES__ = ${JSON.stringify(validRecipes.map(r => ({
    id: r.id,
    name: r.name,
    version: r.version,
    author: r.author,
    description: r.description,
    icon: r.icon,
    tags: r.tags,
    links: r.links,
    created: r.created,
    updated: r.updated,
    path: r.path,
})), null, 2)};

window.__KNOTLINK_RECIPE_TAGS__ = ${JSON.stringify(allTags)};
window.__KNOTLINK_RECIPE_APPS__ = ${JSON.stringify(allApps)};
`;

fs.writeFileSync(OUTPUT_FILE, jsOutput, 'utf-8');
console.log(`📄 已生成: ${OUTPUT_FILE}`);

console.log('✅ 完成！');
process.exit(errors > 0 ? 1 : 0);
