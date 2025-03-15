
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!imageRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(20px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teddy-purple/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teddy-blue/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-teddy-purple/10 text-teddy-purple">
              <span className="animate-pulse-soft">✨</span>
              <span className="ml-2">Introducing AI-Powered Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-teddy-charcoal dark:text-white">
              Your Child's Smart 
              <span className="relative">
                <span className="relative z-10 text-teddy-coral"> Teddy </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-teddy-pink/30 rounded-lg -z-10"></span>
              </span>
              Companion
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Meet the interactive teddy bear that grows with your child, sparking curiosity, fostering imagination, and creating magical learning moments.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/signup')} className="btn-primary py-3 px-6 text-base">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button onClick={() => navigate('/about')} className="btn-ghost text-base">
                Learn More
              </button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-teddy-mint/80 border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">1,000+</span> happy families already joined
              </p>
            </div>
          </div>
          
          <div ref={imageRef} className="relative transition-transform duration-200 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-teddy-blue/20 to-teddy-purple/20 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="relative bg-white dark:bg-teddy-charcoal/80 rounded-3xl shadow-medium overflow-hidden p-6 animate-float">
              <div className="aspect-square rounded-2xl bg-teddy-cream dark:bg-gray-800 flex items-center justify-center">
                <div className="w-3/4 h-3/4 relative">
                  {/* This would be a teddy bear image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-teddy-peach rounded-full flex items-center justify-center">
                      <div className="relative w-4/5 h-4/5 bg-teddy-coral rounded-full">
                        <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-white rounded-full"></div>
                        <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-white rounded-full"></div>
                        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1/4 h-1/6 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-teddy-blue flex items-center justify-center">
                    <span className="text-white text-xs">👦</span>
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none p-3">
                    <p className="text-sm">Why do stars twinkle at night?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-1 bg-teddy-pink/20 rounded-2xl rounded-tr-none p-3">
                    <p className="text-sm">Stars twinkle because their light passes through moving air in Earth's atmosphere. It's like looking at a light through rippling water!</p>
                  </div>
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-teddy-pink flex items-center justify-center">
                    <span className="text-white text-xs">🧸</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                  <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
