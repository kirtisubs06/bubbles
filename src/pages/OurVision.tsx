
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Sparkles, HeartHandshake, Brain, Heart, Waves } from 'lucide-react';

const OurVision: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Dynamically adjust iframe height when form loads
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'form-height' && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height + 50}px`;
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-bubbles-teal/10 text-bubbles-teal mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Looking Ahead</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-bubbles-deep dark:text-white mb-6">
            Our <span className="text-bubbles-blue">Vision</span> for the Future
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We're building a family of AI companions to support learning, connection, and wellbeing across all stages of life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium p-8"
          >
            <div className="flex items-center justify-center bg-bubbles-teal/10 w-16 h-16 rounded-full mb-6">
              <HeartHandshake className="text-bubbles-teal h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">Elderly Care Companion</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our elderly care companion will provide companionship, cognitive stimulation, medication reminders, and emergency assistance for older adults. The companion dashboard will allow family members to stay connected and monitor wellbeing remotely.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Waves className="text-bubbles-blue h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Companionship to reduce loneliness and isolation</span>
              </li>
              <li className="flex items-start">
                <Brain className="text-bubbles-blue h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Cognitive exercises and memory support</span>
              </li>
              <li className="flex items-start">
                <Heart className="text-bubbles-blue h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Family connection and care coordination</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium p-8"
          >
            <div className="flex items-center justify-center bg-bubbles-blue/10 w-16 h-16 rounded-full mb-6">
              <Heart className="text-bubbles-blue h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">Mental Health Companion</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our mental health companion will provide emotional support, coping strategies, mood tracking, and guided relaxation exercises. The dashboard will offer insights into emotional patterns and connect with professional support when needed.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Waves className="text-bubbles-teal h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Emotional support and a judgment-free space</span>
              </li>
              <li className="flex items-start">
                <Brain className="text-bubbles-teal h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Mindfulness exercises and anxiety reduction</span>
              </li>
              <li className="flex items-start">
                <Heart className="text-bubbles-teal h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Mood tracking and professional integration</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium overflow-hidden"
        >
          <div className="p-8 text-center border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">
              Shape Our Future Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We want to hear your thoughts on what types of AI companions would be most valuable to you and your loved ones. Your feedback will directly influence our product roadmap.
            </p>
          </div>
          <iframe
            ref={iframeRef}
            id="vision-typeform-embed"
            title="Bubbles Future Vision Feedback Form"
            onLoad={() => {
              if (iframeRef.current) {
                iframeRef.current.style.height = "600px";
              }
            }}
            style={{ 
              width: "100%", 
              height: "600px", 
              border: "none" 
            }}
            src="https://form.typeform.com/to/OvTc8lyw"
            allow="camera; microphone; autoplay; encrypted-media; fullscreen; geolocation"
          />
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OurVision;
