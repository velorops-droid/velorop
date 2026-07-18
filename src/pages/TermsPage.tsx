import React from 'react';
import { motion } from 'motion/react';
import { FileText, Scale, ShieldAlert } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function TermsPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 transition-colors duration-300">
      <SEO 
        title="Terms of Service | VelorOps"
        description="Review our Terms of Service. Understand the rules for Facebook Graph API automation, account management, and liability."
        path="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-4 border border-indigo-100 dark:border-indigo-900/30">
            <FileText className="w-8 h-8 animate-pulse-subtle" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light">Last updated: July 2026</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800/80 shadow-sm transition-colors duration-300"
        >
          <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Scale className="w-5 h-5 text-indigo-500" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">1. General App Usage</h2>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                By accessing and using VelorOps, you agree to these Terms of Service. VelorOps is provided as a tool to assist with video scheduling and automation. You are responsible for the content you upload and schedule through our platform.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Facebook Integration Rules</h2>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                VelorOps utilizes the official Facebook Graph API. As a user of our service, you must strictly follow Facebook's Community Standards and Terms of Service. Any violation of Meta's policies (including spamming, hate speech, or prohibited content) will result in immediate termination of your VelorOps account.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="w-5 h-5 text-indigo-500" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">3. Limitation of Liability</h2>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                VelorOps is provided &quot;as is&quot;. We are not liable for any temporary suspensions, reach limitations, or account restrictions placed on your Facebook account by Meta. We do not guarantee specific engagement metrics or uninterrupted service availability.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
