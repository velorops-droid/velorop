import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Play, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface FacebookPreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FacebookPreviewPanel({ isOpen, onClose }: FacebookPreviewPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm cursor-pointer"
          />
          
          {/* Side Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-md h-full bg-zinc-50 dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  VO
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Creator Studio Preview</h2>
                  <p className="text-[10px] text-zinc-500">API Upload Visualization</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-zinc-100 dark:bg-zinc-950/50">
              
              {/* Status indicator */}
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg p-3 flex items-start gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-emerald-800 dark:text-emerald-400">Successfully Processed via API</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500/80 mt-1">This is how your automated post will appear to your audience on Facebook.</p>
                </div>
              </div>

              {/* Facebook Post Layout */}
              <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden font-sans">
                {/* Post Header */}
                <div className="p-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden border border-zinc-100 dark:border-zinc-600">
                       <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop&q=80" alt="Page Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-zinc-900 dark:text-[#E4E6EB] leading-tight">Your Page Name</h4>
                      <div className="flex items-center text-[12px] text-zinc-500 dark:text-[#B0B3B8]">
                        <span>Just now</span>
                        <span className="mx-1">·</span>
                        <span className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-[#B0B3B8] inline-block opacity-70" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\'/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\'/%3E%3C/svg%3E")' }}></span>
                      </div>
                    </div>
                  </div>
                  <button className="text-zinc-500 dark:text-[#B0B3B8] p-1">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Caption (Auto-generated by AI) */}
                <div className="px-4 pb-2 text-[14px] text-zinc-900 dark:text-[#E4E6EB]">
                  <p>Behind the scenes of our latest production! 🎬✨ Notice how smooth this workflow is? Automated scheduling makes all the difference. #Productivity #VideoProduction</p>
                </div>

                {/* Video Container */}
                <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80" alt="Video thumbnail" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30 cursor-pointer">
                      <Play className="w-8 h-8 text-white ml-1 fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-xs font-semibold">
                    1:24
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700/50 flex justify-between items-center text-[13px] text-zinc-500 dark:text-[#B0B3B8]">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center z-10 border border-white dark:border-[#242526]">
                      <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 24 24"><path d="M14 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1-4.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-4.3 11a5.5 5.5 0 0 1 10.6 0H8.7z"></path></svg>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center -ml-1.5 border border-white dark:border-[#242526]">
                      <Heart className="w-2.5 h-2.5 text-white fill-current" />
                    </div>
                    <span className="ml-1">You and 124 others</span>
                  </div>
                  <div className="flex gap-3">
                    <span>12 Comments</span>
                    <span>4 Shares</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-2 py-1 flex items-center justify-between">
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 text-[14px] text-zinc-500 dark:text-[#B0B3B8] font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-md transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1-4.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-4.3 11a5.5 5.5 0 0 1 10.6 0H8.7z"></path></svg>
                    Like
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 text-[14px] text-zinc-500 dark:text-[#B0B3B8] font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-md transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    Comment
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-1.5 text-[14px] text-zinc-500 dark:text-[#B0B3B8] font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-md transition-colors">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
              
              <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 mb-2">API Transparency</h4>
                <ul className="text-xs text-indigo-700 dark:text-indigo-400/80 space-y-1">
                  <li>• Post ID: <span className="font-mono bg-indigo-100 dark:bg-indigo-900/40 px-1 py-0.5 rounded">101594838271</span></li>
                  <li>• Resolution: 1080p HD</li>
                  <li>• Upload Time: 1.2s via VelorOps Pipeline</li>
                  <li>• Caption Source: Gemini AI 1.5 Pro</li>
                </ul>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
