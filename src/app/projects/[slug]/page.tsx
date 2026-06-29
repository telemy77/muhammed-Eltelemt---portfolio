import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { siteConfig } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Static params                                                      */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
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

  const publishedProjects = projectsData.filter(
    (p) => p.status === "published"
  );
  const currentIndex = publishedProjects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = publishedProjects[currentIndex];

  const prevProject =
    currentIndex > 0
      ? {
          slug: publishedProjects[currentIndex - 1].slug,
          title: publishedProjects[currentIndex - 1].title,
        }
      : null;

  const nextProject =
    currentIndex < publishedProjects.length - 1
      ? {
          slug: publishedProjects[currentIndex + 1].slug,
          title: publishedProjects[currentIndex + 1].title,
        }
      : null;

  return (
    <ProjectDetail
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
