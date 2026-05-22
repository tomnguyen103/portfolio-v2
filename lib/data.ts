import {
  Code2,
  Layers,
  Database,
  Zap,
  Bot,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SkillCard {
  icon: LucideIcon;
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  image: string;
  imageFit?: "cover" | "contain";
  description: string[];
  tech: string[];
  github: string;
  demo?: string;
}

export interface Experience {
  company: string;
  type: string;
  title: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
}

export const tagColor: Record<string, string> = {
  // AI / ML — violet
  "AI Agent Architecture":  "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40",
  "Prompt Engineering":     "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40",
  "LLM Workflows":          "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40",
  "Neural Network":         "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40",
  "Reinforcement Learning": "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40",
  "Genetic Algorithm":      "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40",
  // Google Gemini — blue
  "Gemini SDK":             "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40",
  "Gemini":                 "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40",
  // Languages
  "JavaScript":             "bg-yellow-400/20 text-yellow-700 dark:text-yellow-300 border-yellow-400/40",
  "TypeScript":             "bg-blue-600/20 text-blue-700 dark:text-blue-300 border-blue-600/40",
  "Python":                 "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40",
  "Java":                   "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40",
  "HTML5":                  "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/40",
  "HTML/CSS":               "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/40",
  "CSS3":                   "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40",
  // Frameworks
  "Next.js":                "bg-slate-500/20 text-slate-700 dark:text-slate-200 border-slate-500/40",
  "React Native":           "bg-cyan-400/20 text-cyan-700 dark:text-cyan-300 border-cyan-400/40",
  "NativeWind":             "bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/40",
  "Expo":                   "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/40",
  "MEAN Stack":             "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/40",
  "Django":                 "bg-green-600/20 text-green-700 dark:text-green-300 border-green-600/40",
  "Flask":                  "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/40",
  "Spring Framework":       "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/40",
  "Mendix":                 "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40",
  // Databases
  "MySQL":                  "bg-sky-600/20 text-sky-700 dark:text-sky-300 border-sky-600/40",
  "MongoDB":                "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/40",
  "SQLite":                 "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40",
  "Prisma Postgres":        "bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/40",
  // Cloud & DevOps
  "AWS EC2":                "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40",
  "Vercel":                 "bg-slate-500/20 text-slate-700 dark:text-slate-200 border-slate-500/40",
  "Trigger.dev":            "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40",
  "Git/GitHub":             "bg-orange-600/20 text-orange-700 dark:text-orange-300 border-orange-600/40",
  "Postman":                "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/40",
  "VS Code":                "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40",
  // Auth & Real-time
  "Clerk":                  "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40",
  "Liveblocks":             "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40",
  "Stream Video SDK":       "bg-blue-600/20 text-blue-700 dark:text-blue-300 border-blue-600/40",
  // State
  "Zustand":                "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40",
  // Architecture & Patterns
  "RESTful API Design":     "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40",
  "MVC":                    "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40",
  "OOP":                    "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40",
  "CRUD Operations":        "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40",
};

export const skillCards: SkillCard[] = [
  {
    icon: Bot,
    title: "AI & LLM Integration",
    skills: ["AI Agent Architecture", "Prompt Engineering", "Gemini SDK", "LLM Workflows"],
  },
  {
    icon: Code2,
    title: "Languages & Web",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3"],
  },
  {
    icon: Layers,
    title: "Frameworks",
    skills: ["MEAN Stack", "Django", "Flask", "Spring Framework", "Mendix"],
  },
  {
    icon: Database,
    title: "Databases & ORMs",
    skills: ["MySQL", "MongoDB", "SQLite", "Prisma Postgres"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    skills: ["AWS EC2", "Vercel", "Trigger.dev", "Git/GitHub"],
  },
  {
    icon: Zap,
    title: "Modern Infrastructure",
    skills: ["Clerk", "Liveblocks", "Stream Video SDK", "Zustand", "RESTful API Design"],
  },
];

export const projects: Project[] = [
  {
    title: "Development Plan Tool",
    image: "/images/pic04.png",
    imageFit: "contain",
    description: [
      "Real-time collaborative system architecture builder with AI assistance",
      "Interactive React Flow diagram editor with live cursors and presence avatars",
      "AI-powered design suggestions and auto-generated technical specs via Gemini",
    ],
    tech: ["Next.js", "TypeScript", "Prisma Postgres", "Liveblocks", "Trigger.dev", "Gemini", "Clerk", "Vercel"],
    github: "https://github.com/tomnguyen103/Development-Plan-Tool",
    demo: "https://development-tool.tomnguyen.me/",
  },
  {
    title: "AI Language Learning App",
    image: "/images/pic06.png",
    description: [
      "AI-powered language learning mobile app, a modern alternative to Duolingo",
      "Real-time audio calls with an AI teacher, live captioning and pronunciation feedback",
      "Supports 4 languages with 12 structured lessons and daily XP streak tracking",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Stream Video SDK", "Clerk", "NativeWind", "Zustand"],
    github: "https://github.com/tomnguyen103/MyFirstMobileApp",
  },
  {
    title: "AI Flappy Bird",
    image: "/images/pic01.png",
    description: [
      "Rewrote basic HTML Flappy Bird into an AI-driven version",
      "Applied Reinforcement Learning and Neural Network concepts",
      "Implemented Genetic Algorithm for agent evolution",
    ],
    tech: ["JavaScript", "HTML/CSS", "Neural Network", "Genetic Algorithm", "Reinforcement Learning"],
    github: "https://github.com/tomnguyen103/AI_Flappy_Bird",
    demo: "https://youtu.be/uf1wSdsGWUs",
  },
];

export const experiences: Experience[] = [
  {
    company: "Texas Regional Physicians",
    type: "Full-time",
    title: "Software Developer",
    start: "Apr 2024",
    end: "Present",
    location: "Houston, Texas · Remote",
    bullets: [
      "Architect, develop, and maintain a clinical portal serving 30+ clinic staff, doctors, and 10+ attorney users, with 40+ feature updates and UI enhancements delivered in the last 3 months alone.",
      "Design and build staff-facing UIs using HTML, CSS/SASS, and JavaScript, translating complex clinical and legal workflows into intuitive interfaces for non-technical users.",
      "Manage and optimize a PostgreSQL database with 50+ entities, including adding indexes on consult queries to significantly improve calendar load performance in a HIPAA-sensitive environment.",
      "Integrate the Curogram SMS API for appointment communications, including a targeted fix to batch-send logic that prevents surveys from incorrectly triggering on past appointments.",
      "Serve as the primary technical liaison to Directors, gathering requirements, proposing multiple solutions, aligning on approach, and delivering implementations on clearly communicated timelines.",
    ],
  },
  {
    company: "Memorial MRI and Diagnostic",
    type: "Full-time",
    title: "Software Developer",
    start: "Nov 2021",
    end: "Apr 2024",
    location: "Houston, Texas",
    bullets: [
      "Developed and maintained a centralized billing portal across 8 locations, receiving SFTP-transmitted HL7 documents from radiology systems and translating them into structured Mendix data for clinical staff.",
      "Designed and maintained four company websites serving patients and referring physicians across 8 diagnostic imaging locations.",
      "Managed a PostgreSQL database with 20+ entities, maintaining data integrity, backup procedures, and query performance across a multi-location imaging operation.",
      "Integrated the EXA radiology information system via HL7 interface, enabling automated data transmission between external imaging systems and the internal Mendix portal.",
      "Detected a silent breaking change when EXA updated their HL7 format without notice. Identified missing data through proactive log monitoring, escalated immediately to the supervisor, and coordinated directly with EXA to adapt the integration and restore full data transmission.",
    ],
  },
  {
    company: "Coding Dojo",
    type: "Full-time",
    title: "Resident Full Stack Developer",
    start: "Sep 2019",
    end: "Nov 2021",
    location: "Greater Los Angeles Area",
    bullets: [
      "Built and shipped multiple full-stack projects including an AI Flappy Bird (Neural Network + Genetic Algorithm built from scratch), a School Library Platform (Django/SQLite), and a Canvas drawing app, demonstrating rapid prototyping across diverse domains.",
      "Applied Reinforcement Learning and Neural Network concepts to train autonomous game agents using Genetic Algorithms, implementing the full learning pipeline from scratch.",
      "Developed and deployed full-stack web applications using Python, Django, HTML/CSS, JavaScript, and AWS, covering the full lifecycle from development to cloud production.",
    ],
  },
];
