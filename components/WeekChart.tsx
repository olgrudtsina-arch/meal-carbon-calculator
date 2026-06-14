"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format, subDays, parseISO } from "date-fns";

interface Props {
  logs: { date: string; carbon_kg: number }[];
}

export default function WeekChart({ logs }: Props) {
  // Build last 7 days with 0 defaults
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), 6 - i), "yyyy-MM-dd");
    const total = logs
      .filter((l) => l.date === date)
      .reduce((s, l) => s + l.carbon_kg, 0);
    return { date, label: format(parseISO(date), "EEE"), total: +total.toFixed(3) };
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="font-semibold text-gray-900 mb-1">This week</h2>
      <p className="text-xs text-gray-400 mb-5">Daily carbon footprint (kg CO₂e)</p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={days} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
            formatter={(v: number) => [`${v} kg CO₂e`, "Carbon"]}
          />
          <ReferenceLine y={2.5} stroke="#22c55e" strokeDasharray="4 4" label={{ value: "Target", position: "right", fontSize: 11, fill: "#22c55e" }} />
          <Bar dataKey="total" fill="#4ade80" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
