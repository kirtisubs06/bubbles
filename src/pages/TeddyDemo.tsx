
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TeddyBear3D from '@/components/teddy/TeddyBear3D';
import TeddyChatbot from '@/components/teddy/TeddyChatbot';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import { useIntersectionAnimation } from '@/lib/animations';
import { toast } from '@/components/ui/use-toast';

const TeddyDemo: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [activeView, setActiveView] = useState<'3d' | 'features'>('3d');
  const [setRef, isVisible] = useIntersectionAnimation({ threshold: 0.1, delay: 0 });

  // Show a toast when the teddy is clicked for the first time
  useEffect(() => {
    if (isListening) {
      toast({
        title: "Teddy is listening!",
        description: "In the full version, the teddy would use your microphone to hear your questions.",
        duration: 5000,
      });
    }
  }, [isListening]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teddy-cream/20 dark:from-teddy-charcoal dark:to-teddy-charcoal/80">
      <Header />
      <div className="pt-32 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-teddy-charcoal dark:text-white mb-4">
            Meet Your Child's <span className="text-teddy-coral">Teddy</span> Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interact with our 3D demo and experience how TeddyAI creates magical learning moments for your child.
          </p>
        </motion.div>

        <Tabs 
          defaultValue="3d" 
          className="w-full max-w-4xl mx-auto"
          onValueChange={(value) => setActiveView(value as '3d' | 'features')}
        >
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8 rounded-full overflow-hidden shadow-md border border-teddy-cream dark:border-teddy-charcoal/30">
            <TabsTrigger 
              value="3d" 
              className="text-base md:text-lg py-3.5 px-6 rounded-l-full data-[state=active]:bg-teddy-coral data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 relative z-10 font-medium outline-none focus:outline-none data-[state=inactive]:bg-white dark:data-[state=inactive]:bg-teddy-charcoal/50"
            >
              3D Teddy Demo
            </TabsTrigger>
            <TabsTrigger 
              value="features" 
              className="text-base md:text-lg py-3.5 px-6 rounded-r-full data-[state=active]:bg-teddy-coral data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 relative z-10 font-medium outline-none focus:outline-none data-[state=inactive]:bg-white dark:data-[state=inactive]:bg-teddy-charcoal/50"
            >
              Features & Interaction
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="3d" className="mt-6">
            <div className="bg-gradient-to-br from-teddy-cream to-white dark:from-teddy-blue/10 dark:to-teddy-purple/20 p-6 md:p-10 rounded-3xl shadow-medium">
              <div 
                className="h-[500px] md:h-[600px] w-full relative rounded-2xl overflow-hidden bg-gradient-to-b from-teddy-blue/10 to-teddy-pink/10"
              >
                <TeddyBear3D 
                  setIsListening={setIsListening} 
                  isListening={isListening} 
                />
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-lg font-medium text-teddy-charcoal dark:text-white mb-4">
                  {isListening ? "I'm listening! Ask me anything..." : "Click on Teddy to start talking!"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Try rotating the teddy bear by dragging, or zoom in/out using the scroll wheel
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
                  className="bg-gradient-to-br from-teddy-cream to-white dark:from-teddy-blue/20 dark:to-teddy-purple/10 p-6 h-full rounded-2xl shadow-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-teddy-charcoal dark:text-white mb-4">Voice Interaction</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-teddy-coral mr-2">✨</span>
                      <span>Natural conversations with voice recognition</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teddy-coral mr-2">✨</span>
                      <span>Age-appropriate content and answers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teddy-coral mr-2">✨</span>
                      <span>Stories, songs, and educational content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teddy-coral mr-2">✨</span>
                      <span>Remembers past conversations</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              <div>
                <motion.div 
                  className="bg-gradient-to-br from-teddy-cream to-white dark:from-teddy-blue/20 dark:to-teddy-purple/10 p-6 h-full rounded-2xl shadow-medium"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-teddy-charcoal dark:text-white mb-4">Smart Learning</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-teddy-mint mr-2">🌟</span>
                      <span>Adapts to your child's interests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teddy-mint mr-2">🌟</span>
                      <span>Grows with your child's development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teddy-mint mr-2">🌟</span>
                      <span>Encourages curiosity and critical thinking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teddy-mint mr-2">🌟</span>
                      <span>Parent dashboard for monitoring</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              <div className="md:col-span-2">
                <motion.div 
                  className="bg-gradient-to-br from-teddy-cream to-white dark:from-teddy-blue/20 dark:to-teddy-purple/10 p-6 rounded-2xl shadow-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-teddy-charcoal dark:text-white mb-4">Try the Chatbot</h3>
                  <p className="mb-4">Test our child-friendly AI chatbot that powers the teddy bear:</p>
                  <TeddyChatbot />
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeddyDemo;
