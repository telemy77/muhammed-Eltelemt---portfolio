"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Layers,
  ExternalLink,
  Share2,
  Linkedin,
  Twitter,
  Link2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Target,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { cn, formatDate } from "@/lib/utils";
import { db } from "@/lib/db";


/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface ProjectDetailProps {
  project: Project;
  prevProject: { slug: string; title: string } | null;
  nextProject: { slug: string; title: string } | null;
}

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ------------------------------------------------------------------ */
/*  Gallery Lightbox                                                   */
/* ------------------------------------------------------------------ */
function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl max-h-[85vh] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
        />
        <p className="text-center text-sm text-slate-400 mt-4">
          {currentIndex + 1} / {images.length}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Share Buttons                                                      */
/* ------------------------------------------------------------------ */
function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API not available */
    }
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500 flex items-center gap-1.5">
        <Share2 className="w-4 h-4" />
        Share
      </span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00D9FF]/30 transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-slate-300" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00D9FF]/30 transition-all"
        aria-label="Share on X"
      >
        <Twitter className="w-4 h-4 text-slate-300" />
      </a>
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00D9FF]/30 transition-all"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Link2 className="w-4 h-4 text-slate-300" />
        )}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function ProjectDetail({
  project: initialProject,
  prevProject: initialPrevProject,
  nextProject: initialNextProject,
}: ProjectDetailProps) {
  const [project, setProject] = useState(initialProject);
  const [prevProject, setPrevProject] = useState(initialPrevProject);
  const [nextProject, setNextProject] = useState(initialNextProject);

  useEffect(() => {
    const liveProj = db.getProjectBySlug(initialProject.slug);
    if (liveProj) {
      setProject(liveProj);
    }
    const liveProjects = db.getProjects().filter((p) => p.status === "published");
    const currentIndex = liveProjects.findIndex((p) => p.slug === initialProject.slug);
    if (currentIndex !== -1) {
      setPrevProject(
        currentIndex > 0
          ? {
              slug: liveProjects[currentIndex - 1].slug,
              title: liveProjects[currentIndex - 1].title,
            }
          : null
      );
      setNextProject(
        currentIndex < liveProjects.length - 1
          ? {
              slug: liveProjects[currentIndex + 1].slug,
              title: liveProjects[currentIndex + 1].title,
            }
          : null
      );
    }
  }, [initialProject.slug]);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Gallery lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + project.gallery.length) % project.gallery.length
        : null
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % project.gallery.length : null
    );

  const overviewCards = [
    {
      icon: Target,
      label: "Challenge",
      text: project.challenge,
      gradient: "from-red-500/20 to-orange-500/20",
      iconColor: "text-red-400",
    },
    {
      icon: Lightbulb,
      label: "Solution",
      text: project.solution,
      gradient: "from-[#00D9FF]/20 to-[#0066FF]/20",
      iconColor: "text-[#00D9FF]",
    },
    {
      icon: TrendingUp,
      label: "Results",
      text: project.results,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={project.gallery}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>

      {/* ---- Back button ---- */}
      <div className="fixed top-24 left-6 z-30">
        <Link
          href="/projects"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Projects</span>
        </Link>
      </div>

      {/* ---- Hero Section ---- */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-[#0F172A]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/40 to-transparent" />

        {/* Content over hero */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-end"
        >
          <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-semibold bg-[#00D9FF]/15 backdrop-blur-md text-[#00D9FF] border border-[#00D9FF]/20 rounded-full">
                <Layers className="w-3 h-3" />
                {project.category}
              </span>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="max-w-2xl text-lg text-slate-300 leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  {formatDate(project.createdAt)}
                </span>
                <ShareButtons title={project.title} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ---- Overview Section ---- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 text-center"
          >
            Project Overview
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-slate-400 text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            {project.overview}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {overviewCards.map((card, i) => (
              <motion.div
                key={card.label}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:border-[#00D9FF]/20 hover:shadow-[0_0_30px_rgba(0,217,255,0.08)]">
                  {/* Gradient blob */}
                  <div
                    className={cn(
                      "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity",
                      `bg-gradient-to-br ${card.gradient}`
                    )}
                  />
                  <div className="relative z-10">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5",
                        card.iconColor
                      )}
                    >
                      <card.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-white mb-3">
                      {card.label}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Gallery Section ---- */}
      {project.gallery.length > 1 && (
        <section className="py-24 px-6 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-playfair text-3xl md:text-4xl font-bold text-white mb-12 text-center"
            >
              Gallery
            </motion.h2>

            <div
              className={cn(
                "grid gap-6",
                project.gallery.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {project.gallery.map((img, i) => (
                <motion.button
                  key={img}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-[#00D9FF]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Technologies Section ---- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            Technologies Used
          </motion.h2>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          >
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:text-[#00D9FF] hover:border-[#00D9FF]/30 hover:bg-[#00D9FF]/5 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 mt-8 max-w-2xl mx-auto"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs text-slate-500 bg-white/[0.02] border border-white/5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ---- Prev / Next Navigation ---- */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous */}
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`} className="group">
                <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-[#00D9FF]/20 hover:bg-white/[0.07]">
                  <span className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                    ← Previous Project
                  </span>
                  <h4 className="font-playfair text-lg font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                    {prevProject.title}
                  </h4>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Next */}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group text-right"
              >
                <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-[#00D9FF]/20 hover:bg-white/[0.07]">
                  <span className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">
                    Next Project →
                  </span>
                  <h4 className="font-playfair text-lg font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                    {nextProject.title}
                  </h4>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Back to all */}
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
