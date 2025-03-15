
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
        'rounded-2xl p-6 transition-all duration-500 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        hoverEffect && 'hover:shadow-medium hover:-translate-y-1 transition-all duration-300',
        glassEffect ? 'glass-card' : 'bg-white dark:bg-teddy-charcoal/90 shadow-soft',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
