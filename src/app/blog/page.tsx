"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { blogCategories, type BlogPost } from "@/data/blog";
import { db } from "@/lib/db";


/* ─── animation helpers ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 16 },
  },
  exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.25 } },
};

/* ─── helpers ─── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ─── category colour map ─── */
const categoryColours: Record<string, string> = {
  "BIM Development": "bg-[#00D9FF]/15 text-[#00D9FF] border-[#00D9FF]/30",
  Career: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Engineering: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Tutorials: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

function CategoryBadge({ category }: { category: string }) {
  const cls =
    categoryColours[category] ??
    "bg-white/10 text-slate-300 border-white/20";
  return (
    <span
      className={`inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full border ${cls}`}
    >
      {category}
    </span>
  );
}

/* ─── card ─── */
function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <article className="h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(0,217,255,0.12)] transition-all duration-500 hover:-translate-y-2">
          {/* cover image placeholder */}
          <div className="relative h-52 sm:h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20" />
            {/* decorative floating shapes */}
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[#00D9FF]/10 blur-2xl" />
            <div className="absolute bottom-6 left-6 w-14 h-14 rounded-lg bg-[#0066FF]/10 blur-xl rotate-12" />
            {/* title overlay */}
            <div className="absolute inset-0 flex items-end p-6">
              <span className="font-playfair text-lg font-bold text-white/80 leading-tight line-clamp-2 drop-shadow-lg">
                {post.title}
              </span>
            </div>
            {/* category badge top‑left */}
            <div className="absolute top-4 left-4">
              <CategoryBadge category={post.category} />
            </div>
          </div>

          {/* body */}
          <div className="flex flex-col flex-1 p-6 gap-4">
            <h2 className="font-playfair text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors duration-300 leading-snug">
              {post.title}
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            {/* meta row */}
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min
              </span>
            </div>

            {/* read more */}
            <span className="inline-flex items-center gap-2 text-[#00D9FF] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
              Read Article
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

/* ━━━ page ━━━ */
export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(db.getBlogPosts());
  }, []);

  const filtered = useMemo(() => {
    let published = posts.filter((p) => p.status === "published");

    if (activeCategory !== "All") {
      published = published.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      published = published.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return published;
  }, [search, activeCategory, posts]);


  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* ─── hero ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00D9FF]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-[#00D9FF] text-sm font-semibold tracking-widest uppercase mb-6">
              <BookOpen className="w-4 h-4" />
              Articles &amp; Insights
            </span>
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Blog
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Thoughts on BIM automation, software development, and the
              engineering‑to‑code journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── filters ─── */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00D9FF]/50 focus:ring-1 focus:ring-[#00D9FF]/30 transition-all backdrop-blur-sm"
            />
          </motion.div>

          {/* category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {blogCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#0F172A] bg-gradient-to-r from-[#00D9FF] to-[#0066FF] shadow-[0_0_20px_rgba(0,217,255,0.35)]"
                      : "text-slate-400 bg-white/5 border border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── article grid ─── */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${search}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <AnimatePresence>
                  {filtered.map((post, i) => (
                    <ArticleCard key={post.id} post={post} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-24 space-y-4"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-white">
                  No articles found
                </h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Try adjusting your search terms or browsing a different
                  category.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:border-[#00D9FF]/50 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
