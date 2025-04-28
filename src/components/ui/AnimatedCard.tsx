
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  glassEffect?: boolean;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  delay = 0,
  hoverEffect = true,
  glassEffect = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'rounded-2xl p-6 transition-all duration-500 ease-out backdrop-blur-sm',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        hoverEffect && 'hover:shadow-[0_0_30px_rgba(51,195,240,0.15)] hover:-translate-y-2 hover:bg-white/90 dark:hover:bg-bubbles-deep/90',
        glassEffect ? 'bg-white/40 dark:bg-bubbles-deep/40' : 'bg-white/80 dark:bg-bubbles-deep/80 shadow-[0_0_20px_rgba(51,195,240,0.1)]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
