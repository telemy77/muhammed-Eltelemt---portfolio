export interface Skill {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming & Development",
    description: "Core languages and development paradigms",
    skills: [
      { name: "C#", proficiency: 90 },
      { name: ".NET Framework / .NET Core", proficiency: 88 },
      { name: "OOP & Design Principles", proficiency: 92 },
      { name: "WPF Desktop Development", proficiency: 85 },
      { name: "MVVM Architecture", proficiency: 87 },
      { name: "Data Structures & Algorithms", proficiency: 80 },
    ],
  },
  {
    id: "bim",
    name: "BIM & AEC Development",
    description: "BIM platforms, APIs, and automation tooling",
    skills: [
      { name: "Revit API", proficiency: 90 },
      { name: "AutoCAD API", proficiency: 75 },
      { name: "Dynamo", proficiency: 70 },
      { name: "IFC & xBIM", proficiency: 68 },
      { name: "BIM Automation Workflows", proficiency: 88 },
    ],
  },
  {
    id: "data",
    name: "Data & Databases",
    description: "Data management and database integration",
    skills: [
      { name: "SQL Server", proficiency: 80 },
      { name: "SQLite", proficiency: 78 },
      { name: "Entity Framework Core", proficiency: 82 },
      { name: "CRUD Operations", proficiency: 88 },
      { name: "Database Design", proficiency: 78 },
      { name: "Excel Integration", proficiency: 75 },
    ],
  },
  {
    id: "ai",
    name: "AI & Tools",
    description: "AI workflows, development tools, and engineering software",
    skills: [
      { name: "Generative AI & Prompt Engineering", proficiency: 72 },
      { name: "Visual Studio", proficiency: 90 },
      { name: "Revit", proficiency: 85 },
      { name: "AutoCAD", proficiency: 78 },
      { name: "Git / Version Control", proficiency: 70 },
    ],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    description: "Domain knowledge from civil engineering background",
    skills: [
      { name: "Highway & Pavement Engineering", proficiency: 85 },
      { name: "Structural Engineering", proficiency: 78 },
      { name: "Egyptian Concrete Code (ECP 203)", proficiency: 82 },
      { name: "Full Depth Reclamation (FDR)", proficiency: 80 },
      { name: "BIM Coordination", proficiency: 85 },
    ],
  },
];

export const techStackLogos = [
  { name: "C#", category: "Language" },
  { name: ".NET", category: "Framework" },
  { name: "WPF", category: "UI Framework" },
  { name: "MVVM", category: "Architecture" },
  { name: "Revit API", category: "BIM Platform" },
  { name: "AutoCAD API", category: "BIM Platform" },
  { name: "Entity Framework", category: "ORM" },
  { name: "SQL Server", category: "Database" },
  { name: "SQLite", category: "Database" },
  { name: "Dynamo", category: "Visual Scripting" },
  { name: "IFC / xBIM", category: "Open BIM" },
  { name: "Visual Studio", category: "IDE" },
  { name: "Git", category: "Version Control" },
  { name: "Generative AI", category: "AI Tools" },
  { name: "Excel Integration", category: "Data" },
  { name: "AutoCAD", category: "CAD Software" },
];
