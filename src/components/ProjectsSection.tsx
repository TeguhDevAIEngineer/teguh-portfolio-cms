import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Terminal, Compass, FolderKanban } from "lucide-react";
import { Project } from "../types";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<"all" | "coding" | "creative">("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const filterTabs = [
    { id: "all", label: "Semua Hasil Karya", icon: FolderKanban },
    { id: "coding", label: "Coding & Sistem Informasi", icon: Terminal },
    { id: "creative", label: "Visual & Desain Kreatif", icon: Compass },
  ];

  return (
    <div className="space-y-10">
      {/* Title Header */}
      <section className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Karya Pilihan & Proyek Rekayasa
        </h1>
        <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
          Berikut adalah hasil pengerjaan koding, administrasi basis data inovatif, dan manajemen solusi IT support yang telah saya kembangkan.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2 border-b border-stone-200/50 pb-4">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 w-full sm:w-auto justify-center ${
                isActive
                  ? "bg-stone-900 text-stone-50 shadow-sm"
                  : "bg-white text-stone-600 hover:text-stone-950 hover:bg-stone-100 border border-stone-200/80"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden minimal-card flex flex-col hover:shadow-md"
            >
              {/* Card Image */}
              <div className="relative aspect-video w-full bg-stone-100 overflow-hidden border-b border-stone-100">
                <img
                  src={project.imageUrl || "https://picsum.photos/seed/placeholder/800/450"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 right-2.5 flex items-center space-x-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider uppercase ${
                    project.category === "coding"
                      ? "bg-stone-900 text-stone-50"
                      : "bg-stone-100 text-stone-800 border border-stone-200"
                  }`}>
                    {project.category === "coding" ? "CODING" : "LAYOUTS"}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
                    <span>{project.date}</span>
                    <span>Teguh Rahayu</span>
                  </div>
                  <h3 className="text-xs font-bold text-stone-900 font-sans tracking-tight leading-tight group-hover:text-stone-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tags and Links */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-stone-100 text-stone-600 text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    {project.githubUrl && project.githubUrl !== "#" ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-stone-600 hover:text-stone-950 font-medium font-mono text-[10px]"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-stone-400 font-mono text-[10px] italic">Desain Internal</span>
                    )}

                    {project.projectUrl && project.projectUrl !== "#" ? (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-stone-900 font-bold hover:underline font-mono text-[10px]"
                      >
                        <span>Demo Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-stone-400 font-mono text-[10px] italic">Tidak Publik</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 border rounded-xl bg-stone-100 border-dashed border-stone-300">
          <p className="text-stone-600 text-xs">Belum ada hasil karya di kategori ini.</p>
        </div>
      )}
    </div>
  );
}
