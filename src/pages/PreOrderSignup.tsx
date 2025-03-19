
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PackageCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const PreOrderSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Pre-order confirmed!",
        description: "Thank you for your interest in Bubbles. We'll notify you when it's available.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bubbles-cream/20 dark:from-bubbles-deep dark:to-bubbles-deep/80">
      <Header />
      <div className="pt-32 container mx-auto px-4 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-bubbles-deep dark:text-white mb-6">
            Pre-order Your <span className="text-bubbles-blue">Bubbles</span> Companion
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Be among the first to receive the revolutionary AI dolphin companion that will transform how your child learns and plays. Reserve yours today with no obligation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">Product Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Interactive AI Companion</h3>
                    <p className="text-gray-600 dark:text-gray-400">Advanced AI technology that adapts to your child's interests and learning style.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Educational Content</h3>
                    <p className="text-gray-600 dark:text-gray-400">Hundreds of hours of educational content across various subjects, tailored to your child's age.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Parent Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-400">Comprehensive dashboard to monitor your child's learning progress and interests.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Voice Recognition</h3>
                    <p className="text-gray-600 dark:text-gray-400">Natural conversations with advanced voice recognition technology.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bubbles-blue h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-bubbles-deep dark:text-white">Regular Content Updates</h3>
                    <p className="text-gray-600 dark:text-gray-400">New content and features added regularly through over-the-air updates.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-bold text-bubbles-deep dark:text-white">Price</h3>
                <div className="text-right">
                  <span className="text-xl font-bold text-bubbles-blue">$69</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">one-time payment</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Pre-order today and get a 6-month subscription to our premium content library included at no extra cost.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <PackageCheck className="h-4 w-4 text-bubbles-teal" />
                <span>Expected delivery: Q4 2023</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-bubbles-deep/40 rounded-2xl shadow-medium p-8 flex flex-col"
          >
            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-4">Reserve Your Bubbles</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Fill out the form below to pre-order your Bubbles companion. No credit card required now — we'll notify you when it's time to complete your purchase.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Your name" 
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Your phone number" 
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-bubbles-blue shadow-sm focus:border-bubbles-blue focus:ring focus:ring-bubbles-blue focus:ring-opacity-50"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        I agree to be contacted about my pre-order and receive updates about Bubbles.
                      </span>
                    </label>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-bubbles-blue hover:bg-bubbles-blue/90 text-white py-3"
                    >
                      {isSubmitting ? "Processing..." : "Pre-order Now"}
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                      No payment required today. We'll notify you when Bubbles is ready for purchase.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-bubbles-deep dark:text-white mb-2">Thank You!</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Your pre-order has been reserved.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We've sent a confirmation email to <span className="font-medium">{email}</span>. 
                  We'll notify you when Bubbles is ready for you to complete your purchase.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="border-bubbles-blue text-bubbles-blue hover:bg-bubbles-blue/10"
                >
                  Reserve Another
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PreOrderSignup;
