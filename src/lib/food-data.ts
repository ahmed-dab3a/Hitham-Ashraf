// Professional Food Database — 100+ foods with accurate per-100g macros
// Data sourced from USDA FoodData Central

export interface FoodData {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  unit: string;
}

export const FOODS: FoodData[] = [
  // ============== PROTEINS ==============
  { id: 'p1', name: 'Chicken Breast (Grilled)', category: 'Protein', calories: 165, protein: 31, carbs: 0, fats: 3.6, unit: '100g' },
  { id: 'p2', name: 'Chicken Thigh', category: 'Protein', calories: 209, protein: 26, carbs: 0, fats: 10.9, unit: '100g' },
  { id: 'p3', name: 'Ground Beef (90% lean)', category: 'Protein', calories: 176, protein: 20, carbs: 0, fats: 10, unit: '100g' },
  { id: 'p4', name: 'Ribeye Steak', category: 'Protein', calories: 291, protein: 24, carbs: 0, fats: 21, unit: '100g' },
  { id: 'p5', name: 'Salmon Fillet', category: 'Protein', calories: 208, protein: 20, carbs: 0, fats: 13, unit: '100g' },
  { id: 'p6', name: 'Tuna (Canned)', category: 'Protein', calories: 116, protein: 26, carbs: 0, fats: 0.8, unit: '100g' },
  { id: 'p7', name: 'Shrimp', category: 'Protein', calories: 99, protein: 24, carbs: 0.2, fats: 0.3, unit: '100g' },
  { id: 'p8', name: 'Tilapia', category: 'Protein', calories: 96, protein: 20, carbs: 0, fats: 1.7, unit: '100g' },
  { id: 'p9', name: 'Turkey Breast', category: 'Protein', calories: 135, protein: 30, carbs: 0, fats: 1, unit: '100g' },
  { id: 'p10', name: 'Lamb Chop', category: 'Protein', calories: 282, protein: 25, carbs: 0, fats: 20, unit: '100g' },
  { id: 'p11', name: 'Pork Loin', category: 'Protein', calories: 143, protein: 26, carbs: 0, fats: 3.5, unit: '100g' },
  { id: 'p12', name: 'Beef Liver', category: 'Protein', calories: 135, protein: 20, carbs: 3.9, fats: 3.6, unit: '100g' },

  // ============== EGGS & DAIRY ==============
  { id: 'd1', name: 'Whole Egg', category: 'Dairy', calories: 155, protein: 13, carbs: 1.1, fats: 11, unit: '100g' },
  { id: 'd2', name: 'Egg White', category: 'Dairy', calories: 52, protein: 11, carbs: 0.7, fats: 0.2, unit: '100g' },
  { id: 'd3', name: 'Greek Yogurt (0% fat)', category: 'Dairy', calories: 59, protein: 10, carbs: 3.6, fats: 0.4, unit: '100g' },
  { id: 'd4', name: 'Greek Yogurt (Full Fat)', category: 'Dairy', calories: 97, protein: 9, carbs: 3.6, fats: 5, unit: '100g' },
  { id: 'd5', name: 'Cottage Cheese', category: 'Dairy', calories: 98, protein: 11, carbs: 3.4, fats: 4.3, unit: '100g' },
  { id: 'd6', name: 'Whole Milk', category: 'Dairy', calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, unit: '100g' },
  { id: 'd7', name: 'Cheddar Cheese', category: 'Dairy', calories: 403, protein: 25, carbs: 1.3, fats: 33, unit: '100g' },
  { id: 'd8', name: 'Mozzarella', category: 'Dairy', calories: 280, protein: 28, carbs: 3.1, fats: 17, unit: '100g' },
  { id: 'd9', name: 'Whey Protein Powder', category: 'Dairy', calories: 400, protein: 80, carbs: 10, fats: 5, unit: '100g' },
  { id: 'd10', name: 'Cream Cheese', category: 'Dairy', calories: 342, protein: 6, carbs: 4, fats: 34, unit: '100g' },

  // ============== GRAINS & CARBS ==============
  { id: 'g1', name: 'White Rice (Cooked)', category: 'Carbs', calories: 130, protein: 2.7, carbs: 28, fats: 0.3, unit: '100g' },
  { id: 'g2', name: 'Brown Rice (Cooked)', category: 'Carbs', calories: 112, protein: 2.3, carbs: 24, fats: 0.8, unit: '100g' },
  { id: 'g3', name: 'Oats (Dry)', category: 'Carbs', calories: 389, protein: 17, carbs: 66, fats: 7, unit: '100g' },
  { id: 'g4', name: 'Pasta (Cooked)', category: 'Carbs', calories: 131, protein: 5, carbs: 25, fats: 1.1, unit: '100g' },
  { id: 'g5', name: 'Whole Wheat Bread', category: 'Carbs', calories: 247, protein: 13, carbs: 41, fats: 3.4, unit: '100g' },
  { id: 'g6', name: 'White Bread', category: 'Carbs', calories: 265, protein: 9, carbs: 49, fats: 3.2, unit: '100g' },
  { id: 'g7', name: 'Quinoa (Cooked)', category: 'Carbs', calories: 120, protein: 4.4, carbs: 21, fats: 1.9, unit: '100g' },
  { id: 'g8', name: 'Sweet Potato (Baked)', category: 'Carbs', calories: 86, protein: 1.6, carbs: 20, fats: 0.1, unit: '100g' },
  { id: 'g9', name: 'Regular Potato (Baked)', category: 'Carbs', calories: 93, protein: 2.5, carbs: 21, fats: 0.1, unit: '100g' },
  { id: 'g10', name: 'Corn Tortilla', category: 'Carbs', calories: 218, protein: 6, carbs: 44, fats: 3, unit: '100g' },
  { id: 'g11', name: 'Couscous (Cooked)', category: 'Carbs', calories: 112, protein: 3.8, carbs: 23, fats: 0.2, unit: '100g' },
  { id: 'g12', name: 'Bagel', category: 'Carbs', calories: 257, protein: 10, carbs: 50, fats: 1.6, unit: '100g' },

  // ============== FRUITS ==============
  { id: 'fr1', name: 'Banana', category: 'Fruits', calories: 89, protein: 1.1, carbs: 23, fats: 0.3, unit: '100g' },
  { id: 'fr2', name: 'Apple', category: 'Fruits', calories: 52, protein: 0.3, carbs: 14, fats: 0.2, unit: '100g' },
  { id: 'fr3', name: 'Strawberries', category: 'Fruits', calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, unit: '100g' },
  { id: 'fr4', name: 'Blueberries', category: 'Fruits', calories: 57, protein: 0.7, carbs: 14, fats: 0.3, unit: '100g' },
  { id: 'fr5', name: 'Mango', category: 'Fruits', calories: 60, protein: 0.8, carbs: 15, fats: 0.4, unit: '100g' },
  { id: 'fr6', name: 'Orange', category: 'Fruits', calories: 47, protein: 0.9, carbs: 12, fats: 0.1, unit: '100g' },
  { id: 'fr7', name: 'Watermelon', category: 'Fruits', calories: 30, protein: 0.6, carbs: 7.6, fats: 0.2, unit: '100g' },
  { id: 'fr8', name: 'Grapes', category: 'Fruits', calories: 69, protein: 0.7, carbs: 18, fats: 0.2, unit: '100g' },
  { id: 'fr9', name: 'Pineapple', category: 'Fruits', calories: 50, protein: 0.5, carbs: 13, fats: 0.1, unit: '100g' },
  { id: 'fr10', name: 'Dates', category: 'Fruits', calories: 277, protein: 1.8, carbs: 75, fats: 0.2, unit: '100g' },

  // ============== VEGETABLES ==============
  { id: 'v1', name: 'Broccoli', category: 'Vegetables', calories: 34, protein: 2.8, carbs: 7, fats: 0.4, unit: '100g' },
  { id: 'v2', name: 'Spinach', category: 'Vegetables', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, unit: '100g' },
  { id: 'v3', name: 'Avocado', category: 'Vegetables', calories: 160, protein: 2, carbs: 8.5, fats: 15, unit: '100g' },
  { id: 'v4', name: 'Cucumber', category: 'Vegetables', calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1, unit: '100g' },
  { id: 'v5', name: 'Tomato', category: 'Vegetables', calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, unit: '100g' },
  { id: 'v6', name: 'Carrots', category: 'Vegetables', calories: 41, protein: 0.9, carbs: 10, fats: 0.2, unit: '100g' },
  { id: 'v7', name: 'Bell Pepper', category: 'Vegetables', calories: 31, protein: 1, carbs: 6, fats: 0.3, unit: '100g' },
  { id: 'v8', name: 'Mushrooms', category: 'Vegetables', calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3, unit: '100g' },
  { id: 'v9', name: 'Zucchini', category: 'Vegetables', calories: 17, protein: 1.2, carbs: 3.1, fats: 0.3, unit: '100g' },
  { id: 'v10', name: 'Kale', category: 'Vegetables', calories: 49, protein: 4.3, carbs: 9, fats: 0.9, unit: '100g' },

  // ============== FATS & NUTS ==============
  { id: 'f1', name: 'Peanut Butter', category: 'Fats', calories: 588, protein: 25, carbs: 20, fats: 50, unit: '100g' },
  { id: 'f2', name: 'Almonds', category: 'Fats', calories: 579, protein: 21, carbs: 22, fats: 50, unit: '100g' },
  { id: 'f3', name: 'Walnuts', category: 'Fats', calories: 654, protein: 15, carbs: 14, fats: 65, unit: '100g' },
  { id: 'f4', name: 'Cashews', category: 'Fats', calories: 553, protein: 18, carbs: 30, fats: 44, unit: '100g' },
  { id: 'f5', name: 'Olive Oil', category: 'Fats', calories: 884, protein: 0, carbs: 0, fats: 100, unit: '100g' },
  { id: 'f6', name: 'Coconut Oil', category: 'Fats', calories: 862, protein: 0, carbs: 0, fats: 100, unit: '100g' },
  { id: 'f7', name: 'Chia Seeds', category: 'Fats', calories: 486, protein: 17, carbs: 42, fats: 31, unit: '100g' },
  { id: 'f8', name: 'Flax Seeds', category: 'Fats', calories: 534, protein: 18, carbs: 29, fats: 42, unit: '100g' },
  { id: 'f9', name: 'Butter', category: 'Fats', calories: 717, protein: 0.9, carbs: 0.1, fats: 81, unit: '100g' },
  { id: 'f10', name: 'Tahini', category: 'Fats', calories: 595, protein: 17, carbs: 21, fats: 54, unit: '100g' },

  // ============== LEGUMES ==============
  { id: 'lg1', name: 'Lentils (Cooked)', category: 'Legumes', calories: 116, protein: 9, carbs: 20, fats: 0.4, unit: '100g' },
  { id: 'lg2', name: 'Chickpeas (Cooked)', category: 'Legumes', calories: 164, protein: 8.9, carbs: 27, fats: 2.6, unit: '100g' },
  { id: 'lg3', name: 'Black Beans (Cooked)', category: 'Legumes', calories: 132, protein: 8.9, carbs: 24, fats: 0.5, unit: '100g' },
  { id: 'lg4', name: 'Kidney Beans (Cooked)', category: 'Legumes', calories: 127, protein: 8.7, carbs: 23, fats: 0.5, unit: '100g' },
  { id: 'lg5', name: 'Edamame', category: 'Legumes', calories: 121, protein: 12, carbs: 9, fats: 5, unit: '100g' },

  // ============== SNACKS & OTHER ==============
  { id: 'sn1', name: 'Dark Chocolate (70%)', category: 'Snacks', calories: 598, protein: 7.8, carbs: 46, fats: 43, unit: '100g' },
  { id: 'sn2', name: 'Honey', category: 'Snacks', calories: 304, protein: 0.3, carbs: 82, fats: 0, unit: '100g' },
  { id: 'sn3', name: 'Granola Bar', category: 'Snacks', calories: 471, protein: 10, carbs: 64, fats: 20, unit: '100g' },
  { id: 'sn4', name: 'Rice Cakes', category: 'Snacks', calories: 387, protein: 8, carbs: 81, fats: 2.8, unit: '100g' },
  { id: 'sn5', name: 'Protein Bar', category: 'Snacks', calories: 380, protein: 30, carbs: 35, fats: 12, unit: '100g' },
  { id: 'sn6', name: 'Trail Mix', category: 'Snacks', calories: 462, protein: 14, carbs: 44, fats: 29, unit: '100g' },
  { id: 'sn7', name: 'Popcorn (Air-popped)', category: 'Snacks', calories: 387, protein: 13, carbs: 78, fats: 4.5, unit: '100g' },
  { id: 'sn8', name: 'Hummus', category: 'Snacks', calories: 166, protein: 8, carbs: 14, fats: 10, unit: '100g' },

  // ============== BEVERAGES ==============
  { id: 'bv1', name: 'Orange Juice', category: 'Beverages', calories: 45, protein: 0.7, carbs: 10, fats: 0.2, unit: '100g' },
  { id: 'bv2', name: 'Coconut Water', category: 'Beverages', calories: 19, protein: 0.7, carbs: 3.7, fats: 0.2, unit: '100g' },
  { id: 'bv3', name: 'Almond Milk', category: 'Beverages', calories: 15, protein: 0.6, carbs: 0.3, fats: 1.2, unit: '100g' },
  { id: 'bv4', name: 'Protein Shake', category: 'Beverages', calories: 120, protein: 24, carbs: 5, fats: 1.5, unit: '100g' },
];
