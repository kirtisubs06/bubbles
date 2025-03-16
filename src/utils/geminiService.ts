
// Gemini AI service
import { toast } from "@/components/ui/use-toast";

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

class GeminiService {
  private apiKey: string | null = null;
  // Default admin-configured API key (set during deployment)
  private readonly defaultApiKey = import.meta.env.VITE_GEMINI_API_KEY || null;
  
  constructor() {
    // Try to initialize with default key or stored key
    this.apiKey = this.defaultApiKey || localStorage.getItem('gemini_api_key');
  }
  
  setApiKey(key: string) {
    if (!key) return;
    
    this.apiKey = key;
    // Still store in localStorage as fallback
    localStorage.setItem('gemini_api_key', key);
  }
  
  getApiKey(): string | null {
    return this.apiKey;
  }
  
  clearApiKey() {
    // Only clear localStorage key, not the default key
    localStorage.removeItem('gemini_api_key');
    this.apiKey = this.defaultApiKey;
  }
  
  hasConfiguredKey(): boolean {
    return Boolean(this.getApiKey());
  }
  
  async generateResponse(prompt: string): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error("API key not set. Please provide your Gemini API key.");
    }
    
    try {
      const reqBody: GeminiRequest = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqBody),
        }
      );
      
      const data: GeminiResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response received from Gemini API");
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Gemini API Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  }
}

export default new GeminiService();
