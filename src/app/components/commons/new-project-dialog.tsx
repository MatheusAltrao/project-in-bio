'use client'
import { Plus, Upload } from 'lucide-react'
import Modal from '../ui/modal'
import { useState } from 'react'
import Button from '../ui/button'
import TextInput from '../ui/text-input'
import Textarea from '../ui/textarea'

interface NewProjectDialogProps {
  profileId: string
}

export default function NewProjectDialog({ profileId }: NewProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-[110px] w-full items-center justify-center gap-2 rounded-md border border-border-secondary bg-background-secondary transition-colors hover:border-border-tertiary hover:bg-background-tertiary"
      >
        Adicionar projeto <Plus />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-xl flex flex-col gap-10 ">
          <header>
            <p className="text-xl font-bold">Novo Projeto</p>
          </header>

          <div className="flex  gap-16">
            <div className="flex flex-col items-center gap-2 ">
              <div className="size-24 rounded-2xl bg-background-tertiary flex items-center justify-center text-xs ">
                100x100
              </div>

              <div className="flex items-center gap-2">
                <Upload size={18} />{' '}
                <span className="text-sm"> Adicionar imagem</span>
              </div>

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="project-name" className="font-bold">
                  Título do link
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do conteúdo"
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
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button variant="secondary">Voltar</Button>
            <Button>Adicionar</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
