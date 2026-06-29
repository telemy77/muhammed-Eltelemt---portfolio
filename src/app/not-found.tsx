"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, FolderKanban, Newspaper, Mail } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Floating shape config                                              */
/* ------------------------------------------------------------------ */
const shapes = [
  {
    className:
      "h-24 w-24 rounded-full border-2 border-[#00D9FF]/20",
    x: "10%",
    y: "15%",
    duration: 8,
  },
  {
    className:
      "h-16 w-16 rotate-45 border-2 border-[#0066FF]/20",
    x: "80%",
    y: "20%",
    duration: 10,
  },
  {
    className:
      "h-20 w-20 rounded-xl border-2 border-[#00D9FF]/15",
    x: "70%",
    y: "70%",
    duration: 9,
  },
  {
    className:
      "h-12 w-12 rounded-full bg-[#00D9FF]/5",
    x: "20%",
    y: "75%",
    duration: 7,
  },
  {
    className:
      "h-32 w-32 rounded-full border border-white/5",
    x: "50%",
    y: "10%",
    duration: 12,
  },
  {
    className:
      "h-14 w-14 rotate-12 rounded-lg border border-[#0066FF]/15",
    x: "85%",
    y: "55%",
    duration: 11,
  },
  {
    className:
      "h-10 w-10 rounded-full bg-[#0066FF]/5",
    x: "35%",
    y: "85%",
    duration: 6,
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-nav links                                                    */
/* ------------------------------------------------------------------ */
const quickLinks = [
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: Newspaper, label: "Blog", href: "/blog" },
  { icon: Mail, label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#0F172A] overflow-hidden px-6">
      {/* ---- floating shapes ---- */}
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute ${s.className}`}
          style={{ left: s.x, top: s.y }}
          animate={{
            y: [0, -24, 0, 20, 0],
            x: [0, 12, 0, -12, 0],
            rotate: [0, 8, 0, -8, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ---- ambient blobs ---- */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#00D9FF]/8 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-[#0066FF]/8 blur-[140px]" />

      {/* ---- content ---- */}
      <div className="relative z-10 text-center max-w-xl">
        {/* 404 number */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-playfair text-[10rem] md:text-[14rem] font-black leading-none bg-gradient-to-b from-white via-[#00D9FF] to-[#0066FF] bg-clip-text text-transparent select-none"
        >
          404
        </motion.h1>

        {/* message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold text-white -mt-4 mb-3"
        >
          This page seems to have gone off-grid
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-slate-400 text-lg mb-10"
        >
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved. Let&rsquo;s get you back on track.
        </motion.p>

        {/* Go Home button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-[#0F172A] font-bold text-sm hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-shadow duration-300"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </motion.div>

        {/* quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-12 flex items-center justify-center gap-6 flex-wrap"
        >
          <span className="text-slate-500 text-sm">Or try:</span>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#00D9FF] transition-colors duration-200"
            >
              <link.icon className="h-4 w-4" />
              <span className="group-hover:underline underline-offset-4">
                {link.label}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
