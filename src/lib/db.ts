import { projectsData, Project } from "@/data/projects";
import { blogPostsData, BlogPost } from "@/data/blog";
import { experienceData, educationData, certificationsData, Experience, Education, Certification } from "@/data/experience";
import { skillsData, SkillCategory } from "@/data/skills";
import { siteConfig } from "./constants";

// Helper to check if we are on the client side
const isClient = typeof window !== "undefined";

// Generic Local Storage Helper
function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading localStorage key:", key, error);
    return defaultValue;
  }
}

function setLocalStorage<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage key:", key, error);
  }
}

/* ─── Database Types & Defaults ─── */
interface DBStore {
  projects: Project[];
  blogPosts: BlogPost[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: SkillCategory[];
  settings: Record<string, string>;
  messages: any[];
}

const DEFAULT_SETTINGS = {
  email: siteConfig.email,
  phone: siteConfig.phone,
  location: siteConfig.location,
  github: siteConfig.social.github,
  linkedin: siteConfig.social.linkedin,
  aboutText: "Civil Engineer turned Software Developer specializing in BIM Automation...",
};

const DB_KEY = "mohamed_portfolio_db";

// Initialize store with static data
const getStore = (): DBStore => {
  const defaultStore: DBStore = {
    projects: projectsData,
    blogPosts: blogPostsData,
    experience: experienceData,
    education: educationData,
    certifications: certificationsData,
    skills: skillsData,
    settings: DEFAULT_SETTINGS,
    messages: [],
  };

  return getLocalStorage<DBStore>(DB_KEY, defaultStore);
};

const saveStore = (store: DBStore) => {
  setLocalStorage(DB_KEY, store);
};

/* ─── Database API Wrapper ─── */
export const db = {
  // Projects
  getProjects: (): Project[] => {
    return getStore().projects;
  },
  getProjectBySlug: (slug: string): Project | undefined => {
    return getStore().projects.find((p) => p.slug === slug);
  },
  saveProject: (project: Project): void => {
    const store = getStore();
    const index = store.projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      store.projects[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      store.projects.push({
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    saveStore(store);
  },
  deleteProject: (id: string): void => {
    const store = getStore();
    store.projects = store.projects.filter((p) => p.id !== id);
    saveStore(store);
  },

  // Blog Posts
  getBlogPosts: (): BlogPost[] => {
    return getStore().blogPosts;
  },
  getBlogPostBySlug: (slug: string): BlogPost | undefined => {
    return getStore().blogPosts.find((p) => p.slug === slug);
  },
  saveBlogPost: (post: BlogPost): void => {
    const store = getStore();
    const index = store.blogPosts.findIndex((p) => p.id === post.id);
    if (index >= 0) {
      store.blogPosts[index] = { ...post, updatedAt: new Date().toISOString() };
    } else {
      store.blogPosts.push({
        ...post,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    saveStore(store);
  },
  deleteBlogPost: (id: string): void => {
    const store = getStore();
    store.blogPosts = store.blogPosts.filter((p) => p.id !== id);
    saveStore(store);
  },

  // Experience
  getExperience: (): Experience[] => {
    return getStore().experience;
  },
  saveExperience: (exp: Experience): void => {
    const store = getStore();
    const index = store.experience.findIndex((e) => e.id === exp.id);
    if (index >= 0) {
      store.experience[index] = exp;
    } else {
      store.experience.push(exp);
    }
    saveStore(store);
  },
  deleteExperience: (id: string): void => {
    const store = getStore();
    store.experience = store.experience.filter((e) => e.id !== id);
    saveStore(store);
  },

  // Education
  getEducation: (): Education[] => {
    return getStore().education;
  },
  saveEducation: (edu: Education): void => {
    const store = getStore();
    const index = store.education.findIndex((e) => e.id === edu.id);
    if (index >= 0) {
      store.education[index] = edu;
    } else {
      store.education.push(edu);
    }
    saveStore(store);
  },
  deleteEducation: (id: string): void => {
    const store = getStore();
    store.education = store.education.filter((e) => e.id !== id);
    saveStore(store);
  },

  // Certifications
  getCertifications: (): Certification[] => {
    return getStore().certifications;
  },
  saveCertification: (cert: Certification): void => {
    const store = getStore();
    const index = store.certifications.findIndex((c) => c.id === cert.id);
    if (index >= 0) {
      store.certifications[index] = cert;
    } else {
      store.certifications.push(cert);
    }
    saveStore(store);
  },
  deleteCertification: (id: string): void => {
    const store = getStore();
    store.certifications = store.certifications.filter((c) => c.id !== id);
    saveStore(store);
  },

  // Skills
  getSkills: (): SkillCategory[] => {
    return getStore().skills;
  },
  saveSkills: (skills: SkillCategory[]): void => {
    const store = getStore();
    store.skills = skills;
    saveStore(store);
  },

  // Settings
  getSettings: (): Record<string, string> => {
    return getStore().settings;
  },
  saveSettings: (settings: Record<string, string>): void => {
    const store = getStore();
    store.settings = { ...store.settings, ...settings };
    saveStore(store);
  },

  // Contact Messages
  getContactMessages: (): any[] => {
    return getStore().messages;
  },
  saveContactMessage: (message: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): void => {
    const store = getStore();
    store.messages.push({
      id: Math.random().toString(36).substring(2, 9),
      ...message,
      read: false,
      createdAt: new Date().toISOString(),
    });
    saveStore(store);
  },
  markMessageRead: (id: string): void => {
    const store = getStore();
    const msg = store.messages.find((m) => m.id === id);
    if (msg) {
      msg.read = true;
      saveStore(store);
    }
  },
  deleteMessage: (id: string): void => {
    const store = getStore();
    store.messages = store.messages.filter((m) => m.id !== id);
    saveStore(store);
  },
};

/* ─── Mock Authentication ─── */
const AUTH_KEY = "mohamed_portfolio_auth";

export const auth = {
  signIn: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Standard mock user for offline admin panel:
    // Email: admin@eltelemy.com
    // Password: admin
    if (email === "admin@eltelemy.com" && password === "admin") {
      if (isClient) {
        localStorage.setItem(AUTH_KEY, "true");
      }
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  },
  signOut: async (): Promise<void> => {
    if (isClient) {
      localStorage.removeItem(AUTH_KEY);
    }
  },
  isAuthenticated: (): boolean => {
    if (!isClient) return false;
    return localStorage.getItem(AUTH_KEY) === "true";
  },
};
