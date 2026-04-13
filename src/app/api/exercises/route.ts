import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Exercise from '@/models/Exercise';

export async function GET(req: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const muscle = searchParams.get('muscle');
    const category = searchParams.get('category');
    const equipment = searchParams.get('equipment');
    const search = searchParams.get('search')?.toLowerCase();

    // Build query object
    const query: any = {};
    
    if (muscle && muscle !== 'All') query.muscle = muscle;
    if (category && category !== 'All') query.category = category;
    if (equipment && equipment !== 'All') query.equipment = equipment;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { muscle: { $regex: search, $options: 'i' } },
        { equipment: { $regex: search, $options: 'i' } },
        { secondaryMuscles: { $regex: search, $options: 'i' } }
      ];
    }

    const results = await Exercise.find(query).limit(100);
    
    // Map _id to id for frontend compatibility
    const formattedResults = results.map(ex => ({
      ...ex.toObject(),
      id: ex._id.toString()
    }));

    return NextResponse.json(formattedResults);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
