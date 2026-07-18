import React from 'react';
import { FeaturesSection, ArchitectureSection, AudienceSection, RoadmapSection } from '../components/Sections';
import { SEO } from '../components/SEO';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function FeaturesPage() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen pb-16 transition-colors duration-300">
      <SEO 
        title="Features | VelorOps"
        description="Explore the rich feature set, platform architecture, target audience, and future roadmap of VelorOps."
        path="/features"
      />

      {/* Page Hero */}
      <div className="relative py-20 overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold mb-4 border border-indigo-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Core Modules</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
          >
            Product Features & Specs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-light"
          >
            A high-performance automated pipeline for scaling and scheduling your video workflows.
          </motion.p>
        </div>
      </div>

      {/* Feature Sections */}
      <FeaturesSection />
      <ArchitectureSection />
      <AudienceSection />
      <RoadmapSection />
    </div>
  );
}
