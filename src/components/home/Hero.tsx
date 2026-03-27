'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] -z-10 rounded-full translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/10 blur-[100px] -z-10 rounded-full -translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-bold mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <span>#1 ONLINE FITNESS COACH</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-extrabold leading-tight mb-6">
            TRANSFORM YOUR <br />
            <span className="text-accent italic">PHYSIQUE</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
            Personalized training, nutrition plans, and 1-on-1 coaching by Hitham Ashraf. 
            Build the body you&apos;ve always wanted with science-backed protocols.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link href="/register">
              <Button size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/exercises">
              <Button variant="outline" size="lg">Explore Library</Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-sm text-gray-400">Happy Clients</p>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-gray-400">Results Driven</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src="/assets/cotch hithem.jpeg" 
              alt="Hitham Ashraf" 
              fill 
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-10 left-10">
              <p className="text-3xl font-display font-black text-white leading-none">HITHAM ASHRAF</p>
              <p className="text-accent font-bold tracking-widest text-sm mt-2 uppercase">Online Fitness Coach</p>
            </div>
          </div>
          
          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Dumbbell className="text-black w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Expertise</p>
                <p className="text-sm font-bold">Bodybuilding</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
