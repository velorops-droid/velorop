import { motion, AnimatePresence } from 'motion/react';
import { VelorOpsLogo } from './Logo';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[300] bg-white dark:bg-slate-950 flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="flex items-center justify-center mb-6"
          >
            <VelorOpsLogo className="w-24 h-12" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex flex-col items-center"
          >
            VelorOps
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-1">AI-Powered Social Media Operations</span>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-sm text-slate-500 dark:text-slate-400 mt-4"
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
