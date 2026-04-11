# Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal Astro blog on Cloudflare Pages with Apple-style restraint and typographic glitch as subtle infiltration.

**Architecture:** Static site built with Astro content collections. CSS-only glitch for prose, pretext-powered islands for showcase moments (titles, pull quotes, headers). LXGW fonts for CJK, system stack for Latin. Pagefind for search, Shiki for syntax highlighting.

**Tech Stack:** Astro 5, TypeScript, pretext, Pagefind, @astrojs/rss, cn-font-split, Cloudflare Pages

---

## File Map

```
astro.config.mjs              — Astro config, Shiki themes, site URL
tsconfig.json                  — TypeScript config
package.json                   — Dependencies and scripts
src/
├── content/
│   ├── config.ts              — Content collection schema
│   └── blog/
│       ├── hello-world.md     — Sample post (Chinese)
│       └── first-english.md   — Sample post (English)
├── data/
│   └── projects.json          — Projects data
├── styles/
│   ├── global.css             — Reset, font-face, CSS custom properties
│   ├── typography.css         — Prose styles, font stacks, glitch keyframes
│   └── theme.css              — Light/dark mode tokens
├── lib/
│   ├── reading-time.ts        — Reading time calculator
│   └── pretext.ts             — Pretext wrapper for character measurement
├── components/
│   ├── layout/
│   │   ├── Header.astro       — Site nav, dark mode toggle, search trigger
│   │   ├── Footer.astro       — RSS, GitHub, minimal links
│   │   ├── ThemeToggle.astro  — Dark mode island
│   │   └── Search.astro       — Pagefind search modal island
│   ├── blog/
│   │   ├── PostCard.astro     — Post preview card for lists
│   │   ├── TLDR.astro         — TLDR block with whisper background
│   │   ├── TOC.astro          — Table of contents with scrollspy
│   │   └── CategoryFilter.astro — Client-side category pill filter
│   ├── typography/
│   │   ├── GlitchTitle.astro  — Pretext-powered title (island)
│   │   ├── PullQuote.astro    — Pretext-powered quote (island)
│   │   └── SectionHeader.astro — Pretext-powered section header (island)
│   └── glitch/
│       └── GlitchText.astro   — CSS-only glitch for inline prose
├── layouts/
│   ├── Base.astro             — HTML shell, fonts, global styles, head
│   ├── Post.astro             — Blog post layout
│   └── Page.astro             — Static page layout
└── pages/
    ├── index.astro            — Homepage with post list
    ├── about.astro            — About page
    ├── projects.astro         — Projects page
    ├── blog/[...slug].astro   — Blog post routes
    ├── tags/[tag].astro       — Tag listing
    ├── categories/[cat].astro — Category listing
    └── rss.xml.ts             — RSS feed
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`

- [ ] **Step 1: Create Astro project**

```bash
cd "/Users/joejiang/Desktop/我的域名"
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

Select defaults if prompted. This creates the minimal Astro scaffold.

- [ ] **Step 2: Install core dependencies**

```bash
npm install
npm install @astrojs/rss
npm install -D @pagefind/default-ui pagefind
```

- [ ] **Step 3: Configure Astro**

Replace `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.pages.dev',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
    },
  },
});
```

- [ ] **Step 4: Verify dev server starts**

```bash
npx astro dev
```

Expected: Server starts at `localhost:4321`, default page renders.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with core dependencies"
```

---

### Task 2: Global Styles & Font Setup

**Files:**
- Create: `src/styles/global.css`, `src/styles/theme.css`, `src/styles/typography.css`
- Create: `scripts/split-fonts.mjs` (font subsetting script)

- [ ] **Step 1: Install font tooling**

```bash
npm install -D cn-font-split
```

Download LXGW font files (TTF/OTF) from GitHub releases and place them in `fonts/` directory:

```bash
mkdir -p fonts
curl -L -o fonts/LXGWWenKai-Regular.ttf "https://github.com/lxgw/LxgwWenKai/releases/latest/download/LXGWWenKai-Regular.ttf"
curl -L -o fonts/LXGWNeoXiHei-Regular.ttf "https://github.com/lxgw/LxgwNeoXiHei/releases/latest/download/LXGWNeoXiHei-Regular.ttf"
curl -L -o fonts/LXGWNeoZhiSong-Regular.ttf "https://github.com/lxgw/LxgwNeoZhiSong/releases/latest/download/LXGWNeoZhiSong-Regular.ttf"
curl -L -o fonts/LXGWZhenKai-Regular.ttf "https://github.com/lxgw/LxgwZhenKai/releases/latest/download/LXGWZhenKai-Regular.ttf"
```

Note: If exact URLs differ, check each repo's releases page for the latest download link.

- [ ] **Step 2: Create font splitting script**

Create `scripts/split-fonts.mjs`:

```js
import { fontSplit } from 'cn-font-split';

const fonts = [
  { name: 'LXGWWenKai', file: 'LXGWWenKai-Regular.ttf' },
  { name: 'LXGWNeoXiHei', file: 'LXGWNeoXiHei-Regular.ttf' },
  { name: 'LXGWNeoZhiSong', file: 'LXGWNeoZhiSong-Regular.ttf' },
  { name: 'LXGWZhenKai', file: 'LXGWZhenKai-Regular.ttf' },
];

for (const font of fonts) {
  await fontSplit({
    FontPath: `./fonts/${font.file}`,
    destFold: `./public/fonts/${font.name}`,
    targetType: 'woff2',
    chunkSize: 70 * 1024,
    testHTML: false,
    reporter: false,
  });
}
```

