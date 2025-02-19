import { trackServerEvent } from '@/lib/mixpanel'
import Header from './(home)/_components/header'
import Hero from './(home)/_components/hero'

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
