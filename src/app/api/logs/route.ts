import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import WorkoutLog from '@/models/WorkoutLog';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userId, exerciseId, exerciseName, sets, reps, weightKg } = body;

    if (!userId || !exerciseId || !exerciseName || !sets || !reps || weightKg === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const log = await WorkoutLog.create({
      userId,
      exerciseId,
      exerciseName,
      sets,
      reps,
      weightKg
    });

    return NextResponse.json({ success: true, log });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to save log';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const logs = await WorkoutLog.find({ userId }).sort({ createdAt: -1 }).limit(20);

    return NextResponse.json({ logs });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch logs';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
