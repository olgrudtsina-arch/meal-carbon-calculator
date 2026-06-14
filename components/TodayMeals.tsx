"use client";

import Link from "next/link";
import { Trash2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { DbMealLog, MealType } from "@/lib/carbon-utils";
import { MEAL_TYPES, carbonColor } from "@/lib/carbon-utils";

interface Props {
  logs: DbMealLog[];
}

const MEAL_EMOJI: Record<MealType, string> = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  snack: "🍎",
};

export default function TodayMeals({ logs }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const deleteLog = async (id: string) => {
    await supabase.from("meal_logs").delete().eq("id", id);
    router.refresh();
  };

  const byMeal = MEAL_TYPES.map(({ value, label }) => ({
    type: value,
    label,
    emoji: MEAL_EMOJI[value],
    items: logs.filter((l) => l.meal_type === value),
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-gray-900">Today's meals</h2>
        <Link
          href="/dashboard/log"
          className="flex items-center gap-1 text-leaf-600 hover:text-leaf-700 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add
        </Link>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-4xl mb-3">🍽️</p>
          <p className="text-sm">No meals logged yet today.</p>
          <Link
            href="/dashboard/log"
            className="inline-block mt-3 bg-leaf-600 hover:bg-leaf-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Log your first meal
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {byMeal
            .filter((m) => m.items.length > 0)
            .map((m) => (
              <div key={m.type}>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                  {m.emoji} {m.label}
                </p>
                <div className="space-y-2">
                  {m.items.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">{log.food_name}</p>
                        <p className="text-xs text-gray-400">{log.quantity_grams} g</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-semibold ${carbonColor(log.carbon_kg)}`}>
                          {log.carbon_kg.toFixed(3)} kg CO₂e
                        </span>
                        <button
                          onClick={() => deleteLog(log.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
