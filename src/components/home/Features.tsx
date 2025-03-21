
import React from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Brain, Heart, BookOpen, Shield, ChartBar, Fingerprint, Play, Zap, Lock, MessageSquare } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  accentColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index, accentColor }) => {
  return (
    <AnimatedCard 
      delay={100 * index} 
      className="h-full border border-gray-100 dark:border-gray-800"
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${accentColor}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </AnimatedCard>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      title: "AI-Powered Learning",
      description: "Adaptive conversations that grow with your child, fostering curiosity and critical thinking skills across all subjects.",
      accentColor: "bg-bubbles-blue"
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      title: "Emotional Intelligence",
      description: "Helps children understand, express, and manage their emotions through supportive conversations.",
      accentColor: "bg-bubbles-teal"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Educational Content",
      description: "Curriculum-aligned topics covering science, math, language, arts, history, and more in an engaging way.",
      accentColor: "bg-bubbles-skyblue"
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Child-Safe Design",
      description: "Built with privacy and safety as top priorities, with full parental control and oversight.",
      accentColor: "bg-bubbles-navy"
    },
    {
      icon: <ChartBar className="h-6 w-6 text-white" />,
      title: "Insightful Analytics",
      description: "Track learning progress, interests, and emotional development through the parent dashboard.",
      accentColor: "bg-bubbles-blue"
    },
    {
      icon: <Play className="h-6 w-6 text-white" />,
      title: "Press-to-Talk Privacy",
      description: "The physical button ensures the toy only listens when your child wants it to, providing maximum privacy protection.",
      accentColor: "bg-bubbles-teal"
    },
    {
      icon: <Lock className="h-6 w-6 text-white" />,
      title: "Data Protection",
      description: "End-to-end encryption and strict data handling policies keep your child's conversations private and secure.",
      accentColor: "bg-bubbles-skyblue"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Conversational Learning",
      description: "Natural dialogue system that makes learning feel like talking to a friend, not studying from a textbook.",
      accentColor: "bg-bubbles-navy"
    }
  ];

  return (
    <section className="py-20 bg-bubbles-cream dark:bg-bubbles-deep/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-bubbles-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-bubbles-blue/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-bubbles-teal/10 text-bubbles-teal mb-4">
            <span className="mr-2">✨</span>
            <span>About Bubbles</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Your Child's Learning Companion
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Bubbles is a plush dolphin toy designed for children aged 3-10. With a simple press of a button, your child can talk and interact with Bubbles, creating a magical learning experience that adapts to their unique interests and needs.
          </p>
          
          <div className="bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium p-6 mb-16">
            <h3 className="text-xl font-semibold mb-4 text-bubbles-deep dark:text-white">How Bubbles Works</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Bubbles features a physical button that your child presses to start a conversation. This design ensures privacy, as Bubbles only listens when the button is pressed. The friendly female voice responds with age-appropriate content, engaging your child in educational dialogues that promote social interaction and accelerate learning.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Parents receive valuable insights about their child's interests through our dashboard, along with recommendations for nurturing those interests. You'll always have complete control over your child's interactions with Bubbles, making it both a fun and safe learning tool.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              accentColor={feature.accentColor}
            />
          ))}
        </div>

        {/* Safety Section */}
        <div className="mt-20 max-w-4xl mx-auto bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-bubbles-deep dark:text-white mb-6">
            Designed with Child Safety in Mind
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-bubbles-blue mb-2">Press-to-Talk: A Physical Privacy Guarantee</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our companion toy features a physical button that must be pressed for it to listen. Unlike always-on smart devices that might 
                constantly monitor your home, Bubbles only activates when your child consciously decides to interact by pressing the button. 
                When the button is released, the microphone is physically disconnected from power, making it impossible for the device to listen 
                or record. This hardware-based approach ensures maximum privacy protection that software-only solutions simply cannot match.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-bubbles-teal mb-2">Complete Parental Control & Oversight</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Parents have complete visibility into their child's interactions through the intuitive dashboard. 
                You can review conversation history, set usage limits and time restrictions, and customize content filters
                to ensure all interactions remain age-appropriate and aligned with your family values. The companion can never 
                override parental settings, giving you peace of mind while your child learns and plays.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-bubbles-skyblue mb-2">Advanced Data Security & Privacy</h4>
              <p className="text-gray-600 dark:text-gray-300">
                All conversations are protected with end-to-end encryption, and your child's data is never sold or shared with third parties.
                We comply with COPPA (Children's Online Privacy Protection Act), GDPR, and other privacy regulations worldwide,
                making Bubbles one of the safest interactive toys on the market. Voice data is processed locally when possible, and all
                cloud processing is anonymized and deleted after use unless you specifically choose to save it.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-bubbles-navy mb-2">Child-Appropriate Content Moderation</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI is specifically trained to detect and avoid inappropriate topics, providing child-friendly responses
                while encouraging curiosity and learning. The system automatically redirects sensitive questions to appropriate,
                educational content without exposing children to unsuitable material. The AI maintains a friendly, educational tone
                while adapting complexity based on the child's questions—explaining simply when needed, but capable of providing
                detailed answers for more complex questions as appropriate for their development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
