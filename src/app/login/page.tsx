'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
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
    } catch {
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
          <Image 
            src="/assets/cotch hithem.jpeg" 
            alt="Training" 
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/20" />
        </motion.div>
        
        <div className="absolute bottom-20 left-20 z-10 max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-3 bg-accent text-black rounded-2xl w-fit mb-6"
          >
            <Activity className="w-8 h-8" />
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-6xl font-display font-black text-white uppercase leading-none mb-6"
          >
            BECOME <br /> <span className="text-accent italic">UNSTOPPABLE</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-400 font-bold uppercase tracking-widest"
          >
            Consistency is the bridge between goals and achievement.
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
            <h1 className="text-4xl font-display font-black mb-4 uppercase">WELCOME <span className="text-accent italic">BACK</span></h1>
            <p className="text-gray-500">Sign in to your account to continue your journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-3 text-white/50 flex justify-between">
                Password
                <Link href="#" className="text-accent font-bold hover:underline">Forgot?</Link>
              </label>
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
              Log In Now
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-12">
             <p className="text-center text-gray-500">
               New to the platform? {' '}
               <Link href="/register" className="text-accent font-bold hover:underline">Create Account</Link>
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
