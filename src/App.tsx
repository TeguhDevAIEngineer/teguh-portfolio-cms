import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import AdminSection from "./components/AdminSection";

import { 
  INITIAL_PROFILE, 
  INITIAL_EXPERIENCES, 
  INITIAL_PROJECTS, 
  INITIAL_POSTS, 
  INITIAL_MESSAGES 
} from "./data";
import { Profile, Experience, Project, BlogPost, ContactMessage } from "./types";
import { Award, Heart, ShieldAlert } from "lucide-react";

export default function App() {
  // Navigation Tab State
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [activeBlogPostId, setActiveBlogPostId] = useState<string | null>(null);

  // Core Persistence States
  const [profile, _setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [projects, _setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [posts, _setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [messages, _setMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);

  // On mount: load from localStorage if existing
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("teguh_profile");
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        // Force upgrade to the newly uploaded actual photo
        if (parsed && (!parsed.avatarUrl || !parsed.avatarUrl.includes("teguh_profile01.png"))) {
          parsed.avatarUrl = "/src/assets/images/teguh_profile01.png";
          localStorage.setItem("teguh_profile", JSON.stringify(parsed));
        }
        _setProfile(parsed);
      }

      const savedProjects = localStorage.getItem("teguh_projects");
      if (savedProjects) _setProjects(JSON.parse(savedProjects));

      const savedPosts = localStorage.getItem("teguh_posts");
      if (savedPosts) {
        const parsed = JSON.parse(savedPosts);
        if (Array.isArray(parsed)) {
          let updated = false;
          const updatedPosts = parsed.map((post: BlogPost) => {
            if (post.id === "post-2" && (!post.coverUrl || post.coverUrl.includes("photo-1677442136019-21780efad99a"))) {
              post.coverUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
              updated = true;
            }
            return post;
          });
          if (updated) {
            localStorage.setItem("teguh_posts", JSON.stringify(updatedPosts));
            _setPosts(updatedPosts);
          } else {
            _setPosts(parsed);
          }
        } else {
          _setPosts(parsed);
        }
      }

      const savedMessages = localStorage.getItem("teguh_messages");
      if (savedMessages) _setMessages(JSON.parse(savedMessages));
    } catch (e) {
      console.error("Local storage restoration failed:", e);
    }
  }, []);

  // Sync state wrappers
  const updateProfile = (newProfile: Profile) => {
    _setProfile(newProfile);
    localStorage.setItem("teguh_profile", JSON.stringify(newProfile));
  };

  const updateProjects = (newProjects: Project[]) => {
    _setProjects(newProjects);
    localStorage.setItem("teguh_projects", JSON.stringify(newProjects));
  };

  const updatePosts = (newPosts: BlogPost[]) => {
    _setPosts(newPosts);
    localStorage.setItem("teguh_posts", JSON.stringify(newPosts));
  };

  const updateMessages = (newMessages: ContactMessage[]) => {
    _setMessages(newMessages);
    localStorage.setItem("teguh_messages", JSON.stringify(newMessages));
  };

  // Callback to insert contact inquiry
  const handleAddMessage = (msgData: Omit<ContactMessage, "id" | "date" | "read">) => {
    const newMessage: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString(),
      read: false
    };
    const updated = [newMessage, ...messages];
    updateMessages(updated);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navbar Header */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} isAdminMode={currentTab === "admin"} />

      {/* Main Container */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {currentTab === "home" && (
          <HomeSection 
            profile={profile} 
            experiences={INITIAL_EXPERIENCES} 
            setCurrentTab={setCurrentTab} 
          />
        )}

        {currentTab === "projects" && (
          <ProjectsSection projects={projects} />
        )}

        {currentTab === "blog" && (
          <BlogSection 
            posts={posts} 
            activePostId={activeBlogPostId} 
            setActivePostId={setActiveBlogPostId} 
            profile={profile}
          />
        )}

        {currentTab === "contact" && (
          <ContactSection onSubmitMessage={handleAddMessage} />
        )}

        {currentTab === "admin" && (
          <AdminSection
            profile={profile}
            setProfile={updateProfile}
            projects={projects}
            setProjects={updateProjects}
            posts={posts}
            setPosts={updatePosts}
            messages={messages}
            setMessages={updateMessages}
          />
        )}
      </main>

      {/* Footer Branding Area */}
      <footer className="bg-white border-t border-stone-200 py-8 text-stone-500 font-sans mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-xs font-bold text-stone-900 font-serif">Teguh Rahayu</p>
            <p className="text-[10px] text-stone-500 font-mono">Muara Teweh, Kalimantan Tengah — Indonesia</p>
          </div>

          <div className="flex items-center space-x-2 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-lg text-[10px] font-medium font-mono text-stone-700">
            <Award className="w-3.5 h-3.5 text-stone-500" />
            <span>Sertifikasi BNSP Program Analyst</span>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p className="text-[10px] leading-relaxed">
              &copy; {new Date().getFullYear()} Teguh Rahayu. Semua Hak Dilindungi.
            </p>
            <p className="text-[9px] text-stone-400 font-mono tracking-widest flex items-center justify-center sm:justify-end gap-1 uppercase">
              Desain Minimalis <Heart className="w-2 h-2 text-stone-500 fill-stone-500" /> React App
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
