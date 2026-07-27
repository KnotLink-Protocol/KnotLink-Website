/**
 * recipes-data.js — 自动生成，请勿手动编辑
 * 由 build-recipes.js 扫描 recipes-market/ 文件夹生成
 * 生成时间: 2026-07-27T12:38:51.743Z
 * 配方总数: 5
 * 标签: AI, CLI, ETL, OCR, 分析, 办公, 可视化, 数据, 文件, 监控, 翻译, 自动化
 */
window.__KNOTLINK_RECIPES__ = [
  {
    "id": "ai-cli-bridge",
    "name": "AI 调用命令行",
    "version": "1.1.0",
    "author": "hxh230802",
    "description": "LLM 应用通过 KnotLink 调用本地终端执行脚本，打通 AI 与本地工具链",
    "icon": "🤖",
    "tags": [
      "AI",
      "CLI",
      "自动化"
    ],
    "links": [
      {
        "app_id": "0x00000014",
        "app_name": "MsgNotification",
        "min_version": "1.0.0",
        "role": "执行结果通知"
      },
      {
        "app_id": "com.everything.node",
        "app_name": "Everything",
        "min_version": "1.0.0",
        "role": "文件定位"
      }
    ],
    "created": "2026-07-12",
    "updated": "2026-07-12",
    "path": "hxh230802/ai-cli-bridge.py"
  },
  {
    "id": "data-visualization",
    "name": "数据可视化管道",
    "version": "1.0.0",
    "author": "hxh230802",
    "description": "Python 数据分析 → 自动生成 ECharts/D3 可视化 → 浏览器展示，数据在不同应用间自动流转",
    "icon": "📈",
    "tags": [
      "可视化",
      "数据",
      "分析"
    ],
    "links": [
      {
        "app_id": "0x00000014",
        "app_name": "MsgNotification",
        "min_version": "1.0.0",
        "role": "图表生成完成通知"
      }
    ],
    "created": "2026-07-12",
    "updated": "2026-07-12",
    "path": "hxh230802/data-visualization.py"
  },
  {
    "id": "excel-python-etl",
    "name": "Excel ↔ Python 数据清洗",
    "version": "1.2.0",
    "author": "hxh230802",
    "description": "Excel 数据自动发送给 Python 清洗分析，结果回写表格，实现数据管道的自动流转",
    "icon": "📊",
    "tags": [
      "数据",
      "办公",
      "ETL"
    ],
    "links": [
      {
        "app_id": "0x00000014",
        "app_name": "MsgNotification",
        "min_version": "1.0.0",
        "role": "处理完成通知"
      }
    ],
    "created": "2026-07-12",
    "updated": "2026-07-12",
    "path": "hxh230802/excel-python-etl.py"
  },
  {
    "id": "file-watch-pipeline",
    "name": "文件监控处理",
    "version": "1.0.0",
    "author": "hxh230802",
    "description": "文件夹内容变化自动触发多应用处理管道，从文件变化到处理完成全自动",
    "icon": "📁",
    "tags": [
      "文件",
      "自动化",
      "监控"
    ],
    "links": [
      {
        "app_id": "0x00000014",
        "app_name": "MsgNotification",
        "min_version": "1.0.0",
        "role": "处理状态通知"
      },
      {
        "app_id": "com.everything.node",
        "app_name": "Everything",
        "min_version": "1.0.0",
        "role": "文件发现与检索"
      }
    ],
    "created": "2026-07-12",
    "updated": "2026-07-12",
    "path": "hxh230802/file-watch-pipeline.py"
  },
  {
    "id": "ocr-translate",
    "name": "截图 OCR 翻译",
    "version": "1.0.0",
    "author": "hxh230802",
    "description": "截图工具 → OCR 识别 → 翻译引擎 → 结果回填，一气呵成的自动化翻译流水线",
    "icon": "📸",
    "tags": [
      "OCR",
      "翻译",
      "自动化"
    ],
    "links": [
      {
        "app_id": "0x00000014",
        "app_name": "MsgNotification",
        "min_version": "1.0.0",
        "role": "翻译完成通知"
      }
    ],
    "created": "2026-07-12",
    "updated": "2026-07-12",
    "path": "hxh230802/ocr-translate.py"
  }
];

window.__KNOTLINK_RECIPE_TAGS__ = ["AI","CLI","ETL","OCR","分析","办公","可视化","数据","文件","监控","翻译","自动化"];
window.__KNOTLINK_RECIPE_APPS__ = ["0x00000014","com.everything.node"];
