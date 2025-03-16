
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import geminiService from '@/utils/geminiService';

interface GeminiAIContextType {
  apiKey: string;
  setApiKey: (key: string) => Promise<boolean>;
  isConfigured: boolean;
  validateApiKey: (key: string) => Promise<boolean>;
}

const GeminiAIContext = createContext<GeminiAIContextType | undefined>(undefined);

export const GeminiAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>(() => {
    // Try to get API key from geminiService
    return geminiService.getApiKey() || '';
  });

  const [isValidatingKey, setIsValidatingKey] = useState(false);

  // Validates if the API key is usable by testing a simple request
  const validateApiKey = async (key: string): Promise<boolean> => {
    if (!key || key.trim() === '') {
      return false;
    }

    setIsValidatingKey(true);
    try {
      // Store the current API key
      const originalKey = geminiService.getApiKey();
      
      // Temporarily set the key we want to test
      geminiService.setApiKey(key.trim());
      
      // Try to make a simple request
      await geminiService.generateResponse("Test");
      
      // If no errors, key is valid
      return true;
    } catch (error) {
      console.error('API key validation failed:', error);
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
        geminiService.setApiKey(key.trim());
        setApiKey(key.trim());
        toast({
          title: "API Key Saved",
          description: "Your Google Gemini API key has been validated and saved.",
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
    <GeminiAIContext.Provider value={{ 
      apiKey, 
      setApiKey: saveApiKey, 
      isConfigured: Boolean(apiKey),
      validateApiKey
    }}>
      {children}
    </GeminiAIContext.Provider>
  );
};

export const useGeminiAI = (): GeminiAIContextType => {
  const context = useContext(GeminiAIContext);
  if (context === undefined) {
    throw new Error('useGeminiAI must be used within a GeminiAIProvider');
  }
  return context;
};
