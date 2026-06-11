import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Battery, CheckCircle2, Clock, Target, TrendingUp, Wifi } from "lucide-react";
import CircularProgress from "../components/CircularProgress";

const weeklyData = [
  { day: "Mon", amount: 2.4, goal: 3 },
  { day: "Tue", amount: 3.1, goal: 3 },
  { day: "Wed", amount: 2.8, goal: 3 },
  { day: "Thu", amount: 1.9, goal: 3 },
  { day: "Fri", amount: 3.0, goal: 3 },
  { day: "Sat", amount: 2.2, goal: 3 },
  { day: "Sun", amount: 1.8, goal: 3 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [reminderDone, setReminderDone] = useState(false);

  const currentIntake = 1.8;
  const dailyGoal = 3.0;
  const completion = Math.round((currentIntake / dailyGoal) * 100);
  const avgIntake = (weeklyData.reduce((total, day) => total + day.amount, 0) / weeklyData.length).toFixed(1);
  const bestDay = weeklyData.reduce((best, day) => (day.amount > best.amount ? day : best));
  const goalDays = weeklyData.filter((day) => day.amount >= day.goal).length;
  const maxAmount = Math.max(...weeklyData.map((day) => day.amount));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-lg space-y-5 px-5 py-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0099FF] to-[#0066cc] text-sm font-bold text-white shadow-md shadow-[#0099FF]/20">
              KN
            </div>
            <div>
              <p className="text-xs font-medium text-[#94a3b8]">Welcome back,</p>
              <h1 className="text-lg font-bold leading-tight text-[#1e293b]">Karen Nikzad</h1>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e2e8f0] bg-white shadow-sm transition-colors hover:bg-[#f8fafc]"
            aria-label="Open profile"
          >
            <Target className="h-5 w-5 text-[#64748b]" />
          </button>
        </header>

        <section className="rounded-3xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
          <h2 className="mb-5 text-center text-base font-bold tracking-tight text-[#1e293b]">
            Today's Hydration
          </h2>
          <div className="mb-5 flex justify-center">
            <CircularProgress percentage={completion} size={180} strokeWidth={14} color="#0099FF" />
          </div>
          <div className="mb-5 text-center">
            <p className="text-4xl font-bold tracking-tight text-[#1e293b]">{currentIntake.toFixed(1)}L</p>
            <p className="mt-1 text-sm text-[#94a3b8]">of {dailyGoal.toFixed(1)}L daily goal</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-[#F8FAFC] p-3 text-center">
              <p className="mb-1 text-xs text-[#94a3b8]">Goal</p>
              <p className="text-sm font-bold text-[#1e293b]">{dailyGoal.toFixed(1)}L</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-3 text-center">
              <p className="mb-1 text-xs text-[#94a3b8]">Done</p>
              <p className="text-sm font-bold text-[#0099FF]">{completion}%</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-3 text-center">
              <p className="mb-1 text-xs text-[#94a3b8]">Left</p>
              <p className="text-sm font-bold text-[#34C759]">{(dailyGoal - currentIntake).toFixed(1)}L</p>
            </div>
          </div>
        </section>

        {!reminderDone ? (
          <section className="rounded-3xl bg-gradient-to-br from-[#0099FF] to-[#0077cc] p-6 text-white shadow-lg shadow-[#0099FF]/20">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-base font-bold">Hydration Reminder</h3>
                <p className="text-sm leading-relaxed text-white/85">
                  You haven't had water in 2 hours. Time for a refill!
                </p>
                <button
                  type="button"
                  onClick={() => setReminderDone(true)}
                  className="mt-3 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-[#0099FF] transition-colors hover:bg-white/90"
                >
                  Mark as Done
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex items-center gap-3 rounded-3xl border border-[#bbf7d0] bg-[#F0FDF4] p-5">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-[#34C759]" />
            <div>
              <p className="text-sm font-semibold text-[#166534]">Reminder completed</p>
              <p className="text-xs text-[#4ade80]">Great job staying hydrated.</p>
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Battery className="h-5 w-5 text-[#0099FF]" />
            <h3 className="text-base font-bold text-[#1e293b]">Bottle Status</h3>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#34C759]" />
              <span className="text-xs font-semibold text-[#34C759]">Connected</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#64748b]">Battery</span>
              <span className="text-sm font-bold text-[#1e293b]">85%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#f1f5f9]">
              <div className="h-2.5 rounded-full bg-[#34C759]" style={{ width: "85%" }} />
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                <Wifi className="h-4 w-4 text-[#94a3b8]" />
                <span className="text-xs text-[#94a3b8]">Last sync</span>
              </div>
              <span className="text-xs font-semibold text-[#64748b]">2 min ago</span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#0099FF]" />
            <h3 className="text-base font-bold text-[#1e293b]">Weekly Analytics</h3>
          </div>
          <div className="mb-5 flex h-28 items-end justify-between gap-2">
            {weeklyData.map((day) => {
              const isToday = day.day === "Sun";
              const metGoal = day.amount >= day.goal;
              const heightPct = (day.amount / (maxAmount * 1.1)) * 100;

              return (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex w-full items-end justify-center" style={{ height: "90px" }}>
                    <div
                      className={`w-full rounded-t-xl ${
                        isToday ? "bg-[#0099FF]" : metGoal ? "bg-[#34C759]/80" : "bg-[#e2e8f0]"
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${isToday ? "text-[#0099FF]" : "text-[#94a3b8]"}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#F8FAFC] p-3">
              <p className="mb-1 text-xs text-[#94a3b8]">Avg intake</p>
              <p className="font-bold text-[#1e293b]">{avgIntake}L</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-3">
              <p className="mb-1 text-xs text-[#94a3b8]">Goal completion</p>
              <p className="font-bold text-[#34C759]">{goalDays}/7 days</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-3">
              <p className="mb-1 text-xs text-[#94a3b8]">Best day</p>
              <p className="font-bold text-[#1e293b]">
                {bestDay.day} · {bestDay.amount.toFixed(1)}L
              </p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-3">
              <p className="mb-1 text-xs text-[#94a3b8]">Bottle model</p>
              <p className="font-bold text-[#1e293b]">H2GO Pro 750</p>
            </div>
          </div>
        </section>

        <div className="h-2" />
      </div>
    </main>
  );
}
