import { Ruler, CheckCircle2, Calendar, Settings2 } from "lucide-react";

export default function CalibrationPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Calibration</h1>
          <p className="text-[#64748b]">Optimize your bottle settings</p>
        </div>

        {/* Calibration Status */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0] mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#34C75915] rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#34C759]" />
            </div>
            <div>
              <h2 className="font-semibold text-[#1e293b] text-lg">Calibrated</h2>
              <p className="text-[#64748b] text-sm">Your bottle is properly calibrated</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-sm text-[#64748b] mb-1">Last Calibration</p>
              <p className="font-semibold text-[#1e293b]">May 15, 2026</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-sm text-[#64748b] mb-1">Accuracy</p>
              <p className="font-semibold text-[#34C759]">98.5%</p>
            </div>
          </div>
        </div>

        {/* Bottle Size */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0] mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Ruler className="w-5 h-5 text-[#0099FF]" />
            <h2 className="font-semibold text-[#1e293b]">Bottle Size</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl cursor-pointer hover:bg-[#f1f5f9] transition-colors">
              <div>
                <p className="font-medium text-[#1e293b]">500ml</p>
                <p className="text-sm text-[#64748b]">Small bottle</p>
              </div>
              <input
                type="radio"
                name="bottle-size"
                className="w-5 h-5 text-[#0099FF] focus:ring-2 focus:ring-[#0099FF]"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#0099FF] rounded-xl cursor-pointer shadow-sm">
              <div>
                <p className="font-medium text-white">750ml</p>
                <p className="text-sm text-white/90">Standard bottle</p>
              </div>
              <input
                type="radio"
                name="bottle-size"
                defaultChecked
                className="w-5 h-5 text-white focus:ring-2 focus:ring-white"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl cursor-pointer hover:bg-[#f1f5f9] transition-colors">
              <div>
                <p className="font-medium text-[#1e293b]">1000ml</p>
                <p className="text-sm text-[#64748b]">Large bottle</p>
              </div>
              <input
                type="radio"
                name="bottle-size"
                className="w-5 h-5 text-[#0099FF] focus:ring-2 focus:ring-[#0099FF]"
              />
            </label>
          </div>
        </div>

        {/* Calibration Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0] mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings2 className="w-5 h-5 text-[#0099FF]" />
            <h2 className="font-semibold text-[#1e293b]">Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1e293b]">Auto-Calibration</p>
                <p className="text-sm text-[#64748b]">Calibrate automatically</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#cbd5e1] rounded-full peer peer-checked:bg-[#0099FF] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1e293b]">Calibration Reminders</p>
                <p className="text-sm text-[#64748b]">Monthly calibration alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#cbd5e1] rounded-full peer peer-checked:bg-[#0099FF] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Recalibrate Button */}
        <button className="w-full bg-[#0099FF] text-white py-4 rounded-2xl font-semibold hover:bg-[#0088ee] transition-colors shadow-sm flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Start Calibration
        </button>

        <p className="text-center text-sm text-[#64748b] mt-4">
          We recommend calibrating your bottle every 30 days
        </p>
      </div>
    </div>
  );
}
