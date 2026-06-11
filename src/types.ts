export interface Project {
  id: string;
  title: string;
  description: string;
  category: "coding" | "creative";
  tags: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  education: string;
  certifications: string[];
  skills: string[];
  avatarUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  date: string;
  read: boolean;
}
