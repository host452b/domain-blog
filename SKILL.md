# Blog Development Skill

## 安全红线（绝对禁止）

- **禁止在任何文件中写入 API Key、Token、密码、Secret**
- **禁止在 git commit 中包含任何凭证**
- **禁止自动执行涉及账户安全的操作**（如启用/关闭 GitHub App、修改仓库权限、修改 OAuth 配置）
- **禁止自动安装第三方 GitHub App**
- 需要用户手动操作的事项，写成清晰的步骤清单，标记 `⚠️ 需要你手动操作`
- Key 只通过 `os.environ` 或运行时参数传入，用完即丢
- 每次 commit 前自动审查是否有凭证泄露

## Content Workflow

1. Create `.md` file in `src/content/blog/`
2. Frontmatter: title, date, tldr, category, tags, draft, lang(optional)
3. First paragraph = TLDR
4. `git push` → Cloudflare auto-deploys in ~30s

## Typography System

- Latin: system font stack (`-apple-system, ...`)
- CJK body: LxgwWenKai (loaded via `<link>` in Base.astro, NOT CSS @import)
- CJK UI: LxgwNeoXiHei (header, tags, metadata)
- CJK glitch: LxgwNeoZhiSong (surfaces on link hover)
- CJK emphasis: LxgwZhenKai (pull quotes)
- Code: system monospace
- Fonts split via cn-font-split → `public/fonts/` (woff2 + result.css)

## Glitch CSS

- Principle: felt, not seen
- `.prose a:hover` → font-family shift to NeoZhiSong (0.3s transition)
- `.glitch-char` → single character in different font
- `.glitch-line` → letter-spacing 0.01em drift
- `.glitch-mono::after` → opacity 0.03 monospace fragment

## Theme System

- CSS custom properties in `theme.css`: --bg, --text, --text-muted, --link, --code-bg, --border
- `data-theme` attribute on `<html>`
- Inline `<script is:inline>` reads localStorage → sets theme before paint (no flash)
- `@media (prefers-color-scheme: dark)` fallback for no-JS

## Build Pipeline

```
astro build → pagefind --site dist → deploy to Cloudflare Pages edge
```

- Shiki syntax highlighting (github-light + github-dark-dimmed)
- Pagefind indexes only `data-pagefind-body` elements
- Header/Footer have `data-pagefind-ignore`

## Content Collection Schema

```
title: string (required)
date: Date (required)
tldr: string (required)
category: string (required)
tags: string[] (default [])
draft: boolean (default false)
lang: 'zh' | 'en' (optional)
```

## Key Rules

- Use `render(post)` from `astro:content` (Astro v5), NOT `post.render()`
- Font CSS via `<link>` tags in Base.astro head, never CSS `@import`
- Use `var(--border)` for borders, never hardcoded `#eee`
- `is:inline` on theme script to prevent Astro bundling
- RSS uses TLDR as description (raw Markdown not suitable for content field)

## 名人堂文章收录规范

### 文件结构

```
名人堂/
├── author-title.md        ← 英文原版/完整收藏版
└── author-title.cn.md     ← 中文版（母语级翻译，非逐句翻译）

src/content/blog/
└── author-title.md        ← 博客发布版（含 frontmatter，可略微精简）
```

### Frontmatter 模板

```yaml
---
title: "中文标题 | English Title"
date: YYYY-MM-DD          # 原文发布日期
tldr: "一到两句话核心论点"
category: "名人堂"
tags: ["作者名", "主题标签"]
lang: zh                   # 或 en
---
```

### 内容质量标准

**必须保留（绝不删减）：**
- 引发社区轰动、X 疯转的**关键观点**
- 让人停下来深思的**金句和段落**
- 生动的**比喻和类比**（如"健美运动员不需要咬牙吃健康食物"）
- **心理学/认知框架**必须配真实世界的例子（不能只有抽象标签）
- 原作者的**直接引用**（保留引用格式 `>`）
- 完整的**协议/步骤/练习**（21 个问题就写 21 个，不精简为 5 个）
- **表格**每行必须有具体例子（不只是分类名）
- 末尾单独设**「核心金句」**章节，提炼 5-8 句最有力的话

**正文长度：** 原文的 70-90%，不是 30% 的摘要

### 可读性增强：跳读标记

在长难句中，对**核心论点词或短语**加粗，形成"跳读层"：
- 只看粗体就能串起全文的论证链条
- 每段最多 1-2 处加粗
- **加粗论点，不加粗修饰语**
- 读者扫一眼粗体就能决定这段要不要细读

示例对比：

```
❌ 大多数人设定一个肤浅的目标，靠意志力撑过头几周，然后毫无挣扎地回到老样子——因为他们在一个腐烂的地基上试图建造伟大的生活。

✅ 大多数人设定一个肤浅的目标，靠意志力撑过头几周，然后**毫无挣扎地回到老样子**——因为他们在一个**腐烂的地基**上试图建造伟大的生活。
```

### 中文版要求

- 读起来像**母语写的**，不是翻译腔
- 比喻可以适度本地化（但保留原文精神）
- 专有名词保留英文或附注：控制论（Cybernetics）
- 引用保持原文语言 + 中文翻译

### TL;DR 格式

- TLDR 组件自带 `TL;DR` 小标题
- 内容 1-2 句话，覆盖：核心论点 + 方法论关键词 + 一个数据点或金句
- 写在 frontmatter 的 `tldr` 字段中
