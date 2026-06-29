"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { Project } from "@/data/projects";
import { slugify } from "@/lib/utils";

export default function AdminEditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("BIM Automation");
  const [coverImage, setCoverImage] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [gallery, setGallery] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [overview, setOverview] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [results, setResults] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"published" | "draft">("published");

  useEffect(() => {
    const projects = db.getProjects();
    const project = projects.find((p) => p.id === id);

    if (project) {
      setTitle(project.title);
      setSlug(project.slug);
      setDescription(project.description);
      setCategory(project.category);
      setCoverImage(project.coverImage);
      setTechnologies(project.technologies.join(", "));
      setGallery(project.gallery.join(", "));
      setYoutubeUrl(project.youtubeUrl || "");
      setOverview(project.overview || "");
      setChallenge(project.challenge || "");
      setSolution(project.solution || "");
      setResults(project.results || "");
      setFeatured(project.featured);
      setStatus(project.status);
    } else {
      alert("Project not found");
      router.push("/admin/projects");
    }
  }, [id, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !description) {
      alert("Please fill in all required fields (Title, Slug, Short Description)");
      return;
    }

    const techArray = technologies
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const galleryArray = gallery
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img.length > 0);

    const updatedProject: Project = {
      id,
      title,
      slug,
      description,
      category,
      coverImage,
      gallery: galleryArray.length > 0 ? galleryArray : [coverImage],
      youtubeUrl: youtubeUrl || undefined,
      technologies: techArray,
      overview,
      challenge,
      solution,
      results,
      featured,
      status,
      createdAt: new Date().toISOString().split("T")[0], // Keep approximate or original creation date
      updatedAt: new Date().toISOString().split("T")[0],
    };

    db.saveProject(updatedProject);
    router.push("/admin/projects");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white font-playfair">
            Edit Project Case Study
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Modify the project details, screenshots, and case study documentation.
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
                Project Title <span className="text-[#00D9FF]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. RebarX"
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
                placeholder="e.g. rebarx"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-mono"
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300 block">
                Short Description <span className="text-[#00D9FF]">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of the project shown on listing pages..."
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
                <option value="BIM Automation">BIM Automation</option>
                <option value="Desktop Application">Desktop Application</option>
                <option value="Web Application">Web Application</option>
                <option value="Engineering Tool">Engineering Tool</option>
              </select>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="e.g. C#, Revit API, WPF, .NET"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm"
              />
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                Cover Image (Path or URL)
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/images/projects/rebarx.png"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-mono"
              />
            </div>

            {/* YouTube Video URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                YouTube Embed URL (Optional)
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-mono"
              />
            </div>

            {/* Gallery Images */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300 block">
                Gallery Images (comma separated paths)
              </label>
              <input
                type="text"
                value={gallery}
                onChange={(e) => setGallery(e.target.value)}
                placeholder="e.g. /images/projects/rebarx-1.png, /images/projects/rebarx-2.png"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-mono"
              />
            </div>

            {/* Case Study Details */}
            <div className="md:col-span-2 border-t border-white/5 pt-6 mt-4">
              <h3 className="font-playfair text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-[#00D9FF]" />
                Case Study Contents
              </h3>
            </div>

            {/* Overview / Problem */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300 block">
                Overview & Summary
              </label>
              <textarea
                rows={3}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Describe the overall scope and summary of the case study..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm"
              />
            </div>

            {/* Challenge */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                The Challenge
              </label>
              <textarea
                rows={4}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="What was the problem? What was tedious, slow, or difficult?"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-inter"
              />
            </div>

            {/* Solution */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">
                The Solution
              </label>
              <textarea
                rows={4}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How did you solve it? What APIs, frameworks, or tools did you write?"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-inter"
              />
            </div>

            {/* Results */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300 block">
                The Results & Impact
              </label>
              <textarea
                rows={3}
                value={results}
                onChange={(e) => setResults(e.target.value)}
                placeholder="What were the outcomes? e.g. Detailing time reduced from 2 hours to 1 minute..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00D9FF] transition-all text-sm font-inter"
              />
            </div>

            {/* Options */}
            <div className="flex items-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-white/10 bg-white/5 text-[#00D9FF] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-300">Featured Project</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-300">Status:</span>
                <button
                  type="button"
                  onClick={() => setStatus(status === "published" ? "draft" : "published")}
                  className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                    status === "published"
                      ? "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/20"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {status === "published" ? "Published" : "Draft"}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10 mt-8">
            <Link href="/admin/projects" className="btn-secondary text-sm py-2.5 px-5">
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