- [ ] **Step 3: Run font splitting**

```bash
node scripts/split-fonts.mjs
```

Expected: `public/fonts/` contains subdirectories for each font with `.woff2` chunks and a `result.css` file containing `@font-face` declarations with `unicode-range`.

- [ ] **Step 4: Create theme.css**

Create `src/styles/theme.css`:

```css
:root,
[data-theme='light'] {
  --bg: #ffffff;
  --text: #1a1a1a;
  --text-muted: #999999;
  --link: #0066cc;
  --code-bg: #f7f7f7;
}

[data-theme='dark'] {
  --bg: #111111;
  --text: #e0e0e0;
  --text-muted: #666666;
  --link: #4d9fff;
  --code-bg: #1a1a1a;
}
```

- [ ] **Step 5: Create global.css**

Create `src/styles/global.css`:

```css
/* Import cn-font-split generated @font-face rules */
@import '/fonts/LXGWWenKai/result.css';
@import '/fonts/LXGWNeoXiHei/result.css';
@import '/fonts/LXGWNeoZhiSong/result.css';
@import '/fonts/LXGWZhenKai/result.css';

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'LXGWWenKai';
  line-height: 1.7;
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  transition: background 0s, color 0s;
}

a {
  color: var(--link);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
  text-decoration-color: currentColor;
  opacity: 0.8;
}

a:hover {
  opacity: 1;
}

img {
  max-width: 100%;
  height: auto;
}
```

- [ ] **Step 6: Create typography.css**

Create `src/styles/typography.css`:

```css
/* Font stacks by role */
.font-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'LXGWWenKai';
}

.font-ui {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
}

.font-emphasis {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'LXGWZhenKai';
}

/* Prose styles */
.prose {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2em;
  margin-bottom: 0.5em;
}

.prose h1 { font-size: 1.75rem; }
.prose h2 { font-size: 1.375rem; }
.prose h3 { font-size: 1.125rem; }

.prose p {
  margin-bottom: 1.25em;
}

.prose ul,
.prose ol {
  margin-bottom: 1.25em;
  padding-left: 1.5em;
}

.prose li {
  margin-bottom: 0.25em;
}

.prose blockquote {
  border-left: 2px solid #eee;
  padding-left: 1em;
  color: var(--text-muted);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'LXGWZhenKai';
}

.prose code {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
  font-size: 0.875em;
  background: var(--code-bg);
  padding: 0.15em 0.3em;
  border-radius: 3px;
}

.prose pre {
  background: var(--code-bg);
  padding: 1.25rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1.25em;
}

.prose pre code {
  background: none;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.6;
}

.prose a {
  color: var(--link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
}

.prose hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 2em 0;
}
```

- [ ] **Step 7: Verify styles load**

Update `src/pages/index.astro` temporarily:

```astro
---
import '../styles/theme.css';
import '../styles/global.css';
import '../styles/typography.css';
---
<html>
  <body>
    <div class="prose">
      <h1>Test 测试</h1>
      <p>Latin text with 中文混合排版。A <a href="#">blue link</a> with minimal underline.</p>
      <pre><code>const hello = 'world';</code></pre>
    </div>
  </body>
</html>
```

Run `npx astro dev` and verify: white background, LXGW fonts for CJK, system fonts for Latin, blue link, code block styled.

- [ ] **Step 8: Commit**

```bash
git add src/styles/ scripts/split-fonts.mjs public/fonts/ fonts/.gitkeep
git commit -m "feat: add global styles, theme tokens, and LXGW font setup"
```

Note: Add `fonts/*.ttf` to `.gitignore` — they're large source files. Only the split `public/fonts/` output should be committed.

---

### Task 3: Base Layout

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/layout/Header.astro`, `src/components/layout/Footer.astro`

- [ ] **Step 1: Create Base.astro**

Create `src/layouts/Base.astro`:

```astro
---
import '../styles/theme.css';
import '../styles/global.css';
import '../styles/typography.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = '' } = Astro.props;
---
<html lang="zh" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />
    {description && <meta name="description" content={description} />}
    <title>{title}</title>
    <script is:inline>
      const theme = localStorage.getItem('theme')
        || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.dataset.theme = theme;
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

The inline script runs before paint to prevent flash of wrong theme.

- [ ] **Step 2: Create Header.astro**

Create `src/components/layout/Header.astro`:

```astro
---
interface Props {
  showSearch?: boolean;
}

const { showSearch = true } = Astro.props;
---
<header class="header">
  <nav class="header-nav">
    <a href="/" class="header-home">首页</a>
    <div class="header-links">
      <a href="/about">About</a>
      <a href="/projects">Projects</a>
      {showSearch && <button class="search-trigger" id="search-trigger" aria-label="Search">⌕</button>}
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <span class="theme-icon-light">☀</span>
        <span class="theme-icon-dark">☾</span>
      </button>
    </div>
  </nav>
</header>

<style>
  .header {
    margin-bottom: 3rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
    font-size: 0.875rem;
  }

  .header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-home {
    text-decoration: none;
    color: var(--text);
    font-weight: 500;
  }

  .header-links {
    display: flex;
    gap: 1.25rem;
    align-items: center;
  }

  .header-links a {
    text-decoration: none;
    color: var(--text-muted);
  }

  .header-links a:hover {
    color: var(--text);
  }

  .search-trigger,
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 1rem;
    padding: 0;
    line-height: 1;
  }

  .search-trigger:hover,
  .theme-toggle:hover {
    color: var(--text);
  }

  [data-theme='light'] .theme-icon-dark { display: none; }
  [data-theme='dark'] .theme-icon-light { display: none; }
</style>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
</script>
```

