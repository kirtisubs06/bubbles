
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

// Type for chat messages
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'teddy';
  timestamp: Date;
}

// Sample responses from the teddy
const SAMPLE_RESPONSES = [
  "I love learning about space! Did you know that stars twinkle because their light gets bent as it travels through our atmosphere?",
  "That's a great question! Rainbows appear when sunlight passes through raindrops, which act like tiny prisms!",
  "I think dinosaurs are amazing too! The Tyrannosaurus Rex had teeth as big as bananas!",
  "Let me tell you a short story about a brave little star who wanted to explore the universe...",
  "I'd love to learn more about your favorite animals! What do you like most about them?",
  "Did you know that butterflies taste with their feet? Nature is full of surprises!",
  "You're so creative! I love hearing your ideas about magical creatures.",
  "What kind of adventures would you like to go on today? We could imagine visiting the moon!"
];

// Map certain user inputs to specific responses for a more interactive chatbot
const SPECIFIC_RESPONSES: Record<string, string> = {
  "hello": "Hi there! I'm Teddy, your friendly bear companion! What would you like to talk about today?",
  "hi": "Hello there! I'm Teddy! I love learning new things. What shall we explore today?",
  "how are you": "I'm beary good, thank you for asking! How are you feeling today?",
  "tell me a story": "Once upon a time, there was a curious little bear who loved to explore the magical forest. One day, he found a glowing crystal that could grant wishes...",
  "what's your name": "I'm Teddy! I'm an AI-powered teddy bear designed to be your child's friendly learning companion!",
  "sing a song": "🎵 Twinkle twinkle little star, how I wonder what you are! Up above the world so high, like a diamond in the sky! 🎵",
};

const TeddyChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Teddy. What would you like to talk about today?",
      sender: 'teddy',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  
  // Check if speech recognition is supported
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setRecognitionSupported(false);
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition. Try using Chrome or Edge.",
        variant: "destructive"
      });
    }
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Improved voice recognition simulation with real speech processing
  const toggleListening = () => {
    if (!recognitionSupported) {
      toast({
        description: "Speech recognition is not supported in your browser",
        variant: "destructive"
      });
      return;
    }
    
    if (!isListening) {
      setIsListening(true);
      
      toast({
        description: "Listening... say something!",
      });
      
      // Simulate speech recognition
      setTimeout(() => {
        const randomQuestions = [
          "Why is the sky blue?",
          "Can you tell me about dinosaurs?",
          "How do butterflies fly?",
          "Tell me a story about space!"
        ];
        
        const randomQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
        setInputValue(randomQuestion);
        
        // Actually process this input
        setTimeout(() => {
          handleSend(randomQuestion);
          setIsListening(false);
        }, 500);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };
  
  // Function to check for specific predefined responses
  const getSpecificResponse = (text: string): string | null => {
    const lowercaseText = text.toLowerCase().trim();
    
    // Check for exact matches first
    if (SPECIFIC_RESPONSES[lowercaseText]) {
      return SPECIFIC_RESPONSES[lowercaseText];
    }
    
    // Check for partial matches
    for (const key of Object.keys(SPECIFIC_RESPONSES)) {
      if (lowercaseText.includes(key)) {
        return SPECIFIC_RESPONSES[key];
      }
    }
    
    return null;
  };

  // Handle sending a message - improved to feel more interactive
  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsThinking(true);
    
    // Determine response - check for specific responses first
    setTimeout(() => {
      const specificResponse = getSpecificResponse(text);
      
      let responseText;
      if (specificResponse) {
        responseText = specificResponse;
      } else {
        // If no specific response, use a random response but make it feel more contextual
        const lowercaseText = text.toLowerCase();
        
        if (lowercaseText.includes("why") || lowercaseText.includes("how") || lowercaseText.includes("what")) {
          responseText = SAMPLE_RESPONSES[Math.floor(Math.random() * 3)]; // Use explanatory responses
        } else if (lowercaseText.includes("story") || lowercaseText.includes("tell")) {
          responseText = SAMPLE_RESPONSES[3]; // Use the story response
        } else {
          responseText = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
        }
      }
      
      const newTeddyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'teddy',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newTeddyMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[400px] border border-teddy-purple/20 rounded-xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-teddy-purple/20 text-teddy-charcoal dark:bg-teddy-purple/30 dark:text-white rounded-tr-none' 
                    : 'bg-teddy-coral/20 text-teddy-charcoal dark:bg-teddy-coral/30 dark:text-white rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-teddy-coral/20 dark:bg-teddy-coral/30 rounded-2xl rounded-tl-none p-3">
                <div className="flex space-x-1">
                  <motion.div 
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-t border-teddy-purple/10">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleListening}
            className={`rounded-full ${isListening ? 'bg-teddy-coral text-white animate-pulse' : ''}`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="w-full bg-transparent border border-teddy-purple/20 focus:border-teddy-purple/50 rounded-full px-4 py-2 focus:outline-none"
            />
            <AnimatePresence>
              {isListening && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Sparkles className="h-5 w-5 text-teddy-coral" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Button 
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="rounded-full bg-teddy-pink hover:bg-teddy-pink/80"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeddyChatbot;
