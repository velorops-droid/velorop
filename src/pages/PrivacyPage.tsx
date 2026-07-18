import React from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Lock } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function PrivacyPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 transition-colors duration-300">
      <SEO 
        title="Privacy Policy | VelorOps"
        description="Learn about what data we collect, why we collect it, and how we encrypt and protect your Facebook access tokens."
        path="/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-4 border border-indigo-100 dark:border-indigo-900/30">
            <Shield className="w-8 h-8 animate-pulse-subtle" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">Privacy Policy</h1>
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
                <Eye className="w-5 h-5 text-indigo-500" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">1. Information Collection</h2>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                To provide our video automation services, VelorOps collects specific information when you log in using Facebook. This includes your Public Profile, Email Address, and Facebook Access Tokens necessary to publish videos on your behalf. We only request the minimum permissions needed to schedule, upload, and format your video posts.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-indigo-500" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Data Usage & Security</h2>
              </div>
              <p className="leading-relaxed text-sm sm:text-base">
                We use your data <strong>exclusively</strong> for scheduling and automating your Facebook video posts. We do not sell, rent, or share your personal data with third parties. All access tokens and sensitive data are secured using 32-byte military-grade encryption at rest within our databases.
              </p>
            </div>

            <div className="bg-indigo-50 dark:bg-zinc-950/40 p-6 rounded-2xl border border-indigo-100 dark:border-zinc-800/50">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-3">3. Data Deletion Instructions</h3>
              <p className="mb-4 text-sm leading-relaxed">You have full control over your data. To remove VelorOps and delete your data:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4 font-medium text-zinc-800 dark:text-zinc-200 text-sm">
                <li>Go to your Facebook Account Settings.</li>
                <li>Navigate to <strong>Security and Login</strong> &gt; <strong>Apps and Websites</strong>.</li>
                <li>Find "VelorOps" in the list of active apps.</li>
                <li>Click <strong>Remove</strong> to revoke all access.</li>
              </ol>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                To request a complete and permanent wipe of your database records from our servers, please contact us. We will process your request within 48 hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
