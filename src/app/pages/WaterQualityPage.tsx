import { Droplets, CheckCircle2, Clock } from "lucide-react";

export default function WaterQualityPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Water Quality</h1>
          <p className="text-[#64748b]">Monitor your water's health</p>
        </div>

        {/* TDS Value Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e2e8f0] mb-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0099FF15] rounded-3xl mb-4">
              <Droplets className="w-10 h-10 text-[#0099FF]" />
            </div>
            <p className="text-[#64748b] mb-2">Current TDS Value</p>
            <h2 className="text-5xl font-bold text-[#1e293b] mb-6">120 ppm</h2>

            <div className="inline-flex items-center gap-2 bg-[#34C75915] text-[#34C759] px-6 py-3 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Excellent</span>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0] mb-6">
          <h3 className="font-semibold text-[#1e293b] mb-4">Water Quality Status</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#34C75915] rounded-xl">
              <span className="text-[#1e293b] font-medium">Quality Level</span>
              <span className="text-[#34C759] font-semibold">Excellent</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl">
              <span className="text-[#64748b]">Safe to Drink</span>
              <CheckCircle2 className="w-5 h-5 text-[#34C759]" />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl">
              <span className="text-[#64748b]">TDS Range</span>
              <span className="text-[#1e293b] font-medium">0-150 ppm</span>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-gradient-to-br from-[#0099FF] to-[#0077cc] rounded-3xl p-6 shadow-lg text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Last Updated</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                5 minutes ago
              </p>
              <p className="text-white/70 text-xs mt-2">
                Quality is monitored continuously in real-time
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-[#e2e8f0]">
          <p className="text-sm text-[#64748b] leading-relaxed">
            <span className="font-semibold text-[#1e293b]">TDS (Total Dissolved Solids)</span> measures the amount of minerals, salts, and metals dissolved in water. Values between 0-150 ppm indicate excellent quality.
          </p>
        </div>
      </div>
    </div>
  );
}
