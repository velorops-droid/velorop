import { motion } from 'motion/react';
import { 
  BarChart3, Users, Edit3, Sparkles, CalendarClock, Download, TrendingUp,
  Server, Cpu, Database, Lock, Box, CheckCircle2, Globe, Laptop, Target, Flag, Smartphone, Users2, Building2, LayoutDashboard
} from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function FeaturesSection() {
  const features = [
    {
      title: "Dashboard",
      description: "AI insights, activity timeline, storage usage, and overall statistics at a glance.",
      icon: <LayoutDashboard className="w-6 h-6" />
    },
    {
      title: "Social Account Manager",
      description: "Support for Facebook Pages & Groups, unlimited account management, and token health checking.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Post Composer",
      description: "Rich editor, emoji support, hashtag suggestions, and real-time link previews.",
      icon: <Edit3 className="w-6 h-6" />
    },
    {
      title: "AI Assistant",
      description: "Caption generation, tone changer, grammar improvement, and SEO optimization.",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: "Advanced Scheduler",
      description: "Bulk scheduling, recurring posts, queue system, and AI-determined best posting times.",
      icon: <CalendarClock className="w-6 h-6" />
    },
    {
      title: "Media Library & Downloader",
      description: "Download from FB, IG, TikTok, YT. Organize with folders, tags, and auto-compression.",
      icon: <Download className="w-6 h-6" />
    },
    {
      title: "Advanced Analytics",
      description: "Growth charts, post performance, and success rate tracking for deep insights.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Powerful Core Modules</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">Everything you need to streamline your social media strategy in one secure platform.</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInVariants}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-800/50 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-900/10 transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ArchitectureSection() {
  const techStack = [
    { category: "Frontend", items: "React, TypeScript, Vite, Tailwind CSS, Zustand", icon: <Globe className="w-5 h-5 text-blue-500" /> },
    { category: "Desktop", items: "Electron, Node.js", icon: <Laptop className="w-5 h-5 text-indigo-500" /> },
    { category: "Backend", items: "NestJS, Prisma, PostgreSQL, Redis, BullMQ", icon: <Server className="w-5 h-5 text-green-500" /> },
    { category: "AI Services", items: "OpenAI API for content optimization", icon: <Cpu className="w-5 h-5 text-purple-500" /> },
    { category: "Security", items: "AES encryption for local credential storage, RBAC", icon: <Lock className="w-5 h-5 text-rose-500" /> },
  ];

  return (
    <section id="architecture" className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Tech Architecture</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">Built with modern, scalable, and secure technologies.</p>
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
                className="flex items-center gap-4 bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-300 shadow-sm"
              >
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                  {tech.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{tech.category}</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{tech.items}</p>
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
    <section id="audience" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Who is VelorOps For?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">Designed specifically for professionals who need reliable social media automation.</p>
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
               className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center transition-colors duration-300"
             >
                <div className="text-blue-500 mb-4">{aud.icon}</div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{aud.title}</h4>
             </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Future Roadmap</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">We are constantly evolving. Here's what's coming next.</p>
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
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 border-4 border-white dark:border-slate-950 flex items-center justify-center z-10 text-blue-600 dark:text-blue-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-px h-full bg-slate-200 dark:bg-slate-700 my-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Expanded Platform Support</h4>
                <p className="text-slate-600 dark:text-slate-400">Native integration with Instagram, X (Twitter), LinkedIn, and Pinterest.</p>
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
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 border-4 border-white dark:border-slate-950 flex items-center justify-center z-10 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="w-px h-full bg-slate-200 dark:bg-slate-700 my-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Advanced AI Capabilities</h4>
                <p className="text-slate-600 dark:text-slate-400">AI Image & Video Generation, OCR for image-to-text, and Voice-to-Post features.</p>
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
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 border-4 border-white dark:border-slate-950 flex items-center justify-center z-10 text-green-600 dark:text-green-400">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Mobile & Ecosystem Expansion</h4>
                <p className="text-slate-600 dark:text-slate-400">Launch of the Mobile Companion App and a dedicated Plugin Marketplace.</p>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
