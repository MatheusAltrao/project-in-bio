'use client'
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
} from 'lucide-react'
import { startTransition, useState } from 'react'
import Modal from '../ui/modal'
import Button from '../ui/button'
import createSocialLinksAction from '@/action/social-links/create-social-links-action'
import { useParams, useRouter } from 'next/navigation'

interface EditSocialLinksDialogProps {
  socialMedias?: {
    facebook: string
    github: string
    instagram: string
    linkedin: string
    twitter: string
  }
}

export function EditSocialLinksDialog({
  socialMedias,
}: EditSocialLinksDialogProps) {
  const router = useRouter()
  const params = useParams()
  const profileId = params.profileId as string

  const [isOpen, setIsOpen] = useState(false)
  const [isSaveing, setIsSaving] = useState(false)

  const [github, setGithub] = useState(socialMedias?.github || '')
  const [facebook, setFacebook] = useState(socialMedias?.facebook || '')
  const [instagram, setInstagram] = useState(socialMedias?.instagram || '')
  const [twitter, setTwitter] = useState(socialMedias?.twitter || '')
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || '')

  const handleAddSocialLinks = async () => {
    setIsSaving(true)
    await createSocialLinksAction({
      profileId,
      github,
      facebook,
      instagram,
      twitter,
      linkedin,
    })

    startTransition(() => {
      setIsSaving(false)
      setIsOpen(false)
      router.refresh()
    })
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
      >
        <Plus />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-xl flex flex-col gap-10 ">
          <header>
            <p className="text-xl font-bold">Adicionar redes sociais</p>
          </header>

          <div className="flex flex-col gap-4 ">
            <div className="input">
              <Github className="text-content-body" />
              <input
                type="text"
                className="bg-transparent outline-none "
                placeholder="link do github"
                onChange={(e) => setGithub(e.target.value)}
                value={github}
              />
            </div>

            <div className="input">
              <Facebook className="text-content-body" />
              <input
                type="text"
                className="bg-transparent outline-none "
                placeholder="link do Facebook"
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
              />
            </div>

            <div className="input">
              <Instagram className="text-content-body" />
              <input
                type="text"
                className="bg-transparent outline-none "
                placeholder="link do Instagram"
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
              />
            </div>

            <div className="input">
              <Twitter className="text-content-body" />
              <input
                type="text"
                className="bg-transparent outline-none "
                placeholder="link do Twitter"
                onChange={(e) => setTwitter(e.target.value)}
                value={twitter}
              />
            </div>

            <div className="input">
              <Linkedin className="text-content-body" />
              <input
                type="text"
                className="bg-transparent outline-none "
                placeholder="link do Linkedin"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Voltar
            </Button>
            <Button onClick={handleAddSocialLinks} disabled={isSaveing}>
              Adicionar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
