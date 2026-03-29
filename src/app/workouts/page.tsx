'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical, Save, Dumbbell, History, Play, Search, CheckCircle2, ChevronRight, Activity, Calendar, Zap } from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface Exercise {
  id: string;
  name: string;
  muscle: string;
}

interface WorkoutPlan {
  _id?: string;
  name: string;
  category: string;
  description: string;
  exercises: {
    exerciseId: string;
    name: string;
    targetSets: number;
    targetReps: string;
  }[];
}

interface WorkoutSession {
  _id?: string;
  date: string;
  name: string;
  totalVolume: number;
  exercises: {
    name: string;
    sets: { reps: number; weight: number }[];
  }[];
}

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState<'plans' | 'history'>('plans');
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [newPlan, setNewPlan] = useState<WorkoutPlan>({
    name: '',
    category: 'Push',
    description: '',
    exercises: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/workouts?type=${activeTab}`);
      const data = await res.json();
      if (activeTab === 'plans') setPlans(data);
      else setHistory(data);
    } catch (err) {
      console.error('Failed to fetch workouts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 1) {
        const res = await fetch(`/api/exercises?search=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSavePlan = async () => {
    if (!newPlan.name || newPlan.exercises.length === 0) return;
    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'savePlan', data: newPlan })
      });
      if (res.ok) {
        setIsCreatingPlan(false);
        setNewPlan({ name: '', category: 'Push', description: '', exercises: [] });
        fetchData();
      }
    } catch (err) {
      console.error('Failed to save plan', err);
    }
  };

  const addExerciseToPlan = (ex: Exercise) => {
    if (newPlan.exercises.find(e => e.exerciseId === ex.id)) return;
    setNewPlan({
      ...newPlan,
      exercises: [...newPlan.exercises, { exerciseId: ex.id, name: ex.name, targetSets: 3, targetReps: '8-12' }]
    });
    setSearchQuery('');
  };

  const removeExerciseFromPlan = (id: string) => {
    setNewPlan({
      ...newPlan,
      exercises: newPlan.exercises.filter(e => e.exerciseId !== id)
    });
  };

  const deletePlan = async (id: string) => {
    try {
      const res = await fetch(`/api/workouts?id=${id}&type=plan`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Failed to delete plan', err);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black mb-4 uppercase italic">Programming <span className="text-accent not-italic">Suite</span></h1>
            <p className="text-gray-400 max-w-2xl">Architect your physical evolution. Build structured programs or analyze past performance with modular precision.</p>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 rounded-[20px] p-1.5 shrink-0">
             <button 
              onClick={() => setActiveTab('plans')}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all ${
                activeTab === 'plans' ? 'bg-accent text-black shadow-lg shadow-accent/20' : 'text-gray-500 hover:text-white'
              }`}
             >
                <Dumbbell className="w-4 h-4" /> My Programs
             </button>
             <button 
              onClick={() => setActiveTab('history')}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all ${
                activeTab === 'history' ? 'bg-accent text-black shadow-lg shadow-accent/20' : 'text-gray-500 hover:text-white'
              }`}
             >
                <History className="w-4 h-4" /> Analytics
             </button>
          </div>
        </header>

        {activeTab === 'plans' ? (
          <div className="space-y-12">
            {!isCreatingPlan && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Button onClick={() => setIsCreatingPlan(true)} className="w-full md:w-auto py-7 px-10 rounded-[24px] uppercase font-black tracking-widest group shadow-xl shadow-accent/10">
                    <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform" /> Create New Protocol
                </Button>
              </motion.div>
            )}

            <AnimatePresence>
              {isCreatingPlan && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card-bg border border-accent/30 rounded-[48px] p-10 overflow-hidden shadow-2xl relative"
                >
                  <div className="mb-12 flex flex-col xl:flex-row justify-between items-center gap-8">
                    <div className="flex-grow w-full">
                      <input 
                        type="text" 
                        placeholder="Protocol Name (e.g. Hypertrophy A)"
                        className="bg-black/40 border border-white/10 text-3xl font-black p-6 rounded-3xl w-full focus:outline-none focus:border-accent transition-all uppercase italic"
                        value={newPlan.name}
                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-4 shrink-0 w-full xl:w-auto">
                      <Button variant="ghost" className="flex-1 xl:flex-none py-6 px-10 rounded-2xl font-black uppercase tracking-widest" onClick={() => setIsCreatingPlan(false)}>Cancel</Button>
                      <Button className="flex-1 xl:flex-none py-6 px-10 rounded-2xl font-black uppercase tracking-widest" onClick={handleSavePlan} disabled={!newPlan.name || newPlan.exercises.length === 0}>
                        <Save className="w-5 h-5 mr-3" /> Initialize Protocol
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Selected Exercises */}
                    <div>
                      <h3 className="text-white font-black mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-xs opacity-60">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        Selected Components ({newPlan.exercises.length})
                      </h3>
                      <div className="space-y-4">
                        {newPlan.exercises.map((ex) => (
                          <motion.div 
                            layoutId={ex.exerciseId}
                            key={ex.exerciseId} 
                            className="flex items-center justify-between p-6 bg-white/[0.03] rounded-[32px] border border-white/10 group hover:border-accent/40 transition-all shadow-inner"
                          >
                            <div className="flex items-center gap-5">
                              <div className="p-3 bg-white/5 rounded-2xl text-gray-600 group-hover:text-accent transition-colors">
                                <GripVertical className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="font-black text-lg group-hover:text-accent transition-colors">{ex.name}</p>
                                <div className="flex gap-4 mt-1">
                                   <input 
                                    type="number" 
                                    className="bg-transparent text-[10px] font-black uppercase text-accent w-8 focus:outline-none"
                                    value={ex.targetSets}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value);
                                      const updated = [...newPlan.exercises];
                                      const idx = updated.findIndex(u => u.exerciseId === ex.exerciseId);
                                      updated[idx].targetSets = val;
                                      setNewPlan({ ...newPlan, exercises: updated });
                                    }}
                                   />
                                   <span className="text-[10px] font-black uppercase text-gray-700">Sets</span>
                                   <input 
                                    type="text" 
                                    className="bg-transparent text-[10px] font-black uppercase text-accent w-12 focus:outline-none"
                                    value={ex.targetReps}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      const updated = [...newPlan.exercises];
                                      const idx = updated.findIndex(u => u.exerciseId === ex.exerciseId);
                                      updated[idx].targetReps = val;
                                      setNewPlan({ ...newPlan, exercises: updated });
                                    }}
                                   />
                                   <span className="text-[10px] font-black uppercase text-gray-700">Reps</span>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeExerciseFromPlan(ex.exerciseId)}
                              className="p-3 text-gray-700 hover:text-red-500 transition-colors bg-white/5 rounded-2xl"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </motion.div>
                        ))}
                        {newPlan.exercises.length === 0 && (
                          <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[40px] opacity-20">
                            <Activity className="w-12 h-12 mx-auto mb-4" />
                            <p className="text-sm font-black uppercase tracking-widest italic">No components initialized</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Exercise Picker */}
                    <div>
                       <h3 className="text-white font-black mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-xs opacity-60">
                        <Search className="w-5 h-5 text-accent" />
                        Component Library
                      </h3>
                      <div className="relative mb-6">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
                        <input 
                          type="text"
                          placeholder="Search movements..."
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-white focus:outline-none focus:border-accent/40"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-4 no-scrollbar">
                        {searchResults.map((ex) => {
                           const isSelected = newPlan.exercises.some(e => e.exerciseId === ex.id);
                           return (
                             <button
                              key={ex.id}
                              onClick={() => addExerciseToPlan(ex)}
                              disabled={isSelected}
                              className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                                isSelected
                                  ? 'bg-accent/10 border-accent/20 opacity-50'
                                  : 'bg-black/40 border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/[0.02]'
                              }`}
                            >
                              <div className="text-left">
                                <span className={`font-black ${isSelected ? 'text-accent' : 'text-gray-200'}`}>{ex.name}</span>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-0.5">{ex.muscle}</p>
                              </div>
                              <div className={`p-2 rounded-xl transition-all ${isSelected ? 'bg-accent text-black rotate-45' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                 <Plus className="w-4 h-4" />
                              </div>
                            </button>
                           );
                        })}
                        {searchQuery && searchResults.length === 0 && (
                           <p className="text-center py-10 text-gray-700 font-bold uppercase text-[10px] tracking-widest italic">No matching components</p>
                        )}
                        {!searchQuery && (
                          <div className="text-center py-20 opacity-10">
                             <Dumbbell className="w-12 h-12 mx-auto mb-4" />
                             <p className="text-xs font-black uppercase tracking-widest">Query movements lib</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card key={plan._id} className="group border-white/5 hover:border-accent/30 transition-all duration-500 rounded-[40px] p-10 flex flex-col min-h-[450px]">
                  <div className="mb-4">
                     <span className="px-5 py-1.5 bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                        {plan.category || 'Push'}
                     </span>
                  </div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-display font-black group-hover:text-accent transition-colors leading-tight uppercase italic">{plan.name}</h3>
                    <div className="p-4 bg-white/5 rounded-3xl text-gray-600 group-hover:bg-accent group-hover:text-black transition-all">
                      <Zap className="w-6 h-6" fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-10 flex-grow">
                    {plan.exercises.map((ex, idx) => (
                      <div key={idx} className="flex items-center gap-4 group/item">
                         <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-30 group-item/item:opacity-100 transition-opacity" />
                         <div>
                            <p className="font-bold text-gray-300 text-sm">{ex.name}</p>
                            <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest">{ex.targetSets} sets • {ex.targetReps} reps</p>
                         </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Link href={`/workouts/start?id=${plan._id}`} className="flex-grow">
                      <Button className="w-full py-6 rounded-2xl uppercase font-black tracking-widest group/btn shadow-xl shadow-accent/5">
                        Initialize Session <Play className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition-transform" fill="currentColor" />
                      </Button>
                    </Link>
                    <Button variant="ghost" className="shrink-0 p-4 bg-white/5 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20" onClick={() => deletePlan(plan._id!)}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))}
              
              {!loading && plans.length === 0 && !isCreatingPlan && (
                <div className="md:col-span-2 lg:col-span-3 py-32 text-center opacity-20">
                   <Dumbbell className="w-20 h-20 mx-auto mb-6" />
                   <h3 className="text-2xl font-black uppercase italic tracking-widest mb-2">No Active Protocols</h3>
                   <p className="text-sm font-bold uppercase tracking-widest">Create your first training program to begin tracking</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {history.map((session) => (
                 <Card key={session._id} className="border-white/5 bg-gradient-to-br from-card-bg to-black p-8 rounded-[32px] group">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1 flex items-center gap-2">
                             <Calendar className="w-3 h-3" /> {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                          <h3 className="text-2xl font-black uppercase italic group-hover:text-accent transition-colors">{session.name}</h3>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Volume</p>
                          <p className="text-xl font-black">{session.totalVolume.toLocaleString()} <span className="text-[10px] text-gray-500 uppercase">kg</span></p>
                       </div>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                       {session.exercises.slice(0, 3).map((ex, i) => (
                         <div key={i} className="flex justify-between items-center text-xs text-gray-400">
                            <span className="font-bold truncate max-w-[150px]">{ex.name}</span>
                            <span className="font-black text-gray-600">{ex.sets.length} SETS</span>
                         </div>
                       ))}
                       {session.exercises.length > 3 && (
                         <p className="text-[10px] font-black text-accent uppercase tracking-widest pt-2">+{session.exercises.length - 3} more movements</p>
                       )}
                    </div>
                    
                    <Button variant="outline" className="w-full rounded-2xl border-white/10 group-hover:border-accent group-hover:text-accent py-5">
                       Full Breakdown <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                 </Card>
               ))}
            </div>

            {!loading && history.length === 0 && (
              <div className="text-center py-40 opacity-20">
                 <History className="w-16 h-16 text-gray-500 mx-auto mb-6" />
                 <h3 className="text-2xl font-black uppercase italic tracking-widest mb-2">Null Activity History</h3>
                 <p className="text-sm font-bold uppercase tracking-widest">Complete sessions to see performance analytics</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
