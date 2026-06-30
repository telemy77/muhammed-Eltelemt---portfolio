export const siteConfig = {
  name: "Mohamed El-Telemy",
  fullName: "Mohamed Ahmed El-Telemy",
  title: "Mohamed El-Telemy — BIM Automation Developer & Civil Engineer",
  headline: "BIM Automation Developer",
  subheadline: "Civil Engineer · C# · Revit API · WPF",
  description:
    "BIM Automation Developer with a Civil Engineering background, specializing in Revit API add-ins, WPF desktop applications, and automation solutions for the AEC industry.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "muhammed.eltelemy@gmail.com",
  phone: "+20 114 768 6582",
  location: "Cairo, Egypt",
  social: {
    github: "https://github.com/mohamedeltelemy",
    linkedin: "https://www.linkedin.com/in/mohamed-eltelemy-76a1172b0/",
  },
  keywords: [
    "BIM Automation",
    "Revit API",
    "Civil Engineer",
    "BIM Developer",
    "C#",
    ".NET",
    "WPF",
    "MVVM",
    "AEC Developer",
    "Building Information Modeling",
    "Autodesk Revit",
    "Engineering Software",
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = [
  { label: "BIM Projects Built", value: 6, suffix: "+" },
  { label: "Hours ITI Training", value: 460, suffix: "" },
  { label: "Years Engineering", value: 5, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
] as const;