- [ ] **Step 3: Create Footer.astro**

Create `src/components/layout/Footer.astro`:

```astro
---
---
<footer class="footer">
  <a href="/rss.xml">RSS</a>
  <span class="footer-sep">·</span>
  <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
</footer>

<style>
  .footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
  }

  .footer a {
    color: var(--text-muted);
    text-decoration: none;
  }

  .footer a:hover {
    color: var(--text);
  }

  .footer-sep {
    margin: 0 0.5rem;
  }
</style>
```

- [ ] **Step 4: Wire up index.astro with layout**

Replace `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
---
<Base title="我的博客">
  <Header />
  <main>
    <h1 style="font-size: 1.75rem; font-weight: 600; margin-bottom: 0.5rem;">我的博客</h1>
    <p style="color: var(--text-muted); font-size: 0.875rem;">placeholder</p>
  </main>
  <Footer />
</Base>
```

- [ ] **Step 5: Verify layout renders**

Run `npx astro dev`. Expected: page shows header with nav links, title, footer with RSS/GitHub. Dark mode toggle switches themes. No flash on reload.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/ src/components/layout/ src/pages/index.astro
git commit -m "feat: add Base layout with Header and Footer"
```

---

### Task 4: Content Collection & Sample Posts

**Files:**
- Create: `src/content/config.ts`, `src/content/blog/hello-world.md`, `src/content/blog/first-english.md`

- [ ] **Step 1: Create content collection schema**

Create `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tldr: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.enum(['zh', 'en']).optional(),
  }),
});

export const collections = { blog };
```

Note: `category` is `z.string()` for now — no fixed enum until the user defines categories. Can tighten later.

- [ ] **Step 2: Create sample Chinese post**

Create `src/content/blog/hello-world.md`:

```markdown
---
title: "你好，世界"
date: 2026-04-11
tldr: "这是第一篇博文，用来测试中文排版和整体布局。"
category: "随笔"
tags: ["meta", "测试"]
lang: zh
---

这是第一篇博文，用来测试中文排版和整体布局。

## 为什么写博客

写作是思考的延伸。把想法写下来，迫使你把模糊的直觉变成清晰的论述。

## 一段代码

```typescript
const greet = (name: string): string => {
  return `你好，${name}`;
};
```

这段代码没有什么特别的，只是测试 syntax highlighting 是否正常工作。

## 混合语言

有时候用中文写，有时候用 English，有时候 mix together。This is intentional — 语言跟着思维走，不需要切换。
```

- [ ] **Step 3: Create sample English post**

Create `src/content/blog/first-english.md`:

```markdown
---
title: "On Restraint"
date: 2026-04-10
tldr: "Less is not nothing. It's the discipline of choosing what earns its place."
category: "essay"
tags: ["design", "typography"]
lang: en
---

Less is not nothing. It's the discipline of choosing what earns its place.

## The Problem With Minimalism

Most "minimal" designs are just empty. They remove things without understanding why those things existed. True restraint is knowing what to leave in.

## A Code Example

```css
body {
  max-width: 720px;
  margin: 0 auto;
  font-family: system-ui;
}
```

Three lines. That's the whole layout. Everything else is typography.
```

- [ ] **Step 4: Verify content collection loads**

```bash
npx astro check
```

Expected: No errors. Content collection schema validates both posts.

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: add blog content collection with sample posts"
```

---

### Task 5: Reading Time Utility

**Files:**
- Create: `src/lib/reading-time.ts`

- [ ] **Step 1: Create reading time calculator**

Create `src/lib/reading-time.ts`:

```ts
export function readingTime(text: string): string {
  // CJK characters: ~300 chars/min
  // Latin words: ~200 words/min
  const cjkChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const latinWords = text
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, '')
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.ceil(cjkChars / 300 + latinWords / 200);
  return `${Math.max(1, minutes)} min`;
}
```

- [ ] **Step 2: Verify with a quick build check**

```bash
npx astro check
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/reading-time.ts
git commit -m "feat: add reading time calculator for CJK and Latin"
```

---

### Task 6: Blog Post Page

**Files:**
- Create: `src/layouts/Post.astro`, `src/components/blog/TLDR.astro`, `src/components/blog/TOC.astro`, `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Create TLDR component**

Create `src/components/blog/TLDR.astro`:

```astro
---
interface Props {
  text: string;
}

const { text } = Astro.props;
---
<div class="tldr">
  {text}
</div>

<style>
  .tldr {
    background: rgba(0, 0, 0, 0.02);
    padding: 1rem 1.25rem;
    margin-bottom: 2rem;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text);
    border-radius: 2px;
  }

  [data-theme='dark'] .tldr {
    background: rgba(255, 255, 255, 0.03);
  }
</style>
```

- [ ] **Step 2: Create TOC component**

Create `src/components/blog/TOC.astro`:

```astro
---
interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const { headings } = Astro.props;
const filtered = headings.filter((h) => h.depth >= 2 && h.depth <= 3);
---
{filtered.length > 0 && (
  <nav class="toc" aria-label="Table of contents">
    <ul>
      {filtered.map((h) => (
        <li class={h.depth === 3 ? 'toc-sub' : ''}>
          <a href={`#${h.slug}`}>{h.text}</a>
        </li>
      ))}
    </ul>
  </nav>
)}

