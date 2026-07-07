/**
 * sync-nodes.js
 * 一键同步节点 + 重新生成数据
 *
 * 用法:
 *   node sync-nodes.js            ← 仅同步 + 构建
 *   node sync-nodes.js --commit   ← 同步 + 构建 + git commit
 *   node sync-nodes.js --push     ← 同步 + 构建 + git commit + git push
 */

const { execSync } = require('child_process');
const path = require('path');

const ROOT = __dirname;
const SUBMODULE_DIR = path.join(ROOT, 'nodes');

function run(cmd, opts = {}) {
    console.log(`  → ${cmd}`);
    return execSync(cmd, { cwd: ROOT, stdio: 'inherit', ...opts });
}

function log(msg) { console.log(`\n${msg}`); }

async function main() {
    const args = process.argv.slice(2);
    const shouldCommit = args.includes('--commit') || args.includes('--push');
    const shouldPush = args.includes('--push');

    log('🔍 步骤 1/3: 同步节点子模块...');
    try {
        run('git submodule update --init --recursive');
        run('git pull origin master', { cwd: SUBMODULE_DIR });
        log('✅ 子模块已同步');
    } catch (e) {
        console.error('❌ 子模块同步失败:', e.message);
        process.exit(1);
    }

    log('📦 步骤 2/3: 扫描节点并生成数据...');
    try {
        run('node build-nodes.js');
        log('✅ nodes-data.js 已生成');
    } catch (e) {
        console.error('❌ 构建失败:', e.message);
        process.exit(1);
    }

    if (shouldCommit) {
        log('📝 步骤 3/3: Git 提交...');
        try {
            run('git add nodes nodes-data.js');
            const count = execSync('node -e "console.log(require(\'./nodes-data.js\'.split(\'window.__KNOTLINK_NODES__\')[1] || \'\').length)" || true', { cwd: ROOT }).toString().trim();
            run(`git commit -m "sync: update nodes submodule, regenerate nodes-data.js" --allow-empty`);
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
        log('⏭  步骤 3/3: 跳过（加 --commit 提交，加 --push 推送）');
    }

    log('🎉 全部完成！');
}

main();
