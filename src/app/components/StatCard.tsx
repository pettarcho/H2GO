interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}

export default function StatCard({ icon, label, value, color = "#0099FF" }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <div>
          <p className="text-[#64748b] text-sm">{label}</p>
          <p className="text-[#1e293b] text-xl font-semibold mt-0.5">{value}</p>
        </div>
      </div>
    </div>
  );
}
