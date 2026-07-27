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
// Recipe Wall Data — from recipes-data.js
// =============================================
function getRecipes() {
    const recipes = window.__KNOTLINK_RECIPES__ || [];
    if (recipes.length === 0) {
        return [];
    }
    return recipes;
}

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

    const recipes = getRecipes();

    recipes.slice(0, 15).forEach((recipe, i) => {
        const hasDetail = !!recipe.id;
        const tag = hasDetail ? 'a' : 'div';
        const href = hasDetail ? `recipe-detail.html?id=${encodeURIComponent(recipe.id)}` : '';

        const item = document.createElement(tag);
        item.className = 'recipe-item';
        if (hasDetail) {
            item.style.display = 'block';
            item.style.textDecoration = 'none';
            item.style.color = 'inherit';
            item.style.cursor = 'pointer';
        }
        if (href) item.setAttribute('href', href);

        item.innerHTML = `
            <div class="recipe-icon">${recipe.icon}</div>
            <div class="recipe-name">${recipe.name}</div>
            <div class="recipe-desc">${recipe.description}</div>
            <div class="recipe-tags">
                ${(recipe.tags || []).map(t => `<span>${t}</span>`).join('')}
            </div>
        `;
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`;
        wall.appendChild(item);
    });

    // Update section count
    const countEl = document.querySelector('.recipes-section .section-title');
    if (countEl && recipes.length > 0) {
        countEl.textContent = `${recipes.length}+ 互联配方`;
    }
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
