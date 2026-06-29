"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { db } from "@/lib/db";


/* ------------------------------------------------------------------ */
/*  Animated wrapper                                                   */
/* ------------------------------------------------------------------ */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact info data                                                  */
/* ------------------------------------------------------------------ */
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Mohamed El-Telemy",
    href: siteConfig.social.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "mohamedeltelemy",
    href: siteConfig.social.github,
  },
];

/* ------------------------------------------------------------------ */
/*  Form types                                                         */
/* ------------------------------------------------------------------ */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/* ------------------------------------------------------------------ */
/*  Toast component                                                    */
/* ------------------------------------------------------------------ */
function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-[#00D9FF]/10 backdrop-blur-xl border border-[#00D9FF]/30 rounded-xl px-6 py-4 shadow-[0_0_30px_rgba(0,217,255,0.2)]"
    >
      <CheckCircle2 className="h-5 w-5 text-[#00D9FF] shrink-0" />
      <span className="text-white font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(false);

  /* ---- validation ---- */
  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) {
      e.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      e.email = "Invalid email format";
    }
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  }

  /* ---- submit ---- */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    // Save to local database
    db.saveContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
    // Simulate brief sending delay
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  }


  /* ---- field change ---- */
  function onChange(
    field: keyof FormData,
    value: string,
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  /* ---- render ---- */
  return (
    <main className="min-h-screen bg-[#0F172A] pt-24 pb-32">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="pointer-events-none absolute -top-32 left-1/3 h-[400px] w-[400px] rounded-full bg-[#00D9FF]/10 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-[350px] w-[350px] rounded-full bg-[#0066FF]/10 blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 text-[#00D9FF] font-semibold tracking-wider uppercase text-sm"
          >
            Let&rsquo;s Connect
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-white to-[#00D9FF] bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-slate-400 text-lg max-w-xl mx-auto"
          >
            Have a project in mind, a question about BIM automation, or just
            want to say hello? I&rsquo;d love to hear from you.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] origin-left"
          />
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-5">
          {/* ---------- LEFT: Contact Info ---------- */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((info, i) => (
              <AnimatedSection key={info.label} delay={i * 0.1}>
                <ContactInfoCard {...info} />
              </AnimatedSection>
            ))}
          </div>

          {/* ---------- RIGHT: Form ---------- */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_0_30px_rgba(0,217,255,0.06)]"
            >
              <h2 className="font-playfair text-2xl font-bold text-white mb-8">
                Send a <span className="text-[#00D9FF]">Message</span>
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <InputField
                  label="Name"
                  value={formData.name}
                  error={errors.name}
                  onChange={(v) => onChange("name", v)}
                  placeholder="Your name"
                />

                {/* Email */}
                <InputField
                  label="Email"
                  type="email"
                  value={formData.email}
                  error={errors.email}
                  onChange={(v) => onChange("email", v)}
                  placeholder="you@example.com"
                />
              </div>

              {/* Subject */}
              <div className="mt-6">
                <InputField
                  label="Subject"
                  value={formData.subject}
                  error={errors.subject}
                  onChange={(v) => onChange("subject", v)}
                  placeholder="What is this about?"
                />
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => onChange("message", e.target.value)}
                  placeholder="Tell me about your project or idea…"
                  className={`w-full rounded-xl bg-white/5 border ${
                    errors.message
                      ? "border-red-500"
                      : "border-white/10 focus:border-[#00D9FF]/50"
                  } px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-colors duration-200 resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-[#0F172A] font-bold text-sm hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ TOAST ============ */}
      <AnimatePresence>
        {toast && (
          <Toast
            message="Message sent successfully! I'll get back to you soon."
            onClose={() => setToast(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact info card                                                  */
/* ------------------------------------------------------------------ */
function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string | null;
}) {
  const inner = (
    <div className="group flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-[#00D9FF]/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.1)] transition-all duration-300">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00D9FF]/10 group-hover:bg-[#00D9FF]/20 transition-colors">
        <Icon className="h-5 w-5 text-[#00D9FF]" />
      </span>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-0.5">
          {label}
        </p>
        <p className="text-white font-medium truncate">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }

  return inner;
}

/* ------------------------------------------------------------------ */
/*  Reusable input field                                               */
/* ------------------------------------------------------------------ */
function InputField({
  label,
  type = "text",
  value,
  error,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl bg-white/5 border ${
          error
            ? "border-red-500"
            : "border-white/10 focus:border-[#00D9FF]/50"
        } px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-colors duration-200`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
