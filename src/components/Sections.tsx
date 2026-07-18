import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, Users, Edit3, Sparkles, CalendarClock, Download, TrendingUp,
  Server, Cpu, Database, Lock, Box, CheckCircle2, Globe, Laptop, Target, Flag, Smartphone, Users2, Building2, LayoutDashboard
} from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span 
      className="relative inline-block border-b border-dashed border-indigo-400 cursor-help text-indigo-600 dark:text-indigo-400 font-semibold"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: -5, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 bg-zinc-900 dark:bg-zinc-800 text-white text-xs rounded-xl shadow-xl z-50 pointer-events-none border border-zinc-700"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('scheduling');

  const demoTabs = [
    { id: 'scheduling', label: 'Bulk Scheduling', img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&auto=format&fit=crop&q=60' },
    { id: 'ai', label: 'AI Captions', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60' },
    { id: 'analytics', label: 'Analytics', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60' },
  ];

  const features = [
    {
      title: "Dashboard",
      description: <>AI insights, activity timeline, storage usage, and overall statistics powered by real-time <Tooltip text="A WebSocket-based event system providing immediate telemetry.">WebSocket Streams</Tooltip>.</>,
      icon: <LayoutDashboard className="w-6 h-6" />,
      tooltipText: "Central command for monitoring your entire automation workflow."
    },
    {
      title: "Social Account Manager",
      description: <>Unlimited account management, with secure token health checking via the official <Tooltip text="Meta's official API for reading and writing data to Facebook.">Graph API</Tooltip>.</>,
      icon: <Users className="w-6 h-6" />,
      tooltipText: "Keep all your profiles connected and token-health tracked."
    },
    {
      title: "Post Composer",
      description: "Rich editor, emoji support, hashtag suggestions, and real-time link previews.",
      icon: <Edit3 className="w-6 h-6" />,
      tooltipText: "Craft perfect posts before they hit the automated queue."
    },
    {
      title: "AI Assistant",
      description: <>Caption generation, tone changer, grammar improvement utilizing advanced <Tooltip text="Large Language Models (like Gemini) optimized for social copy.">LLM Processing</Tooltip>.</>,
      icon: <Sparkles className="w-6 h-6" />,
      tooltipText: "Automated content generation to never run out of ideas."
    },
    {
      title: "Advanced Scheduler",
      description: <>Bulk scheduling, recurring posts, queue system utilizing <Tooltip text="Reliable background task execution that avoids request timeouts.">Async Job Queues</Tooltip>.</>,
      icon: <CalendarClock className="w-6 h-6" />,
      tooltipText: "Set your publishing calendar and let the system run 24/7."
    },
    {
      title: "Media Library",
      description: <>Organize with folders, tags, and auto-compression. Supports high-res <Tooltip text="Breaking large files into smaller pieces for robust uploading over slow networks.">Chunked Uploads</Tooltip>.</>,
      icon: <Download className="w-6 h-6" />,
      tooltipText: "Cloud-synced asset storage specifically optimized for video."
    },
    {
      title: "Advanced Analytics",
      description: "Growth charts, post performance, and success rate tracking for deep insights.",
      icon: <TrendingUp className="w-6 h-6" />,
      tooltipText: "Measure ROI and engagement directly from automation data."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 transition-colors duration-300">Powerful Core Modules</h2>
          <p className="text-lg font-light text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors duration-300">Everything you need to streamline your social media strategy in one secure platform.</p>
        </motion.div>

        {/* Interactive Demo */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="flex justify-center space-x-2 mb-8">
            {demoTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-900 aspect-video">
            <AnimatePresence mode="wait">
              {demoTabs.map(tab => tab.id === activeTab && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img src={tab.img} alt={tab.label} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent flex items-end p-8">
                    <h3 className="text-2xl font-bold text-white">{tab.label} Demonstration</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInVariants}
              className="group relative bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Added Icon Tooltip */}
              <div className="relative z-10 w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-800/50 shadow-sm group-hover:scale-110 transition-transform duration-300 cursor-help">
                <Tooltip text={feature.tooltipText}>
                  <div className="flex items-center justify-center w-full h-full">
                    {feature.icon}
                  </div>
                </Tooltip>
              </div>
              
              <h3 className="relative z-10 text-xl font-bold text-zinc-900 dark:text-white mb-3 transition-colors duration-300">{feature.title}</h3>
              <div className="relative z-10 text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
                {feature.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ArchitectureSection() {
  const techStack = [
    { category: "Frontend", items: "React, TypeScript, Vite, Tailwind CSS, Zustand", icon: <Globe className="w-5 h-5 text-indigo-500" /> },
    { category: "Desktop", items: "Electron, Node.js", icon: <Laptop className="w-5 h-5 text-indigo-500" /> },
    { category: "Backend", items: "NestJS, Prisma, PostgreSQL, Redis, BullMQ", icon: <Server className="w-5 h-5 text-green-500" /> },
    { category: "AI Services", items: "OpenAI API for content optimization", icon: <Cpu className="w-5 h-5 text-purple-500" /> },
    { category: "Security", items: "AES encryption for local credential storage, RBAC", icon: <Lock className="w-5 h-5 text-rose-500" /> },
  ];

  return (
    <section id="architecture" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 transition-colors duration-300">Tech Architecture</h2>
          <p className="text-lg font-light text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors duration-300">Built with modern, scalable, and secure technologies.</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="grid gap-4"
          >
            {techStack.map((tech, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInVariants}
                className="flex items-center gap-4 bg-white dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 shadow-sm"
              >
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                  {tech.icon}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{tech.category}</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">{tech.items}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function AudienceSection() {
  const audiences = [
    { title: "Digital Marketers", icon: <Target className="w-5 h-5" /> },
    { title: "Social Media Managers", icon: <Users2 className="w-5 h-5" /> },
    { title: "Agencies", icon: <Building2 className="w-5 h-5" /> },
    { title: "Freelancers", icon: <Laptop className="w-5 h-5" /> },
    { title: "Small Businesses", icon: <Box className="w-5 h-5" /> },
    { title: "Content Creators", icon: <Sparkles className="w-5 h-5" /> },
  ];

  return (
    <section id="audience" className="py-24 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 transition-colors duration-300">Who is VelorOps For?</h2>
          <p className="text-lg font-light text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors duration-300">Designed specifically for professionals who need reliable social media automation.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {audiences.map((aud, idx) => (
             <motion.div 
               key={idx}
               variants={fadeInVariants}
               className="flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center transition-colors duration-300"
             >
                <div className="text-indigo-500 mb-4">{aud.icon}</div>
                <h4 className="font-semibold text-zinc-900 dark:text-white">{aud.title}</h4>
             </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 transition-colors duration-300">Future Roadmap</h2>
          <p className="text-lg font-light text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors duration-300">We are constantly evolving. Here's what's coming next.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
           <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="flex gap-6"
           >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 border-4 border-white dark:border-zinc-950 flex items-center justify-center z-10 text-indigo-600 dark:text-indigo-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-px h-full bg-zinc-200 dark:bg-zinc-700 my-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Expanded Platform Support</h4>
                <p className="text-zinc-600 dark:text-zinc-400">Native integration with Instagram, X (Twitter), LinkedIn, and Pinterest.</p>
              </div>
           </motion.div>

           <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="flex gap-6"
           >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 border-4 border-white dark:border-zinc-950 flex items-center justify-center z-10 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="w-px h-full bg-zinc-200 dark:bg-zinc-700 my-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Advanced AI Capabilities</h4>
                <p className="text-zinc-600 dark:text-zinc-400">AI Image & Video Generation, OCR for image-to-text, and Voice-to-Post features.</p>
              </div>
           </motion.div>

           <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="flex gap-6"
           >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 border-4 border-white dark:border-zinc-950 flex items-center justify-center z-10 text-green-600 dark:text-green-400">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Mobile & Ecosystem Expansion</h4>
                <p className="text-zinc-600 dark:text-zinc-400">Launch of the Mobile Companion App and a dedicated Plugin Marketplace.</p>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
