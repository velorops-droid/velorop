import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Facebook, Video, Download, Eye, Check, ExternalLink, ChevronUp, Server, Zap, X, Upload, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { LoadingOverlay } from './components/LoadingOverlay';
import { VelorOpsLogo } from './components/Logo';
import { VelorOpsStudio } from './components/VelorOpsStudio';
import { WorkflowCarousel } from './components/WorkflowCarousel';
import { StatsSection } from './components/StatsSection';
import { SystemStatusSection } from './components/SystemStatusSection';
import { NetworkVolumeChart } from './components/NetworkVolumeChart';
import { VideoTestimonialsSection } from './components/VideoTestimonialsSection';
import { ImpactMetrics } from './components/ImpactMetrics';
import { FacebookPreviewPanel } from './components/FacebookPreviewPanel';
import { SEO } from './components/SEO';
import { ShareSocial } from './components/ShareSocial';
import { MainLayout } from './components/MainLayout';

// Sub-page component imports
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import { DataDeletionPage } from './pages/DataDeletionPage';
import { DashboardPage } from './pages/DashboardPage';

const fbAutomationIllustration = '/src/assets/images/facebook_automation_1783571681829.jpg';

const SecurityTrustBanner = () => {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start items-center">
      <div className="flex items-center gap-2">
        <div className="p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-emerald-500 border border-zinc-200 dark:border-zinc-800">
          <Check className="w-4 h-4" />
        </div>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">Meta API Compliant</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-emerald-500 border border-zinc-200 dark:border-zinc-800">
          <Check className="w-4 h-4" />
        </div>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">32-Byte Token Encryption</span>
      </div>
    </div>
  );
};

