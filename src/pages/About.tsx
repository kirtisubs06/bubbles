
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ChevronRight, Activity, Brain, Shield, Users } from 'lucide-react';
import { useIntersectionAnimation, useSequentialAnimation } from '@/lib/animations';

const About: React.FC = () => {
  const [setHeroRef, isHeroVisible] = useIntersectionAnimation({ threshold: 0.2 });
  const [setFounderRef, isFounderVisible] = useIntersectionAnimation({ threshold: 0.2 });
  const [setVisionRef, isVisionVisible] = useIntersectionAnimation({ threshold: 0.2 });
  
  const valueItems = [
    {
      icon: <Brain className="h-10 w-10 text-teddy-coral" />,
      title: "Educational Growth",
      description: "I believe in fostering curiosity and continuous learning through engaging, age-appropriate content."
    },
    {
      icon: <Shield className="h-10 w-10 text-teddy-blue" />,
      title: "Safety & Privacy",
      description: "Children's safety and data privacy are my top priorities, with robust parental controls and transparent policies."
    },
    {
      icon: <Activity className="h-10 w-10 text-teddy-mint" />,
      title: "Adaptive Intelligence",
      description: "My AI technology evolves with your child, providing personalized interactions that grow with their needs."
    },
    {
      icon: <Users className="h-10 w-10 text-teddy-pink" />,
      title: "Inclusive Design",
      description: "I create products that are accessible to children of all abilities, backgrounds, and learning styles."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teddy-cream/20 dark:from-teddy-charcoal dark:to-teddy-charcoal/80">
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-20">
          <div 
            ref={(el) => setHeroRef(el)}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-teddy-charcoal dark:text-white">
                The Vision Behind <span className="text-teddy-coral">TeddyAI</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Creating magical companions that make learning an adventure for every child, combining cutting-edge AI with the comfort of a cuddly teddy bear.
              </p>
              
              <div className="flex justify-center">
                <motion.div 
                  className="w-24 h-1 bg-teddy-coral rounded-full"
                  initial={{ width: 0 }}
                  animate={isHeroVisible ? { width: 96 } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="py-20 bg-teddy-blue/5 dark:bg-teddy-blue/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isHeroVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-teddy-charcoal dark:text-white">Our Story</h2>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    TeddyAI began with a simple observation: children naturally talk to their teddy bears, creating imaginary conversations and stories. What if those teddy bears could actually respond?
                  </p>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Founded in 2021 by a passionate AI researcher and child development enthusiast, I set out to create an educational companion that could grow with children, spark their curiosity, and create truly magical learning moments.
                  </p>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    After two years of development and testing with hundreds of families, TeddyAI was born – combining the emotional comfort of a plush teddy bear with advanced conversational AI designed specifically for children.
                  </p>
                </motion.div>
              </div>
              
              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 30, rotate: -5 }}
                  animate={isHeroVisible ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 30, rotate: -5 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-teddy-coral/20 rounded-2xl transform rotate-3 scale-105"></div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=600&auto=format&fit=crop"
                      alt="Child playing with teddy bear" 
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Founder Section */}
        <section className="py-20">
          <div 
            ref={(el) => setFounderRef(el)}
            className="container mx-auto px-4"
          >
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                <div className="md:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isFounderVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-teddy-mint/20 rounded-2xl transform rotate-2 scale-105"></div>
                    <div className="relative overflow-hidden rounded-2xl border-4 border-white dark:border-teddy-charcoal/40 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                        alt="Kirti Bakshi" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
                
                <div className="md:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={isFounderVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-teddy-charcoal dark:text-white">Meet the Founder</h2>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-teddy-charcoal dark:text-white">Kirti Bakshi</span>
                      <span className="bg-teddy-coral/10 text-teddy-coral px-3 py-1 rounded-full text-sm font-medium">
                        Founder & CEO
                      </span>
                    </div>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      With a passion for both artificial intelligence and early childhood education, Kirti brings a unique perspective to educational technology. Having worked with both top tech companies and educational institutions, Kirti recognized the power of combining cutting-edge AI with the emotional comfort of a teddy bear.
                    </p>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Holding a Ph.D. in Artificial Intelligence from Stanford University, Kirti's research focused on developing AI systems that could meaningfully interact with children while supporting their cognitive and emotional development. This expertise drives TeddyAI's approach to creating age-appropriate, educational AI companions.
                    </p>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      "I believe that technology should enhance childhood, not replace its magic. TeddyAI is designed to spark curiosity, foster imagination, and create meaningful learning moments while respecting the importance of play." — Kirti Bakshi
                    </p>
                    
                    <div className="flex items-center space-x-4 pt-2">
                      <a href="https://www.linkedin.com/in/kirtibakshi/" target="_blank" rel="noopener noreferrer" className="text-teddy-blue hover:text-teddy-coral transition-colors">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Values */}
        <section className="py-20 bg-teddy-purple/5 dark:bg-teddy-purple/10">
          <div className="container mx-auto px-4">
            <div 
              ref={(el) => setVisionRef(el)}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-teddy-charcoal dark:text-white mb-6">
                  Core Values
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  The principles that guide everything I do at TeddyAI, from product design to customer experience.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {valueItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="glass-panel p-6"
                >
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-white dark:bg-teddy-charcoal/40 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-teddy-charcoal dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Images Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-teddy-blue/20 rounded-xl transform rotate-1 scale-105"></div>
                  <div className="relative rounded-xl overflow-hidden h-60 md:h-80">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                      alt="AI Development" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <p className="text-white font-medium">Cutting-edge AI development</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-teddy-pink/20 rounded-xl transform -rotate-1 scale-105"></div>
                  <div className="relative rounded-xl overflow-hidden h-60 md:h-80">
                    <img 
                      src="https://images.unsplash.com/photo-1566140967404-b8b3932483f5?q=80&w=600&auto=format&fit=crop"
                      alt="Playful Learning" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <p className="text-white font-medium">Creating magical learning experiences</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisionVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-panel py-12 px-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teddy-charcoal dark:text-white">
                  Join the TeddyAI Family
                </h2>
                <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                  Be part of our mission to transform how children learn and explore the world around them.
                </p>
                <a href="/teddy-demo" className="btn-primary py-3 px-8 text-base inline-flex items-center">
                  See the Demo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
