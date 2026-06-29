"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { techStackLogos } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";
import { db } from "@/lib/db";

import {
  Code2,
  Building2,
  Monitor,
  Database,
  Brain,
  HardHat,
  Wrench,
  Layers,
} from "lucide-react";

/* ── helpers ────────────────────────────────────────────────────── */

const categoryIcons: Record<string, React.ReactNode> = {
  programming: <Code2 className="w-6 h-6" />,
  "bim-revit": <Building2 className="w-6 h-6" />,
  "desktop-dev": <Monitor className="w-6 h-6" />,
  databases: <Database className="w-6 h-6" />,
  "ai-ml": <Brain className="w-6 h-6" />,
  engineering: <HardHat className="w-6 h-6" />,
  tools: <Wrench className="w-6 h-6" />,
};

const techCategoryColors: Record<string, string> = {
  Language: "text-[#00D9FF]",
  Framework: "text-purple-400",
  BIM: "text-emerald-400",
  Database: "text-amber-400",
  Tool: "text-rose-400",
};

const techCategoryBorders: Record<string, string> = {
  Language: "hover:border-[#00D9FF]/40 hover:shadow-[0_0_25px_rgba(0,217,255,0.15)]",
  Framework: "hover:border-purple-400/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]",
  BIM: "hover:border-emerald-400/40 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]",
  Database: "hover:border-amber-400/40 hover:shadow-[0_0_25px_rgba(251,191,36,0.15)]",
  Tool: "hover:border-rose-400/40 hover:shadow-[0_0_25px_rgba(251,113,133,0.15)]",
};

/* ── Animated Proficiency Bar ───────────────────────────────────── */

function ProficiencyBar({
  name,
  proficiency,
  index,
}: {
  name: string;
  proficiency: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">{name}</span>
        <motion.span
          className="text-sm font-semibold text-[#00D9FF]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
        >
          {proficiency}%
        </motion.span>
      </div>

      {/* bar background */}
      <div className="relative h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${proficiency}%` } : { width: 0 }}
          transition={{
            delay: index * 0.1 + 0.2,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* glow tip */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D9FF] blur-[6px]"
          initial={{ left: 0, opacity: 0 }}
          animate={
            isInView
              ? { left: `${proficiency}%`, opacity: 1 }
              : { left: 0, opacity: 0 }
          }
          transition={{
            delay: index * 0.1 + 0.2,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}

/* ── Category Card ──────────────────────────────────────────────── */

function CategoryCard({
  category,
  index,
}: {
  category: (typeof skillsData)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#00D9FF]/20 transition-colors duration-500"
    >
      {/* header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/10 text-[#00D9FF]">
          {categoryIcons[category.id] ?? <Layers className="w-6 h-6" />}
        </div>
        <h3 className="text-xl font-semibold font-playfair text-white">
          {category.title}
        </h3>
      </div>
      <p className="text-sm text-slate-400 mb-6">{category.description}</p>

      {/* skill bars */}
      <div className="space-y-4">
        {category.skills.map((skill, i) => (
          <ProficiencyBar
            key={skill.name}
            name={skill.name}
            proficiency={skill.proficiency}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Tech Stack Card ────────────────────────────────────────────── */

function TechCard({
  tech,
  index,
}: {
  tech: (typeof techStackLogos)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default transition-all duration-300 hover:scale-105 ${
        techCategoryBorders[tech.category] ?? ""
      }`}
    >
      {/* icon placeholder — large initial */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl font-bold text-white group-hover:from-[#00D9FF]/20 group-hover:to-[#0066FF]/10 transition-all duration-300">
        {tech.name.charAt(0)}
      </div>
      <span className="text-sm font-medium text-white text-center leading-tight">
        {tech.name}
      </span>
      <span
        className={`text-xs font-medium ${
          techCategoryColors[tech.category] ?? "text-slate-400"
        }`}
      >
        {tech.category}
      </span>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  useEffect(() => {
    setSkills(db.getSkills());
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-[#0F172A] pt-28 pb-24 px-6">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="max-w-7xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[#00D9FF] text-sm font-semibold tracking-widest uppercase mb-4">
            What I Bring to the Table
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-playfair text-white mb-5">
            Skills{" "}
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] bg-clip-text text-transparent">
              &amp; Expertise
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            From civil engineering foundations to full‑stack BIM automation — a
            comprehensive toolkit built through years of hands‑on practice and
            continuous learning.
          </p>
        </motion.div>
      </section>

      {/* ── Skill Categories Grid ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>


      {/* ── Technology Stack ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#00D9FF] text-sm font-semibold tracking-widest uppercase mb-4">
              Technology Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-4">
              Tools I Work With
            </h2>
            <p className="max-w-xl mx-auto text-slate-400">
              The technologies, frameworks, and platforms I use daily to deliver
              high‑quality solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {techStackLogos.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
