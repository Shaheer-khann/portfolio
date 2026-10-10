// All site copy, transcribed verbatim from content.md.
// content.md is the source of truth: change the words there first, then mirror them here.

import type { StaticImageData } from "next/image";

import miloLanding from "@/public/papers/milo/01-landing.png";
import miloDashboard from "@/public/papers/milo/02-dashboard.png";
import miloConnect from "@/public/papers/milo/03-connect-platforms.png";
import miloBudget from "@/public/papers/milo/04-budget-cap.png";
import crowdBehaviors from "@/public/papers/crowd-behavior/01-behaviors.png";
import shiftHome from "@/public/papers/shiftlogic/01-home.png";
import shiftCrew from "@/public/papers/shiftlogic/02-crew-directory.png";
import shiftParts from "@/public/papers/shiftlogic/03-parts.png";
import resumeFeatures from "@/public/papers/resumeai/01-features.png";

export const meta = {
  name: "Shaheer Khan",
  title: "Shaheer Khan — AI Automation & Web Development",
  tagline: "AI systems that ship with the product around them.",
};

export const hero = {
  eyebrow: "AI Automation & Web Development",
  headline: [
    "Most AI projects stop at the model.",
    "Mine ship with the product around it.",
  ],
  supporting:
    "I design AI systems that automate real work, then build the interfaces, safeguards, and reasoning that make people trust them.",
  primaryButton: "Read the work",
  secondaryButton: "Get in touch",
  // Text wordmarks under the hero.
  recognitionLabel: "Recognition",
  wordmarks: ["HEC Generative AI National Hackathon", "Fauji Foundation", "NAVTTC"],
  card: {
    strong: "3rd Position",
    rest: "HEC Generative AI National Hackathon",
  },
  // Marquee labels, taken from the paper keywords.
  marquee: [
    "agentic AI",
    "computer vision",
    "full-stack",
    "human-in-the-loop",
    "automation",
  ],
};

export const thesis = {
  label: "Thesis",
  text: "A model on its own is a demo. It becomes useful when someone can use it, understand its decisions, and stop it when it's wrong. Every project here is built around that idea: the intelligence, the interface, and the guardrails, designed together by one person.",
};

export const areas = {
  label: "Areas of Work",
  heading: "I build",
  // The large highlight list uses the opening clause of each bullet below, word for word.
  highlights: [
    "Multi-agent systems that plan, act, and learn",
    "Video understanding: reading behavior from footage",
    "AI that turns rough human input into polished, structured output",
    "Full-stack products, from database to dashboard",
    "Interfaces that make complex systems feel simple",
    "Evolving a product from static pages to a maintainable architecture",
  ],
  groups: [
    {
      title: "AI Automation",
      items: [
        "Multi-agent systems that plan, act, and learn, with humans approving the decisions that matter",
        "Video understanding: reading behavior from footage, not just objects",
        "AI that turns rough human input into polished, structured output",
      ],
    },
    {
      title: "Web Development",
      items: [
        "Full-stack products, from database to dashboard",
        "Interfaces that make complex systems feel simple: onboarding, review queues, live metrics",
        "Evolving a product from static pages to a maintainable architecture",
      ],
    },
  ],
  tie: {
    title: "What ties them together",
    text: "I build end to end. The same person who designs the model designs the screen it lives on, so nothing gets lost in the handoff.",
  },
};

export type PaperSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type PaperFigure = {
  src: StaticImageData;
  caption: string;
};

export type Paper = {
  slug: string;
  number: string;
  name: string;
  title: string;
  keywords: string[];
  abstract: string;
  sections: PaperSection[];
  insight: string;
  note?: string;
  figures: PaperFigure[];
  /** Index into `figures` of the screenshot shown on the homepage card. */
  cover: number;
  /** Which part of the cover screenshot the card crop keeps. Defaults to the top centre. */
  coverAnchor?: "left" | "center";
};

export const papersIntro = {
  label: "Selected Papers",
  heading: "Four solo projects, written up the way they were thought through.",
};

