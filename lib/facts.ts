export interface Fact {
  id: string;
  emoji: string;
  title: string;
  body: string;
  tier: "green" | "amber" | "red";
}

/** Daily carbon thresholds in kg CO2e */
export const DAILY_THRESHOLDS = {
  green: 2.5,
  amber: 5.0,
};

export function getTierForCarbon(totalKg: number): "green" | "amber" | "red" {
  if (totalKg <= DAILY_THRESHOLDS.green) return "green";
  if (totalKg <= DAILY_THRESHOLDS.amber) return "amber";
  return "red";
}

export const FACTS: Fact[] = [
  // ─── Green (great day) ─────────────────────────────────────────────────────
  {
    id: "g1",
    emoji: "🌱",
    tier: "green",
    title: "You're genuinely crushing it today.",
    body: "Your meals today produced less CO₂ than charging a smartphone 200 times. If every person on Earth ate like you do today, we'd cut global food emissions by roughly a third. That's not a small thing — that's a movement.",
  },
  {
    id: "g2",
    emoji: "🐄",
    tier: "green",
    title: "For real — your plate is greener than a rainforest.",
    body: "Producing 1 kg of beef uses enough water to fill 15 bathtubs. Today you mostly skipped that tap running. Somewhere, a herd of metaphorical rubber ducks is grateful.",
  },
  {
    id: "g3",
    emoji: "🌍",
    tier: "green",
    title: "Planet Earth just sent you a thank-you note.",
    body: "Today's carbon footprint from your food is roughly equivalent to driving a car for just 5 km. The average person racks up over 50 km in food emissions daily. You're practically walking.",
  },
  {
    id: "g4",
    emoji: "🥦",
    tier: "green",
    title: "Your groceries weigh less on the atmosphere than a feather.",
    body: "Lentils fix their own nitrogen from the air — they literally help fertilise the soil they grow in. If you had lentils today, you ate something that actively helps the planet. How often do you get to say that?",
  },
  {
    id: "g5",
    emoji: "🌿",
    tier: "green",
    title: "You just made tomorrow a tiny bit better.",
    body: "Small, consistent choices outperform big, dramatic ones almost every time. Today was a perfect example of that quiet kind of courage.",
  },

  // ─── Amber (decent, could do better) ──────────────────────────────────────
  {
    id: "a1",
    emoji: "🌤️",
    tier: "amber",
    title: "Proud of you — and I think you can go even further.",
    body: "Today was a solid effort. Fun fact: swapping just one beef meal per week for lentils saves the same CO₂ as not driving for an entire month. One swap, once a week. No pressure — just possibility.",
  },
  {
    id: "a2",
    emoji: "🐟",
    tier: "amber",
    title: "You're on a good path. Here's a small nudge.",
    body: "Sardines and mackerel have 10× less carbon footprint than farmed salmon and are packed with omega-3s. They're basically the hidden gems of the seafood world — cheap, delicious, and your planet approves.",
  },
  {
    id: "a3",
    emoji: "🧆",
    tier: "amber",
    title: "You're doing great — here's a fun idea for next time.",
    body: "Chickpeas can pretend to be almost anything: tuna salad, \"chicken\" curry, crispy snacks. They produce 20× less CO₂ than beef and they're high-protein. The ultimate impersonator of the food world.",
  },
  {
    id: "a4",
    emoji: "🥛",
    tier: "amber",
    title: "I'm proud of today's choices — one small thought for tomorrow.",
    body: "If every coffee in the UK were made with oat milk instead of dairy, it would cut emissions equivalent to taking 100,000 cars off the road. One latte at a time.",
  },
  {
    id: "a5",
    emoji: "🌾",
    tier: "amber",
    title: "Today was good. Tomorrow could be legendary.",
    body: "Rice paddies release methane as they flood — white rice has a surprisingly large footprint. Quinoa or lentils alongside your meals gives you the same comfort with a fraction of the climate impact.",
  },
  {
    id: "a6",
    emoji: "🌻",
    tier: "amber",
    title: "You're building a habit. That's the hard part.",
    body: "If every cartoon character turned off the water while brushing their teeth, they'd save enough water to fill 10 bathtubs full of rubber duckies every minute. Similarly, your small food choices pile up into something real.",
  },

  // ─── Red (higher impact day, gentle but honest) ─────────────────────────────
  {
    id: "r1",
    emoji: "🌦️",
    tier: "red",
    title: "Every day is a fresh start — and I genuinely mean that.",
    body: "Today's food carbon was on the higher side, and that's okay. The average American diet produces 5× more food emissions than the average Indian diet. You now know where you stand, which most people never do. That awareness alone puts you ahead.",
  },
  {
    id: "r2",
    emoji: "🐮",
    tier: "red",
    title: "You had a big-carbon day. Here's the honest picture.",
    body: "Beef production uses 20× more land and generates 20× more emissions per gram of protein than lentils. That doesn't mean never eat it — it means knowing that one beefy day = roughly one week of low-impact eating to balance. Tomorrow's a clean slate.",
  },
  {
    id: "r3",
    emoji: "☁️",
    tier: "red",
    title: "I'd be failing you if I didn't say this gently but clearly.",
    body: "Food accounts for about 26% of global greenhouse gas emissions. High-meat diets are the single biggest lever an individual has to reduce their personal carbon footprint — bigger than giving up a car. You've taken the first step by tracking it.",
  },
  {
    id: "r4",
    emoji: "🍋",
    tier: "red",
    title: "When life gives you a high-carbon day, make lemonade. (Lemons are very low-carbon.)",
    body: "Try this tomorrow: replace one meat portion with mushrooms, beans, or tofu. You'll save more carbon than unplugging every appliance in your home for a week. And mushrooms are honestly just as satisfying in a stir-fry.",
  },
  {
    id: "r5",
    emoji: "🌊",
    tier: "red",
    title: "The ocean noticed today's choices. It's rooting for you to do better.",
    body: "Oceans absorb about 30% of our CO₂ — but they're warming and acidifying. The good news: plant-rich diets are one of the fastest ways to slow that. Not perfect days — just more green ones than red ones.",
  },
];

export function getRandomFact(tier: "green" | "amber" | "red"): Fact {
  const pool = FACTS.filter((f) => f.tier === tier);
  return pool[Math.floor(Math.random() * pool.length)];
}

export const TIER_CONFIG = {
  green: {
    label: "Great day!",
    color: "text-leaf-700",
    bg: "bg-leaf-50",
    border: "border-leaf-200",
    bar: "bg-leaf-500",
  },
  amber: {
    label: "Decent day",
    color: "text-earth-700",
    bg: "bg-earth-50",
    border: "border-earth-200",
    bar: "bg-earth-400",
  },
  red: {
    label: "High carbon day",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    bar: "bg-red-500",
  },
};
