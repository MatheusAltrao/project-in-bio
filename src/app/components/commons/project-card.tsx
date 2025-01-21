import Image from 'next/image'

export default function ProjectCard() {
  return (
    <div className="flex h-[110px] gap-4 rounded-xl border border-border-secondary bg-background-secondary p-2">
      <div className="size-20">
        <Image
          width={80}
          height={80}
          className="h-full w-full rounded-xl object-cover"
          src="/perfil.jpeg"
          alt=""
        />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold uppercase text-accent-green">
          12 cliques
        </span>
        <div>
          <h2 className="text-xl font-bold">Taskify</h2>
          <p className="text-sm text-content-body">
            Gerencie tarefas e acompanhe o progresso.
          </p>
        </div>
      </div>
    </div>
  )
}
