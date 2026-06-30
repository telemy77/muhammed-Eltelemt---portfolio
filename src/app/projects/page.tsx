"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, X, Layers, Calendar, ArrowRight } from "lucide-react";
import { projectCategories, projectsData } from "@/data/projects";
import type { Project } from "@/data/projects";
import { cn, formatDate } from "@/lib/utils";


/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#0066FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-[#00D9FF] bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-full">
            Portfolio
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Projects
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
            Explore my work in BIM automation, desktop applications, and
            engineering tools
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Search & Filter Bar                                                */
/* ------------------------------------------------------------------ */
function SearchAndFilter({
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
}: {
  search: string;
  setSearch: (v: string) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-7xl mx-auto px-6 mb-12 space-y-6"
    >
      {/* Search bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by project name or technology…"
          className="w-full pl-12 pr-10 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/40 focus:border-[#00D9FF]/40 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {projectCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300",
              activeCategory === category
                ? "bg-[#00D9FF] text-[#0F172A] border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Project Card                                                       */
/* ------------------------------------------------------------------ */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
        layout: { duration: 0.4 },
      }}
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#00D9FF]/30 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] hover:scale-[1.02]">
          {/* Cover image */}
          <div className="relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
            {/* overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#00D9FF]/15 backdrop-blur-md text-[#00D9FF] border border-[#00D9FF]/20 rounded-full">
                <Layers className="w-3 h-3" />
                {project.category}
              </span>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-semibold bg-amber-500/15 backdrop-blur-md text-amber-400 border border-amber-500/20 rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-playfair text-xl font-bold text-white mb-2 group-hover:text-[#00D9FF] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-white/5 text-slate-300 border border-white/10 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium text-slate-500">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(project.createdAt)}
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty State                                                        */
/* ------------------------------------------------------------------ */
function EmptyState({ search }: { search: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Search className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="font-playfair text-2xl font-bold text-white mb-2">
        No projects found
      </h3>
      <p className="text-slate-400 max-w-sm">
        {search
          ? `No projects match "${search}". Try a different search term or filter.`
          : "No projects match the selected category."}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((p) => p.status === "published")
      .filter((p) => {
        if (activeCategory !== "All" && p.category !== activeCategory)
          return false;

        if (search.trim()) {
          const q = search.toLowerCase();
          const inTitle = p.title.toLowerCase().includes(q);
          const inTech = p.technologies.some((t) =>
            t.toLowerCase().includes(q)
          );
          const inDesc = p.description.toLowerCase().includes(q);
          return inTitle || inTech || inDesc;
        }

        return true;
      });
  }, [search, activeCategory]);


  return (
    <div className="min-h-screen bg-[#0F172A]">
      <HeroSection />

      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="text-slate-300 font-medium">
            {filteredProjects.length}
          </span>{" "}
          project{filteredProjects.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Projects grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState search={search} />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
