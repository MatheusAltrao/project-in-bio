'use client'

import { Plus } from 'lucide-react'
import { startTransition, useState } from 'react'
import Modal from '../ui/modal'
import Button from '../ui/button'
import TextInput from '../ui/text-input'
import { useParams, useRouter } from 'next/navigation'
import {
  addCustomLinkAction,
  LinkProps,
} from '@/action/link/add-custom-link-action'

export function AddCustomLinkDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const params = useParams()

  const profileId = params.profileId as string

  const [link1, setLink1] = useState<LinkProps>({
    title: '',
    url: '',
  })

  const [link2, setLink2] = useState<LinkProps>({
    title: '',
    url: '',
  })

  const [link3, setLink3] = useState<LinkProps>({
    title: '',
    url: '',
  })

  const handleSaveCustomLinks = async () => {
    setIsSaving(true)

    if (!profileId) return

    try {
      await addCustomLinkAction({
        profileId,
        link1,
        link2,
        link3,
      })
      startTransition(() => {
        setIsOpen(false)
        setIsSaving(false)
        router.refresh()
      })
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
      >
        <Plus />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-xl flex flex-col gap-10 ">
          <header>
            <p className="text-xl font-bold">Adicionar link personalizado</p>
          </header>

          <div className="flex items-end gap-4 w-full ">
            <div className="space-y-1 w-full">
              <label className="font-bold">Título do link</label>
              <TextInput
                onChange={(e) => setLink1({ ...link1, title: e.target.value })}
                className="w-full"
                placeholder="Digite ao título "
              />
            </div>

            <div className="space-y-1 w-full">
              <label className="font-bold">URL</label>
              <TextInput
                onChange={(e) => setLink1({ ...link1, url: e.target.value })}
                placeholder="Inserir URL "
              />
            </div>
          </div>

          <div className="flex items-end gap-4 w-full ">
            <div className="space-y-1 w-full">
              <label className="font-bold">Título do link</label>
              <TextInput
                onChange={(e) => setLink2({ ...link2, title: e.target.value })}
                className="w-full"
                placeholder="Digite ao título "
              />
            </div>

            <div className="space-y-1 w-full">
              <label className="font-bold">URL</label>
              <TextInput
                onChange={(e) => setLink2({ ...link2, url: e.target.value })}
                placeholder="Inserir URL "
              />
            </div>
          </div>

          <div className="flex items-end gap-4 w-full ">
            <div className="space-y-1 w-full">
              <label className="font-bold">Título do link</label>
              <TextInput
                onChange={(e) => setLink3({ ...link3, title: e.target.value })}
                className="w-full"
                placeholder="Digite ao título "
              />
            </div>

            <div className="space-y-1 w-full">
              <label className="font-bold">URL</label>
              <TextInput
                onChange={(e) => setLink3({ ...link3, url: e.target.value })}
                placeholder="Inserir URL "
              />
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Voltar
            </Button>
            <Button disabled={isSaving} onClick={handleSaveCustomLinks}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
