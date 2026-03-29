import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'trainer', 'admin'], default: 'user' },
  isTrainerClient: { type: Boolean, default: false },
  subscription: {
    status: { type: String, enum: ['active', 'inactive', 'trial'], default: 'trial' },
    trialExpires: { type: Date, default: () => new Date(+new Date() + 5 * 24 * 60 * 60 * 1000) }, // 5 days from now
    expiresAt: { type: Date },
  },
  profile: {
    age: Number,
    weight: Number, // current weight in kg
    height: Number, // height in cm
    goal: String,
    targetCalories: { type: Number, default: 2500 },
    targetProtein: { type: Number, default: 180 },
    targetCarbs: { type: Number, default: 250 },
    targetFats: { type: Number, default: 70 },
  },
  weightHistory: [{
    date: { type: Date, default: Date.now },
    weight: Number
  }],
  workouts: [{
    date: { type: Date, default: Date.now },
    name: String,
    totalVolume: { type: Number, default: 0 },
    exercises: [{
      exerciseId: String,
      name: String,
      sets: [{
        reps: Number,
        weight: Number,
        completed: { type: Boolean, default: true }
      }],
      notes: String
    }]
  }],
  workoutPlans: [{
    name: { type: String, required: true },
    description: String,
    category: { type: String, enum: ['Push', 'Pull', 'Legs', 'Full Body', 'Other'] },
    exercises: [{
      exerciseId: String,
      name: String,
      targetSets: { type: Number, default: 3 },
      targetReps: { type: String, default: '8-12' }
    }]
  }],
  nutrition: [{
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    meals: [{
      mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'] },
      items: [{
        name: String,
        amount: Number, // grams or portions
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number,
        foodId: String // ID from external API
      }]
    }]
  }],
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
