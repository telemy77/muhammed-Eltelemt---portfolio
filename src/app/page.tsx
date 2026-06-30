"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { siteConfig, stats } from "@/lib/constants";
import { projectsData } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>(
    projectsData.filter((p) => p.featured).slice(0, 3)
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main className="bg-[#0F172A] text-white min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00D9FF]/6 blur-[120px]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-16"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Photo */}
            <motion.div variants={itemVariants} className="flex-shrink-0">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D9FF]/40 to-transparent blur-2xl scale-110" />
                <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-[#00D9FF]/30 shadow-2xl shadow-[#00D9FF]/10">
                  <Image
                    src="/images/profile.jpg"
                    alt="Mohamed El-Telemy"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-center lg:text-left">
              <motion.p
                variants={itemVariants}
                className="text-[#00D9FF] text-sm font-medium tracking-widest uppercase mb-3"
              >
                BIM Automation Developer · Cairo, Egypt
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-playfair leading-tight mb-4"
              >
                Mohamed
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
                  El-Telemy
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-slate-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
              >
                Civil Engineer turned software developer — building{" "}
                <span className="text-white font-medium">Revit API add-ins</span>,{" "}
                <span className="text-white font-medium">WPF desktop apps</span>, and{" "}
                <span className="text-white font-medium">BIM automation tools</span> that
                eliminate manual engineering work.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
              >
                <Link
                  href="/projects"
                  className="flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-[#0F172A] font-semibold rounded-xl hover:bg-white transition-colors duration-200 text-sm"
                >
                  View Projects <ArrowRight size={15} />
                </Link>
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:border-[#00D9FF]/50 hover:bg-white/5 transition-all duration-200 text-sm"
                >
                  <Download size={15} /> Resume
                </a>
              </motion.div>

              {/* Social + Contact */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-slate-400"
              >
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#00D9FF] transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-1.5 hover:text-[#00D9FF] transition-colors"
                >
                  <Mail size={14} /> {siteConfig.email}
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-1.5 hover:text-[#00D9FF] transition-colors"
                >
                  <Phone size={14} /> {siteConfig.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-16 lg:mt-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-slate-600"
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#00D9FF] font-playfair mb-1">
                  {s.value}{s.suffix}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#00D9FF] text-xs font-medium tracking-widest uppercase mb-2">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair">Featured Projects</h2>
        </motion.div>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border border-white/8 hover:border-[#00D9FF]/30 hover:bg-white/3 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-20 h-36 sm:h-14 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-[#00D9FF] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <ExternalLink
                      size={15}
                      className="text-slate-600 group-hover:text-[#00D9FF] transition-colors flex-shrink-0 mt-0.5"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/8"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#00D9FF] transition-colors"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* ─── ABOUT SNIPPET ────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#00D9FF] text-xs font-medium tracking-widest uppercase mb-2">
                About
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-5">
                Engineer who codes.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                I graduated in Civil Engineering from Mansoura University (2023) and spent two years as a
                Highway Design Engineer. Then I joined the{" "}
                <span className="text-white">ITI BIM Automation Developer Program</span> — a 460-hour
                intensive where I mastered C#, Revit API, WPF, and software design for the AEC world.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                I build tools that solve real engineering problems: plugins that automate rebar detailing,
                desktop apps that replace spreadsheets, and BIM utilities that make coordinators faster.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-[#00D9FF] hover:underline"
              >
                More about me <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {[
                "C#", ".NET", "WPF", "MVVM", "Revit API",
                "AutoCAD API", "Entity Framework Core", "SQL Server",
                "SQLite", "Dynamo", "IFC / xBIM", "Generative AI",
                "OOP", "Data Structures", "Visual Studio",
              ].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/4 text-slate-200 text-sm hover:border-[#00D9FF]/30 hover:bg-white/8 transition-all duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Let's work together
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Open to opportunities in BIM software development, AEC tool building, and engineering
              automation.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-[#0F172A] font-semibold rounded-xl hover:bg-white transition-colors duration-200 text-sm"
              >
                Get in touch <Mail size={15} />
              </Link>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-xl hover:border-[#00D9FF]/50 hover:bg-white/5 transition-all duration-200 text-sm"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
