# Blog Development Skill

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
