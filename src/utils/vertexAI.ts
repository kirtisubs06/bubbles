
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
    const endpoint = "https://us-central1-aiplatform.googleapis.com/v1/projects/your-project-id/locations/us-central1/publishers/google/models/gemini-pro:generateContent";
    
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

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Vertex AI API error:', errorData);
      throw new Error(`Vertex AI API error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;
    return responseText;
  } catch (error) {
    console.error('Error interacting with Vertex AI:', error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Can you try again in a moment?";
  }
};

// Function to convert speech to text using Vertex AI
export const speechToText = async (audioBlob: Blob, apiKey: string): Promise<string> => {
  try {
    // Convert the blob to base64
    const audioBuffer = await audioBlob.arrayBuffer();
    const audioBase64 = btoa(
      new Uint8Array(audioBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const endpoint = "https://us-central1-aiplatform.googleapis.com/v1/projects/your-project-id/locations/us-central1/publishers/google/models/speech-1:transcribe";
    
    const requestBody = {
      audioContent: audioBase64,
      recognitionConfig: {
        languageCode: "en-US",
        model: "latest_long"
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Speech to text API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results[0].alternatives[0].transcript;
  } catch (error) {
    console.error('Error with speech to text:', error);
    return "";
  }
};

// Function to convert text to speech using Vertex AI
export const textToSpeech = async (text: string, apiKey: string): Promise<Blob> => {
  try {
    const endpoint = "https://us-central1-aiplatform.googleapis.com/v1/projects/your-project-id/locations/us-central1/publishers/google/models/text-to-speech:synthesize";
    
    const requestBody = {
      text: text,
      voiceConfig: {
        name: "en-US-Standard-D",
        languageCode: "en-US"
      },
      audioConfig: {
        audioEncoding: "LINEAR16",
        sampleRateHertz: 24000
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Text to speech API error: ${response.status}`);
    }

    const data = await response.json();
    const audioBase64 = data.audioContent;
    
    // Convert base64 to blob
    const byteCharacters = atob(audioBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'audio/wav' });
  } catch (error) {
    console.error('Error with text to speech:', error);
    return new Blob();
  }
};
