export interface Article {
  slug: string;
  title: string;
  emoji: string;
  category: string;
  content: string;
  readingTime: number;
  excerpt: string;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export const categories: Category[] = [
  {
    slug: "fundamentals",
    name: "Fundamentals",
    emoji: "🎯",
    description: "Core cold calling structure, mindset, and approach",
    color: "from-fire-500 to-fire-700",
  },
  {
    slug: "techniques",
    name: "Techniques",
    emoji: "🥋",
    description: "Openers, pitches, tonality, and closing strategies",
    color: "from-volt to-volt-dark",
  },
  {
    slug: "objections",
    name: "Objections",
    emoji: "🛡️",
    description: "Handle every objection with confidence",
    color: "from-red-500 to-red-700",
  },
  {
    slug: "psychology",
    name: "Psychology & Mindset",
    emoji: "🧠",
    description: "Sales psychology, attitude, and emotional triggers",
    color: "from-amber-500 to-amber-700",
  },
  {
    slug: "operations",
    name: "Operations",
    emoji: "⚙️",
    description: "Lists, tech stack, KPIs, and time management",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    slug: "advanced",
    name: "Advanced",
    emoji: "🚀",
    description: "Multi-channel, follow-ups, culture, and resources",
    color: "from-purple-500 to-purple-700",
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractExcerpt(content: string): string {
  const lines = content.split("\n").filter((l) => {
    const t = l.trim();
    return (
      t.length > 20 &&
      !t.startsWith("#") &&
      !t.startsWith("!") &&
      !t.startsWith("|") &&
      !t.startsWith("-") &&
      !t.startsWith("**Source")
    );
  });
  const first = lines[0] || "Cold calling techniques and strategies.";
  return first.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").slice(0, 160);
}

function categorizeArticle(title: string, slug: string): string {
  const t = title.toLowerCase();
  const s = slug.toLowerCase();

  if (
    s.includes("objection") ||
    s.includes("recruitment-bd") ||
    s.includes("prospect-response")
  )
    return "objections";
  if (
    s.includes("opener") ||
    s.includes("pitch") ||
    s.includes("tonality") ||
    s.includes("closing") ||
    s.includes("qualifying-question")
  )
    return "techniques";
  if (
    s.includes("psychology") ||
    s.includes("attitude") ||
    s.includes("emotional") ||
    s.includes("call-reluctance") ||
    s.includes("active-listening")
  )
    return "psychology";
  if (
    s.includes("tech-stack") ||
    s.includes("building-list") ||
    s.includes("kpi") ||
    s.includes("time-management") ||
    s.includes("glossary")
  )
    return "operations";
  if (
    s.includes("call-structure") ||
    s.includes("disqualif") ||
    s.includes("gatekeeper")
  )
    return "fundamentals";
  if (
    s.includes("multi-channel") ||
    s.includes("follow") ||
    s.includes("culture") ||
    s.includes("podcast")
  )
    return "advanced";

  return "fundamentals";
}

// Hardcoded articles parsed from the wiki markdown
const rawArticles: Omit<Article, "readingTime" | "excerpt">[] = [
  {
    slug: "time-management",
    title: "Time Management for Sales",
    emoji: "⏳",
    category: "operations",
    content: `## Infographic

A few tips to help you manage your cold calling time effectively.

## The Framework

As Call Reluctance will kick in daily it's important to plan around it.

A few simple steps to ensure it happens:

- Schedule your cold calling time on a weekly and daily basis
- Schedule a minimum of 2 hours at a time
- Factor in your pre-calling routine
- Ensure it happens daily
- Log off LinkedIn and put your phone on aeroplane mode

That's it, keep it simple!`,
  },
  {
    slug: "multi-channel-cadence",
    title: "Multi-Channel Cadence",
    emoji: "📩",
    category: "advanced",
    content: `## Why Other Channels

Human beings have very varied tastes. You may prefer the phone, but others will not. Other channels will multiply the chances you will cut through the noise. The phone should always be the star of the show. However, it doesn't mean you shouldn't implement other channels.

## Cadence

| Day | Action |
| --- | --- |
| Day 1 | Call and Voicemail |
| Day 1 | Email |
| Day 1 | LinkedIn Connection Request |
| Day 2 | Call 2 |
| Day 3 | Call 3 |
| Day 5 | Call 4 + SMS |
| Day 7 | Call 5 + Voicemail |
| Day 7 | Email 2 |
| Day 7 | LinkedIn Message/InMail |
| Day 10 | Call 6 |
| Day 13 | Call 7 + WhatsApp |
| Day 18 | Call 8 + SMS |
| Day 23 | Call 9 |
| Day 28 | Call 10 + Final Email |

## Voicemail

What you say is important:

**DO NOT:**
- Pitch
- Speak too fast
- Leave your number
- Start with the name and company

**DO:**
- Reduce tension
- Build familiarity
- Create curiosity
- Point to other channels

**Example:**

*Hi {name}, there is no need to return this call; I will send you an email titled Voicemail with some context and a LinkedIn connection request. My name is Giulio Segantini, by the way. Have a great day.*

The aim is NOT to get a callback but to increase the chances other channels will be looked at.

## Email

Subject: *Voicemail / Missed Call*

*Just left you one, {name}. Would an extensive resource on cold calling be useful for your team? I'll call you again tomorrow. PS: dropped a connection request on LinkedIn.*

## LinkedIn

Send a blank connection request (higher acceptance rate). Wait 10 days. When you start a conversation, be casual, like you're texting. Use voice notes, memes, GIFs.

## SMS/WhatsApp

Use as a replacement for voicemails. Example: *Hi {name}, This is Giulio Segantini; you received a LinkedIn request a couple of days ago. I'll try again a couple of days down the line.*

## Direct Mail

If your ACV is high (typically 10K USD+), add this as the first step and leverage it on the first call, voicemail, email, etc.

## Video

Another growing and solid channel. Send via LinkedIn, WhatsApp or after the first email to maximise chances.`,
  },
  {
    slug: "following-up",
    title: "Following Up",
    emoji: "⏭️",
    category: "advanced",
    content: `## The Importance of the Follow-Up

"The money is in the follow-up" has always been the mantra. Yet, most salespeople give up too early. The stats:

- 48% of salespeople never follow up
- 25% give up after 2 contacts
- 12% give up after 3 contacts
- Only 10% make more than 3 contacts
- 80% of sales are made on the 5th to 12th contact

## Objections During Follow-Up

When you follow up, you'll often face objections. That's normal — they're busy and haven't had time to think about your offer.

## Follow-up Methods

1. **Phone** — The most effective but least used
2. **Email** — Good for sharing resources and keeping the conversation going
3. **LinkedIn** — Build familiarity and stay top of mind
4. **SMS/WhatsApp** — Quick, informal touchpoints
5. **Video** — Personalized and high-impact`,
  },
  {
    slug: "cold-calling-podcasts",
    title: "Best Cold Calling Podcasts",
    emoji: "🎙️",
    category: "advanced",
    content: `## My Cold Calling Strategy Dissected

The best way to learn is to listen. Here are the top podcasts for cold calling mastery.

## Tips for SDRs

- Listen during commute, gym, or downtime
- Take notes on frameworks and scripts
- Practice what you learn immediately
- Share insights with your team

## Cold Calling For Recruiters

Recruitment cold calling has its own unique challenges. These podcasts cover both sales and recruitment perspectives.`,
  },
  {
    slug: "sales-psychology",
    title: "Sales Psychology - 20 Best Principles",
    emoji: "🧠",
    category: "psychology",
    content: `## Why Psychology is KING

Understanding human psychology gives you a massive advantage. It's the difference between guessing and knowing.

## Psychology in Cold Calling

The 20 key principles:

1. **Reciprocity** — Give before asking. Share value first.
2. **Social Proof** — "Many companies like yours..."
3. **Authority** — Position yourself as an expert.
4. **Scarcity** — Limited time, limited spots.
5. **Commitment & Consistency** — Get small yeses first.
6. **Liking** — People buy from people they like.
7. **Loss Aversion** — People fear losing more than they desire gaining.
8. **Anchoring** — Set the reference point.
9. **The Contrast Principle** — Compare with something worse.
10. **Curiosity Gap** — Create open loops.
11. **Status Quo Bias** — Understand why people resist change.
12. **The Halo Effect** — First impressions matter enormously.
13. **Cognitive Dissonance** — Challenge their beliefs gently.
14. **The Zeigarnik Effect** — Unfinished business stays in mind.
15. **Labeling** — "You seem like someone who..."
16. **Mirroring** — Match their communication style.
17. **The Peak-End Rule** — End calls on a high note.
18. **Priming** — Set the stage before the pitch.
19. **Framing** — Same facts, different presentation.
20. **The Benjamin Franklin Effect** — Ask for a small favor.`,
  },
  {
    slug: "the-pitch",
    title: "The Sales Pitch",
    emoji: "🎤",
    category: "techniques",
    content: `## Why Problems

The best pitches focus on problems, not features. Nobody cares about your product — they care about their problems.

## Cheatsheet

1. State 2-3 problems your ICP commonly faces
2. Use "does that resonate?" or "is that fair?" to check
3. Keep it under 30 seconds
4. Use pauses for impact

## Pitch Example and Script

*"The reason for the call is that we work with [ICP] who typically struggle with [Problem 1], [Problem 2], and [Problem 3]. Does any of that resonate with you, or am I completely off base?"*

The pitch is NOT about selling. It's about identifying whether there's a problem worth solving.

**Key Tips:**
- Lead with problems, not solutions
- Use "typically" and "commonly" to normalize
- Ask permission-based questions
- Be okay with "no" — it's qualification`,
  },
  {
    slug: "tech-stack",
    title: "Cold Calling Tech Stack",
    emoji: "🤖",
    category: "operations",
    content: `## The Importance of Tech

The right tools can 2-3x your output. Don't waste time on manual tasks that software can handle.

## My Tech Stack

**Dialler:** A good dialler is non-negotiable. It automates the calling process and logs all activity.

**CRM:** Track every interaction. Your CRM is your memory.

**Data Provider:** Quality data = quality conversations. Bad data = wasted time.

**LinkedIn Sales Navigator:** Essential for research and multi-channel outreach.

**Email Automation:** For follow-up sequences and cadences.

## Data

The quality of your list determines 80% of your success. Invest time in building the right list before dialing.

## Dialler

Key features to look for:
- Auto-dial capability
- Call recording
- CRM integration
- Local presence dialing
- Voicemail drop

## Low Pick Up Rates

If fewer than 10% of prospects pick up:
- Check your data quality
- Try different calling times
- Use local presence numbers
- Call mobile numbers when possible`,
  },
  {
    slug: "sales-objections",
    title: "Sales Objections - The 21 Most Common",
    emoji: "🛡️",
    category: "objections",
    content: `## Types of Objections

**1. Brush offs** — Knee-jerk reactions. The equivalent of "I have no change" when a homeless person approaches. Short, to-the-point responses highlighting the person doesn't see value.

**2. Real Objections** — Sometimes brush-offs, sometimes genuine (e.g., "I just signed a contract"). Your job is to determine whether they're a smoke screen.

## Framework

**1. Pause** — 2-3 seconds. It gives you time to think AND slow down.

**2. Accept and repeat** — "I thought you might say that." / "Ouch, it must be frustrating." The only way to reduce tension.

**3a. Ask for permission** — "Do you mind if I ask one last question?"

**3b. Ask immediately** — With very direct objections, ask right away.

**Tonality:**
- ❌ Sarcasm
- ❌ High-pitched
- ❌ Annoyed
- ✅ Calm
- ✅ Curious
- ✅ Cool

## Common Objections and Responses

### Pricing
**"We don't have any budget."**
*"It must be frustrating to operate with no money. (Pause) I'm assuming even if you had budget, this wouldn't be a priority anyway, right?"*

**"It's too expensive."**
*"Oh I don't get that a lot. Do you mind if I ask a stupid question? Does that mean you're currently perfectly satisfied for a much cheaper price?"*

### Status Quo
**"We're fine/good, thanks."**
- *"Is that because you genuinely don't have problem X, or you don't trust someone cold calling you could help?"*
- *"You meant to say perfect, didn't you?"*
- *"Are you telling me that just to get rid of me?"*

**"We already have a supplier."**
*"I thought you would, at least you are relevant for our offer. Does that mean everything is perfect?"*

### Brush Offs
**"I don't take sales/cold calls."**
- *"You don't take any cold calls or just the bad ones?"*
- *"If I call you back tomorrow, is that still a cold call?"*

**"I'm not interested." (right away)**
- *"Was my accent/voice that weird?"*
- *"Did I sound that boring?"*
- *"I'm not surprised; I'm a complete stranger interrupting your day."*

**"Send me an email."**
*"Of course I can. What's the best email to reach you on? Before I do, would you be opposed to hearing what it is about to ensure it's even relevant?"*

**"Call me back in six months."**
*"It sounds like something specific will happen in six months. Do you mind me asking what that may be?"*

**"I'm in a meeting / I'm busy."**
*"Ouch, my timing is awful. Would it be a stupid idea to briefly explain now so that you'll never hear from me again if it's irrelevant?"*

## One Last Question

You tried to deal with the objection, but the prospect still wants to end the call. You have one card to play: the last question.

*"Before I go, do you mind if I ask one last question?"*

95/100 times, they'll agree. Then ask a great question to get back in.

Examples:
- "If you had to fix a problem in (your product/service area), what's the first one that comes to mind?"
- "Do you genuinely not have any of these problems, or don't trust a cold caller could help?"
- "What would have to change for you to consider (solution)?"`,
  },
  {
    slug: "sales-culture",
    title: "Build the Right Sales Culture",
    emoji: "📈",
    category: "advanced",
    content: `## Why It Matters

Sales culture can make or break a team. The right environment pushes people to grow, the wrong one creates fear and burnout.

## Pillars

**1. Accountability** — Track metrics, but don't micromanage. Trust your team to do the work.

**2. Coaching** — Regular, structured coaching sessions. Not just "do better" but "here's how."

**3. Competition** — Healthy competition drives performance. Leaderboards, challenges, prizes.

**4. Celebration** — Celebrate wins publicly. Small wins, big wins, all wins.

**5. Continuous Learning** — Book clubs, podcast discussions, role-play sessions.

**6. Psychological Safety** — Make it OK to fail. The best reps take risks.`,
  },
  {
    slug: "sales-attitude",
    title: "Sales Attitude",
    emoji: "🛡️",
    category: "psychology",
    content: `## Why do we Cold Call?

Because it works. It's the fastest path to revenue. It builds resilience, communication skills, and confidence.

## Useful Self-Talk

Before every session, remind yourself:

- "I'm here to help, not to sell"
- "Rejection is redirection"
- "Every no gets me closer to a yes"
- "I'm talking to someone who might desperately need what I offer"
- "The worst thing that can happen is they say no"
- "I'm building a skill that will serve me for life"
- "Consistency beats talent"
- "The phone is a tool, not a weapon"

The attitude you bring to the call determines the outcome more than any script or technique.`,
  },
  {
    slug: "openers",
    title: "Cold Call Openers - 13+ Examples",
    emoji: "📞",
    category: "techniques",
    content: `## Picking your Opener

The opener has ONE job: to earn 30 more seconds. That's it.

The best openers reduce tension, show self-awareness, and create curiosity.

## Cheatsheet

### Permission-Based Openers
1. *"Hi [name], this is [your name] from [company]. I know I'm calling out of the blue, do you have a moment?"*
2. *"[Name], you don't know me, and this is a cold call, so you can hang up if you want. But would you give me 30 seconds?"*

### Pattern Interrupt Openers
3. *"[Name]? Hey, this is [your name]. Did I catch you at a bad time?"* (Most people say "no")
4. *"Hi [name], not sure if you'll remember me, but this is [your name] from [company]."*

### Direct Openers
5. *"[Name], I'm going to cut straight to the point. I'm calling because..."*
6. *"Hi [name], honestly, this is a sales call. Feel free to hang up if you want, but before you do..."*

### Referral-Based Openers
7. *"Hi [name], [mutual connection] suggested I reach out to you about..."*
8. *"[Name], I was speaking to [colleague] and they mentioned you might be dealing with..."*

### Curiosity-Based Openers
9. *"Hi [name], I've got something a bit different. Do you have 27 seconds?"* (The odd number creates curiosity)
10. *"[Name], quick question — are you the right person to speak to about [topic]?"*

### Humor-Based Openers
11. *"Hi [name], this is a cold call. I know, I know. Would you be mad if I told you why I called?"*
12. *"[Name]? Great, you're alive! I was worried after 5 attempts."*

### Research-Based Openers
13. *"Hi [name], I noticed [specific observation about their company]. It made me think..."*

## POST Opener

After the opener, transition to the pitch with a problem statement. The POST framework:
- **P**roblem: State 2-3 problems
- **O**pen: Ask if it resonates
- **S**egue: Dig deeper with questions
- **T**ransition: Move toward next steps`,
  },
  {
    slug: "sales-glossary",
    title: "Sales Glossary",
    emoji: "📒",
    category: "operations",
    content: `## A
- **ACV** — Annual Contract Value
- **AE** — Account Executive
- **ARPU** — Average Revenue Per User

## B
- **BDR** — Business Development Representative
- **BANT** — Budget, Authority, Need, Timeline

## C
- **CAC** — Customer Acquisition Cost
- **CRM** — Customer Relationship Management
- **CS** — Customer Success

## D
- **Demo** — Product demonstration
- **Discovery Call** — First meeting to understand needs

## E
- **Enterprise** — Large company sale (usually 1000+ employees)

## F
- **Funnel** — The sales process from lead to close

## G
- **Gatekeeper** — The person who screens calls before the decision maker

## I
- **ICP** — Ideal Customer Profile
- **Inbound** — Leads that come to you
- **Intent Data** — Signals that a prospect is researching solutions

## K
- **KPI** — Key Performance Indicator

## L
- **Lead** — A potential customer
- **LTV** — Lifetime Value

## M
- **MQL** — Marketing Qualified Lead
- **MRR** — Monthly Recurring Revenue

## O
- **Objection** — A reason not to buy
- **Outbound** — Proactive outreach to prospects

## P
- **Pipeline** — The total value of deals in progress
- **Prospect** — A qualified potential customer

## Q
- **Quota** — Sales target

## R
- **Revenue** — Income from sales
- **ROI** — Return on Investment

## S
- **SDR** — Sales Development Representative
- **SaaS** — Software as a Service
- **SQL** — Sales Qualified Lead

## T
- **TAM** — Total Addressable Market
- **Trigger Event** — A change that creates a buying opportunity`,
  },
  {
    slug: "prospect-responses",
    title: "Prospect Responses on Cold Calls",
    emoji: "🥋",
    category: "objections",
    content: `## Understanding Prospect Responses

Every response from a prospect is a signal. Learn to read these signals and respond accordingly.

### Positive Signals
- "Tell me more" — They're engaged. Dig deeper into their problem.
- "How does it work?" — Interest is high. Keep focusing on their pain, not your features.
- "What does it cost?" — They're evaluating. Don't answer directly — qualify first.
- "We've been thinking about this" — Huge buying signal. Ask what prompted the thought.

### Neutral Signals
- "Send me some info" — Could be a brush-off or genuine interest. Qualify with: "To make sure I send the right thing, which problem resonated most?"
- "Let me think about it" — They need more reason. Ask: "What would help you decide?"
- Silence — They're processing. Don't fill it. Wait.

### Negative Signals
- Short, curt answers — They want off the call. Use pattern interrupt or ask for permission.
- "I'm busy" — Offer to be brief or schedule a callback.
- Hostility — Stay calm, acknowledge, and offer to disengage gracefully.

## The Golden Rule

Listen more than you speak. The best cold callers have a talk-to-listen ratio of 40:60.`,
  },
  {
    slug: "qualifying-questions",
    title: "Qualifying Questions",
    emoji: "❓",
    category: "techniques",
    content: `## The Art of Questioning

Good questions are the backbone of cold calling. They show expertise, build rapport, and uncover pain.

### Problem-Focused Questions
- "What's your biggest challenge with [area]?"
- "If you could fix one thing about [process], what would it be?"
- "How are you currently handling [problem]?"
- "What happens when [problem] occurs?"

### Impact Questions
- "How much is [problem] costing you?"
- "What would it mean for you if [problem] was solved?"
- "How long has this been going on?"
- "Who else is affected by this?"

### Process Questions
- "Walk me through how you currently [process]."
- "What does your decision-making process look like?"
- "Who else would need to be involved in this conversation?"

### Priority Questions
- "Where does fixing [problem] sit on your priority list?"
- "What's preventing you from addressing this sooner?"
- "If we could show you a way to [outcome], would it be worth 15 minutes?"

### The Power of "Why"
- "Why is that important to you?"
- "Why now?"
- "Why haven't you addressed this before?"

Never ask questions you could have Googled the answer to. Do your research first.`,
  },
  {
    slug: "tonality",
    title: "Cold Call Tonality",
    emoji: "🎵",
    category: "techniques",
    content: `## Why Tonality Matters

Words account for only 7% of communication impact. Tone accounts for 38%. Your tone tells the prospect whether to trust you or hang up.

## The Key Tones

### 1. Curious
Use when asking questions. Upward inflection. Shows genuine interest in their situation.

### 2. Calm & Confident
Use during your opener and pitch. Steady pace, lower register. Conveys authority without aggression.

### 3. Concerned
Use when discussing their problems. Slight downward tone. Shows empathy.

### 4. Playful
Use to break tension. Lighter tone, slight smile. Humanizes the conversation.

### 5. Confused (Intentional)
Use when they give a brush-off. "Really? That's surprising..." Makes them explain further.

## Common Tonality Mistakes

- ❌ **Monotone** — Sounds robotic and scripted
- ❌ **Too enthusiastic** — Sounds like a used car salesman
- ❌ **Rushed** — Sounds nervous and unconfident
- ❌ **Upward inflection on statements** — Sounds unsure
- ❌ **Apologetic** — "Sorry to bother you" undermines your value

## Tips

- Record yourself and listen back
- Practice with a colleague
- Smile when you speak (it changes your tone)
- Stand up while calling (opens your diaphragm)
- Mirror the prospect's energy level`,
  },
  {
    slug: "gatekeeper",
    title: "Getting Past the Gatekeeper",
    emoji: "💂🏻",
    category: "fundamentals",
    content: `## Understanding the Gatekeeper

The gatekeeper's job is to filter calls. They're doing their job well by screening you out. Respect them.

## Strategies

### 1. Be Direct and Confident
*"Hi, it's [your name], could you put me through to [name] please?"*

Say it like you expect to be transferred. No explanation, no justification.

### 2. Use First Name Only
*"Is [first name] available?"*

Using the first name only implies familiarity.

### 3. The Referral Approach
*"[Name] was recommended to me by [mutual contact]. Could you connect us?"*

### 4. Ask for Help
*"I'm hoping you can help me. I need to speak to whoever handles [area]. Would that be [name]?"*

Making the gatekeeper an ally rather than an obstacle.

### 5. Go Around
- Call before 8am or after 6pm (gatekeepers aren't there)
- Try the direct line or mobile
- Use LinkedIn to connect directly
- Call a different department and ask to be transferred

## What NOT to Do

- ❌ Don't be rude or dismissive
- ❌ Don't lie about who you are
- ❌ Don't say "it's personal"
- ❌ Don't give a long pitch to the gatekeeper
- ❌ Don't get frustrated — they're doing their job`,
  },
  {
    slug: "emotional-prospecting",
    title: "Emotional Prospecting - Triggers",
    emoji: "😠",
    category: "psychology",
    content: `## Emotional Triggers in Sales

People buy on emotion and justify with logic. Understanding emotional triggers is the key to effective cold calling.

## The Key Triggers

### 1. Fear
Fear of missing out. Fear of falling behind. Fear of making the wrong decision.
*"What would happen if a competitor solved this problem before you?"*

### 2. Frustration
Current pain points that they deal with daily.
*"How frustrating is it when [specific problem] happens?"*

### 3. Pride
Appeal to their competence and status.
*"You seem like someone who takes [area] seriously..."*

### 4. Curiosity
Open loops that make them want to know more.
*"I've got something a bit different from what you usually hear..."*

### 5. Relief
The feeling of having a solution to a persistent problem.
*"Imagine if [problem] just wasn't an issue anymore..."*

### 6. Urgency
Time-based pressure without being pushy.
*"Given that [trigger event], how quickly do you need to address this?"*

## Using Triggers Ethically

- Never manipulate — inform and guide
- Always be honest about what you can deliver
- Focus on real problems, not manufactured ones
- If there's no genuine need, move on`,
  },
  {
    slug: "call-structure",
    title: "Cold Call Structure - Step by Step",
    emoji: "🪜",
    category: "fundamentals",
    content: `## The Complete Call Structure

Every successful cold call follows a structure. Here's the step-by-step guide:

### Step 1: The Opener (0-15 seconds)
Goal: Earn 30 more seconds.
- Pattern interrupt or permission-based opener
- Reduce tension immediately
- Be human, not robotic

### Step 2: The Pitch (15-45 seconds)
Goal: Get them talking about their problems.
- State 2-3 common problems
- Ask if any resonate
- Keep it under 30 seconds

### Step 3: Discovery (45 seconds - 5 minutes)
Goal: Understand their specific situation.
- Ask open-ended questions
- Listen more than you speak (40:60 ratio)
- Take notes on key pain points
- Mirror and label emotions

### Step 4: Qualification (Throughout)
Goal: Determine if they're a good fit.
- Do they have the problem?
- Can they make or influence the decision?
- Is there budget or potential for it?
- Is there urgency?

### Step 5: The Close (Final 30 seconds)
Goal: Schedule next steps.
- Summarize what you've learned
- Propose a specific next step
- Get commitment on date and time
- Confirm with calendar invite

## Key Principles

1. **It's a conversation, not a monologue**
2. **Ask permission at every transition**
3. **Be okay with "no" — it's qualification**
4. **Don't pitch features — discuss problems**
5. **The goal is NEVER to sell on the first call**`,
  },
  {
    slug: "building-the-list",
    title: "Building your Calling List",
    emoji: "🎯",
    category: "operations",
    content: `## The Foundation

Your list is the foundation of everything. A bad list = wasted time, bad conversations, and low morale.

## Building the Right List

### 1. Define Your ICP
- Industry
- Company size
- Revenue range
- Geography
- Technology they use
- Trigger events (hiring, funding, expansion)

### 2. Data Sources
- LinkedIn Sales Navigator
- ZoomInfo / Apollo / Lusha
- Industry directories
- Conference attendee lists
- Company websites
- News and press releases

### 3. Quality Over Quantity
- 50 great contacts > 500 random ones
- Verify data before calling
- Research each contact for 2-3 minutes
- Personalize your approach based on research

### 4. List Hygiene
- Remove duplicates
- Update incorrect numbers
- Track outcomes per contact
- Remove unresponsive contacts after cadence completion

## The Math

If your list has:
- 100 contacts
- 30% pick-up rate = 30 conversations
- 30% qualification rate = 9 qualified prospects
- 33% conversion = 3 meetings

That's 3 meetings per 100 contacts. If you need 12 meetings per month, you need 400 fresh contacts monthly.`,
  },
  {
    slug: "disqualification",
    title: "(Dis)qualifying Prospects",
    emoji: "❌",
    category: "fundamentals",
    content: `## Why Disqualification Matters

Not every prospect is a good fit. The best salespeople disqualify fast to focus their time on real opportunities.

## Signs to Disqualify

1. **No problem** — They genuinely don't experience the issues you solve
2. **No authority** — They can't make or influence the decision
3. **No budget** — They can't afford it and won't be able to in the foreseeable future
4. **No urgency** — It's not a priority and nothing will change that
5. **Bad fit** — Your product/service doesn't actually solve their problem

## How to Disqualify Gracefully

- *"It sounds like this isn't a priority for you right now. When would be a better time to revisit?"*
- *"Based on what you've shared, I'm not sure we'd be the best fit. Would it be helpful if I pointed you to [alternative]?"*
- *"I appreciate your honesty. Rather than waste your time, let me check in again in [timeframe]."*

## The Mindset Shift

Disqualification is NOT rejection. It's smart selling. You're choosing to invest your time where it matters most.

Every minute spent on a bad prospect is a minute NOT spent on a good one.`,
  },
  {
    slug: "sales-kpis",
    title: "Understanding Sales KPIs",
    emoji: "👐🏻",
    category: "operations",
    content: `## Why KPIs Matter

What gets measured gets improved. KPIs tell you where you're winning and where you need help.

## The Key KPIs

### Activity Metrics
- **Dials per day** — How many calls you're making
- **Talk time** — How much time you're actually speaking to prospects
- **Conversations** — How many people pick up and engage

### Efficiency Metrics
- **Connect rate** — Conversations ÷ Dials (target: 10-15%)
- **Qualification rate** — Qualified ÷ Conversations (target: 25-30%)
- **Meeting set rate** — Meetings ÷ Conversations (target: 15-20%)

### Quality Metrics
- **Show rate** — How many meetings actually happen (target: 80%+)
- **Opportunity conversion** — Meetings that become pipeline
- **Average deal size** — Revenue per closed deal

## How to Track

1. Use your CRM religiously
2. Review weekly, not daily (daily fluctuations are noise)
3. Compare against YOUR benchmarks, not others'
4. Focus on improving one metric at a time
5. Share results with your team for accountability`,
  },
  {
    slug: "active-listening",
    title: "Active Listening",
    emoji: "👂🏻",
    category: "psychology",
    content: `## Why Active Listening Matters

Most salespeople listen to respond, not to understand. Active listening is the single most underrated skill in sales.

## Techniques

### 1. Mirroring
Repeat the last 1-3 words they said. It encourages them to elaborate.

*Prospect: "We've been struggling with this for months."*
*You: "Months?"*

### 2. Labeling
Name the emotion behind their words.
*"It sounds like this is really frustrating for you."*
*"It seems like you've been dealing with this for a while."*

### 3. Paraphrasing
Summarize what they said in your own words.
*"So if I'm hearing you right, the main issue is..."*

### 4. Silence
Don't fill every gap. Let them think and elaborate. Comfortable silence shows confidence.

### 5. Minimal Encouragers
Small verbal cues that show you're engaged:
- "Mmhmm"
- "I see"
- "Go on"
- "Tell me more"

## Useful Beliefs

1. Silence (conversational gaps) is ok
2. It's not your sole responsibility to carry a conversation — it takes two to tango
3. Being more interested in others makes you more interesting to others

## Habits

1. Calm the internal chatter — focus on their words
2. Resist the urge to interrupt
3. Don't try to steal the limelight — ask a question to encourage them to share more`,
  },
  {
    slug: "recruitment-objections",
    title: "Recruitment BD Objections",
    emoji: "🕵🏼",
    category: "objections",
    content: `## Types of Objections

**1. Brush off** — Knee-jerk reactions. Short, to-the-point responses highlighting the person doesn't see value in talking to you. They require you to lower their guard first.

**2. Objections** — Sometimes brush-offs, sometimes real. Your job is to determine whether they're a smoke screen.

## Framework

**1. Pause** — 2-3 seconds.

**2. Accept and repeat** — "I thought you might say that." / "It must be frustrating to operate without budget."

**3a. Ask for permission** — "Do you mind if I ask a question about that?"

**3b. Ask immediately** — With very direct objections, ask right away.

**Tonality:** ✅ Calm, Curious, Cool. ❌ Sarcasm, High-pitched, Annoyed.

## Recruitment-Specific Objections

### Pricing
**"We don't have any budget."**
*"It must be frustrating to operate with no money. I'm assuming even if you had budget, this wouldn't be a priority anyway, right?"*

### Status Quo
**"We're fine/good, thanks."**
*"Is that because you genuinely don't have problem X, or you don't trust someone cold calling you could help?"*

**"We already have a supplier."**
*"I thought you would, at least you are relevant. Does that mean everything is perfect?"*

### Brush Offs
**"I don't take sales calls."**
*"You don't take any cold calls or just the bad ones?"*

**"Send me an email."**
*"Of course. Before I do, would you be opposed to hearing what it's about to ensure it's even relevant?"*

**"I'm not interested."**
*"I'm not surprised — I'm a complete stranger interrupting your day. Would you be mad if I asked one last question?"*

## One Last Question

*"Before I go, do you mind if I ask one last question?"*

95/100 times, they'll agree. Use it to ask a thought-provoking question that gets them to engage.`,
  },
];

export const articles: Article[] = rawArticles.map((a) => ({
  ...a,
  readingTime: estimateReadingTime(a.content),
  excerpt: extractExcerpt(a.content),
}));

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category === categorySlug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
  );
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  const sameCategory = articles.filter(
    (a) => a.category === article.category && a.slug !== slug
  );
  const others = articles.filter(
    (a) => a.category !== article.category && a.slug !== slug
  );
  return [...sameCategory, ...others].slice(0, count);
}

/** Flat ordered list of all articles, grouped by category order */
export function getOrderedArticles(): Article[] {
  const ordered: Article[] = [];
  for (const cat of categories) {
    ordered.push(...articles.filter((a) => a.category === cat.slug));
  }
  return ordered;
}

/** Get previous and next articles relative to current slug */
export function getPrevNext(slug: string): { prev: Article | null; next: Article | null } {
  const ordered = getOrderedArticles();
  const idx = ordered.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ordered[idx - 1] : null,
    next: idx < ordered.length - 1 ? ordered[idx + 1] : null,
  };
}
