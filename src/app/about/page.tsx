"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, GraduationCap, Briefcase, Code2, Building2 } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  const journey = [
    {
      year: "2018–2023",
      icon: GraduationCap,
      title: "Civil Engineering",
      where: "Mansoura University",
      desc: "BSc in Civil Engineering with focus on Highway & Airport Engineering. Graduation project on Superpave Asphalt Mix Design. Graduated with Excellent grade.",
    },
    {
      year: "2023–Present",
      icon: GraduationCap,
      title: "Preliminary MA — Public Works",
      where: "Mansoura University",
      desc: "Pursuing a Preliminary MA in Highway and Airport Engineering at the Public Works Engineering Department. Grade: Excellent.",
    },
    {
      year: "2024–2026",
      icon: Briefcase,
      title: "Jr. Highway Design Engineer",
      where: "PowerCem Technology Regional",
      desc: "Specialized in Full Depth Reclamation (FDR) and diagnostic pavement evaluations for infrastructure rehabilitation projects across Egypt.",
    },
    {
      year: "2026–Present",
      icon: Code2,
      title: "BIM Automation Developer",
      where: "ITI Program",
      desc: "460-hour intensive program mastering C#, .NET, Revit API, WPF, MVVM, Entity Framework, and Generative AI for the AEC industry.",
    },
  ];

  const whatIDo = [
    {
      icon: Building2,
      title: "Revit API Add-ins",
      desc: "Building C# plugins that automate repetitive BIM tasks — from 3D rebar detailing to model health reports.",
    },
    {
      icon: Code2,
      title: "WPF Desktop Applications",
      desc: "Creating clean, professional desktop tools using WPF and MVVM for real-world AEC workflows.",
    },
    {
      icon: Briefcase,
      title: "BIM Automation Workflows",
      desc: "Designing end-to-end automation pipelines that reduce manual work and improve data accessibility.",
    },
  ];

  return (
    <main className="bg-[#0F172A] text-white min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 space-y-20">

        {/* ── Hero ── */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center md:items-start gap-10"
        >
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-[#00D9FF]/30 shadow-xl shadow-[#00D9FF]/10">
              <Image
                src="/images/profile.jpg"
                alt="Mohamed El-Telemy"
                fill
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          <div>
            <motion.p variants={itemVariants} className="text-[#00D9FF] text-xs tracking-widest uppercase mb-1">
              About
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold font-playfair mb-3">
              Mohamed El-Telemy
            </motion.h1>
            <motion.div variants={itemVariants} className="flex items-center gap-1.5 text-sm text-slate-400 mb-5">
              <MapPin size={13} /> Cairo, Egypt
            </motion.div>
            <motion.p variants={itemVariants} className="text-slate-400 leading-relaxed max-w-2xl">
              I am a Civil Engineer who crossed into software development to solve the problems I saw every day
              on engineering projects. After graduating from Mansoura University and working two years as a
              Highway Design Engineer, I enrolled in the{" "}
              <span className="text-white font-medium">ITI BIM Automation Developer Program</span> — 460 hours
              of intensive C#, Revit API, WPF, and software engineering training — and never looked back.
            </motion.p>
            <motion.p variants={itemVariants} className="text-slate-400 leading-relaxed max-w-2xl mt-3">
              My goal is simple: build software that makes engineers faster. Every add-in I build, every
              desktop app I ship, starts from a real frustration I or my colleagues had with manual,
              repetitive AEC workflows.
            </motion.p>
          </div>
        </motion.section>

        {/* ── Journey Timeline ── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#00D9FF] text-xs tracking-widest uppercase mb-2">Timeline</p>
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-10">My Journey</h2>
          </motion.div>

          <div className="relative pl-6 border-l border-white/10 space-y-8">
            {journey.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* dot */}
                <div className="absolute -left-[1.6rem] w-3 h-3 rounded-full bg-[#00D9FF] border-2 border-[#0F172A] top-1" />
                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
                  <span className="text-xs text-[#00D9FF] font-mono mb-1 sm:mb-0 sm:min-w-[90px] sm:pt-0.5">
                    {step.year}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="text-xs text-slate-500 mb-1">{step.where}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── What I Do ── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#00D9FF] text-xs tracking-widest uppercase mb-2">Expertise</p>
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">What I Build</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {whatIDo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-5 rounded-2xl border border-white/8 bg-white/3 hover:border-[#00D9FF]/30 transition-colors"
              >
                <item.icon size={20} className="text-[#00D9FF] mb-3" />
                <h3 className="font-semibold text-white mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00D9FF] text-[#0F172A] font-semibold rounded-xl hover:bg-white transition-colors text-sm"
          >
            See my projects <ArrowRight size={14} />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white rounded-xl hover:border-[#00D9FF]/40 hover:bg-white/5 transition-all text-sm"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
