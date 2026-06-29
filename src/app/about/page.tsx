"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cpu,
  Monitor,
  HardHat,
  GraduationCap,
  Briefcase,
  BookOpen,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Reusable animated-section wrapper                                 */
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Journey data                                                       */
/* ------------------------------------------------------------------ */
const journeySteps = [
  {
    icon: GraduationCap,
    title: "Civil Engineering Studies",
    period: "2018 – 2023",
    description:
      "BSc in Civil Engineering from Mansoura University, specializing in Highway & Airport Engineering.",
  },
  {
    icon: Briefcase,
    title: "Highway Engineering Career",
    period: "2023 – 2025",
    description:
      "Worked as a Highway Technical Office Engineer — supervised construction and discovered the power of automation.",
  },
  {
    icon: BookOpen,
    title: "ITI AEC Developer Program",
    period: "2025 – 2026",
    description:
      "Intensive 9-month program mastering C#, .NET, Revit API, WPF, and software engineering for the AEC industry.",
  },
  {
    icon: Rocket,
    title: "BIM Automation Developer",
    period: "2026 – Present",
    description:
      "Building software that automates engineering workflows — Revit plugins, desktop apps, and more.",
  },
];

/* ------------------------------------------------------------------ */
/*  "What I Do" cards                                                  */
/* ------------------------------------------------------------------ */
const whatIDo = [
  {
    icon: Cpu,
    title: "BIM Automation",
    description:
      "Custom Revit API plugins that eliminate repetitive tasks, enforce standards, and supercharge BIM workflows for architects and engineers.",
  },
  {
    icon: Monitor,
    title: "Desktop Applications",
    description:
      "Polished WPF desktop apps built with MVVM architecture, clean UI, and robust data management using Entity Framework & SQL Server.",
  },
  {
    icon: HardHat,
    title: "Engineering Solutions",
    description:
      "Bridging the gap between civil engineering domain knowledge and modern software — tools that engineers actually need.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] pt-24 pb-32">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden py-24 px-6">
        {/* gradient blobs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#00D9FF]/10 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-[#0066FF]/10 blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 text-[#00D9FF] font-semibold tracking-wider uppercase text-sm"
          >
            Get to know me
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-white to-[#00D9FF] bg-clip-text text-transparent"
          >
            About Me
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] origin-left"
          />
        </div>
      </section>

      {/* ============ BIO ============ */}
      <section className="py-16 px-6">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(0,217,255,0.08)]">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              From Blueprints to{" "}
              <span className="text-[#00D9FF]">Code</span>
            </h2>

            <div className="space-y-5 text-slate-300 text-lg leading-relaxed font-inter">
              <p>
                I&rsquo;m{" "}
                <span className="text-white font-semibold">
                  {siteConfig.name}
                </span>
                , a Civil Engineer who transitioned into{" "}
                <span className="text-[#00D9FF] font-medium">
                  BIM Automation Development
                </span>
                . I graduated with a BSc in Civil Engineering from{" "}
                <span className="text-white font-medium">
                  Mansoura University (2018&ndash;2023)
                </span>
                , specializing in Highway &amp; Airport Engineering.
              </p>

              <p>
                After working as a Highway Technical Office Engineer — where I
                witnessed first-hand how much time gets wasted on repetitive
                engineering tasks — I made a pivotal decision: learn to build the
                software that solves these problems.
              </p>

              <p>
                I joined{" "}
                <span className="text-white font-medium">
                  ITI&rsquo;s AEC Developer program (2025&ndash;2026)
                </span>{" "}
                to master{" "}
                <span className="text-[#00D9FF]">
                  C#, .NET, Revit API, WPF
                </span>
                , and software engineering for the AEC industry. Today I
                combine deep domain knowledge in civil engineering with modern
                development skills to create tools that engineers actually love
                to use.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ============ JOURNEY TIMELINE ============ */}
      <section className="py-24 px-6">
        <AnimatedSection className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
            My <span className="text-[#00D9FF]">Journey</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
            A non-linear path from the construction site to the code editor.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto relative">
          {/* vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D9FF]/60 via-[#00D9FF]/30 to-transparent" />

          {journeySteps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <AnimatedSection
                key={step.title}
                delay={i * 0.15}
                className={`relative mb-16 last:mb-0 flex flex-col md:flex-row ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-center`}
              >
                {/* dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F172A] border-2 border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.35)]">
                    <step.icon className="h-5 w-5 text-[#00D9FF]" />
                  </span>
                </div>

                {/* card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
                    isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#00D9FF]/30 transition-colors duration-300 shadow-[0_0_20px_rgba(0,217,255,0.06)]">
                    <span className="inline-block text-sm font-semibold text-[#00D9FF] mb-2">
                      {step.period}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* spacer for opposite side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </AnimatedSection>
            );
          })}
        </div>

        {/* arrow trail */}
        <AnimatedSection
          delay={0.6}
          className="flex justify-center mt-8 gap-2 text-[#00D9FF]"
        >
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ x: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.2,
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          ))}
        </AnimatedSection>
      </section>

      {/* ============ WHAT I DO ============ */}
      <section className="py-24 px-6">
        <AnimatedSection className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
            What I <span className="text-[#00D9FF]">Do</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
            Combining engineering domain expertise with modern software
            development.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {whatIDo.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.15}>
              <div className="group relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#00D9FF]/40 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] transition-all duration-300 hover:-translate-y-1">
                {/* icon */}
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#00D9FF]/10 mb-6 group-hover:bg-[#00D9FF]/20 transition-colors duration-300">
                  <card.icon className="h-7 w-7 text-[#00D9FF]" />
                </span>

                <h3 className="text-xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {card.description}
                </p>

                {/* subtle gradient bottom border on hover */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </main>
  );
}
