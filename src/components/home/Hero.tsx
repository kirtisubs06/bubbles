
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Waves } from 'lucide-react';

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
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-bubbles-blue/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-bubbles-teal/10 text-bubbles-teal">
              <span className="animate-pulse-soft">✨</span>
              <span className="ml-2">Introducing AI-Powered Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-bubbles-deep dark:text-white">
              Your Child's Smart 
              <span className="relative">
                <span className="relative z-10 text-bubbles-blue"> Dolphin </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-bubbles-teal/30 rounded-lg -z-10"></span>
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
                  <div key={i} className="w-8 h-8 rounded-full bg-bubbles-teal/80 border-2 border-white flex items-center justify-center text-xs text-white font-bold">
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
            <div className="absolute inset-0 bg-gradient-to-br from-bubbles-blue/20 to-bubbles-teal/20 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="relative bg-white dark:bg-bubbles-deep/80 rounded-3xl shadow-medium overflow-hidden p-6 animate-float">
              <div className="aspect-square rounded-2xl bg-bubbles-cream dark:bg-gray-800 flex items-center justify-center">
                <div className="w-3/4 h-3/4 relative">
                  {/* Cute Dolphin Illustration based on reference image */}
                  <svg viewBox="0 0 300 300" className="w-full h-full">
                    {/* Dolphin Body */}
                    <path d="M220,150 C220,180 200,210 150,220 C100,230 60,200 50,160 C40,120 60,80 100,70 C140,60 180,80 190,100 C200,120 220,120 220,150 Z" 
                      fill="#5AA9E6" />
                    
                    {/* Dolphin Belly */}
                    <path d="M190,150 C190,180 170,200 150,205 C130,210 100,200 90,180 C80,160 90,130 110,120 C130,110 150,120 160,130 C170,140 190,120 190,150 Z" 
                      fill="#FFFFFF" />
                    
                    {/* Dolphin Tail */}
                    <path d="M225,150 C260,140 280,170 270,180 C260,190 240,180 225,150 Z" 
                      fill="#5AA9E6" />
                    
                    {/* Dolphin Dorsal Fin */}
                    <path d="M150,70 C170,45 180,55 175,70 C170,85 160,80 150,70 Z" 
                      fill="#4A99D6" />
                    
                    {/* Left Flipper */}
                    <path d="M120,140 C100,160 70,150 90,130 C110,110 130,130 120,140 Z" 
                      fill="#4A99D6" />
                    
                    {/* Right Flipper */}
                    <path d="M120,160 C100,180 70,170 90,150 C110,130 130,150 120,160 Z" 
                      fill="#4A99D6" />
                    
                    {/* Eye */}
                    <circle cx="95" cy="110" r="8" fill="#222222" />
                    <circle cx="92" cy="108" r="3" fill="#FFFFFF" />
                    
                    {/* Mouth/Smile */}
                    <path d="M85,120 Q92,130 100,120" 
                      fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* Eyelashes - cute touch */}
                    <path d="M85,105 L82,100" fill="none" stroke="#333333" strokeWidth="1" />
                    <path d="M90,103 L88,98" fill="none" stroke="#333333" strokeWidth="1" />
                    <path d="M95,103 L97,98" fill="none" stroke="#333333" strokeWidth="1" />
                    
                    {/* Water Splash */}
                    <path d="M230,185 C240,180 245,175 250,185 C255,195 245,190 240,187 C235,195 230,190 230,185 Z" 
                      fill="#A8DEFF" fillOpacity="0.7" />
                    <circle cx="255" cy="188" r="3" fill="#A8DEFF" fillOpacity="0.7" />
                    <circle cx="262" cy="182" r="2" fill="#A8DEFF" fillOpacity="0.7" />
                    <circle cx="257" cy="175" r="2" fill="#A8DEFF" fillOpacity="0.7" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-bubbles-blue flex items-center justify-center">
                    <span className="text-white text-xs">👦</span>
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none p-3">
                    <p className="text-sm">Why do dolphins swim in pods?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-1 bg-bubbles-teal/20 rounded-2xl rounded-tr-none p-3">
                    <p className="text-sm">Dolphins swim in pods because they're highly social animals! Pods help them hunt together, protect each other from predators, and they even develop special whistles to call their friends and family!</p>
                  </div>
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-bubbles-teal flex items-center justify-center">
                    <span className="text-white text-xs">🐬</span>
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
