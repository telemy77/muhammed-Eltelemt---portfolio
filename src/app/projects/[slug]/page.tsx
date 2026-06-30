import { Metadata } from "next";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { Project } from "@/data/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { siteConfig } from "@/lib/constants";

async function getProjectsData(): Promise<Project[]> {
  try {
    const dataPath = path.resolve(process.cwd(), "src/data/projects.json");
    const content = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  Static params                                                      */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  const projectsData = await getProjectsData();
  return projectsData
    .filter((p) => p.status === "published")
    .map((p) => ({ slug: p.slug }));
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projectsData = await getProjectsData();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      type: "article",
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page Component (Server)                                            */
/* ------------------------------------------------------------------ */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectsData = await getProjectsData();

  const liveProjects = projectsData.filter((p) => p.status === "published");
  const currentIndex = liveProjects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = liveProjects[currentIndex];

  const prevProject =
    currentIndex > 0
      ? {
          slug: liveProjects[currentIndex - 1].slug,
          title: liveProjects[currentIndex - 1].title,
        }
      : null;

  const nextProject =
    currentIndex < liveProjects.length - 1
      ? {
          slug: liveProjects[currentIndex + 1].slug,
          title: liveProjects[currentIndex + 1].title,
        }
      : null;

  return (
    <main className="min-h-screen bg-[#0F172A]">
      <ProjectDetail
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </main>
  );
}