<style>
  .toc {
    font-size: 0.8rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
    margin-bottom: 2rem;
    color: var(--text-muted);
  }

  .toc ul {
    list-style: none;
    padding: 0;
  }

  .toc li {
    margin-bottom: 0.3rem;
  }

  .toc-sub {
    padding-left: 1rem;
  }

  .toc a {
    color: var(--text-muted);
    text-decoration: none;
  }

  .toc a:hover {
    color: var(--text);
  }

  @media (min-width: 1100px) {
    .toc {
      position: fixed;
      top: 4rem;
      left: calc(50% + 400px);
      width: 200px;
      margin-bottom: 0;
    }
  }
</style>

<script>
  const links = document.querySelectorAll('.toc a');
  const headings = Array.from(links).map((link) => {
    const id = link.getAttribute('href')?.slice(1);
    return id ? document.getElementById(id) : null;
  }).filter(Boolean) as HTMLElement[];

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('toc-active'));
          const active = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
          active?.classList.add('toc-active');
        }
      }
    },
    { rootMargin: '-80px 0px -60% 0px' }
  );

  headings.forEach((h) => observer.observe(h));
</script>

<style>
  .toc a.toc-active {
    color: var(--text);
  }
</style>
```

- [ ] **Step 3: Create Post layout**

Create `src/layouts/Post.astro`:

```astro
---
import Base from './Base.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import TLDR from '../components/blog/TLDR.astro';
import TOC from '../components/blog/TOC.astro';
import { readingTime } from '../lib/reading-time';

interface Props {
  title: string;
  date: Date;
  tldr: string;
  category: string;
  tags: string[];
  headings: { depth: number; slug: string; text: string }[];
  body: string;
  prevPost?: { title: string; slug: string };
  nextPost?: { title: string; slug: string };
}

const { title, date, tldr, category, tags, headings, body, prevPost, nextPost } = Astro.props;
const time = readingTime(body);
const dateStr = date.toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---
<Base title={title} description={tldr}>
  <Header />
  <main>
    <a href="/" class="back-link">← 返回</a>
    <article>
      <h1 class="post-title">{title}</h1>
      <div class="post-meta">
        <time datetime={date.toISOString()}>{dateStr}</time>
        <span>·</span>
        <a href={`/categories/${category}`}>{category}</a>
        <span>·</span>
        <span>{time}</span>
      </div>
      <TLDR text={tldr} />
      <TOC headings={headings} />
      <div class="prose">
        <slot />
      </div>
      <div class="post-tags">
        {tags.map((tag) => (
          <a href={`/tags/${tag}`} class="tag">#{tag}</a>
        ))}
      </div>
      <nav class="post-nav">
        {prevPost && <a href={`/blog/${prevPost.slug}`} class="post-nav-prev">← {prevPost.title}</a>}
        {nextPost && <a href={`/blog/${nextPost.slug}`} class="post-nav-next">{nextPost.title} →</a>}
      </nav>
    </article>
  </main>
  <Footer />
</Base>

