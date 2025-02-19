import { Rocket } from 'lucide-react'
import Header from '../(home)/_components/header'
import CreateLinkForm from './components/create-link-form'
import { trackServerEvent } from '@/lib/mixpanel'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project In Bio - Criar',
  description: 'Project In Bio',
}

export default function CriarPage() {
  trackServerEvent('page_view', {
    page: 'criar',
  })

  return (
    <div className="mx-auto w-full max-w-7xl px-2 py-4">
      <Header />
      <div className="mx-auto mt-[35vh] flex max-w-xl flex-col items-center justify-center gap-10">
        <div className="flex items-center gap-4 text-content-body">
          <h1>Escolha o seu link</h1>
          <Rocket size={32} />
        </div>

        <CreateLinkForm />
      </div>
    </div>
  )
}
