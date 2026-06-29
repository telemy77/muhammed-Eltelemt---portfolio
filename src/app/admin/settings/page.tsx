"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Save,
  Plus,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
  PlusCircle,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { db } from "@/lib/db";
import { Experience, Education, Certification } from "@/data/experience";

export default function AdminSettingsPage() {
  // Contact Info states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [aboutText, setAboutText] = useState("");

  // Timeline lists states
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // Experience forms state
  const [newExpCompany, setNewExpCompany] = useState("");
  const [newExpRole, setNewExpRole] = useState("");
  const [newExpDesc, setNewExpDesc] = useState("");
  const [newExpStart, setNewExpStart] = useState("");
  const [newExpEnd, setNewExpEnd] = useState("");

  // Education forms state
  const [newEduInst, setNewEduInst] = useState("");
  const [newEduDegree, setNewEduDegree] = useState("");
  const [newEduField, setNewEduField] = useState("");
  const [newEduStart, setNewEduStart] = useState("");
  const [newEduEnd, setNewEduEnd] = useState("");

  // Certification forms state
  const [newCertName, setNewCertName] = useState("");
  const [newCertIssuer, setNewCertIssuer] = useState("");
  const [newCertDate, setNewCertDate] = useState("");

  useEffect(() => {
    // Load data from DB client
    const settings = db.getSettings();
    setEmail(settings.email || "");
    setPhone(settings.phone || "");
    setLocation(settings.location || "");
    setGithub(settings.github || "");
    setLinkedin(settings.linkedin || "");
    setAboutText(settings.aboutText || "");

    setExperience(db.getExperience());
    setEducation(db.getEducation());
    setCertifications(db.getCertifications());
  }, []);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveSettings({
      email,
      phone,
      location,
      github,
      linkedin,
      aboutText,
    });
    alert("Site settings saved successfully!");
  };

  // Add items
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpCompany || !newExpRole || !newExpStart) return;

    const newExp: Experience = {
      id: Math.random().toString(36).substring(2, 9),
      company: newExpCompany,
      role: newExpRole,
      description: newExpDesc,
      achievements: [],
      startDate: newExpStart,
      endDate: newExpEnd || null,
      current: !newExpEnd,
      technologies: [],
    };

    db.saveExperience(newExp);
    setExperience(db.getExperience());

    // Reset fields
    setNewExpCompany("");
    setNewExpRole("");
    setNewExpDesc("");
    setNewExpStart("");
    setNewExpEnd("");
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEduInst || !newEduDegree || !newEduStart) return;

    const newEdu: Education = {
      id: Math.random().toString(36).substring(2, 9),
      institution: newEduInst,
      degree: newEduDegree,
      field: newEduField,
      description: "",
      startDate: newEduStart,
      endDate: newEduEnd,
    };

    db.saveEducation(newEdu);
    setEducation(db.getEducation());

    // Reset fields
    setNewEduInst("");
    setNewEduDegree("");
    setNewEduField("");
    setNewEduStart("");
    setNewEduEnd("");
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName || !newCertIssuer || !newCertDate) return;

    const newCert: Certification = {
      id: Math.random().toString(36).substring(2, 9),
      name: newCertName,
      issuer: newCertIssuer,
      date: newCertDate,
    };

    db.saveCertification(newCert);
    setCertifications(db.getCertifications());

    // Reset fields
    setNewCertName("");
    setNewCertIssuer("");
    setNewCertDate("");
  };

  // Delete items
  const handleDeleteExperience = (id: string) => {
    db.deleteExperience(id);
    setExperience(db.getExperience());
  };

  const handleDeleteEducation = (id: string) => {
    db.deleteEducation(id);
    setEducation(db.getEducation());
  };

  const handleDeleteCert = (id: string) => {
    db.deleteCertification(id);
    setCertifications(db.getCertifications());
  };

  return (
    <div className="space-y-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link href="/admin" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-300">Settings</span>
        </div>
        <h1 className="text-3xl font-bold text-white font-playfair">
          Content & Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage contact info, about narratives, resume timeline, and certificates.
        </p>
      </div>

      {/* Grid: Settings Left (Contact & About), Timeline Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Col: Contact Info & About Story */}
        <div className="space-y-8">
          <div className="glass-card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white font-playfair border-b border-white/5 pb-4">
              Site & Contact Settings
            </h2>

            <form onSubmit={handleSaveContact} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-2">
                  <Mail size={12} className="text-[#00D9FF]" /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-2">
                  <Phone size={12} className="text-[#00D9FF]" /> Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-2">
                  <MapPin size={12} className="text-[#00D9FF]" /> Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-2">
                  <Github size={12} className="text-[#00D9FF]" /> GitHub Profile
                </label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 flex items-center gap-2">
                  <Linkedin size={12} className="text-[#00D9FF]" /> LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 block">
                  About Summary Text
                </label>
                <textarea
                  rows={4}
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <button type="submit" className="btn-primary w-full text-sm py-2 px-4 mt-6">
                <Save size={16} />
                Save Site Settings
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Timeline & Education Managers */}
        <div className="space-y-8">
          {/* Experience Timeline */}
          <div className="glass-card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white font-playfair border-b border-white/5 pb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-[#00D9FF]" />
              Manage Experience
            </h2>

            {/* List */}
            <div className="space-y-3 max-h-56 overflow-y-auto scrollbar-hide pr-1">
              {experience.map((exp) => (
                <div key={exp.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                  <div>
                    <p className="font-semibold text-white">{exp.role}</p>
                    <p className="text-slate-400">{exp.company} · {exp.startDate} - {exp.endDate || "Present"}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add form */}
            <form onSubmit={handleAddExperience} className="pt-4 border-t border-white/5 space-y-3">
              <p className="text-xs font-semibold text-slate-300">Add New Entry</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Company"
                  value={newExpCompany}
                  onChange={(e) => setNewExpCompany(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Role"
                  value={newExpRole}
                  onChange={(e) => setNewExpRole(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Start (YYYY-MM)"
                  value={newExpStart}
                  onChange={(e) => setNewExpStart(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="End (YYYY-MM or blank)"
                  value={newExpEnd}
                  onChange={(e) => setNewExpEnd(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>
              <textarea
                placeholder="Brief description..."
                value={newExpDesc}
                onChange={(e) => setNewExpDesc(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                rows={2}
              />
              <button type="submit" className="btn-secondary w-full text-xs py-1.5 flex items-center justify-center gap-1">
                <PlusCircle size={12} />
                Add Experience
              </button>
            </form>
          </div>

          {/* Education Timeline */}
          <div className="glass-card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white font-playfair border-b border-white/5 pb-4 flex items-center gap-2">
              <GraduationCap size={18} className="text-[#00D9FF]" />
              Manage Education
            </h2>

            {/* List */}
            <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide pr-1">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                  <div>
                    <p className="font-semibold text-white">{edu.degree} in {edu.field}</p>
                    <p className="text-slate-400">{edu.institution} · {edu.startDate} - {edu.endDate}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add form */}
            <form onSubmit={handleAddEducation} className="pt-4 border-t border-white/5 space-y-3">
              <p className="text-xs font-semibold text-slate-300">Add New Entry</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Institution"
                  value={newEduInst}
                  onChange={(e) => setNewEduInst(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Degree"
                  value={newEduDegree}
                  onChange={(e) => setNewEduDegree(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Field of Study"
                  value={newEduField}
                  onChange={(e) => setNewEduField(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white col-span-2"
                />
                <input
                  type="text"
                  required
                  placeholder="Start (YYYY)"
                  value={newEduStart}
                  onChange={(e) => setNewEduStart(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="End (YYYY)"
                  value={newEduEnd}
                  onChange={(e) => setNewEduEnd(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>
              <button type="submit" className="btn-secondary w-full text-xs py-1.5 flex items-center justify-center gap-1">
                <PlusCircle size={12} />
                Add Education
              </button>
            </form>
          </div>

          {/* Certifications */}
          <div className="glass-card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white font-playfair border-b border-white/5 pb-4 flex items-center gap-2">
              <Award size={18} className="text-[#00D9FF]" />
              Manage Certifications
            </h2>

            {/* List */}
            <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide pr-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                  <div>
                    <p className="font-semibold text-white">{cert.name}</p>
                    <p className="text-slate-400">{cert.issuer} · {cert.date}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCert(cert.id)}
                    className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add form */}
            <form onSubmit={handleAddCert} className="pt-4 border-t border-white/5 space-y-3">
              <p className="text-xs font-semibold text-slate-300">Add New Entry</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Certification Name"
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white col-span-2"
                />
                <input
                  type="text"
                  required
                  placeholder="Issuer"
                  value={newCertIssuer}
                  onChange={(e) => setNewCertIssuer(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Date (YYYY-MM)"
                  value={newCertDate}
                  onChange={(e) => setNewCertDate(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>
              <button type="submit" className="btn-secondary w-full text-xs py-1.5 flex items-center justify-center gap-1">
                <PlusCircle size={12} />
                Add Certification
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
