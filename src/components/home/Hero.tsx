
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Waves, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
  
  // Bubble decoration elements
  const bubbles = [
    { size: 60, top: '15%', left: '5%', delay: 0 },
    { size: 45, top: '25%', right: '10%', delay: 1 },
    { size: 30, top: '60%', left: '15%', delay: 2 },
    { size: 70, top: '75%', right: '5%', delay: 3 },
    { size: 40, top: '40%', left: '45%', delay: 4 },
  ];
  
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-bubbles-teal/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#9b87f5]/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-bubbles-aqua/10 rounded-full blur-3xl"></div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 w-full h-60 wave-decoration opacity-20"></div>
        
        {/* Floating bubbles */}
        {bubbles.map((bubble, index) => (
          <div 
            key={index}
            className="bubble"
            style={{ 
              width: bubble.size, 
              height: bubble.size, 
              top: bubble.top, 
              left: bubble.left, 
              right: bubble.right,
              animationDelay: `${bubble.delay}s` 
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <motion.div 
              className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#9b87f5]/20 text-bubbles-deep"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="h-4 w-4 mr-2 text-[#9b87f5] animate-pulse-soft" />
              <span>Introducing AI-Powered Learning</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-bubbles-deep dark:text-white">
              Your Child's Smart 
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-bubbles-blue to-[#9b87f5] bg-clip-text text-transparent"> Dolphin </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#9b87f5] rounded-lg -z-10 wave-element"></span>
              </span>
              <br />Companion
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Meet the interactive dolphin friend that grows with your child, sparking curiosity, fostering imagination, and creating magical learning moments!
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="fun" size="lg" onClick={() => navigate('/pre-order')} className="group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="teal" size="lg" onClick={() => navigate('/dolphin-demo')}>
                <Waves className="mr-1 h-5 w-5" />
                Try Demo
              </Button>
              <Button variant="purple" size="lg" onClick={() => navigate('/parent-dashboard-demo')}>
                <Heart className="mr-1 h-5 w-5" />
                Parent Dashboard
              </Button>
            </div>
            
            <motion.div 
              className="flex items-center space-x-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-bubbles-aqua to-bubbles-blue border-2 border-white flex items-center justify-center text-xs text-white font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">1,000+</span> happy families already joined
              </p>
            </motion.div>
          </div>
          
          <div ref={imageRef} className="relative transition-transform duration-200 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-bubbles-blue/20 to-[#9b87f5]/20 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="relative bg-white dark:bg-bubbles-deep/80 rounded-3xl shadow-bubbly overflow-hidden p-6 animate-float">
              <div className="aspect-square rounded-2xl bg-pink-100 dark:bg-pink-200 flex items-center justify-center">
                <div className="w-3/4 h-3/4 relative">
                  {/* Updated Cartoon Dolphin SVG to match the provided image */}
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Main body - light blue */}
                    <path d="M100,200 C100,140 150,100 200,100 C280,100 320,160 320,200 C320,240 280,300 200,300 C150,300 100,260 100,200 Z" 
                      fill="#A8D0E6" stroke="#2E5984" strokeWidth="8" />
                    
                    {/* White belly */}
                    <path d="M140,220 C140,180 170,160 200,160 C250,160 270,200 270,220 C270,250 230,260 200,260 C170,260 140,250 140,220 Z" 
                      fill="#FFFFFF" />
                    
                    {/* Dorsal fin */}
                    <path d="M200,100 C220,70 250,70 240,120 C230,160 190,130 200,100 Z" 
                      fill="#7EB6D9" stroke="#2E5984" strokeWidth="8" />
                    
                    {/* Tail */}
                    <path d="M320,200 C340,180 360,200 340,220 C320,240 300,220 320,200 Z" 
                      fill="#7EB6D9" stroke="#2E5984" strokeWidth="8" />
                    
                    {/* Left flipper */}
                    <path d="M150,220 C130,260 100,260 120,220 C140,180 170,200 150,220 Z" 
                      fill="#7EB6D9" stroke="#2E5984" strokeWidth="8" />
                    
                    {/* Head/snout extension */}
                    <path d="M100,200 C80,180 70,190 80,200 C90,210 100,210 100,200 Z" 
                      fill="#A8D0E6" stroke="#2E5984" strokeWidth="8" />
                    
                    {/* Snout */}
                    <path d="M80,200 C60,190 50,200 60,210 C70,220 90,210 80,200 Z" 
                      fill="#FFFFFF" stroke="#2E5984" strokeWidth="8" />
                    
                    {/* Eye - small black circle */}
                    <circle cx="110" cy="180" r="8" fill="#2E5984" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] flex items-center justify-center">
                    <span className="text-white text-xs">👦</span>
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none p-3">
                    <p className="text-sm">Why do dolphins swim in pods?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-1 bg-gradient-to-br from-bubbles-aqua/20 to-bubbles-skyblue/20 rounded-2xl rounded-tr-none p-3">
                    <p className="text-sm">Dolphins swim in pods because they're highly social animals! Pods help them hunt together, protect each other from predators, and they even develop special whistles to call their friends and family!</p>
                  </div>
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-bubbles-blue to-bubbles-teal flex items-center justify-center">
                    <span className="text-white text-xs">🐬</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-[#9b87f5] animate-pulse"></div>
                  <div className="h-1 w-1 rounded-full bg-bubbles-aqua animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-1 w-1 rounded-full bg-bubbles-blue animate-pulse" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
              
              {/* Fun floating elements */}
              <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-bubbles-teal/40 animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-16 left-8 w-6 h-6 rounded-full bg-[#9b87f5]/40 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
