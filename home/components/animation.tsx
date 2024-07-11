"use client"
import { forwardRef } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

const AnimationComponent = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  function AnimationComponent({ children, ...props }, ref) {
    return (
      <motion.div ref={ref} {...props}>
        {children}
      </motion.div>
    );
  }
);

AnimationComponent.displayName = 'AnimationComponent';

export { AnimationComponent };