function LandingPage() {
  const navigate = useNavigate();
  const [isPreviewPanelOpen, setIsPreviewPanelOpen] = useState(false);
  const [isOnboardingVideoOpen, setIsOnboardingVideoOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative">
      <SEO 
        title="VelorOps - Automate Your Facebook Videos"
        description="VelorOps: The ultimate platform for scheduling, managing, and automating your Facebook video content."
        path="/"
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hero Section Redesigned with Premium Glassy Look */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-50/50 dark:from-indigo-900/20 to-transparent pointer-events-none"></div>
          <div className="absolute -top-[300px] -right-[300px] w-[800px] h-[800px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-[300px] -left-[300px] w-[800px] h-[800px] rounded-full bg-violet-500/10 dark:bg-violet-500/10 blur-[100px] pointer-events-none"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Headline and Copy */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="col-span-1 lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6 mx-auto lg:mx-0 max-w-2xl lg:max-w-none w-full"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-widest shadow-sm"
              >
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                Introducing Desktop Agent v2.0
              </motion.div>
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-gradient"
              >
                Automate Your Facebook Videos.
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="text-lg md:text-xl font-light text-zinc-600 dark:text-zinc-400 leading-relaxed tracking-wide max-w-xl mx-auto lg:mx-0"
              >
                Scale your audience distribution effortlessly. Securely connect your official Graph API credentials, schedule videos in bulk, generate AI captions, and access advanced performance telemetry in one place.
              </motion.p>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full flex-wrap"
              >
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1"
                >
                  <Facebook className="w-4.5 h-4.5 fill-current" />
                  <span>Connect with Facebook</span>
                </button>
                <button 
                  onClick={() => setIsOnboardingVideoOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 glass hover:bg-white/60 dark:hover:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-1"
                >
                  <Video className="w-4.5 h-4.5" />
                  <span>Take the Tour</span>
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 glass hover:bg-white/60 dark:hover:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-1">
                  <Download className="w-4.5 h-4.5" />
                  <span>Download Desktop App</span>
                </button>
                <button 
                  onClick={() => setIsPreviewPanelOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 glass hover:bg-white/60 dark:hover:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-1"
                >
                  <Eye className="w-4.5 h-4.5" />
                  <span>Preview Automation</span>
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="pt-8 border-t border-zinc-200 dark:border-zinc-900/60 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-zinc-500 w-full"
              >
                <SecurityTrustBanner />
              </motion.div>
            </motion.div>

            {/* Interactive SaaS Studio Console Panel */}
            <div className="col-span-1 lg:col-span-7 w-full overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative w-full" style={{ y: y1 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-indigo-600 rounded-2xl blur-xl opacity-30 pointer-events-none -z-10"></div>
                <VelorOpsStudio />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Section: Facebook Automation System Architecture */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 overflow-hidden relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Visual illustration framed with extreme developer polish */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-all pointer-events-none"></div>
              
              <div className="relative bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 overflow-hidden shadow-2xl transition-colors duration-300">
                <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100 dark:border-zinc-900 mb-3 text-xs text-zinc-500 font-mono transition-colors duration-300">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors"></span>
                    <span className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors"></span>
                    <span className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors"></span>
                  </div>
                  <span>fb_automation_infrastructure_payload.png</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </div>
                
                <motion.div style={{ y: parallaxY }} className="relative animate-pulse-subtle">
                  <img 
                    src={fbAutomationIllustration} 
                    alt="VelorOps Facebook video automation flow diagram and tech architecture visual representation" 
                    className="w-full h-auto rounded-xl object-cover hover:scale-[1.01] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Annotation Badges overlay */}
                <div className="absolute top-16 right-6 bg-white/90 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 transform rotate-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Live Sync</span>
                </div>
                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md p-3.5 rounded-xl shadow-xl flex items-center gap-3 transition-colors duration-300">
                  <div className="h-8.5 w-8.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Server className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-900 dark:text-white">VelorOps Automation Engine</span>
                    <span className="block text-[10px] text-zinc-500">Official Graph API v19.0 Integration</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Architectural Highlights */}
            <div className="col-span-1 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start mx-auto lg:mx-0 max-w-2xl lg:max-w-none w-full overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider transition-colors duration-300">
                <Zap className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                High-Performance Automation
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight transition-colors duration-300">
                Engineering Zero-Lag Publishing Protocols
              </h2>
              
              <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed text-center lg:text-left transition-colors duration-300">
                Most platforms schedule videos by running continuous server cron jobs that overload and lead to frequent failures. VelorOps leverages native Meta Graph endpoints to offload queue schedules straight to Facebook servers. 
              </p>

              <div className="space-y-4 pt-4 text-left">
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5 transition-colors duration-300">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Pre-Authorized Chunked Uploads</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 transition-colors duration-300">Easily push heavy 4K videos up to 4GB. Our secure background queue handles chunked uploads automatically.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5 transition-colors duration-300">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Encryption Key Rotation</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 transition-colors duration-300">Security-first. Your access tokens are refreshed using randomized salt vectors and encrypted with rotating military-grade hashes.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SystemStatusSection />
      <WorkflowCarousel />
      <StatsSection />
      <NetworkVolumeChart />
      <VideoTestimonialsSection />
      <ImpactMetrics />

      <ShareSocial />
      <FacebookPreviewPanel isOpen={isPreviewPanelOpen} onClose={() => setIsPreviewPanelOpen(false)} />

      {/* Onboarding Product Tour Modal */}
      <AnimatePresence>
        {isOnboardingVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md"
              onClick={() => {
                setIsOnboardingVideoOpen(false);
                setOnboardingStep(0);
              }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 flex flex-col md:flex-row h-[520px] md:h-[450px]"
            >
              <button 
                onClick={() => {
                  setIsOnboardingVideoOpen(false);
                  setOnboardingStep(0);
                }}
                className="absolute top-4 right-4 z-50 p-2 bg-zinc-800/80 hover:bg-zinc-700/85 text-zinc-400 hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Close walkthrough"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Sidebar: Step progress tracker list */}
              <div className="w-full md:w-64 bg-zinc-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800 shrink-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">VelorOps Tour</h3>
                    <p className="text-xs text-zinc-400 mt-1">Four steps to absolute automation.</p>
                  </div>
                  <nav className="space-y-2.5 hidden md:block">
                    {[
                      { num: "01", name: "Authentication" },
                      { num: "02", name: "Chunked Uploads" },
                      { num: "03", name: "AI Cap & Hashtags" },
                      { num: "04", name: "Reliable Scheduler" }
                    ].map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setOnboardingStep(idx)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs transition-all ${
                          onboardingStep === idx
                            ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 border border-transparent"
                        }`}
                      >
                        <span className="font-mono text-[10px] opacity-70">{step.num}</span>
                        <span>{step.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono mt-4 md:mt-0">
                  <span>VELOROPS OS v2.0</span>
                  <span>{onboardingStep + 1} / 4</span>
                </div>
              </div>

              {/* Step Content Slide */}
              <div className="flex-grow p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={onboardingStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5 flex-1 flex flex-col justify-center"
                  >
                    {[
                      {
                        title: "Secure Graph API Integration",
                        description: "Connect your official Facebook account using Meta's standard OAuth protocols. Your user access tokens are refreshed using randomized salt vectors and locked with 32-byte military-grade database encryption at rest.",
                        icon: <Facebook className="w-12 h-12 text-indigo-500" />,
                        tag: "STEP 1: SECURE AUTHENTICATION",
                        highlights: ["AES-256 GCM Key Rotation", "Official Meta Graph API", "One-Click Token Health Check"]
                      },
                      {
                        title: "Chunked High-Definition Uploads",
                        description: "VelorOps takes heavy 4K content streams of up to 4GB and partitions them into chunked background tasks. This guarantees seamless publishing with automatic network resume, so you never lose connection during long video uploads.",
                        icon: <Upload className="w-12 h-12 text-indigo-500" />,
                        tag: "STEP 2: HIGH-SPEED INGESTION",
                        highlights: ["Network Fault Recovery", "Saves up to 4GB per file", "Optimized Video Transcoding Preview"]
                      },
                      {
                        title: "Context-Aware AI Captions",
                        description: "Optimize metadata and caption keywords using built-in Gemini API templates. Easily adjust writing tones, add hashtag suggestions, correct grammar, and translate copy to match local demographic patterns in real time.",
                        icon: <Sparkles className="w-12 h-12 text-indigo-500" />,
                        tag: "STEP 3: CONTENT ENRICHMENT",
                        highlights: ["Instant Sentiment Analyzer", "Smart Hashtag & Emoji Inserter", "Multi-Language Localization"]
                      },
                      {
                        title: "Offloaded Background Scheduler",
                        description: "Avoid local browser timers. VelorOps uploads and structures queues natively onto Facebook's servers. Our continuous background runner takes over, giving you real-time latency diagnostics and instant webhook delivery alerts.",
                        icon: <Server className="w-12 h-12 text-indigo-500" />,
                        tag: "STEP 4: ROBUST DEPLOYMENT",
                        highlights: ["Server-Authoritative Calendars", "Real-Time Webhook Diagnostics", "Low-Latency Cron Monitoring"]
                      }
                    ].map((step, idx) => onboardingStep === idx && (
                      <React.Fragment key={idx}>
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-zinc-800 rounded-2xl border border-zinc-700/60 shrink-0">
                            {step.icon}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-wider block mb-0.5">{step.tag}</span>
                            <h4 className="text-xl font-bold text-white tracking-tight">{step.title}</h4>
                          </div>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                          {step.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {step.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                              <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800 mt-6 shrink-0">
                  <button
                    disabled={onboardingStep === 0}
                    onClick={() => setOnboardingStep(prev => prev - 1)}
                    className="flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors focus:outline-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <div className="flex gap-1.5 md:hidden">
                    {[0, 1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={`h-1.5 rounded-full transition-all ${
                          onboardingStep === dot ? "w-6 bg-indigo-500" : "w-1.5 bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>

                  {onboardingStep < 3 ? (
                    <button
                      onClick={() => setOnboardingStep(prev => prev + 1)}
                      className="flex items-center gap-1 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/10 transition-all focus:outline-none"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOnboardingVideoOpen(false);
                        setOnboardingStep(0);
                      }}
                      className="flex items-center gap-1 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/10 transition-all focus:outline-none"
                    >
                      <span>Get Started</span>
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top FAB */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl shadow-indigo-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/data-deletion" element={<DataDeletionPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
