import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import type { Experience, Education, Certification } from "@/data/experience";
import { db } from "@/lib/db";


/* ------------------------------------------------------------------ */
/*  Reusable animated wrapper                                          */
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
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */
function SectionHeading({
  icon: Icon,
  label,
  title,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  accent: string;
}) {
  return (
    <AnimatedSection className="text-center mb-16">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] text-sm font-semibold mb-4">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white">
        {title} <span className="text-[#00D9FF]">{accent}</span>
      </h2>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Format month-year string                                           */
/* ------------------------------------------------------------------ */
function formatPeriod(s: string): string {
  const [year, month] = s.split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/* ------------------------------------------------------------------ */
/*  Experience timeline item                                           */
/* ------------------------------------------------------------------ */
function TimelineCard({
  item,
  index,
}: {
  item: Experience;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <AnimatedSection
      delay={index * 0.12}
      className={`relative mb-14 last:mb-0 flex flex-col md:flex-row ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } items-start md:items-center`}
    >
      {/* timeline dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
        <span className="relative flex h-12 w-12 items-center justify-center">
          {/* pulse ring */}
          {item.current && (
            <span className="absolute inset-0 rounded-full bg-[#00D9FF]/30 animate-ping" />
          )}
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0F172A] border-2 border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.35)]">
            <Briefcase className="h-5 w-5 text-[#00D9FF]" />
          </span>
        </span>
      </div>

      {/* card */}
      <div
        className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
          isLeft ? "md:pr-12" : "md:pl-12"
        }`}
      >
        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#00D9FF]/30 hover:shadow-[0_0_30px_rgba(0,217,255,0.12)] transition-all duration-300">
          {/* period badge */}
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-[#00D9FF]" />
            <span className="text-sm font-semibold text-[#00D9FF]">
              {formatPeriod(item.startDate)} –{" "}
              {item.current ? "Present" : formatPeriod(item.endDate!)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
          <p className="text-slate-400 text-sm mb-4 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {item.company}
          </p>

          <p className="text-slate-300 leading-relaxed mb-5">
            {item.description}
          </p>

          {/* achievements */}
          <ul className="space-y-2 mb-5">
            {item.achievements.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2 text-sm text-slate-400"
              >
                <ChevronRight className="h-4 w-4 text-[#00D9FF] mt-0.5 shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>

          {/* tech tags */}
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-3 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* spacer */}
      <div className="hidden md:block md:w-[calc(50%-40px)]" />
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Education card                                                     */
/* ------------------------------------------------------------------ */
function EducationCard({
  item,
  index,
}: {
  item: Education;
  index: number;
}) {
  return (
    <AnimatedSection delay={index * 0.12}>
      <div className="group h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#00D9FF]/30 hover:shadow-[0_0_30px_rgba(0,217,255,0.12)] transition-all duration-300 hover:-translate-y-1">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00D9FF]/10 mb-5 group-hover:bg-[#00D9FF]/20 transition-colors">
          <GraduationCap className="h-6 w-6 text-[#00D9FF]" />
        </span>

        <h3 className="text-xl font-bold text-white mb-1">{item.degree}</h3>
        <p className="text-[#00D9FF] font-medium text-sm mb-1">{item.field}</p>
        <p className="text-slate-400 text-sm mb-3">{item.institution}</p>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Calendar className="h-3.5 w-3.5" />
          {item.startDate} – {item.endDate}
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          {item.description}
        </p>

        {item.grade && (
          <div className="mt-4 inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20">
            Grade: {item.grade}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Certification badge                                                */
/* ------------------------------------------------------------------ */
function CertBadge({
  item,
  index,
}: {
  item: Certification;
  index: number;
}) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="group flex items-center gap-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#00D9FF]/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.1)] transition-all duration-300">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0066FF] shadow-[0_0_16px_rgba(0,217,255,0.3)]">
          <Award className="h-6 w-6 text-white" />
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold truncate">{item.name}</h3>
          <p className="text-slate-400 text-sm">
            {item.issuer} · {item.date}
          </p>
        </div>

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-slate-500 hover:text-[#00D9FF] transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    setExperience(db.getExperience());
    setEducation(db.getEducation());
    setCertifications(db.getCertifications());
  }, []);

  return (
    <main className="min-h-screen bg-[#0F172A] pt-24 pb-32">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#00D9FF]/10 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full bg-[#0066FF]/10 blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-playfair text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-white to-[#00D9FF] bg-clip-text text-transparent"
          >
            Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 text-slate-400 text-lg max-w-xl mx-auto"
          >
            From the construction site to the code editor — my professional
            timeline.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="mt-6 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] origin-left"
          />
        </div>
      </section>

      {/* ============ EXPERIENCE TIMELINE ============ */}
      <section className="py-16 px-6">
        <SectionHeading
          icon={Briefcase}
          label="Career"
          title="Work"
          accent="Experience"
        />

        <div className="max-w-5xl mx-auto relative">
          {/* connecting line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D9FF]/60 via-[#00D9FF]/25 to-transparent" />

          {experience.map((exp, i) => (
            <TimelineCard key={exp.id} item={exp} index={i} />
          ))}
        </div>
      </section>

      {/* ============ EDUCATION ============ */}
      <section className="py-24 px-6">
        <SectionHeading
          icon={GraduationCap}
          label="Education"
          title="Academic"
          accent="Background"
        />

        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          {education.map((edu, i) => (
            <EducationCard key={edu.id} item={edu} index={i} />
          ))}
        </div>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <section className="py-16 px-6">
        <SectionHeading
          icon={Award}
          label="Credentials"
          title="Certifications &"
          accent="Awards"
        />

        <div className="max-w-3xl mx-auto space-y-5">
          {certifications.map((cert, i) => (
            <CertBadge key={cert.id} item={cert} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