export const papers: Paper[] = [
  {
    slug: "milo",
    number: "01",
    name: "MILO",
    title: "Controlled Autonomy: An Agentic AI System for Digital Marketing",
    keywords: ["agentic AI", "human-in-the-loop", "explainability", "automation"],
    abstract:
      "Marketing teams juggle separate tools for strategy, copy, design, ad buying, and analytics, and none of them learn from the last campaign. MILO replaces that stack with a team of specialized AI agents that plan, create, launch, and optimize campaigns end to end. The core design decision: the AI proposes, a human approves, and every decision comes with a reason.",
    sections: [
      {
        heading: "Problem",
        body: "Full automation in marketing is risky because it spends real money. No automation is slow and expensive. The open question was how much autonomy an AI should have, and where a human must stay in the loop.",
      },
      {
        heading: "Approach",
        body: "Split the work across specialized agents instead of one general model. Each agent owns a single job: understanding the business, planning strategy, writing copy, generating images and video, launching, optimizing, and remembering. A governance layer sits above all of them.",
      },
      {
        heading: "System",
        items: [
          "Agents coordinate as a pipeline, from business onboarding to live campaign",
          "Connects to the major ad platforms to launch and monitor campaigns from one place",
          "Hard monthly budget caps the AI can never exceed",
          "Approval gates before anything goes live, and a plain-language explanation for every major AI decision",
          "A learning memory that feeds past outcomes into future strategy",
          "Full product specification: 20 business requirements, 20+ process flows, and system-level data flow diagrams",
        ],
      },
      {
        heading: "Findings",
        body: "Designing the guardrails turned out to be as much work as designing the agents. Budget caps, approval gates, and explanations aren't add-ons; they decide whether anyone would trust the system with a real budget.",
      },
      {
        heading: "Open Questions",
        body: "How quickly the learning memory improves results across many campaigns, and which decisions can safely move from \"human approves\" to \"AI decides.\"",
      },
    ],
    insight: "Autonomy is easy to build. Trust is the actual product.",
    figures: [
      { src: miloLanding, caption: "landing page" },
      { src: miloConnect, caption: "platform connection" },
      { src: miloBudget, caption: "budget cap" },
      { src: miloDashboard, caption: "dashboard" },
    ],
    cover: 3,
    coverAnchor: "left",
  },
  {
    slug: "crowd-behavior",
    number: "02",
    name: "Crowd Behavior Analysis",
    title: "Reading Crowds from the Sky: Behavior Classification in Aerial Footage",
    keywords: ["computer vision", "video understanding", "public safety", "synthetic data"],
    abstract:
      "Drone footage of crowds is easy to capture and hard to monitor. Signs of panic or conflict are easy to miss when someone is watching hours of video. This system watches aerial footage and classifies the crowd as Normal, Panic, Aggressive, or Idle, turning raw video into an early-warning signal.",
    sections: [
      {
        heading: "Problem",
        body: "A single frame can show a dense crowd but can't show whether it's queuing calmly or stampeding. Behavior lives in motion, not in snapshots.",
      },
      {
        heading: "Approach",
        body: "Teach the model to look in two ways at once: what each frame contains, and how the crowd moves from one frame to the next. Classify short overlapping windows of video, then let the windows vote on the overall behavior.",
      },
      {
        heading: "System",
        items: [
          "A model that combines per-frame understanding with movement over time",
          "Motion analysis that tracks crowd flow and density between frames",
          "Training data that combines real drone footage with synthetic crowd scenes I generated",
          "A web dashboard: upload footage, and the system returns the dominant behavior",
        ],
      },
      {
        heading: "Findings",
        body: "Real footage of panic and aggression is rare, which is exactly the footage that matters most. Generating synthetic scenarios was the way to give the model enough examples of the behaviors it most needed to recognize.",
      },
      {
        heading: "Open Questions",
        body: "Moving from uploaded recordings to live drone feeds, and how early a behavior change can be flagged reliably.",
      },
    ],
    insight:
      "Behavior lives in motion. A model that only sees frames sees crowds; one that sees movement sees intent.",
    // content.md also lists "dashboard" and "three-stage pipeline"; neither screenshot is in
    // public/ yet (02-pipeline.png is a byte-for-byte copy of 01-behaviors.png).
    figures: [{ src: crowdBehaviors, caption: "behavior classes" }],
    cover: 0,
  },
  {
    slug: "shiftlogic",
    number: "03",
    name: "ShiftLogic Performance Portal",
    title: "One Product, Five Architectures: Evolving a Full-Stack System",
    keywords: ["full-stack", "system architecture", "iterative design"],
    abstract:
      "Most projects are built once. ShiftLogic, a management portal for a fictional race tuning garage, was rebuilt five times, each stage on a stronger architecture than the last. The result is a working full-stack system and a first-hand record of why architecture matters.",
    sections: [
      {
        heading: "Problem",
        body: "It's easy to learn web development as separate topics. The harder skill is seeing how one product has to change as it grows.",
      },
      {
        heading: "Approach",
        body: "Keep the product fixed and change everything underneath it: start with static pages, add data, then restructure the entire application.",
      },
      {
        heading: "System",
        items: [
          "Stage 1–2: a static website with a full visual identity",
          "Stage 3–4: a live database, user sessions, and working forms",
          "Stage 5: a fully structured application with its own data API",
          "Features: staff directory with add and edit, parts catalogue, photo gallery",
        ],
      },
      {
        heading: "Findings",
        body: "Each rebuild exposed the shortcuts of the one before. Structure feels like overhead at first, then becomes the thing that makes changes fast instead of risky.",
      },
      {
        heading: "Open Questions",
        body: "Role-based access for staff versus customers, and live inventory for the parts catalogue.",
      },
    ],
    insight:
      "You don't really understand an architecture until you've outgrown the one before it.",
    note: "ShiftLogic is a fictional business; the garage figures on its site are demo data.",
    figures: [
      { src: shiftHome, caption: "home page" },
      { src: shiftCrew, caption: "staff directory" },
      { src: shiftParts, caption: "parts catalogue" },
    ],
    cover: 1,
    coverAnchor: "left",
  },
  {
    slug: "resumeai",
    number: "04",
    name: "ResumeAI",
    title: "From Rough Notes to Recruiter-Ready: AI-Assisted Career Documents",
    keywords: ["generative AI", "writing assistance", "product design"],
    abstract:
      "Most people know what they've done but struggle to write it well. ResumeAI takes plain answers from a simple form and uses AI to turn them into a polished resume and a personal portfolio page, with no writing or design skill needed.",
    sections: [
      {
        heading: "Problem",
        body: "A blank resume template asks people to be writers and designers at the same time. Most aren't, and their real experience gets undersold.",
      },
      {
        heading: "Approach",
        body: "Separate the two jobs. The user only answers questions; the AI handles the writing, and templates handle the design.",
      },
      {
        heading: "System",
        items: [
          "A step-by-step form that collects career details without overwhelming the user",
          "AI that rewrites rough input into clear, professional bullet points and summaries",
          "Six resume templates, one-click PDF export, and an auto-generated portfolio page",
        ],
      },
      {
        heading: "Findings",
        body: "The quality of the output depends more on the questions asked than on the AI. Guiding people to give specific answers produced far better results than polishing vague ones.",
      },
      {
        heading: "Limitations",
        body: "Built as a working prototype rather than a production service. Next steps would be scaling it for real users and adding tailoring for specific job descriptions.",
      },
    ],
    insight: "Good AI writing starts with good questions.",
    // content.md also lists "landing page"; that screenshot is not in public/ yet.
    figures: [{ src: resumeFeatures, caption: "features overview" }],
    cover: 0,
  },
];

