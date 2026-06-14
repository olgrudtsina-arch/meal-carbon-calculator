import { ArrowRight, Leaf, Heart } from "lucide-react";
import type { FoodItem } from "@/lib/carbon-data";
import { calcCarbonKg } from "@/lib/carbon-data";

interface Props {
  original: FoodItem;
  swap: FoodItem;
  grams: number;
}

export default function SwapCard({ original, swap, grams }: Props) {
  const origCo2 = calcCarbonKg(original, grams);
  const swapCo2 = calcCarbonKg(swap, grams);
  const saving = origCo2 - swapCo2;
  const pctSaving = Math.round((saving / origCo2) * 100);

  return (
    <div className="bg-leaf-50 border border-leaf-200 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Leaf className="w-4 h-4 text-leaf-600" />
        <span className="text-xs font-semibold text-leaf-700 uppercase tracking-wide">Green swap</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white rounded-xl p-3 text-center border border-gray-100">
          <p className="text-sm font-medium text-gray-700">{original.name}</p>
          <p className="text-xs text-red-400 mt-1">{origCo2.toFixed(3)} kg CO₂e</p>
        </div>

        <ArrowRight className="w-5 h-5 text-leaf-500 shrink-0" />

        <div className="flex-1 bg-white rounded-xl p-3 text-center border border-leaf-200">
          <p className="text-sm font-medium text-leaf-700">{swap.name}</p>
          <p className="text-xs text-leaf-600 mt-1">{swapCo2.toFixed(3)} kg CO₂e</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1 text-leaf-700 font-semibold">
          <Leaf className="w-3 h-3" />
          Save {saving.toFixed(3)} kg CO₂e ({pctSaving}% less carbon)
        </span>
        <span className="flex items-center gap-1 text-pink-500">
          <Heart className="w-3 h-3" />
          Health score: {swap.healthScore}/10
        </span>
      </div>
    </div>
  );
}
