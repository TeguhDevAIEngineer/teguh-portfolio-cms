import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle2 } from "lucide-react";
import { ContactMessage } from "../types";

interface ContactSectionProps {
  onSubmitMessage: (msg: Omit<ContactMessage, "id" | "date" | "read">) => void;
}

export default function ContactSection({ onSubmitMessage }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Harap isi semua kolom wajib (*)");
      return;
    }
    setErrorMsg("");
    onSubmitMessage({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
    });
    setIsSubmitted(true);
    setFormData({ name: "", email: "", company: "", message: "" });
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactOptions = [
    {
      title: "Kirim Surat Elektronik (Email)",
      value: "rahayuteguh953@gmail.com",
      link: "mailto:rahayuteguh953@gmail.com",
      icon: Mail,
      desc: "Respon dalam kurun waktu 24 jam.",
    },
    {
      title: "Telepon & WhatsApp",
      value: "+62 821-4835-4854",
      link: "tel:082148354854",
      icon: Phone,
      desc: "Senin – Sabtu, 08.00 - 17.00 WIB.",
    },
    {
      title: "Koneksi LinkedIn",
      value: "linkedin.com/in/teguh-rahayu",
      link: "https://www.linkedin.com/in/teguh-rahayu",
      icon: Linkedin,
      desc: "Terhubung untuk urusan karir profesional.",
    },
    {
      title: "Lokasi Kantor & Domisili",
      value: "Barito Utara, Kalimantan Tengah",
      icon: MapPin,
      desc: "Muara Teweh, Indonesia.",
    },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header Section */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Menjangkau Klien Potensial
        </h1>
        <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
          Apakah Anda membutuhkan asisten program analyst, pengelolaan database, pembuatan web, atau maintenance IT support? Mari berdiskusi tentang proyek kolaborasi Anda selanjutnya.
        </p>
      </section>

      {/* Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="font-serif text-sm font-bold text-stone-900 tracking-tight pb-2 border-b border-stone-200">
            Detail Kontak Saya
          </h3>

          <div className="space-y-3 pt-2">
            {contactOptions.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <div key={i} className="flex items-start space-x-3.5 p-3 rounded-lg border border-stone-200 bg-white">
                  <div className="p-2 bg-stone-100 rounded-lg text-stone-700 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest leading-none">
                      {opt.title}
                    </h4>
                    {opt.link ? (
                      <a
                        href={opt.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-stone-900 hover:underline leading-normal block break-all"
                      >
                        {opt.value}
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-stone-900 leading-normal block">
                        {opt.value}
                      </span>
                    )}
                    <span className="text-[10px] text-stone-500 block leading-none">
                      {opt.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form Submission */}
        <div className="md:col-span-7 bg-white rounded-xl border border-stone-200 p-6 shadow-3xs space-y-4">
          <h3 className="font-serif text-sm font-bold text-stone-900 tracking-tight">
            Kirim Formulir Inkuiri & Minat Kerja Sama
          </h3>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-stone-50 border border-stone-200 rounded-lg p-6 text-center space-y-3 flex flex-col items-center justify-center py-10"
            >
              <CheckCircle2 className="w-10 h-10 text-stone-800" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-stone-950">Terima Kasih!</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed max-w-sm">
                  Pesan Anda berhasil dikirimkan ke kotak masuk internal milik Teguh Rahayu. Pesan ini dapat langsung ditinjau oleh admin di halaman **Sistem CMS**.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="text-xs text-red-600 font-semibold bg-red-50 border border-red-200 p-2.5 rounded-md">
                  {errorMsg}
                </div>
              )}

              {/* Grid 2 Column for name/email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-hidden focus:border-stone-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Company / Hubungan */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Perusahaan / Instansi (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nama Perusahaan atau Instansi Pemerintah"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-hidden focus:border-stone-900"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Isi Pesan / Penawaran <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan detail tawaran pekerjaan atau projek Anda..."
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-hidden focus:border-stone-900 resize-none"
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-stone-900 text-stone-50 text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-stone-800 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Pesan Penawaran</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
