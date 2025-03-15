
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ChevronRight, Activity, Brain, Shield, Users } from 'lucide-react';
import { useIntersectionAnimation, useSequentialAnimation } from '@/lib/animations';

const About: React.FC = () => {
  const [setHeroRef, isHeroVisible] = useIntersectionAnimation({ threshold: 0.2 });
  const [setTeamRef, isTeamVisible] = useIntersectionAnimation({ threshold: 0.2 });
  const [setVisionRef, isVisionVisible] = useIntersectionAnimation({ threshold: 0.2 });
  
  const teamMembers = [
    {
      name: "Dr. Emma Chen",
      role: "AI Research Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop",
      bio: "Ph.D. in Artificial Intelligence from MIT with 10+ years of experience in natural language processing and machine learning."
    },
    {
      name: "Michael Torres",
      role: "Child Development Specialist",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&auto=format&fit=crop",
      bio: "Clinical child psychologist specializing in early childhood development and educational psychology."
    },
    {
      name: "Sarah Johnson",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
      bio: "Award-winning product designer with a passion for creating magical and intuitive experiences for children."
    },
    {
      name: "David Martinez",
      role: "Hardware Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
      bio: "Electronics engineer with expertise in sensor integration, voice recognition systems, and durable product design."
    }
  ];
  
  const teamAnimations = useSequentialAnimation(teamMembers.length, {
    initialDelay: 100,
    staggerDelay: 150,
    duration: 600
  });
  
  const valueItems = [
    {
      icon: <Brain className="h-10 w-10 text-teddy-coral" />,
      title: "Educational Growth",
      description: "We believe in fostering curiosity and continuous learning through engaging, age-appropriate content."
    },
    {
      icon: <Shield className="h-10 w-10 text-teddy-blue" />,
      title: "Safety & Privacy",
      description: "Children's safety and data privacy are our top priorities, with robust parental controls and transparent policies."
    },
    {
      icon: <Activity className="h-10 w-10 text-teddy-mint" />,
      title: "Adaptive Intelligence",
      description: "Our AI technology evolves with your child, providing personalized interactions that grow with their needs."
    },
    {
      icon: <Users className="h-10 w-10 text-teddy-pink" />,
      title: "Inclusive Design",
      description: "We create products that are accessible to children of all abilities, backgrounds, and learning styles."
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
                Our Mission at <span className="text-teddy-coral">TeddyAI</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We're creating magical companions that make learning an adventure for every child, combining cutting-edge AI with the comfort of a cuddly teddy bear.
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
                    Founded in 2021 by a team of AI researchers, child development specialists, and parents, we set out to create an educational companion that could grow with children, spark their curiosity, and create truly magical learning moments.
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
                      src="https://images.unsplash.com/photo-1555009393-f20bdb245c4d?q=80&w=600&auto=format&fit=crop"
                      alt="Child playing with teddy bear" 
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Values */}
        <section className="py-20">
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
                  Our Core Values
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  The principles that guide everything we do at TeddyAI, from product design to customer experience.
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
        
        {/* Team Section */}
        <section className="py-20 bg-teddy-purple/5 dark:bg-teddy-purple/10">
          <div 
            ref={(el) => setTeamRef(el)}
            className="container mx-auto px-4"
          >
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-teddy-charcoal dark:text-white mb-6">
                  Meet Our Team
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  The passionate experts behind TeddyAI, dedicated to creating magical learning experiences for children.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isTeamVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  style={teamAnimations[index].style}
                  className="glass-panel p-6 text-center"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-teddy-coral/30">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1 text-teddy-charcoal dark:text-white">{member.name}</h3>
                  <p className="text-teddy-coral mb-3 font-medium">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
                </motion.div>
              ))}
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
