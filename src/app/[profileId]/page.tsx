import { Plus } from 'lucide-react'
import ProjectCard from '../components/commons/project-card'
import TotalVisits from '../components/commons/total-visits'
import UserCard from '../components/commons/user-card'
import Link from 'next/link'

interface ProfilePageProps {
  params: Promise<{ profileId: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { profileId } = await params

  return (
    <div>
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
      <div className="flex h-screen flex-col items-center justify-center gap-8 overflow-hidden p-20">
        <div className="flex h-[610px] items-center justify-center gap-10">
          <UserCard />
          <div className="flex h-[610px] flex-col content-start gap-4">
            <button className="flex min-h-[110px] w-full items-center justify-center gap-2 rounded-md border border-border-secondary bg-background-secondary transition-colors hover:border-border-tertiary hover:bg-background-tertiary">
              Adicionar link <Plus />
            </button>
            <div className="flex flex-col gap-4 overflow-y-auto">
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
            </div>
          </div>
        </div>
        <div>
          <TotalVisits />
        </div>
      </div>
    </div>
  )
}
