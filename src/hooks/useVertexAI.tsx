
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

interface VertexAIContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isConfigured: boolean;
}

const VertexAIContext = createContext<VertexAIContextType | undefined>(undefined);

export const VertexAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>(() => {
    // Try to get API key from localStorage
    const savedKey = localStorage.getItem('vertexAIApiKey');
    return savedKey || '';
  });

  const saveApiKey = (key: string) => {
    try {
      localStorage.setItem('vertexAIApiKey', key);
      setApiKey(key);
      if (key) {
        toast({
          title: "API Key Saved",
          description: "Your Google Vertex AI API key has been saved.",
        });
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: "Error Saving API Key",
        description: "There was a problem saving your API key.",
        variant: "destructive",
      });
    }
  };

  return (
    <VertexAIContext.Provider value={{ 
      apiKey, 
      setApiKey: saveApiKey, 
      isConfigured: Boolean(apiKey) 
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
