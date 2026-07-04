/**
 * nodes-data.js — 自动生成，请勿手动编辑
 * 由 build-nodes.js 扫描 nodes/ 文件夹生成
 * 生成时间: 2026-07-04T12:02:04.808Z
 * 节点总数: 5 (插入式: 3, 独立式: 2)
 */
window.__KNOTLINK_NODES__ = [
  {
    "id": "Everything_node",
    "type": "plugin",
    "typeLabel": "插入式",
    "typeIcon": "🧩",
    "dir": "plugin/Everything_node",
    "name": "Everything_node",
    "appName": "Everything 搜索节点",
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
    "exePath": "MsgNotification.exe",
    "appName": "消息提醒",
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
    "readme": "# 全局消息提醒 (MsgNotification)\n\n基于 PyQt5 的 Windows 桌面消息提醒工具，通过 [KnotLink](https://github.com/hxh230802/KnotLink) 桥接系统接收来自其他应用的消息，并以动画 Toast 弹窗形式在屏幕顶部居中展示。\n\n## 功能特性\n\n- **动画 Toast 弹窗** — 消息从屏幕顶部滑入，停留 3.5 秒后自动滑出消失\n- **消息队列管理** — 最多同时展示 5 条消息，超出时排队等待，已有消息消失后自动补位\n- **OpenSocket 通信** — 通过 KnotLink 的 OpenSocket 机制接收跨进程消息，实时响应\n- **后台静默运行** — 无主窗口，系统托盘常驻，开机自启（安装版）\n- **高 DPI 适配** — 支持高分屏显示\n- **NSIS 安装包** — 提供完整的安装/卸载体验，支持版本检测与覆盖安装\n\n## 快速开始\n\n### 环境要求\n\n- Windows 10+\n- Python 3.8+\n- PyQt5\n\n### 安装依赖\n\n```bash\npip install PyQt5\n```\n\n> 本项目依赖 `KnotLinkClient_PyQt`（KnotLink 客户端库），请确保该库已安装在同一 Python 环境中。\n\n### 运行\n\n```bash\npython src/MsgNotification.py\n```\n\n程序启动后将在后台运行，通过 OpenSocket 接口（AppID: `0x00000014`, OpenSocketID: `0x00000010`）等待接收消息。\n\n### 编译资源文件\n\n修改图标等 Qt 资源后，需重新编译 `resources.py`：\n\n```bash\ncd src\npyrcc5 icon.qrc -o resources.py\n```\n\n## 项目结构\n\n```\nMsgNotification/\n├── src/\n│   ├── MsgNotification.py        # 主入口，创建 QApplication 和 OpenSocket 管理器\n│   ├── global_message_toast.py   # Toast 弹窗组件 + 消息队列管理器\n│   ├── opensocket_manager.py     # OpenSocket 通信与 Toast 的桥接层\n│   ├── resources.py              # 编译后的 Qt 资源（图标）\n│   ├── icon.qrc                  # Qt 资源定义文件\n│   └── 资源文件编译.bat           # 资源编译脚本\n├── assets/\n│   └── MsgNotification.ico       # 应用图标\n├── scripts/\n│   └── nsis/\n│       ├── MsgNotification.nsi   # NSIS 安装包脚本\n│       ├── compress.bat          # NSIS 打包脚本\n│       ├── Icon/                 # 安装包图标\n│       ├── AppFile/              # 待打包文件目录\n│       └── OtherFile/            # 安装界面素材（许可证、侧边图等）\n├── release/                      # 已发布的安装包\n├── 程序打包(nuitka).bat           # Nuitka 打包脚本\n└── 复制到NSIS待打包文件目录.bat    # 复制 exe 到 NSIS 目录\n```\n\n## 打包与发布\n\n### 1. Nuitka 打包\n\n将 Python 程序编译为独立 exe：\n\n```bash\npython -m nuitka --onefile --enable-plugin=pyqt5 --windows-disable-console --windows-icon-from-ico=\"assets/MsgNotification.ico\" --output-dir=\"dist\" src/MsgNotification.py\n```\n\n或直接运行 `程序打包(nuitka).bat`。\n\n### 2. NSIS 安装包\n\n1. 将 `dist/MsgNotification.exe` 复制到 `scripts/nsis/AppFile/exe/`\n2. 使用 NSIS 编译 `MsgNotification.nsi` 生成安装包\n\n```bash\n# 或运行\n复制到NSIS待打包文件目录.bat\ncd scripts/nsis\nmakensisw.exe MsgNotification.nsi\n```\n\n生成的安装包将位于 `scripts/nsis/bin/` 目录。\n\n## OpenSocket 接口\n\n应用通过以下接口接收消息：\n\n| 功能名称 | AppID | OpenSocketID | 参数 |\n|---------|-------|--------------|------|\n| ShowMsg | `0x00000014` | `0x00000010` | `msgContext` (string) — 消息内容 |\n\n收到消息后，应用会回复 `\"OK\"` 确认，并在屏幕上展示 Toast 弹窗。\n\n## 技术栈\n\n- **Python 3.8+** — 主语言\n- **PyQt5** — GUI 框架（动画、窗口管理）\n- **Nuitka** — Python 到 C 编译打包\n- **NSIS** — Windows 安装包制作\n- **KnotLink OpenSocket** — 跨进程通信\n\n## 许可证\n\nCopyright © 2026 创猿er. All rights reserved.\n\n---\n\n🔗 相关项目：[KnotLink](https://github.com/hxh230802/KnotLink) — 通用桥接系统\n",
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
    "id": "MultiTTS_Client",
    "type": "plugin",
    "typeLabel": "插入式",
    "typeIcon": "🧩",
    "dir": "plugin/MultiTTS_Client",
    "name": "MultiTTS_Client",
    "appName": "MultiTTS",
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
    ]
  },
  {
    "id": "ClassIsland-信",
    "type": "standalone",
    "typeLabel": "独立式",
    "typeIcon": "🚀",
    "dir": "standalone/ClassIsland-信",
    "name": "ClassIsland-信",
    "appName": "ClassIsland",
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
    ]
  },
  {
    "id": "NamePicker",
    "type": "standalone",
    "typeLabel": "独立式",
    "typeIcon": "🚀",
    "dir": "standalone/NamePicker",
    "name": "NamePicker",
    "appName": "RandomPicker",
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
        "appId": "NamePicker",
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
    ]
  }
];
