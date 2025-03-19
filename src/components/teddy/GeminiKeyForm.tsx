
import React from 'react';
import { ServerIcon } from 'lucide-react';

const GeminiKeyForm: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-bubbles-sand/50 to-white/50 dark:from-bubbles-blue/20 dark:to-bubbles-teal/20 p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ServerIcon className="h-4 w-4 text-green-500" />
          <div>
            <h3 className="text-sm font-medium text-bubbles-deep dark:text-white">
              Google Gemini AI
            </h3>
            <p className="text-xs text-gray-500">
              AI is ready to use! Connected to Google's Gemini API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiKeyForm;
