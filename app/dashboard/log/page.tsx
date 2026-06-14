import MealLogger from "@/components/MealLogger";

export default function LogPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Log a meal</h1>
        <p className="text-gray-500 text-sm mt-1">
          Search any food to see its carbon footprint and log it to your diary.
        </p>
      </div>
      <MealLogger />
    </div>
  );
}
