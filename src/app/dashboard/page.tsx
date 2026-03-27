'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Dumbbell, 
  Flame, 
  Timer, 
  Calendar, 
  ChevronRight, 
  TrendingUp, 
  Star,
  Zap,
  CreditCard,
  AlertCircle,
  Activity
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardPage() {
  const { user } = useAuthStore();
  
  // Mock data for dashboard
  const stats = [
    { label: 'Workout Streak', value: '5 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Kcal Burnt', value: '1,240', icon: Zap, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Weight Progress', value: '-2.4 kg', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Elite Level', value: 'Rank #12', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  const todayWorkout = {
    name: 'Push Day',
    muscle: 'Chest, Shoulders, Triceps',
    exercises: 5,
    duration: '45 mins'
  };

  const nutritionSummary = {
    current: 1200,
    goal: 2500,
    protein: 140,
    pGoal: 200
  };

  const subscriptionStatus = user?.subscription?.status || 'trial';
  const trialDaysLeft = 3;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-black mb-4 uppercase">
              WELCOME BACK, <span className="text-accent italic">{user?.name || 'TRAINEE'}</span>
            </h1>
            <p className="text-gray-400">Here&apos;s your progress for today. Let&apos;s hit those goals!</p>
          </motion.div>

          {subscriptionStatus === 'trial' && (
            <Link href="/subscription">
               <motion.div 
                 whileHover={{ scale: 1.05 }}
                 className="flex items-center gap-4 bg-accent/20 border border-accent/20 p-4 rounded-3xl"
               >
                  <div className="p-3 bg-accent text-black rounded-2xl">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-widest leading-none mb-1">Trial Ending Soon</p>
                    <p className="text-xs text-accent font-black uppercase">Only {trialDaysLeft} days left</p>
                  </div>
               </motion.div>
            </Link>
          )}
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {stats.map((stat, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
             >
               <Card className="flex flex-col items-center text-center p-8">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} mb-4`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <p className="text-2xl font-black mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
               </Card>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Workout */}
          <Card className="lg:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl -mr-20 -mt-20 group-hover:bg-accent/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-display font-black uppercase mb-2">Today&apos;s Session</h3>
                <p className="text-accent font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                   <Calendar className="w-4 h-4" />
                   FRIDAY, MARCH 27
                </p>
              </div>
              <Link href="/workouts">
                 <Button variant="outline" size="sm">Change Routine</Button>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 p-8 rounded-[32px] border border-white/5">
               <div className="relative">
                 <div className="w-32 h-32 rounded-full border-[6px] border-accent/20 flex items-center justify-center">
                    <Dumbbell className="w-12 h-12 text-accent" />
                 </div>
               </div>
               
               <div className="flex-grow space-y-2">
                 <h4 className="text-3xl font-black">{todayWorkout.name}</h4>
                 <p className="text-gray-400 font-medium">{todayWorkout.muscle}</p>
                 <div className="flex gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest">
                       <Activity className="w-4 h-4 text-accent" />
                       {todayWorkout.exercises} Exercises
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest">
                       <Timer className="w-4 h-4 text-accent" />
                       {todayWorkout.duration}
                    </div>
                 </div>
               </div>

               <Link href="/workouts/start?id=1" className="w-full md:w-auto">
                 <Button size="lg" className="w-full">Start Now</Button>
               </Link>
            </div>
          </Card>

          {/* Nutrition Summary */}
          <Card className="bg-primary/10 border-primary/20 flex flex-col justify-between">
            <div>
               <h3 className="text-2xl font-display font-black uppercase mb-6">Daily Fuel</h3>
               <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Calories</p>
                      <p className="text-3xl font-black">{nutritionSummary.current} / {nutritionSummary.goal}</p>
                    </div>
                    <Flame className="w-8 h-8 text-orange-500 mb-1" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                       <span>Protein Progress</span>
                       <span>{nutritionSummary.protein}g / {nutritionSummary.pGoal}g</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-accent" style={{ width: `${(nutritionSummary.protein / nutritionSummary.pGoal) * 100}%` }} />
                    </div>
                  </div>
               </div>
            </div>

            <Link href="/nutrition" className="mt-8">
              <Button variant="outline" className="w-full group">
                Log Meals
                <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* Subscription Quick Link (Simplified) */}
        <div className="mt-12">
           <Card className="bg-gradient-to-r from-accent/20 to-transparent border-accent/30 py-10 px-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-accent text-black rounded-[28px] shadow-2xl shadow-accent/20">
                   <CreditCard className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-2xl font-black uppercase leading-tight">Elite Membership</h3>
                   <p className="text-gray-400 max-w-sm">Unlock unlimited workout plans and detailed macronutrient tracking for only 50 EGP/month.</p>
                </div>
              </div>
              <Link href="/subscription" className="w-full md:w-auto">
                <Button size="lg" className="w-full px-12">Upgrade Now</Button>
              </Link>
           </Card>
        </div>
      </div>
    </div>
  );
}
