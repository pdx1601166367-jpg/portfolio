# 杨杰 · AI 产品经理个人网站

一个纯静态的个人作品集网站，用来集中展示个人经历、能力、项目与工作方式。核心表达是：把 AI 变成可用的产品能力。

## 在线地址

- 主站（腾讯云 CloudBase）：<https://pdx-portfolio-my-resume-d0g4ha6u2bba2a0de.webapps.tcloudbase.com>
- 备份（GitHub Pages）：<https://pdx1601166367-jpg.github.io/portfolio/>

## 项目概况

- 定位：AI 产品经理个人品牌站
- 形式：纯静态站点，无后端、无数据库、无表单服务
- 核心目标：让访客快速理解“我是谁、我做过什么、我怎么做事”
- 当前状态：已上线，腾讯云 CloudBase 为主入口，GitHub Pages 保留为备份

## 页面结构

### 首页 `index.html`

- 首屏：透明背景动态视频 + 渐变背景 + 姓名与标语
- 关于我：个人信息、教育经历、实习经历、AI 产品观 + 动态头像
- 我的奇妙世界：AI Wiki、OfferFlow、海星的工作生活、GymBuddy 四张能力卡片 + 动态人物
- 项目经历：四个项目的摘要、角色、周期、核心动作与成果
- 工作方法：看清问题 / 找到杠杆 / 快速验证 / 做成体验
- 秘密武器库：产品能力、AI 能力、工具栈、语言与其他
- 联系：邮箱、手机、GitHub、下载简历

### 项目详情页 `project.html`

- AI Wiki：企业知识库，RAG 检索 + 安全防护
- OfferFlow：AI 产品经理求职面试平台，从 AI Workflow 到 AI Agent
- 海星的工作生活：本地优先的效率工具 App
- GymBuddy：健身社交 MVP，器械识别与训练指导

### 辅助页面

- `style-guide.html`：设计规范参考
- `liquid-effect.html`：液体背景效果参考

## 技术栈

- HTML / CSS / JavaScript（原生，无构建工具）
- Three.js：液体背景，通过 jsDelivr CDN 加载
- Google Fonts：Kanit + Noto Sans SC
- WebM / WebP：透明背景视频与动图
- 部署：腾讯云 CloudBase 静态网站托管

## 目录结构

```text
个人网站/
├─ index.html               # 首页
├─ project.html             # 四个项目详情页
├─ styles.css               # 全站样式
├─ interactions.js          # 交互与动效
├─ style-guide.html         # 设计规范参考
├─ liquid-effect.html       # 液体背景效果参考
├─ assets/
│  ├─ videos/               # 透明动画：关于我、奇妙世界
│  ├─ projects/             # 四个项目的截图与流程图
│  ├─ about/                # 头像等个人素材
│  ├─ docs/                 # 简历 PDF、AI Wiki 方案与安全报告
│  └─ favicon.png
├─ 首屏视频-cut3.webm       # 首屏透明视频
├─ 首屏视频-poster.png      # 首屏兜底图
└─ README.md
```

根目录下的 mp4、PNG、预览图、备份文件等属于源素材与过程文件，不影响站点运行。

## 资源清单

| 资源 | 位置 | 说明 |
| --- | --- | --- |
| 首屏透明视频 | `首屏视频-cut3.webm` | 首页首屏主视觉 |
| 首屏兜底图 | `首屏视频-poster.png` | 视频未加载时展示 |
| 关于我动态动画 | `assets/videos/about-animation.webp` | 关于我部分动态视觉 |
| 奇妙世界动态人物 | `assets/videos/universe-character.webp` | 奇妙世界部分动态视觉 |
| 项目截图 | `assets/projects/` | 四个项目的图片素材 |
| 简历 | `assets/docs/YangJie-AI-Product-Resume.pdf` | 简历内嵌作品集链接 |
| AI Wiki 产品方案 | `assets/docs/Harbor-AI-Wiki-Product-Plan.pdf` | 项目详情页文档 |
| AI Wiki 安全报告 | `assets/docs/AI-Wiki-Security-Report.md` | 知识库安全测试报告 |

## 本地预览

在项目根目录启动一个静态服务器：

```bash
python -m http.server 8080
```

然后访问 <http://127.0.0.1:8080>。

## 部署与更新

- 代码仓库：<https://github.com/pdx1601166367-jpg/portfolio>
- 主站托管：腾讯云 CloudBase 静态网站托管，Git 仓库部署
- 构建产物目录：`.`（安装命令与构建命令留空）

日常更新流程：

```bash
git add .
git commit -m "update"
git push origin main
```

推送后到 CloudBase 控制台点击“重新部署”，或等待自动部署完成。

## 设计语言

- 米白 + 浅蓝渐变背景，低饱和点缀色
- 深色文字、统一圆角与卡片层级
- 透明视频与浮动动效作为视觉记忆点
- 中文为主，英文作为品牌、编号与点缀

## 注意事项

- 纯静态站点，没有后端接口；外部依赖仅有 Google Fonts 与 jsDelivr
- 外部资源加载失败时页面可以降级展示，不影响主体内容
- 视频素材建议保持 WebM / WebP 格式，压缩时不要牺牲透明通道
- 简历 PDF 内嵌的“作品集”链接指向腾讯云地址
- 如果更换域名或云环境，需要同步更新 README 与简历链接
