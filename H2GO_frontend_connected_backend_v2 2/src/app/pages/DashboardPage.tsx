import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  Clock,
  FlaskConical,
  Smartphone,
  Target,
  TrendingUp,
  Wifi,
} from "lucide-react";
import CircularProgress from "../components/CircularProgress";
import {
  getDashboardGoal,
  getNotifications,
  getWeeklyAnalytics,
  type HydrationReadingResponse,
  type NotificationResponse,
} from "../api";

const fallbackWeeklyData = [
  { day: "Mon", amount: 2.4, goal: 3 },
  { day: "Tue", amount: 3.1, goal: 3 },
  { day: "Wed", amount: 2.8, goal: 3 },
  { day: "Thu", amount: 1.9, goal: 3 },
  { day: "Fri", amount: 3.0, goal: 3 },
  { day: "Sat", amount: 2.2, goal: 3 },
  { day: "Sun", amount: 1.8, goal: 3 },
];

const fallbackNotifications = [
  {
    id: 1,
    icon: Clock,
    color: "#0099FF",
    bg: "#EFF8FF",
    title: "Hydration Reminder",
    message: "Time to drink water - 2 hours since last intake",
    time: "5m ago",
  },
  {
    id: 2,
    icon: CheckCircle2,
    color: "#34C759",
    bg: "#F0FDF4",
    title: "Goal Achieved",
    message: "You hit your daily goal yesterday - great work!",
    time: "1h ago",
  },
];

function mapReadingsToWeeklyData(readings: HydrationReadingResponse[], dailyGoal: number) {
  if (!Array.isArray(readings) || readings.length === 0) return [];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totals = new Map<string, number>();

  readings.forEach((reading) => {
    const rawTimestamp = reading.timestamp ?? reading.Timestamp;
    const rawAmount = reading.waterConsumedMl ?? reading.WaterConsumedMl ?? 0;
    const date = rawTimestamp ? new Date(rawTimestamp) : new Date();
    const day = days[date.getDay()];
    const liters = Number(rawAmount) / 1000;

    totals.set(day, (totals.get(day) ?? 0) + liters);
  });

  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    day,
    amount: Number((totals.get(day) ?? 0).toFixed(1)),
    goal: dailyGoal,
  }));
}

