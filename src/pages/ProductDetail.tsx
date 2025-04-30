
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

type AnimalOption = {
  id: string;
  name: string;
  displayName: string;
  image: string;
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
  
  // Customization options - expanded to 10 animals
  const animalOptions: AnimalOption[] = [
    { 
      id: "dolphin", 
      name: "Dolphin", 
      displayName: "Bubbles the Dolphin",
      image: "/lovable-uploads/b973dc7a-8667-49c0-a426-eb96c8118d6d.png"
    },
    { 
      id: "penguin", 
      name: "Penguin", 
      displayName: "Chilly the Penguin",
      image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369"
    },
    { 
      id: "bear", 
      name: "Bear", 
      displayName: "Echo the Bear",
      image: "https://images.unsplash.com/photo-1501286353178-1ec871214838"
    },
    { 
      id: "cat", 
      name: "Cat", 
      displayName: "Whiskers the Cat",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    },
    { 
      id: "rabbit", 
      name: "Rabbit", 
      displayName: "Hops the Rabbit",
      image: "https://images.unsplash.com/photo-1535241749838-299277b6305f"
    },
    { 
      id: "fox", 
      name: "Fox", 
      displayName: "Rusty the Fox",
      image: "https://images.unsplash.com/photo-1516934024742-b461fba47600"
    },
    { 
      id: "elephant", 
      name: "Elephant", 
      displayName: "Peanut the Elephant",
      image: "https://images.unsplash.com/photo-1557050543-4162f1e05e22"
    },
    { 
      id: "giraffe", 
      name: "Giraffe", 
      displayName: "Stretch the Giraffe",
      image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50"
    },
    { 
      id: "monkey", 
      name: "Monkey", 
      displayName: "Bananas the Monkey",
      image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9"
    },
    { 
      id: "owl", 
      name: "Owl", 
      displayName: "Wisdom the Owl",
      image: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb"
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
                  <img 
                    src={currentAnimal.image}
                    alt={currentAnimal.displayName}
                    className="w-full max-w-[400px] mx-auto rounded-lg object-contain relative z-10"
                  />
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
                    className="grid grid-cols-2 md:grid-cols-5 gap-4"
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
                          className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-bubbles-blue [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                        >
                          <span className="text-sm font-medium mb-2">{animal.name}</span>
                          <img 
                            src={animal.image} 
                            alt={animal.name} 
                            className="w-16 h-16 object-cover rounded-full mb-2" 
                          />
                          <span className="text-xs">{animal.displayName}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Voice Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 font-heading">Select your voice</h3>
                  <RadioGroup 
                    defaultValue="female-us"
                    value={selectedVoice}
                    onValueChange={setSelectedVoice}
                    className="grid gap-4"
                  >
                    {voiceOptions.map((voice) => (
                      <div className="flex items-center space-x-2" key={voice.id}>
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
