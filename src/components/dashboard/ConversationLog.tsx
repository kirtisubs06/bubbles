
import React, { useState } from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Search, Filter, Calendar, ChevronDown, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Conversation {
  id: number;
  childMessage: string;
  aiResponse: string;
  topic: string;
  sentiment: 'happy' | 'curious' | 'sad' | 'excited' | 'confused';
  timestamp: string;
  date: string;
}

const conversations: Conversation[] = [
  {
    id: 1,
    childMessage: "Why do leaves change color in fall?",
    aiResponse: "Great question! Leaves change color in the fall because trees stop making chlorophyll, which is what makes leaves green. When that happens, we can see the other colors that were hidden - like yellow, orange, and red!",
    topic: "Science",
    sentiment: "curious",
    timestamp: "3:42 PM",
    date: "Today"
  },
  {
    id: 2,
    childMessage: "I made a new friend at school today!",
    aiResponse: "That's wonderful news! Making new friends is so special. What's your new friend's name? What do you like about them?",
    topic: "Social",
    sentiment: "happy",
    timestamp: "5:15 PM",
    date: "Today"
  },
  {
    id: 3,
    childMessage: "How do airplanes stay in the sky?",
    aiResponse: "Airplanes can fly because of something called lift. Their wings are shaped in a special way that when air moves over and under them, it pushes the plane up. It's like how birds' wings work, but made of metal instead of feathers!",
    topic: "Science",
    sentiment: "curious",
    timestamp: "6:30 PM",
    date: "Yesterday"
  },
  {
    id: 4,
    childMessage: "I don't want to go to bed yet.",
    aiResponse: "I understand it can be hard to stop playing and go to sleep. But sleep helps your body grow strong and your brain remember all the cool things you learned today. Maybe we could think of a nice story to help you feel sleepy?",
    topic: "Behavior",
    sentiment: "sad",
    timestamp: "8:00 PM",
    date: "Yesterday"
  },
  {
    id: 5,
    childMessage: "What's the biggest number?",
    aiResponse: "That's a really interesting question! Numbers actually go on forever, so there isn't a 'biggest' number. Whenever you think you have the biggest number, you can always add 1 to it to get an even bigger number! Mathematicians call this 'infinity'.",
    topic: "Math",
    sentiment: "curious",
    timestamp: "4:15 PM",
    date: "Jun 12"
  }
];

const getSentimentColor = (sentiment: string) => {
  switch(sentiment) {
    case 'happy': return 'bg-teddy-mint/10 text-teddy-mint';
    case 'curious': return 'bg-teddy-blue/10 text-teddy-blue';
    case 'sad': return 'bg-teddy-purple/10 text-teddy-purple';
    case 'excited': return 'bg-teddy-coral/10 text-teddy-coral';
    case 'confused': return 'bg-teddy-peach/10 text-teddy-peach';
    default: return 'bg-gray-200 text-gray-700';
  }
};

const ConversationLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  
  // Extract unique topics and sentiments for filters
  const topics = Array.from(new Set(conversations.map(c => c.topic)));
  const sentiments = Array.from(new Set(conversations.map(c => c.sentiment)));
  
  // Filter conversations based on search and filters
  const filteredConversations = conversations.filter(convo => {
    const matchesSearch = searchTerm === '' || 
      convo.childMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      convo.aiResponse.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSentiment = selectedSentiment === null || convo.sentiment === selectedSentiment;
    const matchesTopic = selectedTopic === null || convo.topic === selectedTopic;
    
    return matchesSearch && matchesSentiment && matchesTopic;
  });
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Conversation Log</h1>
      
      <AnimatedCard className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teddy-blue/50 bg-white dark:bg-teddy-charcoal/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-teddy-charcoal/50 text-sm"
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              >
                <Calendar className="h-4 w-4" />
                Date
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {isDateDropdownOpen && (
                <div className="absolute top-full mt-1 right-0 w-52 bg-white dark:bg-teddy-charcoal border border-gray-200 dark:border-gray-700 rounded-lg shadow-medium z-10 p-2">
                  {/* Date filter options would go here */}
                  <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">Last 7 days</div>
                  <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">Last 30 days</div>
                  <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">All time</div>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-teddy-charcoal/50 text-sm">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              
              <div className="absolute top-full mt-1 right-0 w-52 bg-white dark:bg-teddy-charcoal border border-gray-200 dark:border-gray-700 rounded-lg shadow-medium z-10 p-2 hidden group-hover:block">
                <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                  <p className="font-medium text-xs uppercase text-gray-500 mb-2">Topics</p>
                  {topics.map(topic => (
                    <div 
                      key={topic}
                      className={cn(
                        "p-1.5 rounded text-sm cursor-pointer",
                        selectedTopic === topic ? "bg-teddy-blue/10 text-teddy-blue" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
                
                <div className="p-2 pt-3">
                  <p className="font-medium text-xs uppercase text-gray-500 mb-2">Sentiments</p>
                  <div className="flex flex-wrap gap-2">
                    {sentiments.map(sentiment => (
                      <div 
                        key={sentiment}
                        className={cn(
                          "px-2 py-1 rounded-full text-xs cursor-pointer",
                          selectedSentiment === sentiment 
                            ? getSentimentColor(sentiment) 
                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                        onClick={() => setSelectedSentiment(selectedSentiment === sentiment ? null : sentiment)}
                      >
                        {sentiment}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>
      
      <div className="space-y-6">
        {filteredConversations.map((convo, index) => (
          <AnimatedCard 
            key={convo.id} 
            delay={100 * index}
            className="border border-gray-100 dark:border-gray-800"
          >
            <div className="flex justify-between mb-4">
              <div className="flex gap-2">
                <span className={cn("px-2 py-1 rounded-full text-xs", getSentimentColor(convo.sentiment))}>
                  {convo.sentiment}
                </span>
                <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                  {convo.topic}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {convo.date} at {convo.timestamp}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teddy-blue flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">👦</span>
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-4">
                  <p>{convo.childMessage}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 bg-teddy-pink/10 rounded-2xl rounded-tr-none p-4">
                  <p>{convo.aiResponse}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-teddy-pink flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">🧸</span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

export default ConversationLog;
