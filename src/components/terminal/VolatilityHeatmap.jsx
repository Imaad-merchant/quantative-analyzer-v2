import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const SESSION_LABELS = {
  0: "Asia", 1: "Asia", 2: "London", 3: "London", 4: "London",
  5: "London", 6: "London", 7: "Pre-NY", 8: "Pre-NY",
  9: "NY Open", 10: "NY", 11: "NY", 12: "NY", 13: "NY Open",
  14: "NY", 15: "NY", 16: "NY Close", 17: "NY Close",
  18: "After", 19: "After", 20: "After", 21: "Asia", 22: "Asia", 23: "Asia",
};

const SESSION_COLORS = {
  "Asia": "#6366f1",
  "London": "#3b82f6",
  "Pre-NY": "#a855f7",
  "NY Open": "#f59e0b",
  "NY": "#22c55e",
  "NY Close": "#f97316",
  "After": "#6b7280",
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const session = SESSION_LABELS[d.hour] || "";
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs">
      <p className="text-gray-300">Hour: <span className="text-white font-bold">{d.hour}:00 UTC</span></p>
      <p className="text-gray-300">Session: <span className="font-bold" style={{ color: SESSION_COLORS[session] }}>{session}</span></p>
      <p className="text-gray-300">Avg Range: <span className="text-yellow-400 font-mono font-bold">{d.avg_range.toFixed(2)}</span></p>
    </div>
  );
};

export default function VolatilityHeatmap({ hourlyVol }) {
  if (!hourlyVol?.length) return null;

  const maxRange = Math.max(...hourlyVol.map(h => h.avg_range));

  const data = hourlyVol.map(h => ({
    ...h,
    session: SESSION_LABELS[h.hour] || "",
    intensity: h.avg_range / maxRange,
  }));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
        Hourly Volatility Heatmap
      </h2>
      <p className="text-xs text-gray-600 mb-4">Average High-Low range by hour (UTC)</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <XAxis
            dataKey="hour"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            tickLine={false}
            tickFormatter={v => `${v}h`}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1f2937" }} />
          <Bar dataKey="avg_range" radius={[3, 3, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={SESSION_COLORS[entry.session] || "#6b7280"}
                opacity={0.4 + entry.intensity * 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-3 mt-3">
        {Object.entries(SESSION_COLORS).map(([session, color]) => (
          <div key={session} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            {session}
          </div>
        ))}
      </div>
    </div>
  );
}