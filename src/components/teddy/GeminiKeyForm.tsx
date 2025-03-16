
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { KeyRound, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const GeminiKeyForm: React.FC = () => {
  const { apiKey, setApiKey, isConfigured, validateApiKey } = useGeminiAI();
  const [inputKey, setInputKey] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(!isConfigured);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    
    try {
      // First validate the key
      const isValid = await validateApiKey(inputKey.trim());
      
      if (isValid) {
        // If valid, save it
        const success = await setApiKey(inputKey.trim());
        if (success) {
          setIsEditing(false);
        }
      } else {
        toast({
          title: "Invalid API Key",
          description: "The Google Gemini API key could not be validated. Please check the key and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error validating or saving API key:", error);
      toast({
        title: "Error",
        description: "An error occurred while trying to validate your API key.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teddy-cream/50 to-white/50 dark:from-teddy-blue/20 dark:to-teddy-purple/20 p-4 rounded-xl shadow-sm">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-teddy-charcoal dark:text-white mb-1">
              Google Gemini API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter your Google Gemini API key"
              className="w-full"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              Your API key is stored locally and never sent to our servers.
              Make sure it's a valid <a href="https://ai.google.dev/tutorials/setup" className="text-teddy-coral hover:underline" target="_blank" rel="noopener noreferrer">Google AI API key</a>.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              type="submit" 
              className="bg-teddy-coral hover:bg-teddy-coral/80 text-white"
              disabled={isValidating || !inputKey.trim()}
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : (
                "Save API Key"
              )}
            </Button>
            {isConfigured && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                disabled={isValidating}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-teddy-charcoal dark:text-white">Google Gemini AI</h3>
            <p className="text-xs text-gray-500">
              {isConfigured ? "API key configured" : "API key needed for chat functionality"}
            </p>
          </div>
          <Button 
            onClick={() => setIsEditing(true)} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <KeyRound className="h-3.5 w-3.5" />
            {isConfigured ? "Change Key" : "Add Key"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GeminiKeyForm;
