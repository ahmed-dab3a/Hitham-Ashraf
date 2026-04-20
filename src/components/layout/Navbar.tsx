'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Dumbbell, Utensils, LayoutDashboard, LogOut, Globe } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout, language, setLanguage } = useAuthStore();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navLinks = [
    { name: language === 'ar' ? 'لوحة القيادة' : 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: language === 'ar' ? 'التمارين' : 'Exercises', href: '/exercises', icon: Dumbbell },
    { name: language === 'ar' ? 'الخطط الرياضية' : 'Workouts', href: '/workouts', icon: Dumbbell },
    { name: language === 'ar' ? 'التغذية' : 'Nutrition', href: '/nutrition', icon: Utensils },
    { name: language === 'ar' ? 'دليل السعرات' : 'Food Data', href: '/foods', icon: Utensils },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-primary">
            <Image src="/assets/log.jpeg" alt="Log" fill className="object-cover" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight hidden sm:block">
            LYFTA <span className="text-accent italic">VIP</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 flex-grow justify-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent flex items-center gap-2 ${
                pathname === link.href ? 'text-accent' : 'text-gray-400'
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-colors text-xs font-black tracking-widest bg-white/5"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === 'ar' ? 'AR' : 'EN'}
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 hover:text-accent transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm font-semibold">{user.name}</span>
              </Link>
              <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">{language === 'ar' ? 'دخول' : 'Login'}</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">{language === 'ar' ? 'ابدأ الان' : 'Get Started'}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-semibold flex items-center gap-4 ${
                    pathname === link.href ? 'text-accent' : 'text-white'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <button 
                onClick={() => { toggleLanguage(); setIsOpen(false); }}
                className="flex items-center gap-4 text-lg font-semibold text-white hover:text-accent transition-colors w-full text-left"
              >
                <Globe className="w-5 h-5 text-accent" />
                Change Language ({language === 'en' ? 'Arabic' : 'English'})
              </button>
              <hr className="border-white/10" />
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                     <User className="w-5 h-5 text-accent" />
                     <span className="font-semibold">{user.name}</span>
                  </div>
                  <Button onClick={() => { logout(); setIsOpen(false); }} variant="outline">Logout</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
