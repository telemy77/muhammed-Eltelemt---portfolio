export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
  startDate: string;
  endDate: string | null;
  current: boolean;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  description: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export const experienceData: Experience[] = [
  {
    id: "1",
    company: "Information Technology Institute (ITI)",
    role: "AEC Developer — Professional Training Program",
    description:
      "Intensive 9-month professional development program focused on software engineering for the Architecture, Engineering, and Construction (AEC) industry. Mastered C#, .NET, Revit API, WPF, database design, and modern development practices.",
    achievements: [
      "Developed multiple Revit API plugins for BIM automation",
      "Built WPF desktop applications using MVVM architecture",
      "Implemented database-driven applications with Entity Framework",
      "Created Python automation scripts for engineering workflows",
      "Collaborated on team projects using Git and Agile methodologies",
    ],
    startDate: "2025-09",
    endDate: "2026-06",
    current: false,
    technologies: [
      "C#",
      "Revit API",
      "WPF",
      ".NET",
      "Python",
      "SQL Server",
      "Entity Framework",
      "Git",
    ],
  },
  {
    id: "2",
    company: "Civil Engineering Projects",
    role: "Civil Engineer",
    description:
      "Worked on structural engineering projects including reinforced concrete design, site supervision, and construction management. Gained hands-on experience with BIM workflows and identified opportunities for software automation.",
    achievements: [
      "Supervised construction of residential and commercial structures",
      "Performed structural analysis and reinforced concrete design",
      "Managed quality control inspections on-site",
      "Identified repetitive workflows that could be automated with software",
      "Began self-learning Revit API development to solve engineering problems",
    ],
    startDate: "2022-01",
    endDate: "2025-08",
    current: false,
    technologies: [
      "AutoCAD",
      "Revit",
      "Structural Analysis",
      "Reinforced Concrete",
      "BIM",
    ],
  },
];

export const educationData: Education[] = [
  {
    id: "1",
    institution: "Information Technology Institute (ITI)",
    degree: "Professional Diploma",
    field: "AEC Software Development",
    description:
      "9-month intensive program covering C#, .NET development, Revit API, database design, and software engineering best practices for the AEC industry.",
    startDate: "2025-09",
    endDate: "2026-06",
  },
  {
    id: "2",
    institution: "University",
    degree: "Bachelor of Science",
    field: "Civil Engineering",
    description:
      "Comprehensive civil engineering education covering structural analysis, reinforced concrete design, construction management, geotechnical engineering, and surveying.",
    startDate: "2017",
    endDate: "2022",
    grade: "Good",
  },
];

export const certificationsData: Certification[] = [
  {
    id: "1",
    name: "ITI AEC Developer Program",
    issuer: "Information Technology Institute",
    date: "2026-06",
  },
  {
    id: "2",
    name: "Autodesk Certified Professional — Revit",
    issuer: "Autodesk",
    date: "2025",
  },
];
