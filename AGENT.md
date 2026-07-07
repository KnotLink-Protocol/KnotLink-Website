# KnotLink Website — Agent Guide

KnotLink 协议官方网站。纯静态 HTML/CSS/JS，部署在 Netlify。

## 仓库结构

```
Website/
├── index.html           ← 主页
├── styles.css           ← 全局样式（金黄色主题 #e5a50a）
├── app.js               ← 主页交互
├── build-nodes.js       ← 扫描 nodes/ 生成 nodes-data.js
├── sync.bat             ← 一键同步脚本（双击运行）
├── nodes/               ← git submodule → KNodeIndex
├── nodes-data.js        ← 自动生成，勿手动编辑
├── node-detail.html     ← 节点详情页（?id=xxx）
├── nodes.html           ← 节点索引页
├── recipes.html         ← 配方中心
├── tutorials.html       ← 用户教程（链接到 docs.knotlink.cn）
├── scenarios.html       ← 典型场景
├── compare.html         ← 方案对比
└── logo.png             ← 站点 logo
```

## 设计规范

- **主题色**: 金黄色 #e5a50a，hover #f5b830
- **暗色背景**: #0b0d14，卡片 #161924
- **字体**: Segoe UI / PingFang SC / Microsoft YaHei
- **协议阶段标注**: 首屏 Hero 有 `早期阶段` 灰色小徽章，坦诚不回避

## 链接规范

| 目标 | URL |
|------|-----|
| 文档 | `https://docs.knotlink.cn` |
| API 参考 | `https://docs.knotlink.cn/protocol-standard/function-spec` |
| GitHub 组织 | `https://github.com/KnotLink-Protocol` |
| SDK | `https://github.com/KnotLink-Protocol/KnotLinkSDK` |
| 节点仓库 | `https://github.com/KnotLink-Protocol/KNodeIndex` |

## 同步节点

```bash
# 方式一：双击 sync.bat（Windows）
# 方式二：命令行
git submodule update --init --recursive
cd nodes && git pull origin master && cd ..
node build-nodes.js
```

## 关键设计决策

- 节点数据动态生成，不硬编码
- 节点详情页通过 URL 参数 `?id=xxx` 加载，单一模板渲染所有节点
- README 用 marked.js CDN 客户端渲染
- 所有页面共享同一套 CSS 和导航/页脚
- 新增场景直接改 scenarios.html，模式参考已有 7 个场景
