
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import AnimatedCard from '@/components/ui/AnimatedCard';

const Analytics: React.FC = () => {
  // Sample data for charts
  const topicData = [
    { name: 'Science', value: 35 },
    { name: 'Math', value: 20 },
    { name: 'Social', value: 15 },
    { name: 'Language', value: 15 },
    { name: 'Arts', value: 10 },
    { name: 'Other', value: 5 },
  ];
  
  const sentimentData = [
    { date: 'Mon', happy: 8, curious: 12, confused: 5 },
    { date: 'Tue', happy: 10, curious: 8, confused: 3 },
    { date: 'Wed', happy: 7, curious: 10, confused: 4 },
    { date: 'Thu', happy: 12, curious: 15, confused: 2 },
    { date: 'Fri', happy: 14, curious: 9, confused: 1 },
    { date: 'Sat', happy: 10, curious: 7, confused: 3 },
    { date: 'Sun', happy: 11, curious: 13, confused: 2 },
  ];
  
  const learningStyleData = [
    { name: 'Visual', score: 72 },
    { name: 'Auditory', score: 56 },
    { name: 'Kinesthetic', score: 84 },
    { name: 'Reading', score: 68 },
    { name: 'Social', score: 76 },
    { name: 'Independent', score: 62 },
  ];
  
  const pieColors = ['#A0D2EB', '#FFABE1', '#FEC89A', '#A2E1DB', '#B8B5FF', '#FF8882'];
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics & Insights</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedCard className="h-full">
          <h2 className="text-xl font-semibold mb-6">Topic Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {topicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {topicData.map((topic, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: pieColors[index % pieColors.length] }}
                ></div>
                <span className="text-sm">{topic.name}</span>
              </div>
            ))}
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={100} className="h-full">
          <h2 className="text-xl font-semibold mb-6">Mood Trends (7 Day)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sentimentData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="happy" stroke="#A2E1DB" strokeWidth={2} />
                <Line type="monotone" dataKey="curious" stroke="#A0D2EB" strokeWidth={2} />
                <Line type="monotone" dataKey="confused" stroke="#B8B5FF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={200} className="h-full lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6">Learning Style Assessment</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={learningStyleData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#FEC89A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-teddy-blue/10 rounded-lg">
            <h3 className="font-semibold text-teddy-blue mb-2">AI Insight</h3>
            <p className="text-sm">
              Your child appears to be primarily a kinesthetic learner who enjoys hands-on activities. They also thrive in social learning environments. Consider incorporating more physical activities and group learning sessions to maximize engagement and retention.
            </p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Analytics;
