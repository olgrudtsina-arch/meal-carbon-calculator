"use client";

import { TIER_CONFIG } from "@/lib/facts";
import { carbonEquivalents } from "@/lib/carbon-utils";

interface Props {
  totalKg: number;
  tier: "green" | "amber" | "red";
}

const MAX_KG = 8;

export default function CarbonMeter({ totalKg, tier }: Props) {
  const config = TIER_CONFIG[tier];
  const pct = Math.min((totalKg / MAX_KG) * 100, 100);
  const equivalents = carbonEquivalents(totalKg);

  return (
    <div className={`rounded-2xl border p-6 ${config.bg} ${config.border}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Today's carbon footprint</p>
          <p className={`text-3xl font-bold ${config.color}`}>
            {totalKg.toFixed(3)} <span className="text-lg font-normal">kg CO₂e</span>
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${config.border} ${config.color} ${config.bg}`}
        >
          {config.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/60 rounded-full h-3 mb-1 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${config.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mb-5">
        <span>0 kg</span>
        <span>Target: 2.5 kg</span>
        <span>{MAX_KG} kg</span>
      </div>

      {/* Equivalents */}
      <div className="grid grid-cols-3 gap-2">
        {equivalents.map((e) => (
          <div key={e.label} className="bg-white/70 rounded-xl p-2.5 text-center">
            <div className="text-xl mb-1">{e.icon}</div>
            <div className="text-xs text-gray-600 leading-tight">{e.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
