"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

export default function Contact() {
  const sectionRef = useInViewTracking("contact");
  const { t } = useLanguage();
  const reduce = useReducedMotion();
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
    <section
      ref={sectionRef}
      id="contact"
      className="mx-auto max-w-[78rem] px-6 py-24 md:py-32"
    >
      <motion.div
        className="grid gap-x-10 gap-y-12 lg:grid-cols-12"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="lg:col-span-3">
          <div className="font-display text-6xl font-bold leading-none text-faint">05</div>
          <div className="label mt-3">{t.nav.contact}</div>
        </div>

        <div className="lg:col-span-9">
          <h2 className="max-w-[14ch] font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground md:text-7xl">
            {t.contact.heading}
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">{t.contact.subheading}</p>

          <div className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="border-t border-[color:var(--hairline-strong)] pt-6">
                  <p className="font-display text-2xl font-semibold text-accent">
                    {t.contact.form.successTitle}
                  </p>
                  <p className="mt-2 text-muted">{t.contact.form.successBody}</p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Do not fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <div>
                    <label htmlFor="contact-name" className="label mb-2 block">
                      {t.contact.form.namePlaceholder}
                    </label>
                    <input id="contact-name" type="text" name="name" required className="field" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="label mb-2 block">
                      {t.contact.form.emailPlaceholder}
                    </label>
                    <input id="contact-email" type="email" name="email" required className="field" />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="label mb-2 block">
                      {t.contact.form.subjectPlaceholder}
                    </label>
                    <input id="contact-subject" type="text" name="subject" required className="field" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="label mb-2 block">
                      {t.contact.form.messagePlaceholder}
                    </label>
                    <textarea id="contact-message" name="message" required rows={3} className="field resize-none" />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary px-7 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? t.contact.form.submitting : t.contact.form.submit}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  {error && (
                    <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {t.contact.form.error}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Direct */}
            <div className="md:border-l md:border-[color:var(--hairline)] md:pl-12">
              <div className="label mb-3">Email</div>
              <a
                href="mailto:tom.nguyen.nht@gmail.com"
                onClick={() => trackEvent("email_click")}
                className="link-underline font-display text-xl font-semibold text-foreground hover:text-accent md:text-2xl"
              >
                tom.nguyen.nht@gmail.com
              </a>

              <div className="label mb-3 mt-10">{t.contact.orFindMe}</div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com/tomnguyen103"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("github_click", { location: "contact" })}
                  className="link-underline inline-flex w-fit items-center gap-2.5 text-foreground hover:text-accent"
                >
                  <FaGithub className="h-5 w-5" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/tomnguyen103/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("linkedin_click", { location: "contact" })}
                  className="link-underline inline-flex w-fit items-center gap-2.5 text-foreground hover:text-accent"
                >
                  <FaLinkedinIn className="h-5 w-5" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Colophon */}
      <footer className="mt-24 flex flex-col gap-2 border-t border-[color:var(--hairline)] pt-8 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint sm:flex-row sm:items-center sm:justify-between">
        <span>{t.contact.footer}</span>
        <span>Set in Archivo &amp; Geist</span>
      </footer>
    </section>
  );
}
