
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  Lightbulb, 
  BookOpen, 
  Heart, 
  Music, 
  BarChart4,
  MessageSquare,
  Zap
} from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';

const Features: React.FC = () => {
  const [setHeroRef, isHeroVisible] = useIntersectionAnimation({ threshold: 0.2 });
  const [setFeaturesRef, isFeaturesVisible] = useIntersectionAnimation({ threshold: 0.1 });
  const [setComparisonRef, isComparisonVisible] = useIntersectionAnimation({ threshold: 0.1 });
  
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-teddy-blue" />,
      title: "Smart Conversations",
      description: "TeddyAI understands and responds to your child's questions with age-appropriate content, creating natural, educational dialogues."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-teddy-mint" />,
      title: "Safe & Secure",
      description: "Built with robust parental controls and privacy protections to create a safe learning environment for your child."
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-teddy-coral" />,
      title: "Adaptive Learning",
      description: "TeddyAI learns your child's interests, preferences, and learning style to create personalized educational experiences."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-teddy-purple" />,
      title: "Educational Content",
      description: "Access to thousands of stories, educational games, and activities that make learning fun and engaging."
    },
    {
      icon: <Heart className="h-10 w-10 text-teddy-pink" />,
      title: "Emotional Intelligence",
      description: "Helps children develop emotional awareness and social skills through thoughtful conversations and scenarios."
    },
    {
      icon: <Music className="h-10 w-10 text-teddy-blue" />,
      title: "Songs & Sounds",
      description: "Sing-alongs, lullabies, and soothing sounds to entertain and comfort your child throughout the day."
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-teddy-mint" />,
      title: "Parent Dashboard",
      description: "Monitor your child's interactions, learning progress, and interests through an intuitive dashboard."
    },
    {
      icon: <Zap className="h-10 w-10 text-teddy-coral" />,
      title: "Long Battery Life",
      description: "Up to 8 hours of active use on a single charge, with standby mode that lasts for days."
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teddy-cream/20 dark:from-teddy-charcoal dark:to-teddy-charcoal/80">
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-10">
          <div 
            ref={(el) => setHeroRef(el)}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-teddy-purple/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-teddy-purple mr-2" />
                <span className="text-sm font-medium text-teddy-purple">Discover What Makes TeddyAI Special</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-teddy-charcoal dark:text-white">
                Intelligence Meets <span className="text-teddy-coral">Imagination</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                TeddyAI combines cutting-edge artificial intelligence with the timeless comfort of a teddy bear to create magical learning experiences for your child.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-20 bg-teddy-blue/5 dark:bg-teddy-blue/10">
          <div 
            ref={(el) => setFeaturesRef(el)}
            className="container mx-auto px-4"
          >
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isFeaturesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-teddy-charcoal dark:text-white mb-6">
                  Packed with Magical Features
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Everything your child needs for an engaging, educational experience that grows with them.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFeaturesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
                  className="glass-panel p-6"
                >
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-teddy-charcoal/40 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-teddy-charcoal dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Safety Section */}
        <section className="py-20 bg-teddy-purple/5 dark:bg-teddy-purple/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-teddy-charcoal dark:text-white mb-6">
                  Designed with Child Safety in Mind
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Your child's privacy and safety are our top priorities
                </p>
              </div>
              
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFeaturesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass-panel p-6"
                >
                  <h3 className="text-xl font-bold mb-3 text-teddy-blue dark:text-teddy-blue">Press-to-Talk Privacy</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our companion toy features a physical button that must be pressed for it to listen. Unlike always-on smart devices that might 
                    constantly monitor your home, Bubbles only activates when your child consciously decides to interact by pressing the button. 
                    When the button is released, the microphone is physically disconnected from power, making it impossible for the device to listen 
                    or record. This hardware-based approach ensures maximum privacy protection that software-only solutions simply cannot match.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFeaturesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-panel p-6"
                >
                  <h3 className="text-xl font-bold mb-3 text-teddy-coral dark:text-teddy-coral">Parental Control & Oversight</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Parents have complete visibility into their child's interactions through the intuitive dashboard. 
                    You can review conversation history, set usage limits and time restrictions, and customize content filters
                    to ensure all interactions remain age-appropriate and aligned with your family values. The companion can never 
                    override parental settings, giving you peace of mind while your child learns and plays.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFeaturesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="glass-panel p-6"
                >
                  <h3 className="text-xl font-bold mb-3 text-teddy-mint dark:text-teddy-mint">Advanced Data Protection</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    All conversations are protected with end-to-end encryption, and your child's data is never sold or shared with third parties.
                    We comply with COPPA (Children's Online Privacy Protection Act), GDPR, and other privacy regulations worldwide,
                    making Bubbles one of the safest interactive toys on the market. Voice data is processed locally when possible, and all
                    cloud processing is anonymized and deleted after use unless you specifically choose to save it.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFeaturesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="glass-panel p-6"
                >
                  <h3 className="text-xl font-bold mb-3 text-teddy-purple dark:text-teddy-purple">Thoughtful Content Moderation</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our AI is specifically trained to detect and avoid inappropriate topics, providing child-friendly responses
                    while encouraging curiosity and learning. The system automatically redirects sensitive questions to appropriate,
                    educational content without exposing children to unsuitable material. The AI maintains a friendly, educational tone
                    while adapting complexity based on the child's questions—explaining simply when needed, but capable of providing
                    detailed answers for more complex questions as appropriate for their development.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Comparison Table */}
        <section className="py-20">
          <div 
            ref={(el) => setComparisonRef(el)}
            className="container mx-auto px-4"
          >
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isComparisonVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-teddy-charcoal dark:text-white mb-6">
                  Why Choose TeddyAI?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  See how TeddyAI compares to standard smart devices and traditional toys.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isComparisonVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-4xl mx-auto overflow-x-auto"
            >
              <table className="w-full glass-panel">
                <thead>
                  <tr className="border-b border-teddy-purple/10">
                    <th className="p-4 text-left text-teddy-charcoal dark:text-white">Feature</th>
                    <th className="p-4 text-center text-teddy-coral font-bold">TeddyAI</th>
                    <th className="p-4 text-center text-teddy-charcoal dark:text-white">Smart Speakers</th>
                    <th className="p-4 text-center text-teddy-charcoal dark:text-white">Traditional Toys</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-teddy-purple/10">
                    <td className="p-4 font-medium text-teddy-charcoal dark:text-white">Child-Centric Design</td>
                    <td className="p-4 text-center text-teddy-coral">✓</td>
                    <td className="p-4 text-center">Limited</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-teddy-purple/10">
                    <td className="p-4 font-medium text-teddy-charcoal dark:text-white">Emotional Connection</td>
                    <td className="p-4 text-center text-teddy-coral">✓</td>
                    <td className="p-4 text-center">✗</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b border-teddy-purple/10">
                    <td className="p-4 font-medium text-teddy-charcoal dark:text-white">Conversational AI</td>
                    <td className="p-4 text-center text-teddy-coral">✓</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center">✗</td>
                  </tr>
                  <tr className="border-b border-teddy-purple/10">
                    <td className="p-4 font-medium text-teddy-charcoal dark:text-white">Personalized Learning</td>
                    <td className="p-4 text-center text-teddy-coral">✓</td>
                    <td className="p-4 text-center">Limited</td>
                    <td className="p-4 text-center">✗</td>
                  </tr>
                  <tr className="border-b border-teddy-purple/10">
                    <td className="p-4 font-medium text-teddy-charcoal dark:text-white">Screen-Free Experience</td>
                    <td className="p-4 text-center text-teddy-coral">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-teddy-charcoal dark:text-white">Child Development Focus</td>
                    <td className="p-4 text-center text-teddy-coral">✓</td>
                    <td className="p-4 text-center">Limited</td>
                    <td className="p-4 text-center">Varies</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isComparisonVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-panel py-12 px-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teddy-charcoal dark:text-white">
                  Ready to Transform Learning?
                </h2>
                <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                  Give your child the gift of interactive, engaging education with TeddyAI.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/teddy-demo" className="btn-primary py-3 px-8 text-base">
                    Try the Demo
                  </a>
                  <a href="/pricing" className="btn-secondary py-3 px-8 text-base">
                    View Pricing
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
