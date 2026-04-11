# domain-blog

Astro blog on Cloudflare Pages. Zero cost.

Apple-style restraint with typographic glitch as subtle infiltration.

## Stack

- **Astro 5** — static site generation
- **Cloudflare Pages** — hosting (free)
- **Pagefind** — client-side search
- **Shiki** — syntax highlighting
- **LXGW Fonts** — WenKai / NeoXiHei / NeoZhiSong / ZhenKai

## Quick Start

```bash
npm install
npm run dev          # localhost:4321
npm run build        # build + pagefind index
npm run preview      # preview built site
```

## Write a Post

Create `src/content/blog/your-post.md`:

```yaml
---
title: "Post Title"
date: 2026-04-11
tldr: "One sentence summary."
category: "category-name"
tags: ["tag1", "tag2"]
---

Your content here.
```

Push to `main`. Cloudflare deploys automatically.

## Typography

| Font | Role |
|------|------|
| System stack | Latin text |
| LxgwWenKai | CJK body |
| LxgwNeoXiHei | UI / labels |
| LxgwNeoZhiSong | Glitch layer |
| LxgwZhenKai | Emphasis |

## Glitch

The glitch is not a visual effect. It is subtle infiltration.

- Link hover shifts font to NeoZhiSong
- `.glitch-char` — one character in a different font
- `.glitch-line` — micro letter-spacing drift
- `.glitch-mono` — near-invisible monospace fragment in margin

Felt, not seen.

## Project Structure

```
src/
├── components/
│   ├── blog/          PostCard, TLDR, TOC, CategoryFilter
│   ├── glitch/        GlitchText
│   ├── layout/        Header, Footer, Search
│   └── typography/    GlitchTitle, PullQuote, SectionHeader
├── content/blog/      Markdown posts
├── data/              projects.json
├── layouts/           Base, Post, Page
├── lib/               reading-time, pretext wrapper
├── pages/             Routes
└── styles/            global, theme, typography
```

## Deploy

See [docs/deploy-guide.md](docs/deploy-guide.md).

## License

MIT
