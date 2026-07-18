import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Video, Sparkles, Facebook, BarChart2, CheckCircle } from 'lucide-react';

const workflows = [
  {
    id: 'bulk-scheduling',
    title: 'Bulk Video Scheduling',
    description: 'Upload and queue dozens of videos at once. Set your preferred posting schedule and let VelorOps drip-feed content to your audience automatically.',
    icon: <Video className="w-5 h-5" />,
    color: 'from-indigo-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    features: ['Drag & drop calendar', 'Auto-chunking for large files', 'Timezone intelligent']
  },
  {
    id: 'ai-captions',
    title: 'AI Caption Generation',
    description: 'Never stare at a blank screen again. Our Gemini-powered AI crafts engaging, context-aware captions customized to your brand tone.',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-purple-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    features: ['Tone matching', 'Auto hashtag insertion', 'Engagement optimized']
  },
  {
    id: 'multi-page',
    title: 'Multi-Page Management',
    description: 'Control your entire Facebook real estate from one central dashboard. Target specific content to different pages simultaneously.',
    icon: <Facebook className="w-5 h-5" />,
    color: 'from-emerald-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    features: ['One-click cross posting', 'Unified token management', 'Page-specific analytics']
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Track exactly how your automated content is performing. View deep insights into audience retention, peak viewing times, and share velocity.',
    icon: <BarChart2 className="w-5 h-5" />,
    color: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    features: ['Real-time telemetry', 'Competitor benchmarking', 'Exportable reports']
  }
];

export function WorkflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === workflows.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? workflows.length - 1 : prev - 1));
  };

  const currentWorkflow = workflows[currentIndex];

  return (
    <section className="py-24 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden text-zinc-900 dark:text-white" id="workflows">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Master Every Posting Workflow
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            Discover how VelorOps streamlines your social media operations from upload to analysis.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Navigation - Desktop */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-20 p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
            aria-label="Previous workflow"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-20 p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
            aria-label="Next workflow"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 h-full"
              >
                {/* Left side: Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                  <div className={`inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r ${currentWorkflow.color} shadow-lg w-fit mb-6 text-zinc-900 dark:text-white`}>
                    {currentWorkflow.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{currentWorkflow.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-8">
                    {currentWorkflow.description}
                  </p>
                  
                  <div className="space-y-4 flex flex-col items-center lg:items-start w-full">
                    <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">Key Capabilities</h4>
                    <div className="flex flex-col gap-3">
                      {currentWorkflow.features.map((feature, i) => (
                        <div key={i} className="flex items-center justify-center lg:justify-start gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right side: Interface Preview Image */}
                <div className="relative h-64 lg:h-auto bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
                  <img 
                    src={currentWorkflow.image} 
                    alt={currentWorkflow.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle decorative overlay */}
                  <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
                  
                  {/* UI Window Chrome Overlay */}
                  <div className="absolute top-4 left-4 right-4 z-20">
                     <div className="bg-white dark:bg-zinc-900/80 backdrop-blur border border-zinc-300 dark:border-zinc-700/50 rounded-lg p-3 flex items-center gap-3 shadow-lg">
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                       </div>
                       <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 font-medium tracking-wide">
                         velorops-studio-preview-v2.app
                       </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {workflows.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${idx === currentIndex ? 'bg-indigo-500 w-8' : 'bg-zinc-700 w-2 hover:bg-zinc-600'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
