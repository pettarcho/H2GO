import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#0099FF] to-[#0066cc] rounded-[28px] mb-6 shadow-xl shadow-[#0099FF]/30">
            <Droplets className="w-12 h-12 text-white" fill="rgba(255,255,255,0.3)" />
          </div>
          <h1 className="text-5xl font-bold text-[#1e293b] tracking-tight mb-2">H2GO</h1>
          <p className="text-[#64748b] text-base">Smart Hydration Tracking</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 border border-[#dbe3ef]">
          <div className="mb-6 grid grid-cols-2 rounded-2xl bg-[#F1F5F9] p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
                mode === "login" ? "bg-white text-[#0099FF] shadow-sm" : "text-[#64748b]"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
                mode === "signup" ? "bg-white text-[#0099FF] shadow-sm" : "text-[#64748b]"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-bold text-[#1e293b] mb-1">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-[#64748b] text-sm mb-7">
            {mode === "login" ? "Sign in to your account" : "Start tracking your hydration"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1e293b] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#dbe3ef] bg-[#F8FAFC] py-3.5 pl-11 pr-4 text-[#1e293b] transition-all placeholder:text-[#cbd5e1] focus:border-[#0099FF] focus:outline-none focus:ring-2 focus:ring-[#0099FF]/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1e293b] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-[#dbe3ef] bg-[#F8FAFC] py-3.5 pl-11 pr-4 text-[#1e293b] transition-all placeholder:text-[#cbd5e1] focus:border-[#0099FF] focus:outline-none focus:ring-2 focus:ring-[#0099FF]/20"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0099FF] to-[#0077dd] text-white py-4 rounded-2xl font-semibold hover:from-[#0088ee] hover:to-[#0066cc] transition-all shadow-lg shadow-[#0099FF]/25"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
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
