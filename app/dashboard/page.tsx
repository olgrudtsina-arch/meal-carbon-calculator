import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { Plus } from "lucide-react";
import CarbonMeter from "@/components/CarbonMeter";
import FactCard from "@/components/FactCard";
import WeekChart from "@/components/WeekChart";
import TodayMeals from "@/components/TodayMeals";
import { getTierForCarbon } from "@/lib/facts";
import type { DbMealLog } from "@/lib/carbon-utils";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const today = format(new Date(), "yyyy-MM-dd");

  // Fetch today's logs
  const { data: todayLogs } = await supabase
    .from("meal_logs")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", today)
    .order("created_at", { ascending: true });

  // Fetch last 7 days for chart
  const sevenDaysAgo = format(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    "yyyy-MM-dd"
  );
  const { data: weekLogs } = await supabase
    .from("meal_logs")
    .select("date, carbon_kg")
    .eq("user_id", user.id)
    .gte("date", sevenDaysAgo)
    .order("date", { ascending: true });

  const logs = (todayLogs ?? []) as DbMealLog[];
  const todayCarbon = logs.reduce((s, l) => s + l.carbon_kg, 0);
  const tier = getTierForCarbon(todayCarbon);

  const name = user.user_metadata?.full_name?.split(" ")[0] ?? "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}, {name} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {format(new Date(), "EEEE, MMMM d")}
          </p>
        </div>
        <Link
          href="/dashboard/log"
          className="flex items-center gap-2 bg-leaf-600 hover:bg-leaf-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log meal
        </Link>
      </div>

      {/* Top row */}
      <div className="grid md:grid-cols-2 gap-6">
        <CarbonMeter totalKg={todayCarbon} tier={tier} />
        <FactCard tier={tier} totalKg={todayCarbon} />
      </div>

      {/* Today's meals */}
      <TodayMeals logs={logs} />

      {/* Week chart */}
      <WeekChart logs={(weekLogs ?? []) as { date: string; carbon_kg: number }[]} />
    </div>
  );
}
