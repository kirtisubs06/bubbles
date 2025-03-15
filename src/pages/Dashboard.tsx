
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Overview from '@/components/dashboard/Overview';
import { motion } from 'framer-motion';

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
        <p className="text-muted-foreground">Monitor and manage your child's TeddyAI experience.</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Overview />
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Top Learning Topics</h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Charts will appear here when your child starts using TeddyAI
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Learning Patterns</h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Data will appear after regular usage
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <p className="text-muted-foreground mb-4">
              Manage your account settings and preferences
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded">
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
              
              <div className="flex justify-between items-center p-3 border rounded">
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
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="help" className="space-y-6">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Help & Support</h3>
            <p className="text-muted-foreground mb-4">
              Get assistance and learn more about TeddyAI features
            </p>
            <div className="space-y-4">
              <div className="p-3 border rounded">
                <h4 className="font-medium">Frequently Asked Questions</h4>
                <p className="text-sm text-muted-foreground mb-2">Find answers to common questions</p>
                <button className="text-primary text-sm">View FAQs</button>
              </div>
              
              <div className="p-3 border rounded">
                <h4 className="font-medium">Contact Support</h4>
                <p className="text-sm text-muted-foreground mb-2">Need help? Reach out to our support team</p>
                <button className="text-primary text-sm">Contact Us</button>
              </div>
              
              <div className="p-3 border rounded">
                <h4 className="font-medium">User Guide</h4>
                <p className="text-sm text-muted-foreground mb-2">Learn how to use all TeddyAI features</p>
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
