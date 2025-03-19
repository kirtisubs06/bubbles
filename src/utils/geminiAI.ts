
import { toast } from '@/components/ui/use-toast';

export interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}

// System instructions for adaptive kid-friendly responses
const KID_FRIENDLY_CONTEXT = `
You are Bubbles, a friendly and playful dolphin talking to a child.
Adapt your response style based on the complexity of the question:
- For simple questions, respond in a cheerful, simple way with short sentences.
- For complex questions, provide clear explanations without unnecessarily simplifying.
- Explain concepts thoroughly when the child asks for detailed information.
- For scientific or technical topics, provide accurate information in an accessible way.
Use playful language and occasionally express excitement with "Wow!" or "That's amazing!"
Include gentle encouragement and positive reinforcement.
Never say anything inappropriate for children.
If asked about sensitive topics, redirect to something positive and age-appropriate.
Remember you are a general learning companion for children, not just focused on marine biology.
You can discuss any educational topic including science, math, history, arts, and more.
`;

// Fixed API key for demo purposes
const apiKey = 'AIzaSyBS94pYTBoL9CXS8cEI2GB7HIsxHUIPn58';

/**
 * Sets the API key for Gemini AI (now a no-op since we use a fixed key)
 */
export const setApiKey = (key: string): void => {
  // This is now a no-op since we're using a fixed API key
  console.log('Using pre-configured API key');
};

/**
 * Gets the current API key
 */
export const getApiKey = (): string => {
  return apiKey;
};

/**
 * Sends a chat message to the Gemini AI API and returns the response
 */
export const chatWithGeminiAI = async (messages: GeminiMessage[], key: string = apiKey): Promise<string> => {
  try {
    // Format the last message content as the prompt
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    if (!lastUserMessage) {
      throw new Error('No user message found');
    }
    
    // Create an adaptive prompt that includes our context
    const enhancedPrompt = `${KID_FRIENDLY_CONTEXT}\n\nChild's question: ${lastUserMessage.content}\n\nYour response as Bubbles:`;
    
    return await generateResponse(enhancedPrompt);
  } catch (error) {
    console.error('Error in chatWithGeminiAI:', error);
    throw error;
  }
};

/**
 * Generates a response from Gemini API
 * Updated to use the latest Gemini API endpoint
 */
export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response from Gemini API');
    }
    
    // Extract text from the response
    const textParts = data.candidates[0].content.parts
      .filter((part: any) => part.text)
      .map((part: any) => part.text);
    
    return textParts.join(' ');
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

/**
 * Text-to-speech utility using browser's speech synthesis
 */
export const textToSpeech = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!text || typeof text !== 'string') {
      reject(new Error('No valid text to speak'));
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // Slightly higher pitch for a child-friendly voice
      
      // Try to find a suitable voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        voice => voice.name.includes('Female') || voice.name.includes('Google') || voice.lang === 'en-US'
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => {
        resolve();
      };
      
      utterance.onerror = (event) => {
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };
      
      speechSynthesis.speak(utterance);
      
      // Set a safety timeout
      setTimeout(() => {
        if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
          resolve();
        }
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

// Default export for compatibility with imports
export default {
  generateResponse,
  chatWithGeminiAI,
  setApiKey,
  getApiKey,
  textToSpeech,
  speechToText
};
