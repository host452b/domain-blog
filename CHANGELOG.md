# Changelog

## 2026-04-15

### Added
- **名人堂 (Hall of Fame)** — 文章收录体系
  - Dan Koe "Fix Your Entire Life in 1 Day" 中英双版本
  - 名人堂收录规范写入 SKILL.md（保留原文精华、跳读标记、金句提炼）
- **评论系统** — Giscus (GitHub Discussions)
  - `Comments.astro` 组件，repo-id/category-id 已配置
  - 暗色模式自动跟随切换
  - `⚠️ 需手动安装 Giscus App: https://github.com/apps/giscus`
- **Copy Article 按钮** — 5 层隐形签名防盗版
  - 层1: LRM 方向标记 + 零宽编码（文首）
  - 层2: 段落间零宽签名（第3/6段后）
  - 层3: 变体选择符散布（正文 ~8 个汉字后）
  - 层4: 零宽字符完整签名 + 时间戳 + 唯一指纹（文末）
  - 层5: Unicode Tags Block 水印（文末）
  - 每次复制生成唯一 fingerprint，可追溯具体复制事件
- **TL;DR 小标题** — TLDR 组件顶部显示 `TL;DR` label
- **安全红线** — 写入 SKILL.md 和 memory
  - 禁止在文件中写入 Key/Token/密码
  - 禁止自动执行账户安全类操作
  - 需要用户手动操作的事项标记 `⚠️`

### Changed
- **排版升级** (UI/UX Pro Max Swiss Modernism 2.0)
  - 正文字号 16px → 17px（长文阅读甜点）
  - 行宽限制 65ch（最佳阅读 measure）
  - 段间距 1.25em → 1.5em（更多呼吸感）
  - 标题加粗 600 → 700 + 负字距（清晰层级）
  - H2 增加底部细线分隔
  - 引用块：灰色左线 → 蓝色左线 + 淡蓝背景 + 放大字号
  - 表格：无样式 → 清晰表头/行线/左对齐
  - 加粗标记 font-weight: 650（跳读标记专用）
  - 列表行距提升

### Fixed
- **Astro v5 API** — `post.render()` → `render(post)` from `astro:content`
- **RSS** — 移除原始 Markdown content 字段（RSS 只保留 TLDR description）
- **依赖分类** — `@astrojs/rss` → dependencies, `@astrojs/check` → devDependencies
- **Favicon** — Base.astro 增加 `<link rel="icon" href="/favicon.svg">`
- **Lang 属性** — `<html lang="zh">` 硬编码 → `lang={lang}` prop（支持英文文章）

---

## 2026-04-12

### Added
- **名人堂目录** — `名人堂/` 存放英文原版和中文版收藏文

---

## 2026-04-11

### Added
- 项目初始化：Astro 5 + Cloudflare Pages
- 4 个 LXGW 字体（WenKai/NeoXiHei/NeoZhiSong/ZhenKai）via cn-font-split
- 暗色模式（localStorage + prefers-color-scheme + is:inline 防闪白）
- Content Collection：2 篇示例文章（中文 + 英文）
- 博客文章页：TLDR + TOC (scrollspy) + 阅读时间 + 上下篇导航
- 首页：GlitchTitle + 分类筛选 + 文章卡片
- 标签页 / 分类页
- About / Projects 静态页
- CSS Glitch Layer（链接 hover 字体偏移、.glitch-char/.glitch-line/.glitch-mono）
- Pretext 组件（GlitchTitle/PullQuote/SectionHeader）
- Pagefind 搜索（Cmd+K，data-pagefind-body 定向索引）
- RSS Feed（@astrojs/rss）
- Shiki 语法高亮（github-light + github-dark-dimmed）
- 部署指南 `docs/deploy-guide.md`
- GitHub Actions workflow `.github/workflows/deploy.yml`
- SKILL.md / FLOW.md
