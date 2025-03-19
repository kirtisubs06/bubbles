import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Overview from '@/components/dashboard/Overview';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Map, Lightbulb, Music, Microscope, Globe } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Parent Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage your child's learning companion experience.</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Learning Insights</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Overview />
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-blue/20 dark:to-bubbles-teal/10 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Top Learning Topics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-white/60 dark:bg-white/10 p-3 rounded-lg">
                  <div className="bg-bubbles-blue/20 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-bubbles-blue" />
                  </div>
                  <div>
                    <div className="font-medium">Reading</div>
                    <div className="text-xs text-gray-500">42 interactions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 dark:bg-white/10 p-3 rounded-lg">
                  <div className="bg-bubbles-teal/20 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-bubbles-teal" />
                  </div>
                  <div>
                    <div className="font-medium">Critical Thinking</div>
                    <div className="text-xs text-gray-500">38 interactions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 dark:bg-white/10 p-3 rounded-lg">
                  <div className="bg-bubbles-skyblue/20 p-2 rounded-full">
                    <Map className="h-5 w-5 text-bubbles-skyblue" />
                  </div>
                  <div>
                    <div className="font-medium">Geography</div>
                    <div className="text-xs text-gray-500">27 interactions</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 dark:bg-white/10 p-3 rounded-lg">
                  <div className="bg-bubbles-lime/20 p-2 rounded-full">
                    <Lightbulb className="h-5 w-5 text-bubbles-lime" />
                  </div>
                  <div>
                    <div className="font-medium">Science</div>
                    <div className="text-xs text-gray-500">31 interactions</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-blue/20 dark:to-bubbles-teal/10 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Learning Patterns</h3>
              <div className="space-y-4">
                <div className="bg-white/60 dark:bg-white/10 p-4 rounded-lg">
                  <h4 className="font-medium text-bubbles-deep dark:text-white mb-2">Peak Learning Times</h4>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-bubbles-blue/30 rounded-full w-32"></div>
                    <div className="text-sm text-gray-500">After school (3-5pm)</div>
                  </div>
                </div>
                <div className="bg-white/60 dark:bg-white/10 p-4 rounded-lg">
                  <h4 className="font-medium text-bubbles-deep dark:text-white mb-2">Most Engaging Topics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-bubbles-teal"></div>
                      <div className="text-sm">Dinosaurs</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-bubbles-blue"></div>
                      <div className="text-sm">Space exploration</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-bubbles-skyblue"></div>
                      <div className="text-sm">Storytelling</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-blue/20 dark:to-bubbles-teal/10 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Educational Growth</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 dark:bg-white/10 p-4 rounded-lg flex items-center space-x-4">
                <div className="bg-bubbles-yellow/20 p-3 rounded-full">
                  <Globe className="h-6 w-6 text-bubbles-yellow" />
                </div>
                <div>
                  <h4 className="font-medium text-bubbles-deep dark:text-white">Global Knowledge</h4>
                  <p className="text-sm text-gray-500">Learning about different countries and cultures</p>
                </div>
              </div>
              <div className="bg-white/60 dark:bg-white/10 p-4 rounded-lg flex items-center space-x-4">
                <div className="bg-bubbles-teal/20 p-3 rounded-full">
                  <Music className="h-6 w-6 text-bubbles-teal" />
                </div>
                <div>
                  <h4 className="font-medium text-bubbles-deep dark:text-white">Arts & Music</h4>
                  <p className="text-sm text-gray-500">Exploring creative expression through sound and art</p>
                </div>
              </div>
              <div className="bg-white/60 dark:bg-white/10 p-4 rounded-lg flex items-center space-x-4">
                <div className="bg-bubbles-blue/20 p-3 rounded-full">
                  <Microscope className="h-6 w-6 text-bubbles-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-bubbles-deep dark:text-white">Scientific Inquiry</h4>
                  <p className="text-sm text-gray-500">Asking questions and seeking evidence-based answers</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <div className="bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-blue/20 dark:to-bubbles-teal/10 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <p className="text-muted-foreground mb-4">
              Manage your account settings and preferences
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded bg-white/70 dark:bg-white/10">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive email updates about your child's activity</p>
                </div>
                <div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
                    Enabled
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded bg-white/70 dark:bg-white/10">
                <div>
                  <h4 className="font-medium">Daily Time Limits</h4>
                  <p className="text-sm text-muted-foreground">Set maximum interaction time per day</p>
                </div>
                <div>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded">
                    Configure
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded bg-white/70 dark:bg-white/10">
                <div>
                  <h4 className="font-medium">Content Filters</h4>
                  <p className="text-sm text-muted-foreground">Customize which topics are available</p>
                </div>
                <div>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="help" className="space-y-6">
          <div className="bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-blue/20 dark:to-bubbles-teal/10 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Help & Support</h3>
            <p className="text-muted-foreground mb-4">
              Get assistance and learn more about your interactive learning companion
            </p>
            <div className="space-y-4">
              <div className="p-3 border rounded bg-white/70 dark:bg-white/10">
                <h4 className="font-medium">Frequently Asked Questions</h4>
                <p className="text-sm text-muted-foreground mb-2">Find answers to common questions</p>
                <button className="text-primary text-sm">View FAQs</button>
              </div>
              
              <div className="p-3 border rounded bg-white/70 dark:bg-white/10">
                <h4 className="font-medium">Contact Support</h4>
                <p className="text-sm text-muted-foreground mb-2">Need help? Reach out to our support team</p>
                <button className="text-primary text-sm">Contact Us</button>
              </div>
              
              <div className="p-3 border rounded bg-white/70 dark:bg-white/10">
                <h4 className="font-medium">User Guide</h4>
                <p className="text-sm text-muted-foreground mb-2">Learn how to use all features</p>
                <button className="text-primary text-sm">Read Guide</button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;
