import { NextResponse } from 'next/server';
import { EXERCISES } from '@/lib/exercise-data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const muscle = searchParams.get('muscle');
  const category = searchParams.get('category');
  const equipment = searchParams.get('equipment');
  const search = searchParams.get('search')?.toLowerCase();

  let results = [...EXERCISES];

  if (muscle && muscle !== 'All') {
    results = results.filter(ex => ex.muscle === muscle);
  }

  if (category && category !== 'All') {
    results = results.filter(ex => ex.category === category);
  }

  if (equipment && equipment !== 'All') {
    results = results.filter(ex => ex.equipment === equipment);
  }

  if (search) {
    results = results.filter(ex =>
      ex.name.toLowerCase().includes(search) ||
      ex.muscle.toLowerCase().includes(search) ||
      ex.equipment.toLowerCase().includes(search) ||
      ex.secondaryMuscles.some(m => m.toLowerCase().includes(search))
    );
  }

  return NextResponse.json(results);
}
