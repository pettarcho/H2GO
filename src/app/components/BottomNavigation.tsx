import { useNavigate, useLocation } from "react-router";
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
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 min-w-[80px] transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-[#0099FF]/10" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
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
