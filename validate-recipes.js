/**
 * validate-recipes.js
 * 验证 recipes-market/ 目录下所有配方的元数据格式完整性
 * 作为 CI 检查的第一步，也可本地运行
 *
 * 用法: node validate-recipes.js
 * 退出码: 0 = 全部通过, 1 = 有错误
 */

const fs = require('fs');
const path = require('path');

const MARKET_DIR = path.join(__dirname, 'recipes-market');

const REQUIRED_FIELDS = ['id', 'name', 'version', 'author', 'description', 'icon', 'links'];
const REQUIRED_LINK_FIELDS = ['app_id', 'app_name', 'min_version', 'role'];

const KNOWN_TAGS = new Set([
    'AI', 'CLI', '数据', '办公', '自动化', 'OCR', '翻译', 'IDE', '终端',
    '文件', '消息', '实时', '可视化', 'RPC', '多语言', '数据库', 'SQL',
    '网络', '调度', '日志', '监控', 'Git', 'CI', '视频', '多媒体', 'API',
    '配置', '邮件', 'PDF', '安全', 'IoT', '硬件', 'Docker', '容器',
    '设计', '金融', '语音', '分析', 'Markdown', '编辑器', '剪贴板', '工具',
    '日历', '图片', '批量', '代理', '密钥', '通知', '队列', '报告', 'ETL',
]);

let errors = 0;
let warnings = 0;

function error(msg) { console.error(`  ❌ ${msg}`); errors++; }
function warn(msg) { console.warn(`  ⚠️  ${msg}`); warnings++; }
function ok(msg) { console.log(`  ✅ ${msg}`); }

