
import React from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { ArrowUp, ArrowDown, Clock, Heart, Brain, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  change: number;
  bgColor: string;
  delay?: number;
}> = ({ title, value, icon, change, bgColor, delay = 0 }) => {
  const isPositive = change >= 0;
  
  return (
    <AnimatedCard delay={delay} className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          <div className={cn(
            "flex items-center mt-3 text-xs font-medium",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            <span>{Math.abs(change)}% from last week</span>
          </div>
        </div>
        
        <div className={cn("p-3 rounded-lg", bgColor)}>
          {icon}
        </div>
      </div>
    </AnimatedCard>
  );
};

const Overview: React.FC = () => {
  const recentConversations = [
    {
      id: 1,
      question: "Why is the sky blue?",
      answer: "The sky appears blue because of how sunlight interacts with air molecules. It's called Rayleigh scattering!",
      timestamp: "10:23 AM",
      sentiment: "curious"
    },
    {
      id: 2,
      question: "What's the biggest dinosaur?",
      answer: "The Argentinosaurus was one of the largest dinosaurs ever! It was as long as 3 school buses and as heavy as 15 elephants.",
      timestamp: "Yesterday",
      sentiment: "excited"
    },
    {
      id: 3,
      question: "I'm feeling sad today.",
      answer: "I'm sorry you're feeling sad. Would you like to talk about what's making you feel that way? Or maybe we could read a story together?",
      timestamp: "Yesterday",
      sentiment: "sad"
    }
  ];
  
  const stats = [
    {
      title: "Daily Interactions",
      value: "24 minutes",
      icon: <Clock className="h-5 w-5 text-white" />,
      change: 12,
      bgColor: "bg-teddy-blue",
      delay: 0
    },
    {
      title: "Emotional Score",
      value: "Positive",
      icon: <Heart className="h-5 w-5 text-white" />,
      change: 5,
      bgColor: "bg-teddy-pink",
      delay: 100
    },
    {
      title: "Learning Topics",
      value: "Science, Math",
      icon: <Brain className="h-5 w-5 text-white" />,
      change: 18,
      bgColor: "bg-teddy-mint",
      delay: 200
    },
    {
      title: "Total Conversations",
      value: "42 today",
      icon: <MessageCircle className="h-5 w-5 text-white" />,
      change: -3,
      bgColor: "bg-teddy-purple",
      delay: 300
    }
  ];
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            bgColor={stat.bgColor}
            delay={stat.delay}
          />
        ))}
      </div>
      
      <AnimatedCard delay={400} className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-teddy-mint/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        
        <h2 className="text-xl font-semibold mb-6 relative z-10">Recent Conversations</h2>
        
        <div className="space-y-6 relative z-10">
          {recentConversations.map((convo) => (
            <div key={convo.id} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{convo.question}</span>
                <span className="text-sm text-gray-500">{convo.timestamp}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{convo.answer}</p>
              <div className="mt-2">
                <span className={cn(
                  "inline-flex rounded-full px-2 py-1 text-xs",
                  convo.sentiment === "curious" && "bg-teddy-blue/10 text-teddy-blue",
                  convo.sentiment === "excited" && "bg-teddy-coral/10 text-teddy-coral",
                  convo.sentiment === "sad" && "bg-teddy-purple/10 text-teddy-purple"
                )}>
                  {convo.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Overview;
