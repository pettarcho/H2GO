import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Clock,
  Battery,
  Droplets,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Wifi,
  BarChart3,
  FlaskConical,
  Bell,
} from "lucide-react";
import CircularProgress from "../components/CircularProgress";

const weeklyData = [
  { day: "Mon", amount: 2.4, goal: 3.0 },
  { day: "Tue", amount: 3.1, goal: 3.0 },
  { day: "Wed", amount: 2.8, goal: 3.0 },
  { day: "Thu", amount: 1.9, goal: 3.0 },
  { day: "Fri", amount: 3.0, goal: 3.0 },
  { day: "Sat", amount: 2.2, goal: 3.0 },
  { day: "Sun", amount: 1.8, goal: 3.0 },
];

const notifications = [
  {
    id: 1,
    type: "reminder",
    icon: Clock,
    color: "#0099FF",
    bg: "#EFF8FF",
    title: "Hydration Reminder",
    message: "Time to drink water — 2 hours since last intake",
    time: "5m ago",
  },
  {
    id: 2,
    type: "success",
    icon: CheckCircle2,
    color: "#34C759",
    bg: "#F0FDF4",
    title: "Goal Achieved",
    message: "You hit your daily goal yesterday — great work!",
    time: "1h ago",
  },
  {
    id: 3,
    type: "warning",
    icon: Battery,
    color: "#FF9500",
    bg: "#FFF7ED",
    title: "Low Battery",
    message: "H2GO bottle battery is at 15%",
    time: "3h ago",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [reminderDone, setReminderDone] = useState(false);

  const avgIntake = (weeklyData.reduce((a, d) => a + d.amount, 0) / weeklyData.length).toFixed(1);
  const bestDay = weeklyData.reduce((a, d) => (d.amount > a.amount ? d : a));
  const worstDay = weeklyData.reduce((a, d) => (d.amount < a.amount ? d : a));
  const goalDays = weeklyData.filter((d) => d.amount >= d.goal).length;
  const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-lg mx-auto px-5 py-6 space-y-5">

        {/* Section 1: Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0099FF] to-[#0066cc] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#0099FF]/20">
              KN
            </div>
            <div>
              <p className="text-xs text-[#94a3b8] font-medium">Welcome back,</p>
              <h1 className="text-lg font-bold text-[#1e293b] leading-tight">Karen Nikzad</h1>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors"
          >
            <Target className="w-5 h-5 text-[#64748b]" />
          </button>
        </div>

        {/* Section 2: Hydration Progress */}
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-[#e2e8f0]">
          <h2 className="text-base font-bold text-[#1e293b] mb-5 text-center tracking-tight">
            Today's Hydration
          </h2>
          <div className="flex justify-center mb-5">
            <CircularProgress percentage={60} size={180} strokeWidth={14} color="#0099FF" />
          </div>
          <div className="text-center mb-5">
            <p className="text-4xl font-bold text-[#1e293b] tracking-tight">1.8L</p>
            <p className="text-[#94a3b8] text-sm mt-1">of 3.0L daily goal</p>
          </div>
          {/* Mini stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F8FAFC] rounded-2xl p-3 text-center">
              <p className="text-xs text-[#94a3b8] mb-1">Goal</p>
              <p className="font-bold text-[#1e293b] text-sm">3.0L</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-3 text-center">
              <p className="text-xs text-[#94a3b8] mb-1">Done</p>
              <p className="font-bold text-[#0099FF] text-sm">60%</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-3 text-center">
              <p className="text-xs text-[#94a3b8] mb-1">Left</p>
              <p className="font-bold text-[#34C759] text-sm">1.2L</p>
            </div>
          </div>
        </div>

        {/* Section 4: Reminder Card */}
        {!reminderDone ? (
          <div className="bg-gradient-to-br from-[#0099FF] to-[#0077cc] rounded-3xl p-6 shadow-lg shadow-[#0099FF]/20 text-white">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base mb-1">Hydration Reminder</h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  You haven't had water in 2 hours. Time for a refill!
                </p>
                <button
                  onClick={() => setReminderDone(true)}
                  className="mt-3 bg-white text-[#0099FF] px-5 py-2 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Mark as Done
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#F0FDF4] rounded-3xl p-5 border border-[#bbf7d0] flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#34C759] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#166534] text-sm">Reminder completed!</p>
              <p className="text-[#4ade80] text-xs">Great job staying hydrated.</p>
            </div>
          </div>
        )}

        {/* Section 5: Bottle Status */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-4">
            <Battery className="w-5 h-5 text-[#0099FF]" />
            <h3 className="font-bold text-[#1e293b] text-base">Bottle Status</h3>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
              <span className="text-xs text-[#34C759] font-semibold">Connected</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#64748b]">Battery</span>
              <span className="text-sm font-bold text-[#1e293b]">85%</span>
            </div>
            <div className="w-full bg-[#f1f5f9] rounded-full h-2.5">
              <div
                className="bg-[#34C759] h-2.5 rounded-full transition-all"
                style={{ width: "85%" }}
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-[#94a3b8]" />
                <span className="text-xs text-[#94a3b8]">Last sync</span>
              </div>
              <span className="text-xs font-semibold text-[#64748b]">2 min ago</span>
            </div>
          </div>
        </div>

        {/* Section 6: Weekly Analytics */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-[#0099FF]" />
            <h3 className="font-bold text-[#1e293b] text-base">Weekly Analytics</h3>
          </div>

          {/* Bar chart */}
          <div className="flex items-end justify-between gap-2 mb-5 h-28">
            {weeklyData.map((d) => {
              const isToday = d.day === "Sun";
              const heightPct = (d.amount / (maxAmount * 1.1)) * 100;
              const metGoal = d.amount >= d.goal;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end justify-center" style={{ height: "90px" }}>
                    <div
                      className={`w-full rounded-t-xl transition-all ${
                        isToday
                          ? "bg-[#0099FF] shadow-md shadow-[#0099FF]/20"
                          : metGoal
                          ? "bg-[#34C759]/80"
                          : "bg-[#e2e8f0]"
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isToday ? "text-[#0099FF]" : "text-[#94a3b8]"
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FAFC] rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#0099FF]" />
                <p className="text-xs text-[#94a3b8]">Avg intake</p>
              </div>
              <p className="font-bold text-[#1e293b]">{avgIntake}L</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-3">
              <p className="text-xs text-[#94a3b8] mb-1">Goal completion</p>
              <p className="font-bold text-[#34C759]">{goalDays}/7 days</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-3">
              <p className="text-xs text-[#94a3b8] mb-1">Best day</p>
              <p className="font-bold text-[#1e293b]">{bestDay.day} · {bestDay.amount}L</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-3">
              <p className="text-xs text-[#94a3b8] mb-1">Lowest day</p>
              <p className="font-bold text-[#FF9500]">{worstDay.day} · {worstDay.amount}L</p>
            </div>
          </div>
        </div>

        {/* Section 7: Water Quality */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-5">
            <FlaskConical className="w-5 h-5 text-[#0099FF]" />
            <h3 className="font-bold text-[#1e293b] text-base">Water Quality</h3>
            <span className="ml-auto bg-[#F0FDF4] text-[#34C759] text-xs font-bold px-3 py-1 rounded-full border border-[#bbf7d0]">
              Excellent
            </span>
          </div>

          <div className="flex items-center gap-5 mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0099FF]/10 to-[#0099FF]/5 rounded-3xl flex flex-col items-center justify-center border border-[#0099FF]/15">
              <p className="text-2xl font-bold text-[#0099FF] leading-none">120</p>
              <p className="text-xs text-[#0099FF]/70 font-medium mt-0.5">ppm</p>
            </div>
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748b]">TDS Value</span>
                <span className="text-sm font-bold text-[#1e293b]">120 ppm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748b]">Safe to Drink</span>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
                  <span className="text-sm font-bold text-[#34C759]">Yes</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748b]">TDS Range</span>
                <span className="text-sm font-semibold text-[#1e293b]">0–150 ppm</span>
              </div>
            </div>
          </div>

          {/* TDS Scale bar */}
          <div className="relative">
            <div className="w-full bg-gradient-to-r from-[#34C759] via-[#FF9500] to-[#ef4444] h-2 rounded-full opacity-60" />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-[#0099FF] rounded-full shadow-sm"
              style={{ left: `${(120 / 500) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-[#94a3b8]">0</span>
            <span className="text-xs text-[#94a3b8]">250</span>
            <span className="text-xs text-[#94a3b8]">500+ ppm</span>
          </div>

          <p className="text-xs text-[#94a3b8] mt-3 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Last updated 5 minutes ago
          </p>
        </div>

        {/* Section 8: Recent Notifications */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#0099FF]" />
            <h3 className="font-bold text-[#1e293b] text-base">Recent Notifications</h3>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-3 rounded-2xl"
                  style={{ backgroundColor: n.bg }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${n.color}18` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: n.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#1e293b] truncate">{n.title}</p>
                      <span className="text-xs text-[#94a3b8] flex-shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spacer for bottom nav */}
        <div className="h-2" />
      </div>
    </div>
  );
}
