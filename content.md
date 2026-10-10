# Portfolio Content — Shaheer Khan

> Source of truth for the site. Every section is built from this file.
> Rules: no education, no dates, no university name, no tool or technique names, no project links (GitHub profile covers code).
>
> **Concept:** the portfolio reads like a research journal. Each project is a numbered "paper" with an abstract, method, findings, and open questions. It signals how Shaheer thinks, not just what he built.

---

## Meta

- **Name:** Shaheer Khan
- **Site title:** Shaheer Khan — AI Automation & Web Development
- **Tagline (browser / social preview):** AI systems that ship with the product around them.

---

## Hero

**Eyebrow:** Shaheer Khan — AI Automation & Web Development

**Headline:**
Most AI projects stop at the model.
Mine ship with the product around it.

**Supporting line:**
I design AI systems that automate real work, then build the interfaces, safeguards, and reasoning that make people trust them.

**Buttons:** Read the work · Get in touch

**Recognition (text wordmarks):** HEC Generative AI National Hackathon · Fauji Foundation · NAVTTC

---

## Thesis
*(short statement under the hero, styled like a journal's opening note)*

A model on its own is a demo. It becomes useful when someone can use it, understand its decisions, and stop it when it's wrong. Every project here is built around that idea: the intelligence, the interface, and the guardrails, designed together by one person.

---

## Areas of Work

**AI Automation**
- Multi-agent systems that plan, act, and learn, with humans approving the decisions that matter
- Video understanding: reading behavior from footage, not just objects
- AI that turns rough human input into polished, structured output

**Web Development**
- Full-stack products, from database to dashboard
- Interfaces that make complex systems feel simple: onboarding, review queues, live metrics
- Evolving a product from static pages to a maintainable architecture

**What ties them together**
I build end to end. The same person who designs the model designs the screen it lives on, so nothing gets lost in the handoff.

---

## Selected Papers

*Four solo projects, written up the way they were thought through.*

---

### Paper 01 — MILO
## Controlled Autonomy: An Agentic AI System for Digital Marketing

**Keywords:** agentic AI · human-in-the-loop · explainability · automation

**Abstract**
Marketing teams juggle separate tools for strategy, copy, design, ad buying, and analytics, and none of them learn from the last campaign. MILO replaces that stack with a team of specialized AI agents that plan, create, launch, and optimize campaigns end to end. The core design decision: the AI proposes, a human approves, and every decision comes with a reason.

**1. Problem**
Full automation in marketing is risky because it spends real money. No automation is slow and expensive. The open question was how much autonomy an AI should have, and where a human must stay in the loop.

**2. Approach**
Split the work across specialized agents instead of one general model. Each agent owns a single job: understanding the business, planning strategy, writing copy, generating images and video, launching, optimizing, and remembering. A governance layer sits above all of them.

**3. System**
- Agents coordinate as a pipeline, from business onboarding to live campaign
- Connects to the major ad platforms to launch and monitor campaigns from one place
- Hard monthly budget caps the AI can never exceed
- Approval gates before anything goes live, and a plain-language explanation for every major AI decision
- A learning memory that feeds past outcomes into future strategy
- Full product specification: 20 business requirements, 20+ process flows, and system-level data flow diagrams

**4. Findings**
Designing the guardrails turned out to be as much work as designing the agents. Budget caps, approval gates, and explanations aren't add-ons; they decide whether anyone would trust the system with a real budget.

**5. Open Questions**
How quickly the learning memory improves results across many campaigns, and which decisions can safely move from "human approves" to "AI decides."

> **Key insight:** Autonomy is easy to build. Trust is the actual product.

**Figures:** landing page · platform connection · budget cap · dashboard

---

### Paper 02 — Crowd Behavior Analysis
## Reading Crowds from the Sky: Behavior Classification in Aerial Footage

**Keywords:** computer vision · video understanding · public safety · synthetic data

**Abstract**
Drone footage of crowds is easy to capture and hard to monitor. Signs of panic or conflict are easy to miss when someone is watching hours of video. This system watches aerial footage and classifies the crowd as Normal, Panic, Aggressive, or Idle, turning raw video into an early-warning signal.

**1. Problem**
A single frame can show a dense crowd but can't show whether it's queuing calmly or stampeding. Behavior lives in motion, not in snapshots.

**2. Approach**
Teach the model to look in two ways at once: what each frame contains, and how the crowd moves from one frame to the next. Classify short overlapping windows of video, then let the windows vote on the overall behavior.

**3. System**
- A model that combines per-frame understanding with movement over time
- Motion analysis that tracks crowd flow and density between frames
- Training data that combines real drone footage with synthetic crowd scenes I generated
- A web dashboard: upload footage, and the system returns the dominant behavior

**4. Findings**
Real footage of panic and aggression is rare, which is exactly the footage that matters most. Generating synthetic scenarios was the way to give the model enough examples of the behaviors it most needed to recognize.

**5. Open Questions**
Moving from uploaded recordings to live drone feeds, and how early a behavior change can be flagged reliably.

> **Key insight:** Behavior lives in motion. A model that only sees frames sees crowds; one that sees movement sees intent.

**Figures:** dashboard · behavior classes · three-stage pipeline

---

### Paper 03 — ShiftLogic Performance Portal
## One Product, Five Architectures: Evolving a Full-Stack System

**Keywords:** full-stack · system architecture · iterative design

**Abstract**
Most projects are built once. ShiftLogic, a management portal for a fictional race tuning garage, was rebuilt five times, each stage on a stronger architecture than the last. The result is a working full-stack system and a first-hand record of why architecture matters.

**1. Problem**
It's easy to learn web development as separate topics. The harder skill is seeing how one product has to change as it grows.

**2. Approach**
Keep the product fixed and change everything underneath it: start with static pages, add data, then restructure the entire application.

**3. System**
- Stage 1–2: a static website with a full visual identity
- Stage 3–4: a live database, user sessions, and working forms
- Stage 5: a fully structured application with its own data API
- Features: staff directory with add and edit, parts catalogue, photo gallery

**4. Findings**
Each rebuild exposed the shortcuts of the one before. Structure feels like overhead at first, then becomes the thing that makes changes fast instead of risky.

**5. Open Questions**
Role-based access for staff versus customers, and live inventory for the parts catalogue.

> **Key insight:** You don't really understand an architecture until you've outgrown the one before it.

*ShiftLogic is a fictional business; the garage figures on its site are demo data.*

**Figures:** home page · staff directory · parts catalogue

---

### Paper 04 — ResumeAI
## From Rough Notes to Recruiter-Ready: AI-Assisted Career Documents

**Keywords:** generative AI · writing assistance · product design

**Abstract**
Most people know what they've done but struggle to write it well. ResumeAI takes plain answers from a simple form and uses AI to turn them into a polished resume and a personal portfolio page, with no writing or design skill needed.

**1. Problem**
A blank resume template asks people to be writers and designers at the same time. Most aren't, and their real experience gets undersold.

**2. Approach**
Separate the two jobs. The user only answers questions; the AI handles the writing, and templates handle the design.

**3. System**
- A step-by-step form that collects career details without overwhelming the user
- AI that rewrites rough input into clear, professional bullet points and summaries
- Six resume templates, one-click PDF export, and an auto-generated portfolio page

**4. Findings**
The quality of the output depends more on the questions asked than on the AI. Guiding people to give specific answers produced far better results than polishing vague ones.

**5. Limitations**
Built as a working prototype rather than a production service. Next steps would be scaling it for real users and adding tailoring for specific job descriptions.

> **Key insight:** Good AI writing starts with good questions.

**Figures:** landing page · features overview

---

## Also Built
*Shorter studies, one line each.*

- **Face Attendance System:** marks attendance by face, ending manual errors and proxy attendance
- **Student Feedback Analyzer:** reads student feedback, detects sentiment and emotion, and turns it into charts instructors can act on
- **Heart Disease Risk Prediction:** predicts heart disease risk and groups patients into distinct risk profiles

---

## About

I'm Shaheer. I build AI systems and the products around them.

I'm drawn to the gap between a model that works and a product people trust. That gap is where most AI projects fail, so it's where I spend my time: the interface, the guardrails, and the explanation of why the system did what it did.

When I'm not building: chess, football, and swimming.

---

## Beyond Code

- **Career guidance for CS students:** led a three-person team that designed a career guidance program for computer science students, including international students, mapping paths into emerging fields like AI, blockchain, and cloud
- **Sports President:** led my college's sports program, organizing tournaments and events and building team spirit across the student body

## Recognition

- **3rd Position, HEC Generative AI National Hackathon** (nationwide)
- **AI Intern, Fauji Foundation**
- **Certified in Advanced Web Application Development** (A+)

---

## Contact

**Headline:** Have a problem that needs an AI system and a product around it?

**Line:** I'm open to roles and collaborations in AI automation and web development.

- **Email:** shaheerkhanx707@gmail.com
- **GitHub:** https://github.com/Shaheer-khann (all project code)
- **LinkedIn:** https://www.linkedin.com/in/shaheer-khan-720662268
- **CV:** /cv.pdf (download)

No phone number on the public site.
