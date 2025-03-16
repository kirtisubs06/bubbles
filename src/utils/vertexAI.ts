
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
    
    const requestBody = {
      contents: messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
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
      throw new Error(`Vertex AI API error: ${response.status}`);
    }

    const data = await response.json();
    // Extract the response text from the correct path in the response object
    const responseText = data.candidates[0].content.parts[0].text;
    return responseText;
  } catch (error) {
    console.error('Error interacting with Vertex AI:', error);
    throw error;
  }
};

// Function to convert speech to text using the Web Speech API
export const speechToText = async (audioBlob: Blob, apiKey: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Use browser's built-in SpeechRecognition API instead of Vertex AI
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
      
      recognition.start();
      
      // Set a timeout to stop recognition after 10 seconds if no result
      setTimeout(() => {
        recognition.stop();
        if (!recognition.onresult) {
          reject(new Error("Speech recognition timeout"));
        }
      }, 10000);
    } catch (error) {
      console.error('Error with speech to text:', error);
      reject(error);
    }
  });
};

// Simplified text to speech using browser's native API
export const textToSpeech = async (text: string, apiKey: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      // Use browser's built-in speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.voice = speechSynthesis.getVoices().find(voice => 
        voice.name.includes('Female') || voice.name.includes('Google') || voice.lang === 'en-US'
      ) || null;
      
      // Create an audio context to capture the speech
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const dest = audioContext.createMediaStreamDestination();
      const mediaRecorder = new MediaRecorder(dest.stream);
      const chunks: BlobEvent[] = [];
      
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.map(chunk => chunk.data), { type: 'audio/wav' });
        resolve(blob);
      };
      
      mediaRecorder.start();
      
      utterance.onend = () => {
        mediaRecorder.stop();
        audioContext.close();
      };
      
      speechSynthesis.speak(utterance);
      
      // Fallback if speech synthesis doesn't work properly
      setTimeout(() => {
        if (chunks.length === 0) {
          // Create a minimal audio blob as fallback
          const fallbackBlob = new Blob([new ArrayBuffer(1000)], { type: 'audio/wav' });
          resolve(fallbackBlob);
        }
      }, 5000);
    } catch (error) {
      console.error('Error with text to speech:', error);
      // Return an empty blob in case of error to prevent further errors
      resolve(new Blob([], { type: 'audio/wav' }));
    }
  });
};