function mapNotifications(items: NotificationResponse[]) {
  if (!Array.isArray(items) || items.length === 0) return [];

  return items.slice(0, 4).map((item, index) => {
    const reminderType = item.reminderType ?? item.ReminderType ?? "Hydration Reminder";
    const triggeredAt = item.triggeredAt ?? item.TriggeredAt;

    return {
      id: item.id ?? index,
      icon: item.acknowledged ?? item.Acknowledged ? CheckCircle2 : Clock,
      color: item.acknowledged ?? item.Acknowledged ? "#34C759" : "#0099FF",
      bg: item.acknowledged ?? item.Acknowledged ? "#F0FDF4" : "#EFF8FF",
      title: reminderType,
      message: item.acknowledged ?? item.Acknowledged ? "Reminder acknowledged" : "Hydration reminder triggered",
      time: triggeredAt ? new Date(triggeredAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Now",
    };
  });
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [reminderDone, setReminderDone] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(3.0);
  const [weeklyData, setWeeklyData] = useState(fallbackWeeklyData);
  const [notifications, setNotifications] = useState(fallbackNotifications);
  const [apiStatus, setApiStatus] = useState<"loading" | "connected" | "offline">("loading");

  const currentIntake = 1.8;
  const completion = Math.round((currentIntake / dailyGoal) * 100);
  const avgIntake = (weeklyData.reduce((total, day) => total + day.amount, 0) / weeklyData.length).toFixed(1);
  const bestDay = weeklyData.reduce((best, day) => (day.amount > best.amount ? day : best));
  const goalDays = weeklyData.filter((day) => day.amount >= day.goal).length;
  const maxAmount = Math.max(...weeklyData.map((day) => day.amount));
  const backendMessage = useMemo(() => {
    if (apiStatus === "connected") return "Connected to backend";
    if (apiStatus === "offline") return "Backend offline - showing sample data";
    return "Loading backend data...";
  }, [apiStatus]);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const [goal, analytics, notificationItems] = await Promise.all([
          getDashboardGoal(),
          getWeeklyAnalytics(),
          getNotifications(),
        ]);

        if (!isMounted) return;

        const goalMl = goal?.dailyGoalMl ?? goal?.daily_goal_ml ?? goal?.DailyGoalMl;
        if (goalMl) {
          setDailyGoal(goalMl / 1000);
        }

        const nextWeeklyData = mapReadingsToWeeklyData(analytics, goalMl ? goalMl / 1000 : dailyGoal);
        if (nextWeeklyData.length) {
          setWeeklyData(nextWeeklyData);
        }

        const nextNotifications = mapNotifications(notificationItems);
        if (nextNotifications.length) {
          setNotifications(nextNotifications);
        }

        setApiStatus("connected");
      } catch {
        if (isMounted) {
          setApiStatus("offline");
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

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

        <div
          className={`rounded-2xl border px-4 py-3 text-xs font-semibold ${
            apiStatus === "connected"
              ? "border-[#bbf7d0] bg-[#F0FDF4] text-[#166534]"
              : apiStatus === "offline"
              ? "border-[#fed7aa] bg-[#FFF7ED] text-[#c2410c]"
              : "border-[#dbe3ef] bg-white text-[#64748b]"
          }`}
        >
          {backendMessage}
        </div>

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
            <Smartphone className="h-5 w-5 text-[#0099FF]" />
            <h3 className="text-base font-bold text-[#1e293b]">Bottle Status</h3>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#34C759]" />
              <span className="text-xs font-semibold text-[#34C759]">Connected</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#F8FAFC] p-3">
              <p className="mb-1 text-xs text-[#94a3b8]">Model</p>
              <p className="font-bold text-[#1e293b]">H2GO Pro 750</p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-3">
              <p className="mb-1 text-xs text-[#94a3b8]">Connection</p>
              <p className="font-bold text-[#34C759]">Online</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Wifi className="h-4 w-4 text-[#94a3b8]" />
              <span className="text-xs text-[#94a3b8]">Last sync</span>
            </div>
            <span className="text-xs font-semibold text-[#64748b]">2 min ago</span>
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
              <p className="mb-1 text-xs text-[#94a3b8]">Today</p>
              <p className="font-bold text-[#0099FF]">{currentIntake.toFixed(1)}L</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-[#0099FF]" />
            <h3 className="text-base font-bold text-[#1e293b]">Water Quality</h3>
            <span className="ml-auto rounded-full border border-[#bbf7d0] bg-[#F0FDF4] px-3 py-1 text-xs font-bold text-[#34C759]">
              Excellent
            </span>
          </div>
          <div className="mb-5 flex items-center gap-5">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-3xl border border-[#0099FF]/15 bg-gradient-to-br from-[#0099FF]/10 to-[#0099FF]/5">
              <p className="text-2xl font-bold leading-none text-[#0099FF]">120</p>
              <p className="mt-0.5 text-xs font-medium text-[#0099FF]/70">ppm</p>
            </div>
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748b]">TDS Value</span>
                <span className="text-sm font-bold text-[#1e293b]">120 ppm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748b]">Safe to Drink</span>
                <span className="text-sm font-bold text-[#34C759]">Yes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748b]">TDS Range</span>
                <span className="text-sm font-semibold text-[#1e293b]">0-150 ppm</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#34C759] via-[#FF9500] to-[#ef4444] opacity-60" />
            <div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#0099FF] bg-white shadow-sm"
              style={{ left: `${(120 / 500) * 100}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-xs text-[#94a3b8]">0</span>
            <span className="text-xs text-[#94a3b8]">250</span>
            <span className="text-xs text-[#94a3b8]">500+ ppm</span>
          </div>
        </section>

        <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#0099FF]" />
            <h3 className="text-base font-bold text-[#1e293b]">Recent Notifications</h3>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;

              return (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 rounded-2xl p-3"
                  style={{ backgroundColor: notification.bg }}
                >
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${notification.color}18` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: notification.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-[#1e293b]">{notification.title}</p>
                      <span className="flex-shrink-0 text-xs text-[#94a3b8]">{notification.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#64748b]">{notification.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="h-2" />
      </div>
    </main>
  );
}
