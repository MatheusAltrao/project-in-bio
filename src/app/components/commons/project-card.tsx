'use client'
import { ProjectProps } from '@/action/project/get-profile-projects-action'
import Link from 'next/link'

interface ProjectCardProps {
  project: ProjectProps
  isOwner: boolean
  image: string
}

export default function ProjectCard({
  project,
  isOwner,
  image,
}: ProjectCardProps) {
  const projectUrl = project.projectUrl
  const formattedUrl = projectUrl.startsWith('http')
    ? projectUrl
    : `https://${projectUrl}`

  function handleClick() {
    console.log('click')
  }

  return (
    <Link href={formattedUrl} target="_blank" onClick={handleClick}>
      <div className="flex h-[130px] w-full gap-4 rounded-xl border border-border-secondary bg-background-secondary p-2">
        {image ? (
          <div className="min-w-24">
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
            <span className="text-sm text-content-body line-clamp-2">
              {project.projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
