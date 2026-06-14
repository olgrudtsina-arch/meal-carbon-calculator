import type { FoodItem } from "./carbon-data";

export interface MealEntry {
  id: string;
  food: FoodItem;
  grams: number;
  carbonKg: number;
  mealType: MealType;
  loggedAt: string;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export const MEAL_TYPES: { value: MealType; label: string; emoji: string }[] = [
  { value: "breakfast", label: "Breakfast", emoji: "🌅" },
  { value: "lunch", label: "Lunch", emoji: "☀️" },
  { value: "dinner", label: "Dinner", emoji: "🌙" },
  { value: "snack", label: "Snack", emoji: "🍎" },
];

export interface DbMealLog {
  id: string;
  user_id: string;
  date: string;
  meal_type: MealType;
  food_id: string;
  food_name: string;
  quantity_grams: number;
  carbon_kg: number;
  created_at: string;
}

/** Format grams of CO2e nicely */
export function formatCarbon(kg: number): string {
  if (kg < 0.001) return "<0.001 kg";
  if (kg < 1) return `${(kg * 1000).toFixed(0)} g`;
  return `${kg.toFixed(2)} kg`;
}

export function carbonLabel(kg: number): string {
  return `${kg.toFixed(3)} kg CO₂e`;
}

/** Returns a simple color class based on carbon level */
export function carbonColor(kg: number): string {
  if (kg < 0.3) return "text-leaf-600";
  if (kg < 1) return "text-earth-500";
  return "text-red-500";
}

/** Equivalent comparisons for UX */
export function carbonEquivalents(totalKg: number) {
  return [
    { icon: "🚗", label: `${(totalKg * 4.3).toFixed(1)} km driven` },
    { icon: "📱", label: `${Math.round(totalKg * 121)} smartphone charges` },
    { icon: "💡", label: `${(totalKg * 5.5).toFixed(1)} hrs of LED bulb use` },
  ];
}

export function groupByDate(logs: DbMealLog[]): Record<string, DbMealLog[]> {
  return logs.reduce<Record<string, DbMealLog[]>>((acc, log) => {
    (acc[log.date] = acc[log.date] || []).push(log);
    return acc;
  }, {});
}

export function dailyCarbon(logsForDay: DbMealLog[]): number {
  return logsForDay.reduce((s, l) => s + l.carbon_kg, 0);
}
