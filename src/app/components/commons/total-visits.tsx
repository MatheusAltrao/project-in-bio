import { DoorClosed, TrendingUp } from 'lucide-react'
import Button from '../ui/button'
import { auth } from '@/lib/auth'
import { manageAuthAction } from '@/action/auth/manage-auth-action'
import PortalButton from './portal-button'

interface TotalVisitsProps {
  visits: number
}

export default async function TotalVisits({ visits = 0 }: TotalVisitsProps) {
  const session = await auth()

  return (
    <div className="flex  items-center justify-center gap-4 rounded-xl border border-border-secondary bg-background-secondary px-4 py-3">
      <div className="flex items-center gap-1">
        <p className="text-nowrap text-sm font-bold text-content-body">
          Total de visitas
        </p>
        <div className="flex items-center gap-2 text-accent-green">
          <span className="text-3xl font-bold">
            {visits.toString().padStart(2, '0')}
          </span>
          <TrendingUp size={20} />
        </div>
      </div>

      {session?.user.isSubscribed && <PortalButton />}

      <form action={manageAuthAction}>
        <Button variant="secondary">
          <DoorClosed size={20} /> Sair
        </Button>
      </form>
    </div>
  )
}
