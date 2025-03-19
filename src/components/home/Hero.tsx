
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
              <div className="aspect-square rounded-2xl bg-bubbles-cream dark:bg-gray-800 flex items-center justify-center">
                <div className="w-4/5 h-4/5 relative">
                  {/* Improved More Realistic Dolphin SVG */}
                  <svg viewBox="0 0 300 300" className="w-full h-full">
                    {/* Waves background */}
                    <path d="M20,220 Q70,200 120,220 T220,220 T300,220 V300 H0 V220 Z" 
                      fill="#D8E6F1" opacity="0.6" className="animate-wave" />
                    <path d="M0,240 Q50,220 100,240 T200,240 T300,240 V300 H0 V240 Z" 
                      fill="#C3D9E9" opacity="0.4" className="animate-wave" style={{ animationDelay: '0.5s' }} />
                    <path d="M0,260 Q50,250 100,260 T200,260 T300,260 V300 H0 V260 Z" 
                      fill="#A7C5E3" opacity="0.3" className="animate-wave" style={{ animationDelay: '1s' }} />
                      
                    {/* Body - Navy Blue */}
                    <path d="M110,110 C160,80 210,100 230,140 C250,180 220,220 160,230 C100,240 50,210 40,170 C30,130 60,140 110,110 Z" 
                      fill="#335571" />
                    
                    {/* Light blue belly/underside */}
                    <path d="M120,140 C160,120 200,130 210,160 C220,190 200,210 150,220 C100,230 80,200 70,170 C60,140 80,160 120,140 Z" 
                      fill="#A7C5E3" />
                    
                    {/* Snout/Beak - More realistic */}
                    <path d="M50,120 C60,110 80,105 90,115 C100,125 90,140 65,140 C40,140 40,130 50,120 Z" 
                      fill="#335571" />
                    
                    {/* Eye - Realistic */}
                    <ellipse cx="85" cy="115" rx="8" ry="10" fill="white" />
                    <ellipse cx="85" cy="115" rx="5" ry="7" fill="black" />
                    <ellipse cx="83" cy="113" rx="2" ry="2" fill="white" />
                    
                    {/* Smile - Subtle dolphin curve */}
                    <path d="M65,125 Q75,130 85,125" 
                      fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                    
                    {/* Dorsal fin - Taller, more curved */}
                    <path d="M160,90 C180,60 195,70 185,100 C175,130 145,120 160,90 Z" 
                      fill="#24405C" />
                    
                    {/* Tail - More detailed */}
                    <path d="M230,170 C250,160 265,175 255,195 C245,215 230,210 220,190 C215,180 225,175 230,170 Z" 
                      fill="#24405C" />
                    
                    {/* Left flipper - More elongated */}
                    <path d="M130,170 C120,195 95,200 110,175 C125,150 140,145 130,170 Z" 
                      fill="#24405C" />
                    
                    {/* Right flipper */}
                    <path d="M150,190 C140,210 125,215 135,190 C145,165 160,170 150,190 Z" 
                      fill="#24405C" />
                    
                    {/* Highlight on body */}
                    <path d="M130,120 C150,110 170,115 160,130 C150,145 110,130 130,120 Z" 
                      fill="white" opacity="0.4" />
                    
                    {/* Blowhole */}
                    <ellipse cx="130" cy="100" rx="5" ry="2" fill="#1A2D3F" />
                    
                    {/* Water splash - More dynamic */}
                    <path d="M230,170 Q245,155 260,165 Q270,175 260,170 Q250,165 240,170" 
                      fill="none" stroke="#C3D9E9" strokeWidth="3" strokeLinecap="round" className="animate-pulse-soft" />
                    <circle cx="260" cy="158" r="4" fill="#C3D9E9" className="animate-float" style={{ animationDelay: '0.2s' }} />
                    <circle cx="252" cy="150" r="3" fill="#C3D9E9" className="animate-float" style={{ animationDelay: '0.5s' }} />
                    <circle cx="265" cy="153" r="2" fill="#C3D9E9" className="animate-float" style={{ animationDelay: '0.8s' }} />
                    
                    {/* Additional body details */}
                    <path d="M140,150 C170,145 190,155 195,170 C200,185 190,200 170,205" 
                      fill="none" stroke="#24405C" strokeWidth="1.5" opacity="0.5" />
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
