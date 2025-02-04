import { TrendingUp } from "lucide-react";

interface TotalVisitsProps {
  visits: number;
}

export default function TotalVisits({ visits = 0 }: TotalVisitsProps) {
  return (
    <div className="flex w-full max-w-[400px] items-center justify-center gap-4 rounded-xl border border-border-secondary bg-background-secondary px-4 py-3">
      <p className="text-nowrap text-xl font-bold text-content-body">
        Total de visitas
      </p>
      <div className="flex items-center gap-2 text-accent-green">
        <span className="text-3xl font-bold">
          {visits.toString().padStart(2, "0")}
        </span>
        <TrendingUp size={20} />
      </div>
    </div>
  );
}
