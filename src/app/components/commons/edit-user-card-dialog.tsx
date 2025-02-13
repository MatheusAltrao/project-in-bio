'use client'

import { Upload, UserPen } from 'lucide-react'
import Button from '../ui/button'
import { startTransition, useState } from 'react'
import Modal from '../ui/modal'
import Image from 'next/image'
import Textarea from '../ui/textarea'
import TextInput from '../ui/text-input'
import { compressFiles, handleImageInput, triggerImageInput } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'
import { saveProfileAction } from '@/action/user/save-profile-data-action'
import { ProfileProps } from '@/action/user/get-profile-data-action'

interface EditUserCardDialogProps {
  profile?: ProfileProps
  profileImage: string
}

export default function EditUserCardDialog({
  profile,
  profileImage,
}: EditUserCardDialogProps) {
  const { profileId } = useParams()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [yourName, setYourName] = useState<string>(profile?.name || '')
  const [yourDescription, setYourDescription] = useState<string>(
    profile?.description || '',
  )

  async function handleSaveProfile() {
    setIsSaving(true)

    const imageInput = document.getElementById(
      'profile-pic-input',
    ) as HTMLInputElement

    if (!imageInput.files) return

    const compressedFile = await compressFiles(Array.from(imageInput.files))

    if (!profileId) return
    const formData = new FormData()

    formData.append('profileId', profileId as string)
    formData.append('profilePic', compressedFile[0])
    formData.append('yourName', yourName)
    formData.append('yourDescription', yourDescription)

    await saveProfileAction(formData)

    startTransition(() => {
      setIsModalOpen(false)
      setIsSaving(false)
      router.refresh()
    })
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)} variant="icon">
        <UserPen size={20} />
      </Button>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl font-bold">Editar perfil</h3>
            <p className="opacity-40">
              Edite as informações do seu perfil para que as pessoas possam te
              conhecer melhor
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => triggerImageInput('profile-pic-input')}
              className="flex flex-col  gap-2 w-max "
            >
              {profilePic ? (
                <Image
                  src={profilePic}
                  alt="Profile picture"
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
              id="profile-pic-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setProfilePic(handleImageInput(e))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="your-name" className="text-sm font-medium">
              Nome
            </label>
            <TextInput
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              type="text"
              id="your-name"
              className="input"
              placeholder="Matheus Altrão"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="you-description" className="text-sm font-medium">
              Descrição
            </label>
            <Textarea
              value={yourDescription}
              onChange={(e) => setYourDescription(e.target.value)}
              id="you-description"
              className="h-[220px] resize-none"
              placeholder="Fale sobre você"
            />
          </div>

          <Button
            onClick={handleSaveProfile}
            disabled={isSaving}
            variant="primary"
          >
            Salvar
          </Button>
        </div>
      </Modal>
    </div>
  )
}
