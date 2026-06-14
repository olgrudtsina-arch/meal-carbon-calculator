import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format, subDays } from "date-fns";
import HistoryView from "@/components/HistoryView";
import type { DbMealLog } from "@/lib/carbon-utils";

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const thirtyDaysAgo = format(subDays(new Date(), 30), "yyyy-MM-dd");

  const { data } = await supabase
    .from("meal_logs")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", thirtyDaysAgo)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your history</h1>
        <p className="text-gray-500 text-sm mt-1">Last 30 days of meals and carbon impact.</p>
      </div>
      <HistoryView logs={(data ?? []) as DbMealLog[]} />
    </div>
  );
}
