export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
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
    role: "Junior Highway Design Engineer",
    company: "PowerCem Technology Regional",
    location: "Cairo, Egypt",
    startDate: "Jan 2024",
    endDate: "Jan 2026",
    current: false,
    description:
      "Specialized in advanced road reclamation (Full Depth Reclamation — FDR) and diagnostic pavement evaluations. Worked on road condition assessments and technical documentation for infrastructure rehabilitation projects.",
    technologies: ["Highway Design", "FDR", "Pavement Evaluation", "AutoCAD"],
  },
];

export const educationData: Education[] = [
  {
    id: "1",
    degree: "BIM Automation Developer Program",
    institution: "Information Technology Institute (ITI)",
    location: "Cairo, Egypt",
    startDate: "2026",
    endDate: "Present",
    current: true,
    description:
      "460-hour intensive program focused on software development and BIM automation. Key topics: C#, .NET, OOP, Data Structures & Algorithms, Desktop Application Development, Revit API, AutoCAD API, Dynamo, IFC & xBIM, Database Fundamentals, Generative AI & Prompt Engineering. Project-based learning with real-world BIM automation solutions.",
    grade: "In Progress",
  },
  {
    id: "2",
    degree: "Preliminary MA — Public Works Engineering",
    institution: "Mansoura University",
    location: "Mansoura, Egypt",
    startDate: "2023",
    endDate: "Present",
    current: true,
    description:
      "Specialization in Highway and Airport Engineering at the Public Works Engineering Department.",
    grade: "Excellent",
  },
  {
    id: "3",
    degree: "Bachelor of Science in Civil Engineering",
    institution: "Mansoura University",
    location: "Mansoura, Egypt",
    startDate: "2018",
    endDate: "2023",
    current: false,
    description:
      "Graduation Project: Highway & Airport — Superpave Asphalt Mix Designs. Comprehensive study of structural, geotechnical, highway, and construction engineering.",
    grade: "Excellent",
  },
];

export const certificationsData: Certification[] = [
  {
    id: "1",
    name: "BIM Automation Developer Program",
    issuer: "Information Technology Institute (ITI)",
    date: "2026",
  },
];
