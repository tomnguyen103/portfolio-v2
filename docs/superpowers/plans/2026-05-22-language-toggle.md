# Language Toggle (EN ↔ VI) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an English/Vietnamese language toggle to the portfolio nav with localStorage persistence, translating all visible text across every section plus a separate `resume-vi.html`.

**Architecture:** A custom `LanguageProvider` (React context) wraps the app, initialises to `'en'`, reads `localStorage` on mount, and exposes `locale`, `setLocale`, and `t` (the current translation object). All translated strings for both locales live in `lib/translations.ts`. Components call `useLanguage()` and swap in `t.*` strings; non-translatable data (dates, URLs, tech stacks) stays in `lib/data.ts` untouched.

**Tech Stack:** Next.js 16 App Router, TypeScript, React context, localStorage

---

> **No test framework is installed.** Each task verifies correctness via `npx tsc --noEmit` (type check) and a final `npm run build`. Visual spot-checks are noted where needed.

---

### Task 1: Create `lib/translations.ts`

**Files:**
- Create: `lib/translations.ts`

- [ ] **Step 1: Create the translations file**

```ts
// lib/translations.ts

export const translations = {
  en: {
    nav: {
      home: 'Home',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      resume: 'Resume',
    },
    hero: {
      greeting: "Hi. I'm Tom Nguyen.",
      bio: 'Experienced Software Developer with 4+ years building and maintaining production applications for healthcare providers in Houston. A pragmatic problem-solver across the full stack, from clinical interfaces and enterprise platforms to mobile applications and RESTful integrations, always focused on delivering reliable, scalable software while providing clear technical guidance to users and stakeholders.',
      roles: ['Mendix Developer', 'Software Developer', 'AI Agent Developer', 'Full Stack Developer'],
      cta: { skills: 'My Skills', linkedin: 'LinkedIn', github: 'GitHub' },
    },
    skills: {
      heading: 'Skills',
      subheading: 'Technologies I work with',
      cards: [
        { title: 'AI & LLM Integration' },
        { title: 'Languages & Web' },
        { title: 'Frameworks' },
        { title: 'Databases & ORMs' },
        { title: 'Cloud & DevOps' },
        { title: 'Modern Infrastructure' },
      ],
    },
    experience: {
      heading: 'Experience',
      subheading: "Where I've worked",
      entries: [
        {
          bullets: [
            'Architect, develop, and maintain a clinical portal serving 30+ clinic staff, doctors, and 10+ attorney users, with 40+ feature updates and UI enhancements delivered in the last 3 months alone.',
            'Design and build staff-facing UIs using HTML, CSS/SASS, and JavaScript, translating complex clinical and legal workflows into intuitive interfaces for non-technical users.',
            'Manage and optimize a PostgreSQL database with 50+ entities, including adding indexes on consult queries to significantly improve calendar load performance in a HIPAA-sensitive environment.',
            'Integrate the Curogram SMS API for appointment communications, including a targeted fix to batch-send logic that prevents surveys from incorrectly triggering on past appointments.',
            'Serve as the primary technical liaison to Directors, gathering requirements, proposing multiple solutions, aligning on approach, and delivering implementations on clearly communicated timelines.',
          ],
        },
        {
          bullets: [
            'Developed and maintained a centralized billing portal across 8 locations, receiving SFTP-transmitted HL7 documents from radiology systems and translating them into structured Mendix data for clinical staff.',
            'Designed and maintained four company websites serving patients and referring physicians across 8 diagnostic imaging locations.',
            'Managed a PostgreSQL database with 20+ entities, maintaining data integrity, backup procedures, and query performance across a multi-location imaging operation.',
            'Integrated the EXA radiology information system via HL7 interface, enabling automated data transmission between external imaging systems and the internal Mendix portal.',
            'Detected a silent breaking change when EXA updated their HL7 format without notice. Identified missing data through proactive log monitoring, escalated immediately to the supervisor, and coordinated directly with EXA to adapt the integration and restore full data transmission.',
          ],
        },
        {
          bullets: [
            'Built and shipped multiple full-stack projects including an AI Flappy Bird (Neural Network + Genetic Algorithm built from scratch), a School Library Platform (Django/SQLite), and a Canvas drawing app, demonstrating rapid prototyping across diverse domains.',
            'Applied Reinforcement Learning and Neural Network concepts to train autonomous game agents using Genetic Algorithms, implementing the full learning pipeline from scratch.',
            'Developed and deployed full-stack web applications using Python, Django, HTML/CSS, JavaScript, and AWS, covering the full lifecycle from development to cloud production.',
          ],
        },
      ],
    },
    projects: {
      heading: 'Projects',
      subheading: "Things I've built",
      items: [
        {
          description: [
            'Real-time collaborative system architecture builder with AI assistance',
            'Interactive React Flow diagram editor with live cursors and presence avatars',
            'AI-powered design suggestions and auto-generated technical specs via Gemini',
          ],
        },
        {
          description: [
            'AI-powered language learning mobile app, a modern alternative to Duolingo',
            'Real-time audio calls with an AI teacher, live captioning and pronunciation feedback',
            'Supports 4 languages with 12 structured lessons and daily XP streak tracking',
          ],
        },
        {
          description: [
            'Rewrote basic HTML Flappy Bird into an AI-driven version',
            'Applied Reinforcement Learning and Neural Network concepts',
            'Implemented Genetic Algorithm for agent evolution',
          ],
        },
      ],
    },
    contact: {
      heading: "Let's Work Together",
      subheading: "Have a project in mind? I'd love to hear about it.",
      form: {
        namePlaceholder: 'Name',
        emailPlaceholder: 'Email',
        subjectPlaceholder: 'Subject',
        messagePlaceholder: 'Message',
        submit: 'Send Message',
        submitting: 'Sending…',
        successTitle: 'Message sent!',
        successBody: "Thanks for reaching out. I'll get back to you soon.",
        error: 'Something went wrong. Please try again or email me directly.',
      },
      orFindMe: 'Or find me on',
      footer: '© Tom Nguyen. All rights reserved.',
    },
  },
  vi: {
    nav: {
      home: 'Trang Chủ',
      skills: 'Kỹ Năng',
      experience: 'Kinh Nghiệm',
      projects: 'Dự Án',
      contact: 'Liên Hệ',
      resume: 'Hồ Sơ',
    },
    hero: {
      greeting: 'Xin chào. Tôi là Tom Nguyen.',
      bio: 'Lập trình viên phần mềm với hơn 4 năm kinh nghiệm xây dựng và duy trì các ứng dụng thực tế cho các nhà cung cấp dịch vụ y tế tại Houston. Giải quyết vấn đề thực tế trên toàn bộ stack — từ giao diện lâm sàng và nền tảng doanh nghiệp đến ứng dụng di động và tích hợp RESTful — luôn tập trung vào việc cung cấp phần mềm đáng tin cậy, có khả năng mở rộng và hướng dẫn kỹ thuật rõ ràng cho người dùng và các bên liên quan.',
      roles: ['Lập Trình Viên Mendix', 'Lập Trình Viên Phần Mềm', 'Lập Trình Viên AI Agent', 'Lập Trình Viên Full Stack'],
      cta: { skills: 'Kỹ Năng Của Tôi', linkedin: 'LinkedIn', github: 'GitHub' },
    },
    skills: {
      heading: 'Kỹ Năng',
      subheading: 'Các công nghệ tôi làm việc',
      cards: [
        { title: 'Tích Hợp AI & LLM' },
        { title: 'Ngôn Ngữ & Web' },
        { title: 'Frameworks' },
        { title: 'Cơ Sở Dữ Liệu & ORM' },
        { title: 'Cloud & DevOps' },
        { title: 'Hạ Tầng Hiện Đại' },
      ],
    },
    experience: {
      heading: 'Kinh Nghiệm',
      subheading: 'Nơi tôi đã làm việc',
      entries: [
        {
          bullets: [
            'Thiết kế, phát triển và duy trì cổng thông tin lâm sàng phục vụ hơn 30 nhân viên phòng khám, bác sĩ và hơn 10 người dùng luật sư, với hơn 40 cập nhật tính năng và cải tiến giao diện trong 3 tháng qua.',
            'Thiết kế và xây dựng giao diện người dùng cho nhân viên bằng HTML, CSS/SASS và JavaScript, chuyển đổi quy trình lâm sàng và pháp lý phức tạp thành giao diện trực quan cho người dùng không chuyên kỹ thuật.',
            'Quản lý và tối ưu hóa cơ sở dữ liệu PostgreSQL với hơn 50 thực thể, bao gồm thêm chỉ mục cho các trụy vấn tư vấn nhằm cải thiện đáng kể hiệu suất tải lịch trong môi trường tuân thủ HIPAA.',
            'Tích hợp API SMS Curogram cho thông báo cuộc hẹn, bao gồm sửa lỗi logic gửi hàng loạt ngăn khảo sát kích hoạt sai trên các cuộc hẹn trong quá khứ.',
            'Là đầu mối kỹ thuật chính với các Giám đốc, thu thập yêu cầu, đề xuất nhiều giải pháp, thống nhất hướng tiếp cận và triển khai đúng tiến độ đã thông báo.',
          ],
        },
        {
          bullets: [
            'Phát triển và duy trì cổng thanh toán tập trung cho 8 chi nhánh, nhận tài liệu HL7 qua SFTP từ hệ thống X-quang và chuyển đổi thành dữ liệu Mendix có cấu trúc cho nhân viên lâm sàng.',
            'Thiết kế và duy trì bốn website công ty phục vụ bệnh nhân và bác sĩ tuyến trong tại 8 địa điểm chẩn đoán hình ảnh.',
            'Quản lý cơ sở dữ liệu PostgreSQL với hơn 20 thực thể, duy trì tính toàn vẹn dữ liệu, quy trình sao lưu và hiệu suất trụy vấn trên hoạt động nhiều địa điểm.',
            'Tích hợp hệ thống thông tin X-quang EXA qua giao diện HL7, cho phép truyền dữ liệu tự động giữa hệ thống hình ảnh bên ngoài và cổng Mendix nội bộ.',
            'Phát hiện thay đổi gây lỗi im lặng khi EXA cập nhật định dạng HL7 mà không thông báo. Xác định dữ liệu bị thiếu qua giám sát log chủ động, báo cáo ngay cho cấp trên và phối hợp trực tiếp với EXA để khôi phục toàn bộ quá trình truyền dữ liệu.',
          ],
        },
        {
          bullets: [
            'Xây dựng và ra mắt nhiều dự án full-stack bao gồm AI Flappy Bird (Neural Network + Genetic Algorithm tự viết), Nền tảng Thư viện Trường học (Django/SQLite) và ứng dụng vẽ Canvas, thể hiện khả năng tạo mẫu nhanh trên nhiều lĩnh vực.',
            'Áp dụng Reinforcement Learning và Neural Network để huấn luyện tác nhân game tự động bằng Genetic Algorithm, tự triển khai toàn bộ pipeline học từ đầu.',
            'Phát triển và triển khai các ứng dụng web full-stack sử dụng Python, Django, HTML/CSS, JavaScript và AWS, bao quát toàn bộ vòng đời từ phát triển đến sản xuất trên cloud.',
          ],
        },
      ],
    },
    projects: {
      heading: 'Dự Án',
      subheading: 'Những gì tôi đã xây dựng',
      items: [
        {
          description: [
            'Công cụ xây dựng kiến trúc hệ thống cộng tác thời gian thực với hỗ trợ AI',
            'Trình chỉnh sửa sơ đồ React Flow tương tác với con trỏ trực tiếp và avatar hiện diện',
            'Đề xuất thiết kế do AI hỗ trợ và tự động tạo thông số kỹ thuật qua Gemini',
          ],
        },
        {
          description: [
            'Ứng dụng di động học ngôn ngữ bằng AI — giải pháp thay thế hiện đại cho Duolingo',
            'Cuộc gọi âm thanh thời gian thực với giáo viên AI, chú thích trực tiếp và phản hồi phát âm',
            'Hỗ trợ 4 ngôn ngữ với 12 bài học có cấu trúc và theo dõi chuỗi XP hàng ngày',
          ],
        },
        {
          description: [
            'Viết lại Flappy Bird HTML cơ bản thành phiên bản điều khiển bởi AI',
            'Áp dụng các khái niệm Reinforcement Learning và Neural Network',
            'Triển khai Genetic Algorithm cho quá trình tiến hóa tác nhân',
          ],
        },
      ],
    },
    contact: {
      heading: 'Hãy Cùng Hợp Tác',
      subheading: 'Bạn có dự án trong đầu? Tôi rất muốn nghe.',
      form: {
        namePlaceholder: 'Họ Tên',
        emailPlaceholder: 'Email',
        subjectPlaceholder: 'Tiêu Đề',
        messagePlaceholder: 'Tin Nhắn',
        submit: 'Gửi Tin Nhắn',
        submitting: 'Đang gửi…',
        successTitle: 'Tin nhắn đã được gửi!',
        successBody: 'Tôi sẽ phản hồi sớm.',
        error: 'Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ qua email.',
      },
      orFindMe: 'Hoặc tìm tôi trên',
      footer: '© Tom Nguyen. Bảo lưu mọi quyền.',
    },
  },
} as const;

export type Translations = typeof translations.en;
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/translations.ts
git commit -m "feat: add translations (EN/VI) to lib/translations.ts"
```

