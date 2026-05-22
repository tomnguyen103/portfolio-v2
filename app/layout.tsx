import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import TimeBasedTheme from "@/components/time-based-theme";
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
          <TimeBasedTheme />
          {children}
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
