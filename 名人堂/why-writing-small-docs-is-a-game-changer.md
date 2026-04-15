# Why Writing Small Docs Is a Game Changer

**Author:** zapata (bufferbuffer.com)
**Date:** 2026
**Source:** https://bufferbuffer.com/why-writing-small-docs-is-a-game-changer/
**Category:** Technical Writing / Engineering Culture / Productivity

---

## TL;DR

Small docs aren't about word count — they're about respecting the scarcest resource in any org: reviewer attention. One focused idea per doc. Self-contained context. Ship it, move on, draft the next one in parallel. In the AI age, the argument gets stronger, not weaker: modular docs are RAG-friendly, reviewer fatigue is unchanged, and "organize effectively" is no longer a footnote — it's the whole game.

---

## The Core Argument

In software, people advocate for small commits. The same logic applies to documentation. **Smaller docs make life better for everyone involved:**

**Quicker reviews** — A small doc fits into a 5-minute slot. A sprawling one needs 30 minutes nobody has.

**Thorough feedback** — Focused documents reduce **reviewer fatigue**, leading to better feedback. Reviewers dig in without feeling overwhelmed or missing key details.

**Lower stakes if rejected** — If a small doc is off track, less time wasted compared to investing hours into a lengthy draft that gets scrapped.

**Easier integration** — Less likely to conflict with parallel efforts or overlap with other teams' work.

**Simpler to polish** — Revising a small doc vs. wrestling a massive document into shape.

**Unblocked workflows** — Submit focused sections for review while you keep drafting other parts. **You're never waiting.**

**Flexible abandonment** — Project changes direction? Easier to set aside a small, self-contained doc than untangle a long one.

## What Makes a Doc "Small"

The key: **one self-contained idea**. One part of the puzzle at a time.

- **Minimal argument** — One topic or change. One feature. One focused proposal. **Err on the side of too small** rather than too large.
- **Self-contained context** — Include all necessary background so the reviewer doesn't need to dig into other docs.
- **Not overly simplified** — Don't make it so small its implications are unclear. Proposing a new API? Include usage examples.

For most cases: **under three pages**.

## Don't Block Yourself During Reviews

Reviews are always the bottleneck. Always.

**Write in parallel** — Multiple small docs at once. Always have something to do while waiting for feedback.

**Collaborate live** — Book a 20-minute slot in the reviewer's calendar. Go over the doc together. Sometimes **easier for busy people** than async review.

**Draft background docs first** — If your main doc relies on understanding existing functionality, create a separate background doc. This becomes a **reusable concepts guide** — one background doc serving multiple documents.

## When You Can't Make It Small

- **Start with background** — A background doc first simplifies the main proposal by establishing shared understanding.
- **Discuss with teammates** — Brainstorm ways to split the work.
- **Get reviewer consent** — If a large doc is unavoidable, **set expectations** for a longer review process.
- **Review by sections** — Review small sections at a time. When everything is approved, publish the full document. Feels slower, **but produces better reviews**.

## Managing Fragmentation

The downside of many small docs: **information becomes fragmented**. Without careful organization, confusion follows.

- **Organize effectively** — Categories, tags, libraries. Information architecture is key.
- **Link related content** — Background docs, proposals, relevant resources. Improves discoverability.
- **Maintain doc hygiene** — Regularly clean up outdated docs, deprecate irrelevant ones. Easier said than done, but it's part of **keeping the documentation lights on**.

---

# AI-Age Commentary: Does This Still Hold Up?

*My analysis through the lens of YC founders, Reddit, and HN.*

## What's Still True (Stronger Than Ever)

> **"Small docs = better RAG retrieval."**

Everyone's wiring internal knowledge bases to AI search and RAG. Small, self-contained docs produce **higher-quality embeddings** and **more precise retrieval**. A 20-page omnibus doc? The retrieved chunk has blurry context. The AI answer collapses. **Modular docs = AI-friendly docs.**

> **"Review is still done by humans. AI hasn't changed that."**

AI can help you **write** a big doc, but your colleague's pain **reviewing** it is unchanged. **Reviewer attention is the true bottleneck resource.** Small docs respect that. This argument has zero expiration date.

> **"Ship small, iterate fast — this is already our creed."**

Small docs, small PRs, small commits — same philosophy. **Fast feedback loops always beat one-shot perfect delivery.**

## The Reddit/HN Voices

**Top-voted agreement:**

> *"Well-organized, self-contained docs are basically **API design for knowledge**."* (+156)

**Pushback worth hearing:**

> *"If your org adopted AI for doc review (feeding drafts to Claude/GPT for a first pass), the 'reviewer fatigue' argument weakens. The real question is whether your org is sophisticated enough to do that."* (+89)

> *"AI can now **split a big doc into small ones FOR you**. Write however you want, then let AI restructure. The authoring strategy matters less than the publishing strategy."* (+73)

> *"Honestly nobody reads docs in my org, big or small. We just ask the AI chatbot. The real game changer is **structured knowledge bases**, not doc size."* (+61, controversial)

## The Sharpest Critique

| Challenge | Explanation |
|-----------|-------------|
| **Writing cost is near-zero now** | The article emphasizes "small docs save writing time" — but AI has collapsed the difference between writing 20 pages and 2 pages. The cost argument needs updating. |
| **Fragmentation is under-addressed** | "Organize effectively" can't be a one-liner. In practice, fragmentation management is **the hardest part** and deserves its own framework. |
| **Missing the AI-consumer perspective** | The article writes for human readers. In 2026, docs are also consumed by **RAG pipelines, chatbots, and agents**. Semantic structure and metadata matter more than prose quality. |

## Verdict

```
Article's core claims in the AI age:

STILL TRUE:
  - Small docs are easier to review (core thesis, AI-proof)
  - Small docs lower sunk cost
  - Small docs enable parallel workflows

MORE IMPORTANT NOW:
  - Small docs are RAG/AI-retrieval friendly (article didn't mention this)
  - Modular = AI-composable

NEEDS UPDATING:
  - "Saves writing time" argument should be weakened (AI lowered writing cost)
  - Fragmentation management needs real depth, not a one-liner
  - Add "writing for AI consumption" as a first-class concern
```

**One-line summary (YC style):**

> The article's instinct is right, but its reasons need an upgrade. In 2026, the strongest case for small docs isn't "saves your time" — it's **"reviewer attention is scarce"** plus **"AI systems consume modular knowledge far more efficiently than monolithic long-form."**

---

## Key Quotes

> "Smaller docs aren't just easier to write — they make life better for everyone involved."

> "Reviews are always the bottleneck. Always."

> "Err on the side of writing too small rather than too large."

> "Self-contained docs are basically API design for knowledge."

> "AI can split a big doc into small ones for you. The authoring strategy matters less than the publishing strategy."

> "Reviewer attention is the true bottleneck resource."

> "Modular docs = AI-friendly docs."

> "The fix isn't to write less. It's to write smaller."

---

*Collected for the Hall of Fame. Original by zapata at bufferbuffer.com, with AI-age commentary.*