---

### Task 2: Create `components/language-provider.tsx`

**Files:**
- Create: `components/language-provider.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/language-provider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Translations } from "@/lib/translations";

type Locale = "en" | "vi";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "vi") setLocaleState("vi");
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/language-provider.tsx
git commit -m "feat: add LanguageProvider and useLanguage hook"
```

---

### Task 3: Create `components/language-toggle.tsx`

**Files:**
- Create: `components/language-toggle.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/language-toggle.tsx
"use client";

import { useLanguage } from "./language-provider";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  return (
    <button
      onClick={() => setLocale(locale === "en" ? "vi" : "en")}
      aria-label="Toggle language"
      className="px-2 py-1 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
    >
      {locale === "en" ? "VI" : "EN"}
    </button>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/language-toggle.tsx
git commit -m "feat: add LanguageToggle button component"
```

---

### Task 4: Wire `LanguageProvider` into `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add `LanguageProvider` wrap**

Replace the `<ThemeProvider ...>` block in `app/layout.tsx`:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import TimeBasedTheme from "@/components/time-based-theme";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tom Nguyen | Full Stack & AI Developer",
  description:
    "Full Stack Developer & AI Engineer specializing in scalable web applications, AI agent architecture, and LLM workflows. Experienced with Next.js, React Native, Django, Mendix, and Gemini SDK. CS graduate from Cal State LA.",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <TimeBasedTheme />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wrap app with LanguageProvider"
