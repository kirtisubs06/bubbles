
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { MessageCircle, ChevronRight, BookOpen, Check, CreditCard, Shield, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const testimonials = [
    {
      content: "TeddyPal has transformed my daughter's learning experience. She's always excited to chat with her teddy and I love seeing the insights about her interests.",
      author: "Sarah M.",
      role: "Parent of a 6-year-old"
    },
    {
      content: "As an educator, I'm impressed by how the AI adapts to each child's learning style. My son asks questions I never would have thought to answer!",
      author: "Michael T.",
      role: "Teacher and parent"
    },
    {
      content: "My twins have different interests but their TeddyPal bears keep up with both of them. The parent dashboard has been eye-opening to see their different learning journeys.",
      author: "Aisha K.",
      role: "Mother of twins"
    }
  ];
  
  // Updated pricing plans to match pricing tab
  const oneTimePlans = [
    {
      name: "Starter",
      price: 129,
      description: "Perfect for young children just beginning their learning journey.",
      features: [
        { included: true, text: "Basic teddy bear hardware" },
        { included: true, text: "Limited conversations" },
        { included: true, text: "100+ educational stories" },
        { included: true, text: "Basic parent dashboard" },
        { included: false, text: "Advanced learning algorithms" },
        { included: false, text: "Personalized learning path" },
        { included: false, text: "Premium content library" }
      ],
      popular: false,
      ctaText: "Get Started"
    },
    {
      name: "Premium",
      price: 179,
      description: "Our most popular option with enhanced learning capabilities.",
      features: [
        { included: true, text: "Enhanced teddy bear hardware" },
        { included: true, text: "Advanced conversation abilities" },
        { included: true, text: "500+ educational stories" },
        { included: true, text: "Advanced parent dashboard" },
        { included: true, text: "Basic personalization" },
        { included: true, text: "Regular content updates" },
        { included: false, text: "Premium content library" }
      ],
      popular: true,
      ctaText: "Choose Premium"
    },
    {
      name: "Ultimate",
      price: 229,
      description: "The complete hardware package for maximum educational benefit.",
      features: [
        { included: true, text: "Premium teddy bear hardware" },
        { included: true, text: "Premium conversation AI" },
        { included: true, text: "1000+ educational stories" },
        { included: true, text: "Advanced analytics dashboard" },
        { included: true, text: "Enhanced personalization" },
        { included: true, text: "Priority content updates" },
        { included: true, text: "Basic content library access" }
      ],
      popular: false,
      ctaText: "Choose Ultimate"
    }
  ];
  
  const subscriptionPlans = [
    {
      name: "Basic",
      price: 4.99,
      period: "monthly",
      description: "Essential API access for continued service.",
      features: [
        { included: true, text: "Basic AI conversation quota (200/month)" },
        { included: true, text: "Standard response time" },
        { included: true, text: "Monthly content updates" },
        { included: true, text: "Basic cloud storage" },
        { included: false, text: "Premium educational content" },
        { included: false, text: "Advanced personalization" },
        { included: false, text: "Priority support" }
      ],
      popular: false,
      ctaText: "Choose Basic"
    },
    {
      name: "Plus",
      price: 9.99,
      period: "monthly",
      description: "Enhanced features and more API calls for active users.",
      features: [
        { included: true, text: "Enhanced AI conversation quota (500/month)" },
        { included: true, text: "Faster response time" },
        { included: true, text: "Bi-weekly content updates" },
        { included: true, text: "Advanced cloud storage" },
        { included: true, text: "Basic premium content access" },
        { included: true, text: "Basic personalization" },
        { included: false, text: "Priority support" }
      ],
      popular: true,
      ctaText: "Choose Plus"
    },
    {
      name: "Premium",
      price: 14.99,
      period: "monthly",
      description: "Unlimited access to all premium features and content.",
      features: [
        { included: true, text: "Unlimited AI conversations" },
        { included: true, text: "Fastest response time" },
        { included: true, text: "Weekly content updates" },
        { included: true, text: "Premium cloud storage" },
        { included: true, text: "Full premium content access" },
        { included: true, text: "Advanced personalization" },
        { included: true, text: "24/7 priority support" }
      ],
      popular: false,
      ctaText: "Choose Premium"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <Features />
        
        {/* How It Works */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-teddy-blue/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-teddy-blue/10 text-teddy-blue mb-4">
                <span className="mr-2">🔍</span>
                <span>How It Works</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Simple Setup, Endless Learning
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get started with TeddyPal in just a few easy steps and watch your child's curiosity and knowledge grow.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MessageCircle className="h-8 w-8 text-teddy-blue" />,
                  title: "Interactive Conversations",
                  description: "Your child asks questions or shares thoughts, and TeddyPal responds with age-appropriate, educational content."
                },
                {
                  icon: <BookOpen className="h-8 w-8 text-teddy-pink" />,
                  title: "Learning & Growth",
                  description: "Every interaction helps build vocabulary, critical thinking, emotional intelligence, and subject knowledge."
                },
                {
                  icon: <ChevronRight className="h-8 w-8 text-teddy-mint" />,
                  title: "Insightful Analytics",
                  description: "The parent dashboard tracks learning progress, interests, and emotional development patterns."
                }
              ].map((step, index) => (
                <AnimatedCard key={index} delay={index * 200} className="text-center">
                  <div className="w-16 h-16 bg-white dark:bg-teddy-charcoal shadow-soft rounded-full flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-teddy-blue/5 dark:bg-teddy-blue/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-teddy-coral/10 text-teddy-coral mb-4">
                <span className="mr-2">💬</span>
                <span>Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Parents Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Hear from families who've made TeddyPal a part of their children's learning journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedCard key={index} delay={index * 100} className="h-full">
                  <div className="h-full flex flex-col">
                    <div className="text-teddy-blue text-4xl mb-4">"</div>
                    <p className="text-gray-700 dark:text-gray-200 flex-grow mb-6">{testimonial.content}</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-teddy-mint/10 text-teddy-mint mb-4">
                <span className="mr-2">💰</span>
                <span>Pricing</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                TeddyPal requires both a one-time hardware purchase and an ongoing subscription for API access and content updates.
              </p>
              
              <div className="bg-teddy-cream/50 dark:bg-teddy-blue/10 p-4 rounded-xl max-w-2xl mx-auto mb-8">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-teddy-coral mr-2 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                    TeddyPal requires both a one-time hardware purchase and an ongoing subscription for API access and content updates. Select your preferred options below.
                  </p>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="hardware" className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
                <TabsTrigger 
                  value="hardware" 
                  className="text-lg py-4 px-8 data-[state=active]:bg-teddy-coral data-[state=active]:text-white"
                >
                  Hardware
                </TabsTrigger>
                <TabsTrigger 
                  value="subscription" 
                  className="text-lg py-4 px-8 data-[state=active]:bg-teddy-coral data-[state=active]:text-white"
                >
                  Subscription
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="hardware">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {oneTimePlans.map((plan, index) => (
                    <AnimatedCard 
                      key={index}
                      delay={index * 100}
                      className={cn(
                        "relative overflow-hidden border h-full",
                        plan.popular 
                          ? "border-2 border-teddy-coral shadow-medium" 
                          : "border-gray-100 dark:border-gray-800"
                      )}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-teddy-coral text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="text-center pb-2">
                          <h3 className="text-xl font-bold">{plan.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{plan.description}</p>
                          <div className="flex items-center justify-center">
                            <span className="text-3xl font-bold text-teddy-charcoal dark:text-white">${plan.price}</span>
                            <span className="text-gray-500 dark:text-gray-400 ml-1">one-time</span>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                {feature.included ? (
                                  <Check className="h-5 w-5 text-teddy-mint mr-2 flex-shrink-0" />
                                ) : (
                                  <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                )}
                                <span className={feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}>
                                  {feature.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-auto">
                          <button 
                            onClick={() => navigate('/pre-order')}
                            className={cn(
                              "w-full py-2 px-4 rounded-lg text-white font-medium transition-colors",
                              plan.popular 
                                ? 'bg-teddy-coral hover:bg-teddy-coral/90' 
                                : 'bg-teddy-blue hover:bg-teddy-blue/90'
                            )}
                          >
                            {plan.ctaText}
                          </button>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
                
                <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                  All hardware purchases include a 1-year warranty and 30-day money-back guarantee.
                </div>
              </TabsContent>
              
              <TabsContent value="subscription">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {subscriptionPlans.map((plan, index) => (
                    <AnimatedCard 
                      key={index}
                      delay={index * 100}
                      className={cn(
                        "relative overflow-hidden border h-full",
                        plan.popular 
                          ? "border-2 border-teddy-coral shadow-medium" 
                          : "border-gray-100 dark:border-gray-800"
                      )}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-teddy-coral text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="text-center pb-2">
                          <h3 className="text-xl font-bold">{plan.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{plan.description}</p>
                          <div className="flex items-center justify-center">
                            <span className="text-3xl font-bold text-teddy-charcoal dark:text-white">${plan.price}</span>
                            <span className="text-gray-500 dark:text-gray-400 ml-1">/{plan.period}</span>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                {feature.included ? (
                                  <Check className="h-5 w-5 text-teddy-mint mr-2 flex-shrink-0" />
                                ) : (
                                  <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                )}
                                <span className={feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}>
                                  {feature.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-auto">
                          <button 
                            onClick={() => navigate('/pre-order')}
                            className={cn(
                              "w-full py-2 px-4 rounded-lg text-white font-medium transition-colors",
                              plan.popular 
                                ? 'bg-teddy-coral hover:bg-teddy-coral/90' 
                                : 'bg-teddy-blue hover:bg-teddy-blue/90'
                            )}
                          >
                            {plan.ctaText}
                          </button>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
                
                <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                  All subscriptions are billed monthly and can be canceled anytime. Annual plans with 20% discount available.
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mt-8">
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-teddy-blue mr-2" />
                <span className="text-gray-600 dark:text-gray-300">Secure payment processing</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-teddy-mint mr-2" />
                <span className="text-gray-600 dark:text-gray-300">30-day money back guarantee</span>
              </div>
              <div className="flex items-center">
                <Check className="h-6 w-6 text-teddy-coral mr-2" />
                <span className="text-gray-600 dark:text-gray-300">Free shipping on all orders</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-teddy-cream dark:bg-teddy-charcoal/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedCard glassEffect={true} className="py-12 px-6 md:px-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your Child's Learning Journey?
                </h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of families using TeddyPal to spark curiosity, foster emotional intelligence, and create magical learning moments.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => navigate('/pre-order')} className="btn-primary py-3 px-8 text-base">
                    Get Started Today
                  </button>
                  <button onClick={() => navigate('/teddy-demo')} className="btn-ghost text-base">
                    Try Demo
                  </button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
