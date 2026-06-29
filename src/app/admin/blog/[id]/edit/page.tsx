"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { db } from "@/lib/db";
import { BlogPost } from "@/data/blog";
import { slugify, calculateReadingTime } from "@/lib/utils";

export default function AdminEditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("BIM Development");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"published" | "draft" | "scheduled">("published");

  useEffect(() => {
    const posts = db.getBlogPosts();
    const post = posts.find((p) => p.id === id);

    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCoverImage(post.coverImage);
      setCategory(post.category);
      setTags(post.tags.join(", "));
      setStatus(post.status);
    } else {
      alert("Article not found");
      router.push("/admin/blog");
    }
  }, [id, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !excerpt || !content) {
      alert("Please fill in all required fields (Title, Slug, Excerpt, Content)");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const readingTime = calculateReadingTime(content);

    const updatedPost: BlogPost = {
      id,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags: tagsArray,
      author: "Mohamed El-Telemy",
      readingTime,
      status,
      publishedAt: new Date().toISOString().split("T")[0], // Keep approximate or original creation date
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    db.saveBlogPost(updatedPost);
    router.push("/admin/blog");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair">
            Edit Blog Post
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Modify article content, cover image, tags, and status.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="glass-card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                Post Title <span className="text-[#00D9FF]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Getting Started with Revit API"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                Slug (URL friendly) <span className="text-[#00D9FF]">*</span>
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="getting-started-with-revit-api"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-mono"
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300 block">
                Excerpt (Summary) <span className="text-[#00D9FF]">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary of the article shown on cards and feed listing..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm"
              >
                <option value="BIM Development">BIM Development</option>
                <option value="Career">Career</option>
                <option value="Engineering">Engineering</option>
                <option value="Tutorials">Tutorials</option>
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. Revit API, C#, WPF, Tutorial"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm"
              />
            </div>

            {/* Cover Image */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300 block">
                Cover Image Path/URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/images/blog/cover.png"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-mono"
              />
            </div>

            {/* Markdown Content */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300 block">
                Article Content (Markdown) <span className="text-[#00D9FF]">*</span>
              </label>
              <textarea
                required
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article here..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-mono leading-relaxed"
              />
            </div>

            {/* Status Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-300">Status:</span>
              <div className="flex gap-2">
                {(["published", "draft"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`text-xs px-3 py-1 rounded-full font-semibold border capitalize ${
                      status === s
                        ? "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/20"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10 mt-8">
            <Link href="/admin/blog" className="btn-secondary text-sm py-2.5 px-5">
              Cancel
            </Link>
            <button type="submit" className="btn-primary text-sm py-2.5 px-5">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
