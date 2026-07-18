import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Users2 } from 'lucide-react';

export function ImpactMetrics() {
  const [scale, setScale] = useState<'small' | 'medium' | 'large'>('small');
  const [hoursSaved, setHoursSaved] = useState(0);
  const [reachGrowth, setReachGrowth] = useState(0);

  const metricsData = {
    small: { hours: 24, reach: 15 },
    medium: { hours: 85, reach: 42 },
    large: { hours: 320, reach: 156 }
  };

  useEffect(() => {
    const targetHours = metricsData[scale].hours;
    const targetReach = metricsData[scale].reach;
    
    let currentHours = 0;
    let currentReach = 0;
    
    const interval = setInterval(() => {
      let updated = false;
      if (currentHours < targetHours) {
        currentHours += Math.ceil(targetHours / 20);
        if (currentHours > targetHours) currentHours = targetHours;
        setHoursSaved(currentHours);
        updated = true;
      }
      if (currentReach < targetReach) {
        currentReach += Math.ceil(targetReach / 20);
        if (currentReach > targetReach) currentReach = targetReach;
        setReachGrowth(currentReach);
        updated = true;
      }
      
      if (!updated) {
        clearInterval(interval);
      }
    }, 40);
    
    return () => clearInterval(interval);
  }, [scale]);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-zinc-950 rounded-3xl p-8 md:p-12 shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">Estimated Impact Metrics</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">See the potential ROI based on your company scale.</p>
          </div>
          
          {/* Demo Data Toggle */}
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-full mb-12">
            {(['small', 'medium', 'large'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${scale === s ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
              >
                {s} Business
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <div className="flex flex-col items-center p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <Clock className="w-10 h-10 text-indigo-500 mb-4" />
              <div className="text-5xl font-black text-zinc-900 dark:text-white mb-2">{hoursSaved}<span className="text-3xl text-indigo-500">+</span></div>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg">Hours Saved Monthly</p>
            </div>
            
            <div className="flex flex-col items-center p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <TrendingUp className="w-10 h-10 text-emerald-500 mb-4" />
              <div className="text-5xl font-black text-zinc-900 dark:text-white mb-2">{reachGrowth}<span className="text-3xl text-emerald-500">%</span></div>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg">Estimated Reach Growth</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
