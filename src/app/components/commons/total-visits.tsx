import { TrendingUp } from "lucide-react";

export default function TotalVisits() {
  return (
    <div className="flex items-center justify-center gap-4 rounded-xl border border-border-secondary bg-background-secondary px-8 py-5">
      <p className="text-nowrap text-xl font-bold text-content-body">
        Total de visitas
      </p>
      <div className="flex items-center gap-2 text-accent-green">
        <span className="text-3xl font-bold">12,453</span>
        <TrendingUp size={20} />
      </div>
    </div>
  );
}
