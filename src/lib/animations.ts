
import { Variants } from 'framer-motion';

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  out: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Staggered list item animations
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    }
  },
};

// Card hover animations
export const cardHoverVariants: Variants = {
  hover: { 
    y: -5, 
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 15
    }
  }
};

// Fade in element animation
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    }
  },
};

// Slide up animation
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

// Button hover animation
export const buttonHoverVariants: Variants = {
  hover: { 
    scale: 1.03,
    transition: { 
      duration: 0.2, 
      ease: 'easeInOut' 
    }
  },
  tap: { 
    scale: 0.97,
    transition: { 
      duration: 0.1, 
      ease: 'easeInOut' 
    }
  },
};

// Notification bell animation
export const bellVariants: Variants = {
  hover: {
    rotate: [0, 5, -5, 5, -5, 0],
    transition: { 
      duration: 0.5, 
      ease: 'easeInOut' 
    }
  }
};