```

---

### Task 5: Update `components/nav.tsx`

**Files:**
- Modify: `components/nav.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
// components/nav.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import LanguageToggle from "./language-toggle";
import { useLanguage } from "./language-provider";
import { trackEvent } from "@/lib/analytics";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: "#top" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const resumeHref = locale === "vi" ? "/resume-vi.html" : "/resume.html";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "nav-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-bold text-lg tracking-tight hover:text-accent transition-colors"
        >
          Tom Nguyen
        </a>

        <div className="flex items-center gap-2">
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-base text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("resume_view")}
              className="ml-1 px-3 py-1.5 text-base font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg"
            >
              {t.nav.resume}
            </a>
          </div>

          <LanguageToggle />
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-surface transition-colors text-muted hover:text-foreground"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-foreground/5 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { setMenuOpen(false); trackEvent("resume_view"); }}
            className="mt-1 px-3 py-2.5 text-sm font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg text-center"
          >
            {t.nav.resume}
          </a>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Visual spot-check**

Run `npm run dev`, open `http://localhost:3000`. You should see a `VI` button in the nav between Resume and the theme toggle. Clicking it switches the button label to `EN` and the nav links switch to Vietnamese. Refreshing the page while in Vietnamese keeps it in Vietnamese.

- [ ] **Step 4: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: translate nav and add language toggle"
```

---

### Task 6: Update `components/hero.tsx`

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
// components/hero.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "./language-provider";

function useTypingEffect(roles: readonly string[]) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    setRoleIndex(0);
    setDisplayed("");
    setPhase("typing");
  }, [roles]);

  useEffect(() => {
    const current = roles[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          80
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pause"), 2000);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), 500);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      }
      setRoleIndex((i) => (i + 1) % roles.length);
      setPhase("typing");
    }
  }, [displayed, phase, roleIndex, roles]);

  return displayed;
}

export default function Hero() {
  const { t } = useLanguage();
  const typedText = useTypingEffect(t.hero.roles);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sky-700/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-sky-400/15 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Text content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-foreground">
              {t.hero.greeting.split("Tom Nguyen").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="text-accent font-extrabold">Tom Nguyen</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>

            <div className="text-xl sm:text-2xl text-muted mb-6 h-9 flex items-center justify-center md:justify-start gap-1">
              <span className="text-accent font-medium">{typedText}</span>
              <span className="w-0.5 h-6 bg-accent animate-pulse inline-block" />
            </div>

            <p className="text-foreground/80 text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8 md:border-l-2 md:border-accent/50 md:pl-4">
              {t.hero.bio}
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#skills"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors"
              >
                {t.hero.cta.skills}
              </a>
              <a
                href="https://www.linkedin.com/in/tomnguyen103/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("linkedin_click", { location: "hero" })}
                className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
              >
                <FaLinkedinIn className="w-4 h-4" /> {t.hero.cta.linkedin}
              </a>
              <a
                href="https://github.com/tomnguyen103"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("github_click", { location: "hero" })}
                className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
              >
                <FaGithub className="w-4 h-4" /> {t.hero.cta.github}
              </a>
            </div>
          </motion.div>

          {/* Profile photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-xl" />
              <Image
                src="/images/pic00.jpg"
                alt="Tom Nguyen"
                width={256}
                height={256}
                className="relative rounded-full object-cover w-full h-full ring-2 ring-sky-500/40"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#skills"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        aria-label="Scroll to skills"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: translate hero section"
```

