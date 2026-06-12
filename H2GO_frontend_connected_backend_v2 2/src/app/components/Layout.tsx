import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <Outlet />
      <BottomNavigation />
    </div>
  );
}
