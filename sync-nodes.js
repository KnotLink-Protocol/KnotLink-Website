/**
 * sync-nodes.js
 * 一键同步节点 + 配方子模块 + 重新生成数据
 *
 * 用法:
 *   node sync-nodes.js            ← 仅同步 + 构建
 *   node sync-nodes.js --commit   ← 同步 + 构建 + git commit
 *   node sync-nodes.js --push     ← 同步 + 构建 + git commit + git push
 */

const { execSync } = require('child_process');
const path = require('path');

const ROOT = __dirname;

// 子模块配置
const SUBMODULES = [
    { name: 'nodes',           dir: 'nodes',           build: 'node build-nodes.js',   output: 'nodes-data.js' },
    { name: 'recipes-market',  dir: 'recipes-market',  build: 'node build-recipes.js', output: 'recipes-data.js' },
];

function run(cmd, opts = {}) {
    console.log(`  → ${cmd}`);
    return execSync(cmd, { cwd: ROOT, stdio: 'inherit', ...opts });
}

function log(msg) { console.log(`\n${msg}`); }

async function main() {
    const args = process.argv.slice(2);
    const shouldCommit = args.includes('--commit') || args.includes('--push');
    const shouldPush = args.includes('--push');

    // =============================================
    // 步骤 1: 同步所有子模块
    // =============================================
    const totalSteps = 1 + SUBMODULES.length + (shouldCommit ? 1 : 0);
    log(`🔍 步骤 1/${totalSteps}: 同步子模块...`);
    try {
        run('git submodule update --init --recursive');
        for (const sub of SUBMODULES) {
            run(`git pull origin master`, { cwd: path.join(ROOT, sub.dir) });
        }
        log('✅ 子模块已同步');
    } catch (e) {
        console.error('❌ 子模块同步失败:', e.message);
        process.exit(1);
    }

    // =============================================
    // 步骤 2-N: 逐个构建
    // =============================================
    for (let i = 0; i < SUBMODULES.length; i++) {
        const sub = SUBMODULES[i];
        const stepNum = i + 2;
        log(`📦 步骤 ${stepNum}/${totalSteps}: 构建 ${sub.name}...`);
        try {
            run(sub.build);
            log(`✅ ${sub.output} 已生成`);
        } catch (e) {
            console.error(`❌ ${sub.name} 构建失败:`, e.message);
            process.exit(1);
        }
    }

    // =============================================
    // 最后一步: Git 提交
    // =============================================
    if (shouldCommit) {
        const stepNum = totalSteps;
        log(`📝 步骤 ${stepNum}/${totalSteps}: Git 提交...`);
        try {
            const filesToAdd = SUBMODULES.flatMap(s => [s.dir, s.output]);
            run(`git add ${filesToAdd.join(' ')}`);
            const msgParts = SUBMODULES.map(s => `update ${s.name} submodule, regenerate ${s.output}`);
            run(`git commit -m "sync: ${msgParts.join('; ')}" --allow-empty`);
            log('✅ 已提交');

            if (shouldPush) {
                run('git push');
                log('✅ 已推送');
            }
        } catch (e) {
            console.error('❌ 提交/推送失败:', e.message);
            process.exit(1);
        }
    } else {
        log('⏭  跳过提交（加 --commit 提交，加 --push 推送）');
    }

    log('🎉 全部完成！');
}

main();
