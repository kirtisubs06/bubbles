
import { useEffect, useState } from 'react';

// Animation delay utility
export const staggeredChildren = (index: number, baseDelay = 100) => {
  return {
    animationDelay: `${index * baseDelay}ms`,
  };
};

// Animation with Intersection Observer hook
export function useIntersectionAnimation({ threshold = 0.2, delay = 0 }: { threshold: number; delay?: number }) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, delay]);

  return [setRef, isVisible] as const;
};

// For sequential animations
export const useSequentialAnimation = (
  totalItems: number,
  options = {
    initialDelay: 100,
    staggerDelay: 100,
    duration: 500,
  }
) => {
  return Array.from({ length: totalItems }).map((_, index) => ({
    style: {
      animationDelay: `${options.initialDelay + index * options.staggerDelay}ms`,
      animationDuration: `${options.duration}ms`,
    },
  }));
};

// Page transition animation hook
export const usePageTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const beginTransition = () => {
    setIsAnimating(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsAnimating(false);
        resolve();
      }, 500); // Match this to your animation duration
    });
  };

  return {
    isAnimating,
    beginTransition,
    transitionClass: isAnimating ? 'page-exit' : 'page-container',
  };
};
