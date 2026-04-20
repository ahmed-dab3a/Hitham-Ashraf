'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Apple, Flame, Beef, Wheat, Droplets, X, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui';

interface FoodItem {
  id: string;
  name: string;
  nameAr?: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  unit: string;
}

const CATEGORIES = [
  'All',
  'Protein',
  'Dairy',
  'Carbs',
  'Fruits',
  'Vegetables',
  'Fats',
  'Legumes',
  'Egyptian',
  'Egyptian Desserts',
  'Middle Eastern',
  'Fast Food',
  'International',
  'Snacks',
  'Beverages',
];

const CATEGORY_LABELS_AR: Record<string, string> = {
  'All': 'الكل',
  'Protein': 'بروتين',
  'Dairy': 'ألبان',
  'Carbs': 'كربوهيدرات',
  'Fruits': 'فواكه',
  'Vegetables': 'خضروات',
  'Fats': 'دهون ومكسرات',
  'Legumes': 'بقوليات',
  'Egyptian': 'أكلات مصرية',
  'Egyptian Desserts': 'حلويات مصرية',
  'Middle Eastern': 'شرق أوسطي',
  'Fast Food': 'وجبات سريعة',
  'International': 'أكلات عالمية',
  'Snacks': 'سناكس',
  'Beverages': 'مشروبات',
};

const CATEGORY_EMOJI: Record<string, string> = {
  'All': '🍽️',
  'Protein': '🥩',
  'Dairy': '🧀',
  'Carbs': '🍚',
  'Fruits': '🍎',
  'Vegetables': '🥦',
  'Fats': '🥜',
  'Legumes': '🫘',
  'Egyptian': '🇪🇬',
  'Egyptian Desserts': '🍮',
  'Middle Eastern': '🧆',
  'Fast Food': '🍔',
  'International': '🌍',
  'Snacks': '🍫',
  'Beverages': '🥤',
};

