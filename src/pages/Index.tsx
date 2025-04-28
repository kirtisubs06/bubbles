
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { ShoppingCart, Package, Heart, MessageCircle, Star, Sparkles, Music, Mic, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8 text-bubbles-blue" />,
      title: "Interactive Companion",
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

  const products = [
    {
      icon: <MessageCircle className="h-12 w-12 text-bubbles-blue" />,
      title: "Bubbles Smart Conversational Plush",
      description: "An interactive dolphin companion that engages children in playful conversations and educational games, fostering curiosity and imagination.",
      price: "$49.99"
    },
    {
      icon: <Music className="h-12 w-12 text-bubbles-teal" />,
      title: "Bubbles Smart Musical Plush",
      description: "A musical companion designed to introduce children to the world of music through interactive melodies and engaging musical games.",
      price: "$49.99"
    },
    {
      icon: <Mic className="h-12 w-12 text-bubbles-skyblue" />,
      title: "Bubbles Smart Speech Therapy Plush",
      description: "A supportive companion that helps children develop speech and communication skills through engaging conversations and patient phonic help.",
      price: "$49.99"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-bubbles-cream via-white to-bubbles-skyblue/20 dark:from-bubbles-deep dark:via-bubbles-deep/50 dark:to-bubbles-navy/50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#33C3F0]/30 via-[#1EAEDB]/20 to-[#D3E4FD]/30 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4 animate-pulse-soft"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-bubbles-teal/30 via-bubbles-skyblue/20 to-bubbles-aqua/30 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left relative z-10">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-gradient-to-r from-bubbles-teal/20 to-bubbles-skyblue/20 backdrop-blur-sm mb-6">
                  <Sparkles className="h-4 w-4 mr-2 text-bubbles-teal animate-pulse" />
                  <span className="text-bubbles-deep dark:text-white">Meet Your New Friend</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-bubbles-blue via-bubbles-teal to-bubbles-skyblue bg-clip-text text-transparent">
                  Your Child's Smart Dolphin Companion
                </h1>
                
                <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                  Meet the interactive dolphin friend that grows with your child, sparking curiosity, fostering imagination, and creating magical learning moments!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    variant="blue" 
                    size="xl"
                    className="group"
                    onClick={() => navigate('/shop')}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Shop Now
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    onClick={() => navigate('/customize')}
                  >
                    Customize a Toy
                  </Button>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#33C3F0]/40 via-[#1EAEDB]/30 to-transparent rounded-full blur-3xl transform rotate-12 scale-110 animate-pulse-soft"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-bubbles-aqua/40 via-bubbles-skyblue/30 to-bubbles-teal/40 rounded-full blur-2xl animate-float"></div>
                <img 
                  src="/lovable-uploads/b973dc7a-8667-49c0-a426-eb96c8118d6d.png"
                  alt="Bubbles AI Dolphin Plush" 
                  className="w-full max-w-[500px] mx-auto relative z-10 drop-shadow-[0_0_25px_rgba(51,195,240,0.5)] animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bubbles-skyblue/20 to-transparent rounded-full blur-xl transform -rotate-12 scale-95 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 bg-gradient-to-b from-white via-bubbles-cream/20 to-white dark:from-bubbles-deep/80 dark:via-bubbles-deep/50 dark:to-bubbles-deep/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-bubbles-blue via-bubbles-teal to-bubbles-skyblue bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Discover our innovative collection of smart plush companions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <AnimatedCard key={index} delay={index * 200}>
                  <div className="bg-white/80 dark:bg-bubbles-deep/50 backdrop-blur-sm rounded-2xl p-8 shadow-bubbly hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-bubbles-teal/10">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-deep dark:to-bubbles-navy/50 rounded-full flex items-center justify-center shadow-inner">
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">{product.title}</h3>
                    <p className="text-2xl font-bold text-bubbles-blue mb-4 text-center">{product.price}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{product.description}</p>
                    <Button 
                      variant="fun" 
                      size="full"
                      onClick={() => navigate('/pre-order')}
                    >
                      Join Waitlist
                    </Button>
                  </div>
                </AnimatedCard>
              ))}
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

        {/* Product Details Section with Updated Styling */}
        <section className="py-20 bg-gradient-to-b from-bubbles-cream/50 to-white dark:from-bubbles-deep/30 dark:to-bubbles-deep/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 dark:bg-bubbles-deep/50 backdrop-blur-sm rounded-xl p-8 shadow-[0_0_50px_rgba(51,195,240,0.15)] hover:shadow-[0_0_50px_rgba(51,195,240,0.25)] transition-all duration-500">
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
                      src="/lovable-uploads/b973dc7a-8667-49c0-a426-eb96c8118d6d.png"
                      alt="Bubbles AI Dolphin" 
                      className="w-full max-w-[300px] mx-auto drop-shadow-[0_0_15px_rgba(51,195,240,0.3)] hover:drop-shadow-[0_0_25px_rgba(51,195,240,0.5)] transition-all duration-500"
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
