'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setAuth(data.user, data.token);
        router.push('/dashboard');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black">
      {/* Visual Side */}
      <div className="hidden lg:block relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="/assets/cotch hitem 2.jpeg" 
            alt="Training" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/20" />
        </motion.div>
        
        <div className="absolute bottom-20 left-20 z-10 max-w-md">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl font-display font-black text-white uppercase leading-none mb-6"
          >
            START YOUR <br /> <span className="text-accent italic">EVOLUTION</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-gray-400 font-bold uppercase tracking-widest"
          >
            Join 5,000+ athletes training with Hitham Ashraf.
          </motion.p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8 pt-32 lg:pt-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl font-display font-black mb-4 uppercase">CREATE <span className="text-accent italic">ACCOUNT</span></h1>
            <p className="text-gray-500">Enter your details to start your 5-day free trial.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-3">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Hitham Ashraf"
                  className="w-full bg-card-bg border border-white/10 p-4 pl-12 rounded-2xl focus:border-accent outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="hitham@fitness.com"
                  className="w-full bg-card-bg border border-white/10 p-4 pl-12 rounded-2xl focus:border-accent outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-card-bg border border-white/10 p-4 pl-12 rounded-2xl focus:border-accent outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-16 text-lg group" isLoading={loading}>
              Get Started Free 
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-12 space-y-4">
             <div className="flex items-center gap-3 text-sm text-gray-600 justify-center">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>5-Day Free Trial Included</span>
             </div>
             <p className="text-center text-gray-500">
               Already have an account? {' '}
               <Link href="/login" className="text-accent font-bold hover:underline">Log In Here</Link>
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
