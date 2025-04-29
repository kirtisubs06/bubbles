
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Music, Mic } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';

const Shop: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 'conversational-dolphin',
      icon: <MessageCircle className="h-12 w-12 text-bubbles-blue" />,
      title: "Bubbles Smart Conversational Plush",
      description: "An interactive dolphin companion that engages children in playful conversations and educational games, fostering curiosity and imagination.",
      price: "$49.99",
      ageGroup: "6-10 years",
      animal: "Dolphin",
      animalName: "Bubbles"
    },
    {
      id: 'musical-penguin',
      icon: <Music className="h-12 w-12 text-bubbles-teal" />,
      title: "Melody Smart Musical Plush",
      description: "A musical companion designed to introduce children to the world of music through interactive melodies and engaging musical games.",
      price: "$49.99",
      ageGroup: "3-6 years",
      animal: "Penguin",
      animalName: "Melody"
    },
    {
      id: 'speech-therapy-bear',
      icon: <Mic className="h-12 w-12 text-bubbles-skyblue" />,
      title: "Echo Smart Speech Therapy Plush",
      description: "A supportive companion that helps children develop speech and communication skills through engaging conversations and patient phonic help.",
      price: "$49.99",
      ageGroup: "5-8 years",
      animal: "Bear",
      animalName: "Echo"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-12 bg-gradient-to-b from-white via-bubbles-cream/20 to-white dark:from-bubbles-deep/80 dark:via-bubbles-deep/50 dark:to-bubbles-deep/30">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-bubbles-blue via-bubbles-teal to-bubbles-skyblue bg-clip-text text-transparent">
              Shop Our Smart Plush Collection
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Discover our innovative collection of interactive companions for your child
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <AnimatedCard key={index} delay={index * 200}>
                  <div className="bg-white/80 dark:bg-bubbles-deep/50 backdrop-blur-sm rounded-2xl p-8 shadow-bubbly hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-bubbles-teal/10 h-full flex flex-col">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-deep dark:to-bubbles-navy/50 rounded-full flex items-center justify-center shadow-inner">
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">{product.title}</h3>
                    <p className="text-2xl font-bold text-bubbles-blue mb-2 text-center">{product.price}</p>
                    <p className="text-bubbles-teal font-medium text-center mb-4">
                      Recommended age: {product.ageGroup}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-center flex-grow">{product.description}</p>
                    <Button 
                      variant="navy" 
                      size="lg"
                      className="w-full font-heading"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Customize {product.animalName}
                    </Button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
