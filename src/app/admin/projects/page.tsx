"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, ArrowLeft, Eye, Star } from "lucide-react";
import { db } from "@/lib/db";
import { Project } from "@/data/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(db.getProjects());
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the project "${title}"?`)) {
      db.deleteProject(id);
      setProjects(db.getProjects());
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link href="/admin" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-300">Projects</span>
          </div>
          <h1 className="text-3xl font-bold text-white font-playfair">
            Manage Projects
          </h1>
        </div>

        <Link
          href="/admin/projects/new"
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          Add New Project
        </Link>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full glass-card p-12 text-center border border-white/5">
            <p className="text-slate-500 text-sm">No projects found. Add one to get started!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="glass-card overflow-hidden border border-white/10 flex flex-col md:flex-row group"
            >
              {/* Cover Image */}
              <div className="relative w-full md:w-40 h-32 md:h-full min-h-[120px] bg-slate-900 shrink-0">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 160px"
                />
                {project.featured && (
                  <div className="absolute top-2 left-2 p-1 rounded-md bg-[#00D9FF] text-slate-950" title="Featured Project">
                    <Star size={12} fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Details & Actions */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="tag text-[10px] py-0.5 px-2">{project.category}</span>
                    <span className="text-[10px] text-slate-500">{project.createdAt}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-playfair group-hover:text-[#00D9FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5">
                  {/* Public link */}
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 text-slate-500 hover:text-white text-xs transition-colors"
                  >
                    <Eye size={14} />
                    View Live
                  </Link>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 hover:text-[#00D9FF] hover:border-[#00D9FF]/20 hover:bg-[#00D9FF]/5 transition-all"
                      title="Edit project"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-300 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all"
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
