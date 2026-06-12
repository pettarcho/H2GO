import { useNavigate, useLocation } from "react-router-dom";
import { Home, User } from "lucide-react";

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e8f0] shadow-lg z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="grid grid-cols-2 items-center gap-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-[#0099FF]/10" : ""
                  }`}
                >
                  <Icon
                    className={`w-4.5 h-4.5 ${
                      isActive ? "text-[#0099FF]" : "text-[#64748b]"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs ${
                    isActive
                      ? "text-[#0099FF] font-semibold"
                      : "text-[#94a3b8] font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
