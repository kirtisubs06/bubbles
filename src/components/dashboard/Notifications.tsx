
import React from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Bell, Brain, AlertCircle, Clock, Shield, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'alert' | 'insight' | 'tip' | 'update';
  read: boolean;
  date: string;
  time: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      title: 'Emotional Insight',
      message: 'Emma expressed feeling sad about a friend situation at school. Consider checking in with her about this.',
      type: 'alert',
      read: false,
      date: 'Today',
      time: '2:45 PM'
    },
    {
      id: 2,
      title: 'Learning Interest Detected',
      message: 'Noah has shown increasing interest in dinosaurs and prehistoric animals. Check out the recommended activities!',
      type: 'insight',
      read: true,
      date: 'Today',
      time: '11:30 AM'
    },
    {
      id: 3,
      title: 'Weekly Learning Summary',
      message: 'Your weekly report is ready! See what topics your child explored this week.',
      type: 'update',
      read: false,
      date: 'Yesterday',
      time: '9:15 AM'
    },
    {
      id: 4,
      title: 'Blocked Topic Attempted',
      message: 'TeddyAI redirected a conversation that approached a blocked topic (violence).',
      type: 'alert',
      read: true,
      date: '2 days ago',
      time: '4:20 PM'
    },
    {
      id: 5,
      title: 'Parent Tip: Developing Curiosity',
      message: 'Try asking your child open-ended questions about their day to encourage critical thinking skills.',
      type: 'tip',
      read: true,
      date: '3 days ago',
      time: '10:00 AM'
    }
  ]);
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-teddy-coral" />;
      case 'insight':
        return <Brain className="h-5 w-5 text-teddy-blue" />;
      case 'tip':
        return <Check className="h-5 w-5 text-teddy-mint" />;
      case 'update':
        return <Clock className="h-5 w-5 text-teddy-purple" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-teddy-coral/10';
      case 'insight':
        return 'bg-teddy-blue/10';
      case 'tip':
        return 'bg-teddy-mint/10';
      case 'update':
        return 'bg-teddy-purple/10';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay informed about your child's learning journey
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-sm text-teddy-blue hover:text-teddy-blue/80"
            >
              Mark all as read
            </button>
          )}
          <div className="bg-teddy-blue/10 text-teddy-blue px-3 py-1 rounded-full text-sm font-medium">
            {unreadCount} unread
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <AnimatedCard 
            key={notification.id}
            delay={index * 100}
            className={cn(
              "border-l-4 transition-colors",
              notification.read ? "border-l-gray-200 dark:border-l-gray-700" : 
                notification.type === 'alert' ? "border-l-teddy-coral" :
                notification.type === 'insight' ? "border-l-teddy-blue" :
                notification.type === 'tip' ? "border-l-teddy-mint" : "border-l-teddy-purple"
            )}
          >
            <div className="flex gap-4">
              <div className={cn(
                "p-3 rounded-full w-12 h-12 flex items-center justify-center",
                getNotificationColor(notification.type)
              )}>
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between mb-1">
                  <h3 className={cn(
                    "font-medium",
                    !notification.read && "font-semibold"
                  )}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{notification.date} at {notification.time}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {notification.message}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs">
                    <span className={cn(
                      "px-2 py-1 rounded-full",
                      getNotificationColor(notification.type)
                    )}>
                      {notification.type}
                    </span>
                  </div>
                  
                  {!notification.read && (
                    <button 
                      className="text-xs text-teddy-blue hover:text-teddy-blue/80"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
      
      <div className="flex justify-center">
        <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Notifications;
