# Blog Design Spec

Astro blog on Cloudflare Pages. Zero cost. Apple-style restraint with typographic glitch as subtle infiltration.

## Stack

- **Framework:** Astro (static site generation)
- **Hosting:** Cloudflare Pages (free tier)
- **Domain:** `*.pages.dev` subdomain (free)
- **Search:** Pagefind (build-time index, client-side search)
- **RSS:** `@astrojs/rss`
- **Syntax highlighting:** Shiki (built into Astro)
- **Text measurement:** chenglou/pretext (for showcase components only)

## Visual Identity

Pure white background. System fonts for Latin. LxgwWenKai for CJK. Blue links with minimal underlines. Words exist quietly, not disturbing reading rhythm.

No accent colors beyond blue. No decorative elements. No borders unless `1px solid #eee`. The design has no opinions it doesn't need.

### Glitch: Subtle Infiltration

The glitch is not a visual effect. It is 微妙渗透. A character in NeoZhiSong instead of WenKai. A `letter-spacing` off by `0.01em` for one line. A monospace fragment in the margin that appears on scroll and disappears. The reader should never think "a glitch effect" — they should feel a quiet strangeness.

## Typography

### Font Roles

| Font | Role | Where |
|------|------|-------|
| System stack (`-apple-system, ...`) | Latin text | All Latin characters |
| LxgwWenKai (文楷) | CJK body text | Blog prose, TLDR |
| LxgwNeoXiHei (新晰黑) | UI / labels | Header, tags, categories, metadata |
| LxgwNeoZhiSong (新致宋) | Glitch font — serif infiltration | Surfaces only in glitch moments |
| LxgwZhenKai (臻楷) | Emphasis | Pull quotes, featured text |
| System monospace | Code | Code blocks, inline code |

### Font Loading

- Self-hosted, subset via `cn-font-split` to keep only characters used
- `@font-face` with `font-display: swap`
- `unicode-range` to separate CJK from Latin — browser picks automatically

### Pretext Showcase Components

pretext (chenglou/pretext) handles precise character measurement for three components only:

1. **GlitchTitle** — homepage/page titles, individual characters can drift or shift font
2. **PullQuote** — featured quotes with character-level micro-positioning
3. **SectionHeader** — section titles with controlled typographic tension

These are Astro islands (client-side JS). Everything else is static HTML.

### CSS Glitch Layer

The rest of the blog uses CSS-only glitch. Examples of what this means:

- A character rendered in NeoZhiSong via targeted `<span>` in the build
- `letter-spacing` micro-variations on certain lines
- Monospace fragments as `::after` pseudo-elements, near-invisible
- Font-family shifts on link hover (WenKai → NeoZhiSong, smooth transition)

Principle: felt, not seen. Frequency is rare. Opacity is low. Transitions are smooth.

## Theme

### Color Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#ffffff` | `#111111` |
| `--text` | `#1a1a1a` | `#e0e0e0` |
| `--text-muted` | `#999999` | `#666666` |
| `--link` | `#0066cc` | `#4d9fff` |
| `--code-bg` | `#f7f7f7` | `#1a1a1a` |

No other tokens. White, text, muted text, blue links, code background. That's the full palette.

### Dark Mode

- Secondary experience. The site is designed for white first.
- `data-theme` attribute on `<html>`, toggled by a small JS island.
- Respects `prefers-color-scheme` on first visit, stores preference in `localStorage`.
- Toggle is a minimal sun/moon icon, top-right, no label, no animation.

## Content Model

### Blog Posts (Astro Content Collection)

Markdown/MDX files in `src/content/blog/`.

Frontmatter schema:

```
title: string
date: Date
tldr: string              # Summary for list views and TLDR block
category: enum            # Top-level category (defined set, TBD by user)
tags: string[]            # Freeform tags
draft: boolean
lang?: 'zh' | 'en'       # Optional hint, not enforced
```

- First paragraph of post body = TLDR (also stored in frontmatter for list views)
- Language is mixed freely — Chinese, English, or both in one post
- No i18n routing, no language switcher

### Categories & Tags

- A few top-level categories (user defines these as the blog grows)
- Freeform tags for finer grain
- Category pages at `/categories/[cat]`
- Tag pages at `/tags/[tag]`

## Pages

### Homepage (`/`)

- GlitchTitle (pretext-powered) displaying site name
- Quiet tagline beneath
- Category pills for filtering (client-side, no page reload)
- Search icon (opens Pagefind modal)
- Post list: title, date, truncated TLDR, tags, reading time
- Pagination or load-more
- Footer: RSS link, GitHub link, minimal

### Blog Post (`/blog/[slug]`)

- Back link
- SectionHeader (pretext-powered) for post title
- Metadata line: date, category, reading time
- TLDR block: subtle background tint (`rgba(0,0,0,0.02)`), not a card — a whisper
- TOC: sticky sidebar on wide screens, dropdown on mobile, scrollspy highlights current section
- Prose content with CSS glitch layer
- Tags at bottom
- Prev/next post navigation

### About (`/about`)

Simple prose page. Bio, what the blog is about, links. Uses Page layout. PullQuote component available.

### Projects (`/projects`)

List/grid of project cards. Each card: name, one-line description, tech tags, external link. Data from `projects.json` or content collection.

## Project Structure

```
src/
├── components/
│   ├── typography/
│   │   ├── GlitchTitle.astro
│   │   ├── PullQuote.astro
│   │   └── SectionHeader.astro
│   ├── blog/
│   │   ├── PostCard.astro
│   │   ├── TOC.astro
│   │   ├── TLDR.astro
│   │   └── ReadingTime.astro
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Search.astro
│   └── glitch/
│       └── GlitchText.astro
├── content/
│   └── blog/
├── layouts/
│   ├── Base.astro
│   ├── Post.astro
│   └── Page.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── projects.astro
│   ├── blog/[...slug].astro
│   ├── tags/[tag].astro
│   ├── categories/[cat].astro
│   └── rss.xml.ts
├── styles/
│   ├── global.css
│   ├── typography.css
│   └── theme.css
└── lib/
    └── pretext.ts
```

## Build & Deploy

```
Git push
  → Cloudflare Pages detects Astro
  → Build: astro build && pagefind --site dist
  → Deploy to global edge
  → Live in ~30 seconds
```

No CI config needed. No CMS. Write Markdown, push, done.

## Features

- **RSS:** Full-content feed at `/rss.xml`
- **Search:** Pagefind modal — type and find, title + TLDR in results
- **Dark mode:** Secondary experience, system preference respected, localStorage persisted
- **Syntax highlighting:** Shiki, one theme per mode, no runtime JS
- **Reading time:** Calculated at build time, displayed in post metadata and list cards
- **TOC:** Generated from headings, sticky sidebar with scrollspy
