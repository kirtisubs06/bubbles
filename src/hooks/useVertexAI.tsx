
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

interface VertexAIContextType {
  apiKey: string;
  setApiKey: (key: string) => Promise<boolean>;
  isConfigured: boolean;
  validateApiKey: (key: string) => Promise<boolean>;
}

const VertexAIContext = createContext<VertexAIContextType | undefined>(undefined);

export const VertexAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>(() => {
    // Try to get API key from localStorage
    const savedKey = localStorage.getItem('vertexAIApiKey');
    return savedKey || '';
  });

  const [isValidatingKey, setIsValidatingKey] = useState(false);

  // Validates if the API key is usable by testing a simple request
  const validateApiKey = async (key: string): Promise<boolean> => {
    if (!key || key.trim() === '') {
      return false;
    }

    setIsValidatingKey(true);
    try {
      // Use the Gemini API to test the key with a simple request
      const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
      
      const testBody = {
        contents: [
          {
            role: "user",
            parts: [{ text: "Hello" }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 10
        }
      };

      const response = await fetch(`${endpoint}?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testBody)
      });

      if (!response.ok) {
        console.error('API key validation failed:', await response.json());
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating API key:', error);
      return false;
    } finally {
      setIsValidatingKey(false);
    }
  };

  const saveApiKey = async (key: string): Promise<boolean> => {
    try {
      // Validate the key before saving
      const isValid = await validateApiKey(key);
      
      if (isValid) {
        localStorage.setItem('vertexAIApiKey', key);
        setApiKey(key);
        toast({
          title: "API Key Saved",
          description: "Your Google Vertex AI API key has been validated and saved.",
        });
        return true;
      } else {
        toast({
          title: "Invalid API Key",
          description: "The API key could not be validated. Please check and try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: "Error Saving API Key",
        description: "There was a problem validating or saving your API key.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <VertexAIContext.Provider value={{ 
      apiKey, 
      setApiKey: saveApiKey, 
      isConfigured: Boolean(apiKey),
      validateApiKey
    }}>
      {children}
    </VertexAIContext.Provider>
  );
};

export const useVertexAI = (): VertexAIContextType => {
  const context = useContext(VertexAIContext);
  if (context === undefined) {
    throw new Error('useVertexAI must be used within a VertexAIProvider');
  }
  return context;
};
