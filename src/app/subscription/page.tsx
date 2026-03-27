'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, CreditCard, Lock, Sparkles, Timer } from 'lucide-react';
import { Card, Button } from '@/components/ui';

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Subscription successful! Welcome to Elite Membership.');
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 uppercase tracking-tight">
              LEVEL <span className="text-accent italic">UP</span> YOUR GAME
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that fits your goals. Start with a 5-day free trial and experience the full power of Hitham Ashraf&apos;s coaching.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
             <Card 
               className={`relative cursor-pointer transition-all ${selectedPlan === 'free' ? 'border-accent shadow-2xl shadow-accent/10' : 'border-white/5'}`}
               onClick={() => setSelectedPlan('free')}
             >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-gray-500">Free Trial</h3>
                    <p className="text-3xl font-black mt-2">0 EGP <span className="text-sm font-medium text-gray-500">/ 5 days</span></p>
                  </div>
                  {selectedPlan === 'free' && <Check className="w-6 h-6 text-accent" />}
                </div>
                <ul className="space-y-4 mb-8">
                   <li className="flex gap-3 text-sm text-gray-400">
                     <Check className="w-4 h-4 text-accent shrink-0" />
                     Basic Workout Builder
                   </li>
                   <li className="flex gap-3 text-sm text-gray-400">
                     <Check className="w-4 h-4 text-accent shrink-0" />
                     Daily Calorie Logging
                   </li>
                   <li className="flex gap-3 text-sm text-gray-400 text-white/20 line-through">
                     Advanced Progress Analytics
                   </li>
                </ul>
             </Card>

             <Card 
               className={`relative cursor-pointer transition-all ${selectedPlan === 'premium' ? 'border-accent shadow-2xl shadow-accent/20' : 'border-white/5'}`}
               onClick={() => setSelectedPlan('premium')}
             >
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-accent text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                   BEST VALUE
                </div>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-accent">Elite Monthly</h3>
                    <p className="text-3xl font-black mt-2">50 EGP <span className="text-sm font-medium text-gray-500">/ month</span></p>
                  </div>
                  {selectedPlan === 'premium' && <Check className="w-6 h-6 text-accent" />}
                </div>
                <ul className="space-y-4 mb-8">
                   <li className="flex gap-3 text-sm text-gray-200 font-medium">
                     <Sparkles className="w-4 h-4 text-accent shrink-0" />
                     Unlimited Workout Plans
                   </li>
                   <li className="flex gap-3 text-sm text-gray-200 font-medium">
                     <Sparkles className="w-4 h-4 text-accent shrink-0" />
                     Detailed Macro Tracking
                   </li>
                   <li className="flex gap-3 text-sm text-gray-200 font-medium">
                     <Sparkles className="w-4 h-4 text-accent shrink-0" />
                     Weekly Progress Reports
                   </li>
                   <li className="flex gap-3 text-sm text-gray-200 font-medium">
                     <Sparkles className="w-4 h-4 text-accent shrink-0" />
                     Trainer Direct Support
                   </li>
                </ul>
             </Card>
          </div>

          {/* Payment Mock UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-10 border-white/10 bg-gradient-to-br from-card-bg to-black">
               <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-white/5 rounded-2xl">
                    <CreditCard className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase">Secure Checkout</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Mock Payment Environment</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-3">Cardholder Name</label>
                    <input type="text" placeholder="Hitham Ashraf" className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl focus:border-accent outline-none" />
                  </div>

                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-3">Card Number</label>
                    <div className="relative">
                      <input type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl focus:border-accent outline-none" />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-3">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl focus:border-accent outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-3">CVV</label>
                        <input type="password" placeholder="•••" className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl focus:border-accent outline-none" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-8">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total to pay today</span>
                        <span className="text-2xl font-black">{selectedPlan === 'free' ? '0' : '50'} EGP</span>
                     </div>
                     <Button className="w-full h-16 text-lg" isLoading={isProcessing} onClick={handleSubscribe}>
                       {selectedPlan === 'free' ? 'Start Free Trial' : 'Complete Purchase'}
                     </Button>
                  </div>
               </div>

               <div className="mt-8 flex items-center justify-center gap-4 text-gray-600">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Encrypted SSL Transaction</span>
               </div>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section className="border-t border-white/10 pt-20">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-black uppercase">Frequently Asked Questions</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FAQItem 
                q="Can I cancel anytime?" 
                a="Yes, you can cancel your subscription at any time from your profile settings. There are no hidden fees or commitments." 
              />
              <FAQItem 
                q="What happens after the 5-day trial?" 
                a="After 5 days, you will be prompted to switch to the Elite Monthly plan to continue using advanced features." 
              />
           </div>
        </section>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-card-bg/50 border border-white/5 p-8 rounded-3xl">
       <h4 className="text-lg font-bold mb-3 text-white">{q}</h4>
       <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
    </div>
  );
}
