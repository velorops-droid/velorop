import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { PlayCircle, Clock, Users, ArrowUpRight } from 'lucide-react';

const StatItem = ({ endValue, label, icon, suffix = '' }: { endValue: number, label: string, icon: React.ReactNode, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      
      const timer = setInterval(() => {
        start += Math.ceil(endValue / (duration / 50));
        if (start > endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isInView, endValue]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-2 flex items-baseline">
        {count.toLocaleString()}{suffix}
        <ArrowUpRight className="w-6 h-6 text-emerald-500 ml-1 opacity-80" />
      </div>
      <div className="text-zinc-500 dark:text-zinc-400 font-medium text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

export function StatsSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors duration-300"
          >
            Proven Results at Scale
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors duration-300"
          >
            Join thousands of creators who have streamlined their video strategy and maximized their audience engagement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem 
            endValue={12500} 
            label="Videos Published" 
            icon={<PlayCircle className="w-7 h-7" />} 
            suffix="+"
          />
          <StatItem 
            endValue={8400} 
            label="Hours Saved" 
            icon={<Clock className="w-7 h-7" />} 
            suffix="h"
          />
          <StatItem 
            endValue={2} 
            label="Total Reach" 
            icon={<Users className="w-7 h-7" />} 
            suffix="M+"
          />
        </div>
      </div>
    </section>
  );
}
