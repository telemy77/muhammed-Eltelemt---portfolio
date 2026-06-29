"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Plus,
  ArrowRight,
  Trash2,
  MailOpen,
  Mail,
  ExternalLink,
} from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    blogCount: 0,
    messagesCount: 0,
    unreadMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    // Load local storage data
    const projects = db.getProjects();
    const blogs = db.getBlogPosts();
    const msgs = db.getContactMessages();
    const unread = msgs.filter((m) => !m.read).length;

    setStats({
      projectsCount: projects.length,
      blogCount: blogs.length,
      messagesCount: msgs.length,
      unreadMessages: unread,
    });

    setRecentMessages(msgs.slice().reverse().slice(0, 5));
  }, []);

  const handleMarkRead = (id: string) => {
    db.markMessageRead(id);
    // Reload state
    const msgs = db.getContactMessages();
    setRecentMessages(msgs.slice().reverse().slice(0, 5));
    setStats((prev) => ({
      ...prev,
      unreadMessages: msgs.filter((m) => !m.read).length,
    }));
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      db.deleteMessage(id);
      // Reload state
      const msgs = db.getContactMessages();
      setRecentMessages(msgs.slice().reverse().slice(0, 5));
      setStats((prev) => ({
        ...prev,
        messagesCount: msgs.length,
        unreadMessages: msgs.filter((m) => !m.read).length,
      }));
    }
  };

  const statCards = [
    {
      label: "Total Projects",
      value: stats.projectsCount,
      icon: FolderKanban,
      color: "from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20",
      href: "/admin/projects",
    },
    {
      label: "Blog Articles",
      value: stats.blogCount,
      icon: FileText,
      color: "from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/20",
      href: "/admin/blog",
    },
    {
      label: "Contact Messages",
      value: stats.messagesCount,
      icon: MessageSquare,
      color: "from-[#00D9FF]/20 to-[#00D9FF]/5 text-[#00D9FF] border-[#00D9FF]/20",
      badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} new` : null,
      href: "#messages",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Welcome back! Here is a summary of your portfolio.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2"
          >
            <Plus size={16} />
            New Project
          </Link>
          <Link
            href="/admin/blog/new"
            className="btn-secondary text-sm py-2.5 px-4 flex items-center gap-2"
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={stat.href}
                className={`block glass-card p-6 border bg-gradient-to-br ${stat.color} hover:scale-[1.02] transition-all`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  {stat.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                      {stat.badge}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="messages">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-playfair flex items-center gap-2">
              <MessageSquare size={18} className="text-[#00D9FF]" />
              Recent Messages
            </h2>
            {stats.messagesCount > 5 && (
              <span className="text-xs text-slate-500">Showing latest 5</span>
            )}
          </div>

          <div className="space-y-4">
            {recentMessages.length === 0 ? (
              <div className="glass-card p-10 text-center border border-white/5">
                <p className="text-slate-500 text-sm">No messages received yet.</p>
              </div>
            ) : (
              recentMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`glass-card p-6 border transition-all ${
                    msg.read ? "border-white/5" : "border-[#00D9FF]/20 shadow-[0_0_15px_rgba(0,217,255,0.02)]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-bold text-white text-base">{msg.name}</h3>
                        {!msg.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                        )}
                      </div>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {msg.email} · {formatDate(msg.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          className="p-1.5 rounded-lg bg-[#00D9FF]/10 text-[#00D9FF] hover:bg-[#00D9FF]/20 border border-[#00D9FF]/20 transition-colors"
                          title="Mark as read"
                        >
                          <MailOpen size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                        title="Delete message"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-slate-300 text-xs font-semibold mb-1">
                      Subject: {msg.subject}
                    </p>
                    <p className="text-slate-400 text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white font-playfair">
            Quick Actions
          </h2>

          <div className="glass-card p-6 space-y-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#00D9FF]/30 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#00D9FF] transition-colors">
                  <ExternalLink size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">View Live Site</p>
                  <p className="text-xs text-slate-500 mt-0.5">Open in new tab</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#00D9FF]/30 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#00D9FF] transition-colors">
                  <Settings size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Edit Resume & Skills</p>
                  <p className="text-xs text-slate-500 mt-0.5">Modify timeline entries</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
