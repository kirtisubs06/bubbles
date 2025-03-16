
import { toast } from '@/components/ui/use-toast';

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
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    
    // Format messages for Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const requestBody = {
      contents: formattedMessages,
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0.7,
        topP: 0.9
      }
    };

    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract response text from Gemini API format
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No valid response from Gemini API');
    }

  } catch (error) {
    console.error('Error in chatWithGeminiAI:', error);
    throw error;
  }
};

/**
 * Text-to-speech utility using browser's SpeechSynthesis API
 */
export const textToSpeech = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!text || typeof text !== 'string') {
      reject(new Error('No valid text to speak'));
      return;
    }

    // Create utterance with the input text
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Slightly higher pitch for child-friendly voice
    
    // Try to find a suitable voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      voice => voice.name.includes('Female') || voice.name.includes('Google') || voice.lang === 'en-US'
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Set event handlers
    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (event) => {
      reject(new Error(`Speech synthesis error: ${event.error}`));
    };
    
    // Check if speaking is in progress and cancel it
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    
    // Start speaking
    speechSynthesis.speak(utterance);
  });
};
