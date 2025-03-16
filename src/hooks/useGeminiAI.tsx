
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import geminiService from '@/utils/geminiService';
import { supabase } from "@/integrations/supabase/client";

interface GeminiAIContextType {
  apiKey: string;
  setApiKey: (key: string) => Promise<boolean>;
  isConfigured: boolean;
  validateApiKey: (key: string) => Promise<boolean>;
  isAdminConfigured: boolean;
  isLoading: boolean;
}

const GeminiAIContext = createContext<GeminiAIContextType | undefined>(undefined);

export const GeminiAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [isAdminConfigured, setIsAdminConfigured] = useState<boolean>(false);
  const [isValidatingKey, setIsValidatingKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch API key from Supabase on component mount
  useEffect(() => {
    async function fetchApiKey() {
      setIsLoading(true);
      try {
        // First try to get from environment variable
        const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
        
        if (envApiKey) {
          setApiKeyState(envApiKey);
          geminiService.setApiKey(envApiKey);
          setIsAdminConfigured(true);
          setIsLoading(false);
          return;
        }
        
        // Try to get from Supabase
        try {
          const { data, error } = await supabase.functions.invoke('gemini-key', {
            method: 'GET',
            body: {},
            responseType: 'json',
            path: 'get',
          });
          
          if (!error && data && data.key) {
            setApiKeyState(data.key);
            geminiService.setApiKey(data.key);
            setIsAdminConfigured(true);
          }
        } catch (error) {
          console.error('Error fetching API key from Supabase:', error);
          
          // Fall back to localStorage if needed
          const localKey = localStorage.getItem('gemini_api_key');
          if (localKey) {
            setApiKeyState(localKey);
            geminiService.setApiKey(localKey);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchApiKey();
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
          await supabase.functions.invoke('gemini-key', {
            method: 'POST',
            body: { apiKey: trimmedKey },
            responseType: 'json',
            path: 'set',
          });
          
          setIsAdminConfigured(true);
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
