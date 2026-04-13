import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Food from '@/models/Food';
import Exercise from '@/models/Exercise';
import { FOODS } from '@/lib/food-data';
import { EXERCISES } from '@/lib/exercise-data';

export async function GET() {
  try {
    await dbConnect();

    // 1. Seed Foods
    const foodCount = await Food.countDocuments();
    if (foodCount === 0) {
      const arabicDictionary: Record<string, string> = {
        'Chicken Breast (Grilled)': 'صدر دجاج (مشوي)',
        'Chicken Thigh': 'فخذ دجاج',
        'Ground Beef (90% lean)': 'لحم بقري مفروم (٩٠٪ خالي من الدهون)',
        'Ribeye Steak': 'ستيك ريب آي',
        'Salmon Fillet': 'فيليه سلمون',
        'Tuna (Canned)': 'تونة (معلبة)',
        'Shrimp': 'روبيان (جمبري)',
        'Tilapia': 'بلطي',
        'Turkey Breast': 'صدر ديك رومي',
        'Lamb Chop': 'ريش ضأن',
        'Pork Loin': 'لحم خنزير (مستبعد)', 
        'Beef Liver': 'كبدة بقري',
        'Whole Egg': 'بيضة كاملة',
        'Egg White': 'بياض البيض',
        'Greek Yogurt (0% fat)': 'زبادي يوناني (٠٪ دسم)',
        'Greek Yogurt (Full Fat)': 'زبادي يوناني (كامل الدسم)',
        'Cottage Cheese': 'جبن قريش',
        'Whole Milk': 'حليب كامل الدسم',
        'Cheddar Cheese': 'جبنة شيدر',
        'Mozzarella': 'موزاريلا',
        'Whey Protein Powder': 'مسحوق بروتين مصل اللبن (واي بروتين)',
        'Cream Cheese': 'جبنة كريمية',
        'White Rice (Cooked)': 'أرز أبيض (مطبوخ)',
        'Brown Rice (Cooked)': 'أرز بني (مطبوخ)',
        'Oats (Dry)': 'شوفان (جاف)',
        'Pasta (Cooked)': 'مكرونة (مطبوخة)',
        'Whole Wheat Bread': 'خبز قمح كامل',
        'White Bread': 'خبز أبيض',
        'Quinoa (Cooked)': 'كينوا (مطبوخة)',
        'Sweet Potato (Baked)': 'بطاطا حلوة (مخبوزة)',
        'Regular Potato (Baked)': 'بطاطس عادية (مخبوزة)',
        'Corn Tortilla': 'تورتيلا الذرة',
        'Couscous (Cooked)': 'كسكسي (مطبوخ)',
        'Bagel': 'خبز بيجل',
        'Banana': 'موز',
        'Apple': 'تفاح',
        'Strawberries': 'فراولة',
        'Blueberries': 'توت أزرق',
        'Mango': 'مانجو',
        'Orange': 'برتقال',
        'Watermelon': 'بطيخ',
        'Grapes': 'عنب',
        'Pineapple': 'أناناس',
        'Dates': 'تمر',
        'Broccoli': 'بروكلي',
        'Spinach': 'سبانخ',
        'Avocado': 'أفوكادو',
        'Cucumber': 'خيار',
        'Tomato': 'طماطم',
        'Carrots': 'جزر',
        'Bell Pepper': 'فلفل رومي',
        'Mushrooms': 'فطر (مشروم)',
        'Zucchini': 'كوسة',
        'Kale': 'كرنب (كيل)',
        'Peanut Butter': 'زبدة الفول السوداني',
        'Almonds': 'لوز',
        'Walnuts': 'عين الجمل (جوز)',
        'Cashews': 'كاجو',
        'Olive Oil': 'زيت زيتون',
        'Coconut Oil': 'زيت جوز الهند',
        'Chia Seeds': 'بذور الشيا',
        'Flax Seeds': 'بذور الكتان',
        'Butter': 'زبدة',
        'Tahini': 'طحينة',
        'Lentils (Cooked)': 'عدس (مطبوخ)',
        'Chickpeas (Cooked)': 'حمص (مطبوخ)',
        'Black Beans (Cooked)': 'فاصوليا سوداء (مطبوخة)',
        'Kidney Beans (Cooked)': 'فاصوليا حمراء (مطبوخة)',
        'Edamame': 'إدامامي (فول الصويا)',
        'Dark Chocolate (70%)': 'شوكولاتة داكنة (٧٠٪)',
        'Honey': 'عسل',
        'Granola Bar': 'لوح جرانولا',
        'Rice Cakes': 'كعك الأرز',
        'Protein Bar': 'لوح بروتين',
        'Trail Mix': 'مكسرات مشكلة',
        'Popcorn (Air-popped)': 'فشار (بدون زيت)',
        'Hummus': 'حمص (غمس)',
        'Orange Juice': 'عصير برتقال',
        'Coconut Water': 'ماء جوز الهند',
        'Almond Milk': 'حليب اللوز',
        'Protein Shake': 'مخفوق البروتين'
      };

      const foodsWithTranslations = FOODS.map(f => ({
        ...f,
        nameAr: arabicDictionary[f.name] || f.name, // Fallback to English if not in dict
        fiber: f.category === 'Vegetables' || f.category === 'Fruits' || f.category === 'Grains' ? 2 : 0,
      }));
      await Food.insertMany(foodsWithTranslations);
    }

    // 2. Seed Exercises
    const exerciseCount = await Exercise.countDocuments();
    if (exerciseCount === 0) {
      await Exercise.insertMany(EXERCISES);
    }

    return NextResponse.json({
      message: 'Database seeding completed successfully.',
      foodsSeeded: foodCount === 0 ? FOODS.length : 0,
      exercisesSeeded: exerciseCount === 0 ? EXERCISES.length : 0,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
