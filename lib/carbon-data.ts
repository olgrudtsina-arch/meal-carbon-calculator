export type FoodCategory =
  | "red-meat"
  | "poultry"
  | "seafood"
  | "dairy"
  | "eggs"
  | "legumes"
  | "grains"
  | "vegetables"
  | "fruits"
  | "nuts-seeds"
  | "oils"
  | "beverages"
  | "sweets"
  | "processed";

export interface FoodItem {
  id: string;
  name: string;
  aliases: string[];
  category: FoodCategory;
  /** grams of CO2e per 100g of food */
  co2ePer100g: number;
  /** 1 (least) to 10 (most) healthy */
  healthScore: number;
  /** typical serving size in grams */
  typicalServing: number;
  swapIds: string[];
}

export const FOODS: FoodItem[] = [
  // ─── Red Meat ──────────────────────────────────────────────────────────────
  {
    id: "beef",
    name: "Beef",
    aliases: ["steak", "ground beef", "hamburger", "burger", "mince", "brisket", "ribeye"],
    category: "red-meat",
    co2ePer100g: 2700,
    healthScore: 4,
    typicalServing: 150,
    swapIds: ["lentils", "black-beans", "mushrooms", "tofu"],
  },
  {
    id: "lamb",
    name: "Lamb",
    aliases: ["mutton", "lamb chop", "lamb shank"],
    category: "red-meat",
    co2ePer100g: 2390,
    healthScore: 4,
    typicalServing: 150,
    swapIds: ["chicken", "lentils", "chickpeas"],
  },
  {
    id: "pork",
    name: "Pork",
    aliases: ["bacon", "ham", "sausage", "pork chop", "ribs", "pulled pork", "prosciutto"],
    category: "red-meat",
    co2ePer100g: 700,
    healthScore: 5,
    typicalServing: 120,
    swapIds: ["chicken", "tofu", "tempeh"],
  },

  // ─── Poultry ───────────────────────────────────────────────────────────────
  {
    id: "chicken",
    name: "Chicken",
    aliases: ["chicken breast", "chicken thigh", "chicken wing", "poultry", "rotisserie"],
    category: "poultry",
    co2ePer100g: 430,
    healthScore: 7,
    typicalServing: 150,
    swapIds: ["tofu", "tempeh", "chickpeas", "lentils"],
  },
  {
    id: "turkey",
    name: "Turkey",
    aliases: ["turkey breast", "turkey mince"],
    category: "poultry",
    co2ePer100g: 575,
    healthScore: 7,
    typicalServing: 150,
    swapIds: ["chicken", "tofu", "lentils"],
  },

  // ─── Seafood ───────────────────────────────────────────────────────────────
  {
    id: "salmon",
    name: "Salmon",
    aliases: ["farmed salmon", "smoked salmon", "salmon fillet"],
    category: "seafood",
    co2ePer100g: 600,
    healthScore: 8,
    typicalServing: 150,
    swapIds: ["sardines", "mackerel", "tofu"],
  },
  {
    id: "tuna",
    name: "Tuna",
    aliases: ["canned tuna", "tuna steak", "ahi"],
    category: "seafood",
    co2ePer100g: 360,
    healthScore: 8,
    typicalServing: 120,
    swapIds: ["sardines", "chickpeas", "lentils"],
  },
  {
    id: "sardines",
    name: "Sardines",
    aliases: ["canned sardines", "anchovies"],
    category: "seafood",
    co2ePer100g: 140,
    healthScore: 9,
    typicalServing: 100,
    swapIds: [],
  },
  {
    id: "mackerel",
    name: "Mackerel",
    aliases: ["smoked mackerel"],
    category: "seafood",
    co2ePer100g: 150,
    healthScore: 9,
    typicalServing: 120,
    swapIds: [],
  },
  {
    id: "shrimp",
    name: "Shrimp",
    aliases: ["prawns", "farmed shrimp"],
    category: "seafood",
    co2ePer100g: 1890,
    healthScore: 6,
    typicalServing: 100,
    swapIds: ["sardines", "tofu", "chickpeas"],
  },

  // ─── Dairy ─────────────────────────────────────────────────────────────────
  {
    id: "cheese",
    name: "Cheese",
    aliases: ["cheddar", "mozzarella", "parmesan", "brie", "gouda", "feta", "cream cheese"],
    category: "dairy",
    co2ePer100g: 1050,
    healthScore: 5,
    typicalServing: 40,
    swapIds: ["nutritional-yeast", "tofu"],
  },
  {
    id: "milk",
    name: "Milk",
    aliases: ["whole milk", "semi-skimmed milk", "cow's milk", "dairy milk"],
    category: "dairy",
    co2ePer100g: 125,
    healthScore: 6,
    typicalServing: 250,
    swapIds: ["oat-milk", "almond-milk", "soy-milk"],
  },
  {
    id: "oat-milk",
    name: "Oat Milk",
    aliases: ["oat drink"],
    category: "dairy",
    co2ePer100g: 45,
    healthScore: 6,
    typicalServing: 250,
    swapIds: [],
  },
  {
    id: "almond-milk",
    name: "Almond Milk",
    aliases: [],
    category: "dairy",
    co2ePer100g: 55,
    healthScore: 6,
    typicalServing: 250,
    swapIds: ["oat-milk", "soy-milk"],
  },
  {
    id: "soy-milk",
    name: "Soy Milk",
    aliases: [],
    category: "dairy",
    co2ePer100g: 40,
    healthScore: 7,
    typicalServing: 250,
    swapIds: [],
  },
  {
    id: "yogurt",
    name: "Yogurt",
    aliases: ["greek yogurt", "plain yogurt"],
    category: "dairy",
    co2ePer100g: 220,
    healthScore: 7,
    typicalServing: 150,
    swapIds: ["soy-yogurt"],
  },
  {
    id: "soy-yogurt",
    name: "Soy Yogurt",
    aliases: ["plant-based yogurt", "coconut yogurt"],
    category: "dairy",
    co2ePer100g: 80,
    healthScore: 7,
    typicalServing: 150,
    swapIds: [],
  },
  {
    id: "butter",
    name: "Butter",
    aliases: [],
    category: "dairy",
    co2ePer100g: 900,
    healthScore: 3,
    typicalServing: 10,
    swapIds: ["olive-oil"],
  },

  // ─── Eggs ──────────────────────────────────────────────────────────────────
  {
    id: "eggs",
    name: "Eggs",
    aliases: ["egg", "scrambled eggs", "fried egg", "boiled egg", "omelette"],
    category: "eggs",
    co2ePer100g: 430,
    healthScore: 7,
    typicalServing: 100,
    swapIds: ["tofu", "chickpeas"],
  },

  // ─── Legumes ───────────────────────────────────────────────────────────────
  {
    id: "lentils",
    name: "Lentils",
    aliases: ["red lentils", "green lentils", "dal", "dhal"],
    category: "legumes",
    co2ePer100g: 90,
    healthScore: 10,
    typicalServing: 150,
    swapIds: [],
  },
  {
    id: "chickpeas",
    name: "Chickpeas",
    aliases: ["garbanzo", "hummus", "chana"],
    category: "legumes",
    co2ePer100g: 80,
    healthScore: 10,
    typicalServing: 150,
    swapIds: [],
  },
  {
    id: "black-beans",
    name: "Black Beans",
    aliases: ["kidney beans", "pinto beans", "baked beans", "cannellini beans"],
    category: "legumes",
    co2ePer100g: 85,
    healthScore: 10,
    typicalServing: 150,
    swapIds: [],
  },
  {
    id: "edamame",
    name: "Edamame",
    aliases: ["soybeans"],
    category: "legumes",
    co2ePer100g: 100,
    healthScore: 9,
    typicalServing: 100,
    swapIds: [],
  },
  {
    id: "tofu",
    name: "Tofu",
    aliases: ["bean curd", "silken tofu", "firm tofu"],
    category: "legumes",
    co2ePer100g: 195,
    healthScore: 9,
    typicalServing: 150,
    swapIds: [],
  },
  {
    id: "tempeh",
    name: "Tempeh",
    aliases: [],
    category: "legumes",
    co2ePer100g: 200,
    healthScore: 9,
    typicalServing: 100,
    swapIds: [],
  },

  // ─── Grains ────────────────────────────────────────────────────────────────
  {
    id: "white-rice",
    name: "White Rice",
    aliases: ["rice", "jasmine rice", "basmati rice", "fried rice"],
    category: "grains",
    co2ePer100g: 285,
    healthScore: 5,
    typicalServing: 180,
    swapIds: ["brown-rice", "quinoa", "lentils"],
  },
  {
    id: "brown-rice",
    name: "Brown Rice",
    aliases: ["wholegrain rice"],
    category: "grains",
    co2ePer100g: 260,
    healthScore: 7,
    typicalServing: 180,
    swapIds: ["quinoa", "lentils"],
  },
  {
    id: "pasta",
    name: "Pasta",
    aliases: ["spaghetti", "penne", "fusilli", "noodles", "macaroni", "linguine"],
    category: "grains",
    co2ePer100g: 130,
    healthScore: 5,
    typicalServing: 180,
    swapIds: ["lentil-pasta", "chickpeas"],
  },
  {
    id: "lentil-pasta",
    name: "Lentil Pasta",
    aliases: ["chickpea pasta", "legume pasta"],
    category: "grains",
    co2ePer100g: 95,
    healthScore: 9,
    typicalServing: 180,
    swapIds: [],
  },
  {
    id: "bread",
    name: "Bread",
    aliases: ["white bread", "wholemeal bread", "sourdough", "toast", "baguette"],
    category: "grains",
    co2ePer100g: 150,
    healthScore: 5,
    typicalServing: 60,
    swapIds: ["oats"],
  },
  {
    id: "oats",
    name: "Oats",
    aliases: ["porridge", "oatmeal", "granola", "muesli"],
    category: "grains",
    co2ePer100g: 80,
    healthScore: 9,
    typicalServing: 60,
    swapIds: [],
  },
  {
    id: "quinoa",
    name: "Quinoa",
    aliases: [],
    category: "grains",
    co2ePer100g: 100,
    healthScore: 9,
    typicalServing: 150,
    swapIds: [],
  },
  {
    id: "corn",
    name: "Corn",
    aliases: ["maize", "sweetcorn", "popcorn"],
    category: "grains",
    co2ePer100g: 100,
    healthScore: 6,
    typicalServing: 100,
    swapIds: ["vegetables"],
  },

  // ─── Vegetables ────────────────────────────────────────────────────────────
  {
    id: "broccoli",
    name: "Broccoli",
    aliases: [],
    category: "vegetables",
    co2ePer100g: 53,
    healthScore: 10,
    typicalServing: 100,
    swapIds: [],
  },
  {
    id: "spinach",
    name: "Spinach",
    aliases: ["kale", "chard", "leafy greens", "arugula"],
    category: "vegetables",
    co2ePer100g: 45,
    healthScore: 10,
    typicalServing: 80,
    swapIds: [],
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    aliases: ["tomato", "cherry tomatoes", "roma tomato"],
    category: "vegetables",
    co2ePer100g: 140,
    healthScore: 9,
    typicalServing: 100,
    swapIds: [],
  },
  {
    id: "carrots",
    name: "Carrots",
    aliases: ["carrot"],
    category: "vegetables",
    co2ePer100g: 40,
    healthScore: 9,
    typicalServing: 80,
    swapIds: [],
  },
  {
    id: "potatoes",
    name: "Potatoes",
    aliases: ["potato", "chips", "fries", "mashed potato", "baked potato"],
    category: "vegetables",
    co2ePer100g: 50,
    healthScore: 6,
    typicalServing: 200,
    swapIds: ["sweet-potato"],
  },
  {
    id: "sweet-potato",
    name: "Sweet Potato",
    aliases: ["yam"],
    category: "vegetables",
    co2ePer100g: 55,
    healthScore: 9,
    typicalServing: 150,
    swapIds: [],
  },
  {
    id: "onions",
    name: "Onions",
    aliases: ["onion", "garlic", "shallots"],
    category: "vegetables",
    co2ePer100g: 40,
    healthScore: 9,
    typicalServing: 60,
    swapIds: [],
  },
  {
    id: "peppers",
    name: "Peppers",
    aliases: ["bell pepper", "capsicum", "chilli"],
    category: "vegetables",
    co2ePer100g: 80,
    healthScore: 9,
    typicalServing: 100,
    swapIds: [],
  },
  {
    id: "mushrooms",
    name: "Mushrooms",
    aliases: ["mushroom", "portobello", "shiitake"],
    category: "vegetables",
    co2ePer100g: 210,
    healthScore: 8,
    typicalServing: 100,
    swapIds: [],
  },
  {
    id: "avocado",
    name: "Avocado",
    aliases: ["guacamole"],
    category: "vegetables",
    co2ePer100g: 155,
    healthScore: 8,
    typicalServing: 80,
    swapIds: [],
  },

  // ─── Fruits ────────────────────────────────────────────────────────────────
  {
    id: "apples",
    name: "Apples",
    aliases: ["apple"],
    category: "fruits",
    co2ePer100g: 40,
    healthScore: 9,
    typicalServing: 150,
    swapIds: [],
  },
  {
    id: "bananas",
    name: "Bananas",
    aliases: ["banana"],
    category: "fruits",
    co2ePer100g: 70,
    healthScore: 9,
    typicalServing: 120,
    swapIds: [],
  },
  {
    id: "berries",
    name: "Berries",
    aliases: ["strawberries", "blueberries", "raspberries", "blackberries"],
    category: "fruits",
    co2ePer100g: 110,
    healthScore: 10,
    typicalServing: 100,
    swapIds: [],
  },
  {
    id: "oranges",
    name: "Oranges",
    aliases: ["orange", "clementine", "mandarin", "tangerine"],
    category: "fruits",
    co2ePer100g: 35,
    healthScore: 9,
    typicalServing: 130,
    swapIds: [],
  },
  {
    id: "grapes",
    name: "Grapes",
    aliases: ["grape"],
    category: "fruits",
    co2ePer100g: 45,
    healthScore: 7,
    typicalServing: 100,
    swapIds: [],
  },
  {
    id: "mango",
    name: "Mango",
    aliases: [],
    category: "fruits",
    co2ePer100g: 80,
    healthScore: 8,
    typicalServing: 150,
    swapIds: [],
  },

  // ─── Nuts & Seeds ──────────────────────────────────────────────────────────
  {
    id: "almonds",
    name: "Almonds",
    aliases: ["almond"],
    category: "nuts-seeds",
    co2ePer100g: 350,
    healthScore: 8,
    typicalServing: 30,
    swapIds: ["walnuts", "sunflower-seeds"],
  },
  {
    id: "walnuts",
    name: "Walnuts",
    aliases: ["walnut"],
    category: "nuts-seeds",
    co2ePer100g: 160,
    healthScore: 9,
    typicalServing: 30,
    swapIds: [],
  },
  {
    id: "sunflower-seeds",
    name: "Sunflower Seeds",
    aliases: ["pumpkin seeds", "hemp seeds", "flax seeds"],
    category: "nuts-seeds",
    co2ePer100g: 80,
    healthScore: 9,
    typicalServing: 25,
    swapIds: [],
  },
  {
    id: "peanuts",
    name: "Peanuts",
    aliases: ["peanut butter", "groundnuts"],
    category: "nuts-seeds",
    co2ePer100g: 250,
    healthScore: 7,
    typicalServing: 30,
    swapIds: ["walnuts", "sunflower-seeds"],
  },

  // ─── Oils ──────────────────────────────────────────────────────────────────
  {
    id: "olive-oil",
    name: "Olive Oil",
    aliases: [],
    category: "oils",
    co2ePer100g: 490,
    healthScore: 8,
    typicalServing: 15,
    swapIds: [],
  },
  {
    id: "nutritional-yeast",
    name: "Nutritional Yeast",
    aliases: [],
    category: "processed",
    co2ePer100g: 50,
    healthScore: 9,
    typicalServing: 15,
    swapIds: [],
  },

  // ─── Beverages ─────────────────────────────────────────────────────────────
  {
    id: "coffee",
    name: "Coffee",
    aliases: ["espresso", "latte", "cappuccino", "flat white", "americano"],
    category: "beverages",
    co2ePer100g: 1700,
    healthScore: 5,
    typicalServing: 10,
    swapIds: ["tea"],
  },
  {
    id: "tea",
    name: "Tea",
    aliases: ["green tea", "black tea", "herbal tea"],
    category: "beverages",
    co2ePer100g: 850,
    healthScore: 8,
    typicalServing: 2,
    swapIds: [],
  },
  {
    id: "beer",
    name: "Beer",
    aliases: ["ale", "lager", "stout"],
    category: "beverages",
    co2ePer100g: 100,
    healthScore: 2,
    typicalServing: 330,
    swapIds: ["kombucha"],
  },
  {
    id: "wine",
    name: "Wine",
    aliases: ["red wine", "white wine", "rosé"],
    category: "beverages",
    co2ePer100g: 140,
    healthScore: 3,
    typicalServing: 175,
    swapIds: ["kombucha"],
  },
  {
    id: "kombucha",
    name: "Kombucha",
    aliases: [],
    category: "beverages",
    co2ePer100g: 60,
    healthScore: 7,
    typicalServing: 250,
    swapIds: [],
  },
  {
    id: "soda",
    name: "Soda",
    aliases: ["cola", "fizzy drink", "soft drink", "juice"],
    category: "beverages",
    co2ePer100g: 35,
    healthScore: 1,
    typicalServing: 330,
    swapIds: ["kombucha", "tea"],
  },

  // ─── Sweets ────────────────────────────────────────────────────────────────
  {
    id: "chocolate",
    name: "Chocolate",
    aliases: ["dark chocolate", "milk chocolate", "cocoa"],
    category: "sweets",
    co2ePer100g: 1900,
    healthScore: 4,
    typicalServing: 40,
    swapIds: ["berries"],
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    aliases: ["gelato", "sorbet"],
    category: "sweets",
    co2ePer100g: 430,
    healthScore: 2,
    typicalServing: 120,
    swapIds: ["berries"],
  },
  {
    id: "cake",
    name: "Cake",
    aliases: ["cupcake", "muffin", "cookie", "biscuit", "brownie"],
    category: "sweets",
    co2ePer100g: 430,
    healthScore: 2,
    typicalServing: 80,
    swapIds: ["berries", "dark-chocolate-small"],
  },

  // ─── Processed ─────────────────────────────────────────────────────────────
  {
    id: "pizza",
    name: "Pizza",
    aliases: [],
    category: "processed",
    co2ePer100g: 390,
    healthScore: 3,
    typicalServing: 300,
    swapIds: ["vegetables", "lentils"],
  },
  {
    id: "burger",
    name: "Burger",
    aliases: ["cheeseburger", "veggie burger"],
    category: "processed",
    co2ePer100g: 1100,
    healthScore: 3,
    typicalServing: 200,
    swapIds: ["black-beans", "mushrooms"],
  },
  {
    id: "hot-dog",
    name: "Hot Dog",
    aliases: ["sausage roll", "frankfurter"],
    category: "processed",
    co2ePer100g: 850,
    healthScore: 2,
    typicalServing: 120,
    swapIds: ["tempeh", "lentils"],
  },
];