---

### Task 7: Update `components/skills.tsx`

**Files:**
- Modify: `components/skills.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
// components/skills.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { skillCards, tagColor } from "@/lib/data";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const sectionRef = useInViewTracking("skills");
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-screen flex flex-col justify-center px-6 py-20 pb-24">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.skills.heading}
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.skills.subheading}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={item}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px -10px rgba(14,165,233,0.25)",
                }}
                className="bg-surface rounded-2xl p-6 border border-foreground/5 transition-shadow"
              >
                <Icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-bold text-lg mb-3 text-foreground">
                  {t.skills.cards[index].title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${tagColor[skill] ?? "bg-accent/10 text-accent border-accent/20"}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        aria-label="Scroll to experience"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/skills.tsx
git commit -m "feat: translate skills section"
```

---

### Task 8: Update `components/experience.tsx`

**Files:**
- Modify: `components/experience.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
// components/experience.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { experiences } from "@/lib/data";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

export default function Experience() {
  const sectionRef = useInViewTracking("experience");
  const { t } = useLanguage();

  const localizedExperiences = experiences.map((exp, i) => ({
    ...exp,
    bullets: t.experience.entries[i].bullets,
  }));

  return (
    <section ref={sectionRef} id="experience" className="relative min-h-screen flex flex-col justify-center px-6 py-20 pb-24">
      <div className="max-w-3xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.experience.heading}
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.experience.subheading}
        </motion.p>

        <div className="relative ml-1.5">
          <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-sky-500/30" />

          {localizedExperiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.start}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 mb-10 last:mb-0"
            >
              <span className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full bg-sky-500 ring-2 ring-sky-500/20" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                <span className="font-semibold text-foreground">
                  {exp.company}{" "}
                  <span className="font-normal text-muted text-sm">· {exp.type}</span>
                </span>
                <span className="shrink-0 self-start px-2.5 py-0.5 rounded-full text-xs bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  {exp.start} – {exp.end}
                </span>
              </div>

              <p className="font-medium text-foreground mb-0.5">{exp.title}</p>
              <p className="text-sm text-muted mb-3">{exp.location}</p>

              <ul className="space-y-1.5">
                {exp.bullets.map((bullet, bi) => (
                  <li key={bi} className="text-base text-muted flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        aria-label="Scroll to projects"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
```

