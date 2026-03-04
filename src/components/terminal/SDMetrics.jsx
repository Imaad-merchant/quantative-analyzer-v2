import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function MetricCard({ label, value, highlight, color = "text-gray-200" }) {
  return (
    <div className={`bg-gray-900 border rounded-lg p-3 ${highlight ? "border-yellow-500/50" : "border-gray-800"}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-lg font-bold font-mono ${color}`}>{value ?? "—"}</p>
    </div>
  );
}

export default function SDMetrics({ sdLevels, currentPrice }) {
  if (!sdLevels) return null;

  const { mean, std, plus1_5, plus2_5, minus1_5, minus2_5 } = sdLevels;
  const fmt = v => v?.toFixed(2);

  const dist = currentPrice && mean ? ((currentPrice - mean) / std).toFixed(2) : null;
  const distNum = parseFloat(dist);

  return (
    <div>
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
        London Session SD Levels
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard label="London Mean" value={fmt(mean)} highlight color="text-yellow-400" />
        <MetricCard label="StdDev" value={fmt(std)} color="text-gray-300" />
        <MetricCard label="Current Price" value={fmt(currentPrice)} color="text-white" />
        <MetricCard
          label="Distance (σ)"
          value={dist ? `${distNum > 0 ? "+" : ""}${dist}σ` : "—"}
          color={distNum > 1.5 ? "text-red-400" : distNum < -1.5 ? "text-green-400" : "text-gray-200"}
        />
        <MetricCard label="+1.5 SD" value={fmt(plus1_5)} color="text-orange-400" />
        <MetricCard label="+2.5 SD" value={fmt(plus2_5)} color="text-red-400" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
        <MetricCard label="+1.0 SD" value={fmt(sdLevels.plus1)} color="text-yellow-300" />
        <MetricCard label="+2.0 SD" value={fmt(sdLevels.plus2)} color="text-orange-400" />
        <MetricCard label="-1.0 SD" value={fmt(sdLevels.minus1)} color="text-blue-300" />
        <MetricCard label="-1.5 SD" value={fmt(minus1_5)} color="text-blue-400" />
      </div>
    </div>
  );
}