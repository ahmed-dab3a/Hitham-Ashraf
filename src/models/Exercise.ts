import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscle: { type: String, required: true },
  secondaryMuscles: [{ type: String }],
  equipment: { type: String, required: true },
  difficulty: { type: String, required: true },
  category: { type: String, required: true },
  instructions: [{ type: String }],
  gifUrl: { type: String, required: true }, // Serves as the animation URL
}, { timestamps: true });

// Optimize searching by name, muscle, equipment
ExerciseSchema.index({ name: 'text' });
ExerciseSchema.index({ muscle: 1, equipment: 1, category: 1 });

export default mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema);
