import React from 'react';
import { Twitter, Linkedin, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export function ShareSocial() {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://velorops.com';
  const shareText = "Check out VelorOps - Automate your Facebook Video scheduling seamlessly!";
  
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent('VelorOps Video Automation')}&summary=${encodeURIComponent(shareText)}`;

  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
            <Share2 className="w-5 h-5 text-indigo-500" />
            <h3 className="text-xl font-bold">Love VelorOps? Share it with your network!</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-full font-medium transition-colors shadow-sm hover:shadow-md"
            >
              <Twitter className="w-5 h-5" />
              Share on Twitter
            </a>
            
            <a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full font-medium transition-colors shadow-sm hover:shadow-md"
            >
              <Linkedin className="w-5 h-5" />
              Share on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
