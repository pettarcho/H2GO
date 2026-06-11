import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const weeklyData = [
  { id: 1, day: "Mon", amount: 2.8 },
  { id: 2, day: "Tue", amount: 3.2 },
  { id: 3, day: "Wed", amount: 2.5 },
  { id: 4, day: "Thu", amount: 3.5 },
  { id: 5, day: "Fri", amount: 2.9 },
  { id: 6, day: "Sat", amount: 3.1 },
  { id: 7, day: "Sun", amount: 2.7 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Analytics</h1>
          <p className="text-[#64748b]">Track your hydration trends</p>
        </div>

        {/* Week Selector */}
        <div className="flex items-center justify-between mb-6">
          <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[#e2e8f0]">
            <span className="text-[#64748b]">&lt;</span>
          </button>
          <div className="flex items-center gap-2 text-[#1e293b] font-medium">
            <Calendar className="w-5 h-5 text-[#0099FF]" />
            <span>May 26 - June 1</span>
          </div>
          <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[#e2e8f0]">
            <span className="text-[#64748b]">&gt;</span>
          </button>
        </div>

        {/* Chart Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0] mb-6">
          <h2 className="font-semibold text-[#1e293b] mb-6">Weekly Hydration</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Bar
                dataKey="amount"
                fill="#0099FF"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-sm text-[#64748b] mt-4">Liters per day</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-2 text-[#0099FF] mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Average</span>
            </div>
            <p className="text-2xl font-bold text-[#1e293b]">2.9L</p>
            <p className="text-xs text-[#64748b] mt-1">per day</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-2 text-[#34C759] mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Best Day</span>
            </div>
            <p className="text-2xl font-bold text-[#1e293b]">3.5L</p>
            <p className="text-xs text-[#64748b] mt-1">Thursday</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-2 text-[#FF9500] mb-2">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm font-medium">Lowest Day</span>
            </div>
            <p className="text-2xl font-bold text-[#1e293b]">2.5L</p>
            <p className="text-xs text-[#64748b] mt-1">Wednesday</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-2 text-[#0099FF] mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Goal Met</span>
            </div>
            <p className="text-2xl font-bold text-[#1e293b]">5/7</p>
            <p className="text-xs text-[#64748b] mt-1">this week</p>
          </div>
        </div>

        {/* Insights Card */}
        <div className="bg-gradient-to-br from-[#34C759] to-[#2ba84a] rounded-3xl p-6 shadow-lg text-white">
          <h3 className="font-semibold text-lg mb-2">Great Progress!</h3>
          <p className="text-white/90 text-sm leading-relaxed">
            You've met your hydration goal 5 out of 7 days this week. Keep up the excellent work!
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: "71%" }}></div>
            </div>
            <span className="text-sm font-semibold">71%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
