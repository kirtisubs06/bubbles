
import React, { useState } from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Clock, Bell, Shield, List } from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const [usageLimit, setUsageLimit] = useState(60);
  const [topicBlacklist, setTopicBlacklist] = useState(['inappropriate', 'drugs', 'politics']);
  const [notifications, setNotifications] = useState({
    dailySummary: true,
    emotionalAlerts: true,
    weeklyInsights: true,
    usageLimits: false
  });
  
  const availableTopics = [
    'inappropriate',
    'drugs',
    'alcohol',
    'violence',
    'politics',
    'religion',
    'money',
    'adult relationships'
  ];
  
  const handleTopicToggle = (topic: string) => {
    if (topicBlacklist.includes(topic)) {
      setTopicBlacklist(topicBlacklist.filter(t => t !== topic));
    } else {
      setTopicBlacklist([...topicBlacklist, topic]);
    }
  };
  
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedCard className="h-full">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-teddy-blue text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Daily Usage Limits</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Set a daily time limit for your child's interactions with the teddy bear.
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
                {['Morning', 'Afternoon', 'Evening', 'Bedtime'].map(period => (
                  <button
                    key={period}
                    className="px-3 py-1.5 rounded-full text-sm border border-gray-200 dark:border-gray-700 hover:bg-teddy-blue/10 hover:border-teddy-blue/30 transition-colors"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={100} className="h-full">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-teddy-pink text-white">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Choose what alerts and reports you'd like to receive.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <label htmlFor={key} className="text-sm font-medium cursor-pointer">
                  {key === 'dailySummary' && 'Daily Activity Summary'}
                  {key === 'emotionalAlerts' && 'Emotional Distress Alerts'}
                  {key === 'weeklyInsights' && 'Weekly Learning Insights'}
                  {key === 'usageLimits' && 'Usage Limit Alerts'}
                </label>
                <button
                  id={key}
                  role="switch"
                  aria-checked={enabled}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teddy-blue",
                    enabled ? "bg-teddy-blue" : "bg-gray-200 dark:bg-gray-700"
                  )}
                  onClick={() => handleNotificationToggle(key as keyof typeof notifications)}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      enabled ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={200} className="h-full lg:col-span-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-teddy-mint text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Content Filters</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Select topics that should be off-limits for discussion.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Blocked Topics</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {topicBlacklist.map(topic => (
                <div 
                  key={topic}
                  className="px-3 py-1.5 rounded-full text-sm bg-teddy-coral/10 text-teddy-coral border border-teddy-coral/30 flex items-center gap-2"
                >
                  <span>{topic}</span>
                  <button 
                    className="h-4 w-4 rounded-full bg-teddy-coral/20 hover:bg-teddy-coral/30 flex items-center justify-center"
                    onClick={() => handleTopicToggle(topic)}
                  >
                    <span className="text-xs">×</span>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-medium mb-3">Available Topics to Block</h3>
              <div className="flex flex-wrap gap-3">
                {availableTopics
                  .filter(topic => !topicBlacklist.includes(topic))
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
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Settings;
