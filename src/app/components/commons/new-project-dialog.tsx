'use client'
import { Plus, Upload } from 'lucide-react'
import Modal from '../ui/modal'
import { startTransition, useState } from 'react'
import Button from '../ui/button'
import TextInput from '../ui/text-input'
import Textarea from '../ui/textarea'
import Image from 'next/image'
import { compressFiles } from '@/lib/utils'
import { createProjectAction } from '@/action/project/create-project-action'
import { useRouter } from 'next/navigation'

interface NewProjectDialogProps {
  profileId: string
  isOwer: boolean
}

export default function NewProjectDialog({
  profileId,
  isOwer,
}: NewProjectDialogProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectImage, setProjectImage] = useState<string | null>(null)
  const [isCreatingProject, setIsCreatingProject] = useState(false)

  function triggerImageInput(id: string) {
    document.getElementById(id)?.click()
  }

  function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (file) {
      const imageurl = URL.createObjectURL(file)
      return imageurl
    }
    return null
  }

  async function handleCreateProject() {
    setIsCreatingProject(true)
    const imageInput = document.getElementById('imageInput') as HTMLInputElement
    if (!imageInput.files) return

    const compressedFile = await compressFiles(Array.from(imageInput.files))

    const formData = new FormData()
    formData.append('file', compressedFile[0])
    formData.append('profileId', profileId)
    formData.append('projectName', projectName)
    formData.append('projectUrl', projectUrl)
    formData.append('projectDescription', projectDescription)

    await createProjectAction(formData)

    startTransition(() => {
      setIsOpen(false)
      setIsCreatingProject(false)
      setProjectDescription('')
      setProjectName('')
      setProjectUrl('')
      setProjectImage(null)
      router.refresh()
    })
  }

  if (!isOwer) return null

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-[110px] w-full items-center justify-center gap-2 rounded-xl border border-border-secondary bg-background-secondary transition-colors hover:border-border-tertiary hover:bg-background-tertiary"
      >
        Adicionar projeto <Plus />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-xl flex flex-col gap-10 ">
          <header>
            <p className="text-xl font-bold">Novo Projeto</p>
          </header>

          <div className="flex  gap-16">
            <button
              onClick={() => triggerImageInput('imageInput')}
              className="flex flex-col items-center gap-2 "
            >
              {projectImage ? (
                <Image
                  src={projectImage}
                  alt="projectImage"
                  className="size-24 rounded-2xl object-cover object-center"
                  width={96}
                  height={96}
                />
              ) : (
                <div className="size-24 rounded-2xl bg-background-tertiary flex items-center justify-center text-xs ">
                  100x100
                </div>
              )}

              <div className="flex items-center gap-2">
                <Upload size={18} />{' '}
                <span className="text-sm"> Adicionar imagem</span>
              </div>
            </button>

            <input
              type="file"
              id="imageInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => setProjectImage(handleImageInput(e))}
            />

            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="project-name" className="font-bold">
                  Título do link
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do conteúdo"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="project-url" className="font-bold">
                  URL do Projeto
                </label>
                <TextInput
                  id="project-url"
                  className="h-[220px] resize-none"
                  placeholder="Link do projeto"
                  onChange={(e) => setProjectUrl(e.target.value)}
                  value={projectUrl}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="project-description" className="font-bold">
                  Descrição
                </label>
                <Textarea
                  id="project-description"
                  className="h-[220px] resize-none"
                  placeholder="Dê uma breve descrição do seu projeto"
                  onChange={(e) => setProjectDescription(e.target.value)}
                  value={projectDescription}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Voltar
            </Button>
            <Button onClick={handleCreateProject} disabled={isCreatingProject}>
              Adicionar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
