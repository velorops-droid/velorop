import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Star, X } from 'lucide-react';

import testimonial1 from '../assets/images/testimonial_1_1783635122958.jpg';
import testimonial2 from '../assets/images/testimonial_2_1783635135734.jpg';
import testimonial3 from '../assets/images/testimonial_3_1783635148935.jpg';

const videoTestimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Lifestyle Creator',
    image: testimonial1,
    quote: "VelorOps completely changed how I manage my Facebook presence. I schedule a month's worth of videos in one afternoon.",
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Digital Agency Founder',
    image: testimonial2,
    quote: "We use this for all our clients. The bulk scheduling and automated captions save our team hundreds of hours every week.",
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Media Director',
    image: testimonial3,
    quote: "The reliability is unmatched. We haven't had a single failed upload since we switched from our old scheduling tool.",
  }
];

export function VideoTestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current" />
            Creator Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
            Hear From Our Top Creators
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed transition-colors duration-300">
            See how professionals are leveraging VelorOps to automate their video workflows and scale their audiences on Facebook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Video Thumbnail Area */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Play Button Overlay */}
                <div 
                  className="absolute inset-0 bg-zinc-900/20 group-hover:bg-zinc-900/40 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                  onClick={() => setActiveVideo(testimonial.id)}
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 text-indigo-600 dark:text-indigo-500 ml-1" />
                  </div>
                </div>

                {/* Quote Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent pt-24 pb-6 px-6 pointer-events-none">
                  <p className="text-white text-sm leading-relaxed font-medium mb-4 line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold">{testimonial.name}</h4>
                      <span className="text-zinc-300 text-xs">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Video Modal Overlay */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/90 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors focus:outline-none"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 bg-zinc-900">
                <Play className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">Video Player Placeholder</p>
                <p className="text-sm mt-2">Simulating playback for {videoTestimonials.find(t => t.id === activeVideo)?.name}</p>
                {/* An actual implementation would use an iframe or video tag here */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
