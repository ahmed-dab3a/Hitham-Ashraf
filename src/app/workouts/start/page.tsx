'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Timer, Flame, MessageSquare, Trophy, Dumbbell, Info, X, Play, Pause, RotateCcw, Save, AlertCircle } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';

interface Exercise {
  exerciseId: string;
  name: string;
  targetSets: number;
  targetReps: string;
}

interface WorkoutPlan {
  _id: string;
  name: string;
  exercises: Exercise[];
}

export default function StartWorkoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('id');
  const token = useAuthStore(state => state.token);

  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionData, setSessionData] = useState<{ name: string; sets: { weight: number; reps: number; completed: boolean }[]; notes: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Rest Timer State
  const [restTimer, setRestTimer] = useState(0);
  const [showRestTimer, setShowRestTimer] = useState(false);

  useEffect(() => {
    if (!planId) {
      router.push('/workouts');
      return;
    }

    const fetchPlan = async () => {
      try {
        const res = await fetch(`/api/workouts?type=plans`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const plans = await res.json();
        const selectedPlan = plans.find((p: any) => p._id === planId);
        
        if (selectedPlan) {
          setPlan(selectedPlan);
          setSessionData(selectedPlan.exercises.map((ex: Exercise) => ({
            name: ex.name,
            sets: Array.from({ length: ex.targetSets }, () => ({ weight: 0, reps: 0, completed: false })),
            notes: ''
          })));
        } else {
          router.push('/workouts');
        }
      } catch (err) {
        console.error('Failed to fetch plan', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [planId, token]);

  // Workout Timer
  useEffect(() => {
    let interval: any = null;
    if (!isPaused) {
      interval = setInterval(() => {
        setWorkoutTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  // Rest Timer
  useEffect(() => {
    let interval: any = null;
    if (showRestTimer && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(t => t - 1);
      }, 1000);
    } else if (restTimer === 0) {
      setShowRestTimer(false);
    }
    return () => clearInterval(interval);
  }, [showRestTimer, restTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addSet = () => {
    const updated = [...sessionData];
    updated[currentStep].sets.push({ weight: 0, reps: 0, completed: false });
    setSessionData(updated);
  };

  const updateSet = (setIdx: number, field: 'weight' | 'reps', value: number) => {
    const updated = [...sessionData];
    updated[currentStep].sets[setIdx][field] = value;
    setSessionData(updated);
  };

  const toggleSet = (setIdx: number) => {
    const updated = [...sessionData];
    const isNowCompleted = !updated[currentStep].sets[setIdx].completed;
    updated[currentStep].sets[setIdx].completed = isNowCompleted;
    setSessionData(updated);

    if (isNowCompleted) {
       setRestTimer(90); // Default 90s rest
       setShowRestTimer(true);
    }
  };

  const handleFinish = async () => {
    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          action: 'logSession',
          data: {
            name: plan?.name,
            date: new Date().toISOString(),
            duration: workoutTimer,
            exercises: sessionData.filter(ex => ex.sets.some(s => s.completed))
          }
        })
      });
      
      if (res.ok) {
        router.push('/workouts?tab=history');
      }
    } catch (err) {
      console.error('Failed to save session', err);
    }
  };

  if (loading || !plan) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
           <Dumbbell className="w-16 h-16 text-accent animate-spin mb-4 mx-auto" />
           <p className="text-sm font-black uppercase tracking-widest text-gray-500">Initializing Protocol...</p>
        </div>
      </div>
    );
  }

  const currentExercise = sessionData[currentStep];
  const totalVolume = sessionData.reduce((acc, ex) => 
    acc + ex.sets.reduce((sAcc, s) => sAcc + (s.completed ? s.weight * s.reps : 0), 0), 
  0);

  return (
    <div className="pt-24 pb-32 min-h-screen bg-black text-white">
      {/* HUD Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => router.back()}
                className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
              >
                 <X className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                 <h1 className="text-sm font-black uppercase tracking-widest italic leading-none">{plan.name}</h1>
                 <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Session Active</p>
              </div>
           </div>

           <div className="flex items-center gap-8">
              <div className="text-center hidden md:block">
                 <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Volume</p>
                 <p className="text-lg font-black text-accent">{totalVolume.toLocaleString()} <span className="text-[10px] italic">kg</span></p>
              </div>
              <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                 <Timer className={`w-4 h-4 ${isPaused ? 'text-gray-500' : 'text-accent animate-pulse'}`} />
                 <span className="text-xl font-mono font-black tabular-nums">{formatTime(workoutTimer)}</span>
                 <button onClick={() => setIsPaused(!isPaused)} className="ml-2 hover:text-accent transition-colors">
                    {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl mt-20">
        {/* Progress Bar */}
        <div className="mb-12">
           <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Movement Evolution</span>
              <span className="text-[10px] font-black text-accent">{currentStep + 1} / {plan.exercises.length}</span>
           </div>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / plan.exercises.length) * 100}%` }}
              />
           </div>
        </div>

        {/* Current Movement HUD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none">{currentExercise.name}</h2>
                <div className="flex gap-4 mt-4">
                   <span className="text-[10px] font-black text-accent uppercase tracking-widest border border-accent/20 px-3 py-1 rounded-full bg-accent/5">Primary Target</span>
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{plan.exercises[currentStep].targetSets} Target Sets</span>
                </div>
              </div>
              <Button variant="ghost" className="p-4 bg-white/5 rounded-3xl hover:bg-white/10 shrink-0">
                 <Info className="w-6 h-6 text-gray-400" />
              </Button>
            </div>

            {/* Set Precision Logging */}
            <div className="bg-card-bg border border-white/10 rounded-[48px] overflow-hidden shadow-2xl">
               <div className="grid grid-cols-5 p-8 border-b border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                  <div className="text-center">Set</div>
                  <div className="col-span-2 text-center">Load (kg)</div>
                  <div className="col-span-1 text-center">Reps</div>
                  <div className="text-center">Status</div>
               </div>
               
               <div className="divide-y divide-white/5 p-4">
                 {currentExercise.sets.map((set, idx) => (
                   <motion.div 
                    key={idx} 
                    className={`grid grid-cols-5 py-6 px-4 items-center transition-all duration-500 rounded-3xl group ${set.completed ? 'bg-accent/5' : 'hover:bg-white/[0.02]'}`}
                   >
                      <div className="text-center font-black text-sm text-gray-700 group-hover:text-gray-400">{idx + 1}</div>
                      <div className="col-span-2 flex justify-center px-4">
                        <input 
                          type="number" 
                          placeholder="0"
                          className="w-full bg-black/40 border border-white/10 rounded-[20px] p-4 text-center focus:outline-none focus:border-accent text-xl font-black transition-all shadow-inner"
                          value={set.weight || ''}
                          onChange={(e) => updateSet(idx, 'weight', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-1 flex justify-center px-2">
                        <input 
                          type="number" 
                          placeholder="0"
                          className="w-full bg-black/40 border border-white/10 rounded-[20px] p-4 text-center focus:outline-none focus:border-accent text-xl font-black transition-all shadow-inner"
                          value={set.reps || ''}
                          onChange={(e) => updateSet(idx, 'reps', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => toggleSet(idx)}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            set.completed 
                              ? 'bg-accent text-black scale-110 shadow-lg shadow-accent/20 rotate-[360deg]' 
                              : 'bg-white/5 border border-white/10 text-gray-700 hover:text-white hover:border-white/40'
                          }`}
                        >
                          {set.completed ? <Check className="w-8 h-8 stroke-[4]" /> : <Check className="w-6 h-6 stroke-[3]" />}
                        </button>
                      </div>
                   </motion.div>
                 ))}
               </div>
               
               <button 
                onClick={addSet}
                className="w-full py-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-accent hover:bg-white/5 transition-all border-t border-white/5"
               >
                 + Append Auxiliary Set
               </button>
            </div>

            {/* Neural Notes */}
            <div className="space-y-6">
              <h3 className="text-white font-black flex items-center gap-3 uppercase tracking-widest text-xs opacity-60">
                <MessageSquare className="w-5 h-5 text-accent" />
                Neurological Feedback
              </h3>
              <textarea 
                placeholder="Document movement quality, RPE, or focus cues..."
                className="w-full bg-card-bg border border-white/10 rounded-[32px] p-8 text-gray-300 focus:outline-none focus:border-accent min-h-[150px] transition-all text-sm leading-relaxed"
                value={currentExercise.notes}
                onChange={(e) => {
                  const updated = [...sessionData];
                  updated[currentStep].notes = e.target.value;
                  setSessionData(updated);
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Global Controls */}
        <div className="fixed bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black via-black/95 to-transparent z-40">
           <div className="container mx-auto max-w-3xl flex gap-6">
              <Button 
                variant="ghost" 
                className="h-20 w-24 rounded-[24px] bg-white/5 hover:bg-white/10 border border-white/10 group transition-all" 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                <ChevronLeft className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors" />
              </Button>
              
              {currentStep === plan.exercises.length - 1 ? (
                <Button className="flex-grow h-20 rounded-[28px] text-lg font-black uppercase tracking-widest bg-accent text-black shadow-2xl shadow-accent/20 group overflow-hidden relative" onClick={handleFinish}>
                   <span className="relative z-10 flex items-center justify-center gap-3">
                      Complete Session <Trophy className="w-6 h-6 group-hover:scale-125 transition-transform" />
                   </span>
                </Button>
              ) : (
                <Button className="flex-grow h-20 rounded-[28px] text-lg font-black uppercase tracking-widest group shadow-2xl shadow-white/5" onClick={() => setCurrentStep(prev => prev + 1)}>
                   <span className="flex items-center justify-center gap-3">
                      Advance Protocol <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                   </span>
                </Button>
              )}
           </div>
        </div>
      </div>

      {/* Rest Timer Overlay */}
      <AnimatePresence>
        {showRestTimer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[60] bg-accent text-black px-12 py-6 rounded-[32px] shadow-2xl flex items-center gap-8 border border-black/10"
          >
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Rest interval</span>
                <span className="text-4xl font-mono font-black tabular-nums">{restTimer}</span>
             </div>
             <div className="h-10 w-px bg-black/10" />
             <div className="flex gap-4">
                <button onClick={() => setRestTimer(t => t + 30)} className="p-3 bg-black/5 hover:bg-black/10 rounded-2xl transition-all">
                   <div className="text-xs font-black">+30s</div>
                </button>
                <button onClick={() => setShowRestTimer(false)} className="p-3 bg-black/80 text-white rounded-2xl hover:bg-black transition-all">
                   <RotateCcw className="w-5 h-5" />
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

