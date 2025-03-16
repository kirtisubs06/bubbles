
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Check, X, ChevronRight, CreditCard, Shield, Info } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const Pricing: React.FC = () => {
  const [setHeroRef, isHeroVisible] = useIntersectionAnimation({ threshold: 0.2 });
  const [setPlansRef, isPlansVisible] = useIntersectionAnimation({ threshold: 0.1 });
  const [setFaqRef, isFaqVisible] = useIntersectionAnimation({ threshold: 0.1 });
  
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
  
  const faqs = [
    {
      question: "Why is there both a one-time purchase and a subscription?",
      answer: "The one-time purchase covers the physical teddy bear hardware and basic functionality. The subscription covers ongoing API costs, new content, and advanced features that require cloud processing power."
    },
    {
      question: "What happens if I don't subscribe after purchasing the teddy?",
      answer: "Your teddy will still function with basic features and pre-loaded content, but advanced AI conversations and new content updates will require an active subscription."
    },
    {
      question: "What age range is TeddyAI suitable for?",
      answer: "TeddyAI is designed for children ages 3-10, with content that adapts to their age and development level. The AI grows with your child, providing age-appropriate interactions."
    },
    {
      question: "How do I set up parental controls?",
      answer: "TeddyAI includes a comprehensive parent dashboard accessible via our mobile app or website. You can set usage limits, review conversation history, and customize educational content."
    },
    {
      question: "Is my child's data secure?",
      answer: "Absolutely. We take children's privacy seriously. All conversations are encrypted, data is stored securely, and we never share information with third parties. We are fully COPPA compliant."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teddy-cream/20 dark:from-teddy-charcoal dark:to-teddy-charcoal/80">
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-12">
          <div 
            ref={(el) => setHeroRef(el)}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-teddy-charcoal dark:text-white">
                Simple Pricing for Magical <span className="text-teddy-coral">Learning</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Choose the perfect TeddyAI companion that grows with your child and sparks their imagination.
              </p>
              
              <div className="bg-teddy-cream/50 dark:bg-teddy-blue/10 p-4 rounded-xl max-w-2xl mx-auto mb-8">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-teddy-coral mr-2 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                    TeddyAI requires both a one-time hardware purchase and an ongoing subscription for API access and content updates. Select your preferred options below.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Pricing Plans */}
        <section className="py-12">
          <div 
            ref={(el) => setPlansRef(el)}
            className="container mx-auto px-4"
          >
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
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isPlansVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`h-full relative overflow-hidden ${plan.popular ? 'border-2 border-teddy-coral' : ''}`}>
                        {plan.popular && (
                          <div className="absolute top-0 right-0 bg-teddy-coral text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                            Most Popular
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <CardDescription className="mb-2">{plan.description}</CardDescription>
                          <div className="flex items-center justify-center">
                            <span className="text-3xl font-bold text-teddy-charcoal dark:text-white">${plan.price}</span>
                            <span className="text-gray-500 dark:text-gray-400 ml-1">one-time</span>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-4">
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
                        </CardContent>
                        
                        <CardFooter>
                          <button 
                            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                              plan.popular 
                                ? 'bg-teddy-coral hover:bg-teddy-coral/90' 
                                : 'bg-teddy-blue hover:bg-teddy-blue/90'
                            }`}
                          >
                            {plan.ctaText}
                          </button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                  All hardware purchases include a 1-year warranty and 30-day money-back guarantee.
                </div>
              </TabsContent>
              
              <TabsContent value="subscription">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {subscriptionPlans.map((plan, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isPlansVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`h-full relative overflow-hidden ${plan.popular ? 'border-2 border-teddy-coral' : ''}`}>
                        {plan.popular && (
                          <div className="absolute top-0 right-0 bg-teddy-coral text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                            Most Popular
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <CardDescription className="mb-2">{plan.description}</CardDescription>
                          <div className="flex items-center justify-center">
                            <span className="text-3xl font-bold text-teddy-charcoal dark:text-white">${plan.price}</span>
                            <span className="text-gray-500 dark:text-gray-400 ml-1">/{plan.period}</span>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-4">
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
                        </CardContent>
                        
                        <CardFooter>
                          <button 
                            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                              plan.popular 
                                ? 'bg-teddy-coral hover:bg-teddy-coral/90' 
                                : 'bg-teddy-blue hover:bg-teddy-blue/90'
                            }`}
                          >
                            {plan.ctaText}
                          </button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                  All subscriptions are billed monthly and can be canceled anytime. Annual plans with 20% discount available.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Payment Security */}
        <section className="py-10 bg-teddy-blue/5 dark:bg-teddy-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
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
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div 
            ref={(el) => setFaqRef(el)}
            className="container mx-auto px-4"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-teddy-charcoal dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Everything you need to know about TeddyAI
                </p>
              </div>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFaqVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-teddy-cream to-white dark:from-teddy-blue/20 dark:to-teddy-purple/10 p-6 rounded-xl shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-teddy-charcoal dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isFaqVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-teddy-cream to-white dark:from-teddy-blue/20 dark:to-teddy-purple/10 py-12 px-6 rounded-3xl shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6 text-teddy-charcoal dark:text-white">
                  Ready to Start the Learning Journey?
                </h2>
                <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                  Give your child the gift of interactive, engaging education with TeddyAI.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/teddy-demo" className="btn-primary py-3 px-8 text-base">
                    Try the Demo
                  </a>
                  <a href="/login" className="btn-secondary py-3 px-8 text-base flex items-center">
                    Purchase Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
