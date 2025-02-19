import { trackServerEvent } from '@/lib/mixpanel'
import Header from './(home)/_components/header'
import Hero from './(home)/_components/hero'
import { Metadata } from 'next'
import { getSEOTags } from '@/lib/seo'

export const metadata: Metadata = getSEOTags({
  appName: 'ProjectInBio',
  appDescription:
    'ProjectInBio - Seus projetos e redes sociais em um único link',
  keywords: ['ProjectInBio', 'projetos', 'redes sociais', 'link'],
  appDomain: 'https://micro-saas-course-projectinbio-bice.vercel.app/',
  canonicalUrlRelative: '/',
})

export default function Home() {
  trackServerEvent('page_view', {
    page: 'home',
  })

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-2 py-4">
      <Header />
      <Hero />
    </div>
  )
}
