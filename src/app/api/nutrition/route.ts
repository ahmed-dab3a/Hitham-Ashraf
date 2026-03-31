import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken, getAuthToken } from '@/lib/auth';
import { FOODS, type FoodData } from '@/lib/food-data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category');
  const date = searchParams.get('date');

  // Food search mode
  if (query) {
    let results: FoodData[] = FOODS.filter(food =>
      food.name.toLowerCase().includes(query)
    );

    if (category && category !== 'All') {
      results = results.filter(food => food.category === category);
    }

    return NextResponse.json(results);
  }

  // Browse by category
  if (category && !date) {
    const results = FOODS.filter(food => food.category === category);
    return NextResponse.json(results);
  }

  // User daily log mode
  if (date) {
    try {
      await dbConnect();
      const token = getAuthToken(req);
      const userId = token ? verifyToken(token) : null;
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const user = await User.findById(userId);
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

      const dayLog = user.nutrition.find((n: { date: string }) => n.date === date) || { date, meals: [] };
      return NextResponse.json(dayLog);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  // Default: return all foods
  return NextResponse.json(FOODS);
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
    const { date, mealType, food } = body;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find or create day log
    let dayLog = user.nutrition.find((n: { date: string }) => n.date === date);

    if (!dayLog) {
      dayLog = { date, meals: [] };
      user.nutrition.push(dayLog);
    }

    // Find or create meal type
    let meal = dayLog.meals.find((m: { mealType: string }) => m.mealType === mealType);
    if (!meal) {
      meal = { mealType, items: [] };
      dayLog.meals.push(meal);
    }

    meal.items.push(food);
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
