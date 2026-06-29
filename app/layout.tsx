import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "next-themes";
import TimeBasedTheme from "@/components/time-based-theme";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Display face: a confident editorial grotesque for the masthead and headings
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
});

const siteTitle = "Tom Nguyen | Full Stack & AI Developer";
const siteDescription =
  "Full Stack Developer & AI Engineer specializing in scalable web applications, AI agent architecture, and LLM workflows. Experienced with Next.js, React Native, Django, Mendix, and Gemini SDK. CS graduate from Cal State LA.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tomnguyen.me"),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Tom Nguyen",
    "Full Stack Developer",
    "AI Engineer",
    "AI Agents",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Tom Nguyen", url: "https://www.tomnguyen.me" }],
  creator: "Tom Nguyen",
  openGraph: {
    type: "website",
    url: "https://www.tomnguyen.me",
    siteName: "Tom Nguyen",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [{ url: "/images/pic00.jpg", alt: "Tom Nguyen" }],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/pic00.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <TimeBasedTheme />
            <div className="grain" aria-hidden="true" />
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
