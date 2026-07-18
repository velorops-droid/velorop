import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { SEO } from '../components/SEO';
import { useLayout } from '../components/MainLayout';

const FeatureComparisonTable = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [quickViewTier, setQuickViewTier] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'priority' | 'alphabetical'>('priority');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleSort = () => setSortOrder(prev => prev === 'priority' ? 'alphabetical' : 'priority');

  const quickViewData: Record<string, string[]> = {
    'Starter': ['1 Facebook Page connection', '30 Automated Video Posts per month', 'Basic email support'],
    'Pro': ['Up to 5 Facebook Page connections', 'Unlimited Automated Video Posts', 'AI-generated captions powered by Gemini'],
    'Agency': ['Unlimited Facebook Page connections', 'Custom Branding for all posts', 'Priority 24/7 dedicated support team']
  };

  const featuresList = [
    { name: 'Facebook Pages', starter: '1', pro: 'Up to 5', agency: 'Unlimited', core: true },
    { name: 'Video Posts / Month', starter: '30', pro: 'Unlimited', agency: 'Unlimited', core: true },
    { name: 'AI Captions', starter: '-', pro: 'check', agency: 'check', core: false },
    { name: 'Custom Branding', starter: '-', pro: '-', agency: 'check', core: false },
    { name: 'Priority Support', starter: '-', pro: 'check', agency: 'check', core: false }
  ];

  const sortedFeatures = [...featuresList].sort((a, b) => {
    if (sortOrder === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    return 0; // maintain initial priority order
  });

  return (
    <div className="mt-24 w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 px-4">
        <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">Detailed Feature Comparison</h3>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <button 
            onClick={toggleSort}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all"
          >
            Sort: {sortOrder === 'priority' ? 'Priority' : 'Alphabetical'}
          </button>
          <button 
            onClick={toggleCollapse}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {isCollapsed ? <><ChevronDown className="w-4 h-4" /> Show All Features</> : <><ChevronUp className="w-4 h-4" /> Hide Details</>}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto px-4">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="py-4 px-6 text-zinc-900 dark:text-white font-semibold">Features</th>
              <th className="py-4 px-6 text-center text-zinc-900 dark:text-white font-semibold">
                Starter
                <button onClick={() => setQuickViewTier('Starter')} className="block mx-auto mt-2 text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Quick View</button>
              </th>
              <th className="py-4 px-6 text-center text-zinc-900 dark:text-white font-semibold bg-indigo-50/50 dark:bg-indigo-900/10 rounded-t-xl">
                Pro
                <button onClick={() => setQuickViewTier('Pro')} className="block mx-auto mt-2 text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Quick View</button>
              </th>
              <th className="py-4 px-6 text-center text-zinc-900 dark:text-white font-semibold">
                Agency
                <button onClick={() => setQuickViewTier('Agency')} className="block mx-auto mt-2 text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Quick View</button>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm relative">
            <AnimatePresence initial={false}>
              {sortedFeatures.map((feat, i) => {
                const isVisible = feat.core || !isCollapsed || isDesktop;
                
                return isVisible ? (
                  <motion.tr 
                    layout
                    key={feat.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, delay: (!isCollapsed && !feat.core && !isDesktop) ? i * 0.05 : 0 }}
                    className="border-b border-zinc-100 dark:border-zinc-800/50"
                  >
                    <td className={`py-4 px-6 text-zinc-600 dark:text-zinc-400 ${i === sortedFeatures.length - 1 ? 'rounded-bl-xl' : ''}`}>{feat.name}</td>
                    <td className={`py-4 px-6 text-center text-zinc-600 dark:text-zinc-400 font-medium`}>
                      {feat.starter === 'check' ? <Check className="w-5 h-5 mx-auto text-indigo-500" /> : feat.starter}
                    </td>
                    <td className={`py-4 px-6 text-center text-zinc-900 dark:text-white font-medium bg-indigo-50/50 dark:bg-indigo-900/10 ${i === sortedFeatures.length - 1 ? 'rounded-b-xl' : ''}`}>
                      {feat.pro === 'check' ? <Check className="w-5 h-5 mx-auto text-indigo-500" /> : feat.pro}
                    </td>
                    <td className={`py-4 px-6 text-center text-zinc-600 dark:text-zinc-400 font-medium ${i === sortedFeatures.length - 1 ? 'rounded-br-xl' : ''}`}>
                      {feat.agency === 'check' ? <Check className="w-5 h-5 mx-auto text-indigo-500" /> : feat.agency}
                    </td>
                  </motion.tr>
                ) : null;
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Quick View Slide-over */}
      <AnimatePresence>
        {quickViewTier && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/40 dark:bg-zinc-900/60 backdrop-blur-sm"
              onClick={() => setQuickViewTier(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm h-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white">{quickViewTier} Plan</h4>
                <button 
                  onClick={() => setQuickViewTier(null)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-6 flex-1">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase">Top Benefits</p>
                <ul className="space-y-4">
                  {quickViewData[quickViewTier].map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 p-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button 
                  onClick={() => setQuickViewTier(null)}
                  className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-bold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PricingPage() {
  const { setIsAgencyModalOpen } = useLayout();
  const [isAnnual, setIsAnnual] = useState(false);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-16 transition-colors duration-300">
      <SEO 
        title="Pricing | VelorOps"
        description="Choose the plan that fits your video workflow automation scale. Starter, Pro, and custom Agency tiers."
        path="/pricing"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 transition-colors duration-300 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg font-light text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 transition-colors duration-300">
            Stop wasting hours manually posting. Automate your workflow for less than the cost of a coffee.
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>
              Yearly <span className="text-green-500 dark:text-green-400 text-xs ml-1 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full font-bold">Save 20%</span>
            </span>
          </div>
        </motion.div>

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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10"
        >
          {/* Starter Plan */}
          <TiltCard 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Starter</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">Perfect for individual creators.</p>
            <div className="mb-6 relative h-16 flex flex-col justify-center">
              <div>
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">${isAnnual ? '7' : '9'}</span>
                <span className="text-zinc-500 dark:text-zinc-400">/mo</span>
              </div>
              <AnimatePresence>
                {isAnnual && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute bottom-0 translate-y-full mt-1 text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full"
                  >
                    Save 22% annually
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>1 Facebook Page</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>30 Video Posts / month</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>Standard Support</span>
              </li>
            </ul>
            <button className="w-full py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              Get Started
            </button>
          </TiltCard>

          {/* Pro Plan */}
          <TiltCard 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="glass-card rounded-3xl p-8 border-indigo-500/50 relative transform md:-translate-y-4 hover:-translate-y-6 transition-all duration-300 before:absolute before:-inset-px before:rounded-[25px] before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-indigo-500 before:opacity-30 before:blur-sm before:animate-pulse before:-z-10 bg-white/60 dark:bg-zinc-900/60"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent rounded-3xl pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              Most Popular
            </div>
            <h3 className="relative z-10 text-xl font-bold text-zinc-900 dark:text-white mb-2">Pro</h3>
            <p className="relative z-10 text-zinc-600 dark:text-zinc-400 text-sm mb-6">For growing brands and businesses.</p>
            <div className="relative z-10 mb-6 h-16 flex flex-col justify-center">
              <div>
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">${isAnnual ? '24' : '29'}</span>
                <span className="text-zinc-500 dark:text-zinc-400">/mo</span>
              </div>
              <AnimatePresence>
                {isAnnual && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute bottom-0 translate-y-full mt-1 text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full"
                  >
                    Save 17% annually
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <ul className="relative z-10 space-y-4 mb-8">
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>Up to 5 Facebook Pages</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>Unlimited Video Posts</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 group relative">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span className="cursor-help border-b border-dashed border-zinc-400 dark:border-zinc-600">AI-generated captions</span>
                <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Automatically generate engaging, context-aware captions powered by Gemini AI, optimizing your posts for higher reach.
                  <div className="absolute -bottom-1 left-8 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45"></div>
                </div>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>Advanced Analytics</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>Priority Support</span>
              </li>
            </ul>
            <button className="relative z-10 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5">
              Start Free Trial
            </button>
          </TiltCard>

          {/* Agency Plan */}
          <TiltCard 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Agency</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">For teams managing multiple clients.</p>
            <div className="mb-6 relative h-16 flex flex-col justify-center">
              <div>
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">${isAnnual ? '79' : '99'}</span>
                <span className="text-zinc-500 dark:text-zinc-400">/mo</span>
              </div>
              <AnimatePresence>
                {isAnnual && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute bottom-0 translate-y-full mt-1 text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full"
                  >
                    Save 20% annually
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>Unlimited Facebook Pages</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>Unlimited Video Posts</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>Team Members (Up to 5)</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <span>24/7 Dedicated Support</span>
              </li>
            </ul>
            <button 
              onClick={() => setIsAgencyModalOpen(true)}
              className="w-full py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Request Enterprise Demo
            </button>
          </TiltCard>
        </motion.div>

        <FeatureComparisonTable />
      </div>
    </div>
  );
}
