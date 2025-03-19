
import React from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Brain, Heart, BookOpen, Shield, ChartBar, Clock, Waves } from 'lucide-react';

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
      description: "Curriculum-aligned topics covering marine biology, science, math, language, arts, and more in an engaging way.",
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
      icon: <Waves className="h-6 w-6 text-white" />,
      title: "Dolphin Intelligence",
      description: "Leverages the intelligence of dolphins - one of the smartest mammals with advanced social structures and problem-solving abilities.",
      accentColor: "bg-bubbles-teal"
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
            <span>Key Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Smart Features for Growing Minds
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Bubbles combines advanced AI technology with childhood development expertise to create a learning companion that evolves with your child.
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
