/**
 * KnotLink Homepage — Interactive Elements
 */

// =============================================
// Node Icon Wall Data — from nodes-data.js
// =============================================
function getNodes() {
    const nodes = window.__KNOTLINK_NODES__ || [];
    // Fallback: if no nodes found, show placeholder
    if (nodes.length === 0) {
        return [{ name: '暂无节点', typeIcon: '📦', typeLabel: '待添加', type: 'plugin' }];
    }
    return nodes;
}

// =============================================
// Recipe Wall Data
// =============================================
const RECIPES = [
    { name: 'AI 调用命令行',     desc: 'LLM 应用调用本地终端执行脚本',         tags: ['AI', 'CLI'],           icon: '🤖' },
    { name: 'Excel ↔ Python',  desc: 'Excel 数据自动清洗与分析',               tags: ['数据', '办公'],        icon: '📊' },
    { name: '截图 OCR 翻译',    desc: '截图 → 识别 → 翻译 → 回填',             tags: ['OCR', '翻译'],         icon: '📸' },
    { name: 'IDE 集成终端',     desc: '编辑器与终端深度联动',                  tags: ['IDE', '终端'],         icon: '💻' },
    { name: '文件监控处理',     desc: '文件夹变化自动触发处理管道',            tags: ['文件', '自动化'],      icon: '📁' },
    { name: '消息推送桥接',     desc: '本地应用间实时消息互通',                 tags: ['消息', '实时'],        icon: '🔔' },
    { name: '数据可视化管道',   desc: 'Python 分析 → 前端可视化自动导出',       tags: ['可视化', '数据'],      icon: '📈' },
    { name: '跨语言 RPC 调用',  desc: 'Node.js 直接调用 Rust 函数',            tags: ['RPC', '多语言'],       icon: '🔗' },
    { name: '数据库查询桥接',   desc: '任何应用统一查询多种数据库',            tags: ['数据库', 'SQL'],       icon: '🗄️' },
    { name: 'WebSocket 中继',   desc: '本地 WS 服务跨应用共享',                 tags: ['WS', '网络'],          icon: '🔌' },
    { name: '定时任务编排',     desc: '多应用定时任务统一调度',                 tags: ['调度', 'Cron'],        icon: '⏰' },
    { name: '日志聚合分析',     desc: '多应用日志统一收集与展示',              tags: ['日志', '监控'],        icon: '📋' },
    { name: 'Git 工作流增强',   desc: 'Git 操作与 CI 本地桥接',                tags: ['Git', 'CI'],           icon: '🔄' },
    { name: '视频处理流水线',   desc: 'FFmpeg + Python 自动视频编辑',          tags: ['视频', '多媒体'],      icon: '🎬' },
    { name: '本地 API 网关',    desc: '统一本地服务的 API 入口',               tags: ['网关', 'API'],         icon: '🚪' },
    { name: '配置中心同步',     desc: '多应用配置自动同步与热更新',            tags: ['配置', '同步'],        icon: '⚙️' },
    { name: '邮件通知集成',     desc: '本地应用事件触发邮件发送',              tags: ['邮件', '通知'],        icon: '📧' },
    { name: 'PDF 生成管道',     desc: '多源数据自动生成 PDF 报告',             tags: ['PDF', '报告'],         icon: '📄' },
    { name: '消息队列桥接',     desc: '本地 Redis/RabbitMQ 跨应用共享',         tags: ['MQ', '队列'],          icon: '📨' },
    { name: '容器生命周期管理', desc: '本地 Docker 容器由应用自动调度',         tags: ['Docker', '容器'],      icon: '🐳' },
];

// =============================================
// Render Node Icon Wall
// =============================================
function renderNodeIconWall() {
    const wall = document.getElementById('nodeIconWall');
    if (!wall) return;

    const nodes = getNodes();

    nodes.forEach((node, i) => {
        const link = document.createElement('a');
        link.href = `node-detail.html?id=${node.id}`;
        link.className = 'node-icon-item';
        link.title = `${node.name} (${node.typeLabel || node.type}) — 点击查看详情`;
        link.innerHTML = `
            ${node.logo
                ? `<img src="${node.logo}" alt="${node.name}" class="node-wall-logo" style="width:36px;height:36px;object-fit:contain;border-radius:6px">`
                : `<span class="icon-char">${node.typeIcon || '📦'}</span>`
            }
            <span class="icon-label">${node.name}</span>
            <span class="node-type-badge" style="font-size:0.6rem;color:var(--color-text-muted);margin-top:-2px">${node.typeLabel || node.type}</span>
        `;
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`;
        wall.appendChild(link);
    });

    // Update section node count
    const countEl = document.querySelector('.nodes-section .section-title');
    if (countEl && nodes.length > 0) {
        countEl.textContent = `${nodes.length}+ 节点接入`;
    }
}

// =============================================
// Render Recipe Wall
// =============================================
function renderRecipeWall() {
    const wall = document.getElementById('recipeWall');
    if (!wall) return;

    RECIPES.slice(0, 15).forEach((recipe) => {
        const item = document.createElement('div');
        item.className = 'recipe-item';
        item.innerHTML = `
            <div class="recipe-icon">${recipe.icon}</div>
            <div class="recipe-name">${recipe.name}</div>
            <div class="recipe-desc">${recipe.desc}</div>
            <div class="recipe-tags">
                ${recipe.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
        `;
        wall.appendChild(item);
    });
}

// =============================================
// Intersection Observer — 淡入动画
// =============================================
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.identity-card, .scenario-card, .node-icon-item, .recipe-item').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// =============================================
// Navbar scroll effect
// =============================================
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// =============================================
// Init
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    renderNodeIconWall();
    renderRecipeWall();
    setupIntersectionObserver();
    setupNavbarScroll();
});
