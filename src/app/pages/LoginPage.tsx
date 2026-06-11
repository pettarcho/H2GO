import { useState } from "react";
import { useNavigate } from "react-router";
import { Droplets } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#0099FF] to-[#0066cc] rounded-[28px] mb-6 shadow-xl shadow-[#0099FF]/30">
            <Droplets className="w-12 h-12 text-white" fill="rgba(255,255,255,0.3)" />
          </div>
          <h1 className="text-5xl font-bold text-[#1e293b] tracking-tight mb-2">H2GO</h1>
          <p className="text-[#64748b] text-base">Smart Hydration Tracking</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-[#0099FF]/8 p-8 border border-[#e2e8f0]">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-1">Welcome back</h2>
          <p className="text-[#64748b] text-sm mb-7">Sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1e293b] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#e2e8f0] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0099FF]/30 focus:border-[#0099FF] transition-all text-[#1e293b] placeholder:text-[#cbd5e1]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1e293b] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#e2e8f0] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0099FF]/30 focus:border-[#0099FF] transition-all text-[#1e293b] placeholder:text-[#cbd5e1]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0099FF] to-[#0077dd] text-white py-4 rounded-2xl font-semibold hover:from-[#0088ee] hover:to-[#0066cc] transition-all shadow-lg shadow-[#0099FF]/30 mt-2"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full bg-white text-[#0099FF] py-4 rounded-2xl font-semibold border-2 border-[#0099FF] hover:bg-[#EFF8FF] transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#94a3b8] mt-6">
          By continuing, you agree to our Terms &amp; Privacy Policy
        </p>
      </div>
    </div>
  );
}
