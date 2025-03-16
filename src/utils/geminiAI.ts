
import { toast } from '@/components/ui/use-toast';
import geminiService from './geminiService';
import voiceAssistant from './voiceAssistant';

export interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Sends a chat message to the Gemini AI API and returns the response
 */
export const chatWithGeminiAI = async (messages: GeminiMessage[], apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key is required');
  }
  
  try {
    // Set the API key if it's different from the current one
    if (geminiService.getApiKey() !== apiKey) {
      geminiService.setApiKey(apiKey);
    }
    
    // Format the last message content as the prompt
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    if (!lastUserMessage) {
      throw new Error('No user message found');
    }
    
    return await geminiService.generateResponse(lastUserMessage.content);
  } catch (error) {
    console.error('Error in chatWithGeminiAI:', error);
    throw error;
  }
};

/**
 * Text-to-speech utility using voiceAssistant
 */
export const textToSpeech = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!text || typeof text !== 'string') {
      reject(new Error('No valid text to speak'));
      return;
    }

    try {
      voiceAssistant.textToSpeech(text);
      
      // Create a listener to detect when speech has ended
      const checkSpeaking = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(checkSpeaking);
          resolve();
        }
      }, 100);
      
      // Set a safety timeout
      setTimeout(() => {
        clearInterval(checkSpeaking);
        resolve();
      }, 30000); // 30 second safety timeout
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Speech-to-text utility using browser's SpeechRecognition API
 */
export const speechToText = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if speech recognition is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported'));
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };
    
    recognition.onerror = (event) => {
      reject(new Error(`Speech recognition error: ${event.error}`));
    };
    
    recognition.onend = () => {
      // If no result was received, resolve with empty string
      resolve('');
    };
    
    recognition.start();
    
    // Set a timeout to stop recognition if it doesn't end on its own
    setTimeout(() => {
      try {
        recognition.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
    }, 10000);
  });
};