<style>
  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.85rem;
  }

  .back-link:hover {
    color: var(--text);
  }

  .post-title {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .post-meta {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .post-meta a {
    color: var(--text-muted);
    text-decoration: none;
  }

  .post-meta a:hover {
    color: var(--text);
  }

  .post-tags {
    margin-top: 3rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .tag {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
  }

  .tag:hover {
    color: var(--text);
  }

  .post-nav {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
  }

  .post-nav a {
    color: var(--text-muted);
    text-decoration: none;
    max-width: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .post-nav a:hover {
    color: var(--link);
  }

  .post-nav-next {
    margin-left: auto;
  }
</style>
```

- [ ] **Step 4: Create blog post route**

Create `src/pages/blog/[...slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import Post from '../../layouts/Post.astro';

export async function getStaticPaths() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return posts.map((post, i) => ({
    params: { slug: post.id },
    props: {
      post,
      prevPost: posts[i + 1] ? { title: posts[i + 1].data.title, slug: posts[i + 1].id } : undefined,
      nextPost: posts[i - 1] ? { title: posts[i - 1].data.title, slug: posts[i - 1].id } : undefined,
    },
  }));
}

const { post, prevPost, nextPost } = Astro.props;
const { Content, headings } = await post.render();
---
<Post
  title={post.data.title}
  date={post.data.date}
  tldr={post.data.tldr}
  category={post.data.category}
  tags={post.data.tags}
  headings={headings}
  body={post.body ?? ''}
  prevPost={prevPost}
  nextPost={nextPost}
>
  <Content />
</Post>
```

- [ ] **Step 5: Verify blog post renders**

Run `npx astro dev`. Navigate to `localhost:4321/blog/hello-world`. Expected: post renders with title, metadata, TLDR block, TOC, prose content, code highlighting, tags.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/Post.astro src/components/blog/ src/pages/blog/
git commit -m "feat: add blog post page with TLDR, TOC, and reading time"
```

---

### Task 7: Homepage

**Files:**
- Create: `src/components/blog/PostCard.astro`, `src/components/blog/CategoryFilter.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create PostCard component**

Create `src/components/blog/PostCard.astro`:

```astro
---
import { readingTime } from '../../lib/reading-time';

interface Props {
  title: string;
  date: Date;
  tldr: string;
  tags: string[];
  slug: string;
  body: string;
}

const { title, date, tldr, tags, slug, body } = Astro.props;
const time = readingTime(body);
const dateStr = date.toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
---
<article class="post-card">
  <a href={`/blog/${slug}`} class="post-card-link">
    <div class="post-card-header">
      <h2 class="post-card-title">{title}</h2>
      <time class="post-card-date" datetime={date.toISOString()}>{dateStr}</time>
    </div>
    <p class="post-card-tldr">{tldr}</p>
  </a>
  <div class="post-card-footer">
    <div class="post-card-tags">
      {tags.map((tag) => (
        <a href={`/tags/${tag}`} class="post-card-tag">#{tag}</a>
      ))}
    </div>
    <span class="post-card-time">{time}</span>
  </div>
</article>

<style>
  .post-card {
    padding: 1.25rem 0;
    border-bottom: 1px solid #eee;
  }

  .post-card:first-child {
    padding-top: 0;
  }

  .post-card-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .post-card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }

  .post-card-title {
    font-size: 1.05rem;
    font-weight: 500;
    line-height: 1.4;
  }

  .post-card-link:hover .post-card-title {
    color: var(--link);
  }

  .post-card-date {
    font-size: 0.8rem;
    color: var(--text-muted);
    white-space: nowrap;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
  }

  .post-card-tldr {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .post-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.4rem;
  }

  .post-card-tags {
    display: flex;
    gap: 0.5rem;
  }

  .post-card-tag {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
  }

  .post-card-tag:hover {
    color: var(--text);
  }

  .post-card-time {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
  }
</style>
```

- [ ] **Step 2: Create CategoryFilter component**

Create `src/components/blog/CategoryFilter.astro`:

```astro
---
interface Props {
  categories: string[];
}

const { categories } = Astro.props;
---
<div class="category-filter" id="category-filter">
  <button class="category-pill active" data-category="all">All</button>
  {categories.map((cat) => (
    <button class="category-pill" data-category={cat}>{cat}</button>
  ))}
</div>

<style>
  .category-filter {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
  }

  .category-pill {
    background: none;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .category-pill:hover {
    color: var(--text);
    border-color: var(--text-muted);
  }

  .category-pill.active {
    color: var(--text);
    border-color: var(--text);
  }
</style>

<script>
  const filter = document.getElementById('category-filter');
  const pills = filter?.querySelectorAll('.category-pill');
  const cards = document.querySelectorAll('[data-category]') as NodeListOf<HTMLElement>;

  pills?.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const category = (pill as HTMLElement).dataset.category;
      cards.forEach((card) => {
        if (card.classList.contains('category-pill')) return;
        card.style.display =
          category === 'all' || card.dataset.category === category
            ? ''
            : 'none';
      });
    });
  });
</script>
```

- [ ] **Step 3: Build the homepage**

Replace `src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import PostCard from '../components/blog/PostCard.astro';
import CategoryFilter from '../components/blog/CategoryFilter.astro';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const categories = [...new Set(posts.map((p) => p.data.category))];
---
<Base title="我的博客">
  <Header />
  <main>
    <h1 class="site-title">我的博客</h1>
    <p class="site-tagline">placeholder tagline</p>
    <CategoryFilter categories={categories} />
    <div class="post-list">
      {posts.map((post) => (
        <div data-category={post.data.category}>
          <PostCard
            title={post.data.title}
            date={post.data.date}
            tldr={post.data.tldr}
            tags={post.data.tags}
            slug={post.id}
            body={post.body ?? ''}
          />
        </div>
      ))}
    </div>
  </main>
  <Footer />
</Base>

<style>
  .site-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .site-tagline {
    color: var(--text-muted);
    font-size: 0.875rem;
    margin-bottom: 2rem;
  }
</style>
```

- [ ] **Step 4: Verify homepage renders**

Run `npx astro dev`. Navigate to `localhost:4321`. Expected: site title, tagline, category pills (All, 随笔, essay), two post cards with title, date, TLDR, tags, reading time. Clicking a category pill filters the list.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/components/blog/PostCard.astro src/components/blog/CategoryFilter.astro
git commit -m "feat: add homepage with post list and category filter"
```

---

### Task 8: Tag & Category Pages

**Files:**
- Create: `src/pages/tags/[tag].astro`, `src/pages/categories/[cat].astro`

- [ ] **Step 1: Create tag listing page**

Create `src/pages/tags/[tag].astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Header from '../../components/layout/Header.astro';
import Footer from '../../components/layout/Footer.astro';
import PostCard from '../../components/blog/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];
  return tags.map((tag) => ({
    params: { tag },
    props: {
      tag,
      posts: posts
        .filter((p) => p.data.tags.includes(tag))
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()),
    },
  }));
}

const { tag, posts } = Astro.props;
---
<Base title={`#${tag}`}>
  <Header />
  <main>
    <a href="/" class="back-link">← 返回</a>
    <h1 class="listing-title">#{tag}</h1>
    <p class="listing-count">{posts.length} 篇文章</p>
    <div class="post-list">
      {posts.map((post: any) => (
        <PostCard
          title={post.data.title}
          date={post.data.date}
          tldr={post.data.tldr}
          tags={post.data.tags}
          slug={post.id}
          body={post.body ?? ''}
        />
      ))}
    </div>
  </main>
  <Footer />
</Base>

<style>
  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.85rem;
  }

  .listing-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .listing-count {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
  }
