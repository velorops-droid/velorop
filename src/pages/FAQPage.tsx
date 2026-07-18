import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useLayout } from '../components/MainLayout';

export default function FAQPage() {
  const { setIsContactModalOpen } = useLayout();
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [faqCategory, setFaqCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the limitations of the Facebook Graph API?",
      answer: "The Facebook Graph API has rate limits to prevent spam. VelorOps automatically manages these limits by intelligently spacing out your automated posts, ensuring you stay within Facebook's guidelines and keep your account safe.",
      category: "Technical"
    },
    {
      question: "How secure is my account information?",
      answer: "Your security is our top priority. We use 32-byte military-grade encryption for all access tokens. We never store your Facebook password, and you can revoke our access at any time directly from your Facebook settings.",
      category: "Security"
    },
    {
      question: "Can I manage multiple Facebook Pages?",
      answer: "Yes! Depending on your subscription plan, you can connect and automate video posting for multiple Facebook Pages from a single VelorOps dashboard.",
      category: "General"
    },
    {
      question: "What happens if I cancel my subscription?",
      answer: "If you cancel, your automated posts will continue until the end of your billing cycle. After that, your data is securely stored for 30 days before being permanently deleted, allowing you time to resubscribe without losing your setup.",
      category: "Billing"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (faqCategory === 'All' || faq.category === faqCategory) &&
    (faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen py-16 transition-colors duration-300">
      <SEO 
        title="FAQ | VelorOps"
        description="Got questions about VelorOps? Browse through our technical, security, billing, and general FAQs."
        path="/faq"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 transition-colors duration-300 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg font-light text-zinc-600 dark:text-zinc-400 mb-8 transition-colors duration-300">Got questions? We've got answers.</p>
          
          {/* Search bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-sm"
              placeholder="Search FAQs..."
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'Technical', 'Security', 'Billing', 'General'].map(category => (
              <button
                key={category}
                onClick={() => {
                  setFaqCategory(category);
                  setOpenFaqIndex(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  faqCategory === category
                    ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQs Accordion */}
        <div className="space-y-4 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <motion.div 
                    key={faq.question}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-zinc-900 dark:text-white">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-4 text-sm">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">No results found matching your search.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <div className="bg-indigo-50 dark:bg-zinc-900/40 border border-indigo-100 dark:border-zinc-800 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Still have questions?</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 max-w-md mx-auto">We are here to support your automation journey. Get in touch with our friendly engineering team.</p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all focus:outline-none"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}
