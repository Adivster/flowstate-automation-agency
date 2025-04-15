
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {isDark && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%)'
          }}
        />
      )}
      
      {!isDark && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, rgba(0, 0, 0, 0) 80%)'
          }}
        />
      )}
      
      {children}
    </motion.div>
  );
};

export default PageTransition;
