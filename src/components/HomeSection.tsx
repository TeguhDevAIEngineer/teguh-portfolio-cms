import React from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Phone, Linkedin, Award, BookOpen, Briefcase, ChevronRight, Check } from "lucide-react";
import { Profile, Experience } from "../types";
import { resolveAvatarUrl } from "../imageResolver";

interface HomeSectionProps {
  profile: Profile;
  experiences: Experience[];
  setCurrentTab: (tab: string) => void;
}

export default function HomeSection({ profile, experiences, setCurrentTab }: HomeSectionProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2 bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-stone-900 rounded-full animate-pulse"></span>
                <span>Tersedia untuk Freelance & Kontrak</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
                Halo, saya <span className="underline decoration-stone-400 decoration-wavy underline-offset-4">{profile.name}</span>
              </h1>
              <p className="font-sans text-sm sm:text-base md:text-lg font-semibold text-stone-600">
                {profile.title}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl"
            >
              {profile.bio}
            </motion.p>

            {/* Contact Details Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-y-3 gap-x-5 text-xs text-stone-600 pt-2"
            >
              <div className="flex items-center space-x-2 bg-white/60 px-3 py-1.5 rounded-lg border border-stone-200/50">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{profile.location}</span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center space-x-2 bg-white/60 px-3 py-1.5 rounded-lg border border-stone-200/50 hover:border-stone-400 hover:text-stone-950 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center space-x-2 bg-white/60 px-3 py-1.5 rounded-lg border border-stone-200/50 hover:border-stone-400 hover:text-stone-950 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>{profile.phone}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 bg-white/60 px-3 py-1.5 rounded-lg border border-stone-200/50 hover:border-stone-400 hover:text-stone-950 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-stone-400" />
                <span>LinkedIn</span>
              </a>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-4 pt-3"
            >
              <button
                onClick={() => setCurrentTab("projects")}
                className="inline-flex items-center space-x-2 bg-stone-900 text-stone-50 text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-stone-850 transition-colors shadow-xs"
              >
                <span>Lihat Hasil Karya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentTab("contact")}
                className="inline-flex items-center text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-stone-100 transition-colors border border-stone-200"
              >
                <span>Hubungi Saya</span>
              </button>
            </motion.div>
          </div>

          {/* Minimalist Profile Graphic */}
          <div className="md:col-span-4 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-sm bg-stone-200 border-4 border-white"
            >
              <img
                src={resolveAvatarUrl(profile.avatarUrl)}
                alt={profile.name}
                className="w-full h-full object-cover grayscale-0 transition-all duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-stone-50 text-[10px] font-mono tracking-widest text-center uppercase bg-stone-900/60 backdrop-blur-xs py-1 rounded">
                S1 TEKNIK INFORMATIKA
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid: Skills, Education, & Certifications */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Technical Competencies list */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="font-serif text-lg font-bold text-stone-900">Keahlian Teknis</h2>
            <div className="h-px flex-1 bg-stone-200"></div>
          </div>
          <p className="text-stone-500 text-xs">Pilar keahlian pemrograman, IT maintenance, dan struktur basis data:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-start space-x-2.5 p-3 rounded-lg border border-stone-200 bg-white shadow-3xs"
              >
                <div className="p-1 bg-stone-100 rounded-md text-stone-700 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">{skill}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certs */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h2 className="font-serif text-lg font-bold text-stone-900">Pendidikan</h2>
              <div className="h-px flex-1 bg-stone-200"></div>
            </div>
            <div className="p-4 rounded-lg bg-stone-100 border border-stone-200/80 space-y-3">
              <div>
                <div className="flex items-center space-x-2 text-stone-750">
                  <BookOpen className="w-4 h-4 text-stone-600 flex-shrink-0" />
                  <span className="text-xs font-bold font-mono">2020 – 2025</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 mt-1">S1 Teknik Informatika</h4>
                <p className="text-[11px] text-stone-600 font-medium">
                  Universitas Islam Kalimantan Muhammad Arsyad Al Banjari
                </p>
              </div>

              <div className="pt-2.5 border-t border-stone-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest block font-mono">JUDUL SKRIPSI (THESIS)</span>
                  <span className="text-[9px] font-bold text-stone-500 font-mono bg-stone-200/50 px-1.5 py-0.5 rounded text-right">NPM: 2010010703</span>
                </div>
                <p className="text-[11px] font-bold text-stone-850 leading-snug">
                  Aplikasi Manajemen Pendaftaran Dan Kegiatan Magang Berbasis Web Di Badan Pengembangan Sumber Daya Manusia Daerah Provinsi Kalimantan Selatan
                </p>
                <div className="text-[10px] text-stone-500 italic mt-0.5 font-light">
                  Diajukan sebagai persyaratan menyelesaikan Program Sarjana (S-1) Teknik Informatika - Lulus Tahun 2025.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h2 className="font-serif text-lg font-bold text-stone-900">Sertifikasi</h2>
              <div className="h-px flex-1 bg-stone-200"></div>
            </div>
            <div className="space-y-2.5">
              {profile.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <Award className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-stone-700 font-medium leading-tight">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">Pengalaman Profesional</h2>
          <div className="h-px flex-1 bg-stone-200"></div>
        </div>

        <div className="relative border-l-2 border-stone-200 pl-4 ml-2 space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline pin point */}
              <div className="absolute -left-[25px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-stone-900 bg-stone-50 group-hover:bg-stone-900 transition-colors duration-200"></div>

              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 font-mono tracking-tight group-hover:text-stone-700 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-xs text-stone-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="inline-block px-2.5 py-1 rounded bg-stone-100 text-stone-700 text-[10px] font-mono font-medium self-start sm:self-center">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-1.5">
                  {exp.bullets.map((bullet, k) => (
                    <li key={k} className="text-xs text-stone-500 leading-relaxed flex items-start space-x-1.5">
                      <span className="text-stone-400 mt-1 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
