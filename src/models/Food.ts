import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameAr: { type: String }, // Arabic translation
  category: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  fiber: { type: Number, default: 0 },
  unit: { type: String, default: '100g' }
}, { timestamps: true });

// Add text index for searching
FoodSchema.index({ name: 'text', nameAr: 'text' });

export default mongoose.models.Food || mongoose.model('Food', FoodSchema);