export function getPaper(slug: string) {
  return papers.find((paper) => paper.slug === slug);
}

export const alsoBuilt = {
  label: "Also Built",
  heading: "Shorter studies, one line each.",
  items: [
    {
      name: "Face Attendance System",
      text: "marks attendance by face, ending manual errors and proxy attendance",
    },
    {
      name: "Student Feedback Analyzer",
      text: "reads student feedback, detects sentiment and emotion, and turns it into charts instructors can act on",
    },
    {
      name: "Heart Disease Risk Prediction",
      text: "predicts heart disease risk and groups patients into distinct risk profiles",
    },
  ],
};

export const about = {
  label: "About",
  heading: "I'm Shaheer. I build AI systems and the products around them.",
  paragraphs: [
    "I'm drawn to the gap between a model that works and a product people trust. That gap is where most AI projects fail, so it's where I spend my time: the interface, the guardrails, and the explanation of why the system did what it did.",
    "When I'm not building: chess, football, and swimming.",
  ],
};

export const beyondCode = {
  label: "Beyond Code",
  items: [
    {
      title: "Career guidance for CS students",
      text: "led a three-person team that designed a career guidance program for computer science students, including international students, mapping paths into emerging fields like AI, blockchain, and cloud",
    },
    {
      title: "Sports President",
      text: "led my college's sports program, organizing tournaments and events and building team spirit across the student body",
    },
  ],
};

export const recognition = {
  label: "Recognition",
  items: [
    { title: "3rd Position, HEC Generative AI National Hackathon", text: "nationwide" },
    { title: "AI Intern, Fauji Foundation" },
    { title: "Certified in Advanced Web Application Development", text: "A+" },
  ],
};

export const contact = {
  label: "Contact",
  headline: "Have a problem that needs an AI system and a product around it?",
  line: "I'm open to roles and collaborations in AI automation and web development.",
  email: "shaheerkhanx707@gmail.com",
  github: "https://github.com/Shaheer-khann",
  linkedin: "https://www.linkedin.com/in/shaheer-khan-720662268",
  cv: "/cv.pdf",
};

// Interface labels specified by design.md (navigation and controls, not editorial copy).
export const ui = {
  nav: [
    { label: "Home", id: "top" },
    { label: "Work", id: "work" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ],
  navCta: "Get in touch",
  paper: "Paper",
  abstract: "Abstract",
  keyInsight: "Key insight",
  readPaper: "Read paper",
  nextPaper: "Next paper",
  figure: "Fig.",
  downloadCv: "Download CV",
  github: "GitHub",
  linkedin: "LinkedIn",
  emailCopied: "Email copied",
  backToTop: "Back to top",
} as const;
