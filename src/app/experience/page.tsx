"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  X,
} from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
}
interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  grade?: string;
}
interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

import experienceDataJson from "@/data/experience.json";
import certificationsDataJson from "@/data/certifications.json";
import { educationData } from "@/data/experience";

/* ── Animated wrapper ───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Experience card ─────────────────────────────────────────────── */
function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  return (
    <Reveal delay={index * 0.1} className="relative pl-8 pb-10 last:pb-0">
      {/* dot */}
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-[#00D9FF] border-2 border-[#0F172A]" />
      {/* line */}
      <div className="absolute left-[5px] top-4 bottom-0 w-px bg-white/10 last:hidden" />

      <div className="p-5 rounded-2xl border border-white/8 bg-white/3 hover:border-[#00D9FF]/30 transition-colors">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-xs text-[#00D9FF] font-mono">
            {item.startDate} – {item.current ? "Present" : item.endDate}
          </span>
          {item.current && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/20">
              Current
            </span>
          )}
        </div>
        <h3 className="font-semibold text-white text-lg">{item.role}</h3>
        <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-3">
          <Briefcase size={12} /> {item.company}
          <span className="text-slate-600">·</span>
          <MapPin size={12} /> {item.location}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.description}</p>
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.technologies.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-full bg-[#00D9FF]/8 text-[#00D9FF] border border-[#00D9FF]/15"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* ── Education card ──────────────────────────────────────────────── */
function EducationCard({ item, index }: { item: Education; index: number }) {
  return (
    <Reveal delay={index * 0.1}>
      <div className="p-5 rounded-2xl border border-white/8 bg-white/3 hover:border-[#00D9FF]/30 transition-colors h-full">
        <GraduationCap size={18} className="text-[#00D9FF] mb-3" />
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <Calendar size={11} /> {item.startDate} – {item.endDate}
          {item.current && (
            <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/20">
              Current
            </span>
          )}
        </div>
        <h3 className="font-semibold text-white mb-1">{item.degree}</h3>
        <p className="text-[#00D9FF] text-sm mb-2">{item.institution}</p>
        <p className="text-slate-400 text-xs leading-relaxed mb-3">{item.description}</p>
        {item.grade && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
            Grade: {item.grade}
          </span>
        )}
      </div>
    </Reveal>
  );
}

/* ── Certification badge ─────────────────────────────────────────── */
function CertBadge({ item, index, onClickImage }: { item: Certification; index: number; onClickImage: (url: string) => void }) {
  return (
    <Reveal delay={index * 0.1}>
      <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/3 hover:border-[#00D9FF]/30 transition-colors">
        {item.image ? (
          <button onClick={() => onClickImage(item.image!)} className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative group">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Award size={14} className="text-white" />
            </div>
          </button>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center flex-shrink-0">
            <Award size={18} className="text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm">{item.name}</h3>
          <p className="text-slate-400 text-xs">
            {item.issuer} · {item.date}
          </p>
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-[#00D9FF] transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function ExperiencePage() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const experience = experienceDataJson as Experience[];
  const education = educationData as Education[];
  const certifications = certificationsDataJson as Certification[];

  return (
    <main className="min-h-screen bg-[#0F172A] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6 space-y-20">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#00D9FF] text-xs font-medium tracking-widest uppercase mb-2">
            Background
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-white">
            Experience & Education
          </h1>
        </motion.div>

        {/* ── Work Experience ── */}
        <section>
          <Reveal className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={16} className="text-[#00D9FF]" />
              <h2 className="text-lg font-semibold text-white">Work Experience</h2>
            </div>
          </Reveal>
          <div className="relative">
            {experience.length > 0 ? (
              experience.map((exp, i) => (
                <ExperienceCard key={exp.id} item={exp} index={i} />
              ))
            ) : (
              <p className="text-slate-500 text-sm">No experience entries found.</p>
            )}
          </div>
        </section>

        {/* ── Education ── */}
        <section>
          <Reveal className="mb-6">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-[#00D9FF]" />
              <h2 className="text-lg font-semibold text-white">Education</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {education.length > 0 ? (
              education.map((edu, i) => (
                <EducationCard key={edu.id} item={edu} index={i} />
              ))
            ) : (
              <p className="text-slate-500 text-sm">No education entries found.</p>
            )}
          </div>
        </section>

        {/* ── Certifications ── */}
        {certifications.length > 0 && (
          <section>
            <Reveal className="mb-6">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#00D9FF]" />
                <h2 className="text-lg font-semibold text-white">Certifications</h2>
              </div>
            </Reveal>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <CertBadge key={cert.id} item={cert} index={i} onClickImage={setModalImage} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setModalImage(null)}
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={modalImage}
              alt="Certificate"
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
