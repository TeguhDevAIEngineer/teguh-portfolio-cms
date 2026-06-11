import { Project, BlogPost, Profile, Experience, ContactMessage } from "./types";

export const INITIAL_PROFILE: Profile = {
  name: "Teguh Rahayu",
  title: "Full-Stack Web Developer & Program Analyst",
  bio: "Lulusan S1 Teknik Informatika dari Universitas Islam Kalimantan Muhammad Arsyad Al Banjari. Berpengalaman di bidang IT Support, administrasi data, serta berfokus pada pengembangan sistem informasi berbasis web yang interaktif, responsif, dan bernilai guna tinggi.",
  location: "Muara Teweh, Kalimantan Tengah",
  email: "rahayuteguh953@gmail.com",
  phone: "082148354854",
  linkedin: "https://www.linkedin.com/in/teguh-rahayu",
  github: "https://github.com",
  education: "S1 Teknik Informatika, Universitas Islam Kalimantan Muhammad Arsyad Al Banjari (2020 – 2025)",
  avatarUrl: "/src/assets/images/teguh_profile01.png",
  certifications: [
    "Sertifikasi Profesi BNSP – Program Analyst",
    "Sertifikat Magang BPSDMD Kalsel",
    "Sertifikat Magang PT Dhanista Surya Nusantara"
  ],
  skills: [
    "Sistem Informasi Berbasis Web",
    "Pengelolaan Database",
    "Dokumentasi & Maintenance Sistem",
    "Pemanfaatan Teknologi untuk Efisiensi",
    "Pengelolaan Data Administrasi Komputer",
    "Maintenance Software, Hardware, Jaringan"
  ]
};

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    company: "Warehouse JNT Express Banjarmasin",
    role: "Staff Gudang / Sortir Paket",
    period: "2025 – 2026",
    bullets: [
      "Melakukan proses sortir dan distribusi paket sesuai tujuan pengiriman secara tepat waktu.",
      "Memastikan keakuratan data barang masuk dan keluar area gudang logistik.",
      "Mengoperasikan sistem scanning terintegrasi untuk melacak status paket (tracking).",
      "Bekerja sama secara aktif dalam tim untuk menjaga kecepatan ritme distribusi.",
      "Menjaga aspek kerapihan, tata letak, dan keamanan seluruh barang di area pergudangan."
    ]
  },
  {
    company: "BPSDMD Provinsi Kalimantan Selatan",
    role: "Staff Administrasi & IT Support (Magang)",
    period: "2023",
    bullets: [
      "Membantu persiapan teknis kegiatan pendidikan pelatihan (diklat) serta operasional instansi harian.",
      "Melakukan pengecekan rutin dan perawatan (maintenance) perangkat IT, audio visual, dan komputer kantor.",
      "Mendukung pengelolaan administrasi harian, entri data, serta penyusunan rekapitulasi data kegiatan.",
      "Membantu dokumentasi multimedia dan pengarsipan data kepegawaian secara terstruktur."
    ]
  },
  {
    company: "PT Dhanista Surya Nusantara",
    role: "Staff Administrasi & IT Support (Magang)",
    period: "2019",
    bullets: [
      "Mengelola administrasi persuratan dan pengolahan data aset internal perusahaan.",
      "Melakukan maintenance komputer, printer, scanner serta perbaikan kendala jaringan lokal instansi.",
      "Memberikan dukungan bantuan teknis (helpdesk IT) bagi pengguna yang mengalami gangguan sistem koding atau administratif.",
      "Melakukan monitoring berkala pada sistem penyimpanan database perusahaan untuk memastikan kontinuitas.",
      "Menangani kendala operasional dengan cepat dan mengajukan solusi penyelesaian secara kreatif."
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-skripsi",
    title: "Skripsi: Aplikasi Pendaftaran & Kegiatan Magang - BPSDMD Kalsel",
    description: "Aplikasi manajemen pendaftaran dan monitoring kegiatan magang berbasis web yang dirancang khusus untuk Badan Pengembangan Sumber Daya Manusia Daerah (BPSDMD) Provinsi Kalimantan Selatan. Sistem ini mengotomatisasi alur pendaftaran, penyerahan berkas, validasi admin, hingga pengisian logbook kegiatan harian peserta diklat/magang secara terintegrasi.",
    category: "coding",
    tags: ["Skripsi", "Sistem Informasi", "MySQL", "BPSDMD Kalsel", "Web Application"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    projectUrl: "#",
    githubUrl: "https://github.com/teguh-rahayu",
    date: "2025-01"
  },
  {
    id: "proj-1",
    title: "Sistem Informasi Portofolio & Personal CMS",
    description: "Sistem portofolio pribadi modern berbasis React yang responsif, dilengkapi dengan asisten cerdas Gemini AI terintegrasi untuk membantu pengolahan kata dan penyusunan draf konten blog & deskripsi karya secara instan.",
    category: "coding",
    tags: ["React", "Express", "Tailwind CSS", "Gemini AI", "Vite"],
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    projectUrl: "#",
    githubUrl: "https://github.com",
    date: "2026-06"
  },
  {
    id: "proj-2",
    title: "Sistem Ekspedisi Paket & Monitoring Gudang",
    description: "Prototipe aplikasi web untuk menyederhanakan pelacakan keluar-masuk barang pada gudang logistik JNT Express. Terintegrasi dengan database pencatatan stok, status kurir, serta scanner barcode internal.",
    category: "coding",
    tags: ["Node.js", "Express", "SQLite", "Lucide Icons"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    projectUrl: "#",
    githubUrl: "https://github.com/teguh-rahayu",
    date: "2025-11"
  },
  {
    id: "proj-3",
    title: "Dashboard Administrasi Peserta Diklat BPSDMD",
    description: "Desain visual dan prototipe fungsional dashboard manajemen kelulusan pelatihan untuk menyusun dokumentasi laporan kelulusan peserta diklat, menggantikan pendataan fisik tradisional secara efisien.",
    category: "creative",
    tags: ["UI/UX Layout", "Data Analytics", "Google Sheets API", "Figma Design"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    projectUrl: "#",
    githubUrl: "#",
    date: "2023-04"
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Pentingnya Mengatur Skema Database untuk Aplikasi Skala Menengah",
    excerpt: "Panduan praktis merancang arsitektur database yang efisien, terukur, dan aman untuk pengembang aplikasi web tingkat pemula dan menengah.",
    content: `Basis data (database) adalah fondasi dari setiap aplikasi modern. Database yang dirancang dengan buruk akan menyebabkan penurunan performa seiring bertambahnya data pengguna. Bagaimanapun, sebuah query yang lambat dapat membunuh pengalaman pengguna yang seharusnya menyenangkan.

Berikut adalah 3 pilar yang wajib dikuasai saat mendesain manajemen database:

### 1. Desain Skema yang Normal
Normalisasi database sangat penting untuk menghindari redundansi data. Pastikan setiap koleksi atau tabel berfokus pada satu entitas tunggal. Jangan mencampurkan data pembeli dengan transaksi barang dalam satu entitas besar tanpa relasi kunci yang jelas.

### 2. Gunakan Indeks (Indexing) secara Bijaksana
Indeks meningkatkan kecepatan kueri pencarian secara signifikan. Namun, terlalu banyak indeks akan memperlambat proses penulisan (INSERT/UPDATE). Pilih kolom yang paling sering digunakan dalam filter pencarian (WHERE) untuk diberikan indeks.

### 3. Rutin Melakukan Backup & Pengawasan
Sistem database yang andal harus memiliki strategi pemulihan bencana. Sebagai program analyst, pastikan pencadangan dilakukan secara otomatis dan terdistribusi di beberapa server secara terpisah.`,
    date: "2026-06-01",
    readTime: "5 Menit",
    category: "Database",
    tags: ["Database", "Web Dev", "IT Support", "Dunia IT"],
    coverUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "post-2",
    title: "Cara Kerja Asisten AI Melalui Gemini API Untuk CMS Mandiri",
    excerpt: "Memahami cara kerja server-side integration menggunakan SDK @google/genai terbaru untuk membantu mengoreksi tata bahasa tulisan deskripsi karya.",
    content: `Teknologi Large Language Model (LLM) seperti Gemini dari Google kini sangat mudah dipasang langsung pada aplikasi web modern. Dengan bantuan SDK terbaru \`@google/genai\`, developer hanya perlu membuat satu rute backend aman untuk menghubungkan formulir input dengan kecerdasan buatan.

### Keuntungan AI-Powered CMS:
1. **Otomatisasi Deskripsi**: Cukup masukkan baris ringkas ide proyek Anda, asisten AI akan menjabarkannya menjadi format resume profesional.
2. **Koreksi Bahasa**: Membantu memoles draf konten dalam bahasa Indonesia agar lebih enak dibaca dan persuasif bagi pihak klien.
3. **Format Presisi**: AI dapat diperintah untuk langsung memuntahkan draf tulisan dalam sintaks Markdown tanpa embel-embel teks pembuka dekoratif lainnya.

Penerapan ini sepenuhnya kita lakukan secara server-side agar kunci API krusial tetap tersembunyi dengan aman dan tidak bocor ke sisi peramban browser pengguna.`,
    date: "2026-05-15",
    readTime: "4 Menit",
    category: "AI & Koding",
    tags: ["Gemini AI", "Web Dev", "NextGen Tech"],
    coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Budi Santoso",
    email: "budi@corporate.co.id",
    company: "PT Maju Bersama Logistik",
    message: "Halo Teguh, saya melihat riwayat Anda yang pernah bekerja di Warehouse JNT dan memiliki background Teknik Informatika. Kami sedang membutuhkan asisten pengembang sistem pergudangan kami. Apakah Anda bisa menerima proyek lepas (freelance)? Mohon hubungi saya kembali.",
    date: "2026-06-05T10:15:00Z",
    read: false
  },
  {
    id: "msg-2",
    name: "Siti Rahma",
    email: "siti.rahma@gmail.com",
    message: "Halo, portofolionya sangat minimalis dan bersih sekali! Saya suka dengan cara penulisan artikel IT Support-nya. Semoga sukses terus karirnya ya!",
    date: "2026-06-03T14:30:00Z",
    read: true
  }
];