</style>
```

- [ ] **Step 2: Create category listing page**

Create `src/pages/categories/[cat].astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Header from '../../components/layout/Header.astro';
import Footer from '../../components/layout/Footer.astro';
import PostCard from '../../components/blog/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const categories = [...new Set(posts.map((p) => p.data.category))];
  return categories.map((cat) => ({
    params: { cat },
    props: {
      cat,
      posts: posts
        .filter((p) => p.data.category === cat)
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()),
    },
  }));
}

const { cat, posts } = Astro.props;
---
<Base title={cat}>
  <Header />
  <main>
    <a href="/" class="back-link">← 返回</a>
    <h1 class="listing-title">{cat}</h1>
    <p class="listing-count">{posts.length} 篇文章</p>
    <div class="post-list">
      {posts.map((post: any) => (
        <PostCard
          title={post.data.title}
          date={post.data.date}
          tldr={post.data.tldr}
          tags={post.data.tags}
          slug={post.id}
          body={post.body ?? ''}
        />
      ))}
    </div>
  </main>
  <Footer />
</Base>

<style>
  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.85rem;
  }

  .listing-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .listing-count {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
  }
</style>
```

- [ ] **Step 3: Verify tag/category pages**

Run `npx astro dev`. Navigate to `localhost:4321/tags/meta` and `localhost:4321/categories/随笔`. Expected: back link, heading, post count, filtered post list.

- [ ] **Step 4: Commit**

```bash
git add src/pages/tags/ src/pages/categories/
git commit -m "feat: add tag and category listing pages"
```

---

### Task 9: Static Pages (About & Projects)

**Files:**
- Create: `src/layouts/Page.astro`, `src/pages/about.astro`, `src/pages/projects.astro`, `src/data/projects.json`

- [ ] **Step 1: Create Page layout**

Create `src/layouts/Page.astro`:

```astro
---
import Base from './Base.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
<Base title={title} description={description}>
  <Header />
  <main>
    <h1 class="page-title">{title}</h1>
    <div class="prose">
      <slot />
    </div>
  </main>
  <Footer />
</Base>

<style>
  .page-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
</style>
```

- [ ] **Step 2: Create About page**

Create `src/pages/about.astro`:

```astro
---
import Page from '../layouts/Page.astro';
---
<Page title="About">
  <p>关于这个博客和它的作者。</p>
  <p>Placeholder — replace with your bio.</p>
</Page>
```

- [ ] **Step 3: Create projects data**

Create `src/data/projects.json`:

```json
[
  {
    "name": "Example Project",
    "description": "A sample project to show the layout.",
    "tech": ["TypeScript", "Astro"],
    "url": "https://github.com"
  }
]
```

- [ ] **Step 4: Create Projects page**

Create `src/pages/projects.astro`:

```astro
---
import Page from '../layouts/Page.astro';
import projectsData from '../data/projects.json';
---
<Page title="Projects">
  <div class="project-list">
    {projectsData.map((project) => (
      <a href={project.url} class="project-card" target="_blank" rel="noopener">
        <div class="project-name">{project.name}</div>
        <div class="project-desc">{project.description}</div>
        <div class="project-tech">
          {project.tech.map((t) => (
            <span class="project-tech-tag">{t}</span>
          ))}
        </div>
      </a>
    ))}
  </div>
</Page>

