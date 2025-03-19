
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Default API key for demo purposes
let apiKey = 'AIzaSyBS94pYTBoL9CXS8cEI2GB7HIsxHUIPn58';

/**
 * Set the API key for Gemini service
 */
export const setApiKey = (key: string): void => {
  apiKey = key;
};

/**
 * Get the current API key
 */
export const getApiKey = (): string => {
  return apiKey;
};

/**
 * Generate a response from Gemini AI
 */
export const generateResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  try {
    const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
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

export default {
  setApiKey,
  getApiKey,
  generateResponse
};
