
// Animation utility variables and functions for consistent animations across the app

export const transitionDurations = {
  fast: 0.15,
  default: 0.3,
  slow: 0.5
};

export const transitionEasing = {
  default: 'ease-out',
  easeIn: 'ease-in',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

export const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: transitionDurations.default,
      ease: transitionEasing.default
    }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: transitionDurations.default,
      ease: transitionEasing.default
    }
  }
};

export const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: transitionDurations.default,
      ease: transitionEasing.default
    }
  }
};

export const staggerChildren = (staggerDelay = 0.1) => ({
  visible: {
    transition: {
      staggerChildren: staggerDelay
    }
  }
});

export const hoverScale = {
  scale: 1.03,
  transition: {
    duration: transitionDurations.fast,
    ease: transitionEasing.default
  }
};

export const pressScale = {
  scale: 0.97,
  transition: {
    duration: transitionDurations.fast,
    ease: transitionEasing.easeIn
  }
};

// Animation hooks for common patterns
export const pageTransition = {
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  variants: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }
};

// Card and panel hover effects
export const panelHoverEffect = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: transitionDurations.default,
      ease: transitionEasing.easeInOut
    }
  }
};
