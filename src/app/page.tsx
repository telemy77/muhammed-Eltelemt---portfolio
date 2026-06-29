"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Building2,
  Cpu,
  ExternalLink,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { techStackLogos } from "@/data/skills";
import { siteConfig, stats } from "@/lib/constants";
import { formatDate, cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { Project } from "@/data/projects";
import { BlogPost } from "@/data/blog";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <StatsSection />
      <TechStackSection />
      <LatestBlog />
      <ContactCTA />
    </>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[120px]"
        />

        {/* Floating geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#00D9FF]/30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 section-container text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse_dot" />
          <span className="text-sm text-slate-300">
            Open to opportunities
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-playfair leading-tight mb-6"
        >
          Building Software
          <br />
          <span className="gradient-text">That Automates</span>
          <br />
          Engineering
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Civil Engineer → Software Developer specializing in{" "}
          <span className="text-[#00D9FF]">BIM Automation</span>,{" "}
          <span className="text-[#00D9FF]">Revit API</span>, and{" "}
          engineering workflow optimization.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/projects" className="btn-primary text-base px-8 py-4">
            View Projects
            <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="btn-secondary text-base px-8 py-4">
            Get in Touch
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-[#00D9FF]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Featured Projects ─── */
function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [featured, setFeatured] = useState<Project[]>([]);

  useEffect(() => {
    setFeatured(db.getProjects().filter((p) => p.featured).slice(0, 4));
  }, []);


  return (
    <section ref={ref} className="py-24 relative">
      <div className="section-container">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of my best work in BIM automation and software development"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block glass-card overflow-hidden glow-hover transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="tag">{project.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00D9FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-[#00D9FF] text-sm font-medium">
                    View Case Study
                    <ChevronRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/projects" className="btn-secondary">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D9FF]/[0.02] to-transparent" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-12 md:p-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Tech Stack Section ─── */
function TechStackSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = ["Language", "Framework", "BIM", "Database", "Tool"];
  const categoryIcons: Record<string, React.ReactNode> = {
    Language: <Code2 size={16} />,
    Framework: <Cpu size={16} />,
    BIM: <Building2 size={16} />,
    Database: <Cpu size={16} />,
    Tool: <Code2 size={16} />,
  };

  return (
    <section ref={ref} className="py-24">
      <div className="section-container">
        <SectionHeading
          title="Technology Stack"
          subtitle="The tools and technologies I use to build powerful solutions"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {techStackLogos.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card p-4 text-center group hover:border-[#00D9FF]/50 glow-hover transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 flex items-center justify-center text-[#00D9FF]">
                {categoryIcons[tech.category] || <Code2 size={16} />}
              </div>
              <p className="text-white text-sm font-medium">{tech.name}</p>
              <p className="text-slate-500 text-xs mt-1">{tech.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Latest Blog ─── */
function LatestBlog() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setLatestPosts(
      db.getBlogPosts()
        .filter((p) => p.status === "published")
        .slice(0, 3)
    );
  }, []);


  return (
    <section ref={ref} className="py-24">
      <div className="section-container">
        <SectionHeading
          title="Latest Articles"
          subtitle="Thoughts on BIM automation, software development, and engineering"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block glass-card overflow-hidden glow-hover transition-all duration-300 hover:scale-[1.02] h-full"
              >
                {/* Cover placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <h4 className="text-lg font-playfair text-white/80 text-center relative z-10 line-clamp-3">
                    {post.title}
                  </h4>
                </div>

                <div className="p-6">
                  <span className="tag text-xs mb-3 inline-block">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00D9FF] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-slate-500 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span>·</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/blog" className="btn-secondary">
            Read All Articles
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact CTA ─── */
function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/20 via-[#0066FF]/10 to-[#0F172A]" />
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative z-10 text-center py-20 px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold font-playfair mb-4"
            >
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Amazing</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-400 max-w-xl mx-auto mb-8"
            >
              Have a project in mind? Looking for a BIM automation developer?
              I&apos;d love to hear from you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Get in Touch
                <ArrowRight size={18} />
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-secondary text-base px-8 py-4"
              >
                <ExternalLink size={16} />
                {siteConfig.email}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