Note: The `key` on bullet `<li>` changed from `key={bullet}` to `key={bi}` (index) because Vietnamese bullets are long strings that could theoretically duplicate; index is the stable identity here.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/experience.tsx
git commit -m "feat: translate experience section"
```

---

### Task 9: Update `components/projects.tsx`

**Files:**
- Modify: `components/projects.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
// components/projects.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, ArrowDown } from "lucide-react";
import { projects, tagColor } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

export default function Projects() {
  const sectionRef = useInViewTracking("projects");
  const { t } = useLanguage();

  const localizedProjects = projects.map((project, i) => ({
    ...project,
    description: t.projects.items[i].description,
  }));

  return (
    <section ref={sectionRef} id="projects" className="relative min-h-screen flex flex-col justify-center px-6 py-20 pb-24 bg-surface/30">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.projects.heading}
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.projects.subheading}
        </motion.p>

        <div className="flex flex-col gap-6">
          {localizedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ boxShadow: "0 20px 40px -10px rgba(14,165,233,0.2)" }}
              className="bg-surface rounded-2xl overflow-hidden border border-foreground/5 flex flex-col md:flex-row"
            >
              <div className={`relative w-full md:w-3/5 aspect-video md:aspect-auto md:min-h-65 shrink-0${project.imageFit === "contain" ? " bg-[#0d1117]" : ""}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={project.imageFit === "contain" ? "object-contain p-4" : "object-cover"}
                />
              </div>

              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-foreground">
                    {project.title}
                  </h3>

                  <ul className="space-y-1.5 mb-4">
                    {project.description.map((desc, di) => (
                      <li key={di} className="text-base text-muted flex gap-2">
                        <span className="text-accent mt-0.5 shrink-0">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-0.5 rounded-full text-sm font-medium border ${tagColor[tech] ?? "bg-accent/10 text-accent border-accent/20"}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("github_click", { project_title: project.title })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-accent hover:text-white rounded-lg text-sm transition-colors border border-foreground/10 text-foreground"
                  >
                    <FaGithub className="w-4 h-4" /> GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("project_demo_click", { project_title: project.title })}
                      className="flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-accent hover:text-white rounded-lg text-sm transition-colors border border-foreground/10 text-foreground"
                    >
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#contact"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        aria-label="Scroll to contact"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
```

Note: The `key` on description `<li>` changed from `key={desc}` to `key={di}` (index) and tech loop variable renamed from `t` to `tech` to avoid shadowing the `t` from `useLanguage`.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/projects.tsx
git commit -m "feat: translate projects section"
```

---

### Task 10: Update `components/contact.tsx`

**Files:**
- Modify: `components/contact.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
// components/contact.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

const inputClass =
  "w-full px-4 py-3 bg-surface border border-foreground/10 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 placeholder:text-muted transition";

export default function Contact() {
  const sectionRef = useInViewTracking("contact");
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const form = e.currentTarget;
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(Array.from(new FormData(form).entries()) as [string, string][]).toString(),
      });
      if (res.ok) {
        setSubmitted(true);
        trackEvent("contact_form_submit");
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen flex flex-col justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
            {t.contact.heading}
          </h2>
          <p className="text-muted">{t.contact.subheading}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {submitted ? (
            <div className="text-center py-16 bg-surface rounded-2xl border border-foreground/5">
              <p className="text-xl font-semibold text-accent mb-2">
                {t.contact.form.successTitle}
              </p>
              <p className="text-muted">{t.contact.form.successBody}</p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <input name="bot-field" />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t.contact.form.namePlaceholder}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  required
                  className={inputClass}
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder={t.contact.form.subjectPlaceholder}
                required
                className={inputClass}
              />
              <textarea
                name="message"
                placeholder={t.contact.form.messagePlaceholder}
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {loading ? t.contact.form.submitting : t.contact.form.submit}
              </button>
              {error && (
                <p className="text-sm text-red-500 text-center">
                  {t.contact.form.error}
                </p>
              )}
            </form>
          )}

          <div className="mt-8 text-center">
            <a
              href="mailto:tom.nguyen.nht@gmail.com"
              onClick={() => trackEvent("email_click")}
              className="inline-block text-sm text-accent hover:underline mb-4"
            >
              tom.nguyen.nht@gmail.com
            </a>
            <p className="text-sm text-muted mb-4">{t.contact.orFindMe}</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/tomnguyen103"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={() => trackEvent("github_click", { location: "contact" })}
                className="p-3 bg-surface hover:bg-accent hover:text-white rounded-xl transition-colors border border-foreground/10 text-foreground"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tomnguyen103/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={() => trackEvent("linkedin_click", { location: "contact" })}
                className="p-3 bg-surface hover:bg-accent hover:text-white rounded-xl transition-colors border border-foreground/10 text-foreground"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 text-center text-sm text-muted border-t border-foreground/5 pt-8">
        {t.contact.footer}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and build**

