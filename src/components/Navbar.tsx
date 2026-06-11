import React, { useState } from "react";
import { Menu, X, Settings, User, Briefcase, FileText, Mail } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAdminMode: boolean;
}

export default function Navbar({ currentTab, setCurrentTab, isAdminMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Profil", icon: User },
    { id: "projects", label: "Karya & Proyek", icon: Briefcase },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "contact", label: "Kontak", icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-stone-50/85 backdrop-blur-md border-b border-stone-200/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                setCurrentTab("home");
                setIsOpen(false);
              }}
              className="group flex items-center space-x-2 text-stone-900 focus:outline-none"
            >
              <span className="font-serif text-lg font-bold tracking-tight">Teguh Rahayu</span>
              <span className="w-1.5 h-1.5 bg-stone-900 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-stone-900 text-stone-50 shadow-sm"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="h-4 w-px bg-stone-300"></div>

            {/* Admin Controls */}
            <button
              onClick={() => setCurrentTab("admin")}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                currentTab === "admin"
                  ? "bg-stone-900 text-stone-50 border-stone-900"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:text-stone-900 shadow-xs"
              }`}
            >
              <Settings className={`w-3.5 h-3.5 ${currentTab === "admin" ? "animate-spin-slow" : ""}`} />
              <span>Sistem CMS</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setCurrentTab("admin")}
              className={`p-1.5 rounded-full border transition-all duration-200 ${
                currentTab === "admin"
                  ? "bg-stone-900 text-stone-50 border-stone-900"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
              }`}
              title="CMS Dashboard"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-stone-600 hover:text-stone-900 focus:outline-none rounded-full hover:bg-stone-100"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-stone-900 text-stone-50"
                      : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
