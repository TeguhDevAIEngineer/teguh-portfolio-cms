import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Calendar, ArrowLeft, Search, User, Hash } from "lucide-react";
import { BlogPost, Profile } from "../types";
import { resolveAvatarUrl } from "../imageResolver";

interface BlogSectionProps {
  posts: BlogPost[];
  activePostId: string | null;
  setActivePostId: (id: string | null) => void;
  profile?: Profile;
}

export default function BlogSection({ posts, activePostId, setActivePostId, profile }: BlogSectionProps) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => {
    const term = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term) ||
      post.tags.some(tag => tag.toLowerCase().includes(term))
    );
  });

  const activePost = posts.find(p => p.id === activePostId);

  // Helper to render newlines into neat paragraphs
  const renderContent = (text: string) => {
    return text.split("\n\n").map((para, idx) => {
      if (para.startsWith("### ")) {
        return (
          <h3 key={idx} className="font-serif text-base sm:text-lg font-bold text-stone-900 mt-6 mb-3">
            {para.replace("### ", "")}
          </h3>
        );
      }
      if (para.startsWith("## ")) {
        return (
          <h2 key={idx} className="font-serif text-lg sm:text-xl font-bold text-stone-900 mt-8 mb-4 border-b pb-1">
            {para.replace("## ", "")}
          </h2>
        );
      }
      if (para.startsWith("1. ") || para.startsWith("- ")) {
        return (
          <ul key={idx} className="list-disc pl-5 my-3 space-y-1 text-xs sm:text-sm text-stone-600">
            {para.split("\n").map((li, liIdx) => (
              <li key={liIdx}>{li.replace(/^[-\d\.]\s+/, "")}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
          {para}
        </p>
      );
    });
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {activePost ? (
          /* Deep Reading View */
          <motion.article
            key="reading"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => setActivePostId(null)}
              className="inline-flex items-center space-x-2 text-stone-600 hover:text-stone-950 font-medium text-xs py-1 px-3 bg-stone-100 hover:bg-stone-200/80 rounded-full transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Artikel</span>
            </button>

            {/* Post Cover Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-stone-200">
              <img
                src={activePost.coverUrl || "https://picsum.photos/seed/blog/1200/675"}
                alt={activePost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-stone-500 border-b border-stone-200 pb-3">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>{activePost.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <BookOpen className="w-3 h-3 text-stone-400" />
                <span>{activePost.readTime} Baca</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                {activePost.category}
              </span>
            </div>

            {/* Header Content */}
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-stone-900 leading-tight">
              {activePost.title}
            </h1>

            {/* Post Rich Content Body */}
            <div className="prose prose-stone max-w-none pt-2">
              {renderContent(activePost.content)}
            </div>

            {/* Tags and Author sign-off */}
            <div className="pt-6 border-t border-stone-200 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {activePost.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center text-[9px] font-medium font-mono text-stone-600 bg-stone-100 px-2 py-1 rounded">
                    <Hash className="w-2.5 h-2.5 mr-0.5" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author footer */}
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-stone-100 border border-stone-200/50">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 flex-shrink-0">
              <img
                    src={resolveAvatarUrl(profile?.avatarUrl)}
                    alt="Teguh"
                    className="w-full h-full object-cover grayscale-0 hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Ditulis oleh Teguh Rahayu</h4>
                  <p className="text-[10px] text-stone-500 leading-normal">
                    Lulusan S1 Teknik Informatika & BNSP Program Analyst. Senang menyalurkan pemikiran di bidang IT Support & web engineering.
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ) : (
          /* Blog Grid List View */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Search Header */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pb-4 border-b border-stone-200/40">
              <div className="md:col-span-7 space-y-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                  Tinjauan Teknologi & Pemikiran
                </h1>
                <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
                  Ruang berbagi pengalaman seputar koding, analisis sistem, tantangan IT Support, dan inovasi basis data.
                </p>
              </div>

              {/* Search Bar Input */}
              <div className="md:col-span-5 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari artikel, topik, atau tag..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900 focus:ring-1 focus:ring-stone-900/60 placeholder:text-stone-400"
                />
              </div>
            </section>

            {/* Articles Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActivePostId(post.id)}
                  className="group flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer minimal-card hover:shadow-md"
                >
                  {/* Aspect Video Cover */}
                  <div className="relative aspect-video w-full bg-stone-100 overflow-hidden border-b border-stone-100">
                    <img
                      src={post.coverUrl || "https://picsum.photos/seed/blog/800/450"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="bg-stone-900/80 backdrop-blur-xs text-stone-50 text-[9px] font-mono tracking-wider font-bold px-2.5 py-0.5 rounded capitalize">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card text */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{post.date}</span>
                        </span>
                        <span>•</span>
                        <span>{post.readTime} Baca</span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom Tags */}
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-stone-100">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="text-stone-600 text-[9px] uppercase tracking-wide px-1.5 py-0.5 bg-stone-100 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 border rounded-xl bg-stone-100 border-dashed border-stone-300">
                <p className="text-stone-600 text-xs">Artikel tidak ditemukan.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
