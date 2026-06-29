export const siteConfig = {
  name: "Mohamed El-Telemy",
  title: "Mohamed El-Telemy — BIM Automation Developer & Civil Engineer",
  description:
    "Civil Engineer turned Software Developer specializing in BIM Automation, Revit API, and engineering workflow optimization. Building software that automates engineering workflows.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "mohamed.eltelemy@outlook.com",
  phone: "+20 1234 567 890",
  location: "Cairo, Egypt",
  social: {
    github: "https://github.com/mohamedeltelemy",
    linkedin: "https://linkedin.com/in/mohamedeltelemy",
  },
  keywords: [
    "BIM Automation",
    "Revit API",
    "Civil Engineer",
    "Software Developer",
    "C#",
    "Python",
    "WPF",
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
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = [
  { label: "Projects Completed", value: 12, suffix: "+" },
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Articles Written", value: 8, suffix: "" },
] as const;
