"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, Calendar, Clock } from "lucide-react";
import { db } from "@/lib/db";
import { BlogPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(db.getBlogPosts());
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      db.deleteBlogPost(id);
      setPosts(db.getBlogPosts());
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link href="/admin" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-300">Blog</span>
          </div>
          <h1 className="text-3xl font-bold text-white font-playfair">
            Manage Blog Posts
          </h1>
        </div>

        <Link
          href="/admin/blog/new"
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          Write New Post
        </Link>
      </div>

      {/* Blog Posts List */}
      <div className="glass-card overflow-hidden border border-white/10">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-sm">No blog posts found. Write your first article!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-semibold text-slate-400 uppercase bg-white/[0.02]">
                  <th className="p-4 pl-6">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Reading Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.01] transition-colors text-sm">
                    <td className="p-4 pl-6 font-medium text-white max-w-xs sm:max-w-md truncate">
                      {post.title}
                    </td>
                    <td className="p-4">
                      <span className="tag text-[10px] py-0.5 px-2">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatDate(post.publishedAt)}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.readingTime} min
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          post.status === "published"
                            ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
                            : post.status === "draft"
                            ? "bg-slate-800 text-slate-400 border-slate-700"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors"
                          title="View article"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-[#00D9FF] hover:border-[#00D9FF]/20 hover:bg-[#00D9FF]/5 transition-all"
                          title="Edit article"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all"
                          title="Delete article"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
