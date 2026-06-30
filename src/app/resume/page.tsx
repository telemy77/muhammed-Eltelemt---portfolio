"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import {
  certificationsData,
  educationData,
  experienceData,
  type Education,
  type Experience,
} from "@/data/experience";
import { skillsData } from "@/data/skills";
import {
  Download,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  ExternalLink,
} from "lucide-react";


/* ── helpers ────────────────────────────────────────────────────── */

interface TimelineEntry {
  kind: "experience" | "education";
  id: string;
  title: string; // role or degree
  subtitle: string; // company or institution
  description: string;
  startDate: string;
  endDate: string | null;
  current?: boolean;
  tags: string[]; // technologies or empty
  achievements?: string[];
  grade?: string;
}

function buildTimeline(
  experience: Experience[],
  education: Education[]
): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  experience.forEach((e) =>
    entries.push({
      kind: "experience",
      id: `exp-${e.id}`,
      title: e.role,
      subtitle: e.company,
      description: e.description,
      startDate: e.startDate,
      endDate: e.endDate,
      current: e.current,
      tags: e.technologies,
    })
  );

  education.forEach((e) =>
    entries.push({
      kind: "education",
      id: `edu-${e.id}`,
      title: e.degree,
      subtitle: e.institution,
      description: e.description,
      startDate: e.startDate,
      endDate: e.endDate,
      tags: [],
      grade: e.grade,
    })
  );

  // Sort newest first by startDate
  entries.sort((a, b) => {
    const pa = a.startDate.replace("-", ".");
    const pb = b.startDate.replace("-", ".");
    return pb.localeCompare(pa);
  });

  return entries;
}


function formatDate(d: string): string {
  if (d.length <= 4) return d; // plain year
  if (!d.includes("-")) return d;
  const [y, m] = d.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[parseInt(m, 10) - 1]} ${y}`;
}

/* ── Timeline Card ──────────────────────────────────────────────── */

function TimelineCard({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const isExp = entry.kind === "experience";
  const dotColor = isExp ? "bg-[#00D9FF]" : "bg-[#0066FF]";
  const glowColor = isExp
    ? "shadow-[0_0_12px_rgba(0,217,255,0.5)]"
    : "shadow-[0_0_12px_rgba(0,102,255,0.5)]";

  return (
    <div ref={ref} className="relative pl-10 md:pl-14 pb-12 last:pb-0 group">
      {/* vertical line */}
      <span className="absolute left-[18px] md:left-[26px] top-3 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />

      {/* dot */}
      <span
        className={`absolute left-2.5 md:left-4 top-2 w-4 h-4 rounded-full ${dotColor} ${glowColor} ring-4 ring-[#0F172A] z-10`}
      />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.55, delay: index * 0.12 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-colors duration-400"
      >
        {/* badge */}
        <div className="flex items-center gap-2 mb-3">
          {isExp ? (
            <Briefcase className="w-4 h-4 text-[#00D9FF]" />
          ) : (
            <GraduationCap className="w-4 h-4 text-[#0066FF]" />
          )}
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              isExp ? "text-[#00D9FF]" : "text-[#0066FF]"
            }`}
          >
            {isExp ? "Experience" : "Education"}
          </span>
          {entry.current && (
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
              Current
            </span>
          )}
        </div>

        <h3 className="text-lg md:text-xl font-semibold font-playfair text-white mb-1">
          {entry.title}
        </h3>
        <p className="text-sm text-slate-300 font-medium mb-1">
          {entry.subtitle}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {formatDate(entry.startDate)} —{" "}
            {entry.endDate ? formatDate(entry.endDate) : "Present"}
          </span>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {entry.description}
        </p>

        {/* achievements */}
        {entry.achievements && entry.achievements.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {entry.achievements.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2 text-sm text-slate-400"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00D9FF] shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        )}

        {/* grade */}
        {entry.grade && (
          <p className="text-sm text-slate-400 mb-4">
            <span className="text-slate-300 font-medium">Grade:</span>{" "}
            {entry.grade}
          </p>
        )}

        {/* tech tags */}
        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ── Certification Card ─────────────────────────────────────────── */

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certificationsData)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-amber-400/30 hover:shadow-[0_0_25px_rgba(251,191,36,0.1)] transition-all duration-300"
    >
      <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 shrink-0">
        <Award className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-semibold text-white mb-0.5 truncate">
          {cert.name}
        </h4>
        <p className="text-sm text-slate-400">{cert.issuer}</p>
        <p className="text-xs text-slate-500 mt-1">{formatDate(cert.date)}</p>
      </div>
      {cert.url && (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-[#00D9FF] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function ResumePage() {
  const timeline = useMemo(() => {
    return buildTimeline(experienceData, educationData);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });


  return (
    <main className="min-h-screen bg-[#0F172A] pt-28 pb-24 px-6">
      {/* ── Header / Hero ────────────────────────────────────────── */}
      <section ref={heroRef} className="max-w-4xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12"
        >
          {/* decorative line */}
          <div className="w-20 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF]" />

          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-2">
            Mohamed{" "}
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] bg-clip-text text-transparent">
              El‑Telemy
            </span>
          </h1>
          <p className="text-lg text-slate-300 font-medium mb-3">
            BIM Automation Developer &amp; Civil Engineer
          </p>

          <div className="flex items-center justify-center gap-1.5 text-sm text-slate-400 mb-8">
            <MapPin className="w-4 h-4 text-[#00D9FF]" />
            <span>Cairo, Egypt</span>
          </div>

          {/* Download PDF */}
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-[#0F172A] font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,217,255,0.35)] hover:scale-105 transition-all duration-300"
          >
            <Download className="w-4.5 h-4.5" />
            Download PDF
          </a>
        </motion.div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#00D9FF] text-sm font-semibold tracking-widest uppercase mb-4">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-white">
            Experience &amp; Education
          </h2>
        </motion.div>

        {/* legend */}
        <div className="flex items-center justify-center gap-6 mb-10 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00D9FF] shadow-[0_0_8px_rgba(0,217,255,0.5)]" />
            Experience
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0066FF] shadow-[0_0_8px_rgba(0,102,255,0.5)]" />
            Education
          </span>
        </div>

        <div>
          {timeline.map((entry, i) => (
            <TimelineCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-white">
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certificationsData.map((c, i) => (
            <CertCard key={c.id} cert={c} index={i} />
          ))}
        </div>
      </section>

      {/* ── Skills Summary ───────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#00D9FF] text-sm font-semibold tracking-widest uppercase mb-4">
            At a Glance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-white">
            Skills Summary
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((cat, ci) => {
            const top = cat.skills
              .slice()
              .sort((a, b) => b.proficiency - a.proficiency)
              .slice(0, 4);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
              >
                <h4 className="text-sm font-semibold text-white mb-3">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {top.map((s) => (
                    <span
                      key={s.name}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
