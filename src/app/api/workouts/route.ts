import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken, getAuthToken } from '@/lib/auth';

interface WorkoutSet {
  weight: number;
  reps: number;
  completed?: boolean;
}

interface WorkoutExercise {
  name: string;
  sets: WorkoutSet[];
  notes?: string;
}

interface SessionData {
  name: string;
  date: string;
  duration?: number;
  exercises: WorkoutExercise[];
  totalVolume?: number;
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const token = getAuthToken(req);
    const userId = token ? verifyToken(token) : null;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (type === 'plans') {
      return NextResponse.json(user.workoutPlans || []);
    }

    if (type === 'history') {
      return NextResponse.json(user.workouts || []);
    }

    return NextResponse.json({ plans: user.workoutPlans, history: user.workouts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const token = getAuthToken(req);
    const userId = token ? verifyToken(token) : null;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const body = await req.json();
    const { action, data } = body;

    if (action === 'savePlan') {
      user.workoutPlans.push(data);
    } else if (action === 'logSession') {
      const sessionData = data as SessionData;
      let totalVolume = 0;
      sessionData.exercises.forEach((ex: WorkoutExercise) => {
        ex.sets.forEach((set: WorkoutSet) => {
          totalVolume += (set.weight || 0) * (set.reps || 0);
        });
      });
      sessionData.totalVolume = totalVolume;
      user.workouts.push(sessionData);
    }

    await user.save();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const token = getAuthToken(req);
    const userId = token ? verifyToken(token) : null;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (type === 'plan') {
      await User.updateOne(
        { _id: userId },
        { $pull: { workoutPlans: { _id: id } } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
