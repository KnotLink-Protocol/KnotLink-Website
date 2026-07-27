/**
 * nodes-data.js — 自动生成，请勿手动编辑
 * 由 build-nodes.js 扫描 nodes/ 文件夹生成
 * 生成时间: 2026-07-27T14:44:51.512Z
 * 节点总数: 7 (插入式: 4, 独立式: 3)
 */
window.__KNOTLINK_NODES__ = [
  {
    "id": "Everything_node-HXH",
    "type": "plugin",
    "typeLabel": "插入式",
    "typeIcon": "🧩",
    "dir": "plugin/Everything_node-HXH",
    "name": "Everything 搜索节点",
    "author": "HXH",
    "version": "v1.0.0",
    "desc": "使用 Everything 搜索引擎执行文件搜索",
    "appId": "com.everything.node",
    "autoStart": "false",
    "downloadUrl": "https://github.com/hxh230802/Everything_node/releases/latest",
    "exePath": "Everything_node.exe",
    "appName": "Everything 搜索节点",
    "specVersion": "1.0",
    "manifestVersion": "1.0.0",
    "sockets": [
      {
        "name": "search",
        "id": "search",
        "desc": "使用 Everything 搜索引擎执行文件搜索、获取结果数量或打开文件所在文件夹",
        "args": [
          {
            "name": "function",
            "type": "optional",
            "desc": "要执行的操作类型",
            "default": "search"
          },
          {
            "name": "query",
            "type": "input",
            "desc": "搜索关键词（支持 Everything 查询语法）",
            "default": ""
          },
          {
            "name": "max_results",
            "type": "input",
            "desc": "最大返回文件数量（仅 search 操作有效，范围 1~100）",
            "default": "20"
          }
        ],
        "returns": [
          [
            "状态（成功/错误）",
            "status"
          ],
          [
            "错误信息（若有）",
            "message"
          ],
          [
            "文件列表（管道符 `|` 分隔，仅 search 操作）",
            "files"
          ],
          [
            "结果数量（search 返回实际数量，search_count 返回总数量）",
            "count"
          ],
          [
            "操作是否成功（仅 open_folder）",
            "success"
          ]
        ]
      }
    ],
    "logo": "nodes/plugin/Everything_node-HXH/logo.png",
    "readme": "# Everything 搜索节点\r\n\r\n基于 [Everything](https://www.voidtools.com/) 的文件搜索节点，通过 KnotLink OpenSocket 协议提供文件搜索、结果计数和打开文件夹功能。\r\n\r\n## 仓库地址\r\n\r\n- **GitHub**: https://github.com/hxh230802/Everything_node\r\n\r\n## 下载地址\r\n\r\n- https://github.com/hxh230802/Everything_node/releases/latest\r\n\r\n## 功能特性\r\n\r\n- **文件搜索** — 使用 Everything 引擎搜索文件，返回路径列表\r\n- **结果计数** — 仅获取搜索结果数量\r\n- **打开文件夹** — 打开第一个搜索结果的所在文件夹\r\n\r\n## 快速开始\r\n\r\n### 环境要求\r\n\r\n- Windows 10+\r\n- [Everything](https://www.voidtools.com/) 已安装并运行\r\n\r\n### 安装\r\n\r\n```bash\r\n# 下载最新 release 中的 Everything_node.exe\r\n```\r\n\r\n## 技术栈\r\n\r\n- **语言** — Python\r\n- **依赖** — Everything SDK\r\n\r\n## 许可证\r\n\r\nCopyright © 2026 HXH. All rights reserved.\r\n",
    "techs": [
      "语言",
      "依赖"
    ],
    "features": [
      "文件搜索",
      "结果计数",
      "打开文件夹"
    ]
  },
  {
    "id": "MsgNotification-HXH",
    "type": "plugin",
    "typeLabel": "插入式",
    "typeIcon": "🧩",
    "dir": "plugin/MsgNotification-HXH",
    "name": "消息提醒",
    "author": "HXH",
    "version": "v1.0.0",
    "desc": "在屏幕顶端弹出消息窗口",
    "appId": "0x00000014",
    "autoStart": "true",
    "downloadUrl": "https://github.com/hxh230802/MsgNotification/releases/latest",
    "exePath": "MsgNotification.exe",
    "appName": "消息提醒",
    "specVersion": "1.0",
    "manifestVersion": "1.0.0",
    "sockets": [
      {
        "name": "ShowMsg",
        "id": "0x00000010",
        "desc": "弹出消息窗口",
        "args": [
          {
            "name": "msgContext",
            "type": "input",
            "desc": "消息内容",
            "default": "测试消息"
          }
        ],
        "returns": []
      }
    ],
    "logo": "nodes/plugin/MsgNotification-HXH/logo.png",
    "readme": "# 全局消息提醒 (MsgNotification)\r\n\r\n基于 PyQt5 的 Windows 桌面消息提醒工具，通过 [KnotLink](https://github.com/hxh230802/KnotLink) 桥接系统接收来自其他应用的消息，并以动画 Toast 弹窗形式在屏幕顶部居中展示。\r\n\r\n## 仓库地址\r\n\r\n- **GitHub**: https://github.com/hxh230802/MsgNotification\r\n\r\n## 功能特性\r\n\r\n- **动画 Toast 弹窗** — 消息从屏幕顶部滑入，停留 3.5 秒后自动滑出消失\r\n- **消息队列管理** — 最多同时展示 5 条消息，超出时排队等待，已有消息消失后自动补位\r\n- **OpenSocket 通信** — 通过 KnotLink 的 OpenSocket 机制接收跨进程消息，实时响应\r\n- **后台静默运行** — 无主窗口，系统托盘常驻，开机自启（安装版）\r\n- **高 DPI 适配** — 支持高分屏显示\r\n- **NSIS 安装包** — 提供完整的安装/卸载体验，支持版本检测与覆盖安装\r\n\r\n## 快速开始\r\n\r\n### 环境要求\r\n\r\n- Windows 10+\r\n- Python 3.8+\r\n- PyQt5\r\n\r\n### 安装依赖\r\n\r\n```bash\r\npip install PyQt5\r\n```\r\n\r\n> 本项目依赖 `KnotLinkClient_PyQt`（KnotLink 客户端库），请确保该库已安装在同一 Python 环境中。\r\n\r\n### 运行\r\n\r\n```bash\r\npython src/MsgNotification.py\r\n```\r\n\r\n程序启动后将在后台运行，通过 OpenSocket 接口（AppID: `0x00000014`, OpenSocketID: `0x00000010`）等待接收消息。\r\n\r\n### 编译资源文件\r\n\r\n修改图标等 Qt 资源后，需重新编译 `resources.py`：\r\n\r\n```bash\r\ncd src\r\npyrcc5 icon.qrc -o resources.py\r\n```\r\n\r\n## 项目结构\r\n\r\n```\r\nMsgNotification/\r\n├── src/\r\n│   ├── MsgNotification.py        # 主入口，创建 QApplication 和 OpenSocket 管理器\r\n│   ├── global_message_toast.py   # Toast 弹窗组件 + 消息队列管理器\r\n│   ├── opensocket_manager.py     # OpenSocket 通信与 Toast 的桥接层\r\n│   ├── resources.py              # 编译后的 Qt 资源（图标）\r\n│   ├── icon.qrc                  # Qt 资源定义文件\r\n│   └── 资源文件编译.bat           # 资源编译脚本\r\n├── assets/\r\n│   └── MsgNotification.ico       # 应用图标\r\n├── scripts/\r\n│   └── nsis/\r\n│       ├── MsgNotification.nsi   # NSIS 安装包脚本\r\n│       ├── compress.bat          # NSIS 打包脚本\r\n│       ├── Icon/                 # 安装包图标\r\n│       ├── AppFile/              # 待打包文件目录\r\n│       └── OtherFile/            # 安装界面素材（许可证、侧边图等）\r\n├── release/                      # 已发布的安装包\r\n├── 程序打包(nuitka).bat           # Nuitka 打包脚本\r\n└── 复制到NSIS待打包文件目录.bat    # 复制 exe 到 NSIS 目录\r\n```\r\n\r\n## 打包与发布\r\n\r\n### 1. Nuitka 打包\r\n\r\n将 Python 程序编译为独立 exe：\r\n\r\n```bash\r\npython -m nuitka --onefile --enable-plugin=pyqt5 --windows-disable-console --windows-icon-from-ico=\"assets/MsgNotification.ico\" --output-dir=\"dist\" src/MsgNotification.py\r\n```\r\n\r\n或直接运行 `程序打包(nuitka).bat`。\r\n\r\n### 2. NSIS 安装包\r\n\r\n1. 将 `dist/MsgNotification.exe` 复制到 `scripts/nsis/AppFile/exe/`\r\n2. 使用 NSIS 编译 `MsgNotification.nsi` 生成安装包\r\n\r\n```bash\r\n# 或运行\r\n复制到NSIS待打包文件目录.bat\r\ncd scripts/nsis\r\nmakensisw.exe MsgNotification.nsi\r\n```\r\n\r\n生成的安装包将位于 `scripts/nsis/bin/` 目录。\r\n\r\n## OpenSocket 接口\r\n\r\n应用通过以下接口接收消息：\r\n\r\n| 功能名称 | AppID | OpenSocketID | 参数 |\r\n|---------|-------|--------------|------|\r\n| ShowMsg | `0x00000014` | `0x00000010` | `msgContext` (string) — 消息内容 |\r\n\r\n收到消息后，应用会回复 `\"OK\"` 确认，并在屏幕上展示 Toast 弹窗。\r\n\r\n## 技术栈\r\n\r\n- **Python 3.8+** — 主语言\r\n- **PyQt5** — GUI 框架（动画、窗口管理）\r\n- **Nuitka** — Python 到 C 编译打包\r\n- **NSIS** — Windows 安装包制作\r\n- **KnotLink OpenSocket** — 跨进程通信\r\n\r\n## 许可证\r\n\r\nCopyright © 2026 创猿er. All rights reserved.\r\n\r\n---\r\n\r\n🔗 相关项目：[KnotLink](https://github.com/hxh230802/KnotLink) — 通用桥接系统\r\n",
    "techs": [
      "Python 3.8+",
      "PyQt5",
      "Nuitka",
      "NSIS",
      "KnotLink OpenSocket"
    ],
    "features": [
      "动画 Toast 弹窗",
      "消息队列管理",
      "OpenSocket 通信",
      "后台静默运行",
      "高 DPI 适配",
      "NSIS 安装包"
    ]
  },
  {
    "id": "MultiTTS_Client-HXH",
    "type": "plugin",
    "typeLabel": "插入式",
    "typeIcon": "🧩",
    "dir": "plugin/MultiTTS_Client-HXH",
    "name": "MultiTTS",
    "author": "HXH",
    "version": "v1.0.0",
    "desc": "多引擎 TTS 语音合成客户端",
    "appId": "0x00000022",
    "autoStart": "false",
    "downloadUrl": "https://github.com/hxh230802/MultiTTS_Client/releases/latest",
    "exePath": "MultiTTS_Client.exe",
    "appName": "MultiTTS",
    "specVersion": "1.0",
    "manifestVersion": "1.0.0",
    "sockets": [
      {
        "name": "SysTTS",
        "id": "0x00000011",
        "desc": "调用系统TTS",
        "args": [
          {
            "name": "TTS",
            "type": "optional",
            "desc": "",
            "default": ""
          },
          {
            "name": "text",
            "type": "input",
            "desc": "内容",
            "default": "测试语音内容"
          },
          {
            "name": "rate",
            "type": "input",
            "desc": "速率（-10~10）",
            "default": "3"
          },
          {
            "name": "volume",
            "type": "input",
            "desc": "音量（0~1）",
            "default": "0.7"
          },
          {
            "name": "voice_index",
            "type": "optional",
            "desc": "讲述者",
            "default": ""
          }
        ],
        "returns": []
      },
      {
        "name": "EdgeTTS",
        "id": "0x00000011",
        "desc": "调用EdgeTTS",
        "args": [
          {
            "name": "TTS",
            "type": "optional",
            "desc": "EdgeTTS",
            "default": ""
          },
          {
            "name": "text",
            "type": "input",
            "desc": "内容",
            "default": "测试语音内容"
          },
          {
            "name": "rate",
            "type": "input",
            "desc": "速率",
            "default": "+0%"
          },
          {
            "name": "volume",
            "type": "input",
            "desc": "音量",
            "default": "+0%"
          },
          {
            "name": "voice",
            "type": "input",
            "desc": "讲述者",
            "default": "zh-CN-XiaoxiaoNeural"
          }
        ],
        "returns": []
      },
      {
        "name": "GPT_SoVITS",
        "id": "0x00000011",
        "desc": "调用GPT_SoVITS",
        "args": [
          {
            "name": "TTS",
            "type": "optional",
            "desc": "",
            "default": ""
          },
          {
            "name": "ip",
            "type": "input",
            "desc": "IP",
            "default": "127.0.0.1"
          },
          {
            "name": "port",
            "type": "input",
            "desc": "端口",
            "default": "9880"
          },
          {
            "name": "text",
            "type": "input",
            "desc": "内容",
            "default": "测试语音文本"
          },
          {
            "name": "text_lang",
            "type": "optional",
            "desc": "语言",
            "default": ""
          },
          {
            "name": "ref_audio_path",
            "type": "input",
            "desc": "参考音频路径",
            "default": ""
          },
          {
            "name": "prompt_lang",
            "type": "optional",
            "desc": "参考音频语言",
            "default": ""
          },
          {
            "name": "prompt_text",
            "type": "input",
            "desc": "参考音频文本",
            "default": "测试参考音频文本"
          }
        ],
        "returns": []
      }
    ],
    "logo": "nodes/plugin/MultiTTS_Client-HXH/logo.png",
    "readme": "# MultiTTS\r\n\r\n多引擎 TTS 语音合成客户端，通过 KnotLink OpenSocket 协议提供系统 TTS、Edge TTS 和 GPT-SoVITS 三种语音合成引擎的调用接口。\r\n\r\n## 仓库地址\r\n\r\n- **GitHub**: https://github.com/hxh230802/MultiTTS_Client\r\n\r\n## 下载地址\r\n\r\n- https://github.com/hxh230802/MultiTTS_Client/releases/latest\r\n\r\n## 功能特性\r\n\r\n- **系统 TTS** — 调用 Windows 系统自带语音引擎，支持语速/音量/讲述者调节\r\n- **Edge TTS** — 调用 Microsoft Edge 在线语音合成，支持多种神经语音\r\n- **GPT-SoVITS** — 调用本地 GPT-SoVITS 服务，支持参考音频克隆语音\r\n\r\n## 快速开始\r\n\r\n### 环境要求\r\n\r\n- Windows 10+\r\n- Python 3.8+\r\n\r\n### 安装\r\n\r\n```bash\r\npip install -r requirements.txt\r\n```\r\n\r\n## 技术栈\r\n\r\n- **语言** — Python\r\n- **TTS 引擎** — Windows SAPI / Edge TTS / GPT-SoVITS\r\n\r\n## 许可证\r\n\r\nCopyright © 2026 HXH. All rights reserved.\r\n",
    "techs": [
      "语言",
      "TTS 引擎"
    ],
    "features": [
      "系统 TTS",
      "Edge TTS",
      "GPT-SoVITS"
    ]
  },
  {
    "id": "系统操作工具-hxh230802",
    "type": "plugin",
    "typeLabel": "插入式",
    "typeIcon": "🧩",
    "dir": "plugin/系统操作工具-hxh230802",
    "name": "系统操作工具",
    "author": "hxh230802",
    "version": "v1.0.0",
    "desc": "系统操作工具，支持关机、睡眠、锁屏、音量控制、窗口管理",
    "appId": "com.github.hxh230802.sysoperatetool",
    "autoStart": "false",
    "downloadUrl": "https://github.com/KnotLink-Nodes/sysOperateTool/releases/latest",
    "exePath": "sysOperatTool.exe",
    "appName": "系统操作工具",
    "specVersion": "1.0",
    "manifestVersion": "1.0.0",
    "sockets": [
      {
        "name": "shutdown",
        "id": "system",
        "desc": "定时关机，支持倒计时和静默执行",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 shutdown）",
            "default": ""
          },
          {
            "name": "delay",
            "type": "input",
            "desc": "倒计时秒数，0 为立即执行",
            "default": "10"
          },
          {
            "name": "silence",
            "type": "optional",
            "desc": "是否静默执行（不弹倒计时窗口）",
            "default": "false"
          }
        ],
        "returns": [
          [
            "执行状态",
            "status"
          ]
        ]
      },
      {
        "name": "sleep",
        "id": "system",
        "desc": "系统睡眠，支持倒计时和静默执行",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 sleep）",
            "default": ""
          },
          {
            "name": "delay",
            "type": "input",
            "desc": "倒计时秒数，0 为立即执行",
            "default": "10"
          },
          {
            "name": "silence",
            "type": "optional",
            "desc": "是否静默执行（不弹倒计时窗口）",
            "default": "false"
          }
        ],
        "returns": [
          [
            "执行状态",
            "status"
          ]
        ]
      },
      {
        "name": "lockScreen",
        "id": "system",
        "desc": "锁屏，显示黑色全屏遮罩，支持倒计时",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 lockScreen）",
            "default": ""
          },
          {
            "name": "delay",
            "type": "input",
            "desc": "倒计时秒数，0 为立即执行",
            "default": "10"
          },
          {
            "name": "silence",
            "type": "optional",
            "desc": "是否静默执行（不弹倒计时窗口）",
            "default": "false"
          }
        ],
        "returns": [
          [
            "执行状态",
            "status"
          ]
        ]
      },
      {
        "name": "getSysVolume",
        "id": "system",
        "desc": "获取当前系统音量，返回 0~100 整数",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 getSysVolume）",
            "default": ""
          }
        ],
        "returns": [
          [
            "当前音量（0~100）",
            "volume"
          ]
        ]
      },
      {
        "name": "setSysVolume",
        "id": "system",
        "desc": "设置系统音量",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 setSysVolume）",
            "default": ""
          },
          {
            "name": "vol",
            "type": "input",
            "desc": "音量值（0~100）",
            "default": "50"
          }
        ],
        "returns": [
          [
            "执行状态",
            "status"
          ]
        ]
      },
      {
        "name": "getSystemMuteStatus",
        "id": "system",
        "desc": "查询系统是否静音",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 getSystemMuteStatus）",
            "default": ""
          }
        ],
        "returns": [
          [
            "是否静音（1=静音，0=未静音）",
            "muted"
          ]
        ]
      },
      {
        "name": "setSystemMuteStatus",
        "id": "system",
        "desc": "切换系统静音状态",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 setSystemMuteStatus）",
            "default": ""
          },
          {
            "name": "status",
            "type": "optional",
            "desc": "静音状态",
            "default": ""
          }
        ],
        "returns": [
          [
            "执行状态",
            "status"
          ]
        ]
      },
      {
        "name": "findWindowByTitle",
        "id": "system",
        "desc": "根据窗口标题查找窗口句柄，返回十六进制 HWND",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 findWindowByTitle）",
            "default": ""
          },
          {
            "name": "title",
            "type": "input",
            "desc": "窗口标题（支持部分匹配）",
            "default": ""
          }
        ],
        "returns": [
          [
            "窗口句柄（十六进制字符串）",
            "hwnd"
          ]
        ]
      },
      {
        "name": "setWindowState",
        "id": "system",
        "desc": "设置指定窗口的显示状态（隐藏/显示/最小化/最大化/恢复）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 setWindowState）",
            "default": ""
          },
          {
            "name": "hwnd",
            "type": "input",
            "desc": "窗口句柄（十六进制字符串）",
            "default": "0"
          },
          {
            "name": "state",
            "type": "optional",
            "desc": "窗口显示状态",
            "default": ""
          }
        ],
        "returns": [
          [
            "执行状态",
            "status"
          ]
        ]
      }
    ],
    "logo": "nodes/plugin/系统操作工具-hxh230802/logo.png",
    "readme": "# 系统操作工具\r\n\r\n> KnotLink 插件节点 — 通过远程调用执行 Windows 系统操作\r\n\r\n## 功能简介\r\n\r\n提供关机、睡眠、锁屏、音量控制、窗口管理等 9 种系统操作接口，支持倒计时和静默执行模式。\r\n\r\n## 接口列表\r\n\r\n| 接口 | 说明 | 关键参数 |\r\n|------|------|----------|\r\n| `shutdown` | 定时关机 | `delay` 倒计时秒数，`silence` 是否静默 |\r\n| `sleep` | 系统睡眠 | `delay` 倒计时秒数，`silence` 是否静默 |\r\n| `lockScreen` | 锁屏（黑色遮罩） | `delay` 倒计时秒数，`silence` 是否静默 |\r\n| `getSysVolume` | 获取系统音量 | 无，返回 `volume`（0~100） |\r\n| `setSysVolume` | 设置系统音量 | `vol` 音量值（0~100） |\r\n| `getSystemMuteStatus` | 查询静音状态 | 无，返回 `muted`（1=静音） |\r\n| `setSystemMuteStatus` | 切换静音 | `status`（0=取消，1=静音） |\r\n| `findWindowByTitle` | 查找窗口句柄 | `title` 窗口标题，返回 `hwnd` |\r\n| `setWindowState` | 设置窗口状态 | `hwnd` 句柄，`state` 状态（隐藏/显示/最小化/最大化/恢复） |\r\n\r\n## 下载\r\n\r\n- 最新版本：[GitHub Releases](https://github.com/KnotLink-Nodes/sysOperateTool/releases/latest)\r\n- 节点市场：[knotlink.cn/nodes](https://knotlink.cn/nodes)\r\n\r\n## 许可证\r\n\r\nMIT\r\n"
  },
  {
    "id": "ClassIsland-信",
    "type": "standalone",
    "typeLabel": "独立式",
    "typeIcon": "🚀",
    "dir": "standalone/ClassIsland-信",
    "name": "ClassIsland",
    "author": "信",
    "version": "v1.0.0",
    "desc": "课程信息与桌面通知服务",
    "appId": "0x00000031",
    "autoStart": "false",
    "downloadUrl": "https://github.com/hxh230802/ClassIsland/releases/latest",
    "appName": "ClassIsland",
    "specVersion": "1.0",
    "manifestVersion": "1.0.0",
    "sockets": [
      {
        "name": "ClassService",
        "id": "0x00000011",
        "desc": "课程服务接口",
        "args": [
          {
            "name": "action",
            "type": "optional",
            "desc": "获取",
            "default": ""
          }
        ],
        "returns": [
          [
            "课程名",
            "subject"
          ],
          [
            "教师名",
            "teacher"
          ],
          [
            "状态",
            "status"
          ]
        ]
      },
      {
        "name": "Notification",
        "id": "0x00000012",
        "desc": "提醒接口",
        "args": [
          {
            "name": "MaskContent",
            "type": "input",
            "desc": "遮罩内容",
            "default": "测试遮罩内容"
          },
          {
            "name": "MaskDuration",
            "type": "input",
            "desc": "遮罩时间(s)",
            "default": "1"
          },
          {
            "name": "OverlayContent",
            "type": "input",
            "desc": "正文内容",
            "default": "测试正文内容"
          },
          {
            "name": "OverlayDuration",
            "type": "input",
            "desc": "正文时间(s)",
            "default": "0"
          },
          {
            "name": "IsSpeechEnabled",
            "type": "optional",
            "desc": "是否启用语音",
            "default": ""
          },
          {
            "name": "SpeechContent",
            "type": "input",
            "desc": "语音内容",
            "default": "测试语音内容"
          }
        ],
        "returns": [
          [
            "状态",
            "status"
          ]
        ]
      }
    ],
    "signals": [
      {
        "name": "ClassEvent",
        "desc": "课程事件",
        "appId": "0x00000031",
        "signalId": "0x00000011",
        "returns": [
          {
            "name": "event",
            "desc": "事件名",
            "verification": ""
          }
        ]
      },
      {
        "name": "OnClass",
        "desc": "上课",
        "appId": "0x00000031",
        "signalId": "0x00000011",
        "returns": [
          {
            "name": "event",
            "desc": "事件名",
            "verification": "OnClass"
          }
        ]
      },
      {
        "name": "OnBreakingTime",
        "desc": "下课",
        "appId": "0x00000031",
        "signalId": "0x00000011",
        "returns": [
          {
            "name": "event",
            "desc": "事件名",
            "verification": "OnBreakingTime"
          }
        ]
      },
      {
        "name": "OnAfterSchool",
        "desc": "放学",
        "appId": "0x00000031",
        "signalId": "0x00000011",
        "returns": [
          {
            "name": "event",
            "desc": "事件名",
            "verification": "OnAfterSchool"
          },
          {
            "name": "time",
            "desc": "时间",
            "verification": ""
          }
        ]
      }
    ],
    "logo": "nodes/standalone/ClassIsland-信/logo.png",
    "readme": "# ClassIsland\r\n\r\n课程信息与通知服务节点，通过 KnotLink OpenSocket 协议提供当前/下节课程查询、桌面通知提醒及课程事件信号。\r\n\r\n## 仓库地址\r\n\r\n- **GitHub**: https://github.com/hxh230802/ClassIsland\r\n\r\n## 下载地址\r\n\r\n- https://github.com/hxh230802/ClassIsland/releases/latest\r\n\r\n## 功能特性\r\n\r\n- **课程查询** — 获取当前课程、下节课程信息（课程名、教师名）\r\n- **桌面通知** — 推送遮罩和正文提醒，支持语音播报\r\n- **课程事件信号** — 上课/下课/放学等事件主动推送\r\n\r\n## 快速开始\r\n\r\n### 环境要求\r\n\r\n- Windows 10+\r\n\r\n## 技术栈\r\n\r\n- **框架** — WPF / .NET\r\n\r\n## 许可证\r\n\r\nCopyright © 2026 信. All rights reserved.\r\n",
    "techs": [
      "框架"
    ],
    "features": [
      "课程查询",
      "桌面通知",
      "课程事件信号"
    ]
  },
  {
    "id": "ICK",
    "type": "standalone",
    "typeLabel": "独立式",
    "typeIcon": "🚀",
    "dir": "standalone/ICK",
    "name": "ICK",
    "author": "XY Wang & HXH",
    "version": "v1.0.0",
    "desc": "提供屏幕批注相关功能",
    "appId": "0x00000031",
    "autoStart": "false",
    "downloadUrl": "https://github.com/hxh230802/ICK/releases/latest",
    "exePath": "Ink Canvas.exe",
    "appName": "ICK",
    "specVersion": "1.0",
    "manifestVersion": "1.0.0",
    "sockets": [
      {
        "name": "GetStatus",
        "id": "0x00000021",
        "desc": "获取 Ink Canvas 当前状态",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ],
          [
            "visible",
            "墨迹画布可见状态（true/false）"
          ],
          [
            "isPenMode",
            "是否为笔模式（true/false）"
          ],
          [
            "isEraserMode",
            "是否为橡皮擦模式（true/false）"
          ]
        ]
      },
      {
        "name": "GetVersion",
        "id": "0x00000021",
        "desc": "获取 Ink Canvas 版本信息",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ],
          [
            "version",
            "版本号"
          ]
        ]
      },
      {
        "name": "SwitchToPen",
        "id": "0x00000021",
        "desc": "切换到笔模式",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "SwitchToEraser",
        "id": "0x00000021",
        "desc": "切换到橡皮擦模式",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "SwitchToCursor",
        "id": "0x00000021",
        "desc": "切换到光标/选择模式（隐藏墨迹画布）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "Show",
        "id": "0x00000021",
        "desc": "显示墨迹画布",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "Hide",
        "id": "0x00000021",
        "desc": "隐藏墨迹画布",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "ToggleDrawpad",
        "id": "0x00000021",
        "desc": "切换墨迹画布可见性",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "Clear",
        "id": "0x00000021",
        "desc": "清空画布",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "Undo",
        "id": "0x00000021",
        "desc": "撤销上一步操作",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "Redo",
        "id": "0x00000021",
        "desc": "重做上一步撤销的操作",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "ScreenMode",
        "id": "0x00000021",
        "desc": "切换到屏幕模式（透明背景，可看到桌面）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "BoardMode",
        "id": "0x00000021",
        "desc": "切换到白板/黑板模式（颜色跟随用户主题设置）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "MoveToCenter",
        "id": "0x00000021",
        "desc": "移动悬浮工具栏到屏幕中央",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "MoveToLeft",
        "id": "0x00000021",
        "desc": "移动悬浮工具栏到屏幕左侧",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "MoveToRight",
        "id": "0x00000021",
        "desc": "移动悬浮工具栏到屏幕右侧",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "MoveToTop",
        "id": "0x00000021",
        "desc": "移动悬浮工具栏到屏幕顶部",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "MoveToBottom",
        "id": "0x00000021",
        "desc": "移动悬浮工具栏到屏幕底部",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "Collapse",
        "id": "0x00000021",
        "desc": "收起悬浮工具栏（折叠为 emoji 图标）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "Expand",
        "id": "0x00000021",
        "desc": "展开悬浮工具栏（显示全部控件）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      },
      {
        "name": "DrawFunction",
        "id": "0x00000021",
        "desc": "绘制函数图像 (y=f(x))",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "操作指令",
            "default": ""
          },
          {
            "name": "expression",
            "type": "input",
            "desc": "数学表达式，支持 LaTeX",
            "default": "sin(x)"
          },
          {
            "name": "xMin",
            "type": "input",
            "desc": "x 最小值",
            "default": "-6.28"
          },
          {
            "name": "xMax",
            "type": "input",
            "desc": "x 最大值",
            "default": "6.28"
          },
          {
            "name": "step",
            "type": "input",
            "desc": "采样步长 (越小越平滑)",
            "default": "0.05"
          },
          {
            "name": "offsetX",
            "type": "input",
            "desc": "原点 X 像素偏移 (相对画布中心)",
            "default": "0"
          },
          {
            "name": "offsetY",
            "type": "input",
            "desc": "原点 Y 像素偏移 (相对画布中心, 正=上)",
            "default": "0"
          }
        ],
        "returns": [
          [
            "status",
            "状态（Successful/Error）"
          ]
        ]
      }
    ],
    "logo": "nodes/standalone/ICK/logo.png",
    "readme": "# ICK\r\n\r\n提供屏幕批注相关功能（Ink Canvas 画布控制、函数绘制等）。\r\n\r\n## 仓库地址\r\n\r\n- **GitHub**: https://github.com/hxh230802/ICK\r\n\r\n## 下载地址\r\n\r\n- https://github.com/hxh230802/ICK/releases/latest\r\n\r\n## 功能特性\r\n\r\n- **墨迹画布控制** — 显示/隐藏画布、切换笔/橡皮擦/光标模式、清空/撤销/重做\r\n- **屏幕批注** — 屏幕模式（透明背景）、白板/黑板模式\r\n- **悬浮工具栏** — 移动到屏幕各方位、展开/收起\r\n- **函数绘制** — 支持 LaTeX 表达式绘制数学函数图像\r\n\r\n\r\n\r\n## 快速开始\r\n\r\n### 环境要求\r\n\r\n- Windows 10+ / macOS 12+\r\n- 其他依赖\r\n\r\n### 安装\r\n\r\n```bash\r\n# 安装步骤\r\n```\r\n\r\n### 使用\r\n\r\n```bash\r\n\r\n```\r\n\r\n## 技术栈\r\n\r\n\r\n\r\n## 许可证\r\n\r\nCopyright © 2026 XY Wang & HXH. All rights reserved.\r\n",
    "techs": [],
    "features": [
      "墨迹画布控制",
      "屏幕批注",
      "悬浮工具栏",
      "函数绘制"
    ]
  },
  {
    "id": "NamePicker",
    "type": "standalone",
    "typeLabel": "独立式",
    "typeIcon": "🚀",
    "dir": "standalone/NamePicker",
    "name": "RandomPicker",
    "author": "HXH",
    "version": "v1.0.0",
    "desc": "随机点名与学生名单管理",
    "appId": "cn.knotlink.namepicker",
    "autoStart": "false",
    "downloadUrl": "https://github.com/hxh230802/NamePicker/releases/latest",
    "appName": "RandomPicker",
    "specVersion": "1.0",
    "manifestVersion": "1.0.0",
    "sockets": [
      {
        "name": "pick",
        "id": "control",
        "desc": "抽取一名学生（单人）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 pick）",
            "default": ""
          },
          {
            "name": "type",
            "type": "optional",
            "desc": "抽取类型（仅支持 single）",
            "default": "single"
          }
        ],
        "returns": [
          [
            "学生姓名",
            "name"
          ],
          [
            "学号",
            "no"
          ],
          [
            "性别",
            "sex"
          ]
        ]
      },
      {
        "name": "multiple",
        "id": "control",
        "desc": "抽取多名学生（多人）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 pick）",
            "default": ""
          },
          {
            "name": "type",
            "type": "static",
            "desc": "命令类型（固定为 multiple）",
            "default": ""
          },
          {
            "name": "num",
            "type": "input",
            "desc": "抽取人数",
            "default": "1"
          }
        ],
        "returns": []
      },
      {
        "name": "window",
        "id": "control",
        "desc": "控制主窗口或托盘图标显示/隐藏",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 window）",
            "default": ""
          },
          {
            "name": "target",
            "type": "optional",
            "desc": "控制目标",
            "default": "main"
          },
          {
            "name": "op",
            "type": "optional",
            "desc": "操作类型",
            "default": "show"
          }
        ],
        "returns": []
      },
      {
        "name": "get_names",
        "id": "control",
        "desc": "获取当前学生名单（JSON 数组）",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 get_names）",
            "default": ""
          }
        ],
        "returns": [
          [
            "JSON 字符串(含 name/sex/no 数组)",
            "data"
          ]
        ]
      },
      {
        "name": "add_name",
        "id": "control",
        "desc": "添加一名学生到名单",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 add_name）",
            "default": ""
          },
          {
            "name": "name",
            "type": "input",
            "desc": "学生姓名",
            "default": "1"
          },
          {
            "name": "no",
            "type": "input",
            "desc": "学号",
            "default": "1"
          },
          {
            "name": "sex",
            "type": "optional",
            "desc": "性别（0-男，1-女）",
            "default": "0"
          },
          {
            "name": "pos",
            "type": "input",
            "desc": "插入位置（从1开始，留空则追加到末尾）",
            "default": ""
          }
        ],
        "returns": []
      },
      {
        "name": "del_name",
        "id": "control",
        "desc": "删除指定位置的学生",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 del_name）",
            "default": ""
          },
          {
            "name": "pos",
            "type": "input",
            "desc": "要删除的位置（从1开始）",
            "default": ""
          }
        ],
        "returns": []
      },
      {
        "name": "update_name",
        "id": "control",
        "desc": "更新指定位置的学生信息",
        "args": [
          {
            "name": "action",
            "type": "static",
            "desc": "命令类型（固定为 update_name）",
            "default": ""
          },
          {
            "name": "pos",
            "type": "input",
            "desc": "要更新的位置（从1开始）",
            "default": ""
          },
          {
            "name": "name",
            "type": "input",
            "desc": "新姓名（可选）",
            "default": "1"
          },
          {
            "name": "no",
            "type": "input",
            "desc": "新学号（可选）",
            "default": "1"
          },
          {
            "name": "sex",
            "type": "optional",
            "desc": "新性别（0-男，1-女）（可选）",
            "default": "1"
          }
        ],
        "returns": []
      }
    ],
    "signals": [
      {
        "name": "onPickSingle",
        "desc": "单次点名触发时",
        "appId": "cn.knotlink.namepicker",
        "signalId": "onPick",
        "returns": [
          {
            "name": "type",
            "desc": "类型",
            "verification": "single"
          },
          {
            "name": "name",
            "desc": "姓名",
            "verification": ""
          },
          {
            "name": "no",
            "desc": "学号",
            "verification": ""
          },
          {
            "name": "sex",
            "desc": "性别（0-男，1-女）",
            "verification": ""
          }
        ]
      }
    ],
    "logo": "nodes/standalone/NamePicker/logo.png",
    "readme": "# RandomPicker\r\n\r\n随机点名工具，通过 KnotLink OpenSocket 协议提供单人/多人随机抽取、学生名单管理及点名事件信号。\r\n\r\n## 仓库地址\r\n\r\n- **GitHub**: https://github.com/hxh230802/NamePicker\r\n\r\n## 下载地址\r\n\r\n- https://github.com/hxh230802/NamePicker/releases/latest\r\n\r\n## 功能特性\r\n\r\n- **随机点名** — 单人随机抽取、多人批量抽取\r\n- **名单管理** — 查询名单、添加/删除/更新学生信息\r\n- **点名事件信号** — 点名触发时主动推送学生信息\r\n- **窗口控制** — 主窗口和托盘图标的显示/隐藏控制\r\n\r\n## 快速开始\r\n\r\n### 环境要求\r\n\r\n- Windows 10+\r\n\r\n## 许可证\r\n\r\nCopyright © 2026. All rights reserved.\r\n",
    "features": [
      "随机点名",
      "名单管理",
      "点名事件信号",
      "窗口控制"
    ]
  }
];
