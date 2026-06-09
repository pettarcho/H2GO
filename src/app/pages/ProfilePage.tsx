import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Target,
  Smartphone,
  Battery,
  Wifi,
  LogOut,
  Check,
  Trash2,
} from "lucide-react";

const REMINDER_OPTIONS = [
  { label: "Every 1 Hour", value: 1 },
  { label: "Every 2 Hours", value: 2 },
  { label: "Every 3 Hours", value: 3 },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [dailyGoal, setDailyGoal] = useState(3.0);
  const [reminderFreq, setReminderFreq] = useState(2);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-lg mx-auto px-5 py-6 space-y-5">

        {/* Header */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-[#1e293b]">Profile</h1>
          <p className="text-sm text-[#94a3b8] mt-0.5">Manage your account and preferences</p>
        </div>

        {/* User Information */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center gap-4">
            <div className="w-18 h-18 w-[72px] h-[72px] bg-gradient-to-br from-[#0099FF] to-[#0066cc] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#0099FF]/20">
              KN
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#1e293b]">Karen Nikzad</h2>
              <p className="text-sm text-[#94a3b8]">Karennikzad@gmail.com</p>
              <span className="inline-block mt-1.5 bg-[#EFF8FF] text-[#0099FF] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Active Member
              </span>
            </div>
          </div>
        </div>

        {/* Hydration Goals */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-5">
            <Target className="w-5 h-5 text-[#0099FF]" />
            <h2 className="font-bold text-[#1e293b]">Hydration Goals</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#64748b]">Daily Goal</span>
              <span className="text-base font-bold text-[#0099FF]">{dailyGoal.toFixed(1)}L</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(parseFloat(e.target.value))}
              className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #0099FF 0%, #0099FF ${
                  ((dailyGoal - 1) / 4) * 100
                }%, #f1f5f9 ${((dailyGoal - 1) / 4) * 100}%, #f1f5f9 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-[#94a3b8] mt-1.5">
              <span>1L</span>
              <span>3L</span>
              <span>5L</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-[#64748b] mb-3">Reminder Frequency</p>
            <div className="grid grid-cols-3 gap-2">
              {REMINDER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setReminderFreq(opt.value)}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-semibold transition-all border ${
                    reminderFreq === opt.value
                      ? "bg-[#0099FF] text-white border-[#0099FF] shadow-md shadow-[#0099FF]/20"
                      : "bg-[#F8FAFC] text-[#64748b] border-[#e2e8f0] hover:border-[#0099FF]/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Connected Bottle */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-[#0099FF]" />
            <h2 className="font-bold text-[#1e293b]">Connected Bottle</h2>
          </div>

          <div className="bg-gradient-to-br from-[#0099FF] to-[#0077cc] rounded-2xl p-5 text-white mb-3">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/75 text-xs font-medium mb-0.5">Model</p>
                <p className="font-bold text-lg leading-tight">H2GO Pro 750</p>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#34C759] rounded-full animate-pulse" />
                <span className="text-xs font-semibold">Connected</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white/60 text-xs mb-0.5">Serial Number</p>
                <p className="font-semibold text-sm">HG-2026-7850</p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-0.5">Battery</p>
                <div className="flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5" />
                  <p className="font-semibold text-sm">85%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#94a3b8] px-1">
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" />
              <span>Last sync: 2 min ago</span>
            </div>
            <span>Firmware v2.1.4</span>
          </div>

          <button className="w-full mt-4 bg-[#FFF5F5] text-[#ef4444] py-3 rounded-2xl text-sm font-semibold hover:bg-[#fee2e2] transition-colors border border-[#fecaca] flex items-center justify-center gap-2">
            <Trash2 className="w-4 h-4" />
            Disconnect Bottle
          </button>
        </div>

        {/* Save Changes */}
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all shadow-lg ${
            saved
              ? "bg-[#34C759] text-white shadow-[#34C759]/25"
              : "bg-gradient-to-r from-[#0099FF] to-[#0077dd] text-white shadow-[#0099FF]/25 hover:from-[#0088ee] hover:to-[#0066cc]"
          }`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              Saved!
            </span>
          ) : (
            "Save Changes"
          )}
        </button>

        {/* Log Out */}
        <button
          onClick={handleLogout}
          className="w-full bg-white text-[#ef4444] py-4 rounded-2xl font-semibold border border-[#fecaca] hover:bg-[#fff5f5] transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        <p className="text-center text-xs text-[#94a3b8] pb-4">
          H2GO v1.0.0 · Privacy Policy · Terms of Service
        </p>
      </div>
    </div>
  );
}
