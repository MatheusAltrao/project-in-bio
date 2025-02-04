"use client";
import { ProjectProps } from "@/action/project/get-profile-projects-action";
import { increaseProjectVisitsAction } from "@/action/project/increase-project-visits-action";
import { formatUrl } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProjectCardProps {
  project?: ProjectProps;
  isOwner: boolean;
  image: string;
}

export default function ProjectCard({
  project,
  isOwner,
  image,
}: ProjectCardProps) {
  const { profileId } = useParams();
  const projectUrl = project?.projectUrl || "";
  const url = formatUrl(projectUrl);

  async function handleClick() {
    if (!profileId || project?.id) {
      console.log(" project.id", project?.id);
      console.log("profileId:", profileId);
    }
    await increaseProjectVisitsAction(
      profileId as string,
      project?.id as string
    );
  }

  return (
    <Link href={url} target="_blank" onClick={handleClick}>
      <div className="flex h-[130px] w-full gap-4 rounded-xl border border-border-secondary bg-background-secondary p-2">
        {image ? (
          <div className="min-w-24">
            <img
              className="h-full w-full rounded-xl object-cover"
              src={image}
              alt={project?.projectName}
            />
          </div>
        ) : (
          <div className="size-20 bg-accent-green rounded-xl h-full w-full"></div>
        )}

        <div className="space-y-1">
          {isOwner && (
            <span className="text-xs font-bold uppercase text-accent-green">
              {project?.totalVisits?.toString().padStart(2, "0") || 0} cliques
            </span>
          )}

          <div>
            <h2 className="text-xl font-bold">{project?.projectName}</h2>
            <span className="text-sm text-content-body line-clamp-2">
              {project?.projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
