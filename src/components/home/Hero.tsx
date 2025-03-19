
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
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-bubbles-teal/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-bubbles-coral/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-bubbles-aqua/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-bubbles-aqua/20 text-bubbles-aqua">
              <span className="animate-pulse-soft">✨</span>
              <span className="ml-2">Introducing AI-Powered Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-bubbles-deep dark:text-white">
              Your Child's Smart 
              <span className="relative">
                <span className="relative z-10 text-bubbles-blue"> Dolphin </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-bubbles-coral/30 rounded-lg -z-10"></span>
              </span>
              Companion
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Meet the interactive dolphin friend that grows with your child, sparking curiosity, fostering imagination, and creating magical learning moments. Like an interactive Baymax, but for kids!
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/pre-order')} className="btn-primary py-3 px-6 text-base">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button onClick={() => navigate('/dolphin-demo')} className="btn-ghost text-base">
                Try Demo
              </button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-bubbles-aqua to-bubbles-coral border-2 border-white flex items-center justify-center text-xs text-white font-bold">
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
            <div className="absolute inset-0 bg-gradient-to-br from-bubbles-blue/20 to-bubbles-coral/20 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="relative bg-white dark:bg-bubbles-deep/80 rounded-3xl shadow-medium overflow-hidden p-6 animate-float">
              <div className="aspect-square rounded-2xl bg-bubbles-cream dark:bg-gray-800 flex items-center justify-center">
                <div className="w-4/5 h-4/5 relative">
                  {/* New Cute Dolphin Illustration based on reference image */}
                  <svg viewBox="0 0 300 300" className="w-full h-full">
                    {/* Body - Light Blue */}
                    <path d="M110,110 C160,80 210,100 220,140 C230,180 200,220 150,230 C100,240 60,210 50,170 C40,130 60,140 110,110 Z" 
                      fill="#5AA9E6" />
                    
                    {/* White belly/underside */}
                    <path d="M120,140 C160,120 190,130 200,160 C210,190 190,210 150,215 C110,220 100,190 90,170 C80,150 90,155 120,140 Z" 
                      fill="#FFFFFF" />
                    
                    {/* Snout/Beak */}
                    <path d="M60,130 C80,110 110,110 110,130 C110,150 80,150 60,130 Z" 
                      fill="#5AA9E6" />
                    
                    {/* Eye */}
                    <ellipse cx="90" cy="120" rx="15" ry="18" fill="white" />
                    <ellipse cx="90" cy="120" rx="10" ry="12" fill="black" />
                    <ellipse cx="85" cy="115" rx="4" ry="4" fill="white" />
                    
                    {/* Eyelashes */}
                    <path d="M70,110 L75,105" stroke="black" strokeWidth="1.5" />
                    <path d="M80,105 L82,100" stroke="black" strokeWidth="1.5" />
                    <path d="M90,103 L92,98" stroke="black" strokeWidth="1.5" />
                    
                    {/* Smile */}
                    <path d="M75,135 Q90,145 105,135" 
                      fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* Dorsal fin */}
                    <path d="M150,100 C170,70 190,80 180,110 C170,130 140,125 150,100 Z" 
                      fill="#4A99D6" />
                    
                    {/* Tail */}
                    <path d="M225,170 C250,150 270,180 250,200 C230,220 210,195 225,170 Z" 
                      fill="#4A99D6" />
                    
                    {/* Left flipper */}
                    <path d="M130,170 C120,200 90,190 110,160 C130,130 140,150 130,170 Z" 
                      fill="#4A99D6" />
                    
                    {/* Right flipper (partially hidden) */}
                    <path d="M120,190 C110,210 95,205 105,185 C115,165 130,170 120,190 Z" 
                      fill="#4A99D6" />
                    
                    {/* Highlight on head */}
                    <path d="M80,100 C90,90 100,95 90,105 C80,115 70,110 80,100 Z" 
                      fill="white" opacity="0.6" />
                    
                    {/* Blowhole */}
                    <ellipse cx="130" cy="105" rx="5" ry="3" fill="#2E6BA4" />
                    
                    {/* Water splash */}
                    <path d="M230,170 Q240,160 250,170 Q260,180 255,170 Q250,160 245,170" 
                      fill="none" stroke="#A8DEFF" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="260" cy="165" r="3" fill="#A8DEFF" />
                    <circle cx="255" cy="155" r="2" fill="#A8DEFF" />
                    <circle cx="265" cy="160" r="1.5" fill="#A8DEFF" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-bubbles-coral to-bubbles-sand flex items-center justify-center">
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
                  <div className="h-1 w-1 rounded-full bg-bubbles-coral animate-pulse"></div>
                  <div className="h-1 w-1 rounded-full bg-bubbles-aqua animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-1 w-1 rounded-full bg-bubbles-blue animate-pulse" style={{ animationDelay: '600ms' }}></div>
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
