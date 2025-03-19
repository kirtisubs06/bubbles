
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { KeyRound, Loader2, LockIcon, ServerIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface GeminiKeyFormProps {
  adminMode?: boolean;
}

const GeminiKeyForm: React.FC<GeminiKeyFormProps> = ({ adminMode = false }) => {
  const { apiKey, setApiKey, isConfigured, validateApiKey, isAdminConfigured, isLoading } = useGeminiAI();
  const [inputKey, setInputKey] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(false); // Default to not editing since we have a hardcoded key
  const [isValidating, setIsValidating] = useState(false);

  // Update inputKey when apiKey changes
  useEffect(() => {
    setInputKey(apiKey);
  }, [apiKey]);

  // Don't show the form if the API key is already configured by admin and we're not in admin mode
  if (isAdminConfigured && !adminMode) {
    return (
      <div className="bg-gradient-to-br from-bubbles-cream/50 to-white/50 dark:from-bubbles-blue/20 dark:to-bubbles-teal/20 p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ServerIcon className="h-4 w-4 text-green-500" />
            <div>
              <h3 className="text-sm font-medium text-bubbles-deep dark:text-white">
                Google Gemini AI (Pre-Configured)
              </h3>
              <p className="text-xs text-gray-500">
                API key is already configured for this demo
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show loading state while checking for API key
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-bubbles-cream/50 to-white/50 dark:from-bubbles-blue/20 dark:to-bubbles-teal/20 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-bubbles-deep dark:text-white">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Checking for API key configuration...</span>
        </div>
      </div>
    );
  }

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
          
          if (adminMode) {
            toast({
              title: "Admin API Key Configured",
              description: "The API key has been saved to the database and will be used for all users.",
            });
          }
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
    <div className="bg-gradient-to-br from-bubbles-cream/50 to-white/50 dark:from-bubbles-blue/20 dark:to-bubbles-teal/20 p-4 rounded-xl shadow-sm">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-bubbles-deep dark:text-white mb-1">
              {adminMode ? "Admin Google Gemini API Key" : "Google Gemini API Key"}
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
              {adminMode 
                ? "This key will be saved to the database and used for all users of the application."
                : "Your API key will be saved securely for future use."}
              Make sure it's a valid <a href="https://ai.google.dev/tutorials/setup" className="text-bubbles-blue hover:underline" target="_blank" rel="noopener noreferrer">Google AI API key</a>.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              type="submit" 
              className="bg-bubbles-blue hover:bg-bubbles-blue/80 text-white"
              disabled={isValidating || !inputKey?.trim()}
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : (
                adminMode ? "Save API Key to Database" : "Save API Key"
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
          <div className="flex items-center gap-2">
            {isAdminConfigured ? 
              <ServerIcon className="h-4 w-4 text-green-500" /> : 
              <LockIcon className="h-4 w-4 text-green-500" />
            }
            <div>
              <h3 className="text-sm font-medium text-bubbles-deep dark:text-white">
                {isAdminConfigured ? "Google Gemini AI (Pre-Configured)" : "Google Gemini AI"}
              </h3>
              <p className="text-xs text-gray-500">
                {isConfigured 
                  ? isAdminConfigured 
                    ? "API key is pre-configured for this demo" 
                    : "API key configured" 
                  : "API key needed for chat functionality"}
              </p>
            </div>
          </div>
          {(adminMode || !isAdminConfigured) && (
            <Button 
              onClick={() => setIsEditing(true)} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <KeyRound className="h-3.5 w-3.5" />
              {isConfigured ? "Change Key" : "Add Key"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiKeyForm;
