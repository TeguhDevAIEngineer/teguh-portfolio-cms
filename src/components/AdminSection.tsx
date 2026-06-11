import React, { useState } from "react";
import { 
  Settings, User, FolderKanban, FileText, Inbox, 
  Plus, Edit, Trash2, Save, Sparkles, CheckSquare, 
  Square, Eye, Briefcase, PlusCircle, Trash, Check, Loader2 
} from "lucide-react";
import { Profile, Experience, Project, BlogPost, ContactMessage } from "../types";
import { resolveAvatarUrl } from "../imageResolver";

interface AdminSectionProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  posts: BlogPost[];
  setPosts: (posts: BlogPost[]) => void;
  messages: ContactMessage[];
  setMessages: (messages: ContactMessage[]) => void;
}

type AdminSubTab = "profile" | "projects" | "posts" | "inbox";

export default function AdminSection({
  profile,
  setProfile,
  projects,
  setProjects,
  posts,
  setPosts,
  messages,
  setMessages
}: AdminSectionProps) {
  const [subTab, setSubTab] = useState<AdminSubTab>("profile");

  // State for Project Forms
  const [isEditingProject, setIsEditingProject] = useState<string | null>(null); // "new" or id
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: "",
    category: "coding",
    description: "",
    tags: [],
    imageUrl: "",
    projectUrl: "",
    githubUrl: "",
    date: ""
  });
  const [projectTagInput, setProjectTagInput] = useState("");

  // State for Blog Post Forms
  const [isEditingPost, setIsEditingPost] = useState<string | null>(null); // "new" or id
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    coverUrl: "",
    readTime: "5 Menit"
  });
  const [postTagInput, setPostTagInput] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Profile Edit fields
  const [profileForm, setProfileForm] = useState<Profile>({ ...profile });
  const [profileSkillInput, setProfileSkillInput] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file terlalu besar! Silakan unggah foto dengan ukuran kurang dari 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setProfileForm((prev) => ({ ...prev, avatarUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler submissions
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(profileForm);
    alert("Profil berhasil diperbarui!");
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileSkillInput.trim()) {
      const updatedSkills = [...profileForm.skills, profileSkillInput.trim()];
      setProfileForm({ ...profileForm, skills: updatedSkills });
      setProfileSkillInput("");
    }
  };

  const handleRemoveSkill = (idx: number) => {
    const updatedSkills = profileForm.skills.filter((_, i) => i !== idx);
    setProfileForm({ ...profileForm, skills: updatedSkills });
  };

  // Projects actions
  const startNewProject = () => {
    setProjectForm({
      title: "",
      category: "coding",
      description: "",
      tags: [],
      imageUrl: "",
      projectUrl: "",
      githubUrl: "",
      date: new Date().toISOString().substring(0, 7) // "YYYY-MM"
    });
    setProjectTagInput("");
    setIsEditingProject("new");
  };

  const startEditProject = (proj: Project) => {
    setProjectForm({ ...proj });
    setProjectTagInput(proj.tags.join(", "));
    setIsEditingProject(proj.id);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = projectTagInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const finalProject: Project = {
      id: isEditingProject === "new" ? `proj-${Date.now()}` : (isEditingProject as string),
      title: projectForm.title || "Karya Baru",
      category: projectForm.category || "coding",
      description: projectForm.description || "",
      tags: tagsArray,
      imageUrl: projectForm.imageUrl || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      projectUrl: projectForm.projectUrl || "#",
      githubUrl: projectForm.githubUrl || "#",
      date: projectForm.date || new Date().toISOString().substring(0, 7),
    };

    if (isEditingProject === "new") {
      setProjects([finalProject, ...projects]);
    } else {
      setProjects(projects.map((p) => (p.id === isEditingProject ? finalProject : p)));
    }

    setIsEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // Blog post actions
  const startNewPost = () => {
    setPostForm({
      title: "",
      category: "IT Support",
      excerpt: "",
      content: "",
      tags: [],
      coverUrl: "",
      readTime: "4 Menit"
    });
    setPostTagInput("");
    setAiPrompt("");
    setIsEditingPost("new");
  };

  const startEditPost = (post: BlogPost) => {
    setPostForm({ ...post });
    setPostTagInput(post.tags.join(", "));
    setAiPrompt("");
    setIsEditingPost(post.id);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = postTagInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const finalPost: BlogPost = {
      id: isEditingPost === "new" ? `post-${Date.now()}` : (isEditingPost as string),
      title: postForm.title || "Tulisan Baru",
      category: postForm.category || "Umum",
      excerpt: postForm.excerpt || "",
      content: postForm.content || "",
      tags: tagsArray,
      coverUrl: postForm.coverUrl || "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
      readTime: postForm.readTime || "4 Menit",
      date: new Date().toISOString().split("T")[0] // "YYYY-MM-DD"
    };

    if (isEditingPost === "new") {
      setPosts([finalPost, ...posts]);
    } else {
      setPosts(posts.map((p) => (p.id === isEditingPost ? finalPost : p)));
    }

    setIsEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel blog ini?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  // Gemini AI Helper draft generator
  const handleGenerateAiDraft = async () => {
    if (!aiPrompt.trim()) {
      alert("Masukkan topik atau ide tulisan terlebih dahulu.");
      return;
    }
    setIsAiLoading(true);

    try {
      const response = await fetch("/api/gemini/helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: aiPrompt, 
          type: subTab === "posts" ? "blog" : "project",
          currentText: subTab === "posts" ? postForm.content : projectForm.description
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (subTab === "posts") {
        setPostForm(prev => ({
          ...prev,
          content: data.text
        }));
      } else {
        setProjectForm(prev => ({
          ...prev,
          description: data.text
        }));
      }
      alert("Draf AI berhasil dimasukkan ke kolom konten!");
    } catch (err: any) {
      console.error(err);
      alert(`Gagal membuat draf AI: ${err.message}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Inbox operations
  const toggleReadMessage = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesan inkuiri klien ini?")) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      {/* CMS Dashboard Title */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center space-x-3 text-stone-400">
          <Settings className="w-5 h-5 animate-spin-slow" />
          <span className="text-xs font-mono font-medium tracking-widest uppercase">Admin Dashboard</span>
        </div>
        <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
          Sistem Manajemen Konten Independen
        </h1>
        <p className="text-stone-300 text-xs leading-relaxed max-w-2xl">
          Lakukan pembaruan profil, hasil karya kreatif koding, konten artikel blog, maupun manajemen pesan inkuiri klien potensial tanpa mengubah kode sumber sama sekali. Perubahan disimpan seketika di peramban Anda.
        </p>
      </section>

      {/* Main Grid Sidebar + Content area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="md:col-span-3 bg-white rounded-xl border border-stone-200 p-2 space-y-1 shadow-3xs">
          {[
            { id: "profile", label: "Kelola Profil", icon: User, badge: null },
            { id: "projects", label: "Kelola Karya", icon: FolderKanban, badge: projects.length },
            { id: "posts", label: "Kelola Blog", icon: FileText, badge: posts.length },
            { id: "inbox", label: "Kotak Masuk Klien", icon: Inbox, badge: unreadCount ? `${unreadCount} Unread` : null },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = subTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSubTab(item.id as AdminSubTab);
                  setIsEditingProject(null);
                  setIsEditingPost(null);
                }}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold leading-none transition-all duration-200 ${
                  isActive
                    ? "bg-stone-900 text-stone-50"
                    : "text-stone-600 hover:text-stone-950 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    isActive 
                      ? "bg-stone-850 text-stone-200" 
                      : item.id === "inbox" && unreadCount > 0 
                        ? "bg-red-500 text-stone-50" 
                        : "bg-stone-100 text-stone-500"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Panel Area */}
        <div className="md:col-span-9 bg-stone-50 p-0 md:p-1 space-y-6">

          {/* SUB-TAB 1: PROFILE MANAGEMENT */}
          {subTab === "profile" && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-3xs space-y-6">
              <h3 className="font-serif text-sm font-bold text-stone-900 border-b pb-2">
                Manajemen Informasi & Biografi Penulis
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* Photo Upload & Preview Section */}
                <div id="photo-upload-section" className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 flex-shrink-0">
                      <img
                        src={resolveAvatarUrl(profileForm.avatarUrl)}
                        alt="Current Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <h4 className="text-xs font-semibold text-stone-900 font-serif">Foto Profil & Wajah Asli Anda</h4>
                      <p className="text-[10px] text-stone-500 leading-normal">
                        Unggah foto berlatar merah atau biru asli milik Anda di sini. Jangan biarkan wajah asli Anda terdistorsi oleh kecerdasan buatan! Ukuran maksimal 5MB.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <label className="cursor-pointer inline-flex items-center space-x-1 bg-stone-900 text-stone-50 text-[10px] sm:text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-stone-800 shadow-3xs transition">
                          <span>Pilih Foto Komputer Anda</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                        </label>
                        
                        {profileForm.avatarUrl !== "/src/assets/images/teguh_profile01.png" && (
                          <button
                            type="button"
                            onClick={() => setProfileForm(prev => ({ ...prev, avatarUrl: "/src/assets/images/teguh_profile01.png" }))}
                            className="text-[10px] sm:text-xs px-3 py-1.5 rounded-lg font-bold border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 transition"
                          >
                            Reset ke Foto Default
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wide block">Atau Tempel Tautan Gambar (URL) Alternatif</label>
                    <input
                      type="text"
                      className="w-full text-[11px] px-3 py-1.5 border border-stone-300 rounded-lg text-stone-900 bg-white font-mono"
                      placeholder="https://example.com/foto-anda.jpg"
                      value={profileForm.avatarUrl || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Nama Lengkap</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Gelar / Bidang</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">Pendidikan (Ringkas)</label>
                  <input
                    type="text"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white"
                    value={profileForm.education}
                    onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">Biografi Pitching</label>
                  <textarea
                    rows={4}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white resize-none"
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Email</label>
                    <input
                      type="email"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Telepon / WhatsApp</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Domisili Kantor</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">LinkedIn Profile Link</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    />
                  </div>
                </div>

                {/* Manage skills inside profile form */}
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <label className="text-[10px] font-bold text-stone-500 uppercase block">Daftar Keahlian Utama ({profileForm.skills.length})</label>
                  <div className="flex flex-wrap gap-2 pb-3">
                    {profileForm.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1 bg-stone-100 border text-stone-700 text-xs px-2.5 py-1 rounded"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(idx)}
                          className="text-stone-400 hover:text-red-500 ml-1 cursor-pointer focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Masukkan keahlian baru (misal: Java, Tailwind)"
                      className="text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white flex-1"
                      value={profileSkillInput}
                      onChange={(e) => setProfileSkillInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-850 rounded-lg text-xs font-bold border"
                    >
                      Tambah
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 bg-stone-900 text-stone-50 px-4 py-2 rounded-lg text-xs font-bold hover:bg-stone-800"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Perubahan Hub</span>
                  </button>
                </div>
              </form>
            </div>
          )}


          {/* SUB-TAB 2: PROJECTS MANAGEMENT */}
          {subTab === "projects" && (
            <div className="space-y-6">
              {isEditingProject === null ? (
                /* Projects Listing */
                <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-3xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-serif text-sm font-bold text-stone-900">
                      Kelola Portofolio Hasil Karya ({projects.length})
                    </h3>
                    <button
                      onClick={startNewProject}
                      className="inline-flex items-center space-x-1 bg-stone-900 text-stone-50 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-stone-800 transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Proyek</span>
                    </button>
                  </div>

                  {/* List visual items */}
                  <div className="divide-y divide-stone-100">
                    {projects.map((proj) => (
                      <div key={proj.id} className="flex items-center justify-between py-3.5 h-16">
                        <div className="flex items-center space-x-3.5 overflow-hidden">
                          <div className="w-12 h-8 rounded-md overflow-hidden bg-stone-100 border">
                            <img src={proj.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="referrer" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-stone-900 truncate max-w-sm sm:max-w-md">{proj.title}</h4>
                            <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-400 mt-0.5">
                              <span className="uppercase">{proj.category}</span>
                              <span>•</span>
                              <span>{proj.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          <button
                            onClick={() => startEditProject(proj)}
                            className="p-1 text-stone-500 hover:text-stone-900 rounded hover:bg-stone-100"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1 text-stone-500 hover:text-red-600 rounded hover:bg-stone-100"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Projects Form Editor */
                <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-3xs space-y-6">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-serif text-sm font-bold text-stone-900">
                      {isEditingProject === "new" ? "Tambah Karya Karya Baru" : "Edit Proyek Portofolio"}
                    </h3>
                    <button
                      onClick={() => setIsEditingProject(null)}
                      className="text-stone-500 hover:text-stone-900 text-xs font-semibold"
                    >
                      Batal
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">Judul Proyek</label>
                        <input
                          type="text"
                          required
                          className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">Kategori Proyek</label>
                        <select
                          className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                        >
                          <option value="coding">Coding & Rekayasa Perangkat Lunak</option>
                          <option value="creative">Visual & Desain Kreatif</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase">Deskripsi Ringkas</label>
                      <textarea
                        rows={3}
                        required
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">Bulan / Tahun (YYYY-MM)</label>
                        <input
                          type="month"
                          className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                          value={projectForm.date}
                          onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">URL Gambar Thumbnail</label>
                        <input
                          type="text"
                          className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                          value={projectForm.imageUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">Tautan Github / Source</label>
                        <input
                          type="text"
                          className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                          value={projectForm.githubUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">Tautan Demo Live</label>
                        <input
                          type="text"
                          className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                          value={projectForm.projectUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, projectUrl: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase">Teks Tag Eksplanatif (Dipisahkan koma)</label>
                      <input
                        type="text"
                        placeholder="React, Tailwind, Express"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                        value={projectTagInput}
                        onChange={(e) => setProjectTagInput(e.target.value)}
                      />
                    </div>

                    <div className="pt-4 border-t flex space-x-2">
                      <button
                        type="submit"
                        className="inline-flex items-center space-x-2 bg-stone-900 text-stone-50 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-stone-850"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Proyek</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProject(null)}
                        className="px-4 py-2.5 border text-stone-600 hover:text-stone-900 rounded-lg text-xs font-medium"
                      >
                        Kembali
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}


          {/* SUB-TAB 3: BLOGS MANAGEMENT (With Gemini AI content draft creator!) */}
          {subTab === "posts" && (
            <div className="space-y-6">
              {isEditingPost === null ? (
                /* Blogs feed listing */
                <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-3xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-serif text-sm font-bold text-stone-900">
                      Kelola Koleksi Artikel Blog ({posts.length})
                    </h3>
                    <button
                      onClick={startNewPost}
                      className="inline-flex items-center space-x-1 bg-stone-900 text-stone-50 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-stone-800 transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Artikel</span>
                    </button>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {posts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between py-3.5">
                        <div className="overflow-hidden space-y-0.5">
                          <h4 className="text-xs font-bold text-stone-900 truncate max-w-sm sm:max-w-md">{post.title}</h4>
                          <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-400">
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startEditPost(post)}
                            className="p-1 text-stone-500 hover:text-stone-900 rounded hover:bg-stone-100"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1 text-stone-500 hover:text-red-600 rounded hover:bg-stone-100"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Blogs Editor Form with Gemini proxy */
                <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-3xs space-y-6">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-serif text-sm font-bold text-stone-900">
                      {isEditingPost === "new" ? "Tulis Artikel Blog Baru" : "Edit Artikel Blog"}
                    </h3>
                    <button
                      onClick={() => setIsEditingPost(null)}
                      className="text-stone-500 hover:text-stone-900 text-xs font-semibold"
                    >
                      Batal
                    </button>
                  </div>

                  {/* Dynamic Gemini AI Assistant Drawer embedded directly into CMS */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center space-x-2 font-serif text-xs font-bold text-stone-900">
                      <Sparkles className="w-4 h-4 text-stone-800 animate-pulse" />
                      <span>Asisten AI Penulis Blog (Bertenaga Gemini 3.5 API)</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-normal">
                      Apakah Anda kesulitan merangkai kata? Masukkan topik ringkas di bawah, asisten pintar kami akan menyusun draf tulisan profesional dalam sekejap.
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch gap-2">
                      <input
                        type="text"
                        placeholder="Contoh: Tulis tips dasar mengamankan database SQL dari serangan hacker..."
                        className="text-xs px-3 py-2 border border-stone-300 rounded-lg text-stone-950 bg-white flex-1"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        disabled={isAiLoading}
                      />
                      <button
                        type="button"
                        onClick={handleGenerateAiDraft}
                        disabled={isAiLoading}
                        className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-stone-50 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 whitespace-nowrap"
                      >
                        {isAiLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Mendraf...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Ketik Draf AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSavePost} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase">Judul Artikel</label>
                      <input
                        type="text"
                        required
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">Kategori</label>
                        <input
                          type="text"
                          required
                          placeholder="IT Support, Pemrograman, Web"
                          className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                          value={postForm.category}
                          onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-500 uppercase">Estimasi Waktu Baca (misal: 5 Menit)</label>
                        <input
                          type="text"
                          className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                          value={postForm.readTime}
                          onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase">Ekserp / Cuplikan Singkat</label>
                      <input
                        type="text"
                        required
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase">URL Gambar Sampul</label>
                      <input
                        type="text"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                        value={postForm.coverUrl}
                        onChange={(e) => setPostForm({ ...postForm, coverUrl: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase">Teks Tag (Dipisahkan koma)</label>
                      <input
                        type="text"
                        placeholder="Fungsional, Database, Maintenance"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white"
                        value={postTagInput}
                        onChange={(e) => setPostTagInput(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-500 uppercase">Lengkap Konten Artikel (Mendukung Format Markdown)</label>
                      <textarea
                        rows={10}
                        required
                        placeholder="Tulis artikel berkualitas di sini..."
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg bg-white font-mono leading-relaxed"
                        value={postForm.content}
                        onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="pt-4 border-t flex space-x-2">
                      <button
                        type="submit"
                        className="inline-flex items-center space-x-2 bg-stone-900 text-stone-50 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-stone-850"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Artikel</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingPost(null)}
                        className="px-4 py-2.5 border text-stone-600 hover:text-stone-900 rounded-lg text-xs font-medium"
                      >
                        Kembali
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}


          {/* SUB-TAB 4: CLIENT INBOX LISTING */}
          {subTab === "inbox" && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-3xs space-y-4">
              <h3 className="font-serif text-sm font-bold text-stone-900 border-b pb-2">
                Kotak Masuk Kontak & Inkuiri Klien ({messages.length})
              </h3>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  Belum ada pesan inkuiri yang masuk ke kotak saran Anda.
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`p-4 rounded-xl border transition-all ${
                        msg.read 
                          ? "bg-white border-stone-200/60 opacity-80" 
                          : "bg-stone-50 border-stone-300 font-medium scale-[1.01] shadow-3xs"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-2 border-b border-stone-200/50">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-stone-950">{msg.name}</span>
                            {!msg.read && (
                              <span className="bg-stone-950 text-stone-50 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase scale-90">NEW</span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-500">{msg.email} {msg.company ? `| ${msg.company}` : ""}</span>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 self-start sm:self-center">
                          {new Date(msg.date).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed pt-2.5 whitespace-pre-wrap">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-end space-x-2 pt-3 mt-3 border-t border-stone-100">
                        <button
                          onClick={() => toggleReadMessage(msg.id)}
                          className="inline-flex items-center space-x-1 text-[10px] font-bold text-stone-600 hover:text-stone-950 border px-2 py-1 rounded bg-white hover:bg-stone-50"
                        >
                          {msg.read ? (
                            <>
                              <Square className="w-3 h-3 text-stone-400" />
                              <span>Tandai Belum Dibaca</span>
                            </>
                          ) : (
                            <>
                              <CheckSquare className="w-3 h-3 text-stone-700" />
                              <span>Tandai Sudah Dibaca</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="inline-flex items-center space-x-1 text-[10px] font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 px-2 py-1 rounded"
                        >
                          <Trash className="w-3 h-3" />
                          <span>Hapus Pesan</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
