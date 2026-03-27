'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Timer, Flame, MessageSquare, Trophy, Dumbbell, Info } from 'lucide-react';
import { Button } from '@/components/ui';
import exercisesData from '@/lib/exercises.json';

export default function StartWorkoutPage() {
  const router = useRouter();
  
  // Mock plan fetching
  const plan = {
    id: '1',
    name: 'Push Day',
    exercises: ['bench-press', 'overhead-press', 'tricep-dips']
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [sessionData, setSessionData] = useState<{ id: string; sets: { weight: string; reps: string; completed: boolean }[]; notes: string }[]>(
    plan.exercises.map(id => ({
      id,
      sets: [{ weight: '', reps: '', completed: false }],
      notes: ''
    }))
  );

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const currentExercise = exercisesData.find(e => e.id === plan.exercises[currentStep]);

  const addSet = () => {
    const updated = [...sessionData];
    updated[currentStep].sets.push({ weight: '', reps: '', completed: false });
    setSessionData(updated);
  };

  const updateSet = (setIdx: number, field: 'weight' | 'reps', value: string) => {
    const updated = [...sessionData];
    updated[currentStep].sets[setIdx][field] = value;
    setSessionData(updated);
  };

  const toggleSet = (setIdx: number) => {
    const updated = [...sessionData];
    updated[currentStep].sets[setIdx].completed = !updated[currentStep].sets[setIdx].completed;
    setSessionData(updated);
  };

  const handleFinish = () => {
    // Logic to save to MongoDB would go here
    setIsActive(false);
    console.log('Workout finished', sessionData);
    alert('Workout Finished! Stats saved.');
    router.push('/dashboard');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Workout Header */}
        <header className="mb-12 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
             <div className="px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent font-black tracking-widest text-lg flex items-center gap-2">
                <Timer className="w-5 h-5" />
                {formatTime(timer)}
             </div>
             <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white font-bold flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                {Math.round(timer * 0.15)} KCAL
             </div>
          </div>
          <h1 className="text-3xl font-display font-black uppercase text-center">{plan.name}</h1>
          <p className="text-gray-500 mt-2">Exercise {currentStep + 1} of {plan.exercises.length}</p>
        </header>

        {/* Current Exercise Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentExercise?.name}</h2>
                  <p className="text-accent text-sm font-bold uppercase tracking-widest">{currentExercise?.muscle}</p>
                </div>
              </div>
              <Button variant="ghost" className="p-2">
                 <Info className="w-6 h-6" />
              </Button>
            </div>

            {/* Set Table */}
            <div className="bg-card-bg border border-white/10 rounded-[32px] overflow-hidden">
               <div className="grid grid-cols-4 p-6 border-b border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-500">
                  <div className="flex justify-center">Set</div>
                  <div className="flex justify-center">Weight (kg)</div>
                  <div className="flex justify-center">Reps</div>
                  <div className="flex justify-center">Done</div>
               </div>
               
               <div className="divide-y divide-white/5">
                 {sessionData[currentStep].sets.map((set, idx: number) => (
                   <div key={idx} className={`grid grid-cols-4 p-4 items-center transition-colors ${set.completed ? 'bg-accent/5' : ''}`}>
                      <div className="flex justify-center font-bold text-gray-400">{idx + 1}</div>
                      <div className="flex justify-center">
                        <input 
                          type="number" 
                          placeholder="0"
                          className="w-20 bg-black/40 border border-white/10 rounded-xl p-3 text-center focus:outline-none focus:border-accent text-lg"
                          value={set.weight}
                          onChange={(e) => updateSet(idx, 'weight', e.target.value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <input 
                          type="number" 
                          placeholder="0"
                          className="w-20 bg-black/40 border border-white/10 rounded-xl p-3 text-center focus:outline-none focus:border-accent text-lg"
                          value={set.reps}
                          onChange={(e) => updateSet(idx, 'reps', e.target.value)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => toggleSet(idx)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            set.completed ? 'bg-accent text-black scale-110' : 'bg-white/5 border border-white/10'
                          }`}
                        >
                          {set.completed && <Check className="w-6 h-6 stroke-[3]" />}
                        </button>
                      </div>
                   </div>
                 ))}
               </div>
               
               <button 
                onClick={addSet}
                className="w-full py-4 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-accent hover:bg-white/5 transition-all"
               >
                 + Add Extra Set
               </button>
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
              <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-widest text-sm">
                <MessageSquare className="w-4 h-4 text-accent" />
                Session Notes
              </h3>
              <textarea 
                placeholder="How did this exercise feel? (e.g. Felt stronger today, Increase weight next session)"
                className="w-full bg-card-bg border border-white/10 rounded-2xl p-6 text-gray-300 focus:outline-none focus:border-accent min-h-[100px]"
                value={sessionData[currentStep].notes}
                onChange={(e) => {
                  const updated = [...sessionData];
                  updated[currentStep].notes = e.target.value;
                  setSessionData(updated);
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex-grow h-16 text-lg" 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
          >
            <ChevronLeft className="mr-2 w-6 h-6" /> Previous Exercise
          </Button>
          
          {currentStep === plan.exercises.length - 1 ? (
            <Button className="w-full sm:w-auto flex-grow h-16 text-lg bg-green-500 hover:bg-green-600 text-black shadow-lg shadow-green-500/20" onClick={handleFinish}>
               Finish Workout <Trophy className="ml-2 w-6 h-6" />
            </Button>
          ) : (
            <Button className="w-full sm:w-auto flex-grow h-16 text-lg" onClick={() => setCurrentStep(prev => prev + 1)}>
               Next Exercise <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

