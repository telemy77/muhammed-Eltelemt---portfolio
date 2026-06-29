"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, UploadCloud, Folder, Search, Image as ImageIcon } from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  path: string;
  size: string;
  type: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "1",
    name: "Comment Stamper.png",
    path: "/images/projects/comment-stamper.png",
    size: "123 KB",
    type: "image/png",
  },
  {
    id: "2",
    name: "Project Scorecard.png",
    path: "/images/projects/project-scorecard.png",
    size: "164 KB",
    type: "image/png",
  },
  {
    id: "3",
    name: "Wall Data Export.png",
    path: "/images/projects/wall-data-export.png",
    size: "76 KB",
    type: "image/png",
  },
  {
    id: "4",
    name: "Building Inspection Tracker.png",
    path: "/images/projects/building-inspection-tracker.png",
    size: "136 KB",
    type: "image/png",
  },
  {
    id: "5",
    name: "Building Inspection Tracker 2.png",
    path: "/images/projects/building-inspection-tracker-2.png",
    size: "134 KB",
    type: "image/png",
  },
  {
    id: "6",
    name: "Company Management.png",
    path: "/images/projects/company-management.png",
    size: "79 KB",
    type: "image/png",
  },
];

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (path: string, id: string) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link href="/admin" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-300">Media Library</span>
        </div>
        <h1 className="text-3xl font-bold text-white font-playfair">
          Media Library
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Browse and manage project screenshots, diagrams, and document files.
        </p>
      </div>

      {/* Upload Box */}
      <div className="glass-card p-8 border border-dashed border-white/10 text-center hover:border-[#00D9FF]/50 transition-colors cursor-pointer group">
        <div className="flex flex-col items-center justify-center space-y-3">
          <UploadCloud size={40} className="text-slate-500 group-hover:text-[#00D9FF] transition-colors" />
          <div>
            <p className="text-sm font-semibold text-white">Drag & drop files here</p>
            <p className="text-xs text-slate-500 mt-1">Supports PNG, JPG, PDF up to 10MB</p>
          </div>
          <button className="btn-secondary text-xs py-1.5 px-4">Browse Files</button>
        </div>
      </div>

      {/* Search & Statistics */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files…"
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00D9FF] transition-all text-xs"
          />
        </div>

        <div className="text-xs text-slate-500">
          Showing {filteredMedia.length} of {media.length} items
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="glass-card overflow-hidden border border-white/10 hover:border-[#00D9FF]/40 transition-colors flex flex-col justify-between group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-slate-950 shrink-0 border-b border-white/5 flex items-center justify-center overflow-hidden">
              <Image
                src={item.path}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 150px"
              />
            </div>

            {/* Info */}
            <div className="p-3 space-y-1.5">
              <p className="text-[10px] font-semibold text-white truncate" title={item.name}>
                {item.name}
              </p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] text-slate-500">{item.size}</span>
                <button
                  onClick={() => handleCopy(item.path, item.id)}
                  className="p-1 rounded bg-white/5 border border-white/5 hover:bg-[#00D9FF]/10 hover:text-[#00D9FF] hover:border-[#00D9FF]/20 text-slate-400 transition-all flex items-center gap-1"
                  title="Copy file path"
                >
                  {copiedId === item.id ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
                  <span className="text-[8px] font-medium">Path</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
