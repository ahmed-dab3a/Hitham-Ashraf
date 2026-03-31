'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Apple, Activity, Trash2, X, ChevronLeft, ChevronRight, Scale } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import type { FoodData } from '@/lib/food-data';

interface FoodItem {
  id?: string;
  foodId?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  amount: number;
  unit: string;
}

interface Meal {
  mealType: string;
  items: FoodItem[];
}

interface DayLog {
  date: string;
  meals: Meal[];
}

export default function NutritionPage() {
  const token = useAuthStore(state => state.token);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dayLog, setDayLog] = useState<DayLog>({ date, meals: [] });
  const [loading, setLoading] = useState(true);
  
  const [isSearching, setIsSearching] = useState(false);
  const [activeMealType, setActiveMealType] = useState('Breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodData[]>([]);
  
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);
  const [portionGrams, setPortionGrams] = useState(100);

  // Fetch Day Log
  useEffect(() => {
    const fetchLog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/nutrition?date=${date}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        const data = await res.json();
        setDayLog(data);
      } catch (err) {
        console.error('Failed to fetch nutrition log', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLog();
  }, [date]);

  // Search API
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 1) {
        const res = await fetch(`/api/nutrition?q=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const totals = useMemo(() => {
    const acc = { cal: 0, p: 0, c: 0, f: 0 };
    dayLog.meals?.forEach(meal => {
      meal.items.forEach(item => {
        acc.cal += item.calories;
        acc.p += item.protein;
        acc.c += item.carbs;
        acc.f += item.fats;
      });
    });
    return acc;
  }, [dayLog]);

  const goals = { cal: 2500, p: 200, c: 250, f: 70 };

  const handleAddFood = async () => {
    if (!selectedFood) return;

    const ratio = portionGrams / 100;
    const foodToAdd = {
      foodId: selectedFood.id,
      name: selectedFood.name,
      amount: portionGrams,
      calories: Math.round(selectedFood.calories * ratio),
      protein: Math.round(selectedFood.protein * ratio),
      carbs: Math.round(selectedFood.carbs * ratio),
      fats: Math.round(selectedFood.fats * ratio)
    };

    try {
      const res = await fetch('/api/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          date,
          mealType: activeMealType,
          food: foodToAdd
        })
      });
      
      if (res.ok) {
        // Refresh log
        const updatedLogRes = await fetch(`/api/nutrition?date=${date}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        const updatedLog = await updatedLogRes.json();
        setDayLog(updatedLog);
        
        // Reset state
        setSelectedFood(null);
        setIsSearching(false);
        setSearchQuery('');
      }
    } catch (err) {
      console.error('Failed to add food', err);
    }
  };

  const changeDate = (days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black mb-4 uppercase italic">Nutrition <span className="text-accent not-italic">Engine</span></h1>
            <p className="text-gray-400 max-w-2xl">Precision fueling for elite performance. Track calories, macros, and micro-nutrients with pinpoint accuracy.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-card-bg border border-white/10 rounded-2xl p-2 shrink-0">
            <button onClick={() => changeDate(-1)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"><ChevronLeft className="w-5 h-5" /></button>
            <div className="text-sm font-black uppercase tracking-widest px-4 border-x border-white/10">
              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <button onClick={() => changeDate(1)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </header>

        {/* Daily Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 relative overflow-hidden flex flex-col justify-center min-h-[350px] border-accent/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="relative flex justify-center">
                 <div className="w-56 h-56 rounded-full border-[16px] border-white/5 flex flex-col items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="112" cy="112" r="96" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="16"
                        className="text-accent opacity-20"
                      />
                      <motion.circle 
                        cx="112" cy="112" r="96" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="16"
                        className="text-accent"
                        strokeDasharray={603}
                        initial={{ strokeDashoffset: 603 }}
                        animate={{ strokeDashoffset: 603 - (603 * Math.min(totals.cal / goals.cal, 1)) }}
                        transition={{ duration: 1.5, ease: 'circOut' }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-5xl font-black">{Math.max(0, Math.round(goals.cal - totals.cal))}</span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2 text-center leading-tight">Calories <br /> Remaining</span>
                 </div>
               </div>
               
               <div className="space-y-8 pr-4">
                 <MacroProgress label="Protein" current={totals.p} goal={goals.p} color="bg-accent" />
                 <MacroProgress label="Carbohydrates" current={totals.c} goal={goals.c} color="bg-blue-500" />
                 <MacroProgress label="Healthy Fats" current={totals.f} goal={goals.f} color="bg-orange-500" />
               </div>
            </div>
          </Card>
          
          <Card className="flex flex-col justify-between bg-gradient-to-br from-card-bg to-black border-white/5">
             <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-accent/10 text-accent rounded-3xl">
                    <Activity className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Bio-Feedback</h3>
                    <p className="text-xs text-accent font-bold tracking-[0.2em] uppercase">Status: Optimal</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-sm text-gray-400 mb-1">Total Weight Tracked</p>
                    <p className="text-2xl font-black">1.4 <span className="text-sm text-gray-600">kg lost this week</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-sm text-gray-400 mb-1">Consistency Score</p>
                    <p className="text-2xl font-black text-accent">94%</p>
                  </div>
                </div>
             </div>
             <Button variant="outline" className="w-full mt-8 rounded-[20px] py-6 border-white/10 hover:border-accent group hover:bg-accent/5">
               <span className="group-hover:text-accent transition-colors italic uppercase font-black">Detailed Analytics</span>
             </Button>
          </Card>
        </div>

        {/* Meal Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((mealType) => {
            const meal = dayLog.meals?.find(m => m.mealType === mealType) || { items: [] };
            const mealCalories = meal.items.reduce((sum, item) => sum + item.calories, 0);
            
            return (
              <Card key={mealType} className="flex flex-col border-white/5 group hover:border-accent/30 transition-all duration-500">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-accent/10 transition-colors">
                      <Apple className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{mealType}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black">{mealCalories}</span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase block tracking-widest">kcal</span>
                  </div>
                </div>

                <div className="space-y-6 flex-grow mb-10">
                  {meal.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between group/item">
                      <div className="flex gap-4 items-start">
                        <div className="w-1 h-8 bg-accent/20 rounded-full mt-1" />
                        <div>
                          <p className="font-bold text-gray-200 text-lg leading-none mb-1">{item.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                            {item.amount}g • P: {item.protein}g • C: {item.carbs}g • F: {item.fats}g
                          </p>
                        </div>
                      </div>
                      <button className="opacity-0 group-item/item:opacity-100 p-2 text-gray-700 hover:text-red-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {meal.items.length === 0 && (
                     <div className="py-8 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                        <p className="text-sm text-gray-600 font-bold uppercase tracking-widest italic">Fuel required</p>
                     </div>
                  )}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full border border-dashed border-white/10 rounded-[24px] py-8 text-gray-500 hover:text-accent hover:border-accent/50 hover:bg-accent/[0.02] transition-all group/btn"
                  onClick={() => {
                    setActiveMealType(mealType);
                    setIsSearching(true);
                  }}
                >
                  <Plus className="w-5 h-5 mr-3 group-hover/btn:rotate-90 transition-transform" /> 
                  <span className="uppercase font-black text-sm tracking-widest">Add Nutrients</span>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Food Search Modal */}
      <AnimatePresence>
        {isSearching && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSearching(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-3xl bg-card-bg border border-white/10 rounded-[48px] shadow-2xl overflow-hidden">
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h2 className="text-3xl font-display font-black uppercase">Search <span className="text-accent italic">Database</span></h2>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Adding to {activeMealType}</p>
                  </div>
                  <button onClick={() => setIsSearching(false)} className="p-4 bg-white/5 rounded-3xl hover:bg-white/10 transition-all group">
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                <div className="relative mb-8">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent w-6 h-6" />
                  <input 
                    type="text" 
                    placeholder="Enter food name (e.g. Ribeye...) "
                    className="w-full bg-black/40 border border-white/10 rounded-[28px] py-6 pl-16 pr-6 text-xl font-bold text-white placeholder:text-gray-700 focus:outline-none focus:border-accent transition-all shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="max-h-[450px] overflow-y-auto space-y-3 pr-4 no-scrollbar">
                  {searchResults.map((food) => (
                    <button
                      key={food.id}
                      onClick={() => {
                        setSelectedFood(food);
                        setPortionGrams(100);
                      }}
                      className="w-full flex items-center justify-between p-6 rounded-[32px] border border-white/5 bg-white/[0.03] hover:border-accent/40 hover:bg-accent/5 transition-all group text-left"
                    >
                      <div className="flex gap-4 items-center">
                         <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-accent/10 transition-colors">
                           <Apple className="w-5 h-5 text-gray-600 group-hover:text-accent" />
                         </div>
                         <div>
                          <p className="text-xl font-black group-hover:text-accent transition-colors">{food.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">{food.unit} • {food.calories} kcal</p>
                        </div>
                      </div>
                      <Plus className="w-6 h-6 text-gray-700 group-hover:text-accent group-hover:rotate-90 transition-all" />
                    </button>
                  ))}
                  
                  {searchQuery.length > 0 && searchResults.length === 0 && (
                    <div className="text-center py-16 opacity-40">
                       <p className="text-lg font-black uppercase italic tracking-widest">No matching nutrients found</p>
                    </div>
                  )}
                  
                  {!searchQuery && (
                     <div className="text-center py-20 opacity-20">
                        <Activity className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-sm font-black uppercase tracking-widest">Awaiting database query...</p>
                     </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Portion Control Modal */}
      <AnimatePresence>
        {selectedFood && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedFood(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-xl bg-card-bg border border-accent/30 rounded-[48px] shadow-2xl p-10">
               <div className="text-center mb-10">
                 <h2 className="text-4xl font-display font-black uppercase mb-2">{selectedFood.name}</h2>
                 <p className="text-accent font-black tracking-widest uppercase text-xs">Configure Nutrients</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="p-6 rounded-[32px] bg-white/[0.03] border border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest mb-2">Calories</p>
                    <p className="text-3xl font-black">{Math.round(selectedFood.calories * (portionGrams / 100))}</p>
                  </div>
                  <div className="p-6 rounded-[32px] bg-white/[0.03] border border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest mb-2">Protein</p>
                    <p className="text-3xl font-black text-accent">{Math.round(selectedFood.protein * (portionGrams / 100))}g</p>
                  </div>
               </div>

               <div className="mb-12">
                 <div className="flex justify-between items-center mb-6 px-2">
                    <span className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Scale className="w-4 h-4" /> Amount
                    </span>
                    <span className="text-2xl font-black text-white">{portionGrams}g</span>
                 </div>
                 <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="5"
                  value={portionGrams}
                  onChange={(e) => setPortionGrams(parseInt(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                 />
                 <div className="flex justify-between mt-4 px-2 text-[10px] font-black uppercase text-gray-700">
                    <span>0g</span>
                    <span>500g</span>
                    <span>1000g</span>
                 </div>
               </div>

               <div className="flex gap-4">
                 <Button variant="ghost" className="flex-1 py-8 rounded-[24px] uppercase font-black tracking-widest" onClick={() => setSelectedFood(null)}>Cancel</Button>
                 <Button className="flex-1 py-8 rounded-[24px] uppercase font-black tracking-widest shadow-lg shadow-accent/20" onClick={handleAddFood}>Add to Diary</Button>
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
    <div className="space-y-3">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.15em]">
        <span className="text-gray-400">{label}</span>
        <span className={percentage >= 100 ? 'text-green-500' : 'text-gray-500'}>{Math.round(current)}g / {goal}g</span>
      </div>
      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-full ${color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`} 
        />
      </div>
    </div>
  );
}
