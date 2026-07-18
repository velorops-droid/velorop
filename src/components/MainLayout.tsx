import React, { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Facebook, Menu, X, Star, ChevronDown, ChevronUp, MessageSquare, 
  Download, ExternalLink, Check, AlertCircle, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { VelorOpsLogo } from './Logo';
import { Toast } from './Toast';
import { LoadingOverlay } from './LoadingOverlay';

// Theme toggling icon
const ThemeToggleIcon = ({ theme }: { theme: 'light' | 'dark' }) => {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={{
        rotate: theme === 'dark' ? -90 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={theme === 'dark' ? "text-indigo-400" : "text-amber-400"}
    >
      <mask id="moon-mask">
        <rect x="0" y="0" width="24" height="24" fill="white" />
        <motion.circle
          cx="12"
          cy="12"
          r="6"
          fill="black"
          animate={{
            cx: theme === 'dark' ? 12 : 30,
            cy: theme === 'dark' ? 4 : -10,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </mask>
      <motion.circle
        cx="12"
        cy="12"
        animate={{
          r: theme === 'dark' ? 9 : 5,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        fill="currentColor"
        mask="url(#moon-mask)"
      />
      <motion.g
        stroke="currentColor"
        animate={{
          opacity: theme === 'dark' ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </motion.g>
    </motion.svg>
  );
};

// Tooltip for layout buttons
const NavTooltip = ({ children, text }: { children: React.ReactNode, text: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-48 p-2.5 bg-zinc-900 dark:bg-zinc-800 text-white text-[11px] rounded-lg shadow-xl z-50 pointer-events-none text-center leading-normal border border-zinc-700 font-sans"
          >
            {text}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-900 dark:border-b-zinc-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Layout context
interface LayoutContextType {
  setIsContactModalOpen: (open: boolean) => void;
  setIsAgencyModalOpen: (open: boolean) => void;
  setIsShortcutsModalOpen: (open: boolean) => void;
  setToastMessage: (msg: string) => void;
  setIsToastOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error('useLayout must be used within MainLayout');
  return context;
};

// ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [pathname]);
  return null;
}

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Modals
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  
  // Toasts / Overlays
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  
  // Email states
  const [emailValue, setEmailValue] = useState('');
  const [emailSubscribeStatus, setEmailSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactEmailError, setContactEmailError] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Agency Demo states
  const [agencyFormData, setAgencyFormData] = useState({ companySize: '', volume: '', email: '' });
  const [isAgencySubmitting, setIsAgencySubmitting] = useState(false);

  // Theme configuration
  type Theme = 'light' | 'dark';
  const [themeMode, setThemeMode] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Initialize application layout and load settings
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (((e.metaKey || e.ctrlKey) && e.key === 'k') || e.key === '/') {
        e.preventDefault();
        setIsContactModalOpen(true);
      }
      if (e.key === 'Escape') {
        setIsContactModalOpen(false);
        setIsAgencyModalOpen(false);
        setIsShortcutsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Reset contact success on modal close
  useEffect(() => {
    if (!isContactModalOpen) {
      setContactSuccess(false);
    }
  }, [isContactModalOpen]);

  const handleEmailSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue) return;
    setEmailSubscribeStatus('loading');
    setTimeout(() => {
      setEmailSubscribeStatus('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setEmailValue('');
      setTimeout(() => setEmailSubscribeStatus('idle'), 3000);
    }, 1000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmailError || !contactName || !contactEmail || !contactSubject || !contactMessage) return;
    setIsContactSubmitting(true);

    // Formulate a real "Send" mailto URL
    const mailtoUrl = `mailto:velorops@gmail.com,cto@velorops.com?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(
      `Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`
    )}`;

    console.log("Contact form submission logged for support (velorops@gmail.com, cto@velorops.com):", {
      name: contactName,
      email: contactEmail,
      subject: contactSubject,
      message: contactMessage,
      targetRecipients: ['velorops@gmail.com', 'cto@velorops.com']
    });

    // Open the user's default email client
    window.location.href = mailtoUrl;

    await new Promise(resolve => setTimeout(resolve, 800));
    setIsContactSubmitting(false);
    setContactSuccess(true);
    setToastMessage('Inquiry prepared for sending!');
    setIsToastOpen(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactMessage('');
  };

  const validateContactEmail = (val: string) => {
    setContactEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !emailRegex.test(val)) {
      setContactEmailError('Please enter a valid email address');
    } else {
      setContactEmailError('');
    }
  };

  const handleAgencySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyFormData.companySize || !agencyFormData.volume || !agencyFormData.email) return;
    setIsAgencySubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsAgencySubmitting(false);
    setIsAgencyModalOpen(false);
    setToastMessage('Enterprise Demo Request Submitted!');
    setIsToastOpen(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setAgencyFormData({ companySize: '', volume: '', email: '' });
  };

  // Primary navigation links (to dedicated separate pages)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <LayoutContext.Provider value={{
      setIsContactModalOpen,
      setIsAgencyModalOpen,
      setIsShortcutsModalOpen,
      setToastMessage,
      setIsToastOpen,
      setIsLoading,
      themeMode,
      toggleTheme
    }}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-indigo-500/20 selection:text-indigo-200 transition-colors duration-300">
        <LoadingOverlay isLoading={isLoading} />
        <Toast 
          message={toastMessage} 
          isOpen={isToastOpen} 
          onClose={() => setIsToastOpen(false)} 
        />

        {/* Navigation bar */}
        <nav className="fixed top-0 z-50 w-full bg-white/40 dark:bg-zinc-950/40 backdrop-blur-2xl border-b border-white/20 dark:border-zinc-800/30 shadow-lg shadow-indigo-500/5 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <Link to="/" className="flex items-center gap-2">
                <VelorOpsLogo className="h-16 w-auto animate-pulse-subtle" />
              </Link>
              
              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-3 py-1.5 ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                          : 'text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                
                <motion.button 
                  onClick={toggleTheme} 
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-full shadow-lg shadow-indigo-500/10 dark:shadow-indigo-500/5 hover:shadow-xl border border-zinc-200 dark:border-zinc-800/80 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 overflow-hidden relative flex items-center justify-center w-11 h-11"
                  aria-label="Toggle theme"
                >
                  <ThemeToggleIcon theme={themeMode} />
                </motion.button>
                <NavTooltip text="Download VelorOps Desktop App">
                  <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-900 dark:text-zinc-200 px-5 py-2.5 rounded-lg font-medium border border-zinc-200 dark:border-zinc-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </NavTooltip>
                <NavTooltip text="Secure Login via Meta">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md shadow-indigo-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                </NavTooltip>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-4">
                <motion.button 
                  onClick={toggleTheme} 
                  whileHover={{ y: -1, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-full shadow-lg shadow-indigo-500/10 dark:shadow-indigo-500/5 hover:shadow-xl border border-zinc-200 dark:border-zinc-805 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 overflow-hidden relative flex items-center justify-center w-11 h-11"
                  aria-label="Toggle theme"
                >
                  <ThemeToggleIcon theme={themeMode} />
                </motion.button>
                <button
                  className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md transition-colors"
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
                className="md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 px-4 pt-2 pb-4 space-y-1 overflow-hidden transition-all duration-300 text-zinc-900 dark:text-white"
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`block px-3 py-3 text-base font-semibold rounded-md transition-colors ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-2 flex flex-col gap-2">
                  <button className="w-full flex justify-center items-center gap-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-850 text-zinc-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors border border-zinc-200 dark:border-zinc-800">
                    <Download className="w-4 h-4" />
                    <span>Download Desktop App</span>
                  </button>
                  <button onClick={() => navigate('/dashboard')} className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                    <Facebook className="w-5 h-5" />
                    <span>Login with Facebook</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow pt-20">
          {location.pathname !== '/' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
              <nav className="flex items-center space-x-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home
                </Link>
                {location.pathname.split('/').filter(Boolean).map((segment, index, arr) => {
                  const url = `/${arr.slice(0, index + 1).join('/')}`;
                  const isLast = index === arr.length - 1;
                  const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
                  return (
                    <React.Fragment key={url}>
                      <span className="text-zinc-300 dark:text-zinc-700">/</span>
                      {isLast ? (
                        <span className="text-zinc-950 dark:text-zinc-100 font-semibold">{label}</span>
                      ) : (
                        <Link to={url} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {label}
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>
          )}
          <Outlet />
        </main>

        {/* Persistent Footer */}
        <footer className="bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 py-16 border-t border-zinc-200 dark:border-zinc-800/80 transition-colors duration-300 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
              <div className="md:col-span-3 flex flex-col items-start gap-4">
                <Link to="/" className="flex items-center gap-2">
                  <VelorOpsLogo className="h-14 w-auto" />
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 text-left">Automate your video posting and scaling with VelorOps.</p>
              </div>
              
              <div className="md:col-span-2 flex flex-col items-start">
                <h3 className="text-zinc-900 dark:text-white font-semibold mb-4">Product</h3>
                <div className="flex flex-col gap-3">
                  <NavLink 
                    to="/features" 
                    className={({ isActive }) => 
                      `text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`
                    }
                  >
                    Features
                  </NavLink>
                  <NavLink 
                    to="/pricing" 
                    className={({ isActive }) => 
                      `text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`
                    }
                  >
                    Pricing
                  </NavLink>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col items-start">
                <h3 className="text-zinc-900 dark:text-white font-semibold mb-4">Resources</h3>
                <div className="flex flex-col gap-3">
                  <NavLink 
                    to="/faq" 
                    className={({ isActive }) => 
                      `text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`
                    }
                  >
                    FAQ
                  </NavLink>
                  <button onClick={() => setIsContactModalOpen(true)} className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors text-left focus:outline-none">Support</button>
                  <button onClick={() => setIsAgencyModalOpen(true)} className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors text-left focus:outline-none">Enterprise Demo</button>
                  <button onClick={() => setIsShortcutsModalOpen(true)} className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors text-left focus:outline-none">Keyboard Shortcuts</button>
                  <a href="https://developers.facebook.com/docs/graph-api/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors">Graph API Docs <ExternalLink className="w-3 h-3" /></a>
                </div>
              </div>
              
              <div className="md:col-span-2 flex flex-col items-start">
                <h3 className="text-zinc-900 dark:text-white font-semibold mb-4">Legal</h3>
                <div className="flex flex-col gap-3">
                  <NavLink 
                    to="/privacy" 
                    className={({ isActive }) => 
                      `text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`
                    }
                  >
                    Privacy Policy
                  </NavLink>
                  <NavLink 
                    to="/terms" 
                    className={({ isActive }) => 
                      `text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`
                    }
                  >
                    Terms of Service
                  </NavLink>
                  <NavLink 
                    to="/data-deletion" 
                    className={({ isActive }) => 
                      `text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`
                    }
                  >
                    Data Deletion Policy
                  </NavLink>
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                      `text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`
                    }
                  >
                    Dashboard Login
                  </NavLink>
                </div>
              </div>

              <div className="md:col-span-3 flex flex-col items-start">
                <h3 className="text-zinc-900 dark:text-white font-semibold mb-4">VelorOps Weekly</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4 text-left">Get the latest product updates and automation strategies.</p>
                <form onSubmit={handleEmailSubscribe} className="w-full relative">
                  <div className="flex w-full">
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white dark:bg-zinc-850/60 border border-zinc-200 dark:border-zinc-800 rounded-l-lg px-4 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      disabled={emailSubscribeStatus !== 'idle'}
                      className={`px-4 py-2 rounded-r-lg text-sm font-medium transition-all duration-300 flex-shrink-0 min-w-[110px] flex justify-center items-center overflow-hidden relative ${
                        emailSubscribeStatus === 'success' 
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-70'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {emailSubscribeStatus === 'idle' && (
                          <motion.span
                            key="idle"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            Subscribe
                          </motion.span>
                        )}
                        {emailSubscribeStatus === 'loading' && (
                          <motion.span
                            key="loading"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </motion.span>
                        )}
                        {emailSubscribeStatus === 'success' && (
                          <motion.span
                            key="success"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            Done!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs transition-colors duration-300 text-zinc-400">
              <div>
                <p>&copy; {new Date().getFullYear()} VelorOps. All rights reserved.</p>
                <p className="mt-1 text-zinc-500">Not affiliated with or endorsed by Meta Platforms, Inc.</p>
              </div>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                aria-haspopup="dialog"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Support</span>
              </button>
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
                className="absolute inset-0 bg-zinc-900/40 dark:bg-zinc-900/60 backdrop-blur-sm"
                onClick={() => setIsContactModalOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-zinc-800/60 shadow-2xl overflow-hidden text-zinc-900 dark:text-white z-10 transition-colors duration-300"
                role="dialog"
                aria-labelledby="modal-title"
                aria-modal="true"
              >
                <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
                  <h3 id="modal-title" className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Support</h3>
                  <div className="flex items-center gap-3">
                    <kbd className="hidden sm:inline-flex items-center font-sans text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold uppercase">ESC</kbd>
                    <button 
                      onClick={() => setIsContactModalOpen(false)}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {contactSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 space-y-4"
                    >
                      <div className="mx-auto inline-flex p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-white">Message Prepared!</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        We have prepared your support inquiry and logged the data. Your default email client should now open to send the message to <strong>velorops@gmail.com</strong> and <strong>cto@velorops.com</strong>.
                      </p>
                      <button 
                        type="button"
                        onClick={() => {
                          setIsContactModalOpen(false);
                          setContactSuccess(false);
                        }}
                        className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        Dismiss
                      </button>
                    </motion.div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleContactSubmit}>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
                        <input 
                          type="text" 
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={contactEmail}
                          onChange={(e) => validateContactEmail(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border ${contactEmailError ? 'border-rose-500 focus:ring-rose-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-indigo-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
                          placeholder="you@example.com"
                        />
                        {contactEmailError && <p className="text-rose-500 text-xs mt-1">{contactEmailError}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Subject</label>
                        <input 
                          type="text" 
                          required
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                          placeholder="Inquiry subject"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Message</label>
                        <textarea 
                          required
                          rows={4}
                          maxLength={500}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
                          placeholder="How can we help you automate your video content?"
                        />
                        <div className="flex justify-end text-xs text-zinc-400 mt-1">
                          {contactMessage.length} / 500
                        </div>
                      </div>
                      <button 
                        type="submit"
                        disabled={isContactSubmitting || !!contactEmailError || !contactName || !contactEmail || !contactSubject || !contactMessage}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 flex justify-center items-center gap-2"
                      >
                        {isContactSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Agency Demo Modal */}
        <AnimatePresence>
          {isAgencyModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-zinc-900/40 dark:bg-zinc-900/60 backdrop-blur-sm"
                onClick={() => setIsAgencyModalOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-zinc-800/60 shadow-2xl overflow-hidden text-zinc-900 dark:text-white z-10 transition-colors duration-300"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Request Enterprise Demo</h3>
                  <button 
                    onClick={() => setIsAgencyModalOpen(false)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <form className="space-y-4" onSubmit={handleAgencySubmit}>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Work Email</label>
                      <input 
                        type="email" 
                        required
                        value={agencyFormData.email}
                        onChange={(e) => setAgencyFormData(prev => ({...prev, email: e.target.value}))}
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Company Size</label>
                      <select 
                        required
                        value={agencyFormData.companySize}
                        onChange={(e) => setAgencyFormData(prev => ({...prev, companySize: e.target.value}))}
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      >
                        <option value="">Select company size...</option>
                        <option value="1-5">1-5 employees</option>
                        <option value="6-20">6-20 employees</option>
                        <option value="21-100">21-100 employees</option>
                        <option value="101+">101+ employees</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Estimated Monthly Video Volume</label>
                      <select 
                        required
                        value={agencyFormData.volume}
                        onChange={(e) => setAgencyFormData(prev => ({...prev, volume: e.target.value}))}
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      >
                        <option value="">Select video volume...</option>
                        <option value="<100">Under 100 videos / mo</option>
                        <option value="100-500">100 - 500 videos / mo</option>
                        <option value="501-2000">501 - 2,000 videos / mo</option>
                        <option value="2000+">More than 2,000 videos / mo</option>
                      </select>
                    </div>
                    <button 
                      type="submit"
                      disabled={isAgencySubmitting}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 flex justify-center items-center gap-2"
                    >
                      {isAgencySubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request Demo'}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Shortcuts Modal */}
        <AnimatePresence>
          {isShortcutsModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-zinc-900/40 dark:bg-zinc-900/60 backdrop-blur-sm"
                onClick={() => setIsShortcutsModalOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl border border-zinc-200 dark:border-zinc-800/60 shadow-2xl overflow-hidden text-zinc-900 dark:text-white z-10 transition-colors duration-300"
                role="dialog"
                aria-labelledby="shortcuts-title"
                aria-modal="true"
              >
                <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
                  <h3 id="shortcuts-title" className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Keyboard Shortcuts</h3>
                  <button 
                    onClick={() => setIsShortcutsModalOpen(false)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">Open Support Chat</span>
                    <div className="flex items-center gap-1">
                      <kbd className="inline-flex items-center justify-center min-w-[32px] h-6 px-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-sans text-xs font-semibold shadow-sm">Ctrl</kbd>
                      <span className="text-zinc-400 text-xs">+</span>
                      <kbd className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-sans text-xs font-semibold shadow-sm">K</kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">Close Modals</span>
                    <kbd className="inline-flex items-center justify-center min-w-[32px] h-6 px-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-sans text-xs font-semibold shadow-sm uppercase">ESC</kbd>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </LayoutContext.Provider>
  );
}
