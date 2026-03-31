// Professional Exercise Database — 60+ exercises with real GIF URLs
// GIFs sourced from public fitness illustration APIs

export interface ExerciseData {
  id: string;
  name: string;
  muscle: string;
  secondaryMuscles: string[];
  equipment: string;
  difficulty: string;
  category: string;
  instructions: string[];
  gifUrl: string;
}

const BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

export const EXERCISES: ExerciseData[] = [
  // ============== CHEST (Push) ==============
  {
    id: 'c1', name: 'Flat Bench Press', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Lie flat on a bench with feet on the floor.', 'Grip the bar slightly wider than shoulder-width.', 'Lower the bar to mid-chest with control.', 'Press the bar back up to full lockout.'],
    gifUrl: `${BASE}/Barbell_Bench_Press/0.jpg`
  },
  {
    id: 'c2', name: 'Incline Dumbbell Press', muscle: 'Chest', secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Dumbbells', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Set bench to 30-45 degree incline.', 'Press dumbbells up from shoulder level.', 'Lower slowly to chest level with a stretch.', 'Keep shoulder blades retracted throughout.'],
    gifUrl: `${BASE}/Dumbbell_Incline_Bench_Press/0.jpg`
  },
  {
    id: 'c3', name: 'Push Ups', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders', 'Core'],
    equipment: 'Bodyweight', difficulty: 'Beginner', category: 'Push',
    instructions: ['Place hands shoulder-width apart on the floor.', 'Keep body in a straight plank position.', 'Lower chest to the floor by bending elbows.', 'Push back up to starting position.'],
    gifUrl: `${BASE}/Push-up/0.jpg`
  },
  {
    id: 'c4', name: 'Cable Crossover', muscle: 'Chest', secondaryMuscles: ['Shoulders'],
    equipment: 'Cable', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Set pulleys to high position.', 'Step forward with one foot for balance.', 'Bring handles together in front of chest in an arc.', 'Squeeze chest at the bottom, return slowly.'],
    gifUrl: `${BASE}/Cable_Crossover/0.jpg`
  },
  {
    id: 'c5', name: 'Dumbbell Fly', muscle: 'Chest', secondaryMuscles: ['Shoulders'],
    equipment: 'Dumbbells', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Lie on a flat bench holding dumbbells above chest.', 'Open arms wide in an arc motion, slight bend in elbows.', 'Lower until you feel a deep chest stretch.', 'Squeeze chest to bring dumbbells back together.'],
    gifUrl: `${BASE}/Dumbbell_Fly/0.jpg`
  },
  {
    id: 'c6', name: 'Decline Bench Press', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Lie on a decline bench and secure your legs.', 'Grip the bar at shoulder width.', 'Lower the bar to lower chest.', 'Press back up to lockout.'],
    gifUrl: `${BASE}/Barbell_Decline_Bench_Press/0.jpg`
  },
  {
    id: 'c7', name: 'Chest Dips', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Bodyweight', difficulty: 'Advanced', category: 'Push',
    instructions: ['Grip parallel bars and lean forward slightly.', 'Lower body until upper arms are parallel to floor.', 'Push back up, keeping forward lean for chest focus.', 'Avoid locking elbows at the top.'],
    gifUrl: `${BASE}/Chest_Dip/0.jpg`
  },
  {
    id: 'c8', name: 'Machine Chest Press', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Machine', difficulty: 'Beginner', category: 'Push',
    instructions: ['Sit with back flat against pad.', 'Grip handles at chest level.', 'Press forward until arms are extended.', 'Return slowly to starting position.'],
    gifUrl: `${BASE}/Lever_Chest_Press/0.jpg`
  },
  {
    id: 'c9', name: 'Landmine Press', muscle: 'Chest', secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Place one end of a barbell in a corner or landmine attachment.', 'Hold the other end at chest height.', 'Press the bar up and forward.', 'Lower with control.'],
    gifUrl: `${BASE}/Landmine_Press/0.jpg`
  },
  {
    id: 'c10', name: 'Svend Press', muscle: 'Chest', secondaryMuscles: ['Shoulders'],
    equipment: 'Plates', difficulty: 'Beginner', category: 'Push',
    instructions: ['Hold a plate between your palms at chest level.', 'Squeeze your hands together throughout.', 'Press the plate straight forward.', 'Return to chest and repeat.'],
    gifUrl: `${BASE}/Svend_Press/0.jpg`
  },

  // ============== BACK (Pull) ==============
  {
    id: 'b1', name: 'Pull Ups', muscle: 'Back', secondaryMuscles: ['Biceps', 'Forearms'],
    equipment: 'Bodyweight', difficulty: 'Advanced', category: 'Pull',
    instructions: ['Hang from a bar with overhand grip, slightly wider than shoulders.', 'Pull your body up until chin is over the bar.', 'Squeeze your lats at the top.', 'Lower yourself slowly to full extension.'],
    gifUrl: `${BASE}/Pull-up/0.jpg`
  },
  {
    id: 'b2', name: 'Barbell Row', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Pull',
    instructions: ['Bend over with flat back, knees slightly bent.', 'Grip barbell shoulder-width apart.', 'Pull bar to lower chest/upper abdomen.', 'Lower with control, keeping back flat.'],
    gifUrl: `${BASE}/Barbell_Bent_Over_Row/0.jpg`
  },
  {
    id: 'b3', name: 'Lat Pulldown', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Cable', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Sit at a lat pulldown machine and grip the bar wide.', 'Pull the bar down to upper chest.', 'Squeeze lats at the bottom.', 'Return the bar slowly to the top.'],
    gifUrl: `${BASE}/Lat_Pulldown/0.jpg`
  },
  {
    id: 'b4', name: 'Deadlift', muscle: 'Back', secondaryMuscles: ['Legs', 'Glutes', 'Core'],
    equipment: 'Barbell', difficulty: 'Advanced', category: 'Pull',
    instructions: ['Stand with mid-foot under the bar.', 'Grip the bar just outside your knees.', 'Lift by extending hips and knees simultaneously.', 'Stand tall, then lower with control.'],
    gifUrl: `${BASE}/Barbell_Deadlift/0.jpg`
  },
  {
    id: 'b5', name: 'Seated Cable Row', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Cable', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Sit at a cable row station with feet on pads.', 'Grab the handle, sit tall with slight lean.', 'Pull the handle to your abdomen.', 'Squeeze shoulder blades, then release slowly.'],
    gifUrl: `${BASE}/Seated_Cable_Row/0.jpg`
  },
  {
    id: 'b6', name: 'T-Bar Row', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Pull',
    instructions: ['Straddle the T-bar and grip the handles.', 'Bend at the hips with a flat back.', 'Row the weight to your chest.', 'Lower slowly and repeat.'],
    gifUrl: `${BASE}/Lever_T-Bar_Row/0.jpg`
  },
  {
    id: 'b7', name: 'Single Arm Dumbbell Row', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Place one knee and hand on a bench.', 'Hold a dumbbell in the opposite hand.', 'Row the dumbbell to your hip.', 'Lower slowly and squeeze at the top.'],
    gifUrl: `${BASE}/Dumbbell_Bent_Over_Row/0.jpg`
  },
  {
    id: 'b8', name: 'Face Pull', muscle: 'Back', secondaryMuscles: ['Rear Delts', 'Rotator Cuff'],
    equipment: 'Cable', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Set cable to face height with rope attachment.', 'Pull the rope toward your face.', 'Separate hands at the end, externally rotating.', 'Squeeze rear delts and return slowly.'],
    gifUrl: `${BASE}/Cable_Rear_Delt_Fly/0.jpg`
  },
  {
    id: 'b9', name: 'Chin Ups', muscle: 'Back', secondaryMuscles: ['Biceps', 'Forearms'],
    equipment: 'Bodyweight', difficulty: 'Intermediate', category: 'Pull',
    instructions: ['Hang from a bar with underhand (supinated) grip.', 'Pull yourself up until chin clears the bar.', 'Focus on squeezing biceps and lats.', 'Lower yourself with control.'],
    gifUrl: `${BASE}/Chin-Up/0.jpg`
  },
  {
    id: 'b10', name: 'Hyperextension', muscle: 'Back', secondaryMuscles: ['Glutes', 'Hamstrings'],
    equipment: 'Bodyweight', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Position yourself on a hyperextension station.', 'Cross arms over chest or behind head.', 'Lower your torso by bending at the hips.', 'Raise back to a straight line, squeezing lower back.'],
    gifUrl: `${BASE}/Hyperextension/0.jpg`
  },

  // ============== LEGS ==============
  {
    id: 'l1', name: 'Barbell Squat', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Legs',
    instructions: ['Place barbell on upper traps.', 'Stand with feet shoulder-width apart.', 'Squat down until thighs are at least parallel.', 'Drive through heels to stand back up.'],
    gifUrl: `${BASE}/Barbell_Full_Squat/0.jpg`
  },
  {
    id: 'l2', name: 'Romanian Deadlift', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Lower Back'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Legs',
    instructions: ['Hold barbell at hip height with overhand grip.', 'Push hips back, keeping legs nearly straight.', 'Lower bar along your shins until you feel a deep hamstring stretch.', 'Return to standing by driving hips forward.'],
    gifUrl: `${BASE}/Barbell_Romanian_Deadlift/0.jpg`
  },
  {
    id: 'l3', name: 'Leg Press', muscle: 'Legs', secondaryMuscles: ['Glutes'],
    equipment: 'Machine', difficulty: 'Beginner', category: 'Legs',
    instructions: ['Sit on the leg press with feet shoulder-width on the platform.', 'Lower the platform by bending your knees to 90 degrees.', 'Press back up without locking your knees.', 'Keep your back flat against the pad throughout.'],
    gifUrl: `${BASE}/Sled_45_Leg_Press/0.jpg`
  },
  {
    id: 'l4', name: 'Walking Lunges', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Legs',
    instructions: ['Hold dumbbells at your sides.', 'Step forward into a lunge position.', 'Lower until both knees are at 90 degrees.', 'Push off front foot and step forward with the other leg.'],
    gifUrl: `${BASE}/Dumbbell_Walking_Lunge/0.jpg`
  },
  {
    id: 'l5', name: 'Leg Curl', muscle: 'Legs', secondaryMuscles: ['Calves'],
    equipment: 'Machine', difficulty: 'Beginner', category: 'Legs',
    instructions: ['Lie face down on the leg curl machine.', 'Place ankles under the pad.', 'Curl your legs up toward your glutes.', 'Lower slowly with control.'],
    gifUrl: `${BASE}/Lever_Lying_Leg_Curl/0.jpg`
  },
  {
    id: 'l6', name: 'Leg Extension', muscle: 'Legs', secondaryMuscles: [],
    equipment: 'Machine', difficulty: 'Beginner', category: 'Legs',
    instructions: ['Sit on the leg extension machine.', 'Place ankles behind the pad.', 'Extend your legs until straight.', 'Lower with control back to 90 degrees.'],
    gifUrl: `${BASE}/Lever_Leg_Extension/0.jpg`
  },
  {
    id: 'l7', name: 'Bulgarian Split Squat', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'Dumbbells', difficulty: 'Intermediate', category: 'Legs',
    instructions: ['Place rear foot on a bench behind you.', 'Hold dumbbells at your sides.', 'Lower into a single-leg squat on the front leg.', 'Push back up through the front heel.'],
    gifUrl: `${BASE}/Dumbbell_Single_Leg_Split_Squat/0.jpg`
  },
  {
    id: 'l8', name: 'Hack Squat', muscle: 'Legs', secondaryMuscles: ['Glutes'],
    equipment: 'Machine', difficulty: 'Intermediate', category: 'Legs',
    instructions: ['Position yourself on the hack squat machine.', 'Place feet shoulder-width on the platform.', 'Lower yourself until thighs are parallel.', 'Press back up to starting position.'],
    gifUrl: `${BASE}/Sled_Hack_Squat/0.jpg`
  },
  {
    id: 'l9', name: 'Calf Raise', muscle: 'Legs', secondaryMuscles: [],
    equipment: 'Machine', difficulty: 'Beginner', category: 'Legs',
    instructions: ['Stand on the edge of a step or calf raise machine.', 'Rise up on your toes as high as possible.', 'Hold the top position for a squeeze.', 'Lower slowly below the step for a full stretch.'],
    gifUrl: `${BASE}/Lever_Standing_Calf_Raise/0.jpg`
  },
  {
    id: 'l10', name: 'Goblet Squat', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Legs',
    instructions: ['Hold a dumbbell vertically at chest height.', 'Squat down with feet shoulder-width apart.', 'Keep elbows inside your knees.', 'Stand back up through your heels.'],
    gifUrl: `${BASE}/Dumbbell_Goblet_Squat/0.jpg`
  },

  // ============== SHOULDERS (Push) ==============
  {
    id: 's1', name: 'Overhead Press', muscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Core'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Hold the barbell at shoulder height.', 'Brace your core and press the bar overhead.', 'Lock out arms at the top.', 'Lower with control back to shoulders.'],
    gifUrl: `${BASE}/Barbell_Standing_Military_Press/0.jpg`
  },
  {
    id: 's2', name: 'Lateral Raises', muscle: 'Shoulders', secondaryMuscles: [],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Push',
    instructions: ['Stand with dumbbells at your sides.', 'Raise arms out to the sides until parallel with floor.', 'Keep a slight bend in the elbows.', 'Lower slowly with control.'],
    gifUrl: `${BASE}/Dumbbell_Lateral_Raise/0.jpg`
  },
  {
    id: 's3', name: 'Dumbbell Shoulder Press', muscle: 'Shoulders', secondaryMuscles: ['Triceps'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Push',
    instructions: ['Sit on a bench with back support.', 'Hold dumbbells at shoulder height.', 'Press dumbbells overhead until arms are extended.', 'Lower back to shoulder height.'],
    gifUrl: `${BASE}/Dumbbell_Shoulder_Press/0.jpg`
  },
  {
    id: 's4', name: 'Front Raise', muscle: 'Shoulders', secondaryMuscles: ['Chest'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Push',
    instructions: ['Stand holding dumbbells in front of thighs.', 'Raise one or both arms to eye level.', 'Keep arms straight with a slight bend.', 'Lower slowly and alternate.'],
    gifUrl: `${BASE}/Dumbbell_Front_Raise/0.jpg`
  },
  {
    id: 's5', name: 'Reverse Fly', muscle: 'Shoulders', secondaryMuscles: ['Back'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Bend over at the hips, holding dumbbells.', 'Raise arms out to the sides, squeezing rear delts.', 'Keep a slight bend in elbows.', 'Lower slowly and repeat.'],
    gifUrl: `${BASE}/Dumbbell_Rear_Lateral_Raise/0.jpg`
  },
  {
    id: 's6', name: 'Arnold Press', muscle: 'Shoulders', secondaryMuscles: ['Triceps'],
    equipment: 'Dumbbells', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Start with dumbbells in front of shoulders, palms facing you.', 'Rotate wrists while pressing overhead.', 'At the top, palms should face forward.', 'Reverse the motion back to start.'],
    gifUrl: `${BASE}/Dumbbell_Arnold_Press/0.jpg`
  },
  {
    id: 's7', name: 'Upright Row', muscle: 'Shoulders', secondaryMuscles: ['Traps'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Pull',
    instructions: ['Hold the barbell with a narrow grip.', 'Pull the bar up along your body to chin level.', 'Keep elbows higher than hands.', 'Lower slowly with control.'],
    gifUrl: `${BASE}/Barbell_Upright_Row/0.jpg`
  },
  {
    id: 's8', name: 'Cable Lateral Raise', muscle: 'Shoulders', secondaryMuscles: [],
    equipment: 'Cable', difficulty: 'Beginner', category: 'Push',
    instructions: ['Stand beside a low cable pulley.', 'Raise the handle out to the side.', 'Keep elbow slightly bent throughout.', 'Lower slowly against the cable resistance.'],
    gifUrl: `${BASE}/Cable_One_Arm_Lateral_Raise/0.jpg`
  },
  {
    id: 's9', name: 'Shrugs', muscle: 'Shoulders', secondaryMuscles: ['Traps'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Hold dumbbells at your sides.', 'Shrug shoulders straight up toward ears.', 'Squeeze traps at the top for 2 seconds.', 'Lower slowly to starting position.'],
    gifUrl: `${BASE}/Dumbbell_Shrug/0.jpg`
  },
  {
    id: 's10', name: 'Behind the Neck Press', muscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Traps'],
    equipment: 'Barbell', difficulty: 'Advanced', category: 'Push',
    instructions: ['Sit with barbell resting on upper traps.', 'Press the bar overhead from behind the neck.', 'Extend arms fully at the top.', 'Lower back to upper trap position.'],
    gifUrl: `${BASE}/Barbell_Behind_Neck_Press/0.jpg`
  },

  // ============== ARMS ==============
  {
    id: 'a1', name: 'Barbell Curl', muscle: 'Arms', secondaryMuscles: ['Forearms'],
    equipment: 'Barbell', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Stand with feet shoulder-width, holding barbell underhand.', 'Curl the bar up toward your shoulders.', 'Keep elbows stationary at your sides.', 'Lower with control to full extension.'],
    gifUrl: `${BASE}/Barbell_Curl/0.jpg`
  },
  {
    id: 'a2', name: 'Dumbbell Curl', muscle: 'Arms', secondaryMuscles: ['Forearms'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Stand with dumbbells at your sides, palms forward.', 'Curl the weights up to shoulder level.', 'Squeeze the biceps at the top.', 'Lower slowly to starting position.'],
    gifUrl: `${BASE}/Dumbbell_Alternate_Biceps_Curl/0.jpg`
  },
  {
    id: 'a3', name: 'Hammer Curl', muscle: 'Arms', secondaryMuscles: ['Forearms', 'Brachialis'],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Hold dumbbells with neutral (hammer) grip.', 'Curl the weights up keeping palms facing each other.', 'Squeeze at the top.', 'Lower with control.'],
    gifUrl: `${BASE}/Dumbbell_Hammer_Curl/0.jpg`
  },
  {
    id: 'a4', name: 'Tricep Pushdown', muscle: 'Arms', secondaryMuscles: [],
    equipment: 'Cable', difficulty: 'Beginner', category: 'Push',
    instructions: ['Stand at a cable station with a straight bar or rope.', 'Push the bar down by extending your elbows.', 'Keep upper arms stationary.', 'Return slowly to starting position.'],
    gifUrl: `${BASE}/Cable_Pushdown/0.jpg`
  },
  {
    id: 'a5', name: 'Skull Crushers', muscle: 'Arms', secondaryMuscles: [],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Lie on a flat bench holding barbell above chest.', 'Lower the bar to your forehead by bending elbows.', 'Keep upper arms vertical.', 'Extend elbows to return to start.'],
    gifUrl: `${BASE}/Barbell_Lying_Triceps_Extension/0.jpg`
  },
  {
    id: 'a6', name: 'Tricep Dips', muscle: 'Arms', secondaryMuscles: ['Chest', 'Shoulders'],
    equipment: 'Bodyweight', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Support yourself on parallel bars with arms straight.', 'Keep torso upright for tricep focus.', 'Lower until elbows are at 90 degrees.', 'Push back up to lockout.'],
    gifUrl: `${BASE}/Triceps_Dip/0.jpg`
  },
  {
    id: 'a7', name: 'Preacher Curl', muscle: 'Arms', secondaryMuscles: ['Forearms'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Pull',
    instructions: ['Sit at a preacher curl bench.', 'Place upper arms on the pad.', 'Curl the bar up toward your shoulders.', 'Lower with a slow, controlled eccentric.'],
    gifUrl: `${BASE}/Barbell_Preacher_Curl/0.jpg`
  },
  {
    id: 'a8', name: 'Overhead Tricep Extension', muscle: 'Arms', secondaryMuscles: [],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Push',
    instructions: ['Hold a dumbbell with both hands overhead.', 'Lower the weight behind your head by bending elbows.', 'Keep upper arms close to your ears.', 'Extend arms back to the top.'],
    gifUrl: `${BASE}/Dumbbell_One_Arm_Triceps_Extension/0.jpg`
  },
  {
    id: 'a9', name: 'Concentration Curl', muscle: 'Arms', secondaryMuscles: [],
    equipment: 'Dumbbells', difficulty: 'Beginner', category: 'Pull',
    instructions: ['Sit on a bench, rest elbow on inner thigh.', 'Curl the dumbbell up to shoulder.', 'Squeeze hard at the top.', 'Lower with full control.'],
    gifUrl: `${BASE}/Dumbbell_Concentration_Curl/0.jpg`
  },
  {
    id: 'a10', name: 'Close Grip Bench Press', muscle: 'Arms', secondaryMuscles: ['Chest', 'Shoulders'],
    equipment: 'Barbell', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Lie on bench and grip barbell with hands close together.', 'Lower bar to lower chest.', 'Press up focusing on tricep contraction.', 'Lock out arms at the top.'],
    gifUrl: `${BASE}/Barbell_Close-Grip_Bench_Press/0.jpg`
  },

  // ============== ABS ==============
  {
    id: 'ab1', name: 'Crunches', muscle: 'Abs', secondaryMuscles: [],
    equipment: 'Bodyweight', difficulty: 'Beginner', category: 'Push',
    instructions: ['Lie on your back with knees bent.', 'Place hands behind head or across chest.', 'Curl your torso up, lifting shoulder blades off the floor.', 'Lower back slowly with control.'],
    gifUrl: `${BASE}/Crunch/0.jpg`
  },
  {
    id: 'ab2', name: 'Plank', muscle: 'Abs', secondaryMuscles: ['Shoulders', 'Glutes'],
    equipment: 'Bodyweight', difficulty: 'Beginner', category: 'Push',
    instructions: ['Place forearms on the floor, elbows under shoulders.', 'Extend legs back and rise onto your toes.', 'Keep your body in a straight line.', 'Hold the position, bracing your core.'],
    gifUrl: `${BASE}/Front_Plank/0.jpg`
  },
  {
    id: 'ab3', name: 'Hanging Leg Raise', muscle: 'Abs', secondaryMuscles: ['Hip Flexors'],
    equipment: 'Bodyweight', difficulty: 'Advanced', category: 'Pull',
    instructions: ['Hang from a pull-up bar with straight arms.', 'Raise your legs until parallel to the floor.', 'For advanced, raise legs all the way to the bar.', 'Lower slowly, avoiding swinging.'],
    gifUrl: `${BASE}/Hanging_Leg_Raise/0.jpg`
  },
  {
    id: 'ab4', name: 'Russian Twist', muscle: 'Abs', secondaryMuscles: ['Obliques'],
    equipment: 'Bodyweight', difficulty: 'Beginner', category: 'Push',
    instructions: ['Sit with knees bent and lean back slightly.', 'Hold a weight or clasp hands together.', 'Rotate your torso side to side.', 'Keep feet off the ground for extra challenge.'],
    gifUrl: `${BASE}/Russian_Twist/0.jpg`
  },
  {
    id: 'ab5', name: 'Cable Crunch', muscle: 'Abs', secondaryMuscles: [],
    equipment: 'Cable', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Kneel in front of a cable machine with rope attachment.', 'Hold the rope behind your head.', 'Crunch down, bringing elbows to knees.', 'Return slowly to starting position.'],
    gifUrl: `${BASE}/Cable_Crunch/0.jpg`
  },
  {
    id: 'ab6', name: 'Mountain Climbers', muscle: 'Abs', secondaryMuscles: ['Hip Flexors', 'Shoulders'],
    equipment: 'Bodyweight', difficulty: 'Beginner', category: 'Push',
    instructions: ['Start in a push-up position.', 'Drive one knee toward your chest.', 'Quickly switch legs in a running motion.', 'Keep your core tight throughout.'],
    gifUrl: `${BASE}/Mountain_Climber/0.jpg`
  },
  {
    id: 'ab7', name: 'Ab Rollout', muscle: 'Abs', secondaryMuscles: ['Shoulders', 'Lower Back'],
    equipment: 'Ab Wheel', difficulty: 'Advanced', category: 'Push',
    instructions: ['Kneel on the floor holding an ab wheel.', 'Roll the wheel forward, extending your body.', 'Go as far as you can without arching your back.', 'Pull the wheel back to the starting position using your abs.'],
    gifUrl: `${BASE}/Ab_Roller/0.jpg`
  },
  {
    id: 'ab8', name: 'Bicycle Crunch', muscle: 'Abs', secondaryMuscles: ['Obliques'],
    equipment: 'Bodyweight', difficulty: 'Beginner', category: 'Push',
    instructions: ['Lie on your back with hands behind your head.', 'Lift shoulders off the floor and bring one knee to the opposite elbow.', 'Alternate sides in a pedaling motion.', 'Keep the movement controlled, not fast.'],
    gifUrl: `${BASE}/Bicycle_Crunch/0.jpg`
  },
  {
    id: 'ab9', name: 'Dead Bug', muscle: 'Abs', secondaryMuscles: ['Core'],
    equipment: 'Bodyweight', difficulty: 'Beginner', category: 'Push',
    instructions: ['Lie on your back with arms extended toward ceiling.', 'Lift knees to 90 degrees.', 'Extend opposite arm and leg simultaneously.', 'Return to start and alternate sides.'],
    gifUrl: `${BASE}/Dead_Bug/0.jpg`
  },
  {
    id: 'ab10', name: 'V-Ups', muscle: 'Abs', secondaryMuscles: ['Hip Flexors'],
    equipment: 'Bodyweight', difficulty: 'Intermediate', category: 'Push',
    instructions: ['Lie flat on your back with arms overhead.', 'Simultaneously raise legs and torso to form a V.', 'Touch your toes at the top.', 'Lower back slowly to starting position.'],
    gifUrl: `${BASE}/V-up/0.jpg`
  },
];