const FOOD_MAP = new Map(FOODS.map((f) => [f.id, f]));
const ALIAS_MAP = new Map<string, FoodItem>();

FOODS.forEach((food) => {
  ALIAS_MAP.set(food.name.toLowerCase(), food);
  food.aliases.forEach((alias) => ALIAS_MAP.set(alias.toLowerCase(), food));
});

export function searchFoods(query: string): FoodItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: FoodItem[] = [];
  FOODS.forEach((food) => {
    const nameMatch = food.name.toLowerCase().includes(q);
    const aliasMatch = food.aliases.some((a) => a.toLowerCase().includes(q));
    if (nameMatch || aliasMatch) results.push(food);
  });
  return results.slice(0, 8);
}

export function getFoodById(id: string): FoodItem | undefined {
  return FOOD_MAP.get(id);
}

export function getSwapsForFood(food: FoodItem): FoodItem[] {
  return food.swapIds.map((id) => FOOD_MAP.get(id)).filter(Boolean) as FoodItem[];
}

export function calcCarbonKg(food: FoodItem, grams: number): number {
  return (food.co2ePer100g * grams) / 100 / 1000;
}

export const CATEGORY_LABELS: Record<FoodCategory, string> = {
  "red-meat": "Red Meat",
  poultry: "Poultry",
  seafood: "Seafood",
  dairy: "Dairy",
  eggs: "Eggs",
  legumes: "Legumes & Soy",
  grains: "Grains",
  vegetables: "Vegetables",
  fruits: "Fruits",
  "nuts-seeds": "Nuts & Seeds",
  oils: "Oils",
  beverages: "Beverages",
  sweets: "Sweets",
  processed: "Processed Foods",
};

export const CATEGORY_COLORS: Record<FoodCategory, string> = {
  "red-meat": "#ef4444",
  poultry: "#f97316",
  seafood: "#3b82f6",
  dairy: "#a855f7",
  eggs: "#eab308",
  legumes: "#22c55e",
  grains: "#f59e0b",
  vegetables: "#10b981",
  fruits: "#ec4899",
  "nuts-seeds": "#84cc16",
  oils: "#14b8a6",
  beverages: "#6366f1",
  sweets: "#f43f5e",
  processed: "#78716c",
};