<style>
  .project-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .project-card {
    display: block;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    text-decoration: none;
    color: inherit;
  }

  .project-card:hover .project-name {
    color: var(--link);
  }

  .project-name {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .project-desc {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .project-tech {
    display: flex;
    gap: 0.5rem;
  }

  .project-tech-tag {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoXiHei';
  }
</style>
```

- [ ] **Step 5: Verify both pages render**

Run `npx astro dev`. Check `localhost:4321/about` and `localhost:4321/projects`. Expected: title, content, project card with tech tags.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/Page.astro src/pages/about.astro src/pages/projects.astro src/data/
git commit -m "feat: add About and Projects pages"
```

---

### Task 10: CSS Glitch Layer

**Files:**
- Create: `src/components/glitch/GlitchText.astro`
- Modify: `src/styles/typography.css`

- [ ] **Step 1: Add glitch CSS to typography.css**

Append to `src/styles/typography.css`:

```css
/* --- Glitch: subtle infiltration --- */

/* Link hover: font shifts to NeoZhiSong */
.prose a {
  transition: font-family 0.3s ease;
}

.prose a:hover {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'LXGWNeoZhiSong';
}

/* Glitch character — a span that renders one character in a different font */
.glitch-char {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'LXGWNeoZhiSong';
}

/* Glitch line — a paragraph with micro letter-spacing drift */
.glitch-line {
  letter-spacing: 0.01em;
}

/* Monospace bleed — a pseudo-element showing a code fragment */
.glitch-mono::after {
  content: attr(data-glitch);
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
  font-size: 0.75em;
  opacity: 0.03;
  position: absolute;
  right: -2rem;
  top: 0;
  pointer-events: none;
  white-space: nowrap;
}

.glitch-mono {
  position: relative;
}
```

- [ ] **Step 2: Create GlitchText component**

Create `src/components/glitch/GlitchText.astro`:

```astro
---
/**
 * Wraps text content and applies subtle glitch effects.
 * Use sparingly — one or two instances per page at most.
 *
 * mode:
 *   "char" — renders one character in NeoZhiSong
 *   "line" — adds micro letter-spacing drift
 *   "mono" — shows a faint monospace fragment in the margin
 */
interface Props {
  mode: 'char' | 'line' | 'mono';
  glitchData?: string;
}

const { mode, glitchData } = Astro.props;

const className = {
  char: 'glitch-char',
  line: 'glitch-line',
  mono: 'glitch-mono',
}[mode];
---
<span class={className} data-glitch={glitchData}>
  <slot />
</span>
```

- [ ] **Step 3: Verify glitch effects**

Run `npx astro dev`. In a blog post, hover over a link — the font should shift subtly to NeoZhiSong (visible if the font is loaded; the change is a slight serif shift for CJK characters). The transition should feel smooth, not jarring.

- [ ] **Step 4: Commit**

```bash
git add src/styles/typography.css src/components/glitch/
git commit -m "feat: add CSS glitch layer — subtle typographic infiltration"
```

---

### Task 11: Pretext Showcase Components

**Files:**
- Create: `src/lib/pretext.ts`, `src/components/typography/GlitchTitle.astro`, `src/components/typography/PullQuote.astro`, `src/components/typography/SectionHeader.astro`

- [ ] **Step 1: Install pretext**

```bash
npm install pretext
```

If the package name differs on npm, check `https://www.npmjs.com/package/pretext` or use the GitHub repo directly:

```bash
npm install chenglou/pretext
```

- [ ] **Step 2: Create pretext wrapper**

Create `src/lib/pretext.ts`:

```ts
/**
 * Wrapper around pretext for character-level text measurement.
 * Used only by showcase components (GlitchTitle, PullQuote, SectionHeader).
 *
 * The actual API depends on pretext's exports. This file centralizes
 * the integration so components don't import pretext directly.
 */

// Adjust import based on actual pretext API
export async function measureText(
  text: string,
  font: string,
  fontSize: number
): Promise<{ width: number; chars: { char: string; x: number; width: number }[] }> {
  // Placeholder: implement once pretext API is confirmed.
  // pretext provides fast text measurement — use it to get per-character positions.
  const chars = text.split('').map((char, i) => ({
    char,
    x: i * fontSize * 0.6,
    width: fontSize * 0.6,
  }));
  return {
    width: chars.length * fontSize * 0.6,
    chars,
  };
}
```

Note: The actual pretext API may differ. Read its README/source after `npm install` and update this wrapper to match. The interface stays the same — components call `measureText()` and get per-character positions.

- [ ] **Step 3: Create GlitchTitle component**

Create `src/components/typography/GlitchTitle.astro`:

```astro
---
interface Props {
  text: string;
  tag?: 'h1' | 'h2';
}

const { text, tag = 'h1' } = Astro.props;
const Tag = tag;
const chars = text.split('');
---
<Tag class="glitch-title" data-glitch-title>
  {chars.map((char, i) => (
    <span class="glitch-title-char" style={`--char-index: ${i}`}>
      {char}
    </span>
  ))}
</Tag>

<style>
  .glitch-title {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5rem;
    display: inline-block;
  }

  .glitch-title-char {
    display: inline-block;
    transition: transform 0.4s ease, font-family 0.4s ease;
  }

  .glitch-title:hover .glitch-title-char:nth-child(3n+1) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWNeoZhiSong';
  }

  .glitch-title:hover .glitch-title-char:nth-child(5n+2) {
    transform: translateY(-0.5px);
  }

  .glitch-title:hover .glitch-title-char:nth-child(7n) {
    letter-spacing: 0.02em;
  }
</style>

<script>
  // Enhance with pretext measurement when available in browser
  const titles = document.querySelectorAll('[data-glitch-title]');
  titles.forEach((title) => {
    // Future: use pretext to measure each character precisely
    // and apply micro-positioning for a more organic glitch feel.
    // For now, CSS handles the effect.
  });
</script>
```

- [ ] **Step 4: Create PullQuote component**

Create `src/components/typography/PullQuote.astro`:

```astro
---
interface Props {
  text: string;
}

const { text } = Astro.props;
---
<blockquote class="pull-quote">
  <p>{text}</p>
</blockquote>

<style>
  .pull-quote {
    border-left: none;
    padding: 1.5rem 0;
    margin: 2rem 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'LXGWZhenKai';
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--text);
    position: relative;
  }

  .pull-quote::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #eee;
  }

  .pull-quote::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #eee;
  }

  .pull-quote p {
    margin: 0;
  }
</style>
```

- [ ] **Step 5: Create SectionHeader component**

Create `src/components/typography/SectionHeader.astro`:

```astro
---
interface Props {
  text: string;
  tag?: 'h1' | 'h2' | 'h3';
}

const { text, tag = 'h2' } = Astro.props;
const Tag = tag;
---
<Tag class="section-header">
  {text}
</Tag>

<style>
  .section-header {
    font-size: 1.375rem;
    font-weight: 600;
    line-height: 1.3;
    margin-top: 2em;
    margin-bottom: 0.5em;
    position: relative;
  }

  .section-header:hover {
    letter-spacing: 0.005em;
    transition: letter-spacing 0.3s ease;
  }
</style>
```

- [ ] **Step 6: Wire GlitchTitle into homepage**

Update `src/pages/index.astro` — replace the plain `<h1>` with:

```astro
---
// Add to imports:
import GlitchTitle from '../components/typography/GlitchTitle.astro';
---
```

Replace:
```html
<h1 class="site-title">我的博客</h1>
```

With:
```html
<GlitchTitle text="我的博客" />
```

- [ ] **Step 7: Verify pretext components**

Run `npx astro dev`. Hover over the homepage title — some characters should shift font and position subtly. Check the About page to verify PullQuote can be used.

- [ ] **Step 8: Commit**

```bash
git add src/lib/pretext.ts src/components/typography/ src/pages/index.astro
git commit -m "feat: add pretext showcase components — GlitchTitle, PullQuote, SectionHeader"
```

---

### Task 12: Search (Pagefind)

**Files:**
- Create: `src/components/layout/Search.astro`
- Modify: `package.json` (build script)

- [ ] **Step 1: Update build script**

In `package.json`, update the `build` script:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && npx pagefind --site dist",
    "preview": "astro preview"
  }
}
```

- [ ] **Step 2: Create Search component**

Create `src/components/layout/Search.astro`:

```astro
---
---
<div id="search-modal" class="search-modal" style="display: none;">
  <div class="search-backdrop" id="search-backdrop"></div>
  <div class="search-content">
    <div id="search-container"></div>
  </div>
