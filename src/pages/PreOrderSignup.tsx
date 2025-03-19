
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Header from '@/components/layout/Header';

const PreOrderSignup: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Dynamically adjust iframe height when form loads
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'JotformResize') {
        if (iframeRef.current) {
          iframeRef.current.style.height = `${event.data.height + 100}px`;
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bubbles-cream/20 dark:from-bubbles-deep dark:to-bubbles-deep/80">
      <Header />
      <div className="pt-24 md:pt-32 container mx-auto px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-bubbles-deep dark:text-white mb-6">
            Pre-order Your <span className="text-bubbles-blue">Bubbles</span> Companion
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Be among the first to receive the revolutionary AI companion that will transform how your child learns and plays.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">Product Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Interactive AI Companion</h3>
                    <p className="text-gray-600 dark:text-gray-400">Advanced AI technology that adapts to your child's interests and learning style.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Educational Content</h3>
                    <p className="text-gray-600 dark:text-gray-400">Hundreds of hours of educational content across various subjects, tailored to your child's age.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Parent Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-400">Comprehensive dashboard to monitor your child's learning progress and interests.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Voice Recognition</h3>
                    <p className="text-gray-600 dark:text-gray-400">Natural conversations with advanced voice recognition technology.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Regular Content Updates</h3>
                    <p className="text-gray-600 dark:text-gray-400">New content and features added regularly through over-the-air updates.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium overflow-hidden"
          >
            {/* Jotform Embed */}
            <iframe
              ref={iframeRef}
              id="JotFormIFrame-250751107337048"
              title="Pre-order Bubbles AI Dolphin"
              onLoad={() => {
                if (iframeRef.current) {
                  iframeRef.current.style.height = "600px";
                }
              }}
              allowTransparency={true}
              allowFullScreen={true}
              allow="geolocation; microphone; camera"
              src="https://form.jotform.com/250751107337048"
              frameBorder="0"
              style={{ 
                width: "100%", 
                minHeight: "600px", 
                border: "none" 
              }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements for fun, kid-friendly appearance */}
      <div className="bubble w-12 h-12 left-[10%] top-[20%] opacity-50"></div>
      <div className="bubble w-8 h-8 right-[15%] top-[25%] opacity-40"></div>
      <div className="bubble w-20 h-20 left-[5%] bottom-[15%] opacity-40"></div>
      <div className="bubble w-16 h-16 right-[10%] bottom-[20%] opacity-30"></div>
    </div>
  );
};

export default PreOrderSignup;
