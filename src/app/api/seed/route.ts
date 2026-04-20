import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Food from '@/models/Food';
import Exercise from '@/models/Exercise';
import { FOODS } from '@/lib/food-data';
import { EXERCISES } from '@/lib/exercise-data';

export async function GET() {
  try {
    await dbConnect();

    // 1. Seed Foods — drop old data and re-seed with expanded database
    const foodCount = await Food.countDocuments();
    let foodsSeeded = 0;

    // Always re-seed if the count doesn't match the current FOODS array (data was expanded)
    if (foodCount !== FOODS.length) {
      await Food.deleteMany({});

      const arabicDictionary: Record<string, string> = {
        // === Poultry ===
        'Chicken Breast (Grilled)': 'صدر دجاج (مشوي)',
        'Chicken Thigh (Skinless)': 'فخذ دجاج (بدون جلد)',
        'Chicken Wings': 'أجنحة دجاج',
        'Chicken Drumstick': 'أوراك دجاج',
        'Whole Roast Chicken': 'دجاج مشوي كامل',
        'Turkey Breast': 'صدر ديك رومي',
        'Duck Breast': 'صدر بط',
        // === Beef ===
        'Ground Beef (90% lean)': 'لحم بقري مفروم (٩٠٪ خالي من الدهون)',
        'Ground Beef (80% lean)': 'لحم بقري مفروم (٨٠٪ خالي من الدهون)',
        'Ribeye Steak': 'ستيك ريب آي',
        'Sirloin Steak': 'ستيك سيرلوين',
        'Beef Tenderloin (Filet)': 'فيليه بقري (تندرلوين)',
        'Beef Liver': 'كبدة بقري',
        'Beef Brisket': 'صدر بقري (بريسكت)',
        'Corned Beef': 'بقري مملح (كورن بيف)',
        // === Lamb ===
        'Lamb Chop (Grilled)': 'ريش ضأن (مشوية)',
        'Lamb Leg (Roasted)': 'فخذ ضأن (مشوي)',
        'Lamb Shoulder': 'كتف ضأن',
        'Lamb Mince': 'لحم ضأن مفروم',
        // === Fish & Seafood ===
        'Salmon Fillet': 'فيليه سلمون',
        'Tuna (Canned in Water)': 'تونة (معلبة في ماء)',
        'Tuna Steak (Fresh)': 'ستيك تونة (طازج)',
        'Shrimp': 'روبيان (جمبري)',
        'Tilapia': 'بلطي',
        'Cod Fillet': 'فيليه قد (باكلاه)',
        'Sardines (Canned)': 'سردين (معلب)',
        'Mackerel': 'ماكريل',
        'Sea Bass': 'قاروص',
        'Calamari (Grilled)': 'كاليماري (مشوي)',
        'Crab Meat': 'لحم سلطعون',
        // === Eggs & Dairy ===
        'Whole Egg': 'بيضة كاملة',
        'Egg White': 'بياض البيض',
        'Greek Yogurt (0% fat)': 'زبادي يوناني (٠٪ دسم)',
        'Greek Yogurt (Full Fat)': 'زبادي يوناني (كامل الدسم)',
        'Cottage Cheese': 'جبن قريش',
        'Whole Milk': 'حليب كامل الدسم',
        'Skim Milk': 'حليب منزوع الدسم',
        'Cheddar Cheese': 'جبنة شيدر',
        'Mozzarella': 'موزاريلا',
        'Feta Cheese': 'جبنة فيتا',
        'Parmesan': 'جبنة بارميزان',
        'Whey Protein Powder': 'واي بروتين (مسحوق)',
        'Cream Cheese': 'جبنة كريمية',
        'Labneh': 'لبنة',
        'Roumy Cheese': 'جبنة رومي',
        'Halloumi Cheese': 'جبنة حلومي',
        // === Grains & Carbs ===
        'White Rice (Cooked)': 'أرز أبيض (مطبوخ)',
        'Brown Rice (Cooked)': 'أرز بني (مطبوخ)',
        'Basmati Rice (Cooked)': 'أرز بسمتي (مطبوخ)',
        'Oats (Dry)': 'شوفان (جاف)',
        'Pasta (Cooked)': 'مكرونة (مطبوخة)',
        'Whole Wheat Bread': 'خبز قمح كامل',
        'White Bread': 'خبز أبيض',
        'Baladi Bread': 'عيش بلدي',
        'Pita Bread': 'خبز بيتا (عيش شامي)',
        'Quinoa (Cooked)': 'كينوا (مطبوخة)',
        'Sweet Potato (Baked)': 'بطاطا حلوة (مخبوزة)',
        'Regular Potato (Baked)': 'بطاطس عادية (مخبوزة)',
        'French Fries': 'بطاطس محمرة',
        'Corn Tortilla': 'تورتيلا الذرة',
        'Couscous (Cooked)': 'كسكسي (مطبوخ)',
        'Bulgur (Cooked)': 'برغل (مطبوخ)',
        'Vermicelli (Shaeriya)': 'شعرية',
        'Cornflakes': 'كورن فليكس',
        // === Fruits ===
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
        'Guava': 'جوافة',
        'Pomegranate': 'رمان',
        'Fig (Fresh)': 'تين (طازج)',
        'Cantaloupe': 'كنتالوب (شمام)',
        'Peach': 'خوخ',
        // === Vegetables ===
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
        'Okra (Bamia)': 'بامية',
        'Eggplant': 'باذنجان',
        'Onion': 'بصل',
        'Garlic': 'ثوم',
        'Cabbage': 'كرنب',
        'Cauliflower': 'قرنبيط',
        'Lettuce': 'خس',
        'Green Beans': 'فاصوليا خضراء',
        'Peas (Green)': 'بسلة',
        'Corn (Sweet)': 'ذرة حلوة',
        // === Fats & Nuts ===
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
        'Ghee (Samna)': 'سمنة بلدي',
        'Pistachios': 'فستق',
        'Sunflower Seeds': 'بذور دوار الشمس (لب سوري)',
        'Peanuts (Roasted)': 'فول سوداني (محمص)',
        'Hazelnuts': 'بندق',
        // === Legumes ===
        'Lentils (Cooked)': 'عدس (مطبوخ)',
        'Chickpeas (Cooked)': 'حمص (مطبوخ)',
        'Black Beans (Cooked)': 'فاصوليا سوداء (مطبوخة)',
        'Kidney Beans (Cooked)': 'فاصوليا حمراء (مطبوخة)',
        'Fava Beans (Ful - Cooked)': 'فول (مطبوخ)',
        'White Beans (Fasolia)': 'فاصوليا بيضاء',
        'Black-eyed Peas (Lobia)': 'لوبيا',
        'Green Lentils (Cooked)': 'عدس أخضر (مطبوخ)',
        'Edamame': 'إدامامي (فول الصويا)',
        // === Egyptian Dishes ===
        'Koshari': 'كشري',
        'Ful Medames': 'فول مدمس',
        "Ta'ameya (Egyptian Falafel)": 'طعمية',
        'Molokhia (Soup)': 'ملوخية',
        'Mahshi (Stuffed Vegetables)': 'محشي',
        'Hawawshi': 'حواوشي',
        'Kofta Mashwia (Grilled)': 'كفتة مشوية',
        'Alexandrian Liver (Kibda)': 'كبدة إسكندراني',
        'Fattah': 'فتة',
        'Besara': 'بصارة',
        'Bamia Stew': 'بامية (طاجن)',
        'Fasolia Stew (White Beans)': 'فاصوليا (طاجن)',
        'Mombar': 'ممبار',
        'Roz Moammar': 'رز معمر',
        'Kabab (Egyptian Grilled)': 'كباب مشوي',
        'Fiteer Meshaltet': 'فطير مشلتت',
        'Koshary with Dakka Sauce': 'كشري بالدقة',
        'Moussaka (Egyptian)': 'مسقعة',
        'Shakshouka': 'شكشوكة',
        'Feteer with Cheese': 'فطير بالجبنة',
        'Egyptian Rice with Vermicelli': 'أرز مصري بالشعرية',
        'Chicken Pane (Breaded)': 'بانيه دجاج',
        'Macarona Bechamel': 'مكرونة بشاميل',
        'Roz Bel Laban': 'أرز باللبن',
        // === Egyptian Desserts ===
        'Basbousa': 'بسبوسة',
        'Konafa': 'كنافة',
        'Om Ali': 'أم علي',
        'Balah El Sham': 'بلح الشام',
        'Qatayef': 'قطايف',
        'Zalabya': 'زلابية',
        'Halawa Tahinia': 'حلاوة طحينية',
        'Goulash (Sweet)': 'جلاش حلو',
        // === Middle Eastern ===
        'Chicken Shawarma (Meat)': 'شاورما دجاج',
        'Beef Shawarma (Meat)': 'شاورما لحمة',
        'Falafel': 'فلافل',
        'Hummus': 'حمص (غمس)',
        'Baba Ganoush': 'بابا غنوج',
        'Tabbouleh': 'تبولة',
        'Fattoush': 'فتوش',
        'Kabsa (Saudi)': 'كبسة سعودية',
        'Mandi (Yemeni)': 'مندي يمني',
        'Chicken Biryani': 'برياني دجاج',
        'Mansaf': 'منسف',
        'Mulukhiyah with Chicken': 'ملوخية بالدجاج',
        'Kibbeh (Fried)': 'كبة مقلية',
        'Grape Leaves (Warak Enab)': 'ورق عنب',
        'Baklava': 'بقلاوة',
        // === Fast Food ===
        'Cheese Pizza': 'بيتزا بالجبنة',
        'Pepperoni Pizza': 'بيتزا بيبروني',
        'Beef Burger (with Bun)': 'برجر لحمة (بالخبز)',
        'Chicken Burger': 'برجر دجاج',
        'Cheeseburger': 'تشيز برجر',
        'Chicken Nuggets': 'ناجتس دجاج',
        'Hot Dog': 'هوت دوج',
        'Fried Chicken': 'دجاج مقلي',
        'Burrito (Beef)': 'بوريتو لحمة',
        'Tacos (Beef)': 'تاكو لحمة',
        'Doner Kebab': 'دونر كباب',
        'Crepe (Savory)': 'كريب حادق',
        // === International ===
        'Spaghetti Bolognese': 'سباغيتي بولونيز',
        'Pasta Alfredo': 'باستا ألفريدو',
        'Lasagna': 'لازانيا',
        'Sushi Roll (Salmon)': 'سوشي رول (سلمون)',
        'Fried Rice (Chinese)': 'أرز مقلي صيني',
        'Pad Thai': 'باد تاي',
        'Ramen (Instant)': 'رامن (سريع التحضير)',
        'Gyros (Meat)': 'جيروس',
        'Caesar Salad': 'سلطة سيزر',
        'Butter Chicken (Indian)': 'دجاج بالزبدة (هندي)',
        'Tandoori Chicken': 'دجاج تندوري',
        'Spring Rolls (Fried)': 'سبرنج رول (مقلي)',
        // === Snacks ===
        'Dark Chocolate (70%)': 'شوكولاتة داكنة (٧٠٪)',
        'Honey': 'عسل',
        'Granola Bar': 'لوح جرانولا',
        'Rice Cakes': 'كعك الأرز',
        'Protein Bar': 'لوح بروتين',
        'Milk Chocolate': 'شوكولاتة بالحليب',
        'Popcorn (Air-popped)': 'فشار (بدون زيت)',
        'Potato Chips': 'شيبسي',
        'Croissant': 'كرواسون',
        'Ice Cream (Vanilla)': 'آيس كريم (فانيلا)',
        'Pancakes': 'بان كيك',
        'Donut (Glazed)': 'دونات',
        // === Beverages ===
        'Orange Juice': 'عصير برتقال',
        'Coconut Water': 'ماء جوز الهند',
        'Almond Milk': 'حليب اللوز',
        'Protein Shake': 'مخفوق البروتين',
        'Mango Juice': 'عصير مانجو',
        'Sugarcane Juice': 'عصير القصب',
        'Karkade (Hibiscus)': 'كركديه',
        'Sahlab': 'سحلب',
        'Cola Soda': 'كولا',
        'Arabic Coffee': 'قهوة عربية',
      };

      const foodsWithTranslations = FOODS.map(f => ({
        ...f,
        nameAr: arabicDictionary[f.name] || f.name,
        fiber: f.category === 'Vegetables' || f.category === 'Fruits' || f.category === 'Grains' || f.category === 'Legumes' ? 2 : 0,
      }));
      await Food.insertMany(foodsWithTranslations);
      foodsSeeded = FOODS.length;
    }

    // 2. Seed Exercises
    const exerciseCount = await Exercise.countDocuments();
    let exercisesSeeded = 0;
    if (exerciseCount === 0) {
      await Exercise.insertMany(EXERCISES);
      exercisesSeeded = EXERCISES.length;
    }

    return NextResponse.json({
      message: 'Database seeding completed successfully.',
      foodsSeeded,
      exercisesSeeded,
      totalFoodsInDB: foodsSeeded > 0 ? foodsSeeded : foodCount,
      totalExercisesInDB: exercisesSeeded > 0 ? exercisesSeeded : exerciseCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
