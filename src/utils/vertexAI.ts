
/**
 * Google Vertex AI integration utilities for the TeddyAI application
 */

// Interface for chat message structure
export interface VertexMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Function to send a message to Google Vertex AI and get a response
export const chatWithVertexAI = async (messages: VertexMessage[], apiKey: string): Promise<string> => {
  try {
    // Correct endpoint for Gemini API
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    
    // Format messages according to Gemini API expectations
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    const requestBody = {
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.4,
        topK: 32,
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
    };

    console.log("Sending request to Vertex AI with API key:", apiKey.substring(0, 5) + "...");
    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Vertex AI API error:', errorData);
      throw new Error(`Vertex AI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("Vertex AI response:", JSON.stringify(data, null, 2));
    
    // Extract the response text from the correct path in the response object
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected response structure:', data);
      throw new Error('Unexpected response structure from Vertex AI');
    }
  } catch (error) {
    console.error('Error interacting with Vertex AI:', error);
    throw error;
  }
};

// Function to convert speech to text using the Web Speech API
export const speechToText = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Use browser's built-in SpeechRecognition API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        reject(new Error("Speech recognition not supported in this browser"));
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        reject(new Error(`Speech recognition error: ${event.error}`));
      };
      
      recognition.onend = () => {
        console.log("Speech recognition ended");
      };
      
      recognition.start();
      
      // Set a timeout to stop recognition after 10 seconds if no result
      setTimeout(() => {
        if (recognition) {
          recognition.stop();
        }
      }, 10000);
    } catch (error) {
      console.error('Error with speech to text:', error);
      reject(error);
    }
  });
};

// Simplified text to speech using browser's native API
export const textToSpeech = async (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Use browser's built-in speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      
      // Try to find a female or Google voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || voice.name.includes('Google') || voice.lang === 'en-US'
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => {
        console.log("Speech synthesis completed");
        resolve();
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };
      
      speechSynthesis.speak(utterance);
      
      // Fallback resolution in case onend doesn't fire
      setTimeout(() => {
        if (utterance.pending) {
          resolve();
        }
      }, text.length * 100); // Rough estimate based on text length
    } catch (error) {
      console.error('Error with text to speech:', error);
      // Don't reject to prevent further errors, just resolve
      resolve();
    }
  });
};
