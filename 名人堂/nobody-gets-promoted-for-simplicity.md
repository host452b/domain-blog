# Nobody Gets Promoted for Simplicity

**Author:** terriblesoftware.org
**Date:** March 3, 2026
**Source:** https://terriblesoftware.org/2026/03/03/nobody-gets-promoted-for-simplicity/
**Category:** Engineering Culture / Career / System Design

---

## TL;DR

The engineer who overbuilds gets a promotion packet that writes itself. The one who ships the simplest thing that works gets three words: "Implemented feature X." Complexity sells because our systems reward it — in interviews, design reviews, and promotion cycles. The fix: describe the judgment behind simplicity, put the burden of proof on complexity, and start celebrating the engineer who deleted code.

---

> "Simplicity is a great virtue, but it requires hard work to achieve and education to appreciate. And to make matters worse, **complexity sells better**." — Edsger Dijkstra

## The Invisible Engineer

Picture two engineers on the same team.

**Engineer A** gets assigned a feature. She looks at the problem, considers a few options, picks the simplest. A straightforward implementation, maybe **50 lines of code**. Easy to read, easy to test, easy for the next person to pick up. It works. She ships it and moves on.

**Engineer B** gets a similar feature. He sees an opportunity to build something more "robust." He introduces **a new abstraction layer**, creates a **pub/sub system** for communication between components, adds a **configuration framework** so the feature is "extensible" for future use cases. It takes three weeks. Multiple PRs. Lots of excited emojis when he shares the design doc.

Promotion time:

Engineer B's work practically writes itself: *"Designed and implemented a scalable event-driven architecture, introduced a reusable abstraction layer adopted by multiple teams, and built a configuration framework enabling future extensibility."* That practically screams Staff+.

Engineer A's work: *"Implemented feature X."* Three words.

**Her work was better. But it's invisible** because of how simple she made it look. You can't write a compelling narrative about the complexity you didn't build. **Nobody gets promoted for the complexity they avoided.**

## Complexity Looks Smart

Not because it is, but because our systems are set up to reward it. And the incentive problem doesn't start at promotion time. It starts **before you even get the job**.

In a system design interview, you propose a simple solution — a single database, a straightforward API, maybe a caching layer. The interviewer pushes: *"What about scalability? What if you have ten million users?"* So you add services, queues, sharding, more boxes on the whiteboard. The interviewer seems satisfied.

What you just learned: **complexity impresses people**. The simple answer wasn't wrong. It just wasn't interesting enough. And you carry that lesson into your career.

In design reviews: someone proposes a clean approach and gets hit with *"shouldn't we future-proof this?"* So they go back and add layers they don't need yet, abstractions for problems that **might never materialize**, flexibility for requirements nobody has asked for.

> I've seen engineers create abstractions to avoid duplicating a few lines of code, only to end up with something **far harder to understand and maintain** than the duplication ever was. The code looked more "professional." More engineered. But the users didn't get their feature any faster, and the next engineer to touch it had to spend half a day understanding the abstraction.

## Unearned Complexity

Let me be clear: complexity is sometimes the right call. Processing millions of events per second? You might need distributed systems. Ten teams on the same product? You probably need service boundaries.

**The issue isn't complexity itself. It's unearned complexity.** There's a difference between:

- *"We're hitting database limits and need to shard"*
- *"We might hit database limits in three years, so let's shard now"*

Some engineers understand this. When you look at their code and architecture, you think *"well, yeah, of course."* No magic, no cleverness, nothing that makes you feel stupid for not understanding it. **And that's exactly the point.**

> The actual path to seniority isn't learning more tools and patterns, but **learning when not to use them**. Anyone can add complexity. It takes experience and confidence to leave it out.

## What to Do — As an Engineer

Simplicity doesn't speak for itself. Not because it's not good, but because **most systems aren't designed to hear it**.

**Reframe your narrative.** Don't say "Implemented feature X." Say:

> *"Evaluated three approaches including an event-driven architecture and a custom abstraction layer, determined that a straightforward implementation met all current and projected requirements, and shipped in two days with **zero incidents over six months**."*

Same simple work. But now it captures **the judgment behind it**. The decision not to build something is a decision — document it.

**In design reviews**, when someone asks "shouldn't we future-proof this?", don't cave. Try:

> *"Here's what it would take to add that later if we need it, and here's what it costs us to add it now. **I think we wait.**"*

You're not pushing back. You're showing you've done your homework. You considered the complexity and **chose not to**.

**Talk to your manager:**

> *"I want to make sure the way I document my work reflects the decisions I'm making, not just the code I'm writing. Can we talk about how to frame that for my next review?"*

If you do all of this and your team still only promotes the person who builds the most elaborate system — **that's useful information too**. Some cultures genuinely value simplicity. Others say they do, but reward the opposite. At least you'll know which one you're in.

## What to Do — As a Leader

**This one's on you more than anyone else.** You set the incentives, whether you realize it or not.

**Change the questions you ask.** In design reviews, instead of *"have we thought about scale?"*, try:

> *"What's the simplest version we could ship, and what specific signals would tell us we need something more complex?"*

That one question changes the game: it makes simplicity the default and **puts the burden of proof on complexity**, not the other way around.

**In promotion discussions**, push back when someone's packet is a list of impressive-sounding systems. Ask: *"Was all of that necessary? Did we actually need a pub/sub system here, or did it just look good on paper?"*

**Pay attention to what you celebrate publicly.** If every shout-out is for the big, complex project, that's what people will optimize for. Start recognizing:
- The engineer who **deleted code**
- The one who said *"we don't need this yet"* and was right
- The one who shipped in two days what others would have taken two sprints

> At the end of the day, if we keep rewarding complexity and ignoring simplicity, we shouldn't be surprised when that's exactly what we get. But the fix isn't complicated. Which, I guess, is kind of the point.

---

## Key Quotes

> "Nobody gets promoted for the complexity they avoided."

> "Complexity looks smart. Not because it is, but because our systems are set up to reward it."

> "The simple answer wasn't wrong. It just wasn't interesting enough."

> "The actual path to seniority isn't learning more tools and patterns, but learning when not to use them."

> "The decision not to build something is a decision — document it."

> "What's the simplest version we could ship, and what specific signals would tell us we need something more complex?"

> "Start recognizing the engineer who deleted code."

> "The fix isn't complicated. Which, I guess, is kind of the point."

---

*Collected for the Hall of Fame archive. Original from terriblesoftware.org, March 2026.*