</div>

<style>
  .search-modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 20vh;
  }

  .search-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .search-content {
    position: relative;
    width: 90%;
    max-width: 560px;
    background: var(--bg);
    border-radius: 4px;
    padding: 1rem;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  }
</style>

<script>
  async function initSearch() {
    const { PagefindUI } = await import('@pagefind/default-ui');
    new PagefindUI({
      element: '#search-container',
      showSubResults: false,
      showImages: false,
    });
  }

  const modal = document.getElementById('search-modal');
  const backdrop = document.getElementById('search-backdrop');
  const trigger = document.getElementById('search-trigger');
  let initialized = false;

  function openSearch() {
    if (!initialized) {
      initSearch();
      initialized = true;
    }
    modal!.style.display = 'flex';
    setTimeout(() => {
      const input = modal!.querySelector('input');
      input?.focus();
    }, 100);
  }

  function closeSearch() {
    modal!.style.display = 'none';
  }

  trigger?.addEventListener('click', openSearch);
  backdrop?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });
</script>
```

- [ ] **Step 3: Add Search to Base layout**

Update `src/layouts/Base.astro` — add before the closing `</body>`:

```astro
---
// Add to imports:
import Search from '../components/layout/Search.astro';
---
```

Add `<Search />` before `</body>`:

```html
    <slot />
    <Search />
  </body>
```

- [ ] **Step 4: Verify search works**

```bash
npm run build
npx astro preview
```

Navigate to `localhost:4321`. Click the search icon or press `Cmd+K`. Type a search term. Expected: Pagefind modal opens, results appear from indexed blog posts.

Note: Search only works after a full build (Pagefind indexes the built HTML). It won't work in dev mode.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Search.astro src/layouts/Base.astro package.json
git commit -m "feat: add Pagefind search with Cmd+K shortcut"
```

---

### Task 13: RSS Feed

**Files:**
- Create: `src/pages/rss.xml.ts`

- [ ] **Step 1: Create RSS feed**

Create `src/pages/rss.xml.ts`:

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: '我的博客',
    description: 'placeholder description',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.tldr,
      link: `/blog/${post.id}/`,
    })),
  });
}
```

- [ ] **Step 2: Verify RSS feed**

```bash
npm run build
npx astro preview
```

Navigate to `localhost:4321/rss.xml`. Expected: valid RSS XML with both sample posts listed.

- [ ] **Step 3: Commit**

```bash
git add src/pages/rss.xml.ts
git commit -m "feat: add RSS feed"
```

---

### Task 14: Cloudflare Pages Deploy Config

**Files:**
- Create: `.gitignore` (update), `wrangler.toml` (optional)

- [ ] **Step 1: Update .gitignore**

Ensure `.gitignore` includes:

```
node_modules/
dist/
.astro/
fonts/*.ttf
fonts/*.otf
```

The `fonts/*.ttf` line keeps large source font files out of git. The split woff2 files in `public/fonts/` are committed.

- [ ] **Step 2: Verify full build**

```bash
npm run build
```

Expected: Build succeeds. `dist/` contains static HTML. Pagefind generates search index in `dist/pagefind/`.

- [ ] **Step 3: Verify preview**

```bash
npx astro preview
```

Walk through the site: homepage, blog posts, about, projects, search, dark mode toggle, RSS feed. All pages render correctly.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "feat: finalize build config for Cloudflare Pages"
```

---

### Task 15: Final Verification

- [ ] **Step 1: Full build and preview**

```bash
npm run build && npx astro preview
```

- [ ] **Step 2: Checklist walkthrough**

Verify each feature against the spec:

| Feature | Check |
|---------|-------|
| Homepage with post list | Visit `/` |
| Category pills filter | Click a category pill |
| GlitchTitle on homepage | Hover over the title |
| Blog post renders | Visit `/blog/hello-world` |
| TLDR block shows | First block on post page |
| TOC with scrollspy | Scroll through a post, watch TOC |
| Code syntax highlighting | Check code blocks in posts |
| Reading time displayed | Post metadata and card |
| Tags link to tag page | Click a tag |
| Category links to category page | Click category in metadata |
| About page | Visit `/about` |
| Projects page | Visit `/projects` |
| Dark mode toggle | Click sun/moon icon |
| Dark mode persists | Reload page |
| System preference respected | Clear localStorage, check |
| Search opens | Click search icon or Cmd+K |
| Search finds posts | Type a term |
| RSS feed | Visit `/rss.xml` |
| Glitch on link hover | Hover links in prose |
| LXGW fonts load | CJK text renders in WenKai |

- [ ] **Step 3: Commit any final fixes**

If any issues found, fix and commit individually.

- [ ] **Step 4: Tag as v0.1.0**

```bash
git tag v0.1.0
```
