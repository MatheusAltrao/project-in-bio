import Header from '@/app/(home)/_components/header'
import Button from '@/app/components/ui/button'
import PlanButtons from './components/plan-buttons'

export default function UpagradePage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-2 py-4">
      <Header />
      <div className="mt-[35vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-content-body">
          Escolha o plano
        </h2>

        <PlanButtons />
      </div>
    </div>
  )
}
