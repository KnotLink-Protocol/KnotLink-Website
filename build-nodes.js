/**
 * build-nodes.js
 * 扫描 nodes/ 文件夹，动态生成 nodes-data.js
 *
 * 用法: node build-nodes.js
 * 输出: nodes-data.js (浏览器端加载的 JS 数据文件)
 */

const fs = require('fs');
const path = require('path');

const NODES_DIR = path.join(__dirname, 'nodes');
const OUTPUT_FILE = path.join(__dirname, 'nodes-data.js');

// 节点类型定义
const NODE_TYPES = {
    plugin: {
        dir: 'plugin',
        label: '插入式',
        icon: '🧩',
        manifestFile: 'plugin_manifest.json',
    },
    standalone: {
        dir: 'standalone',
        label: '独立式',
        icon: '🚀',
        manifestFile: 'standalone_manifest.json', // 独立式可能也有自己的 manifest
    },
};

function scanNodes() {
    const nodes = [];

    for (const [typeKey, typeDef] of Object.entries(NODE_TYPES)) {
        const typeDir = path.join(NODES_DIR, typeDef.dir);

        if (!fs.existsSync(typeDir)) {
            console.log(`  📁 ${typeDef.dir}/ 目录不存在，跳过`);
            continue;
        }

        const entries = fs.readdirSync(typeDir, { withFileTypes: true });
        const nodeDirs = entries.filter(e => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.'));

        if (nodeDirs.length === 0) {
            console.log(`  📁 ${typeDef.dir}/ 暂无节点`);
            continue;
        }

        for (const entry of nodeDirs) {
            const nodePath = path.join(typeDir, entry.name);
            console.log(`  📦 发现节点: ${typeDef.dir}/${entry.name}`);

            const nodeData = {
                id: entry.name,
                type: typeKey,
                typeLabel: typeDef.label,
                typeIcon: typeDef.icon,
                dir: `${typeDef.dir}/${entry.name}`,
            };

            // 读取 manifest
            const manifestPath = path.join(nodePath, typeDef.manifestFile);
            if (fs.existsSync(manifestPath)) {
                try {
                    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                    nodeData.name = manifest.plugin_name || manifest.name || entry.name;
                    nodeData.author = manifest.author || '';
                    nodeData.version = manifest.version || '';
                    nodeData.desc = manifest.description || '';
                    nodeData.appId = manifest.app_id || '';
                    nodeData.autoStart = manifest.auto_start || 'false';
                    if (manifest.exe_path) nodeData.exePath = manifest.exe_path;
                } catch (e) {
                    console.warn(`    ⚠️ 解析 manifest 失败: ${e.message}`);
                }
            }

            // 如果没有 manifest，尝试 standalone_manifest.json 作为备选
            if (!nodeData.name && typeKey === 'standalone') {
                const altManifestPath = path.join(nodePath, 'plugin_manifest.json');
                if (fs.existsSync(altManifestPath)) {
                    try {
                        const manifest = JSON.parse(fs.readFileSync(altManifestPath, 'utf-8'));
                        nodeData.name = manifest.plugin_name || manifest.name || entry.name;
                        nodeData.author = manifest.author || '';
                        nodeData.version = manifest.version || '';
                        nodeData.desc = manifest.description || '';
                        nodeData.appId = manifest.app_id || '';
                    } catch (e) {
                        console.warn(`    ⚠️ 解析备选 manifest 失败: ${e.message}`);
                    }
                }
            }

            // 回退：用目录名作为显示名
            if (!nodeData.name) {
                nodeData.name = entry.name;
            }

            // 读取 FuncList.json
            const funcListPath = path.join(nodePath, 'FuncList.json');
            if (fs.existsSync(funcListPath)) {
                try {
                    const funcList = JSON.parse(fs.readFileSync(funcListPath, 'utf-8'));
                    nodeData.appName = funcList.appName || nodeData.name;

                    // 解析 openSocket
                    if (funcList.openSocket) {
                        nodeData.sockets = Object.entries(funcList.openSocket).map(([key, val]) => ({
                            name: key,
                            id: val.openSocketID || '',
                            desc: val.description || '',
                            args: val.args ? Object.entries(val.args).map(([k, v]) => ({
                                name: k,
                                type: v.type || 'input',
                                desc: v.description || '',
                                default: v.defaultVal || '',
                            })) : [],
                            returns: val.returns || [],
                        }));
                    }

                    // 解析 signal
                    if (funcList.signal && Object.keys(funcList.signal).length > 0) {
                        nodeData.signals = Object.entries(funcList.signal).map(([key, val]) => {
                            const sig = {
                                name: key,
                                desc: val.description || '',
                                appId: val.appID || '',
                                signalId: val.signalID || '',
                            };
                            // 解析 signal 的 returns（字段定义对象，转成数组）
                            if (val.returns && typeof val.returns === 'object') {
                                sig.returns = Object.entries(val.returns).map(([fieldName, fieldDef]) => ({
                                    name: fieldName,
                                    desc: fieldDef.description || '',
                                    verification: fieldDef.verification || '',
                                }));
                            }
                            return sig;
                        });
                    }
                } catch (e) {
                    console.warn(`    ⚠️ 解析 FuncList 失败: ${e.message}`);
                }
            }

            // 检查 logo
            const logoPath = path.join(nodePath, 'logo.png');
            if (fs.existsSync(logoPath)) {
                nodeData.logo = `nodes/${typeDef.dir}/${entry.name}/logo.png`;
            }

            // 读取 README — 完整保留
            const readmePath = path.join(nodePath, 'README.md');
            if (fs.existsSync(readmePath)) {
                try {
                    const readme = fs.readFileSync(readmePath, 'utf-8');
                    // 完整 README 原文（供详情页 markdown 渲染）
                    nodeData.readme = readme;

                    // 从 README 自动提取描述（若 manifest 未提供）
                    if (!nodeData.desc) {
                        const lines = readme.split('\n');
                        for (const line of lines) {
                            const trimmed = line.trim();
                            if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('```') && !trimmed.startsWith('|') && !trimmed.startsWith('-') && !trimmed.startsWith('!') && !trimmed.startsWith('>')) {
                                if (trimmed.length > 20) { nodeData.desc = trimmed; break; }
                            }
                        }
                    }

                    // 提取技术栈
                    if (readme.includes('## 技术栈') || readme.includes('## Tech')) {
                        nodeData.techs = [];
                        const techSection = readme.split(/## 技术栈|## Tech/)[1]?.split('## ')[0] || '';
                        const techLines = techSection.split('\n').filter(l => l.startsWith('- **'));
                        for (const tl of techLines) {
                            const match = tl.match(/\*\*(.+?)\*\*/);
                            if (match) nodeData.techs.push(match[1]);
                        }
                    }

                    // 提取特性列表
                    if (!nodeData.features) {
                        const featureSection = readme.split(/## 功能特性|## Features/)[1]?.split('## ')[0] || '';
                        const items = featureSection
                            .split('\n')
                            .filter(l => l.startsWith('- **'))
                            .map(l => l.replace(/^- \*\*/, '').replace(/\*\*.*/, '').trim())
                            .filter(Boolean);
                        if (items.length > 0) nodeData.features = items;
                    }
                } catch (e) {
                    console.warn(`    ⚠️ 读取 README 失败: ${e.message}`);
                }
            }

            nodes.push(nodeData);
            console.log(`    ✅ ${nodeData.name} (${typeDef.label})`);
        }
    }

    return nodes;
}

// =========================================
// 主流程
// =========================================
console.log('🔍 扫描 nodes/ 目录...\n');

const nodes = scanNodes();

// 统计
const pluginCount = nodes.filter(n => n.type === 'plugin').length;
const standaloneCount = nodes.filter(n => n.type === 'standalone').length;

console.log(`\n📊 扫描完成: ${nodes.length} 个节点 (插入式: ${pluginCount}, 独立式: ${standaloneCount})`);

// 生成 JS 文件
const output = `/**
 * nodes-data.js — 自动生成，请勿手动编辑
 * 由 build-nodes.js 扫描 nodes/ 文件夹生成
 * 生成时间: ${new Date().toISOString()}
 * 节点总数: ${nodes.length} (插入式: ${pluginCount}, 独立式: ${standaloneCount})
 */
window.__KNOTLINK_NODES__ = ${JSON.stringify(nodes, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
console.log(`📄 已生成: ${OUTPUT_FILE}`);
console.log('✅ 完成！');
