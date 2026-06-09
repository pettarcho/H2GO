import { Bell, Clock, Droplet, TrendingUp } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "reminder",
    icon: Clock,
    color: "#0099FF",
    title: "Hydration Reminder",
    message: "Time to drink water! You haven't hydrated in 2 hours.",
    time: "10 min ago",
  },
  {
    id: 2,
    type: "achievement",
    icon: TrendingUp,
    color: "#34C759",
    title: "Goal Achieved!",
    message: "You've reached your daily hydration goal. Great job!",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "reminder",
    icon: Droplet,
    color: "#0099FF",
    title: "Morning Hydration",
    message: "Start your day with a glass of water!",
    time: "8 hours ago",
  },
  {
    id: 4,
    type: "alert",
    icon: Bell,
    color: "#FF9500",
    title: "Low Battery",
    message: "Your H2GO bottle battery is below 20%. Please charge.",
    time: "Yesterday",
  },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Notifications</h1>
          <p className="text-[#64748b]">Stay on top of your hydration</p>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0] mb-6">
          <h2 className="font-semibold text-[#1e293b] mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1e293b]">Hydration Reminders</p>
                <p className="text-sm text-[#64748b]">Every 2 hours</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#cbd5e1] rounded-full peer peer-checked:bg-[#0099FF] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1e293b]">Goal Alerts</p>
                <p className="text-sm text-[#64748b]">Daily achievement notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#cbd5e1] rounded-full peer peer-checked:bg-[#0099FF] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1e293b]">Battery Alerts</p>
                <p className="text-sm text-[#64748b]">Low battery warnings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#cbd5e1] rounded-full peer peer-checked:bg-[#0099FF] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification History */}
        <div className="mb-4">
          <h2 className="font-semibold text-[#1e293b] mb-4">Recent Notifications</h2>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${notification.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: notification.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1e293b] mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-[#94a3b8]">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
