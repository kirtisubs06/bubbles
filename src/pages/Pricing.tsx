
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Check, X, ChevronRight, CreditCard, Shield } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';

const Pricing: React.FC = () => {
  const [setHeroRef, isHeroVisible] = useIntersectionAnimation({ threshold: 0.2 });
  const [setPlansRef, isPlansVisible] = useIntersectionAnimation({ threshold: 0.1 });
  const [setFaqRef, isFaqVisible] = useIntersectionAnimation({ threshold: 0.1 });
  
  const plans = [
    {
      name: "Starter",
      price: 129,
      description: "Perfect for young children just beginning their learning journey.",
      features: [
        { included: true, text: "Basic conversation abilities" },
        { included: true, text: "100+ educational stories" },
        { included: true, text: "Simple games and activities" },
        { included: true, text: "Parent dashboard access" },
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
        { included: true, text: "Advanced conversation abilities" },
        { included: true, text: "500+ educational stories" },
        { included: true, text: "Interactive games and quizzes" },
        { included: true, text: "Advanced parent dashboard" },
        { included: true, text: "Personalized learning path" },
        { included: true, text: "Regular content updates" },
        { included: false, text: "Premium content library" }
      ],
      popular: true,
      ctaText: "Choose Premium"
    },
    {
      name: "Ultimate",
      price: 229,
      description: "The complete package for maximum educational benefit.",
      features: [
        { included: true, text: "Premium conversation AI" },
        { included: true, text: "1000+ educational stories" },
        { included: true, text: "All games and interactive content" },
        { included: true, text: "Advanced analytics dashboard" },
        { included: true, text: "Personalized learning curriculum" },
        { included: true, text: "Priority content updates" },
        { included: true, text: "Premium content library access" }
      ],
      popular: false,
      ctaText: "Choose Ultimate"
    }
  ];
  
  const faqs = [
    {
      question: "Is there a subscription fee?",
      answer: "No, TeddyAI is a one-time purchase. You pay once for the device and get lifetime access to the basic features. Premium content updates are available through our optional subscription plan."
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
    },
    {
      question: "What if my TeddyAI gets damaged?",
      answer: "All TeddyAI units come with a 1-year warranty. Our Premium and Ultimate plans include an extended 2-year warranty with accidental damage protection."
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
            </motion.div>
          </div>
        </section>
        
        {/* Pricing Plans */}
        <section className="py-12">
          <div 
            ref={(el) => setPlansRef(el)}
            className="container mx-auto px-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isPlansVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-panel p-6 relative ${plan.popular ? 'border-2 border-teddy-coral' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teddy-coral text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2 text-teddy-charcoal dark:text-white">{plan.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold text-teddy-charcoal dark:text-white">${plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">one-time</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
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
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                      plan.popular 
                        ? 'bg-teddy-coral hover:bg-teddy-coral/90' 
                        : 'bg-teddy-blue hover:bg-teddy-blue/90'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                </motion.div>
              ))}
            </div>
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
                    className="glass-panel p-6"
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
                className="glass-panel py-12 px-6"
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