```bash
npx tsc --noEmit && npm run build
```

Expected: no type errors, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/contact.tsx
git commit -m "feat: translate contact section"
```

---

### Task 11: Create `public/resume-vi.html`

**Files:**
- Create: `public/resume-vi.html`

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tom Nguyen — Hồ Sơ</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 10.5pt;
      color: #1a1a1a;
      background: #fff;
      padding: 0.65in 0.75in;
      max-width: 8.5in;
      margin: 0 auto;
      line-height: 1.4;
    }

    .header { text-align: center; margin-bottom: 10px; }
    .header h1 { font-size: 22pt; font-weight: 700; letter-spacing: 0.02em; }
    .contact { margin-top: 4px; font-size: 9.5pt; color: #333; }
    .contact a { color: #1a1a1a; text-decoration: none; }
    .contact span { margin: 0 4px; color: #888; }

    .section { margin-top: 12px; }
    .section-title {
      font-size: 11.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-bottom: 1.5px solid #1a1a1a;
      padding-bottom: 2px;
      margin-bottom: 6px;
    }

    .summary p { font-size: 10pt; line-height: 1.5; }

    .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 16px; }
    .skill-row { font-size: 10pt; line-height: 1.6; }
    .skill-row strong { display: inline-block; min-width: 130px; }

    .entry { margin-bottom: 10px; }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 4px;
    }
    .entry-left { flex: 1; }
    .entry-title { font-weight: 700; font-size: 10.5pt; }
    .entry-company { font-size: 10pt; color: #333; }
    .entry-date { font-size: 9.5pt; color: #444; white-space: nowrap; }
    .entry-location { font-size: 9.5pt; color: #555; font-style: italic; }

    ul { padding-left: 18px; margin-top: 3px; }
    li { font-size: 10pt; line-height: 1.55; margin-bottom: 1px; }

    .tech-line { margin-top: 4px; font-size: 9.5pt; color: #333; }
    .tech-line strong { font-weight: 600; }

    .edu-entry { margin-bottom: 6px; }
    .edu-header { display: flex; justify-content: space-between; align-items: baseline; }
    .edu-school { font-weight: 700; font-size: 10.5pt; }
    .edu-date { font-size: 9.5pt; color: #444; }
    .edu-detail { font-size: 10pt; color: #333; margin-top: 1px; }

    @page { size: letter; margin: 0.55in 0.7in; }
    @media print { body { padding: 0; } a { color: #1a1a1a !important; text-decoration: none !important; } }
  </style>
</head>
<body>

  <div class="header">
    <h1>Tom Nguyen</h1>
    <div class="contact">
      <a href="mailto:tom.nguyen.nht@gmail.com">tom.nguyen.nht@gmail.com</a>
      <span>|</span>
      832-359-6679
      <span>|</span>
      <a href="https://github.com/tomnguyen103">GitHub</a>
      <span>|</span>
      <a href="https://linkedin.com/in/tomnguyen103">LinkedIn</a>
      <span>|</span>
      <a href="https://www.tomnguyen.me">tomnguyen.me</a>
    </div>
  </div>

  <div class="section summary">
    <div class="section-title">Tóm Tắt</div>
    <p>
      Lập trình viên Full Stack &amp; Kỹ sư AI với hơn 1.000 giờ kinh nghiệm thực hành trải dài
      từ hệ thống doanh nghiệp truyền thống đến quy trình LLM hiện đại. Chuyên thiết kế kiến trúc
      ứng dụng web có khả năng mở rộng, giải pháp tự động hóa lâm sàng và kinh doanh, cùng các
      pipeline AI agent. Có kinh nghiệm triển khai phần mềm thực tế trong môi trường y tế tuân thủ
      HIPAA, là đầu mối kỹ thuật chính với các Giám đốc và các bên liên quan đa chức năng. Tốt
      nghiệp Khoa học Máy tính tại Cal State LA.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Kỹ Năng Kỹ Thuật</div>
    <div class="skills-grid">
      <div class="skill-row"><strong>AI &amp; LLM:</strong> AI Agent Architecture, Prompt Engineering, Gemini SDK, LLM Workflows</div>
      <div class="skill-row"><strong>Cloud &amp; DevOps:</strong> AWS EC2, Vercel, Netlify, Trigger.dev, Git / GitHub</div>
      <div class="skill-row"><strong>Ngôn ngữ:</strong> JavaScript, TypeScript, Python, Java, HTML5, CSS3 / SASS</div>
      <div class="skill-row"><strong>Hạ tầng:</strong> Clerk, Liveblocks, Stream Video SDK, Zustand, RESTful API Design</div>
      <div class="skill-row"><strong>Frameworks:</strong> Next.js, React Native, MEAN Stack, Django, Flask, Spring Framework, Mendix, Expo</div>
      <div class="skill-row"><strong>Cơ sở dữ liệu &amp; ORM:</strong> PostgreSQL, MySQL, MongoDB, SQLite, Prisma Postgres</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Kinh Nghiệm</div>

    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">Lập Trình Viên Phần Mềm &mdash; <span style="font-weight:400">Texas Regional Physicians</span></div>
          <div class="entry-location">Houston, Texas &middot; Remote</div>
        </div>
        <div class="entry-date">Apr 2024 &ndash; Hiện tại</div>
      </div>
      <ul>
        <li>Thiết kế, phát triển và duy trì cổng thông tin lâm sàng phục vụ hơn 30 nhân viên phòng khám, bác sĩ và hơn 10 người dùng luật sư, với hơn 40 cập nhật tính năng và cải tiến giao diện trong 3 tháng qua.</li>
        <li>Thiết kế và xây dựng giao diện người dùng cho nhân viên bằng HTML, CSS/SASS và JavaScript, chuyển đổi quy trình lâm sàng và pháp lý phức tạp thành giao diện trực quan cho người dùng không chuyên kỹ thuật.</li>
        <li>Quản lý và tối ưu hóa cơ sở dữ liệu PostgreSQL với hơn 50 thực thể, bao gồm thêm chỉ mục cho các truy vấn tư vấn nhằm cải thiện đáng kể hiệu suất tải lịch trong môi trường tuân thủ HIPAA.</li>
        <li>Tích hợp API SMS Curogram cho thông báo cuộc hẹn, bao gồm sửa lỗi logic gửi hàng loạt ngăn khảo sát kích hoạt sai trên các cuộc hẹn trong quá khứ.</li>
        <li>Là đầu mối kỹ thuật chính với các Giám đốc, thu thập yêu cầu, đề xuất nhiều giải pháp, thống nhất hướng tiếp cận và triển khai đúng tiến độ đã thông báo.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">Lập Trình Viên Phần Mềm &mdash; <span style="font-weight:400">Memorial MRI and Diagnostic</span></div>
          <div class="entry-location">Houston, Texas</div>
        </div>
        <div class="entry-date">Nov 2021 &ndash; Apr 2024</div>
      </div>
      <ul>
        <li>Phát triển và duy trì cổng thanh toán tập trung cho 8 chi nhánh, nhận tài liệu HL7 qua SFTP từ hệ thống X-quang và chuyển đổi thành dữ liệu Mendix có cấu trúc cho nhân viên lâm sàng.</li>
        <li>Thiết kế và duy trì bốn website công ty phục vụ bệnh nhân và bác sĩ tuyến trong tại 8 địa điểm chẩn đoán hình ảnh.</li>
        <li>Quản lý cơ sở dữ liệu PostgreSQL với hơn 20 thực thể, duy trì tính toàn vẹn dữ liệu, quy trình sao lưu và hiệu suất truy vấn trên hoạt động nhiều địa điểm.</li>
        <li>Tích hợp hệ thống thông tin X-quang EXA qua giao diện HL7, cho phép truyền dữ liệu tự động giữa hệ thống hình ảnh bên ngoài và cổng Mendix nội bộ.</li>
        <li>Phát hiện thay đổi gây lỗi im lặng khi EXA cập nhật định dạng HL7 mà không thông báo — xác định dữ liệu bị thiếu qua giám sát log chủ động, báo cáo ngay cho cấp trên và phối hợp trực tiếp với EXA để khôi phục toàn bộ quá trình truyền dữ liệu.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">Lập Trình Viên Full Stack Thường Trú &mdash; <span style="font-weight:400">Coding Dojo</span></div>
          <div class="entry-location">Greater Los Angeles Area</div>
        </div>
        <div class="entry-date">Sep 2019 &ndash; Nov 2021</div>
      </div>
      <ul>
        <li>Xây dựng và ra mắt nhiều dự án full-stack bao gồm AI Flappy Bird (Neural Network + Genetic Algorithm tự viết), Nền tảng Thư viện Trường học (Django/SQLite) và ứng dụng vẽ Canvas, thể hiện khả năng tạo mẫu nhanh trên nhiều lĩnh vực.</li>
        <li>Áp dụng Reinforcement Learning và Neural Network để huấn luyện tác nhân game tự động bằng Genetic Algorithm, tự triển khai toàn bộ pipeline học từ đầu.</li>
        <li>Phát triển và triển khai các ứng dụng web full-stack sử dụng Python, Django, HTML/CSS, JavaScript và AWS EC2, bao quát toàn bộ vòng đời từ phát triển đến sản xuất trên cloud.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Dự Án</div>

    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">Development Plan Tool</div>
        </div>
        <div class="entry-date">
          <a href="https://github.com/tomnguyen103/Development-Plan-Tool">GitHub</a>
          <span style="margin:0 4px;color:#888;">|</span>
          <a href="https://development-tool.tomnguyen.me/">Live Demo</a>
        </div>
      </div>
      <ul>
        <li>Công cụ xây dựng kiến trúc hệ thống cộng tác thời gian thực với hỗ trợ AI và trình chỉnh sửa sơ đồ React Flow tương tác với con trỏ trực tiếp và avatar hiện diện.</li>
        <li>Đề xuất thiết kế do AI hỗ trợ và tự động tạo thông số kỹ thuật qua Gemini.</li>
      </ul>
      <div class="tech-line"><strong>Công nghệ:</strong> Next.js, TypeScript, Prisma Postgres, Liveblocks, Trigger.dev, Gemini SDK, Clerk, Vercel</div>
    </div>

    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">AI Language Learning App</div>
        </div>
        <div class="entry-date">
          <a href="https://github.com/tomnguyen103/MyFirstMobileApp">GitHub</a>
        </div>
      </div>
      <ul>
        <li>Ứng dụng di động học ngôn ngữ bằng AI — giải pháp thay thế hiện đại cho Duolingo với cuộc gọi âm thanh thời gian thực cùng giáo viên AI.</li>
        <li>Hỗ trợ 4 ngôn ngữ với 12 bài học có cấu trúc, chú thích trực tiếp, phản hồi phát âm và theo dõi chuỗi XP hàng ngày.</li>
      </ul>
      <div class="tech-line"><strong>Công nghệ:</strong> React Native, Expo, TypeScript, Stream Video SDK, Clerk, NativeWind, Zustand</div>
    </div>

    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">AI Flappy Bird</div>
        </div>
        <div class="entry-date">
          <a href="https://github.com/tomnguyen103/AI_Flappy_Bird">GitHub</a>
          <span style="margin:0 4px;color:#888;">|</span>
          <a href="https://youtu.be/uf1wSdsGWUs">Demo Video</a>
        </div>
      </div>
      <ul>
        <li>Viết lại Flappy Bird HTML cơ bản thành phiên bản điều khiển bởi AI, áp dụng Reinforcement Learning và Neural Network tự xây dựng từ đầu.</li>
        <li>Triển khai Genetic Algorithm cho quá trình tiến hóa tác nhân với hàm tái tạo quần thể đột biến các cá thể tốt nhất mỗi thế hệ.</li>
      </ul>
      <div class="tech-line"><strong>Công nghệ:</strong> JavaScript, HTML Canvas, Neural Network, Genetic Algorithm, Reinforcement Learning</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Học Vấn</div>

    <div class="edu-entry">
      <div class="edu-header">
        <div class="edu-school">California State University, Los Angeles</div>
        <div class="edu-date">May 2019</div>
      </div>
      <div class="edu-detail">Cử nhân Khoa học Máy tính</div>
    </div>

    <div class="edu-entry">
      <div class="edu-header">
        <div class="edu-school">Coding Dojo &mdash; Full-Stack Developer Bootcamp</div>
        <div class="edu-date">Sep 2019 &ndash; Dec 2019</div>
      </div>
      <div class="edu-detail">Chứng chỉ Full-Stack về Django, MEAN Stack và Java Spring Framework &middot; 800+ giờ đào tạo chuyên sâu</div>
    </div>
  </div>

  <script>
    document.querySelectorAll('a').forEach(function(a) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify the file loads**

Run `npm run dev` and navigate to `http://localhost:3000/resume-vi.html`. Confirm the page renders with Vietnamese headings and bullet points, and that clicking any link opens a new tab.

