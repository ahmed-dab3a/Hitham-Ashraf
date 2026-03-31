'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, ChevronRight, Dumbbell, X, Target, Zap, Waves, Activity } from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface Exercise {
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

const muscles = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Abs'];
const categories = ['All', 'Push', 'Pull', 'Legs'];
const equipments = ['All', 'Barbell', 'Dumbbells', 'Cable', 'Machine', 'Bodyweight'];

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedMuscle !== 'All') params.append('muscle', selectedMuscle);
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (selectedEquipment !== 'All') params.append('equipment', selectedEquipment);
        if (search) params.append('search', search);
        
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
  }, [search, selectedMuscle, selectedCategory, selectedEquipment]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4 uppercase italic tracking-tighter">Movement <span className="text-accent not-italic">Library</span></h1>
          <p className="text-gray-400 max-w-2xl">Master every rep. Our high-fidelity library provides precision-engineered instructions and visual guides for every movement.</p>
        </header>

        {/* Filters & Search */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-grow group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent w-6 h-6 group-focus-within:scale-110 transition-transform" />
              <input 
                type="text" 
                placeholder="Search movements (e.g. Bench Press)"
                className="w-full bg-card-bg border border-white/10 rounded-[24px] py-6 pl-16 pr-6 text-xl font-bold text-white focus:outline-none focus:border-accent/40 transition-all shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'bg-accent text-black scale-105 shadow-lg shadow-accent/20' 
                    : 'bg-white/5 text-gray-500 border border-white/5 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-6">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mr-2">Target Muscle:</span>
             <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {muscles.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMuscle(m)}
                  className={`px-5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-300 ${
                    selectedMuscle === m 
                      ? 'bg-white text-black' 
                      : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-6">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mr-2">Equipment:</span>
             <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {equipments.map((eq) => (
                <button
                  key={eq}
                  onClick={() => setSelectedEquipment(eq)}
                  className={`px-5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-300 ${
                    selectedEquipment === eq 
                      ? 'bg-accent text-black shadow-lg shadow-accent/10' 
                      : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10'
                  }`}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {exercises.map((ex) => (
              <motion.div
                key={ex.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card 
                  className="h-full flex flex-col justify-between cursor-pointer group hover:border-accent/40 bg-gradient-to-br from-card-bg to-black transition-all duration-500 rounded-[32px] overflow-hidden" 
                  onClick={() => setSelectedExercise(ex)}
                >
                  <div className="relative aspect-video overflow-hidden bg-black/50 flex items-center justify-center">
                     <img 
                       src={ex.gifUrl} 
                       alt={ex.name} 
                       className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                       onError={(e) => {
                         e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop';
                         e.currentTarget.className = "w-full h-full object-cover opacity-30 grayscale group-hover:scale-110 transition-all duration-700";
                       }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     <div className="absolute top-4 right-4 gap-2 flex">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full text-accent border border-accent/20">
                          {ex.difficulty}
                        </span>
                     </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition-all">
                        <Dumbbell className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {ex.equipment}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black mb-1 group-hover:text-accent transition-colors leading-tight">{ex.name}</h3>
                    <p className="text-accent text-[10px] font-black mb-6 uppercase tracking-[0.3em]">{ex.muscle}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full bg-white/5 border border-black flex items-center justify-center text-[10px] font-black uppercase">P</div>
                           <div className="w-8 h-8 rounded-full bg-white/5 border border-black flex items-center justify-center text-[10px] font-black uppercase">V</div>
                        </div>
                        <span className="text-xs font-bold text-gray-500 flex items-center gap-1 group-hover:text-white transition-colors">
                           View Mechanics <ChevronRight className="w-4 h-4" />
                        </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!loading && exercises.length === 0 && (
          <div className="text-center py-32 opacity-30">
            <Activity className="w-20 h-20 mx-auto mb-6 text-gray-500" />
            <p className="text-2xl font-black uppercase italic tracking-tighter">No movements match your criteria</p>
          </div>
        )}
      </div>

      {/* Exercise Detail Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExercise(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative w-full max-w-5xl bg-card-bg border border-white/10 rounded-[48px] overflow-hidden shadow-2xl my-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto bg-black flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                  <img 
                    src={selectedExercise.gifUrl} 
                    alt={selectedExercise.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop';
                      e.currentTarget.className = "w-full h-full object-cover opacity-50 grayscale";
                    }}
                  />
                  <div className="absolute bottom-10 left-10 flex gap-4">
                     <div className="px-6 py-2 bg-accent text-black font-black rounded-full text-[10px] uppercase tracking-widest shadow-xl shadow-accent/20">{selectedExercise.category}</div>
                     <div className="px-6 py-2 bg-white/10 backdrop-blur-md text-white font-black rounded-full text-[10px] uppercase tracking-widest border border-white/10">{selectedExercise.difficulty}</div>
                  </div>
                  <button onClick={() => setSelectedExercise(null)} className="absolute top-8 right-8 p-4 bg-black/40 backdrop-blur-md rounded-3xl hover:bg-black transition-all group lg:hidden">
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
                
                <div className="p-10 lg:p-16 max-h-[90vh] overflow-y-auto no-scrollbar">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex-grow pr-4">
                      <h2 className="text-4xl md:text-5xl font-display font-black leading-none mb-4 uppercase">{selectedExercise.name}</h2>
                      <div className="flex flex-wrap gap-4 items-center">
                         <p className="text-accent font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                           <Target className="w-4 h-4" /> Primary: {selectedExercise.muscle}
                         </p>
                         <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                           Secondary: {selectedExercise.secondaryMuscles.join(', ')}
                         </p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedExercise(null)} className="hidden lg:block p-4 bg-white/5 rounded-3xl hover:bg-white/10 transition-all group shrink-0">
                      <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    </button>
                  </div>

                  <div className="space-y-12">
                     <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                           <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Zap className="w-3 h-3 text-accent" /> Equipment
                           </p>
                           <p className="text-lg font-black">{selectedExercise.equipment}</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5">
                           <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Waves className="w-3 h-3 text-accent" /> Pattern
                           </p>
                           <p className="text-lg font-black">{selectedExercise.category}</p>
                        </div>
                     </div>

                     <div>
                       <h4 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 mb-8">
                         <Info className="w-5 h-5 text-accent" />
                         Execution Protocol
                       </h4>
                       <div className="space-y-4">
                          {selectedExercise.instructions.map((step, idx) => (
                            <div key={idx} className="flex gap-6 group">
                               <div className="flex flex-col items-center">
                                  <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-[10px] font-black shrink-0 group-hover:bg-accent group-hover:text-black transition-all">
                                    {idx + 1}
                                  </div>
                                  {idx < selectedExercise.instructions.length - 1 && (
                                    <div className="w-0.5 h-full bg-white/5 mt-2" />
                                  )}
                               </div>
                               <p className="text-gray-400 text-sm leading-relaxed pb-4 group-hover:text-white transition-colors">{step}</p>
                            </div>
                          ))}
                       </div>
                     </div>

                     <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-[32px] p-8 border border-accent/10">
                        <h4 className="text-accent font-black uppercase tracking-widest text-xs mb-4">Elite Coaching Tip</h4>
                        <p className="text-gray-300 text-sm italic leading-relaxed">
                          "Ensure a full range of motion. The maximum hypertrophic stimulus occurs during the deep eccentric stretch of the movement. Focus on a 3-second eccentric phase."
                        </p>
                     </div>

                     <Button className="w-full py-8 rounded-3xl uppercase font-black tracking-[0.2em] shadow-xl shadow-accent/20" onClick={() => setSelectedExercise(null)}>Dismiss Library</Button>
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

