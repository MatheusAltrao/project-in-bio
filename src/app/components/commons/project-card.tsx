import { ProjectProps } from '@/action/project/get-profile-projects-action'
import { getDownloadURLFromPath } from '@/lib/firebase'

interface ProjectCardProps {
  project: ProjectProps
  isOwner: boolean
}

export default async function ProjectCard({
  project,
  isOwner,
}: ProjectCardProps) {
  const image = await getDownloadURLFromPath(project.imagePath)

  console.log('path', project.imagePath)

  return (
    <div className="flex h-[110px] gap-4 rounded-xl border border-border-secondary bg-background-secondary p-2">
      {image ? (
        <div className="size-20">
          <img
            className="h-full w-full rounded-xl object-cover"
            src={image}
            alt={project.projectName}
          />
        </div>
      ) : (
        <div className="size-20 bg-accent-green rounded-xl h-full w-full"></div>
      )}

      <div className="space-y-1">
        {isOwner && (
          <span className="text-xs font-bold uppercase text-accent-green">
            {project.totalVisits || 0} cliques
          </span>
        )}

        <div>
          <h2 className="text-xl font-bold">{project.projectName}</h2>
          <p className="text-sm text-content-body">
            {project.projectDescription}
          </p>
        </div>
      </div>
    </div>
  )
}
