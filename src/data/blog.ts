export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: number;
  status: "published" | "draft" | "scheduled";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const blogPostsData: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-revit-api",
    title: "Getting Started with the Revit API: A Civil Engineer's Guide",
    excerpt:
      "Learn how to build your first Revit plugin using C# and the Revit API. This beginner-friendly guide walks through setup, basic commands, and common patterns for BIM automation.",
    content: `
# Getting Started with the Revit API

As a civil engineer who transitioned into BIM automation development, I want to share the path I took to start building Revit plugins. If you're an engineer who writes a little code (or wants to), this guide is for you.

## Why Automate Revit?

Revit is powerful, but repetitive tasks eat up your time. Think about:
- Placing rebar in 200 beams manually
- Updating parameters across hundreds of elements
- Extracting data from the model for reports

The Revit API lets you automate all of this.

## Setting Up Your Development Environment

1. **Install Visual Studio** (Community edition is free)
2. **Create a Class Library project** targeting .NET Framework 4.8
3. **Add Revit API references**: RevitAPI.dll and RevitAPIUI.dll
4. **Create your first ExternalCommand**

## Your First Plugin

Here's the simplest possible Revit command:

\`\`\`csharp
[Transaction(TransactionMode.Manual)]
public class HelloRevit : IExternalCommand
{
    public Result Execute(
        ExternalCommandData commandData,
        ref string message,
        ElementSet elements)
    {
        TaskDialog.Show("Hello", "Hello from the Revit API!");
        return Result.Succeeded;
    }
}
\`\`\`

## What's Next?

In upcoming articles, I'll cover:
- Working with FilteredElementCollectors
- Modifying element parameters
- Creating WPF interfaces for your plugins
- Building a full plugin from scratch
    `,
    coverImage: "/images/blog/revit-api-guide.png",
    category: "BIM Development",
    tags: ["Revit API", "C#", "Tutorial", "Beginner"],
    author: "Mohamed El-Telemy",
    readingTime: 8,
    status: "published",
    publishedAt: "2026-01-15",
    createdAt: "2026-01-15",
    updatedAt: "2026-01-15",
  },
  {
    id: "2",
    slug: "civil-engineer-to-developer",
    title: "From Civil Engineer to Software Developer: My Journey",
    excerpt:
      "How I transitioned from site supervision and structural design to building BIM automation tools. The skills that transferred, the challenges I faced, and advice for engineers considering the switch.",
    content: `
# From Civil Engineer to Software Developer

The construction site and the code editor might seem worlds apart, but the engineering mindset connects them.

## The Spark

It started on a construction site. I was manually checking wall dimensions against the BIM model, one by one. After the 50th wall, I thought: "There has to be a better way."

That weekend, I discovered the Revit API. Within a month, I'd built my first plugin that automated those checks. The feeling of watching 200 walls get verified in seconds — that changed everything.

## What Transferred

- **Problem-solving discipline**: Engineering is all about breaking big problems into solvable pieces. So is software.
- **Attention to detail**: Off-by-one errors in code aren't that different from miscalculated rebar spacing.
- **Documentation habits**: Engineers document everything. Clean code is well-documented code.
- **Domain expertise**: Understanding engineering workflows is the secret weapon. You build better tools when you've done the work manually.

## The Hard Parts

- Learning to think in abstractions (classes, interfaces, patterns)
- Debugging invisible problems vs. visible structural issues
- The speed of technology change vs. construction standards that last decades

## The ITI Program

Joining ITI's AEC Developer program accelerated my growth by years. Structured learning in C#, .NET, WPF, databases, and Revit API development — with a cohort of engineers who shared the same passion.

## Advice for Engineers

1. Start with a real problem you face at work
2. Learn C# — it's the language of the Revit API
3. Build something small and useful first
4. Don't abandon your engineering knowledge — it's your advantage
    `,
    coverImage: "/images/blog/engineer-to-developer.png",
    category: "Career",
    tags: ["Career Change", "Civil Engineering", "Software Development"],
    author: "Mohamed El-Telemy",
    readingTime: 6,
    status: "published",
    publishedAt: "2026-02-10",
    createdAt: "2026-02-10",
    updatedAt: "2026-02-10",
  },
  {
    id: "3",
    slug: "wpf-mvvm-for-revit-plugins",
    title: "Building Better Revit Plugin UIs with WPF and MVVM",
    excerpt:
      "Move beyond TaskDialog boxes. Learn how to create professional, maintainable user interfaces for your Revit plugins using WPF and the MVVM pattern.",
    content: `
# Building Better Revit Plugin UIs with WPF and MVVM

TaskDialog.Show() is fine for "Hello World," but real plugins need real interfaces. Here's how to level up with WPF.

## Why WPF?

- Rich UI controls (data grids, tabs, charts)
- Data binding eliminates boilerplate
- MVVM pattern keeps your code organized
- XAML gives you precise layout control

## The MVVM Pattern

- **Model**: Your data (wall properties, rebar parameters)
- **View**: XAML layout (what the user sees)
- **ViewModel**: Logic that connects Model to View

## Implementation Example

Here's how the Building Inspection Tracker uses MVVM:

\`\`\`csharp
public class InspectionViewModel : INotifyPropertyChanged
{
    private string _projectName;
    public string ProjectName
    {
        get => _projectName;
        set { _projectName = value; OnPropertyChanged(); }
    }

    public ICommand SubmitCommand { get; }

    public InspectionViewModel()
    {
        SubmitCommand = new RelayCommand(SubmitInspection, CanSubmit);
    }
}
\`\`\`

## Key Takeaways

1. Separate your UI from your logic
2. Use data binding for dynamic updates
3. Implement ICommand for button actions
4. Keep ViewModels testable
    `,
    coverImage: "/images/blog/wpf-mvvm.png",
    category: "BIM Development",
    tags: ["WPF", "MVVM", "C#", "UI Design", "Revit"],
    author: "Mohamed El-Telemy",
    readingTime: 10,
    status: "published",
    publishedAt: "2026-03-20",
    createdAt: "2026-03-20",
    updatedAt: "2026-03-20",
  },
];

export const blogCategories = [
  "All",
  "BIM Development",
  "Career",
  "Engineering",
  "Tutorials",
] as const;
