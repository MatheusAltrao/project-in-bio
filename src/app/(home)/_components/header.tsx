import Button from '@/app/components/ui/button'

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <h1 className="text-3xl font-light">ProjectsInBio</h1>

        <div className="flex items-center gap-2">
          <Button>Minha página</Button>
          <Button variant="secondary">Sair</Button>
        </div>
      </nav>
    </header>
  )
}
