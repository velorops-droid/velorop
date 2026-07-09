import { useState, useEffect } from 'react';
import { Facebook, Clock, Video, ShieldCheck, Menu, X, ArrowRight, Star, ChevronDown, ChevronUp, MessageSquare, Moon, Sun, Check, AlertCircle, Download, Monitor } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Toast } from './components/Toast';
import { LoadingOverlay } from './components/LoadingOverlay';
import { FeaturesSection, ArchitectureSection, AudienceSection, RoadmapSection } from './components/Sections';
import { VelorOpsLogo } from './components/Logo';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  type Theme = 'light' | 'dark' | 'system';
  const [themeMode, setThemeMode] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  // New features
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const maxMessageLength = 500;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dark mode auto system mode logic
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      const shouldBeDark = themeMode === 'dark' || (themeMode === 'system' && e.matches);
      
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme(mediaQuery);

    const listener = (e: MediaQueryListEvent) => applyTheme(e);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [themeMode]);

  const toggleTheme = () => {
    let nextTheme: Theme;
    if (themeMode === 'system') nextTheme = 'light';
    else if (themeMode === 'light') nextTheme = 'dark';
    else nextTheme = 'system';

    setThemeMode(nextTheme);
    if (nextTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', nextTheme);
    }
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
    { name: 'FAQ', href: '#faq' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const validateEmail = (val: string) => {
    setEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !emailRegex.test(val)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const faqs = [
    {
      question: "What are the limitations of the Facebook Graph API?",
      answer: "The Facebook Graph API has rate limits to prevent spam. VelorOps automatically manages these limits by intelligently spacing out your automated posts, ensuring you stay within Facebook's guidelines and keep your account safe."
    },
    {
      question: "How secure is my account information?",
      answer: "Your security is our top priority. We use 32-byte military-grade encryption for all access tokens. We never store your Facebook password, and you can revoke our access at any time directly from your Facebook settings."
    },
    {
      question: "Can I manage multiple Facebook Pages?",
      answer: "Yes! Depending on your subscription plan, you can connect and automate video posting for multiple Facebook Pages from a single VelorOps dashboard."
    },
    {
      question: "What happens if I cancel my subscription?",
      answer: "If you cancel, your automated posts will continue until the end of your billing cycle. After that, your data is securely stored for 30 days before being permanently deleted, allowing you time to resubscribe without losing your setup."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Social Media Manager",
      content: "VelorOps has completely transformed our workflow. We schedule a month's worth of video content in just a few hours. The reliability of the API integration is unmatched.",
      rating: 5
    },
    {
      name: "Marcus Thorne",
      role: "Content Creator",
      content: "I was always worried about third-party apps getting my account banned. VelorOps' transparency and adherence to Meta's security policies give me total peace of mind.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Digital Marketing Agency Owner",
      content: "Managing video content for 10+ clients used to be a nightmare. VelorOps streamlined everything. The interface is clean, and the automated posting just works.",
      rating: 5
    }
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
      <Helmet>
        <title>VelorOps - Automate Your Facebook Videos</title>
        <meta name="description" content="VelorOps: The ultimate platform for scheduling, managing, and automating your Facebook video content." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://velorops.com/" />
        <meta property="og:title" content="VelorOps - Automate Your Facebook Videos" />
        <meta property="og:description" content="VelorOps: The ultimate platform for scheduling, managing, and automating your Facebook video content." />
        <meta property="og:image" content="https://velorops.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://velorops.com/" />
        <meta property="twitter:title" content="VelorOps - Automate Your Facebook Videos" />
        <meta property="twitter:description" content="VelorOps: The ultimate platform for scheduling, managing, and automating your Facebook video content." />
        <meta property="twitter:image" content="https://velorops.com/og-image.jpg" />
      </Helmet>
      
      <LoadingOverlay isLoading={isLoading} />
      <Toast 
        message={toastMessage} 
        isOpen={isToastOpen} 
        onClose={() => setIsToastOpen(false)} 
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <VelorOpsLogo className="h-16 w-auto" />
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-2 py-1"
                >
                  {link.name}
                </a>
              ))}
              
              <button 
                onClick={toggleTheme} 
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110 rounded-full transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 overflow-hidden relative flex items-center justify-center w-9 h-9"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={themeMode}
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute flex items-center justify-center"
                  >
                    {themeMode === 'light' ? <Sun className="w-5 h-5" /> : themeMode === 'dark' ? <Moon className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </button>
              <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm shadow-blue-200 dark:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
                <Facebook className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme} 
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110 rounded-full transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 overflow-hidden relative flex items-center justify-center w-9 h-9"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={themeMode}
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute flex items-center justify-center"
                  >
                    {themeMode === 'light' ? <Sun className="w-5 h-5" /> : themeMode === 'dark' ? <Moon className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </button>
              <button
                className="p-2 text-slate-600 dark:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 overflow-hidden transition-colors duration-300"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <button className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                  <Facebook className="w-5 h-5" />
                  <span>Login with Facebook</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-700 dark:text-blue-400 text-sm font-medium mb-8 transition-colors duration-300">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
            Official Facebook Graph API Integration
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 max-w-4xl mx-auto leading-tight transition-colors duration-300">
            Automate Your Facebook Videos with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">VelorOps</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Save hours of manual work. Schedule, manage, and auto-post your video content to Facebook while maximizing engagement and reach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-200 dark:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
              <Facebook className="w-6 h-6" />
              <span>Login with Facebook</span>
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
              <Download className="w-6 h-6" />
              <span>Download Desktop App</span>
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Secure, compliant, and verified by Facebook.</p>
        </motion.div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none transition-colors duration-300"></div>
      </section>

      <FeaturesSection />
      <ArchitectureSection />
      <AudienceSection />
      <RoadmapSection />

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Trusted by Creators and Agencies</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">See how VelorOps is saving time and boosting engagement for our users.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * (index + 1) } }
                }}
                className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full transition-colors duration-300"
              >
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic flex-grow mb-6 transition-colors duration-300">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white transition-colors duration-300">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 transition-colors duration-300">
              Stop wasting hours manually posting. Automate your workflow for less than the cost of a coffee.
            </p>
            
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                role="switch"
                aria-checked={isAnnual}
                aria-label="Toggle annual billing"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                Yearly <span className="text-green-500 dark:text-green-400 text-xs ml-1 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">Save 20%</span>
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
              }}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Perfect for individual creators.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">${isAnnual ? '7' : '9'}</span>
                <span className="text-slate-500 dark:text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>1 Facebook Page</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>30 Video Posts / month</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Standard Support</span>
                </li>
              </ul>
              <button className="w-full py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-blue-500 relative shadow-xl shadow-blue-100 dark:shadow-none transition-colors duration-300 transform md:-translate-y-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">For growing brands and businesses.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">${isAnnual ? '24' : '29'}</span>
                <span className="text-slate-500 dark:text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Up to 5 Facebook Pages</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Unlimited Video Posts</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <button className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 shadow-md">
                Start Free Trial
              </button>
            </motion.div>

            {/* Agency Plan */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
              }}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Agency</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">For teams managing multiple clients.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">${isAnnual ? '79' : '99'}</span>
                <span className="text-slate-500 dark:text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Unlimited Facebook Pages</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Unlimited Video Posts</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Team Members (Up to 5)</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>24/7 Dedicated Support</span>
                </li>
              </ul>
              <button className="w-full py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">Privacy Policy</h2>
            
            <div className="space-y-8 text-slate-700 dark:text-slate-300 transition-colors duration-300">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">1. Information Collection</h3>
                <p className="leading-relaxed">
                  To provide our video automation services, VelorOps collects specific information when you log in using Facebook. This includes your Public Profile, Email Address, and Facebook Access Tokens necessary to publish videos on your behalf.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">2. Data Usage & Security</h3>
                <p className="leading-relaxed">
                  We use your data <strong>exclusively</strong> for scheduling and automating your Facebook video posts. We do not sell, rent, or share your personal data with third parties. All access tokens and sensitive data are secured using 32-byte military-grade encryption at rest within our databases.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3 transition-colors duration-300">3. Data Deletion Instructions</h3>
                <p className="mb-4">You have full control over your data. To remove VelorOps and delete your data:</p>
                <ol className="list-decimal pl-5 space-y-2 mb-4 font-medium text-slate-800 dark:text-slate-200 transition-colors duration-300">
                  <li>Go to your Facebook Account Settings.</li>
                  <li>Navigate to <strong>Security and Login</strong> {'>'} <strong>Apps and Websites</strong>.</li>
                  <li>Find "VelorOps" in the list of active apps.</li>
                  <li>Click <strong>Remove</strong> to revoke all access.</li>
                </ol>
                <p>
                  To request a complete and permanent wipe of your database records from our servers, please contact us. We will process your request within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Terms of Service Section */}
      <section id="terms" className="py-24 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">Terms of Service</h2>
            
            <div className="space-y-8 text-slate-700 dark:text-slate-300 transition-colors duration-300">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">1. General App Usage</h3>
                <p className="leading-relaxed">
                  By accessing and using VelorOps, you agree to these Terms of Service. VelorOps is provided as a tool to assist with video scheduling and automation. You are responsible for the content you upload and schedule through our platform.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">2. Facebook Integration Rules</h3>
                <p className="leading-relaxed">
                  VelorOps utilizes the official Facebook Graph API. As a user of our service, you must strictly follow Facebook's Community Standards and Terms of Service. Any violation of Meta's policies (including spamming, hate speech, or prohibited content) will result in immediate termination of your VelorOps account.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">3. Limitation of Liability</h3>
                <p className="leading-relaxed">
                  VelorOps is provided "as is". We are not liable for any temporary suspensions, reach limitations, or account restrictions placed on your Facebook account by Meta. We do not guarantee specific engagement metrics or uninterrupted service availability.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors duration-300">Got questions? We've got answers.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 * index } }
                }}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                  aria-expanded={openFaqIndex === index}
                >
                  <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 transition-colors duration-300" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 transition-colors duration-300" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute flex items-center justify-center"
                    >
                      <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4 transition-colors duration-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 border-t border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <VelorOpsLogo className="h-14 w-auto" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#privacy" 
                onClick={(e) => scrollToSection(e, '#privacy')}
                className="px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 dark:hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                onClick={(e) => scrollToSection(e, '#terms')}
                className="px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 dark:hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Terms of Service
              </a>
            </div>

            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              aria-haspopup="dialog"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} VelorOps. All rights reserved.</p>
            <p className="mt-2 text-slate-500">Not affiliated with or endorsed by Meta Platforms, Inc.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsContactModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md overflow-hidden z-10 transition-colors duration-300"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
                <h3 id="modal-title" className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Contact Support</h3>
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <form className="space-y-4" onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (!emailError && email && message) {
                    setIsContactModalOpen(false); 
                    setToastMessage('Message sent successfully!');
                    setIsToastOpen(true);
                    setEmail('');
                    setMessage('');
                  }
                }}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'} bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all`} 
                        placeholder="you@example.com" 
                        aria-invalid={emailError ? "true" : "false"}
                        aria-describedby={emailError ? "email-error" : undefined}
                      />
                      {emailError && (
                        <div className="absolute right-3 top-2.5 text-red-500">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    {emailError && <p id="email-error" className="mt-1 text-xs text-red-500">{emailError}</p>}
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Message</label>
                      <span className={`text-xs ${message.length > maxMessageLength ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
                        {message.length} / {maxMessageLength}
                      </span>
                    </div>
                    <textarea 
                      id="message" 
                      required 
                      rows={4} 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${message.length > maxMessageLength ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'} bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none`} 
                      placeholder="How can we help you?"
                      aria-invalid={message.length > maxMessageLength ? "true" : "false"}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!!emailError || message.length > maxMessageLength || !email || !message}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
