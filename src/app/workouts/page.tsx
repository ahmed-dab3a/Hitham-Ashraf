'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical, Save, Dumbbell, History, Play } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import exercisesData from '@/lib/exercises.json';

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState<'plans' | 'history'>('plans');
  const [plans, setPlans] = useState([
    { id: '1', name: 'Push Day', exercises: ['bench-press', 'overhead-press', 'tricep-dips'] },
    { id: '2', name: 'Pull Day', exercises: ['pull-ups', 'lat-pulldowns', 'bicep-curls'] },
    { id: '3', name: 'Leg Day', exercises: ['squats', 'lunges'] }
  ]);

  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const handleCreatePlan = () => {
    if (!newPlanName) return;
    const newPlan = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPlanName,
      exercises: selectedExercises
    };
    setPlans([...plans, newPlan]);
    setIsCreatingPlan(false);
    setNewPlanName('');
    setSelectedExercises([]);
  };

  const toggleExerciseSelection = (id: string) => {
    setSelectedExercises(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black mb-4">WORKOUT <span className="text-accent italic">BUILDER</span></h1>
            <p className="text-gray-400 max-w-2xl">Plan your gains. Create custom workout routines and track your progress through every set.</p>
          </div>
          
          <div className="flex bg-card-bg border border-white/10 rounded-2xl p-1 shrink-0">
             <button 
              onClick={() => setActiveTab('plans')}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'plans' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white'
              }`}
             >
                <Dumbbell className="w-4 h-4" /> My Plans
             </button>
             <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'history' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white'
              }`}
             >
                <History className="w-4 h-4" /> History
             </button>
          </div>
        </header>

        {activeTab === 'plans' ? (
          <div className="space-y-12">
            {/* Quick Actions */}
            {!isCreatingPlan && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Button onClick={() => setIsCreatingPlan(true)} className="w-full md:w-auto">
                    <Plus className="w-5 h-5 mr-2" /> Create New Plan
                </Button>
              </motion.div>
            )}

            {/* Plan Builder UI */}
            <AnimatePresence>
              {isCreatingPlan && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-card-bg border border-accent/20 rounded-[32px] p-8 overflow-hidden"
                >
                  <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <input 
                      type="text" 
                      placeholder="Routine Name (e.g. Upper Body Beast)"
                      className="bg-black/50 border border-white/10 text-2xl font-bold p-4 rounded-2xl w-full focus:outline-none focus:border-accent"
                      value={newPlanName}
                      onChange={(e) => setNewPlanName(e.target.value)}
                    />
                    <div className="flex gap-4 shrink-0">
                      <Button variant="ghost" onClick={() => setIsCreatingPlan(false)}>Cancel</Button>
                      <Button onClick={handleCreatePlan} disabled={!newPlanName || selectedExercises.length === 0}>
                        <Save className="w-5 h-5 mr-2" /> Save Plan
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Selected Exercises */}
                    <div>
                      <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        Selected Movements ({selectedExercises.length})
                      </h3>
                      <div className="space-y-3">
                        {selectedExercises.map((id) => {
                          const ex = exercisesData.find(e => e.id === id);
                          return (
                            <motion.div 
                              layoutId={id}
                              key={id} 
                              className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5"
                            >
                              <div className="flex items-center gap-3">
                                <GripVertical className="text-gray-600 w-4 h-4 cursor-grab" />
                                <div>
                                  <p className="font-bold">{ex?.name}</p>
                                  <p className="text-xs text-accent uppercase font-bold">{ex?.muscle}</p>
                                </div>
                              </div>
                              <button 
                                onClick={() => toggleExerciseSelection(id)}
                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </motion.div>
                          );
                        })}
                        {selectedExercises.length === 0 && (
                          <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                            <p className="text-gray-500 italic">Select exercises from the right to add them to your plan.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Exercise Picker */}
                    <div className="max-h-[500px] overflow-y-auto pr-4 no-scrollbar">
                       <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
                        <Dumbbell className="w-4 h-4 text-accent" />
                        Movements Library
                      </h3>
                      <div className="space-y-2">
                        {exercisesData.map((ex) => (
                           <button
                            key={ex.id}
                            onClick={() => toggleExerciseSelection(ex.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                              selectedExercises.includes(ex.id)
                                ? 'bg-accent/10 border-accent text-accent'
                                : 'bg-black/40 border-white/5 text-gray-400 hover:border-white/20'
                            }`}
                          >
                            <span className="font-bold">{ex.name}</span>
                            <div className={`p-1 rounded-md ${selectedExercises.includes(ex.id) ? 'bg-accent text-black' : 'bg-white/5'}`}>
                               <Plus className={`w-4 h-4 ${selectedExercises.includes(ex.id) ? 'rotate-45' : ''} transition-transform`} />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Existing Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card key={plan.id} className="group">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-display font-black group-hover:text-accent transition-colors">{plan.name}</h3>
                    <div className="p-3 bg-primary/20 rounded-2xl text-accent">
                      <Play className="w-6 h-6" fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.exercises.map((exId, idx) => {
                       const ex = exercisesData.find(e => e.id === exId);
                       return (
                         <div key={idx} className="flex items-center gap-3 text-sm text-gray-400">
                            <div className="w-1 h-1 rounded-full bg-accent" />
                            {ex?.name}
                         </div>
                       );
                    })}
                  </div>

                  <div className="flex gap-4">
                    <Link href={`/workouts/start?id=${plan.id}`} className="flex-grow">
                      <Button className="w-full">Start Workout</Button>
                    </Link>
                    <Button variant="ghost" className="shrink-0 p-3">
                      <Trash2 className="w-5 h-5 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
             <History className="w-16 h-16 text-gray-800 mx-auto mb-6" />
             <h3 className="text-2xl font-bold mb-2">No Workout History Yet</h3>
             <p className="text-gray-500">Finish your first workout to see your progress here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Missing icons
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
