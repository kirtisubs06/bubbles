
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import geminiService from '@/utils/geminiAI';

interface GeminiAIContextType {
  apiKey: string;
  setApiKey: (key: string) => Promise<boolean>;
  isConfigured: boolean;
  isAdminConfigured?: boolean; // Add this optional property
  validateApiKey: (key: string) => Promise<boolean>;
  isLoading: boolean;
}

const GeminiAIContext = createContext<GeminiAIContextType | undefined>(undefined);

// Hardcoded API key for demo purposes
const DEMO_API_KEY = 'AIzaSyBS94pYTBoL9CXS8cEI2GB7HIsxHUIPn58';

export const GeminiAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string>(DEMO_API_KEY);
  const [isLoading, setIsLoading] = useState(false);

  // Set the API key on component mount
  useEffect(() => {
    geminiService.setApiKey(DEMO_API_KEY);
  }, []);

  // Dummy function for API key validation - always returns true since we're using a fixed key
  const validateApiKey = async (): Promise<boolean> => {
    return true;
  };

  // Dummy function for API key setting - does nothing since we're using a fixed key
  const saveApiKey = async (): Promise<boolean> => {
    return true;
  };

  return (
    <GeminiAIContext.Provider value={{ 
      apiKey, 
      setApiKey: saveApiKey, 
      isConfigured: true,
      isAdminConfigured: true, // Add this property with value true
      validateApiKey,
      isLoading
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
