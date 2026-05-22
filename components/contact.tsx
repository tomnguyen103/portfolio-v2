"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Send } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 bg-surface border border-foreground/10 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 placeholder:text-muted transition";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const form = e.currentTarget;
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(Array.from(new FormData(form).entries()) as [string, string][]).toString(),
      });
      if (res.ok) {
        setSubmitted(true);
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
    <section id="contact" className="min-h-screen flex flex-col justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
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
                Message sent!
              </p>
              <p className="text-muted">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className={inputClass}
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className={inputClass}
              />
              <textarea
                name="message"
                placeholder="Message"
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
                {loading ? "Sending…" : "Send Message"}
              </button>
              {error && (
                <p className="text-sm text-red-500 text-center">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          )}

          <div className="mt-8 text-center">
            <a
              href="mailto:tom.nguyen.nht@gmail.com"
              className="inline-block text-sm text-accent hover:underline mb-4"
            >
              tom.nguyen.nht@gmail.com
            </a>
            <p className="text-sm text-muted mb-4">Or find me on</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/tomnguyen103"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 bg-surface hover:bg-accent hover:text-white rounded-xl transition-colors border border-foreground/10 text-foreground"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tomnguyen103/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 bg-surface hover:bg-accent hover:text-white rounded-xl transition-colors border border-foreground/10 text-foreground"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 text-center text-sm text-muted border-t border-foreground/5 pt-8">
        © Tom Nguyen. All rights reserved.
      </div>
    </section>
  );
}
