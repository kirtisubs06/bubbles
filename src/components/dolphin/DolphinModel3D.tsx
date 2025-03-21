import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Preload } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { toast } from '@/components/ui/use-toast';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { chatWithGeminiAI, GeminiMessage, textToSpeech } from '@/utils/geminiAI';

// Helper component for the 3D dolphin model that matches the reference image
const DolphinModel = ({ 
  setIsListening, 
  isListening 
}: { 
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  isListening: boolean
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [geminiMessages, setGeminiMessages] = useState<GeminiMessage[]>([
    { role: 'assistant', content: "Hello! I'm Bubbles, your friendly dolphin companion. I love talking about marine life, science, nature, space, and telling stories. What would you like to talk about today?" }
  ]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { apiKey, isConfigured } = useGeminiAI();
  
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      
      if (!isListening) {
        group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
      }
    }
  });

  useEffect(() => {
    if (isListening) {
      camera.position.z = 5;
    } else {
      camera.position.z = 6;
    }
  }, [isListening, camera]);

  const startVoiceRecording = async () => {
    try {
      setIsRecording(true);
      setIsListening(true);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        throw new Error("Speech recognition not supported in this browser");
      }
      
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          await processMessage(transcript);
        } else {
          throw new Error("No speech detected");
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Speech Recognition Failed",
          description: `Error: ${event.error}. Try speaking more clearly or using Chrome/Edge.`,
          variant: "destructive"
        });
        setIsListening(false);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
      
      setTimeout(() => {
        if (isRecording) {
          recognition.stop();
        }
      }, 7000);
      
    } catch (error) {
      console.error('Error accessing speech recognition:', error);
      toast({
        title: "Speech Recognition Failed",
        description: "Please try using Chrome or Edge browsers for best results.",
        variant: "destructive"
      });
      setIsListening(false);
      setIsRecording(false);
    }
  };

  const processMessage = async (message: string) => {
    try {
      toast({
        description: `You said: "${message}"`,
        duration: 3000,
      });
      
      const updatedMessages: GeminiMessage[] = [
        ...geminiMessages,
        { role: 'user', content: message }
      ];
      setGeminiMessages(updatedMessages);
      
      const response = await chatWithGeminiAI(updatedMessages, apiKey);
      
      setGeminiMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      
      const voices = window.speechSynthesis.getVoices();
      
      const americanFemaleVoice = voices.find(
        voice => 
          voice.lang.includes('en-US') && 
          (voice.name.includes('Female') || 
           voice.name.includes('Girl') || 
           voice.name.includes('Samantha') || 
           voice.name.includes('Google US English Female'))
      );
      
      if (americanFemaleVoice) {
        utterance.voice = americanFemaleVoice;
        console.log(`Using voice: ${americanFemaleVoice.name}`);
      } else {
        const usVoice = voices.find(voice => voice.lang.includes('en-US'));
        if (usVoice) {
          utterance.voice = usVoice;
          console.log(`Fallback to US voice: ${usVoice.name}`);
        }
      }
      
      utterance.onend = () => {
        setIsListening(false);
      };
      
      utterance.onerror = () => {
        setIsListening(false);
      };
      
      speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "AI Processing Error",
        description: "There was a problem communicating with the AI. Please try again.",
        variant: "destructive"
      });
      setIsListening(false);
    }
  };

  const handleClick = () => {
    if (isListening) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsListening(false);
      speechSynthesis.cancel();
    } else {
      startVoiceRecording();
    }
  };

  const bodyBlueColor = "#5b9de3";
  const bellyWhiteColor = "#ffffff";
  const eyeColor = "#000000";

  return (
    <group 
      ref={group} 
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
      scale={isListening ? 1.05 : 1}
      rotation={[0, 0, 0]}
    >
      <mesh position={[0, 0, 0]} scale={[2.2, 0.8, 0.9]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh position={[0, -0.35, 0]} scale={[2.1, 0.4, 0.85]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={bellyWhiteColor} roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh position={[-1.8, 0, 0]} scale={[0.85, 0.65, 0.7]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      <mesh position={[-2.4, -0.05, 0]} rotation={[0, 0, 0]} scale={[0.4, 0.3, 0.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh position={[-2.4, -0.2, 0]} rotation={[0, 0, 0]} scale={[0.4, 0.2, 0.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={bellyWhiteColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      <mesh position={[-2.0, 0.1, 0.4]} scale={[0.13, 0.13, 0.13]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>

      <mesh position={[-2.0, 0.1, -0.4]} scale={[0.13, 0.13, 0.13]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      
      <mesh position={[-0.4, -0.1, 0.8]} rotation={[0, 0, -0.3]} scale={[0.7, 0.2, 0.5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      <mesh position={[-0.4, -0.1, -0.8]} rotation={[0, 0, -0.3]} scale={[0.7, 0.2, 0.5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      <mesh position={[0.3, 0.7, 0]} rotation={[0, 0, 0.2]} scale={[0.7, 0.6, 0.15]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      <mesh position={[1.8, 0, 0]} scale={[0.9, 0.5, 0.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      <group position={[2.6, 0, 0]}>
        <mesh position={[0, 0, 0]} scale={[0.3, 0.3, 0.25]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
        </mesh>
        
        <mesh position={[0, 0, 0.4]} rotation={[0, 0, 0]} scale={[0.3, 0.15, 0.7]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
        </mesh>
        
        <mesh position={[0, 0, -0.4]} rotation={[0, 0, 0]} scale={[0.3, 0.15, 0.7]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={bodyBlueColor} roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
      
      <mesh position={[0, 0, 0]} visible={false} scale={[2.5, 1.2, 1.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

const LoadingFallback = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#5b9de3" />
    </mesh>
  );
};

interface DolphinModel3DProps {
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  isListening: boolean;
}

const DolphinModel3D: React.FC<DolphinModel3DProps> = ({ setIsListening, isListening }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  
  return (
    <div ref={ref} className="w-full h-full">
      {isInView && (
        <>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <spotLight position={[0, 5, 5]} intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            
            <Suspense fallback={<LoadingFallback />}>
              <DolphinModel setIsListening={setIsListening} isListening={isListening} />
            </Suspense>
            
            <ContactShadows
              position={[0, -2.3, 0]}
              opacity={0.5}
              scale={10}
              blur={1.5}
              far={4}
            />
            <Environment preset="sunset" />
            <OrbitControls 
              enablePan={false} 
              minDistance={4} 
              maxDistance={10}
              minPolarAngle={Math.PI/6}
              maxPolarAngle={Math.PI/1.5}
              rotateSpeed={0.5}
            />
            <Preload all />
          </Canvas>
          <div className="text-xs text-gray-400 text-center mt-2">
            3D Model inspired by: <a href="https://www.cadnav.com/3d-models/model-40660.html" target="_blank" rel="noopener noreferrer" className="hover:underline">www.cadnav.com</a>
          </div>
        </>
      )}
    </div>
  );
};

export default DolphinModel3D;
