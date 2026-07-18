import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

const data = [
  { time: '00:00', volume: 1200 },
  { time: '02:00', volume: 1900 },
  { time: '04:00', volume: 2400 },
  { time: '06:00', volume: 2100 },
  { time: '08:00', volume: 3800 },
  { time: '10:00', volume: 5900 },
  { time: '12:00', volume: 8400 },
  { time: '14:00', volume: 11200 },
  { time: '16:00', volume: 10500 },
  { time: '18:00', volume: 13800 },
  { time: '20:00', volume: 14500 },
  { time: '22:00', volume: 16200 },
  { time: '24:00', volume: 18500 },
];

export function NetworkVolumeChart() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Live Network Telemetry
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
            Global Processing Volume
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed transition-colors duration-300">
            Our distributed infrastructure processes thousands of automated video uploads every hour, maintaining 99.99% uptime across all major Meta endpoints.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-zinc-50 dark:bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Daily Processed Videos</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Real-time volume across all connected Facebook Pages (24h)</p>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-zinc-900 dark:text-white">18,500+</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">videos/day</span>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'var(--tw-prose-body, #0f172a)', 
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#60a5fa' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorVolume)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
