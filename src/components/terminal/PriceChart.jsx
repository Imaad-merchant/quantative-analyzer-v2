import React, { useMemo } from "react";
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend, Bar
} from "recharts";
import { format } from "date-fns";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs space-y-1 shadow-xl">
      <p className="text-gray-400">{d?.date ? format(new Date(d.date), "MMM d HH:mm") : label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex justify-between gap-4">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-mono text-white">{typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function PriceChart({ rows, sdLevels, symbol }) {
  const chartData = useMemo(() => {
    // Downsample if too many rows
    const maxPoints = 200;
    const step = Math.max(1, Math.floor(rows.length / maxPoints));
    return rows.filter((_, i) => i % step === 0).map(r => ({
      ...r,
      dateLabel: format(new Date(r.date), "MM/dd HH:mm"),
    }));
  }, [rows]);

  const allClose = rows.map(r => r.close).filter(Boolean);
  const minClose = Math.min(...allClose);
  const maxClose = Math.max(...allClose);
  const padding = (maxClose - minClose) * 0.05;
  const yMin = minClose - padding;
  const yMax = maxClose + padding;

  const sdLines = sdLevels ? [
    { value: sdLevels.plus2_5, label: "+2.5σ", color: "#ef4444" },
    { value: sdLevels.plus2, label: "+2.0σ", color: "#f97316" },
    { value: sdLevels.plus1_5, label: "+1.5σ", color: "#eab308" },
    { value: sdLevels.plus1, label: "+1.0σ", color: "#a3a3a3" },
    { value: sdLevels.mean, label: "Mean", color: "#facc15", strokeWidth: 2 },
    { value: sdLevels.minus1, label: "-1.0σ", color: "#a3a3a3" },
    { value: sdLevels.minus1_5, label: "-1.5σ", color: "#60a5fa" },
    { value: sdLevels.minus2, label: "-2.0σ", color: "#3b82f6" },
    { value: sdLevels.minus2_5, label: "-2.5σ", color: "#22c55e" },
  ].filter(l => l.value >= yMin && l.value <= yMax) : [];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
        Price Chart · {symbol}
      </h2>
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis
            dataKey="dateLabel"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            interval={Math.floor(chartData.length / 6)}
            tickLine={false}
          />
          <YAxis
            domain={[yMin, yMax]}
            tick={{ fill: "#6b7280", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={70}
            tickFormatter={v => v.toFixed(0)}
          />
          <Tooltip content={<CustomTooltip />} />

          {sdLines.map(l => (
            <ReferenceLine
              key={l.label}
              y={l.value}
              stroke={l.color}
              strokeDasharray={l.label === "Mean" ? "none" : "4 3"}
              strokeWidth={l.strokeWidth || 1}
              label={{ value: l.label, position: "right", fill: l.color, fontSize: 9 }}
            />
          ))}

          <Bar dataKey="volume" fill="#1f2937" opacity={0.5} name="Volume" yAxisId={0} />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#3b82f6"
            strokeWidth={1.5}
            dot={false}
            name="Close"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}