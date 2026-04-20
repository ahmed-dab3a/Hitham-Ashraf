export interface CalorieInput {
  gender: 'male' | 'female';
  age: number;
  weight: number; // kg
  height: number; // cm
  activity: 'sedentary' | 'light' | 'moderate' | 'active' | 'extra';
  goal: 'cut' | 'maintain' | 'bulk';
}

export interface MacroResult {
  calories: number;
  protein: number; // grams
  fats: number; // grams
  carbs: number; // grams
}

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,     // Little or no exercise
  light: 1.375,       // Light exercise 1-3 days/week
  moderate: 1.55,     // Moderate exercise 3-5 days/week
  active: 1.725,      // Hard exercise 6-7 days/week
  extra: 1.9,         // Very hard exercise/sports & physical job
};

export function calculateMacros(input: CalorieInput): MacroResult {
  // 1. Calculate BMR using Mifflin-St Jeor Equation
  // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
  // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
  
  let bmr = (10 * input.weight) + (6.25 * input.height) - (5 * input.age);
  bmr = input.gender === 'male' ? bmr + 5 : bmr - 161;

  // 2. Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * ACTIVITY_MULTIPLIERS[input.activity];

  // 3. Adjust for Goal
  let targetCalories = tdee;
  if (input.goal === 'cut') {
    targetCalories -= 500; // 500 kcal deficit
  } else if (input.goal === 'bulk') {
    targetCalories += 300; // 300 kcal surplus
  }

  // Ensure minimum safe calories
  if (input.gender === 'male' && targetCalories < 1500) targetCalories = 1500;
  if (input.gender === 'female' && targetCalories < 1200) targetCalories = 1200;

  targetCalories = Math.round(targetCalories);

  // 4. Calculate Macros
  // Protein: 2.2g per kg of body weight (great for cutting or bulking)
  let proteinBytes = 2.2 * input.weight;
  
  // If extremely overweight, 2.2g per kg might be too high, cap it at ~35% of calories
  const maxProteinCals = targetCalories * 0.35;
  if ((proteinBytes * 4) > maxProteinCals) {
    proteinBytes = maxProteinCals / 4;
  }
  const protein = Math.round(proteinBytes);

  // Fats: 25% of total calories
  const fatsCalories = targetCalories * 0.25;
  const fats = Math.round(fatsCalories / 9);

  // Carbs: The rest of the calories
  const remainingCals = targetCalories - ((protein * 4) + (fats * 9));
  const carbs = Math.max(0, Math.round(remainingCals / 4));

  return {
    calories: targetCalories,
    protein,
    fats,
    carbs,
  };
}
