
import React from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Brain, Heart, BookOpen, Shield, ChartBar, Clock } from 'lucide-react';

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
      description: "Adaptive conversations that grow with your child, fostering curiosity and critical thinking skills.",
      accentColor: "bg-teddy-blue"
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      title: "Emotional Intelligence",
      description: "Helps children understand, express, and manage their emotions through supportive conversations.",
      accentColor: "bg-teddy-pink"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Educational Content",
      description: "Curriculum-aligned topics covering science, math, language, arts, and more in an engaging way.",
      accentColor: "bg-teddy-mint"
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Child-Safe Design",
      description: "Built with privacy and safety as top priorities, with full parental control and oversight.",
      accentColor: "bg-teddy-purple"
    },
    {
      icon: <ChartBar className="h-6 w-6 text-white" />,
      title: "Insightful Analytics",
      description: "Track learning progress, interests, and emotional development through the parent dashboard.",
      accentColor: "bg-teddy-coral"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Parental Controls",
      description: "Set usage limits, review conversations, and personalize learning experiences for your child.",
      accentColor: "bg-teddy-peach"
    }
  ];

  return (
    <section className="py-20 bg-teddy-cream dark:bg-teddy-charcoal/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-teddy-mint/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-teddy-pink/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-teddy-mint/10 text-teddy-mint mb-4">
            <span className="mr-2">✨</span>
            <span>Key Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Smart Features for Growing Minds
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            TeddyTech Tales combines advanced AI technology with childhood development expertise to create a learning companion that evolves with your child.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default Features;
