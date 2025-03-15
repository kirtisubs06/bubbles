
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { MessageCircle, ChevronRight, BookOpen, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const testimonials = [
    {
      content: "TeddyAI has transformed my daughter's learning experience. She's always excited to chat with her teddy and I love seeing the insights about her interests.",
      author: "Sarah M.",
      role: "Parent of a 6-year-old"
    },
    {
      content: "As an educator, I'm impressed by how the AI adapts to each child's learning style. My son asks questions I never would have thought to answer!",
      author: "Michael T.",
      role: "Teacher and parent"
    },
    {
      content: "My twins have different interests but their TeddyAI bears keep up with both of them. The parent dashboard has been eye-opening to see their different learning journeys.",
      author: "Aisha K.",
      role: "Mother of twins"
    }
  ];
  
  const pricingPlans = [
    {
      title: "Basic",
      price: "$9.99",
      period: "per month",
      description: "Perfect for families just getting started",
      features: [
        "AI-powered teddy conversations",
        "Basic parent dashboard",
        "Daily usage limits",
        "Weekly reports"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      title: "Premium",
      price: "$19.99",
      period: "per month",
      description: "Enhanced features for optimal learning",
      features: [
        "Everything in Basic",
        "Advanced analytics & insights",
        "Priority support",
        "Personalized learning paths",
        "Multiple child profiles"
      ],
      cta: "Try Premium",
      highlighted: true
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
                Get started with TeddyAI in just a few easy steps and watch your child's curiosity and knowledge grow.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MessageCircle className="h-8 w-8 text-teddy-blue" />,
                  title: "Interactive Conversations",
                  description: "Your child asks questions or shares thoughts, and TeddyAI responds with age-appropriate, educational content."
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
                Hear from families who've made TeddyAI a part of their children's learning journey.
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
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Choose the plan that best fits your family's needs. All plans include the AI-powered teddy bear hardware.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <AnimatedCard 
                  key={index}
                  delay={index * 100}
                  className={cn(
                    "relative overflow-hidden border",
                    plan.highlighted 
                      ? "border-teddy-blue shadow-medium" 
                      : "border-gray-100 dark:border-gray-800"
                  )}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 right-0 bg-teddy-blue text-white px-3 py-1 text-xs font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                    <div className="mt-4 mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-teddy-mint mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => navigate('/signup')}
                    className={cn(
                      "w-full py-3 rounded-lg font-medium transition-colors",
                      plan.highlighted 
                        ? "bg-teddy-blue text-white hover:bg-teddy-blue/90" 
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    {plan.cta}
                  </button>
                </AnimatedCard>
              ))}
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
                  Join thousands of families using TeddyAI to spark curiosity, foster emotional intelligence, and create magical learning moments.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => navigate('/login')} className="btn-primary py-3 px-8 text-base">
                    Get Started Today
                  </button>
                  <button onClick={() => navigate('/login')} className="btn-ghost text-base">
                    Contact Sales
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
