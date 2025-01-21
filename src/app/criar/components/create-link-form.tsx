'use client'
import { createLinkAction } from '@/action/link/create-link-action'
import { verifyLinkAction } from '@/action/link/verify-link-action'
import Button from '@/app/components/ui/button'
import TextInput from '@/app/components/ui/text-input'
import { sanitizeLink } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateLinkForm() {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(sanitizeLink(e.target.value))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (link.length < 3) return setError('Escolha o nome do link ')

    const isLinkTaken = await verifyLinkAction(link)

    if (isLinkTaken) return setError('Link já está em uso')

    const isLinkCreated = await createLinkAction(link)

    if (!isLinkCreated) return setError('Erro ao criar o link')

    router.push(`/${link}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-[600px] flex flex-col gap-3">
      <div className="flex w-full items-center justify-center gap-2">
        <span>project.bio.com/</span>
        <TextInput value={link} onChange={handleLinkChange} />
        <Button>
          <Plus size={20} /> Criar
        </Button>
      </div>
      {error && (
        <span className="text-sm text-center font-medium text-red-500">
          {error}
        </span>
      )}
    </form>
  )
}
