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
      "Specialized in advanced road reclamation (Full Depth Reclamation — FDR) and diagnostic pavement evaluations for infrastructure rehabilitation projects across Egypt.",
    technologies: ["Highway Design", "FDR", "Pavement Evaluation", "AutoCAD"],
  },
  {
    id: "2",
    role: "Lab Engineer",
    company: "Highway & Airport Engineering Laboratory (H&AE Lab), Mansoura University",
    location: "Mansoura, Egypt",
    startDate: "Feb 2024",
    endDate: "Apr 2024",
    current: false,
    description:
      "Conducted Quality Control road tests and Superpave mix design performance testing in the H&AE Laboratory. Performed Sand Cone Test, Extraction Test, Dynamic Shear Rheometer (DSR), Bulk Gravity (BG), and Gmb measurements. Also ran Superpave performance tests including IDT, E*, Flow Number, and Gmm.",
    technologies: [
      "Sand Cone Test",
      "Extraction Test",
      "DSR",
      "Superpave",
      "IDT",
      "E*",
      "Flow Number",
      "Gmm / Gmb",
    ],
  },
];

export const educationData: Education[] = [
  {
    id: "1",
    degree: "BIM Automation Developer Program",
    institution: "Information Technology Institute (ITI)",
    location: "Cairo, Egypt",
    startDate: "Jan 2026",
    endDate: "Jun 2026",
    current: false,
    description:
      "460-hour intensive program focused on software development and BIM automation. Key topics: C#, .NET, OOP, Data Structures & Algorithms, Desktop Application Development, Revit API, AutoCAD API, Dynamo, IFC & xBIM, Database Fundamentals, Generative AI & Prompt Engineering. Project-based learning with real-world BIM automation solutions.",
    grade: "In Progress",
  },
  {
    id: "2",
    degree: "Preliminary MA — Public Works Engineering",
    institution: "Faculty of Engineering, Mansoura University",
    location: "Mansoura, Egypt",
    startDate: "2023",
    endDate: "Present",
    current: true,
    description:
      "Specialization in Highway and Airport Engineering. Courses include Advanced Pavement Materials, Structural Design and Analysis using AASHTO93 & AASHTOWare.",
    grade: "Excellent",
  },
  {
    id: "3",
    degree: "B.Sc. Civil Engineering",
    institution: "Faculty of Engineering, Mansoura University",
    location: "Mansoura, Egypt",
    startDate: "2018",
    endDate: "2023",
    current: false,
    description:
      "Specialized in Highway and Airport Engineering. Graduation Project: Geometric Design of Rural & Urban Roads + Asphalt Mix Design Using Superpave.",
    grade: "Good — Graduation Project: Excellent",
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
