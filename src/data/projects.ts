export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  coverImage: string;
  gallery: string[];
  videoUrl?: string;
  youtubeUrl?: string;
  logoImage?: string;
  technologies: string[];
  category: string;
  tags: string[];
  featured: boolean;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "rebarx",
    title: "RebarX",
    description:
      "Revit API add-in that automates 3D structural reinforcement detailing for footings, columns, beams, and slabs — reducing manual drafting time by up to 70%.",
    overview:
      "RebarX is an Autodesk Revit API add-in built with C#, .NET Framework, and WPF/MVVM that automates the generation of 3D reinforcement detailing for structural elements including isolated footings, columns, continuous and projected beams, and flat slabs. It enforces the Egyptian Concrete Code (ECP 203), automates lap splice calculations, generates procurement-ready BOM exports in CSV, and features a custom branded Ribbon panel.",
    challenge:
      "Structural engineers spend 40–60% of their detailing time on repetitive rebar placement, splice calculations, and scheduling tasks in Revit. Manual processes are error-prone, time-consuming, and inconsistent across projects. Code compliance checks are often done manually after the fact.",
    solution:
      "Developed parametric detailing rules compliant with ECP 203, automating development lengths (Ld), tension/compression lap splices, hooks (90°, 135°, 180°), and seismic confinement zones. Built an intelligent commercial rebar slicing algorithm that partitions longitudinal bars into standard 12-meter lengths and staggers splices to minimize scrap. An automated scheduling engine generates structured BOM exports in CSV.",
    results:
      "Reduced rebar detailing time by up to 70%. Eliminated placement errors and code violations. Generated procurement-ready BOM exports automatically. Integrated asynchronous execution to keep Revit responsive during generation.",
    coverImage: "/images/projects/rebarx-logo.png",
    logoImage: "/images/projects/rebarx-logo.png",
    gallery: ["/images/projects/rebarx-logo.png"],
    videoUrl: "/videos/rebarx-demo.mp4",
    technologies: ["C#", ".NET Framework", "Revit API", "WPF", "MVVM"],
    category: "BIM Automation",
    tags: ["Revit", "Structural", "Reinforcement", "Automation", "ECP 203"],
    featured: true,
    status: "published",
    createdAt: "2026-01-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "2",
    slug: "project-scorecard",
    title: "Project Scorecard",
    description:
      "Revit API add-in that generates automated BIM model health reports with element counts, categories, levels, and performance indicators.",
    overview:
      "Project Scorecard is a Revit API add-in using C# and .NET that generates automated BIM model health reports. It extracts model metadata including levels, categories, element counts, and project statistics, providing centralized project insights and performance indicators for BIM coordinators and project managers.",
    challenge:
      "Project managers and BIM coordinators need quick visibility into project complexity and model health, but extracting metrics from Revit manually requires navigating multiple schedules and views — a slow and fragmented process.",
    solution:
      "Built a one-click Revit command that scans the entire model and displays a formatted scorecard. Uses the Revit API to query filtered element collectors for levels, walls, doors, windows, rooms, and wall types, computing summary statistics automatically. Applied OOP principles to ensure maintainability and scalability.",
    results:
      "Provides instant project overview. Improves model review efficiency with centralized insights. Supports BIM handoff documentation and quality checks.",
    coverImage: "/images/projects/project-scorecard.png",
    gallery: ["/images/projects/project-scorecard.png"],
    technologies: ["C#", ".NET", "Revit API", "WPF"],
    category: "BIM Automation",
    tags: ["Revit", "BIM Health", "Analytics", "Model Review"],
    featured: true,
    status: "published",
    createdAt: "2025-10-01",
    updatedAt: "2025-10-01",
  },
  {
    id: "3",
    slug: "comment-stamper",
    title: "Comment Stamper",
    description:
      "Revit API add-in for bulk parameter management — automates comment and review status updates across large groups of model elements.",
    overview:
      "Comment Stamper is a bulk parameter management tool built with the Autodesk Revit API. It automates comment and review status updates across large groups of model elements, reducing repetitive manual operations and improving BIM coordination workflows.",
    challenge:
      "During design review, engineers need to mark hundreds of elements as reviewed. Doing this manually element-by-element is tedious and error-prone, especially in large models with 100+ walls.",
    solution:
      "Created a Revit plugin that selects all walls in the active view and batch-updates their Comments parameter with a timestamped review note. Provides a summary dialog showing how many elements were updated.",
    results:
      "Updated 144 walls in a single click. Saves hours of manual parameter editing. Ensures consistent review documentation across the model.",
    coverImage: "/images/projects/comment-stamper.png",
    gallery: ["/images/projects/comment-stamper.png"],
    technologies: ["C#", ".NET", "Revit API"],
    category: "BIM Automation",
    tags: ["Revit", "Batch Processing", "Review", "Coordination"],
    featured: true,
    status: "published",
    createdAt: "2025-11-01",
    updatedAt: "2025-11-01",
  },
  {
    id: "4",
    slug: "wall-data-export",
    title: "Wall Data Export",
    description:
      "Revit API add-in that extracts structured wall data — dimensions, types, levels, and parameters — to Excel for reporting and engineering analysis.",
    overview:
      "The Wall Data Export tool collects structured wall information from Revit models and exports dimensions, types, levels, and related parameters to Excel for reporting and engineering analysis. Implements reusable data processing components to support future automation solutions.",
    challenge:
      "BIM auditors need to verify wall properties across large models for clash detection, quantity takeoff, and code compliance. Revit's built-in schedules lack the flexibility for detailed audit workflows.",
    solution:
      "Developed a wall analysis tool that uses filtered element collectors to extract all wall instances, parses geometric and type properties, and presents them in a clean tabular format with warning flags for out-of-spec elements.",
    results:
      "Analyzed 143 walls with full property breakdown. Enabled rapid identification of non-compliant elements. Streamlined the BIM audit and quality assurance process.",
    coverImage: "/images/projects/wall-data-export.png",
    gallery: ["/images/projects/wall-data-export.png"],
    technologies: ["C#", ".NET", "Revit API", "WPF", "Excel Integration"],
    category: "BIM Automation",
    tags: ["Revit", "Data Export", "Audit", "Excel"],
    featured: false,
    status: "published",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-01",
  },
  {
    id: "5",
    slug: "building-inspection-tracker",
    title: "Building Inspection Tracker",
    description:
      "WPF desktop application with MVVM architecture for inspection tracking, checklist management, data filtering, and statistical reporting.",
    overview:
      "A full-featured WPF desktop application built with C# and MVVM architecture for construction site inspection management. Features a New Inspection builder with customizable checklists and an Inspection History view with filtering and statistics. Applies software design principles and separation of concerns.",
    challenge:
      "Construction inspectors track building inspections using paper forms and spreadsheets, leading to data loss, inconsistent records, and no real-time visibility into pass/fail rates across projects.",
    solution:
      "Built a WPF application with two main views: a New Inspection Builder for creating inspections with project details and dynamic checklist items (Pass/Fail/N/A), and an Inspection History view for browsing, filtering, and analyzing past inspections with live statistics.",
    results:
      "Real-time pass rate tracking. Supports multiple inspection types (Structural, Electrical, etc.). Clean MVVM architecture with Relay Commands. Live statistics dashboard.",
    coverImage: "/images/projects/building-inspection-tracker.png",
    gallery: [
      "/images/projects/building-inspection-tracker.png",
      "/images/projects/building-inspection-tracker-2.png",
    ],
    technologies: ["C#", "WPF", "MVVM", ".NET", "XAML"],
    category: "Desktop Application",
    tags: ["WPF", "Desktop", "Construction", "Inspection Management"],
    featured: true,
    status: "published",
    createdAt: "2026-02-01",
    updatedAt: "2026-02-01",
  },
  {
    id: "6",
    slug: "company-management-system",
    title: "Company Management System",
    description:
      "Desktop application using C#, Entity Framework Core, SQL Server and SQLite for full CRUD management of employees, departments, and projects.",
    overview:
      "A desktop management application using C#, Entity Framework Core, SQL Server, and SQLite with full CRUD functionality and relational database integration. Manages employees, departments, projects, dependencies, and work assignments. Implements layered architecture principles to support maintainability and future scalability.",
    challenge:
      "A learning project to master C#, Entity Framework Core, and relational database design with real-world business domain modeling including multi-entity relationships.",
    solution:
      "Designed and implemented a multi-entity management system with proper relationships: Employee → Department, Employee → Project, Department dependencies, and WorksFor assignments. Uses EF Core with a structured DbContext for data persistence. Applied data validation and structured data management workflows.",
    results:
      "Comprehensive CRUD for all entities. Clean architecture with separated concerns. Demonstrates proficiency in C#, EF Core, SQL Server, and layered database design patterns.",
    coverImage: "/images/projects/company-management.png",
    gallery: ["/images/projects/company-management.png"],
    technologies: ["C#", ".NET", "Entity Framework Core", "SQL Server", "SQLite"],
    category: "Desktop Application",
    tags: ["C#", "EF Core", "Database", "OOP", "SQL Server"],
    featured: false,
    status: "published",
    createdAt: "2025-08-01",
    updatedAt: "2025-08-01",
  },
];

export const projectCategories = [
  "All",
  "BIM Automation",
  "Desktop Application",
] as const;
