"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { contactSchema, interests, type ContactErrors } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-2xl border border-bone/15 bg-bone/5 px-4 py-3 text-sm text-bone placeholder:text-bone/35 outline-none transition-colors focus:border-mist/70";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  function toggleInterest(value: string) {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      brand: String(formData.get("brand") || ""),
      email: String(formData.get("email") || ""),
      handle: String(formData.get("handle") || ""),
      interests: selectedInterests,
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        brand: fieldErrors.brand?.[0],
        email: fieldErrors.email?.[0],
        interests: fieldErrors.interests?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="glass flex min-h-[420px] flex-col items-center justify-center rounded-panel p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(159,180,217,0.15)" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <motion.path
              d="M6 14.5L11.5 20L22 8"
              stroke="var(--mist)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            />
          </svg>
        </motion.div>
        <h3 className="font-display text-3xl text-bone">Inquiry sent.</h3>
        <p className="mt-3 max-w-xs text-sm text-bone/60">
          Thank you. We&apos;ll be in touch soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass flex flex-col gap-5 rounded-panel p-8">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" type="text" className={inputClasses} />
        </Field>
        <Field label="Brand or business" htmlFor="brand" error={errors.brand}>
          <input id="brand" name="brand" type="text" className={inputClasses} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" className={inputClasses} />
        </Field>
        <Field label="Instagram or TikTok handle" htmlFor="handle" optional>
          <input id="handle" name="handle" type="text" placeholder="@yourbrand" className={inputClasses} />
        </Field>
      </div>

      <div>
        <span className="mb-2.5 block text-xs font-medium uppercase tracking-wide text-bone/50">
          What are you interested in?
        </span>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => {
            const selected = selectedInterests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleInterest(interest)}
                className="flex min-h-11 items-center rounded-full border px-4 text-xs font-medium transition-colors"
                style={{
                  borderColor: selected ? "var(--mist)" : "rgba(239,236,230,0.2)",
                  background: selected ? "rgba(159,180,217,0.15)" : "transparent",
                  color: selected ? "var(--bone)" : "rgba(239,236,230,0.7)",
                }}
              >
                {interest}
              </button>
            );
          })}
        </div>
        {errors.interests && (
          <p className="mt-2 text-xs text-champagne">{errors.interests}</p>
        )}
      </div>

      <Field label="Message" htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      </Field>

      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-champagne"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-bone py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
        style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
            Sending
          </>
        ) : (
          "Send inquiry"
        )}
      </button>

      <p className="text-center text-xs text-bone/40">
        By submitting, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-bone/70">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-wide text-bone/50"
      >
        {label}
        {optional && <span className="normal-case text-bone/30"> (optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-champagne">{error}</p>}
    </div>
  );
}
