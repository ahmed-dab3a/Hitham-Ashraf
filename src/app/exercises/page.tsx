'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, PlayCircle, Target, Zap, Activity, X } from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface Exercise {
  id: string;
  name: string;
  nameAr?: string;
  muscle: string;
  secondaryMuscles: string[];
  equipment: string;
  difficulty: string;
  category: string;
  instructions: string[];
  gifUrl: string;
}

// Anatomy Filter Options
const ANATOMY_FILTERS = [
  { id: 'All', icon: '🧍‍♂️', nameEn: 'All', nameAr: 'الكل' },
  { id: 'Chest', icon: '🫁', nameEn: 'Chest', nameAr: 'الصدر' },
  { id: 'Back', icon: '🔙', nameEn: 'Back', nameAr: 'الظهر' },
  { id: 'Shoulders', icon: '🦾', nameEn: 'Shoulders', nameAr: 'الأكتاف' },
  { id: 'Arms', icon: '💪', nameEn: 'Arms', nameAr: 'الذراع' },
  { id: 'Legs', icon: '🦵', nameEn: 'Legs', nameAr: 'الأرجل' },
  { id: 'Abs', icon: '🍫', nameEn: 'Abs', nameAr: 'البطن' },
];

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedMuscle !== 'All') params.append('muscle', selectedMuscle);
        if (search) params.append('search', search);

        // Uses the existing API which falls back to the database or lib
        const res = await fetch(`/api/exercises?${params.toString()}`);
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error('Failed to fetch exercises', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchExercises, 300);
    return () => clearTimeout(timer);
  }, [search, selectedMuscle]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="بحث في التمارين..."
              dir="auto"
              className="w-full bg-[#1c1c1e] border-none rounded-full py-4 pl-14 pr-6 text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Anatomy Filter Bar */}
        <div className="mb-10 w-full overflow-x-auto no-scrollbar py-2">
           <div className="flex justify-center md:justify-start gap-4 min-w-max px-2">
             {ANATOMY_FILTERS.map((filter) => {
               const isActive = selectedMuscle === filter.id;
               return (
                 <button
                   key={filter.id}
                   onClick={() => setSelectedMuscle(filter.id)}
                   className={`flex flex-col items-center justify-center p-4 rounded-[28px] transition-all duration-300 w-24 h-28 border ${
                     isActive 
                       ? 'bg-[#1c1c1e] border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105' 
                       : 'bg-black border-[#2c2c2e] text-gray-500 hover:border-gray-500 hover:text-gray-300'
                   }`}
                 >
                   <span className={`text-4xl mb-3 ${isActive ? '' : 'opacity-60 grayscale'}`}>{filter.icon}</span>
                   <span className="text-xs font-black tracking-widest">{filter.nameAr}</span>
                 </button>
               )
             })}
           </div>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-end mb-6 border-b border-[#2c2c2e] pb-4">
           <div className="flex flex-col">
             <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2" dir="rtl">
                جميع التمارين 
             </h2>
             <span className="text-xs text-gray-500 font-black uppercase tracking-widest mt-1">All {selectedMuscle !== 'All' ? selectedMuscle : ''} Exercises</span>
           </div>
           {!loading && <span className="text-sm font-bold text-gray-500 bg-[#1c1c1e] px-4 py-1.5 rounded-full">{exercises.length} Exercises</span>}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 rounded-3xl bg-[#1c1c1e] border border-[#2c2c2e] animate-pulse" />
            ))}
          </div>
        )}

        {/* Exercise Grid - Grey Cards UI */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {exercises.map((ex) => (
                <motion.div
                  key={ex.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="h-full flex flex-col bg-[#1c1c1e] border-none rounded-[28px] overflow-hidden cursor-pointer group hover:bg-[#2c2c2e] transition-colors p-0 active:scale-95"
                    onClick={() => setSelectedExercise(ex)}
                  >
                    {/* Dark/Grey Image Box */}
                    <div className="relative aspect-square bg-[#0a0a0a] m-3 rounded-2xl flex items-center justify-center p-4 overflow-hidden border border-[#2c2c2e]">
                       <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1c1c1e] flex items-center justify-center border border-[#2c2c2e] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                         <PlayCircle className="w-5 h-5" />
                       </div>
                       <img 
                         src={ex.gifUrl} 
                         alt={ex.name} 
                         className="w-full h-full object-contain filter grayscale mix-blend-screen opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                         onError={(e) => {
                           e.currentTarget.src = 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&q=80';
                           e.currentTarget.className = "w-full h-full object-cover opacity-30 grayscale";
                         }}
                       />
                       {/* The 3D/Anatomy overlay hint */}
                       <div className="absolute bottom-3 left-3 flex gap-1">
                          <span className="bg-[#1c1c1e] text-gray-400 text-[9px] uppercase font-black px-2 py-1 rounded-md border border-[#2c2c2e]">{ex.difficulty}</span>
                       </div>
                    </div>
                    
                    {/* Content Box */}
                    <div className="px-5 pb-5 text-center flex-grow flex flex-col justify-center">
                       <h3 className="text-base md:text-lg font-black text-white leading-tight mb-1">{ex.name}</h3>
                       {ex.nameAr && (
                         <p className="text-gray-400 text-sm font-medium" dir="rtl">{ex.nameAr}</p>
                       )}
                       <p className="text-[10px] uppercase font-black tracking-widest text-[#FF6B00] mt-3">
                         {ex.muscle}
                       </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && exercises.length === 0 && (
          <div className="text-center py-20 opacity-40">
            <Activity className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <p className="text-xl font-black uppercase tracking-widest">No exercises found</p>
          </div>
        )}
      </div>

      {/* Exercise Detail Modal with 3D YouTube Link */}
      <AnimatePresence>
        {selectedExercise && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExercise(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#1c1c1e] border border-[#2c2c2e] rounded-[36px] overflow-hidden shadow-2xl my-auto"
            >
              {/* Header Visual */}
              <div className="relative h-64 sm:h-80 bg-black flex items-center justify-center border-b border-[#2c2c2e]">
                <img 
                  src={selectedExercise.gifUrl} 
                  alt={selectedExercise.name} 
                  className="w-full h-full object-contain filter mix-blend-screen opacity-90"
                />
                
                <button 
                  onClick={() => setSelectedExercise(null)} 
                  className="absolute top-6 right-6 p-3 bg-[#1c1c1e] rounded-full border border-[#2c2c2e] hover:bg-white hover:text-black transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 md:p-10 max-h-[60vh] overflow-y-auto no-scrollbar">
                
                <div className="text-center mb-8">
                   <h2 className="text-3xl font-black uppercase mb-2">{selectedExercise.name}</h2>
                   {selectedExercise.nameAr && (
                     <h3 className="text-xl text-gray-300 font-bold mb-4" dir="rtl">{selectedExercise.nameAr}</h3>
                   )}
                   <div className="flex items-center justify-center gap-3">
                     <span className="px-4 py-1.5 bg-[#0a0a0a] border border-[#2c2c2e] rounded-full text-xs font-black uppercase tracking-widest text-[#FF6B00]">
                       {selectedExercise.muscle}
                     </span>
                     <span className="px-4 py-1.5 bg-[#0a0a0a] border border-[#2c2c2e] rounded-full text-xs font-black uppercase tracking-widest text-gray-400">
                       {selectedExercise.equipment}
                     </span>
                   </div>
                </div>

                {/* 3D Model YouTube Link */}
                <div className="mb-10">
                   <a 
                     href={`https://www.youtube.com/results?search_query=Muscle+and+Motion+${encodeURIComponent(selectedExercise.name)}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-center w-full gap-3 bg-[#FF0000]/10 border border-[#FF0000]/30 hover:bg-[#FF0000] hover:text-white transition-all text-[#FF0000] py-4 rounded-2xl font-black uppercase tracking-widest"
                   >
                     <PlayCircle className="w-6 h-6" />
                     شاهد الأداء العضلي 3D (Muscle & Motion)
                   </a>
                   <p className="text-center text-xs text-gray-500 mt-3" dir="rtl">
                     شاهد التشريح العضلي الدقيق لهذا التمرين على قناة يوتيوب للتعلم بشكل أفضل!
                   </p>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 mb-6 border-b border-[#2c2c2e] pb-4">
                    <Info className="w-4 h-4 text-gray-500" />
                    How to perform
                  </h4>
                  <div className="space-y-4">
                     {selectedExercise.instructions.map((step, idx) => (
                       <div key={idx} className="flex gap-4">
                          <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border border-[#2c2c2e] flex items-center justify-center text-gray-400 text-[10px] font-black shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                       </div>
                     ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
