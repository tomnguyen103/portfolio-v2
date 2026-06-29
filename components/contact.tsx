"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

const fieldClass =
  "w-full rounded-xl border border-[color:var(--hairline-strong)] bg-[color:var(--surface-2)] px-4 py-3 text-sm text-foreground transition placeholder:text-muted/60 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30";

const labelClass =
  "mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted";

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
    <section ref={sectionRef} id="contact" className="px-6 py-28 md:py-40">
      <div className="mx-auto w-full max-w-2xl">
        <motion.div
          className="text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            {t.contact.heading}
          </h2>
          {/* The ledger line, centered, beneath the closing headline */}
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-16 bg-accent"
          />
          <p className="mx-auto mt-6 max-w-md text-lg text-muted">
            {t.contact.subheading}
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {submitted ? (
            <div className="rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--surface)] py-16 text-center">
              <p className="mb-2 font-display text-2xl font-semibold text-accent">
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
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Do not fill this out: <input name="bot-field" />
                </label>
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    {t.contact.form.namePlaceholder}
                  </label>
                  <input id="contact-name" type="text" name="name" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    {t.contact.form.emailPlaceholder}
                  </label>
                  <input id="contact-email" type="email" name="email" required className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className={labelClass}>
                  {t.contact.form.subjectPlaceholder}
                </label>
                <input id="contact-subject" type="text" name="subject" required className={fieldClass} />
              </div>
              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  {t.contact.form.messagePlaceholder}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className={`${fieldClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full justify-center py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} />
                {loading ? t.contact.form.submitting : t.contact.form.submit}
              </button>
              {error && (
                <p className="text-center text-sm text-red-500" role="alert">
                  {t.contact.form.error}
                </p>
              )}
            </form>
          )}

          <div className="mt-10 text-center">
            <a
              href="mailto:tom.nguyen.nht@gmail.com"
              onClick={() => trackEvent("email_click")}
              className="link-underline text-accent"
            >
              tom.nguyen.nht@gmail.com
            </a>
            <p className="mb-4 mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {t.contact.orFindMe}
            </p>
            <div className="flex justify-center gap-3">
              <a
                href="https://github.com/tomnguyen103"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={() => trackEvent("github_click", { location: "contact" })}
                className="rounded-full border border-[color:var(--hairline-strong)] p-3 text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tomnguyen103/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={() => trackEvent("linkedin_click", { location: "contact" })}
                className="rounded-full border border-[color:var(--hairline-strong)] p-3 text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl border-t border-[color:var(--hairline)] pt-8 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted">
        {t.contact.footer}
      </div>
    </section>
  );
}
