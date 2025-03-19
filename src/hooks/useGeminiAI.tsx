
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import geminiService from '@/utils/geminiAI';
import { supabase } from '@/integrations/supabase/client';

interface GeminiAIContextType {
  apiKey: string;
  setApiKey: (key: string) => Promise<boolean>;
  isConfigured: boolean;
  validateApiKey: (key: string) => Promise<boolean>;
  isAdminConfigured: boolean;
  isLoading: boolean;
}

const GeminiAIContext = createContext<GeminiAIContextType | undefined>(undefined);

// Hardcoded API key for demo purposes - would normally use environment variables or Supabase
const DEMO_API_KEY = 'AIzaSyBS94pYTBoL9CXS8cEI2GB7HIsxHUIPn58';

export const GeminiAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string>(DEMO_API_KEY);
  const [isAdminConfigured, setIsAdminConfigured] = useState<boolean>(true);
  const [isValidatingKey, setIsValidatingKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set the API key on component mount
  useEffect(() => {
    async function initializeApiKey() {
      setIsLoading(true);
      try {
        // Use the hardcoded API key
        setApiKeyState(DEMO_API_KEY);
        geminiService.setApiKey(DEMO_API_KEY);
        setIsAdminConfigured(true);
      } catch (error) {
        console.error('Error initializing API key:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    initializeApiKey();
  }, []);

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
        const trimmedKey = key.trim();
        
        // Save to Supabase if we're in admin mode
        try {
          console.log("Saving API key to Supabase...");
          const result = await supabase.functions.invoke('gemini-key/set', {
            method: 'POST',
            body: { apiKey: trimmedKey }
          });
          
          console.log("Save to Supabase result:", result);
          
          if (!result.error) {
            console.log("API key saved to Supabase successfully");
            setIsAdminConfigured(true);
          } else {
            console.error("Error saving to Supabase:", result.error);
            throw new Error("Failed to save to Supabase");
          }
        } catch (error) {
          console.error('Error saving to Supabase:', error);
          // Fall back to localStorage
          localStorage.setItem('gemini_api_key', trimmedKey);
        }
        
        geminiService.setApiKey(trimmedKey);
        setApiKeyState(trimmedKey);
        
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
      validateApiKey,
      isAdminConfigured,
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
