
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { chatWithGeminiAI, GeminiMessage, speechToText } from '@/utils/geminiAI';
import GeminiKeyForm from './GeminiKeyForm';

// Type for chat messages
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bubbles';
  timestamp: Date;
}

// Sample responses as fallback
const SAMPLE_RESPONSES = [
  "I love learning about ocean life! Did you know that dolphins can swim up to 25 miles per hour?",
  "That's a great question! Rainbows appear when sunlight passes through raindrops, which act like tiny prisms!",
  "I think marine animals are amazing too! Dolphins are actually mammals, not fish!",
  "Let me tell you a short story about a brave little dolphin who wanted to explore the ocean...",
  "I'd love to learn more about your favorite animals! What do you like most about them?",
  "Did you know that dolphins sleep with one eye open? Nature is full of surprises!",
  "You're so creative! I love hearing your ideas about magical ocean creatures.",
  "What kind of adventures would you like to go on today? We could imagine visiting a coral reef!"
];

const TeddyChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Bubbles. What would you like to talk about today?",
      sender: 'bubbles',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [geminiMessages, setGeminiMessages] = useState<GeminiMessage[]>([
    { role: 'assistant', content: "Hi there! I'm Bubbles, your friendly dolphin companion. I love talking about science, nature, space, and telling stories. What would you like to talk about today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const { apiKey, isConfigured } = useGeminiAI();
  
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

  // Record audio for speech recognition
  const toggleListening = async () => {
    if (!recognitionSupported) {
      toast({
        description: "Speech recognition is not supported in your browser",
        variant: "destructive"
      });
      return;
    }
    
    if (!isConfigured) {
      toast({
        title: "API Key Required",
        description: "Please add your Google Gemini API key to use voice chat.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isListening) {
      setIsListening(true);
      
      toast({
        description: "Listening... say something!",
      });
      
      try {
        const transcript = await speechToText();
        setInputValue(transcript);
        handleSend(transcript);
      } catch (error) {
        console.error('Speech recognition error:', error);
        toast({
          title: "Speech Recognition Error",
          description: `There was a problem with speech recognition. Please try again.`,
          variant: "destructive"
        });
      } finally {
        setIsListening(false);
      }
    } else {
      setIsListening(false);
    }
  };

  // Handle sending a message with Gemini AI integration
  const handleSend = async (text = inputValue) => {
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
    
    try {
      let responseText;
      
      if (isConfigured && apiKey) {
        // Update Gemini messages history
        const updatedMessages: GeminiMessage[] = [
          ...geminiMessages,
          { role: 'user', content: text }
        ];
        
        // Use Gemini API
        responseText = await chatWithGeminiAI(updatedMessages, apiKey);
        
        // Add assistant message to Gemini history
        setGeminiMessages([...updatedMessages, { role: 'assistant', content: responseText }]);
      } else {
        // Use fallback responses
        const randomIndex = Math.floor(Math.random() * SAMPLE_RESPONSES.length);
        responseText = SAMPLE_RESPONSES[randomIndex];
      }
      
      // Add bubbles message
      const newBubblesMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bubbles',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBubblesMessage]);
    } catch (error) {
      console.error('Error with AI response:', error);
      toast({
        title: "AI Response Error",
        description: "There was a problem getting a response from the AI. Please check your API key and try again.",
        variant: "destructive"
      });
      
      // Use fallback
      const fallbackResponse = "I'm sorry, I had trouble thinking of a response. Let's try again!";
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'bubbles',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[400px] border border-bubbles-blue/20 rounded-xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      {!isConfigured && (
        <div className="p-3 bg-bubbles-cream/50 dark:bg-bubbles-blue/20 border-b border-bubbles-blue/10">
          <GeminiKeyForm />
        </div>
      )}
      
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
                    ? 'bg-bubbles-teal/20 text-bubbles-deep dark:bg-bubbles-teal/30 dark:text-white rounded-tr-none' 
                    : 'bg-bubbles-blue/20 text-bubbles-deep dark:bg-bubbles-blue/30 dark:text-white rounded-tl-none'
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
              <div className="bg-bubbles-blue/20 dark:bg-bubbles-blue/30 rounded-2xl rounded-tl-none p-3">
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
      
      <div className="p-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-t border-bubbles-blue/10">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleListening}
            className={`rounded-full ${isListening ? 'bg-bubbles-blue text-white animate-pulse' : ''}`}
            disabled={!isConfigured}
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
              className="w-full bg-transparent border border-bubbles-blue/20 focus:border-bubbles-blue/50 rounded-full px-4 py-2 focus:outline-none"
            />
            <AnimatePresence>
              {isListening && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Sparkles className="h-5 w-5 text-bubbles-blue" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Button 
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="rounded-full bg-bubbles-teal hover:bg-bubbles-teal/80"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeddyChatbot;