export default function FoodsPage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState(100);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        let url = '/api/nutrition';
        if (search.length > 1) {
          url = `/api/nutrition?q=${encodeURIComponent(search)}`;
        } else if (selectedCategory !== 'All') {
          url = `/api/nutrition?category=${encodeURIComponent(selectedCategory)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          setFoods(data);
        }
      } catch (err) {
        console.error('Failed to fetch foods', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchFoods, 300);
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  const ratio = grams / 100;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4 uppercase italic tracking-tighter">
            Food <span className="text-accent not-italic">Database</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            ابحث عن أي أكلة واعرف السعرات والبروتين والكارب والدهون. قاعدة بيانات شاملة للأكل المصري والعالمي.
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent w-6 h-6 group-focus-within:scale-110 transition-transform" />
          <input
            type="text"
            placeholder="ابحث عن أكلة... (كشري، فراخ، شاورما، بيتزا...)"
            className="w-full bg-card-bg border border-white/10 rounded-[24px] py-6 pl-16 pr-6 text-xl font-bold text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/40 transition-all shadow-inner"
            value={search}
            onChange={(e) => { setSearch(e.target.value); if (e.target.value) setSelectedCategory('All'); }}
            dir="auto"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          {/* Mobile: dropdown */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-card-bg border border-white/10 text-white font-bold"
            >
              <span>{CATEGORY_EMOJI[selectedCategory]} {CATEGORY_LABELS_AR[selectedCategory] || selectedCategory}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-2 rounded-2xl bg-card-bg border border-white/10"
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setShowCategories(false); setSearch(''); }}
                      className={`w-full text-left px-6 py-3 text-sm font-bold transition-colors ${
                        selectedCategory === cat ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      {CATEGORY_EMOJI[cat]} {CATEGORY_LABELS_AR[cat] || cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop: horizontal pills */}
          <div className="hidden md:flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSearch(''); }}
                className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-accent text-black scale-105 shadow-lg shadow-accent/20'
                    : 'bg-white/5 text-gray-400 border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {CATEGORY_EMOJI[cat]} {CATEGORY_LABELS_AR[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-6 flex items-center gap-3">
            <span className="text-accent font-black text-2xl">{foods.length}</span>
            <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">نتيجة</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[220px] rounded-[32px] bg-card-bg border border-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* Food Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {foods.map((food) => (
                <motion.div
                  key={food.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="h-full flex flex-col cursor-pointer group hover:border-accent/40 bg-gradient-to-br from-card-bg to-black transition-all duration-500 rounded-[32px] !p-0 overflow-hidden"
                    onClick={() => { setSelectedFood(food); setGrams(100); }}
                  >
                    {/* Top accent bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-accent via-orange-500 to-amber-500 opacity-40 group-hover:opacity-100 transition-opacity" />

                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/70">
                          {CATEGORY_EMOJI[food.category]} {food.category}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                          {food.unit}
                        </span>
                      </div>

                      {/* Food name */}
                      <h3 className="text-lg font-black text-white group-hover:text-accent transition-colors mb-1 leading-tight">
                        {food.name}
                      </h3>
                      {food.nameAr && (
                        <p className="text-sm text-gray-500 font-bold mb-5" dir="rtl">{food.nameAr}</p>
                      )}

                      {/* Macro Grid */}
                      <div className="grid grid-cols-4 gap-2 mt-auto">
                        <MacroBox label="سعرات" value={food.calories} unit="kcal" color="text-orange-400" />
                        <MacroBox label="بروتين" value={food.protein} unit="g" color="text-red-400" />
                        <MacroBox label="كارب" value={food.carbs} unit="g" color="text-blue-400" />
                        <MacroBox label="دهون" value={food.fats} unit="g" color="text-yellow-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && foods.length === 0 && (
          <div className="text-center py-32 opacity-30">
            <Apple className="w-20 h-20 mx-auto mb-6 text-gray-500" />
            <p className="text-2xl font-black uppercase italic tracking-tighter">مفيش نتائج</p>
            <p className="text-gray-600 mt-2">جرب تبحث بكلمة تانية</p>
          </div>
        )}
      </div>

      {/* Food Detail Modal */}
      <AnimatePresence>
        {selectedFood && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFood(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-lg bg-card-bg border border-accent/30 rounded-[48px] shadow-2xl overflow-hidden"
            >
              {/* Accent top */}
              <div className="h-2 w-full bg-gradient-to-r from-accent via-orange-500 to-amber-500" />

              <div className="p-10">
                {/* Close */}
                <button
                  onClick={() => setSelectedFood(null)}
                  className="absolute top-8 right-8 p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>

                {/* Food Info */}
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/70 mb-2 block">
                    {CATEGORY_EMOJI[selectedFood.category]} {selectedFood.category}
                  </span>
                  <h2 className="text-3xl font-display font-black uppercase leading-tight mb-1">
                    {selectedFood.name}
                  </h2>
                  {selectedFood.nameAr && (
                    <p className="text-lg text-gray-400 font-bold" dir="rtl">{selectedFood.nameAr}</p>
                  )}
                </div>

                {/* Grams Slider */}
                <div className="mb-8 p-6 rounded-[28px] bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      ⚖️ الكمية
                    </span>
                    <span className="text-2xl font-black text-white">{grams}g</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="5"
                    value={grams}
                    onChange={(e) => setGrams(parseInt(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF6B00]"
                  />
                  <div className="flex justify-between mt-3 text-[10px] font-black uppercase text-gray-700">
                    <span>10g</span>
                    <span>500g</span>
                    <span>1000g</span>
                  </div>
                  {/* Quick buttons */}
                  <div className="flex gap-2 mt-4">
                    {[50, 100, 150, 200, 300, 500].map(g => (
                      <button
                        key={g}
                        onClick={() => setGrams(g)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                          grams === g
                            ? 'bg-accent text-black'
                            : 'bg-white/5 text-gray-500 hover:bg-white/10'
                        }`}
                      >
                        {g}g
                      </button>
                    ))}
                  </div>
                </div>

                {/* Macro Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <MacroDetailCard
                    icon={<Flame className="w-6 h-6" />}
                    label="سعرات حرارية"
                    value={Math.round(selectedFood.calories * ratio)}
                    unit="kcal"
                    color="from-orange-500/20 to-transparent"
                    textColor="text-orange-400"
                  />
                  <MacroDetailCard
                    icon={<Beef className="w-6 h-6" />}
                    label="بروتين"
                    value={Math.round(selectedFood.protein * ratio * 10) / 10}
                    unit="g"
                    color="from-red-500/20 to-transparent"
                    textColor="text-red-400"
                  />
                  <MacroDetailCard
                    icon={<Wheat className="w-6 h-6" />}
                    label="كربوهيدرات"
                    value={Math.round(selectedFood.carbs * ratio * 10) / 10}
                    unit="g"
                    color="from-blue-500/20 to-transparent"
                    textColor="text-blue-400"
                  />
                  <MacroDetailCard
                    icon={<Droplets className="w-6 h-6" />}
                    label="دهون"
                    value={Math.round(selectedFood.fats * ratio * 10) / 10}
                    unit="g"
                    color="from-yellow-500/20 to-transparent"
                    textColor="text-yellow-400"
                  />
                </div>

                {/* Macro Bar */}
                <div className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3">توزيع الماكروز</p>
                  <MacroBar protein={selectedFood.protein} carbs={selectedFood.carbs} fats={selectedFood.fats} />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedFood(null)}
                  className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========= Sub-Components ========= */

function MacroBox({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/5">
      <p className={`text-base font-black ${color}`}>{value}<span className="text-[9px] ml-0.5 opacity-60">{unit}</span></p>
      <p className="text-[8px] font-bold text-gray-600 uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  );
}

function MacroDetailCard({ icon, label, value, unit, color, textColor }: {
  icon: React.ReactNode; label: string; value: number; unit: string; color: string; textColor: string;
}) {
  return (
    <div className={`p-5 rounded-[24px] bg-gradient-to-br ${color} border border-white/5`}>
      <div className={`${textColor} mb-3 opacity-70`}>{icon}</div>
      <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-black ${textColor}`}>
        {value}<span className="text-sm ml-1 opacity-60">{unit}</span>
      </p>
    </div>
  );
}

function MacroBar({ protein, carbs, fats }: { protein: number; carbs: number; fats: number }) {
  const total = (protein * 4) + (carbs * 4) + (fats * 9);
  if (total === 0) return null;
  const pPct = Math.round((protein * 4 / total) * 100);
  const cPct = Math.round((carbs * 4 / total) * 100);
  const fPct = 100 - pPct - cPct;

  return (
    <div>
      <div className="h-3 w-full rounded-full overflow-hidden flex bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-red-500 h-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${cPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="bg-blue-500 h-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${fPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="bg-yellow-500 h-full"
        />
      </div>
      <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-wider">
        <span className="text-red-400">بروتين {pPct}%</span>
        <span className="text-blue-400">كارب {cPct}%</span>
        <span className="text-yellow-400">دهون {fPct}%</span>
      </div>
    </div>
  );
}
