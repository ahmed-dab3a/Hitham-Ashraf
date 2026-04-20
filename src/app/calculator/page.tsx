'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, Target, User, Ruler, Weight } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { calculateMacros, CalorieInput, MacroResult } from '@/lib/calculator';

export default function CalculatorPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<CalorieInput>({
    gender: 'male',
    age: 25,
    weight: 75,
    height: 175,
    activity: 'moderate',
    goal: 'cut'
  });
  
  const [result, setResult] = useState<MacroResult | null>(null);

  const handleCalculate = () => {
    const res = calculateMacros(form);
    setResult(res);
    setStep(2);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black text-white selection:bg-accent/30 selection:text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4 uppercase tracking-tighter">
            MACRO <span className="text-accent italic">CALCULATOR</span>
          </h1>
          <p className="text-gray-400">احسب سعراتك بدقة وحدد أهدافك عشان توصل للفورمة المثالية</p>
        </header>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 md:p-10 !rounded-[48px]">
                <div className="space-y-8">
                  
                  {/* Gender */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                       <User className="w-4 h-4 text-accent" /> الجندر
                    </label>
                    <div className="flex gap-4">
                      <SelectionBox 
                         active={form.gender === 'male'} 
                         onClick={() => setForm({...form, gender: 'male'})}
                      >ذكر</SelectionBox>
                      <SelectionBox 
                         active={form.gender === 'female'} 
                         onClick={() => setForm({...form, gender: 'female'})}
                      >أنثى</SelectionBox>
                    </div>
                  </div>

                  {/* Vitals: Age, Weight, Height */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                       <label className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">العمر</label>
                       <input 
                         type="number" value={form.age} onChange={(e) => setForm({...form, age: Number(e.target.value)})}
                         className="w-full bg-black border border-white/10 rounded-2xl p-4 text-xl font-bold focus:border-accent focus:outline-none text-center"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-2"><Weight className="w-4 h-4 text-accent" /> الوزن (KG)</label>
                       <input 
                         type="number" value={form.weight} onChange={(e) => setForm({...form, weight: Number(e.target.value)})}
                         className="w-full bg-black border border-white/10 rounded-2xl p-4 text-xl font-bold focus:border-accent focus:outline-none text-center"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-2"><Ruler className="w-4 h-4 text-accent" /> الطول (CM)</label>
                       <input 
                         type="number" value={form.height} onChange={(e) => setForm({...form, height: Number(e.target.value)})}
                         className="w-full bg-black border border-white/10 rounded-2xl p-4 text-xl font-bold focus:border-accent focus:outline-none text-center"
                       />
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                       <Activity className="w-4 h-4 text-accent" /> معدل النشاط (التمارين)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <SelectionBox active={form.activity === 'sedentary'} onClick={() => setForm({...form, activity: 'sedentary'})} textSm>بدون تمرين</SelectionBox>
                      <SelectionBox active={form.activity === 'light'} onClick={() => setForm({...form, activity: 'light'})} textSm>1-3 أيام</SelectionBox>
                      <SelectionBox active={form.activity === 'moderate'} onClick={() => setForm({...form, activity: 'moderate'})} textSm>3-5 أيام</SelectionBox>
                      <SelectionBox active={form.activity === 'active'} onClick={() => setForm({...form, activity: 'active'})} textSm>6-7 أيام</SelectionBox>
                      <SelectionBox active={form.activity === 'extra'} onClick={() => setForm({...form, activity: 'extra'})} textSm>مجهود عنيف/مزدوج</SelectionBox>
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                       <Target className="w-4 h-4 text-accent" /> الهدف
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <SelectionBox active={form.goal === 'cut'} onClick={() => setForm({...form, goal: 'cut'})} textSm>تنشيف (خسارة دهون)</SelectionBox>
                      <SelectionBox active={form.goal === 'maintain'} onClick={() => setForm({...form, goal: 'maintain'})} textSm>ثبات الوزن</SelectionBox>
                      <SelectionBox active={form.goal === 'bulk'} onClick={() => setForm({...form, goal: 'bulk'})} textSm>ضخامة عضلية</SelectionBox>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <Button size="lg" className="w-full group" onClick={handleCalculate}>
                      احسب السعرات
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-md mx-auto"
            >
              {result && (
                 <div className="bg-[#111111] rounded-[48px] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/5">
                    
                    {/* Dark/Orange glow background */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
                    
                    <button 
                       onClick={() => setStep(1)}
                       className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                       إعادة حساب
                    </button>

                    {/* Circular UI */}
                    <div className="relative w-64 h-64 mx-auto mb-12 mt-8">
                       <svg className="w-full h-full transform -rotate-90">
                         {/* Background circle */}
                         <circle 
                            cx="128" cy="128" r="110"
                            fill="transparent"
                            stroke="#222"
                            strokeWidth="20"
                         />
                         {/* Foreground circle (assuming 100% since it's the target) */}
                         <circle 
                            cx="128" cy="128" r="110"
                            fill="transparent"
                            stroke="#FF6B00"
                            strokeWidth="20"
                            strokeDasharray={`${2 * Math.PI * 110}`}
                            strokeDashoffset={0}
                            className="drop-shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                         />
                       </svg>
                       {/* Text inside circle */}
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span 
                             initial={{ scale: 0.5, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             transition={{ delay: 0.2 }}
                             className="text-5xl font-black text-white"
                          >
                            {result.calories}
                          </motion.span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mt-1">
                            Daily Target Kcal
                          </span>
                       </div>
                    </div>

                    {/* Macro Bars */}
                    <div className="space-y-8 relative z-10">
                       <MacroBarRow 
                          label="Protein" 
                          value={result.protein} 
                          color="bg-[#FF6B00]" 
                          suffix="G"
                       />
                       <MacroBarRow 
                          label="Carbohydrates" 
                          value={result.carbs} 
                          color="bg-[#444444]" 
                          suffix="G"
                       />
                       <MacroBarRow 
                          label="Healthy Fats" 
                          value={result.fats} 
                          color="bg-[#222222]" 
                          suffix="G"
                          textColor="text-gray-400"
                       />
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                       <p className="text-gray-400 text-sm">هذه الأرقام هي الهدف اليومي لك. يمكنك تتبع وجباتك من صفحة التغذية للوصول إليها.</p>
                       <Button variant="outline" className="mt-6 w-full" onClick={() => window.location.href = '/nutrition'}>الذهاب للتغذية</Button>
                    </div>
                 </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper Components
function SelectionBox({ active, onClick, children, textSm }: { active: boolean, onClick: () => void, children: React.ReactNode, textSm?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 px-4 rounded-2xl font-bold transition-all ${
        active 
          ? 'bg-accent text-black shadow-lg scale-[1.02]' 
          : 'bg-black border border-white/10 text-gray-400 hover:border-white/30'
      } ${textSm ? 'text-xs md:text-sm' : 'text-base'}`}
    >
      {children}
    </button>
  );
}

function MacroBarRow({ label, value, color, suffix, textColor = "text-white" }: { label: string, value: number, color: string, suffix: string, textColor?: string }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2 font-black uppercase tracking-widest text-[11px]">
        <span className="text-gray-500">{value}{suffix}</span>
        <span className={textColor}>{label}</span>
      </div>
      <div className="h-3 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: '100%' }} // Represents full target amount
           transition={{ duration: 1, delay: 0.3 }}
           className={`h-full ${color}`} 
         />
      </div>
    </div>
  )
}
