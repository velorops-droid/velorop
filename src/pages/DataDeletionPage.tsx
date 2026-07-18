import React from 'react';
import { SEO } from '../components/SEO';
import { ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function DataDeletionPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 transition-colors duration-300">
      <SEO 
        title="Data Deletion Instructions | VelorOps"
        description="Instructions on how to request data deletion for VelorOps Facebook integration."
        path="/data-deletion"
      />

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl mb-4 border border-rose-100 dark:border-rose-900/30">
            <ShieldCheck className="w-8 h-8 animate-pulse-subtle" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">Data Deletion Policy</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light">Instructions on how to remove your app activities and wipe your records.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800/80 shadow-sm transition-colors duration-300"
        >
          <div className="space-y-6 text-zinc-600 dark:text-zinc-300">
            <p className="text-sm sm:text-base leading-relaxed">
              VelorOps takes your privacy seriously. According to Facebook's Platform Terms, we provide a way for users to request the deletion of their personal data.
            </p>
            
            <p className="text-sm sm:text-base leading-relaxed">
              If you want to remove your activities and data associated with the VelorOps app on Facebook, please follow these instructions:
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 my-8">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Steps to Remove Your Data:</h3>
              <ol className="list-decimal pl-5 space-y-4 text-sm">
                <li>Go to your Facebook Account's <strong>Settings & Privacy</strong>. Click on <strong>Settings</strong>.</li>
                <li>Look for <strong>Apps and Websites</strong> and you will see all of the apps and websites you linked with your Facebook.</li>
                <li>Search for and click on <strong>VelorOps</strong> in the list.</li>
                <li>Scroll down and click the <strong>Remove</strong> button.</li>
                <li>
                  Congratulations, you have successfully removed your app activities and data. 
                  If you wish to ensure that all cached data within our systems is fully wiped immediately, you may also email us directly at <strong>velorops@gmail.com</strong> with your request.
                </li>
              </ol>
            </div>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">What happens when I delete my data?</h2>
            <p className="text-sm leading-relaxed">
              Once you remove the app or request data deletion, we will purge all associated Facebook account information, access tokens, and scheduled posts from our databases within 7 days. Analytics and aggregated statistics may remain but will be completely anonymized and detached from your personal identity.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-850">
              <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
              <div className="text-sm">
                <span className="font-semibold text-zinc-900 dark:text-white">Email Support:</span>{' '}
                <a href="mailto:velorops@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  velorops@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
