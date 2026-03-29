import { NextResponse } from 'next/server';

// Mock Exercise Database (ExerciseDB style)
const MOCK_EXERCISES = [
  {
    id: 'e1',
    name: 'Barbell Bench Press',
    muscle: 'Chest',
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    category: 'Push',
    instructions: [
      'Lie flat on a bench and grab the barbell with a medium-width grip.',
      'Lower the bar to your mid-chest while inhaling.',
      'Push the bar back up to the starting position while exhaling.',
      'Keep your feet flat on the floor and your back slightly arched.'
    ],
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5ZXNyNng5bnh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxP5D9m9v8E/giphy.gif' // Placeholder GIF
  },
  {
    id: 'e2',
    name: 'Pull Ups',
    muscle: 'Back',
    secondaryMuscles: ['Biceps', 'Forearms'],
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    category: 'Pull',
    instructions: [
      'Hang from a pull-up bar with an overhand grip.',
      'Pull yourself up until your chin is over the bar.',
      'Lower yourself back down in a controlled manner.',
    ],
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5ZXNyNng5bnh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp6mP5D9m9v8E/giphy.gif'
  },
  {
    id: 'e3',
    name: 'Barbell Back Squat',
    muscle: 'Legs',
    secondaryMuscles: ['Glutes', 'Lower Back'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    category: 'Legs',
    instructions: [
      'Place the barbell on your upper back.',
      'Squat down by pushing your hips back and bending your knees.',
      'Go down until your thighs are at least parallel to the floor.',
      'Push through your heels to return to the starting position.'
    ],
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5ZXNyNng5bnh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp6mP5D9m9v8E/giphy.gif'
  },
  {
    id: 'e4',
    name: 'Deadlift',
    muscle: 'Back',
    secondaryMuscles: ['Legs', 'Glutes', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    category: 'Pull',
    instructions: [
      'Stand with feet hip-width apart and the bar over your mid-foot.',
      'Bend at the hips and knees to grab the bar.',
      'Lift the bar by extending your hips and knees until standing upright.',
      'Lower the bar back to the floor with control.'
    ],
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5ZXNyNng5bnh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp6mP5D9m9v8E/giphy.gif'
  },
  {
    id: 'e5',
    name: 'Overhead Press',
    muscle: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    category: 'Push',
    instructions: [
      'Hold the bar at shoulder height with an overhand grip.',
      'Press the bar overhead until arms are fully extended.',
      'Lower the bar back to shoulder height.'
    ],
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHY5ZXNyNng5bnh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4Znh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp6mP5D9m9v8E/giphy.gif'
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const muscle = searchParams.get('muscle');
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  let results = MOCK_EXERCISES;

  if (muscle && muscle !== 'All') {
    results = results.filter(ex => ex.muscle === muscle);
  }

  if (category && category !== 'All') {
    results = results.filter(ex => ex.category === category);
  }

  if (search) {
    results = results.filter(ex => 
      ex.name.toLowerCase().includes(search) || 
      ex.muscle.toLowerCase().includes(search) ||
      ex.secondaryMuscles.some(m => m.toLowerCase().includes(search))
    );
  }

  return NextResponse.json(results);
}
