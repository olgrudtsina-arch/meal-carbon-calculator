"use client";

import { useState } from "react";
import { getRandomFact, TIER_CONFIG } from "@/lib/facts";
import { RefreshCw } from "lucide-react";

interface Props {
  tier: "green" | "amber" | "red";
  totalKg: number;
}

export default function FactCard({ tier, totalKg }: Props) {
  const [fact, setFact] = useState(() => getRandomFact(tier));
  const config = TIER_CONFIG[tier];

  if (totalKg === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col justify-between">
        <div>
          <p className="text-3xl mb-3">🌱</p>
          <h3 className="font-semibold text-gray-900 mb-2">Start logging your meals!</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Once you add your first meal today, we'll show you your carbon footprint and a
            personalised insight card here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border p-6 flex flex-col justify-between ${config.bg} ${config.border}`}>
      <div>
        <p className="text-3xl mb-3">{fact.emoji}</p>
        <h3 className={`font-semibold mb-2 ${config.color}`}>{fact.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{fact.body}</p>
      </div>

      <button
        onClick={() => setFact(getRandomFact(tier))}
        className="mt-4 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors self-start"
      >
        <RefreshCw className="w-3 h-3" />
        Another fact
      </button>
    </div>
  );
}
