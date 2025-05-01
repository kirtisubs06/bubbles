
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Dolphin, 
  Cat, 
  Bear, 
  Rabbit, 
  Bird, 
  Dog,
  Fish,
  Turtle,
  SquirrelIcon,
  Horse
} from 'lucide-react';

type AnimalOption = {
  id: string;
  name: string;
  displayName: string;
  icon: React.ReactNode;
};

type VoiceOption = {
  id: string;
  name: string;
  gender: string;
  accent?: string;
};

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedAnimal, setSelectedAnimal] = useState<string>("dolphin");
  const [selectedVoice, setSelectedVoice] = useState<string>("female-us");
  
  // Product information based on productId
  const getProductDetails = () => {
    // We only have one product now
    return {
      title: "Bubbles Smart Conversational Plush",
      description: "An interactive companion that engages children in playful conversations and educational games, fostering curiosity and imagination.",
      price: "$49.99",
      ageGroup: "6-10 years",
      defaultAnimal: "dolphin",
      defaultAnimalName: "Bubbles",
      defaultImage: "/lovable-uploads/b973dc7a-8667-49c0-a426-eb96c8118d6d.png",
    };
  };
  
  const productDetails = getProductDetails();
  
  // Customization options with animal icons
  const animalOptions: AnimalOption[] = [
    { 
      id: "dolphin", 
      name: "Dolphin", 
      displayName: "Bubbles the Dolphin",
      icon: <Dolphin className="h-8 w-8 text-bubbles-blue" />
    },
    { 
      id: "penguin", 
      name: "Penguin", 
      displayName: "Chilly the Penguin",
      icon: <Bird className="h-8 w-8 text-bubbles-navy" />
    },
    { 
      id: "bear", 
      name: "Bear", 
      displayName: "Echo the Bear",
      icon: <Bear className="h-8 w-8 text-bubbles-sand" />
    },
    { 
      id: "cat", 
      name: "Cat", 
      displayName: "Whiskers the Cat",
      icon: <Cat className="h-8 w-8 text-bubbles-teal" />
    },
    { 
      id: "rabbit", 
      name: "Rabbit", 
      displayName: "Hops the Rabbit",
      icon: <Rabbit className="h-8 w-8 text-bubbles-skyblue" />
    },
    { 
      id: "fox", 
      name: "Fox", 
      displayName: "Rusty the Fox",
      icon: <Dog className="h-8 w-8 text-bubbles-lightblue" />
    },
    { 
      id: "elephant", 
      name: "Elephant", 
      displayName: "Peanut the Elephant",
      icon: <Horse className="h-8 w-8 text-bubbles-purple" />
    },
    { 
      id: "giraffe", 
      name: "Giraffe", 
      displayName: "Stretch the Giraffe",
      icon: <Horse className="h-8 w-8 text-bubbles-aqua" />
    },
    { 
      id: "monkey", 
      name: "Monkey", 
      displayName: "Bananas the Monkey",
      icon: <SquirrelIcon className="h-8 w-8 text-bubbles-lime" />
    },
    { 
      id: "owl", 
      name: "Owl", 
      displayName: "Wisdom the Owl",
      icon: <Bird className="h-8 w-8 text-teddy-purple" />
    }
  ];
  
  // Expanded to 6 voice options
  const voiceOptions: VoiceOption[] = [
    { id: "female-us", name: "Sarah", gender: "Female", accent: "American" },
    { id: "female-uk", name: "Emma", gender: "Female", accent: "British" },
    { id: "male-us", name: "Michael", gender: "Male", accent: "American" },
    { id: "male-uk", name: "James", gender: "Male", accent: "British" },
    { id: "female-au", name: "Olivia", gender: "Female", accent: "Australian" },
    { id: "male-au", name: "Noah", gender: "Male", accent: "Australian" }
  ];
  
  const getCurrentAnimal = () => {
    const selectedAnimalOption = animalOptions.find(animal => animal.id === selectedAnimal);
    if (selectedAnimalOption) {
      return selectedAnimalOption;
    }
    
    // If nothing is selected, return the default animal for this product
    const defaultAnimal = animalOptions.find(animal => animal.id === productDetails.defaultAnimal);
    return defaultAnimal || animalOptions[0];
  };
  
  const currentAnimal = getCurrentAnimal();
  
  const handleAddToCart = () => {
    toast({
      title: "Added to waitlist!",
      description: `${currentAnimal.displayName} with ${voiceOptions.find(voice => voice.id === selectedVoice)?.name} voice has been added to your waitlist.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 dark:bg-bubbles-deep/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-[0_0_50px_rgba(51,195,240,0.15)]">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Image */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-bubbles-blue/20 via-bubbles-teal/20 to-bubbles-skyblue/20 rounded-full blur-3xl"></div>
                  <div className="w-full max-w-[400px] mx-auto relative z-10 flex justify-center items-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-bubbles-cream to-white dark:from-bubbles-deep/80 dark:to-bubbles-navy/50 rounded-full flex items-center justify-center shadow-bubbly">
                      <div className="w-40 h-40 flex items-center justify-center">
                        {currentAnimal.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Details & Customization */}
              <div className="lg:w-1/2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{productDetails.title}</h1>
                <p className="text-3xl font-bold text-bubbles-blue mb-2">{productDetails.price}</p>
                <div className="bg-bubbles-blue/10 text-bubbles-blue rounded-full py-1 px-4 inline-block mb-4">
                  Recommended age: {productDetails.ageGroup}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8">{productDetails.description}</p>
                
                {/* Animal Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 font-heading">Select your animal</h3>
                  <RadioGroup 
                    defaultValue={productDetails.defaultAnimal} 
                    value={selectedAnimal} 
                    onValueChange={setSelectedAnimal}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
                  >
                    {animalOptions.map((animal) => (
                      <div key={animal.id} className="relative">
                        <RadioGroupItem
                          value={animal.id}
                          id={`animal-${animal.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`animal-${animal.id}`}
                          className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-bubbles-blue [&:has([data-state=checked])]:border-primary cursor-pointer h-full transition-all duration-300 hover:shadow-md"
                        >
                          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-bubbles-cream/60 to-white/90 dark:from-bubbles-deep/60 dark:to-bubbles-navy/40 rounded-full mb-3 shadow-inner">
                            {animal.icon}
                          </div>
                          <span className="text-sm font-medium">{animal.name}</span>
                          <span className="text-xs mt-1 text-gray-500">{animal.displayName}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Voice Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 font-heading">Select your voice</h3>
                  <div className="bg-background dark:bg-bubbles-deep/30 rounded-xl border border-muted p-4">
                    <RadioGroup 
                      defaultValue="female-us"
                      value={selectedVoice}
                      onValueChange={setSelectedVoice}
                      className="grid gap-4 grid-cols-1 sm:grid-cols-2"
                    >
                      {voiceOptions.map((voice) => (
                        <div 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-bubbles-cream/20 dark:hover:bg-bubbles-deep/40 transition-colors" 
                          key={voice.id}
                        >
                          <RadioGroupItem value={voice.id} id={`voice-${voice.id}`} />
                          <Label htmlFor={`voice-${voice.id}`} className="flex-grow cursor-pointer">
                            <span className="font-medium">{voice.name}</span>
                            <span className="text-sm text-gray-500 block">
                              {voice.gender} • {voice.accent} Accent
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="navy" 
                    size="lg" 
                    className="flex-grow font-heading"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Waitlist
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => navigate('/shop')}
                    className="font-heading"
                  >
                    Back to Shop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
