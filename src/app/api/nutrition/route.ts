import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken, getAuthToken } from '@/lib/auth';

// Mock Food Database (Edamam/FatSecret style)
const MOCK_FOODS = [
  { id: 'f1', name: 'Egg', calories: 155, protein: 13, carbs: 1.1, fats: 11, unit: '100g' },
  { id: 'f2', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6, unit: '100g' },
  { id: 'f3', name: 'Oats', calories: 389, protein: 17, carbs: 66, fats: 7, unit: '100g' },
  { id: 'f4', name: 'White Rice', calories: 130, protein: 2.7, carbs: 28, fats: 0.3, unit: '100g' },
  { id: 'f5', name: 'Salmon', calories: 208, protein: 20, carbs: 0, fats: 13, unit: '100g' },
  { id: 'f6', name: 'Avocado', calories: 160, protein: 2, carbs: 8.5, fats: 15, unit: '100g' },
  { id: 'f7', name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fats: 0.4, unit: '100g' },
  { id: 'f8', name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fats: 0.3, unit: '100g' },
  { id: 'f9', name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fats: 50, unit: '100g' },
  { id: 'f10', name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fats: 0.1, unit: '100g' },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const date = searchParams.get('date');

  if (query) {
    const results = MOCK_FOODS.filter(food => 
      food.name.toLowerCase().includes(query)
    );
    return NextResponse.json(results);
  }

  if (date) {
    await dbConnect();
    const token = getAuthToken(req);
    const userId = token ? verifyToken(token) : null;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const dayLog = user.nutrition.find((n: any) => n.date === date) || { date, meals: [] };
    return NextResponse.json(dayLog);
  }

  return NextResponse.json([]);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const token = getAuthToken(req);
    const userId = token ? verifyToken(token) : null;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { date, mealType, food } = body; // food: { name, amount, calories, protein, carbs, fats, foodId }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find if date already exists in nutrition array
    let dayLog = user.nutrition.find((n: any) => n.date === date);

    if (!dayLog) {
      dayLog = { date, meals: [] };
      user.nutrition.push(dayLog);
    }

    // Find meal type
    let meal = dayLog.meals.find((m: any) => m.mealType === mealType);
    if (!meal) {
      meal = { mealType, items: [] };
      dayLog.meals.push(meal);
    }

    meal.items.push(food);
    await user.save();

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
