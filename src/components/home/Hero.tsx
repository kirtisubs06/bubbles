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
                  <svg viewBox="0 0 600 400" className="w-full h-full">
                    <path d="M150,200 C150,160 220,125 320,135 C420,145 480,170 500,260 C520,340 460,370 360,360 C260,350 150,320 150,200 Z" 
                      fill="#667e99" stroke="#424b54" strokeWidth="3" />
                    
                    <path d="M150,220 C150,250 200,280 320,290 C420,295 460,280 480,270 C460,330 420,350 320,350 C200,350 160,310 150,220 Z" 
                      fill="#e8e8e8" />
                    
                    <path d="M320,135 C320,80 380,90 345,140 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M320,135 C330,130 340,130 345,140 C330,150 315,150 320,135 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M490,260 C530,230 570,270 520,310 C470,340 450,280 490,260 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M480,260 C490,250 500,250 490,260 C480,270 470,270 480,260 Z"
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M250,260 C210,290 180,260 215,230 C250,215 270,230 250,260 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M250,240 C255,235 260,235 265,240 C260,245 250,245 250,240 Z"
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M280,260 C320,290 350,260 315,230 C280,215 260,230 280,260 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M280,240 C275,235 270,235 265,240 C270,245 280,245 280,240 Z"
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <path d="M150,200 C120,190 90,190 110,210 C130,230 150,210 150,200 Z" 
                      fill="#667e99" stroke="#424b54" strokeWidth="2" />
                    <path d="M110,205 C120,205 140,205 150,200" 
                      fill="none" stroke="#424b54" strokeWidth="1" />
                    
                    <path d="M520,280 C550,240 580,250 560,290 C540,320 500,300 520,280 Z" 
                      fill="#5e7082" stroke="#424b54" strokeWidth="2" />
                    
                    <circle cx="155" cy="190" r="10" fill="#000000" />
                    <circle cx="153" cy="188" r="2" fill="#ffffff" />
                    
                    <ellipse cx="195" cy="145" rx="8" ry="3" fill="#424b54" />
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
