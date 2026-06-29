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
      "Advanced Revit plugin for automated rebar detailing and scheduling in reinforced concrete structures.",
    overview:
      "RebarX is a powerful Autodesk Revit plugin built with C# and the Revit API that automates the entire rebar detailing workflow. From automatic bar placement to comprehensive scheduling, RebarX eliminates hours of manual work for structural engineers.",
    challenge:
      "Structural engineers spend 40-60% of their detailing time on repetitive rebar placement and scheduling tasks in Revit. Manual processes are error-prone, time-consuming, and inconsistent across projects.",
    solution:
      "Developed a Revit plugin using C# and the Revit API that automates rebar placement based on predefined rules, generates accurate bar bending schedules, and ensures compliance with structural standards. The plugin features an intuitive WPF interface for parameter configuration.",
    results:
      "Reduced rebar detailing time by 70%. Eliminated common placement errors. Standardized output across all projects. Currently used by multiple engineering teams.",
    coverImage: "/images/projects/project-scorecard.png",
    gallery: ["/images/projects/project-scorecard.png"],

    technologies: ["C#", "Revit API", "WPF", "MVVM", ".NET"],
    category: "BIM Automation",
    tags: ["Revit", "Plugin", "Structural", "Automation"],
    featured: true,
    status: "published",
    createdAt: "2025-06-15",
    updatedAt: "2025-06-15",
  },
  {
    id: "2",
    slug: "project-scorecard",
    title: "Project Scorecard",
    description:
      "Revit plugin that generates comprehensive project analytics — levels, walls, openings, spaces, and wall types at a glance.",
    overview:
      "Project Scorecard is a Revit plugin that analyzes your BIM model and generates a comprehensive scorecard showing project structure metrics: number of levels, walls, openings (doors, windows), spaces (rooms), wall types, and computed ratios like door-to-wall percentage.",
    challenge:
      "Project managers and BIM coordinators need quick visibility into project complexity and model health, but extracting these metrics from Revit manually requires navigating multiple schedules and views.",
    solution:
      "Built a one-click Revit command that scans the entire model and displays a formatted scorecard dialog. Uses the Revit API to query filtered element collectors for levels, walls, doors, windows, rooms, and wall types, computing summary statistics automatically.",
    results:
      "Provides instant project overview in seconds. Helps BIM managers assess model completeness. Used for project handoff documentation and quality checks.",
    coverImage: "/images/projects/project-scorecard.png",
    gallery: ["/images/projects/project-scorecard.png"],
    technologies: ["C#", "Revit API", "WPF", ".NET"],
    category: "BIM Automation",
    tags: ["Revit", "Plugin", "Analytics", "BIM Management"],
    featured: true,
    status: "published",
    createdAt: "2025-05-20",
    updatedAt: "2025-05-20",
  },
  {
    id: "3",
    slug: "comment-stamper",
    title: "Comment Stamper",
    description:
      "Revit plugin for batch-updating comment parameters across hundreds of elements with timestamped review marks.",
    overview:
      "Comment Stamper automates the review process in Revit by batch-updating the Comments parameter on selected elements. It stamps a 'Reviewed: [date]' tag on all walls (or any selected elements), making coordination tracking effortless.",
    challenge:
      "During design review and coordination, engineers need to mark hundreds of elements as reviewed. Doing this manually element-by-element is tedious and error-prone, especially in large models with 100+ walls.",
    solution:
      "Created a Revit plugin that selects all walls in the active view and batch-updates their Comments parameter with a timestamped review note. The plugin provides a summary dialog showing how many elements were updated.",
    results:
      "Updated 144 walls in one click (as demonstrated). Saves hours of manual parameter editing. Ensures consistent review documentation across the model.",
    coverImage: "/images/projects/comment-stamper.png",
    gallery: ["/images/projects/comment-stamper.png"],
    technologies: ["C#", "Revit API", ".NET"],
    category: "BIM Automation",
    tags: ["Revit", "Plugin", "Review", "Batch Processing"],
    featured: true,
    status: "published",
    createdAt: "2026-03-18",
    updatedAt: "2026-03-18",
  },
  {
    id: "4",
    slug: "wall-data-export",
    title: "Wall Data Export (BIM Auditor)",
    description:
      "Revit plugin that extracts comprehensive wall data — type, thickness, length, area, height, level — into a structured table for audit and analysis.",
    overview:
      "The BIM Auditor - Wall Analyzer scans all walls in a Revit model and exports their properties (type, thickness, length, area, height, level) into a structured, sortable table. Includes marking/flagging capabilities for wall audit workflows.",
    challenge:
      "BIM auditors need to verify wall properties across large models for clash detection, quantity takeoff, and code compliance. Revit's built-in schedules lack the flexibility and presentation needed for audit workflows.",
    solution:
      "Developed a wall analysis tool that uses filtered element collectors to extract all wall instances, parses their geometric and type properties, and presents them in a clean tabular format with warning flags for out-of-spec elements.",
    results:
      "Analyzed 143 walls with full property breakdown. Enabled rapid identification of non-compliant walls. Streamlined the BIM audit process for quality assurance teams.",
    coverImage: "/images/projects/wall-data-export.png",
    gallery: ["/images/projects/wall-data-export.png"],
    technologies: ["C#", "Revit API", "WPF", ".NET"],
    category: "BIM Automation",
    tags: ["Revit", "Plugin", "Audit", "Data Export"],
    featured: false,
    status: "published",
    createdAt: "2025-04-10",
    updatedAt: "2025-04-10",
  },
  {
    id: "5",
    slug: "building-inspection-tracker",
    title: "Building Inspection Tracker",
    description:
      "WPF desktop application for managing building inspections — create checklists, track results, and generate inspection reports.",
    overview:
      "A full-featured WPF desktop application built with C# and MVVM architecture for construction site inspection management. Features a New Inspection builder with customizable checklists and an Inspection History view with filtering and statistics.",
    challenge:
      "Construction inspectors track building inspections using paper forms and spreadsheets, leading to data loss, inconsistent records, and no real-time visibility into pass/fail rates across projects.",
    solution:
      "Built a WPF application with two main views: (1) New Inspection Builder for creating inspections with project details, inspector info, and dynamic checklist items with Pass/Fail/N/A status, and (2) Inspection History for browsing, filtering, and analyzing past inspections with live statistics.",
    results:
      "Provides real-time pass rate tracking. Supports multiple inspection types (Structural, Electrical, etc.). Clean MVVM architecture with Relay Commands. Live statistics dashboard.",
    coverImage: "/images/projects/building-inspection-tracker.png",
    gallery: [
      "/images/projects/building-inspection-tracker.png",
      "/images/projects/building-inspection-tracker-2.png",
    ],
    technologies: ["C#", "WPF", "MVVM", ".NET", "XAML"],
    category: "Desktop Application",
    tags: ["WPF", "Desktop", "Construction", "Inspection"],
    featured: true,
    status: "published",
    createdAt: "2026-03-05",
    updatedAt: "2026-03-05",
  },
  {
    id: "6",
    slug: "company-management-system",
    title: "Company Management System",
    description:
      "Console-based C# application for managing employees, departments, projects, and organizational dependencies.",
    overview:
      "A C# console application demonstrating object-oriented programming, Entity Framework, and database design principles. Manages employees, departments, projects, dependencies, and work assignments through a clean text-based interface.",
    challenge:
      "Learning project to master C#, Entity Framework Core, and relational database design with real-world business domain modeling.",
    solution:
      "Designed and implemented a multi-entity management system with proper relationships (Employee → Department, Employee → Project, Department dependencies, WorksFor assignments). Uses EF Core with BIMContext for data persistence.",
    results:
      "Comprehensive CRUD operations for all entities. Clean architecture with separated concerns. Demonstrates proficiency in C#, EF Core, and database design patterns.",
    coverImage: "/images/projects/company-management.png",
    gallery: ["/images/projects/company-management.png"],
    technologies: ["C#", ".NET", "Entity Framework", "SQL Server"],
    category: "Desktop Application",
    tags: ["C#", "EF Core", "Database", "OOP"],
    featured: false,
    status: "published",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
  },
];

export const projectCategories = [
  "All",
  "BIM Automation",
  "Desktop Application",
  "Web Application",
  "Engineering Tool",
] as const;
