import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Plus,
} from 'lucide-react'
import Button from '../ui/button'
import Image from 'next/image'
import { EditSocialLinksDialog } from './edit-social-links-dialog'
export default function UserCard() {
  const icons = [Facebook, Github, Instagram, Linkedin, Twitter]

  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border-white border-opacity-10 bg-[#121212] p-8">
      <div className="size-48">
        <Image
          width={200}
          height={200}
          src={'/perfil.jpeg'}
          alt="Matheus"
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold">Matheus Altrão</h3>
        </div>
        <p className="opacity-40">Eu faço produtos para a internet</p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Links</span>
        <div className="flex gap-3">
          {icons.map((Icon, index) => (
            <button
              key={index}
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Icon />
            </button>
          ))}

          <EditSocialLinksDialog />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <Button>Sass de gerenciamento financeiro</Button>

        <button className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]">
          <Plus />
        </button>
      </div>
    </div>
  )
}
