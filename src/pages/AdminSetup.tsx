
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import GeminiKeyForm from '@/components/teddy/GeminiKeyForm';
import { Shield, LockOpen, CheckIcon, ServerIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AdminSetup: React.FC = () => {
  const { isConfigured, isAdminConfigured } = useGeminiAI();
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Simple admin authentication (this should be replaced with a real auth system in production)
  const checkAdminPassword = () => {
    // For demo purposes, use a simple password. In production, use proper authentication.
    const correctPassword = "admin123"; // In production, never hardcode this
    if (adminPassword === correctPassword) {
      setIsAuthenticated(true);
      toast({
        title: "Admin authentication successful",
        description: "You now have access to the admin setup page.",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Incorrect admin password.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teddy-cream/20 dark:from-teddy-charcoal dark:to-teddy-charcoal/80 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <Card className="border-2 border-teddy-coral/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-teddy-charcoal dark:text-white flex items-center gap-2">
                  <Shield className="h-6 w-6 text-teddy-coral" />
                  Admin Setup
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/')}
                  className="text-gray-500 hover:text-teddy-charcoal"
                >
                  Return to Home
                </Button>
              </div>
              <CardDescription>
                Configure the API key that will be used for all users of the application. The key will be stored securely in the database.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {!isAuthenticated ? (
                <div className="space-y-4 py-4">
                  <div className="flex justify-center">
                    <LockOpen className="h-16 w-16 text-teddy-coral/50 mb-2" />
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    This area is for administrators only. Please enter the admin password to continue.
                  </p>
                  <div className="flex gap-2">
                    <input 
                      type="password" 
                      value={adminPassword} 
                      onChange={(e) => setAdminPassword(e.target.value)} 
                      placeholder="Admin Password"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-teddy-coral focus:border-teddy-coral"
                    />
                    <Button onClick={checkAdminPassword}>Verify</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <span>API Key Configuration</span>
                      {isAdminConfigured && <CheckIcon className="h-5 w-5 text-green-500" />}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      The API key you set here will be stored in the database and used for all users of the application, eliminating the need for individual users to enter their own keys.
                    </p>

                    <GeminiKeyForm adminMode={true} />
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md">
                    <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-2">
                      <ServerIcon className="h-4 w-4" />
                      Database Storage
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      The API key is now stored securely in your Supabase database. Once set, all instances of the application will use this key without prompting users.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <p className="text-xs text-gray-500">
                For security, log out after completing the setup.
              </p>
              {isAuthenticated && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsAuthenticated(false)}
                >
                  Logout
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
