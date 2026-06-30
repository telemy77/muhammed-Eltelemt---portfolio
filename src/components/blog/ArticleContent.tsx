"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Linkedin,
  Twitter,
  Link2,
  Check,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { type BlogPost } from "@/data/blog";


/* ─── helpers ─── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColours: Record<string, string> = {
  "BIM Development": "bg-[#00D9FF]/15 text-[#00D9FF] border-[#00D9FF]/30",
  Career: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Engineering: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Tutorials: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

/* ─── markdown‑like content parser ─── */
interface ContentBlock {
  type: "heading" | "code" | "paragraph" | "list-item";
  content: string;
  language?: string;
}

function parseContent(raw: string): ContentBlock[] {
  const lines = raw.split("\n");
  const blocks: ContentBlock[] = [];
  let i = 0;
  let accumulatedParagraph = "";

  const flushParagraph = () => {
    const text = accumulatedParagraph.trim();
    if (text) {
      blocks.push({ type: "paragraph", content: text });
    }
    accumulatedParagraph = "";
  };

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block (``` or \`\`\`)
    const codeMatch = line.match(/^(?:\\`\\`\\`|```)(\w*)/);
    if (codeMatch) {
      flushParagraph();
      const lang = codeMatch[1] || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length) {
        if (/^(?:\\`\\`\\`|```)/.test(lines[i])) {
          i++;
          break;
        }
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        type: "code",
        content: codeLines.join("\n"),
        language: lang,
      });
      continue;
    }

    // heading (# or ##)
    const headingMatch = line.match(/^(#{1,3})\s+(.*)/);
    if (headingMatch) {
      flushParagraph();
      blocks.push({ type: "heading", content: headingMatch[2] });
      i++;
      continue;
    }

    // list item
    if (/^[-*]\s+/.test(line.trim())) {
      flushParagraph();
      blocks.push({
        type: "list-item",
        content: line.trim().replace(/^[-*]\s+/, ""),
      });
      i++;
      continue;
    }

    // numbered list
    if (/^\d+\.\s+/.test(line.trim())) {
      flushParagraph();
      blocks.push({
        type: "list-item",
        content: line.trim().replace(/^\d+\.\s+/, ""),
      });
      i++;
      continue;
    }

    // empty line → flush paragraph
    if (line.trim() === "") {
      flushParagraph();
      i++;
      continue;
    }

    // accumulate paragraph text
    accumulatedParagraph += (accumulatedParagraph ? " " : "") + line.trim();
    i++;
  }

  flushParagraph();
  return blocks;
}

/* ─── inline formatting (bold, inline code) ─── */
function renderInline(text: string) {
  // Process **bold** and `inline code`
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <strong key={keyIdx++} className="text-white font-semibold">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(
        <code
          key={keyIdx++}
          className="px-1.5 py-0.5 rounded bg-white/10 text-[#00D9FF] text-[0.9em] font-mono"
        >
          {match[3]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

/* ─── rendered content blocks ─── */
function RenderedContent({ content }: { content: string }) {
  const blocks = parseContent(content);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <motion.h2
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="font-playfair text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 leading-tight"
              >
                {renderInline(block.content)}
              </motion.h2>
            );

          case "code":
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl bg-[#1E293B] border border-white/10 overflow-hidden"
              >
                {block.language && block.language !== "text" && (
                  <div className="px-4 py-2 border-b border-white/5 text-xs text-slate-500 font-mono uppercase tracking-wider">
                    {block.language}
                  </div>
                )}
                <pre className="p-5 overflow-x-auto">
                  <code className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre">
                    {block.content}
                  </code>
                </pre>
              </motion.div>
            );

          case "list-item":
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-3 pl-2"
              >
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#00D9FF] flex-shrink-0" />
                <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                  {renderInline(block.content)}
                </p>
              </motion.div>
            );

          case "paragraph":
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="text-slate-300 leading-[1.85] text-base sm:text-lg"
              >
                {renderInline(block.content)}
              </motion.p>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

/* ─── share buttons ─── */
function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `/blog/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500 mr-1">Share:</span>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#0077B5] hover:border-[#0077B5]/40 transition-all duration-300"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all duration-300"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>

      <button
        onClick={handleCopy}
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-all duration-300"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

/* ─── related article card ─── */
function RelatedCard({ post }: { post: BlogPost }) {
  const cls =
    categoryColours[post.category] ??
    "bg-white/10 text-slate-300 border-white/20";

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,217,255,0.1)] transition-all duration-500 hover:-translate-y-1">
        {/* gradient cover */}
        <div className="h-36 bg-gradient-to-br from-[#00D9FF]/15 to-[#0066FF]/15 relative">
          <div className="absolute top-3 left-3">
            <span
              className={`inline-block text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${cls}`}
            >
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-5 space-y-2">
          <h3 className="font-playfair text-lg font-bold text-white group-hover:text-[#00D9FF] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ━━━ main component ━━━ */
interface ArticleContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function ArticleContent({
  post,
  relatedPosts,
}: ArticleContentProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const badgeClass =
    categoryColours[post.category] ??
    "bg-white/10 text-slate-300 border-white/20";

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* ─── hero ─── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative pt-28 pb-20 px-6 overflow-hidden"
      >
        {/* ambient background */}
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 bg-gradient-to-b from-[#00D9FF]/6 via-transparent to-transparent pointer-events-none"
        />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#00D9FF]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-56 h-56 bg-[#0066FF]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          {/* back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00D9FF] transition-colors text-sm font-medium mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-5"
          >
            <span
              className={`inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full border ${badgeClass}`}
            >
              {post.category}
            </span>
          </motion.div>

          {/* title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, type: "spring" }}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-8"
          >
            {post.title}
          </motion.h1>

          {/* meta bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center gap-5 text-sm text-slate-400"
          >
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center text-[#0F172A] text-xs font-bold">
                ME
              </div>
              <span className="text-white font-medium">{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              {post.readingTime} min read
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── article body ─── */}
      <section className="px-6 pb-20">
        <div className="max-w-[720px] mx-auto">
          {/* divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

          <RenderedContent content={post.content} />

          {/* bottom divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16 mb-10" />

          {/* tags + share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            {/* tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ShareButtons title={post.title} slug={post.slug} />
          </motion.div>
        </div>
      </section>

      {/* ─── related articles ─── */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-32">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-10">
                <BookOpen className="w-5 h-5 text-[#00D9FF]" />
                <h2 className="font-playfair text-3xl font-bold text-white">
                  Related Articles
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rp, i) => (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    <RelatedCard post={rp} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
