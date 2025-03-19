
import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import { useIntersectionAnimation } from '@/lib/animations';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import GeminiKeyForm from '@/components/teddy/GeminiKeyForm';

// Lazy load the 3D components to improve initial page load
const DolphinModel3D = React.lazy(() => import('@/components/dolphin/DolphinModel3D'));
const TeddyChatbot = React.lazy(() => import('@/components/teddy/TeddyChatbot'));

const DolphinDemo: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [activeView, setActiveView] = useState<'3d' | 'features'>('3d');
  const [setRef, isVisible] = useIntersectionAnimation({ threshold: 0.1, delay: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Show a toast when the dolphin is clicked for the first time
  useEffect(() => {
    if (isListening) {
      toast({
        title: "Bubbles is listening!",
        description: "Speak to interact with Bubbles.",
        duration: 5000,
      });
    }
  }, [isListening]);

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bubbles-wave/30 dark:from-bubbles-deep dark:to-bubbles-deep/80">
      <Header />
      <div className="pt-32 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-bubbles-deep dark:text-white mb-4">
            Meet Your Child's <span className="relative">
              <span className="relative z-10 text-bubbles-blue">Dolphin</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-bubbles-yellow rounded-lg -z-10"></span>
            </span> Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interact with our 3D demo and experience how Bubbles creates magical learning moments for your child.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-6">
          <GeminiKeyForm />
        </div>

        <Tabs 
          defaultValue="3d" 
          className="w-full max-w-4xl mx-auto"
          onValueChange={(value) => setActiveView(value as '3d' | 'features')}
        >
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8 h-auto rounded-full overflow-hidden shadow-md border border-bubbles-cream dark:border-bubbles-deep/30">
            <TabsTrigger 
              value="3d" 
              className="text-base md:text-lg py-5 px-6 h-full rounded-l-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-bubbles-blue data-[state=active]:to-bubbles-teal data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 relative z-10 font-medium outline-none focus:outline-none data-[state=inactive]:bg-white dark:data-[state=inactive]:bg-bubbles-deep/50"
            >
              3D Dolphin Demo
            </TabsTrigger>
            <TabsTrigger 
              value="features" 
              className="text-base md:text-lg py-5 px-6 h-full rounded-r-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-bubbles-yellow data-[state=active]:to-bubbles-lime data-[state=active]:text-bubbles-deep dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 relative z-10 font-medium outline-none focus:outline-none data-[state=inactive]:bg-white dark:data-[state=inactive]:bg-bubbles-deep/50"
            >
              Features & Interaction
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="3d" className="mt-6">
            <div className="bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-blue/10 dark:to-bubbles-teal/20 p-6 md:p-10 rounded-3xl shadow-medium">
              <div 
                className="h-[500px] md:h-[600px] w-full relative rounded-2xl overflow-hidden bg-gradient-to-b from-bubbles-skyblue/20 to-bubbles-aqua/20"
              >
                <Suspense fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-bubbles-blue" />
                    <span className="ml-2 text-lg font-medium">Loading Bubbles...</span>
                  </div>
                }>
                  <DolphinModel3D 
                    setIsListening={setIsListening} 
                    isListening={isListening} 
                  />
                </Suspense>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-lg font-medium text-bubbles-deep dark:text-white mb-4">
                  {isListening ? "I'm listening! Talk to me..." : "Click on Bubbles to start talking!"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Try rotating the dolphin by dragging, or zoom in/out using the scroll wheel
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div ref={(ref) => {
                if (typeof setRef === 'function' && ref) {
                  setRef(ref);
                }
              }}> 
                <motion.div 
                  className="bg-gradient-to-br from-bubbles-skyblue/20 to-bubbles-blue/10 p-6 h-full rounded-2xl shadow-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">Voice Interaction</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-bubbles-blue mr-2">✨</span>
                      <span className="text-bubbles-deep dark:text-gray-200">Natural conversations with voice recognition</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bubbles-yellow mr-2">✨</span>
                      <span className="text-bubbles-deep dark:text-gray-200">Age-appropriate content and answers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bubbles-lime mr-2">✨</span>
                      <span className="text-bubbles-deep dark:text-gray-200">Stories, songs, and educational content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bubbles-teal mr-2">✨</span>
                      <span className="text-bubbles-deep dark:text-gray-200">Remembers past conversations</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              <div>
                <motion.div 
                  className="bg-gradient-to-br from-bubbles-yellow/20 to-bubbles-sand/20 p-6 h-full rounded-2xl shadow-medium"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">Smart Learning</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-bubbles-yellow mr-2">🌟</span>
                      <span className="text-bubbles-deep dark:text-gray-200">Adapts to your child's interests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bubbles-seafoam mr-2">🌟</span>
                      <span className="text-bubbles-deep dark:text-gray-200">Grows with your child's development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bubbles-blue mr-2">🌟</span>
                      <span className="text-bubbles-deep dark:text-gray-200">Encourages curiosity and critical thinking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bubbles-lime mr-2">🌟</span>
                      <span className="text-bubbles-deep dark:text-gray-200">Parent dashboard for monitoring</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              <div className="md:col-span-2">
                <motion.div 
                  className="bg-gradient-to-br from-bubbles-lime/20 to-bubbles-seafoam/20 p-6 rounded-2xl shadow-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">AI Powered Chatbot</h3>
                  <p className="mb-4 text-bubbles-deep dark:text-gray-200">Test our child-friendly AI chatbot:</p>
                  <Suspense fallback={
                    <div className="flex h-40 items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-bubbles-blue" />
                      <span className="ml-2 text-bubbles-deep dark:text-gray-200">Loading chatbot...</span>
                    </div>
                  }>
                    <TeddyChatbot />
                  </Suspense>
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DolphinDemo;
