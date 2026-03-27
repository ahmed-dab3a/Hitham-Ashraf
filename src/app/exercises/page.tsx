'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Info, ChevronRight, Dumbbell } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import exercisesData from '@/lib/exercises.json';

const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];

export default function ExercisesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const filteredExercises = useMemo(() => {
    return exercisesData.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) || 
                           ex.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ex.muscle === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4">EXERCISE <span className="text-accent italic">LIBRARY</span></h1>
          <p className="text-gray-400 max-w-2xl">Master every movement with our comprehensive library of exercises. Filter by muscle group or search for specific movements.</p>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search exercises (e.g. Bench Press)"
              className="w-full bg-card-bg border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent/50 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'bg-accent text-black scale-105 shadow-lg shadow-accent/20' 
                    : 'bg-card-bg text-gray-400 border border-white/5 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredExercises.map((ex) => (
              <motion.div
                key={ex.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col justify-between cursor-pointer group" >
                  <div onClick={() => setSelectedExercise(ex)}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-2xl bg-primary/20 text-accent">
                        <Dumbbell className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-gray-400">
                        {ex.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{ex.name}</h3>
                    <p className="text-accent text-sm font-bold mb-4 uppercase tracking-tighter">{ex.muscle}</p>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6">{ex.description}</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-between"
                    onClick={() => setSelectedExercise(ex)}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg italic">No exercises found matching your search.</p>
          </div>
        )}
      </div>

      {/* Exercise Detail Modal (Simple Implementation) */}
      <AnimatePresence>
        {selectedExercise && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExercise(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-card-bg border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto bg-primary/20 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="flex flex-col items-center gap-4 text-accent/50 p-12 text-center">
                    <Dumbbell className="w-24 h-24 animate-pulse" />
                    <p className="text-sm font-bold uppercase tracking-widest">Animation Loading...</p>
                    <p className="text-xs text-gray-500 max-w-[200px]">Simulated exercise animation for {selectedExercise.name}</p>
                  </div>
                  <div className="absolute top-6 left-6">
                     <span className="px-4 py-2 bg-accent text-black font-bold rounded-full text-xs uppercase">{selectedExercise.tag}</span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-display font-black mb-2">{selectedExercise.name}</h2>
                      <p className="text-accent font-bold uppercase tracking-widest text-sm">{selectedExercise.muscle} • {selectedExercise.category}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedExercise(null)}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-8">
                     <div>
                       <h4 className="text-white font-bold flex items-center gap-2 mb-3">
                         <Info className="w-4 h-4 text-accent" />
                         Description
                       </h4>
                       <p className="text-gray-400 leading-relaxed">{selectedExercise.description}</p>
                     </div>

                     <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                        <h4 className="text-white font-bold mb-4">Quick Tips</h4>
                        <ul className="space-y-3">
                          <li className="flex gap-3 text-sm text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            Focus on controlled movements and full range of motion.
                          </li>
                          <li className="flex gap-3 text-sm text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            Inhale during the eccentric phase, exhale during the concentric phase.
                          </li>
                        </ul>
                     </div>

                     <Button className="w-full" onClick={() => setSelectedExercise(null)}>Close Library</Button>
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

// Helper components missing imports
const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
