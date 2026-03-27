'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Apple, Activity, Trash2, X } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import foodsData from '@/lib/foods.json';

interface FoodItem {
  name: string;
  cal: number;
  p: number;
  c: number;
  f: number;
}

interface Meal {
  id: string;
  name: string;
  items: FoodItem[];
}

export default function NutritionPage() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', name: 'Breakfast', items: [{ name: 'Oats', cal: 389, p: 17, c: 66, f: 7 }] },
    { id: '2', name: 'Lunch', items: [{ name: 'Chicken Breast', cal: 250, p: 45, c: 0, f: 5 }, { name: 'White Rice', cal: 200, p: 4, c: 45, f: 1 }] },
  ]);
  
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [activeMealIndex, setActiveMealIndex] = useState(0);
  const [search, setSearch] = useState('');

  const totals = useMemo(() => {
    return meals.reduce((acc, meal) => {
      meal.items.forEach((item) => {
        acc.cal += item.cal;
        acc.p += item.p;
        acc.c += item.c;
        acc.f += item.f;
      });
      return acc;
    }, { cal: 0, p: 0, c: 0, f: 0 });
  }, [meals]);

  const goals = { cal: 2500, p: 200, c: 250, f: 70 };

  const filteredFoods = foodsData.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const addFoodToMeal = (food: { name: string; calories: number; protein: number; carbs: number; fats: number }) => {
    const updated = [...meals];
    updated[activeMealIndex].items.push({
      name: food.name,
      cal: food.calories,
      p: food.protein,
      c: food.carbs,
      f: food.fats
    });
    setMeals(updated);
    setIsAddingFood(false);
    setSearch('');
  };

  const removeFood = (mealIdx: number, itemIdx: number) => {
    const updated = [...meals];
    updated[mealIdx].items.splice(itemIdx, 1);
    setMeals(updated);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4 uppercase">NUTRITION <span className="text-accent italic">TRACKER</span></h1>
          <p className="text-gray-400 max-w-2xl">Fuel your performance. Monitor your daily caloric intake and macronutrient balance to reach your goals faster.</p>
        </header>

        {/* Daily Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="relative flex justify-center">
                 <div className="w-48 h-48 rounded-full border-[12px] border-white/5 flex flex-col items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="96" cy="96" r="84" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="12"
                        className="text-accent"
                        strokeDasharray={527}
                        strokeDashoffset={527 - (527 * Math.min(totals.cal / goals.cal, 1))}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-4xl font-black">{Math.round(goals.cal - totals.cal)}</span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 text-center leading-tight">Calories <br /> Remaining</span>
                 </div>
               </div>
               
               <div className="space-y-6">
                 <MacroProgress label="Protein" current={totals.p} goal={goals.p} color="bg-accent" />
                 <MacroProgress label="Carbs" current={totals.c} goal={goals.c} color="bg-blue-500" />
                 <MacroProgress label="Fats" current={totals.f} goal={goals.f} color="bg-orange-500" />
               </div>
            </div>
          </Card>
          
          <Card className="flex flex-col justify-between border-accent/20">
             <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-accent text-black rounded-2xl">
                   <Activity className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold uppercase tracking-tighter">Your Progress</h3>
               </div>
               <p className="text-gray-400 text-sm leading-relaxed mb-6">You&apos;re currently on a 5-day streak! Keep hitting your protein goals to maintain muscle mass while cutting.</p>
             </div>
             <Button variant="outline" className="w-full">View Detailed Trends</Button>
          </Card>
        </div>

        {/* Meal Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((mealName, idx) => {
            const meal = meals.find(m => m.name === mealName) || { items: [] };
            return (
              <Card key={mealName} className="flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-xl">
                      <Apple className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold">{mealName}</h3>
                  </div>
                  <span className="text-sm font-bold text-gray-500">
                    {meal.items.reduce((sum, item) => sum + item.cal, 0)} kcal
                  </span>
                </div>

                <div className="space-y-4 flex-grow mb-8">
                  {meal.items.map((item, itemIdx: number) => (
                    <div key={itemIdx} className="flex items-center justify-between group">
                      <div>
                        <p className="font-bold text-gray-200">{item.name}</p>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">P: {item.p}g • C: {item.c}g • F: {item.f}g</p>
                      </div>
                      <button 
                        onClick={() => removeFood(idx, itemIdx)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-600 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {meal.items.length === 0 && (
                     <p className="text-sm text-gray-600 italic">No food added yet.</p>
                  )}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full border border-dashed border-white/10 rounded-2xl"
                  onClick={() => {
                    setActiveMealIndex(idx);
                    setIsAddingFood(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Food
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Food Modal */}
      <AnimatePresence>
        {isAddingFood && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingFood(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-card-bg border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-black uppercase">Add Food to <span className="text-accent italic">{['Breakfast', 'Lunch', 'Dinner', 'Snacks'][activeMealIndex]}</span></h2>
                  <button onClick={() => setIsAddingFood(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search food database..."
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="max-h-[400px] overflow-y-auto space-y-2 no-scrollbar">
                  {filteredFoods.map((food) => (
                    <button
                      key={food.id}
                      onClick={() => addFoodToMeal(food)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all group text-left"
                    >
                      <div>
                        <p className="font-bold group-hover:text-accent transition-colors">{food.name}</p>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{food.unit} • {food.calories} kcal</p>
                      </div>
                      <Plus className="w-5 h-5 text-gray-600 group-hover:text-accent transition-all" />
                    </button>
                  ))}
                  {filteredFoods.length === 0 && (
                    <div className="text-center py-12">
                       <p className="text-gray-500 italic">No foods found. Try a different search term.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MacroProgress({ label, current, goal, color }: { label: string; current: number; goal: number; color: string }) {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-black uppercase tracking-widest">
        <span>{label}</span>
        <span className={percentage >= 100 ? 'text-green-500' : 'text-gray-400'}>{current}g / {goal}g</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color}`} 
        />
      </div>
    </div>
  );
}
