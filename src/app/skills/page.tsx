"use client";

import { motion } from "framer-motion";
import { skillsData, techStackLogos } from "@/data/skills";

const categoryColors: Record<string, string> = {
  Language: "border-[#00D9FF]/30 text-[#00D9FF]",
  Framework: "border-purple-400/30 text-purple-300",
  "UI Framework": "border-purple-400/30 text-purple-300",
  Architecture: "border-indigo-400/30 text-indigo-300",
  "BIM Platform": "border-emerald-400/30 text-emerald-300",
  ORM: "border-amber-400/30 text-amber-300",
  Database: "border-amber-400/30 text-amber-300",
  "Visual Scripting": "border-pink-400/30 text-pink-300",
  "Open BIM": "border-teal-400/30 text-teal-300",
  IDE: "border-slate-400/30 text-slate-300",
  "Version Control": "border-orange-400/30 text-orange-300",
  "AI Tools": "border-violet-400/30 text-violet-300",
  Data: "border-green-400/30 text-green-300",
  "CAD Software": "border-cyan-400/30 text-cyan-300",
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-[#00D9FF] text-xs font-medium tracking-widest uppercase mb-2">
            Skills
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">
            Tools & Technologies
          </h1>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            The languages, frameworks, platforms, and tools I work with — built through the ITI BIM
            Automation Developer Program and real-world engineering projects.
          </p>
        </motion.div>

        {/* ── Skill Groups ── */}
        <div className="space-y-12 mb-20">
          {skillsData.map((category, ci) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08, duration: 0.5 }}
            >
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/8 pb-2">
                {category.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/4 text-slate-200 text-sm hover:border-[#00D9FF]/30 hover:bg-white/8 transition-all duration-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tools Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-[#00D9FF] text-xs font-medium tracking-widest uppercase mb-2">
            Tech Stack
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-playfair text-white mb-8">
            Tools I Work With
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {techStackLogos.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-white/8 bg-white/3 hover:border-[#00D9FF]/25 hover:bg-white/6 transition-all duration-200 group"
            >
              {/* Initial avatar */}
              <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0 font-bold text-white text-sm group-hover:bg-[#00D9FF]/15 transition-colors">
                {tech.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{tech.name}</p>
                <p className={`text-[10px] ${categoryColors[tech.category] ?? "text-slate-500"}`}>
                  {tech.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
