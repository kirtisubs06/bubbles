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
  
  const bubbles = [
    { size: 60, top: '15%', left: '5%', delay: 0 },
    { size: 45, top: '25%', right: '10%', delay: 1 },
    { size: 30, top: '60%', left: '15%', delay: 2 },
    { size: 70, top: '75%', right: '5%', delay: 3 },
    { size: 40, top: '40%', left: '45%', delay: 4 },
  ];
  
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-bubbles-teal/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#9b87f5]/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-bubbles-aqua/10 rounded-full blur-3xl"></div>
        
        <div className="absolute bottom-0 left-0 w-full h-60 wave-decoration opacity-20"></div>
        
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
              <div className="aspect-square rounded-2xl bg-blue-100 dark:bg-blue-200 flex items-center justify-center">
                <div className="w-4/5 h-4/5 relative">
                  <svg viewBox="0 0 400 300" className="w-full h-full">
                    <path d="M300,150 C300,100 240,70 150,90 C80,110 30,130 30,150 C30,180 80,200 150,220 C240,240 300,200 300,150 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="3" />
                    
                    <path d="M300,150 C350,110 380,100 390,130 C380,170 350,190 300,150 Z"
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <circle cx="260" cy="140" r="12" fill="#000000" />
                    <circle cx="258" cy="138" r="4" fill="#ffffff" />
                    
                    <path d="M60,160 Q75,170 90,160" 
                      fill="none" stroke="#424b54" strokeWidth="2" strokeLinecap="round" />
                    
                    <path d="M200,90 C220,50 240,40 260,60 C240,80 220,85 200,90 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M200,210 C220,250 240,260 260,240 C240,220 220,215 200,210 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <circle cx="320" cy="120" r="8" fill="none" stroke="#424b54" strokeWidth="1" opacity="0.6" />
                    <circle cx="340" cy="140" r="5" fill="none" stroke="#424b54" strokeWidth="1" opacity="0.6" />
                    <circle cx="330" cy="100" r="6" fill="none" stroke="#424b54" strokeWidth="1" opacity="0.6" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] flex items-center justify-center">
                    <span className="text-white text-xs">👦</span>
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none p-3">
                    <p className="text-sm">Why do fish swim in schools?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-1 bg-gradient-to-br from-bubbles-aqua/20 to-bubbles-skyblue/20 rounded-2xl rounded-tr-none p-3">
                    <p className="text-sm">Fish swim in schools to stay safe from predators! When they're all together, it's harder for bigger fish to catch them. Plus, they can find food more easily and swim more efficiently in groups!</p>
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
