export interface SkillCard {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  image: string;
  imageFit?: "cover" | "contain";
  imageBg?: string;
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

export const skillCards: SkillCard[] = [
  {
    title: "AI & LLM Integration",
    skills: ["AI Agent Architecture", "Prompt Engineering", "Gemini SDK", "LLM Workflows"],
  },
  {
    title: "Languages & Web",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks",
    skills: ["MEAN Stack", "Django", "Flask", "Spring Framework", "Mendix"],
  },
  {
    title: "Databases & ORMs",
    skills: ["MySQL", "MongoDB", "SQLite", "Prisma Postgres"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS EC2", "Vercel", "Trigger.dev", "Git/GitHub"],
  },
  {
    title: "Modern Infrastructure",
    skills: ["Clerk", "Liveblocks", "Stream Video SDK", "Zustand", "RESTful API Design"],
  },
];

export const projects: Project[] = [
  {
    title: "Second Brain Portfolio Demo",
    image: "/images/second-brain-portfolio-demo-chat.png",
    imageFit: "contain",
    imageBg: "#e8dfd1",
    description: [
      "Static, public-safe portfolio preview of a local-first AI workspace with chat, search, sources, briefings, feedback, tasks, and admin surfaces",
      "Mirrors cited RAG and Agentic RAG flows with deterministic browser-side fixtures, citation markers, retrieval metadata, and read-only actions",
      "Deploys as a zero-backend-cost Netlify static export separated from private notes, secrets, databases, workers, and MCP runtime code",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "TanStack Query", "Framer Motion", "Netlify"],
    github: "https://github.com/tomnguyen103/second-brain-portfolio-demo",
    demo: "https://second-brain.tomnguyen.me/",
  },
  {
    title: "AI Financial Platform",
    image: "/images/ai-financial-v2.png",
    imageFit: "contain",
    imageBg: "#0d1117",
    description: [
      "End-to-end production-style financial assistant powered by FastAPI and RAG retrieval over Pinecone",
      "Integrates LLM models with machine learning pipelines built using scikit-learn and pandas",
      "Demonstrates the complete ML lifecycle, including data pipelines, model serving, evaluation, and deployment",
    ],
    tech: ["Python", "FastAPI", "scikit-learn", "pandas", "SQLite", "Docker", "RAG Retrieval"],
    github: "https://github.com/tomnguyen103/AI_Financial_Platform",
    demo: "https://financial.tomnguyen.me",
  },
  {
    title: "Sudoku Solver Visualizer",
    image: "/images/sudoku-v2.png",
    imageFit: "contain",
    imageBg: "#ffffff",
    description: [
      "Dynamic browser-based visualizer for multiple backtracking and constraint solving algorithms",
      "Generates valid, unique puzzles in real-time with Easy, Medium, and Hard difficulty models",
      "Animates solving traces, tracking placed values, backtracks, and precise algorithm execution times",
    ],
    tech: ["JavaScript", "HTML/CSS", "PWA", "Service Worker", "Algorithms", "Netlify"],
    github: "https://github.com/tomnguyen103/Sudoku-Game-v2",
    demo: "https://sudoku.tomnguyen.me/",
  },
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
    image: "/images/ai_flappy_bird_demo.png",
    imageFit: "contain",
    imageBg: "#1c8da5",
    description: [
      "Interactive simulation dashboard of an artificial intelligence learning to play Flappy Bird via neuroevolution",
      "Features a live neural network visualizer rendering real-time node activations, synapses, and auto-scaling generation fitness charts",
      "Optimized with modular ES6 classes and high-performance zero-copy breeding to eliminate frame rate spikes during genetic crossovers",
    ],
    tech: ["JavaScript", "HTML/CSS", "Neural Network", "Genetic Algorithm", "Reinforcement Learning"],
    github: "https://github.com/tomnguyen103/AI_Flappy_Bird",
    demo: "https://bird.tomnguyen.me/",
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
