export interface Skill {
  name: string;
  proficiency: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming Languages",
    description: "Core languages I use to build software solutions",
    skills: [
      { name: "C#", proficiency: 90 },
      { name: "Python", proficiency: 85 },
      { name: "JavaScript", proficiency: 75 },
      { name: "TypeScript", proficiency: 70 },
      { name: "SQL", proficiency: 80 },
      { name: "HTML/CSS", proficiency: 80 },
    ],
  },
  {
    id: "bim-revit",
    title: "BIM & Revit",
    description: "Building Information Modeling expertise and Revit API development",
    skills: [
      { name: "Autodesk Revit", proficiency: 95 },
      { name: "Revit API", proficiency: 90 },
      { name: "BIM Coordination", proficiency: 85 },
      { name: "Dynamo", proficiency: 80 },
      { name: "Navisworks", proficiency: 75 },
      { name: "AutoCAD", proficiency: 85 },
    ],
  },
  {
    id: "desktop-dev",
    title: "Desktop Development",
    description: "Building robust desktop applications with modern frameworks",
    skills: [
      { name: "WPF (XAML)", proficiency: 85 },
      { name: "MVVM Pattern", proficiency: 85 },
      { name: ".NET Framework", proficiency: 90 },
      { name: ".NET Core", proficiency: 80 },
      { name: "Windows Forms", proficiency: 70 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Data storage and management solutions",
    skills: [
      { name: "SQL Server", proficiency: 80 },
      { name: "Entity Framework", proficiency: 80 },
      { name: "PostgreSQL", proficiency: 70 },
      { name: "LINQ", proficiency: 85 },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Exploring intelligent solutions for engineering problems",
    skills: [
      { name: "Machine Learning", proficiency: 65 },
      { name: "Data Analysis", proficiency: 70 },
      { name: "Pandas / NumPy", proficiency: 70 },
      { name: "Computer Vision", proficiency: 55 },
    ],
  },
  {
    id: "engineering",
    title: "Engineering Expertise",
    description: "Civil engineering domain knowledge and professional skills",
    skills: [
      { name: "Structural Analysis", proficiency: 85 },
      { name: "Reinforced Concrete", proficiency: 90 },
      { name: "Construction Management", proficiency: 80 },
      { name: "Quality Control", proficiency: 85 },
      { name: "Project Management", proficiency: 75 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Software",
    description: "Development tools and productivity software",
    skills: [
      { name: "Visual Studio", proficiency: 90 },
      { name: "VS Code", proficiency: 85 },
      { name: "Git / GitHub", proficiency: 80 },
      { name: "Postman", proficiency: 70 },
      { name: "Figma", proficiency: 60 },
    ],
  },
];

export const techStackLogos = [
  { name: "C#", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: ".NET", category: "Framework" },
  { name: "WPF", category: "Framework" },
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Framework" },
  { name: "Revit API", category: "BIM" },
  { name: "Dynamo", category: "BIM" },
  { name: "AutoCAD", category: "BIM" },
  { name: "SQL Server", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Git", category: "Tool" },
  { name: "Visual Studio", category: "Tool" },
];
