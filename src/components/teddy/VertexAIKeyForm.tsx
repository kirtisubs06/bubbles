
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useVertexAI } from '@/hooks/useVertexAI';
import { KeyRound } from 'lucide-react';

const VertexAIKeyForm: React.FC = () => {
  const { apiKey, setApiKey, isConfigured } = useVertexAI();
  const [inputKey, setInputKey] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(!isConfigured);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(inputKey.trim());
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-br from-teddy-cream/50 to-white/50 dark:from-teddy-blue/20 dark:to-teddy-purple/20 p-4 rounded-xl shadow-sm">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-teddy-charcoal dark:text-white mb-1">
              Google Vertex AI API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter your Google Vertex AI API key"
              className="w-full"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button type="submit" className="bg-teddy-coral hover:bg-teddy-coral/80 text-white">
              Save API Key
            </Button>
            {isConfigured && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-teddy-charcoal dark:text-white">Google Vertex AI</h3>
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

export default VertexAIKeyForm;
