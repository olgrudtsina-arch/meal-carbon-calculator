"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Search, Check, Loader2, Minus, Plus } from "lucide-react";
import {
  searchFoods,
  calcCarbonKg,
  getSwapsForFood,
  CATEGORY_LABELS,
  type FoodItem,
} from "@/lib/carbon-data";
import { MEAL_TYPES, carbonColor } from "@/lib/carbon-utils";
import SwapCard from "./SwapCard";

export default function MealLogger() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState(0);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("lunch");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchFoods(query));
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query]);

  const selectFood = (food: FoodItem) => {
    setSelected(food);
    setGrams(food.typicalServing);
    setQuery(food.name);
    setShowDropdown(false);
  };

  const carbonKg = selected ? calcCarbonKg(selected, grams) : 0;
  const swaps = selected ? getSwapsForFood(selected) : [];

  const save = async () => {
    if (!selected || grams <= 0) return;
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("meal_logs").insert({
      user_id: user.id,
      date: format(new Date(), "yyyy-MM-dd"),
      meal_type: mealType,
      food_id: selected.id,
      food_name: selected.name,
      quantity_grams: grams,
      carbon_kg: carbonKg,
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setSelected(null);
      setQuery("");
      setGrams(0);
      router.refresh();
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="space-y-5">
      {/* Meal type selector */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Meal type</p>
        <div className="grid grid-cols-4 gap-2">
          {MEAL_TYPES.map(({ value, label, emoji }) => (
            <button
              key={value}
              onClick={() => setMealType(value)}
              className={`flex flex-col items-center py-3 rounded-xl text-xs font-medium border transition-colors ${
                mealType === value
                  ? "bg-leaf-50 border-leaf-300 text-leaf-700"
                  : "border-gray-100 text-gray-500 hover:border-gray-200"
              }`}
            >
              <span className="text-xl mb-1">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Food search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">What did you eat?</p>
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
              placeholder="e.g. beef steak, oat milk latte, lentil soup…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leaf-300 focus:border-leaf-300"
            />
          </div>

          {showDropdown && results.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
              {results.map((food) => (
                <button
                  key={food.id}
                  onClick={() => selectFood(food)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-leaf-50 text-left transition-colors border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{food.name}</p>
                    <p className="text-xs text-gray-400">{CATEGORY_LABELS[food.category]}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${carbonColor(calcCarbonKg(food, food.typicalServing))}`}>
                      {calcCarbonKg(food, food.typicalServing).toFixed(3)} kg CO₂e
                    </p>
                    <p className="text-xs text-gray-400">{food.typicalServing} g serving</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showDropdown && results.length === 0 && query.length >= 2 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
              <p className="text-sm text-gray-400">No foods found for "{query}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Grams & preview */}
      {selected && (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setGrams(Math.max(10, grams - 25))}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  value={grams}
                  min={10}
                  max={2000}
                  onChange={(e) => setGrams(Math.max(10, +e.target.value))}
                  className="w-24 text-center border border-gray-200 rounded-lg py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-300"
                />
                <span className="text-gray-500 text-sm">grams</span>
              </div>
              <button
                onClick={() => setGrams(grams + 25)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Carbon preview */}
          <div className="bg-leaf-50 border border-leaf-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Carbon footprint</p>
                <p className={`text-2xl font-bold mt-0.5 ${carbonColor(carbonKg)}`}>
                  {carbonKg.toFixed(3)} <span className="text-base font-normal">kg CO₂e</span>
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Health score</p>
                <p className="font-semibold text-gray-800 text-lg">{selected.healthScore}/10</p>
              </div>
            </div>
          </div>

          {/* Swap suggestions */}
          {swaps.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Greener alternatives</p>
              {swaps.slice(0, 2).map((swap) => (
                <SwapCard key={swap.id} original={selected} swap={swap} grams={grams} />
              ))}
            </div>
          )}

          {/* Save button */}
          <button
            onClick={save}
            disabled={saving || saved}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              saved
                ? "bg-leaf-500 text-white"
                : "bg-leaf-600 hover:bg-leaf-700 text-white disabled:opacity-60"
            }`}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <>
                <Check className="w-4 h-4" />
                Logged!
              </>
            ) : (
              "Save to diary"
            )}
          </button>
        </>
      )}
    </div>
  );
}