- [ ] **Step 3: Commit**

```bash
git add public/resume-vi.html
git commit -m "feat: add Vietnamese resume (resume-vi.html)"
```

---

### Task 12: Update `CLAUDE.md` standing rule

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Extend the standing rule section**

Find the "Standing Rules" section in `CLAUDE.md`. Replace the existing "Keep `resume.html` in sync" rule with:

```markdown
### Keep `resume.html` and `resume-vi.html` in sync
Whenever any of the following are modified, **always update `public/resume.html`**, **`public/resume-vi.html`**, and the relevant strings in **`lib/translations.ts`** (`vi` key) at the end of the task:
- `lib/data.ts` — experiences, projects, or skillCards
- `components/hero.tsx` — bio text or subtitle roles
- `components/contact.tsx` — email address or social links
- Any other content that appears on the resume (phone number, summary, etc.)

This ensures both resume pages and the live site always reflect the latest portfolio content without needing a manual reminder.
```

- [ ] **Step 2: Final build**

```bash
npm run build
```

Expected: build succeeds with no errors or warnings.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update standing rule to cover resume-vi.html and translations.ts"
```

---

### Final verification checklist

- [ ] Toggle `VI` in nav — entire site switches to Vietnamese
- [ ] Toggle back to `EN` — entire site switches to English
- [ ] Refresh on Vietnamese — stays Vietnamese (localStorage persisted)
- [ ] Open a fresh private/incognito window — defaults to English
- [ ] Click Resume in English — opens `resume.html`
- [ ] Click Hồ Sơ in Vietnamese — opens `resume-vi.html`
- [ ] All links in both resume pages open in a new tab
- [ ] `npm run build` passes clean
