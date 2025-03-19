import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Calendar, MessageCircle, Settings, Shield, Users, WavesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ParentDashboardDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Demo data for charts
  const learningCategoryData = [
    { name: 'Science', value: 35, color: '#1EAEDB' },
    { name: 'Math', value: 25, color: '#33C3F0' },
    { name: 'Language', value: 20, color: '#0FA0CE' },
    { name: 'Arts', value: 15, color: '#0D5D79' },
    { name: 'Other', value: 5, color: '#D3E4FD' },
  ];

  const weeklyUsageData = [
    { day: 'Mon', minutes: 35 },
    { day: 'Tue', minutes: 42 },
    { day: 'Wed', minutes: 28 },
    { day: 'Thu', minutes: 45 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 65 },
    { day: 'Sun', minutes: 55 },
  ];

  // Recent interactions data
  const recentInteractions = [
    { id: 1, topic: 'Marine Biology 🐬', time: '2 hours ago', duration: '15 mins', insight: 'Strong interest in dolphin behavior' },
    { id: 2, topic: 'Basic Math ➗', time: 'Yesterday', duration: '20 mins', insight: 'Practiced addition and subtraction' },
    { id: 3, topic: 'Story Time 📚', time: 'Yesterday', duration: '25 mins', insight: 'Engaged with interactive storytelling' },
    { id: 4, topic: 'Space Exploration 🚀', time: '3 days ago', duration: '30 mins', insight: 'Asked many questions about planets' },
  ];

  // Milestones data
  const recentMilestones = [
    { id: 1, achievement: 'Science Explorer', description: 'Completed 10 science conversations', date: '2 days ago', icon: <BrainCircuit className="h-8 w-8 p-1.5 text-white" /> },
    { id: 2, achievement: 'Curious Mind', description: 'Asked 50+ questions', date: '1 week ago', icon: <BookOpen className="h-8 w-8 p-1.5 text-white" /> },
    { id: 3, achievement: 'Consistent Learner', description: 'Used Bubbles 5 days in a row', date: '2 weeks ago', icon: <Calendar className="h-8 w-8 p-1.5 text-white" /> },
  ];

  // Suggested activities
  const suggestedActivities = [
    { id: 1, title: 'Ocean Explorer', description: 'Learn about different sea creatures', icon: <WavesIcon className="h-8 w-8 p-1.5 text-white" /> },
    { id: 2, title: 'Math Challenge', description: 'Practice counting with fun games', icon: <Activity className="h-8 w-8 p-1.5 text-white" /> },
    { id: 3, title: 'Reading Adventure', description: 'Interactive storytelling session', icon: <BookOpen className="h-8 w-8 p-1.5 text-white" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bubbles-cream/30 dark:from-bubbles-deep dark:to-bubbles-deep/70">
      <Header />
      
      <main className="container mx-auto pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-bubbles-deep dark:text-white mb-2">
                Parent Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Gain insights into your child's learning journey with Bubbles
              </p>
            </motion.div>
            
            <div className="flex items-center gap-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-bubbles-deep/40 rounded-full p-1 shadow-sm"
              >
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Parent Avatar" 
                  className="w-10 h-10 rounded-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="font-medium text-bubbles-deep dark:text-white">Emma's Parent</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Emma (Age 6)</p>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="bg-white dark:bg-bubbles-deep/40 p-1 rounded-lg shadow-sm w-full max-w-2xl mx-auto grid grid-cols-4">
                <TabsTrigger value="overview" className="data-[state=active]:bg-bubbles-blue data-[state=active]:text-white rounded-md py-2">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="learning" className="data-[state=active]:bg-bubbles-blue data-[state=active]:text-white rounded-md py-2">
                  Learning
                </TabsTrigger>
                <TabsTrigger value="insights" className="data-[state=active]:bg-bubbles-blue data-[state=active]:text-white rounded-md py-2">
                  Insights
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-bubbles-blue data-[state=active]:text-white rounded-md py-2">
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Stats overview row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { title: 'Total Learning Time', value: '14h 35m', icon: <Clock className="h-5 w-5" />, color: 'bg-bubbles-blue' },
                    { title: 'Topics Explored', value: '28', icon: <BookOpen className="h-5 w-5" />, color: 'bg-bubbles-teal' },
                    { title: 'Skills Improved', value: '12', icon: <BrainCircuit className="h-5 w-5" />, color: 'bg-bubbles-skyblue' },
                    { title: 'Achievements', value: '8', icon: <Award className="h-5 w-5" />, color: 'bg-bubbles-navy' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-4 shadow-sm flex items-center"
                    >
                      <div className={`${stat.color} rounded-full p-2 text-white mr-3`}>
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                        <p className="text-2xl font-bold text-bubbles-deep dark:text-white">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Charts row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-medium text-bubbles-deep dark:text-white mb-4">Learning Categories</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={learningCategoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {learningCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend 
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-medium text-bubbles-deep dark:text-white mb-4">Weekly Usage</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={weeklyUsageData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" />
                          <YAxis 
                            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value} min`, 'Usage Time']}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              borderColor: '#e2e8f0',
                              borderRadius: '0.5rem',
                              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                            }}
                          />
                          <Bar dataKey="minutes" fill="#1EAEDB" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>
                
                {/* Recent interactions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-bubbles-deep dark:text-white">Recent Interactions</h3>
                    <button className="text-bubbles-blue hover:underline flex items-center text-sm">
                      View all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentInteractions.map((interaction, index) => (
                      <motion.div
                        key={interaction.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-bubbles-deep dark:text-white">{interaction.topic}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Duration: {interaction.duration}</p>
                          </div>
                          <span className="text-xs text-gray-400">{interaction.time}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{interaction.insight}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="learning" className="space-y-6">
                {/* Milestones */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-medium text-bubbles-deep dark:text-white mb-4">Recent Milestones</h3>
                  
                  <div className="space-y-4">
                    {recentMilestones.map((milestone, index) => (
                      <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="flex items-start gap-4 border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="bg-bubbles-blue rounded-full flex-shrink-0">
                          {milestone.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-bubbles-deep dark:text-white">{milestone.achievement}</h4>
                            <span className="text-xs text-gray-400">{milestone.date}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{milestone.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Suggested activities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-medium text-bubbles-deep dark:text-white mb-4">Suggested Learning Activities</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {suggestedActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="bg-bubbles-cream/30 dark:bg-bubbles-blue/10 rounded-xl p-4 hover:shadow-md transition-all"
                      >
                        <div className="bg-bubbles-teal rounded-full w-12 h-12 flex items-center justify-center mb-3">
                          {activity.icon}
                        </div>
                        <h4 className="font-medium text-bubbles-deep dark:text-white">{activity.title}</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                        <button className="mt-3 text-bubbles-blue hover:underline text-sm flex items-center">
                          Start activity <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="insights" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-medium text-bubbles-deep dark:text-white mb-4">Learning Insights</h3>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="bg-bubbles-blue/20 dark:bg-bubbles-blue/30 p-2 rounded-full mr-3">
                          <BrainCircuit className="h-5 w-5 text-bubbles-blue" />
                        </div>
                        <h4 className="font-medium text-bubbles-deep dark:text-white">Learning Style</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Emma shows strong preference for visual and auditory learning. She engages best with colorful illustrations and interactive storytelling.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-md p-3 text-sm text-gray-600 dark:text-gray-300">
                        <strong>Recommendation:</strong> Introduce more visual science experiments and continue with interactive storytelling sessions.
                      </div>
                    </div>
                    
                    <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="bg-bubbles-teal/20 dark:bg-bubbles-teal/30 p-2 rounded-full mr-3">
                          <Activity className="h-5 w-5 text-bubbles-teal" />
                        </div>
                        <h4 className="font-medium text-bubbles-deep dark:text-white">Progress Analysis</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Significant improvement in vocabulary over the last month. Shows increasing curiosity about marine life and astronomy topics.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-md p-3 text-sm text-gray-600 dark:text-gray-300">
                        <strong>Recommendation:</strong> Explore more advanced ocean and space topics while maintaining the fun, approachable learning style.
                      </div>
                    </div>
                    
                    <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="bg-bubbles-skyblue/20 dark:bg-bubbles-skyblue/30 p-2 rounded-full mr-3">
                          <LineChart className="h-5 w-5 text-bubbles-skyblue" />
                        </div>
                        <h4 className="font-medium text-bubbles-deep dark:text-white">Engagement Patterns</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Highest engagement occurs in the early evening (5-7 pm). Conversation duration has been steadily increasing, showing deeper interest.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-md p-3 text-sm text-gray-600 dark:text-gray-300">
                        <strong>Recommendation:</strong> Schedule new learning activities during peak engagement times and gradually introduce slightly longer learning sessions.
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm col-span-1"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-bubbles-blue p-2 rounded-full mr-3">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-bubbles-deep dark:text-white">Account Settings</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 flex justify-between items-center">
                        <span className="font-medium">Profile Information</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 flex justify-between items-center">
                        <span className="font-medium">Change Password</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 flex justify-between items-center">
                        <span className="font-medium">Billing Details</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 flex justify-between items-center">
                        <span className="font-medium">Subscription Plan</span>
                        <span className="bg-bubbles-blue/10 text-bubbles-blue text-xs py-1 px-2 rounded-full">
                          Premium
                        </span>
                      </button>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm col-span-1"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-bubbles-teal p-2 rounded-full mr-3">
                        <Bell className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-bubbles-deep dark:text-white">Notifications</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Daily Progress Reports</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bubbles-blue"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Achievement Alerts</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bubbles-blue"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Learning Recommendations</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bubbles-blue"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Weekly Summary</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bubbles-blue"></div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-bubbles-deep/40 rounded-xl p-6 shadow-sm col-span-1"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-bubbles-skyblue p-2 rounded-full mr-3">
                        <Settings className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-bubbles-deep dark:text-white">Preferences</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Content Filtering</span>
                        <select className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-md text-sm p-2">
                          <option>Strict</option>
                          <option>Moderate</option>
                          <option>Light</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Age-Appropriate Content</span>
                        <select className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-md text-sm p-2">
                          <option>Ages 5-7</option>
                          <option>Ages 8-10</option>
                          <option>Ages 11-13</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Daily Usage Limit</span>
                        <select className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-md text-sm p-2">
                          <option>1 hour</option>
                          <option>2 hours</option>
                          <option>3 hours</option>
                          <option>No limit</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Data & Privacy</span>
                        <button className="text-bubbles-blue hover:underline text-sm">
                          Manage Settings
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboardDemo;
