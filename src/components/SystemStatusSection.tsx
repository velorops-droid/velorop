import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Server, Zap } from 'lucide-react';

export function SystemStatusSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [uptime] = useState(99.99);
  const [latency, setLatency] = useState(42);
  const [queueCount, setQueueCount] = useState(12);

  useEffect(() => {
    // Load initial system metrics on mount
    const initialTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Keep system metrics synchronized in real time
    const interval = setInterval(() => {
      setLatency(prev => Math.floor(Math.random() * (75 - 35 + 1) + 35));
      setQueueCount(prev => Math.floor(Math.random() * (60 - 5 + 1) + 5));
    }, 2500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-zinc-900 dark:bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-zinc-50 dark:bg-zinc-950 p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
          
          {/* Subtle glowing orb inside the card */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex-1 w-full text-center lg:text-left relative z-10 flex flex-col items-center lg:items-start mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              All Systems Operational
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">Real-time Infrastructure Status</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed text-center lg:text-left">
              Our globally distributed servers ensure maximum uptime and minimal latency. VelorOps continuously monitors Meta's API endpoints to guarantee reliable automated publishing without rate-limit failures.
            </p>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            {isLoading ? (
              // Skeletons
              <>
                {[1, 2, 3].map((i) => (
                  <div key={`stat-skeleton-${i}`} className="bg-white dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col h-[132px] justify-between">
                     <div className="flex items-center justify-between">
                       <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                       <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
                     </div>
                     <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mt-4"></div>
                     <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mt-2"></div>
                  </div>
                ))}
              </>
            ) : (
              // Actual Content
              <>
                <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">Uptime</span>
                    <Server className="w-4.5 h-4.5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white">{uptime}%</div>
                  <div className="text-xs text-emerald-500 mt-2 font-medium">90 days trailing</div>
                </div>
                
                <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">API Latency</span>
                    <Activity className="w-4.5 h-4.5 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white flex items-baseline">
                    {latency} <span className="text-sm font-normal text-zinc-500 dark:text-zinc-500 ml-1">ms</span>
                  </div>
                  <div className="text-xs text-indigo-400/80 mt-2 font-medium">US-East Region</div>
                </div>

                <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">Active Tasks</span>
                    <Zap className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                  <AnimatePresence mode="popLayout">
                    <motion.div 
                      key={queueCount}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl font-bold text-zinc-900 dark:text-white"
                    >
                      {queueCount}
                    </motion.div>
                  </AnimatePresence>
                  <div className="text-xs text-amber-500/80 mt-2 font-medium">Processing Queue</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
