'use server'
import ProjectCard from '../components/commons/project-card'
import TotalVisits from '../components/commons/total-visits'
import UserCard from '../components/commons/user-card'
import Link from 'next/link'
import { getProfileDataAction } from '@/action/user/get-profile-data-action'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import NewProjectDialog from '../components/commons/new-project-dialog'
import getProfileProjectsAction from '@/action/project/get-profile-projects-action'
import { getDownloadURLFromPath } from '@/lib/firebase'

interface ProfilePageProps {
  params: Promise<{ profileId: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const session = await auth()
  const { profileId } = await params

  const profileData = await getProfileDataAction(profileId)
  if (!profileData) return notFound()

  const isOwer = profileData.userId === session?.user?.id
  const projects = await getProfileProjectsAction(profileId)

  return (
    <div>
      {isOwer && (
        <div className="flex w-full items-center justify-center gap-1 bg-background-secondary py-2 text-center">
          <span className="text-content-body">
            Você esta usando a versão trial.
          </span>
          <Link
            href={`/${profileId}/upgrade`}
            className="font-bold text-accent-green underline"
          >
            Faça um upgrade
          </Link>
        </div>
      )}

      <div className="flex h-screen w-full mx-auto max-w-[1000px]  flex-col items-center justify-center gap-8 overflow-hidden py-20 px-4">
        <div className="flex h-[610px]  w-full items-center justify-center gap-10">
          <UserCard profile={profileData} />
          <div className="flex h-[610px] w-full flex-col content-start gap-4">
            <NewProjectDialog isOwer={isOwer} profileId={profileId} />
            <div className="flex flex-col gap-4 overflow-y-auto">
              {projects.map(async (project) => {
                const image =
                  (await getDownloadURLFromPath(project.imagePath)) || ''

                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    image={image}
                    isOwner={isOwer}
                  />
                )
              })}
            </div>
          </div>
        </div>
        {isOwer && <TotalVisits />}
      </div>
    </div>
  )
}
