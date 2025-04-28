
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { ShoppingCart, Package, Heart, MessageCircle, Star, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8 text-bubbles-blue" />,
      title: "Interactive AI Companion",
      description: "Your child's personal learning friend with natural conversation abilities"
    },
    {
      icon: <Heart className="h-8 w-8 text-bubbles-teal" />,
      title: "Safe & Child-Friendly",
      description: "Built with safety in mind, using child-appropriate content and monitored interactions"
    },
    {
      icon: <Star className="h-8 w-8 text-bubbles-skyblue" />,
      title: "Educational Growth",
      description: "Personalized learning experiences that adapt to your child's interests and pace"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-bubbles-cream to-white dark:from-bubbles-deep dark:to-bubbles-navy/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Meet Bubbles: Your Child's AI Dolphin Friend
                </h1>
                <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                  A revolutionary plush companion that combines cutting-edge AI with playful learning
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    variant="blue" 
                    size="xl"
                    className="group"
                    onClick={() => navigate('/order')}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Order Now
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    onClick={() => navigate('/features')}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-bubbles-aqua/20 via-bubbles-skyblue/30 to-bubbles-teal/20 rounded-full blur-3xl transform rotate-12 scale-110 animate-pulse-soft"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#33C3F0]/30 via-[#1EAEDB]/20 to-[#D3E4FD]/30 rounded-full blur-2xl animate-float"></div>
                <img 
                  src="/lovable-uploads/724300ba-d5f7-4b73-859a-1498a8a6ec55.png" 
                  alt="Bubbles AI Dolphin Plush" 
                  className="w-full max-w-[500px] mx-auto relative z-10 drop-shadow-[0_0_15px_rgba(51,195,240,0.3)] animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bubbles-skyblue/10 to-transparent rounded-full blur-xl transform -rotate-12 scale-95 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features */}
        <section className="py-20 bg-white dark:bg-bubbles-deep/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Bubbles?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <AnimatedCard key={index} delay={index * 200}>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-bubbles-cream dark:bg-bubbles-deep rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-20 bg-bubbles-cream/50 dark:bg-bubbles-deep/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-bubbles-deep/50 rounded-xl p-8 shadow-bubbly">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Bubbles AI Dolphin Companion</h3>
                    <div className="space-y-4 mb-6">
                      <p className="text-2xl font-bold text-bubbles-blue">$49.99</p>
                      <div className="flex items-center gap-2 text-bubbles-teal">
                        <Star className="fill-current" />
                        <Star className="fill-current" />
                        <Star className="fill-current" />
                        <Star className="fill-current" />
                        <Star className="fill-current" />
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-bubbles-teal" />
                        <span>Premium quality plush material</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-bubbles-teal" />
                        <span>Advanced AI conversation capabilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-bubbles-teal" />
                        <span>Secure payment & 30-day money back guarantee</span>
                      </li>
                    </ul>
                    <Button 
                      variant="blue" 
                      size="lg" 
                      className="w-full"
                      onClick={() => navigate('/order')}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Order Now
                    </Button>
                  </div>
                  <div className="flex-1">
                    <img 
                      src="/lovable-uploads/724300ba-d5f7-4b73-859a-1498a8a6ec55.png" 
                      alt="Bubbles AI Dolphin" 
                      className="w-full max-w-[300px] mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