function validate() {
    console.log('🔍 KnotLink 配方校验\n');

    if (!fs.existsSync(MARKET_DIR)) {
        error('recipes-market/ 目录不存在');
        process.exit(1);
    }

    const authorDirs = fs.readdirSync(MARKET_DIR, { withFileTypes: true })
        .filter(e => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.'));

    if (authorDirs.length === 0) {
        console.log('  📁 recipes-market/ 暂无配方');
        console.log('\n✅ 校验完成（无配方）');
        process.exit(0);
    }

    let totalRecipes = 0;
    const seenIds = new Set();

    for (const authorDir of authorDirs) {
        const authorPath = path.join(MARKET_DIR, authorDir.name);
        console.log(`👤 ${authorDir.name}/`);

        const pyFiles = fs.readdirSync(authorPath, { withFileTypes: true })
            .filter(e => e.isFile() && e.name.endsWith('.py') && !e.name.startsWith('_'));

        if (pyFiles.length === 0) {
            console.log('  (无 .py 配方文件)');
            continue;
        }

        for (const pyFile of pyFiles) {
            totalRecipes++;
            const filePath = path.join(authorPath, pyFile.name);
            const relPath = `${authorDir.name}/${pyFile.name}`;
            console.log(`  📜 ${pyFile.name}`);

            // 读取文件
            let content;
            try {
                content = fs.readFileSync(filePath, 'utf-8');
            } catch (e) {
                error(`${relPath}: 无法读取文件: ${e.message}`);
                continue;
            }

            // 提取元数据块
            const match = content.match(/@KNOTLINK_RECIPE\s*\n([\s\S]*?)\n\s*@END_KNOTLINK_RECIPE/);
            if (!match) {
                error(`${relPath}: 未找到 @KNOTLINK_RECIPE / @END_KNOTLINK_RECIPE 元数据块`);
                continue;
            }

            let meta;
            try {
                meta = JSON.parse(match[1]);
            } catch (e) {
                error(`${relPath}: 元数据 JSON 解析失败: ${e.message}`);
                continue;
            }

            // === 必填字段检查 ===
            for (const field of REQUIRED_FIELDS) {
                if (!meta[field]) {
                    error(`${relPath}: 缺少必填字段 "${field}"`);
                }
            }

            // === id 校验 ===
            if (meta.id) {
                if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.id)) {
                    error(`${relPath}: id 格式无效 "${meta.id}"（应为小写字母+数字+连字符）`);
                }
                if (seenIds.has(meta.id)) {
                    error(`${relPath}: id "${meta.id}" 与已有配方重复`);
                }
                seenIds.add(meta.id);
            }

            // === version 校验 ===
            if (meta.version && !/^\d+\.\d+\.\d+/.test(meta.version)) {
                warn(`${relPath}: version 格式建议使用 semver（如 1.2.0），当前为 "${meta.version}"`);
            }

            // === author 与文件夹名一致性 ===
            if (meta.author && meta.author !== authorDir.name) {
                warn(`${relPath}: author "${meta.author}" 与文件夹名 "${authorDir.name}" 不一致`);
            }

            // === icon 校验 ===
            if (meta.icon) {
                if (typeof meta.icon !== 'string' || meta.icon.length > 4) {
                    warn(`${relPath}: icon 应为单个 emoji 字符，当前为 "${meta.icon}"`);
                }
            }

            // === tags 校验 ===
            if (meta.tags) {
                if (!Array.isArray(meta.tags)) {
                    error(`${relPath}: tags 必须是数组`);
                } else {
                    if (meta.tags.length === 0) {
                        warn(`${relPath}: tags 为空`);
                    } else if (meta.tags.length > 5) {
                        warn(`${relPath}: tags 超过 5 个（${meta.tags.length}）`);
                    }
                    for (const tag of meta.tags) {
                        if (!KNOWN_TAGS.has(tag)) {
                            warn(`${relPath}: 标签 "${tag}" 不在预定义列表中`);
                        }
                    }
                }
            }

            // === links 校验 ===
            if (meta.links) {
                if (!Array.isArray(meta.links)) {
                    error(`${relPath}: links 必须是数组`);
                } else if (meta.links.length === 0) {
                    error(`${relPath}: links 至少需要一个联动应用`);
                } else {
                    for (let i = 0; i < meta.links.length; i++) {
                        const link = meta.links[i];
                        for (const field of REQUIRED_LINK_FIELDS) {
                            if (!link[field]) {
                                error(`${relPath}: links[${i}] 缺少字段 "${field}"`);
                            }
                        }
                        if (link.app_id && !/^(0x[0-9A-Fa-f]{8}|[a-z0-9]+([.-][a-z0-9]+)*\.[a-z]{2,}(\.[a-z0-9]+)*)$/.test(link.app_id)) {
                            warn(`${relPath}: links[${i}].app_id 格式异常: "${link.app_id}"`);
                        }
                    }
                }
            } else {
                error(`${relPath}: 缺少 links 字段`);
            }

            // === requires 校验 ===
            if (meta.requires) {
                if (meta.requires.python && typeof meta.requires.python !== 'string') {
                    warn(`${relPath}: requires.python 应为版本字符串`);
                }
                if (meta.requires.packages) {
                    if (!Array.isArray(meta.requires.packages)) {
                        warn(`${relPath}: requires.packages 应为数组`);
                    }
                }
            }

            // === created/updated 日期格式 ===
            for (const dateField of ['created', 'updated']) {
                if (meta[dateField] && !/^\d{4}-\d{2}-\d{2}$/.test(meta[dateField])) {
                    warn(`${relPath}: ${dateField} 格式建议为 YYYY-MM-DD`);
                }
            }

            console.log('');
        }
    }

    // 汇总
    console.log('═══════════════════════════════');
    console.log(`配方总数: ${totalRecipes}`);
    console.log(`错误: ${errors}  警告: ${warnings}`);

    if (errors > 0) {
        console.log('\n❌ 校验未通过，请修复上述错误后重新提交。');
        process.exit(1);
    } else if (warnings > 0) {
        console.log('\n⚠️  校验通过（有警告，建议修复）');
        process.exit(0);
    } else {
        console.log('\n✅ 全部通过！');
        process.exit(0);
    }
}

validate();
