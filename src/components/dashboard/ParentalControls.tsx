
import React, { useState } from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { cn } from '@/lib/utils';
import { Shield, Clock, List, X, AlertTriangle, Check } from 'lucide-react';

const ParentalControls: React.FC = () => {
  const [usageLimit, setUsageLimit] = useState(60);
  const [blockedTopics, setBlockedTopics] = useState<string[]>([
    'inappropriate language',
    'violence',
    'politics'
  ]);
  const [alertThreshold, setAlertThreshold] = useState('moderate');
  const [scheduleRestrictions, setScheduleRestrictions] = useState<string[]>(['Bedtime']);
  
  const availableTopics = [
    'inappropriate language',
    'violence',
    'politics',
    'drugs',
    'relationships',
    'money',
    'religion',
    'scary content'
  ];
  
  const periods = ['Morning', 'Afternoon', 'Evening', 'Bedtime'];
  
  const handleTopicToggle = (topic: string) => {
    if (blockedTopics.includes(topic)) {
      setBlockedTopics(blockedTopics.filter(t => t !== topic));
    } else {
      setBlockedTopics([...blockedTopics, topic]);
    }
  };
  
  const handlePeriodToggle = (period: string) => {
    if (scheduleRestrictions.includes(period)) {
      setScheduleRestrictions(scheduleRestrictions.filter(p => p !== period));
    } else {
      setScheduleRestrictions([...scheduleRestrictions, period]);
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Parental Controls</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Configure how your child interacts with TeddyAI to ensure a safe and educational experience.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedCard className="h-full">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-teddy-blue text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Daily Usage Limits</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Set a daily time limit for your child's interactions with TeddyAI.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Daily Limit: {usageLimit} minutes
              </label>
              <input
                type="range"
                min="15"
                max="180"
                step="15"
                value={usageLimit}
                onChange={(e) => setUsageLimit(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15m</span>
                <span>1h</span>
                <span>2h</span>
                <span>3h</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-medium mb-3">Schedule Restrictions</h3>
              <div className="flex flex-wrap gap-3">
                {periods.map(period => (
                  <button
                    key={period}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-colors",
                      scheduleRestrictions.includes(period)
                        ? "bg-teddy-blue/20 border border-teddy-blue/30 text-teddy-blue"
                        : "border border-gray-200 dark:border-gray-700 hover:bg-teddy-blue/10 hover:border-teddy-blue/30"
                    )}
                    onClick={() => handlePeriodToggle(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                TeddyAI will not be available during checked periods.
              </p>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={100} className="h-full">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-teddy-purple text-white">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Alert Settings</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Choose when to receive notifications about your child's interactions.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Emotional Distress Detection</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="alertThreshold"
                    checked={alertThreshold === 'high'}
                    onChange={() => setAlertThreshold('high')}
                    className="h-4 w-4 text-teddy-blue"
                  />
                  <span>High sensitivity (alert for mild distress)</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="alertThreshold"
                    checked={alertThreshold === 'moderate'}
                    onChange={() => setAlertThreshold('moderate')}
                    className="h-4 w-4 text-teddy-blue"
                  />
                  <span>Moderate sensitivity (recommended)</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="alertThreshold"
                    checked={alertThreshold === 'low'}
                    onChange={() => setAlertThreshold('low')}
                    className="h-4 w-4 text-teddy-blue"
                  />
                  <span>Low sensitivity (alert only for severe distress)</span>
                </label>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-medium mb-3">Alert Types</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={true}
                    className="h-4 w-4 text-teddy-blue"
                    readOnly
                  />
                  <span>Emotional distress detected</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={true}
                    className="h-4 w-4 text-teddy-blue"
                    readOnly
                  />
                  <span>Blocked topic attempted</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={true}
                    className="h-4 w-4 text-teddy-blue"
                    readOnly
                  />
                  <span>Usage limit reached</span>
                </label>
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={200} className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-teddy-coral text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Content Filtering</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Select topics that TeddyAI should avoid discussing with your child.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Currently Blocked Topics</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {blockedTopics.map(topic => (
                <div 
                  key={topic}
                  className="px-3 py-1.5 rounded-full text-sm bg-teddy-coral/10 text-teddy-coral border border-teddy-coral/30 flex items-center gap-2"
                >
                  <span>{topic}</span>
                  <button 
                    className="h-4 w-4 rounded-full bg-teddy-coral/20 hover:bg-teddy-coral/30 flex items-center justify-center"
                    onClick={() => handleTopicToggle(topic)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {blockedTopics.length === 0 && (
                <p className="text-sm text-gray-500">No topics are currently blocked.</p>
              )}
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-medium mb-3">Available Topics to Block</h3>
              <div className="flex flex-wrap gap-3">
                {availableTopics
                  .filter(topic => !blockedTopics.includes(topic))
                  .map(topic => (
                    <button
                      key={topic}
                      className="px-3 py-1.5 rounded-full text-sm border border-gray-200 dark:border-gray-700 hover:bg-teddy-coral/10 hover:border-teddy-coral/30 transition-colors"
                      onClick={() => handleTopicToggle(topic)}
                    >
                      {topic}
                    </button>
                  ))
                }
              </div>
              
              {availableTopics.filter(topic => !blockedTopics.includes(topic)).length === 0 && (
                <div className="flex items-center gap-2 text-teddy-mint">
                  <Check className="h-4 w-4" />
                  <p className="text-sm">All available topics are blocked.</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>
      
      <div className="flex justify-end">
        <button className="bg-teddy-blue text-white px-6 py-2 rounded-lg hover:bg-teddy-blue/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ParentalControls;
