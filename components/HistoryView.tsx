"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { DbMealLog } from "@/lib/carbon-utils";
import { carbonColor, groupByDate, dailyCarbon } from "@/lib/carbon-utils";
import { getTierForCarbon, TIER_CONFIG } from "@/lib/facts";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface Props {
  logs: DbMealLog[];
}

export default function HistoryView({ logs }: Props) {
  const [openDates, setOpenDates] = useState<Set<string>>(new Set());
  const grouped = groupByDate(logs);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const toggle = (date: string) => {
    setOpenDates((prev) => {
      const next = new Set(prev);
      next.has(date) ? next.delete(date) : next.add(date);
      return next;
    });
  };

  // Chart data — ascending
  const chartData = [...sortedDates]
    .reverse()
    .map((date) => ({
      label: format(parseISO(date), "MMM d"),
      carbon: +dailyCarbon(grouped[date]).toFixed(3),
    }));

  if (logs.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-5xl mb-4">📅</p>
        <p>No meals logged yet. Start tracking today!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trend chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-1">30-day trend</h2>
        <p className="text-xs text-gray-400 mb-5">Daily carbon footprint (kg CO₂e)</p>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
              formatter={(v) => [`${v ?? 0} kg CO₂e`, "Carbon"]}
            />
            <ReferenceLine y={2.5} stroke="#22c55e" strokeDasharray="4 4" />
            <Area type="monotone" dataKey="carbon" stroke="#22c55e" fill="url(#carbonGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Day-by-day accordion */}
      <div className="space-y-3">
        {sortedDates.map((date) => {
          const dayLogs = grouped[date];
          const total = dailyCarbon(dayLogs);
          const tier = getTierForCarbon(total);
          const config = TIER_CONFIG[tier];
          const open = openDates.has(date);

          return (
            <div key={date} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggle(date)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${config.bar}`}
                  />
                  <div className="text-left">
                    <p className="font-medium text-gray-800 text-sm">
                      {format(parseISO(date), "EEEE, MMMM d")}
                    </p>
                    <p className="text-xs text-gray-400">{dayLogs.length} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-semibold ${carbonColor(total)}`}>
                    {total.toFixed(3)} kg CO₂e
                  </span>
                  {open ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {open && (
                <div className="border-t border-gray-50 px-5 py-3 space-y-2">
                  {dayLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between py-1.5">
                      <div>
                        <p className="text-sm text-gray-700">{log.food_name}</p>
                        <p className="text-xs text-gray-400 capitalize">
                          {log.meal_type} · {log.quantity_grams} g
                        </p>
                      </div>
                      <span className={`text-sm font-medium ${carbonColor(log.carbon_kg)}`}>
                        {log.carbon_kg.toFixed(3)} kg
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
