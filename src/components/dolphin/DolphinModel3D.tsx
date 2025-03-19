
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Preload } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { toast } from '@/components/ui/use-toast';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { chatWithGeminiAI, GeminiMessage, textToSpeech } from '@/utils/geminiAI';

// Helper component for the 3D dolphin model
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
  
  // Create audio element for playback
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  // Load texture with error handling
  let dolphinTexture: THREE.Texture;
  try {
    dolphinTexture = useLoader(TextureLoader, '/fur-texture.png');
    dolphinTexture.wrapS = dolphinTexture.wrapT = THREE.RepeatWrapping;
    dolphinTexture.repeat.set(4, 4);
    if (!textureLoaded) setTextureLoaded(true);
  } catch (error) {
    console.log("Texture loading error:", error);
    // Create a basic texture as fallback
    dolphinTexture = new THREE.Texture();
    dolphinTexture.needsUpdate = true;
  }
  
  // Animation for subtle swimming motion
  useFrame((state) => {
    if (group.current) {
      // Subtle swimming animation
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      // Gentle rocking motion
      group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      
      // Additional slight rotation for lifelike movement
      if (!isListening) {
        group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
      }
    }
  });

  useEffect(() => {
    // Move camera slightly when listening
    if (isListening) {
      camera.position.z = 5;
    } else {
      camera.position.z = 6;
    }
  }, [isListening, camera]);

  // Start voice recording and processing
  const startVoiceRecording = async () => {
    if (!isConfigured) {
      toast({
        title: "API Key Required",
        description: "Please add your Google Gemini API key to chat with Bubbles.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsRecording(true);
      setIsListening(true);
      
      // Use browser's built-in SpeechRecognition API
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
      
      // Set a timeout to stop recognition after 7 seconds if no result
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
  
  // Process message with Gemini AI and speak response
  const processMessage = async (message: string) => {
    try {
      toast({
        description: `You said: "${message}"`,
        duration: 3000,
      });
      
      // Add user message to conversation history
      const updatedMessages: GeminiMessage[] = [
        ...geminiMessages,
        { role: 'user', content: message }
      ];
      setGeminiMessages(updatedMessages);
      
      // Get response from Gemini AI
      const response = await chatWithGeminiAI(updatedMessages, apiKey);
      
      // Update conversation history with assistant response
      setGeminiMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Use the browser's speech synthesis API
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // Slightly higher pitch for a child-friendly voice
      
      // Try to find a suitable voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        voice => voice.name.includes('Female') || voice.name.includes('Google') || voice.lang === 'en-US'
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
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
        description: "There was a problem communicating with the AI. Please check your API key.",
        variant: "destructive"
      });
      setIsListening(false);
    }
  };

  const handleClick = () => {
    if (isListening) {
      // If already listening, stop
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsListening(false);
      speechSynthesis.cancel(); // Stop any ongoing speech
    } else {
      // Start listening
      startVoiceRecording();
    }
  };

  // Updated colors to match the reference image
  const mainColor = "#8DCBE6"; // Light blue for the main dolphin body
  const bellyColor = "#FFFFFF"; // White for the belly
  const darkerBlue = "#5AA9E6"; // Medium blue for details
  const accentColor = "#3D87C9"; // Darker blue for fins and details
  const eyeColor = "#222222"; // Dark color for the eyes
  const blushColor = "#FFB5B5"; // Light pink for blush
  
  return (
    <group 
      ref={group} 
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
      scale={isListening ? 1.02 : 1}
      rotation={[0, 0.3, 0]}
    >
      {/* Main body - smooth and rounded */}
      <mesh position={[0, 0, 0]} scale={[1.2, 0.9, 0.9]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={mainColor} roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Head - more rounded */}
      <mesh position={[-1.0, 0.1, 0]} scale={[0.9, 0.8, 0.8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={mainColor} roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Snout/Beak - more accurate and cute */}
      <mesh position={[-1.7, -0.1, 0]} rotation={[0, 0, 0.1]} scale={[0.6, 0.3, 0.3]}>
        <cylinderGeometry args={[0.3, 0.5, 1, 32]} />
        <meshStandardMaterial color={mainColor} roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Dolphin smile - more defined and cute */}
      <mesh position={[-1.9, -0.25, 0]} rotation={[0, 0, 0.2]}>
        <torusGeometry args={[0.15, 0.02, 16, 16, Math.PI]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Eye reflections */}
      <mesh position={[-1.6, 0.1, 0.25]} scale={[0.05, 0.05, 0.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Left eye - bigger, more expressive */}
      <group position={[-1.5, 0.15, 0.3]}>
        <mesh scale={[1, 1, 1]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color={eyeColor} />
        </mesh>
        <mesh position={[0.05, 0.05, 0]} scale={[0.3, 0.3, 0.3]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      
      {/* Eyelashes for cuteness */}
      <mesh position={[-1.6, 0.3, 0.35]} rotation={[0, 0, Math.PI / 4]} scale={[0.01, 0.06, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-1.5, 0.3, 0.35]} rotation={[0, 0, Math.PI / 8]} scale={[0.01, 0.06, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-1.4, 0.28, 0.35]} rotation={[0, 0, -Math.PI / 8]} scale={[0.01, 0.06, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Blush spots for added cuteness */}
      <mesh position={[-1.6, -0.1, 0.4]} scale={[0.15, 0.1, 0.05]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={blushColor} opacity={0.5} transparent={true} />
      </mesh>
      
      {/* Tail connector - smoother transition */}
      <mesh position={[1.3, 0, 0]} scale={[0.7, 0.5, 0.5]}>
        <cylinderGeometry args={[0.5, 0.3, 1, 32]} />
        <meshStandardMaterial color={darkerBlue} roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Improved tail flukes - more elegant */}
      <group position={[1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh scale={[0.1, 0.9, 0.6]}>
          <cylinderGeometry args={[0.8, 0.1, 1, 32]} />
          <meshStandardMaterial color={darkerBlue} roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Dorsal fin - redesigned and cuter */}
      <mesh position={[0.3, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]} scale={[0.3, 0.7, 0.1]}>
        <cylinderGeometry args={[0.2, 0.5, 1, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Left pectoral fin - more pronounced */}
      <mesh position={[-0.2, -0.2, 0.7]} rotation={[0.2, 0.3, -Math.PI / 6]} scale={[0.5, 0.2, 0.1]}>
        <cylinderGeometry args={[0.2, 0.4, 1, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Right pectoral fin */}
      <mesh position={[-0.2, -0.2, -0.7]} rotation={[-0.2, -0.3, -Math.PI / 6]} scale={[0.5, 0.2, 0.1]}>
        <cylinderGeometry args={[0.2, 0.4, 1, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* White belly - more defined */}
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.3, 0.9, 0.5]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={bellyColor} roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Water splash effect */}
      <group position={[2.3, -0.5, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]} scale={[0.2, 0.05, 0.2]}>
          <torusGeometry args={[1, 0.5, 16, 16, Math.PI]} />
          <meshStandardMaterial color="#A8DEFF" opacity={0.7} transparent={true} />
        </mesh>
        <mesh position={[0.3, 0.1, 0.2]} scale={[0.05, 0.05, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#A8DEFF" opacity={0.7} transparent={true} />
        </mesh>
        <mesh position={[0.2, 0.2, -0.2]} scale={[0.04, 0.04, 0.04]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#A8DEFF" opacity={0.7} transparent={true} />
        </mesh>
        <mesh position={[0.4, 0, 0]} scale={[0.03, 0.03, 0.03]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#A8DEFF" opacity={0.7} transparent={true} />
        </mesh>
      </group>
      
      {/* Interaction button (hidden visually but provides interactivity) */}
      <mesh position={[0, 0, 2]} visible={false} scale={3}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

// Create a fallback component for loading state
const LoadingFallback = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#8DCBE6" />
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
      )}
    </div>
  );
};

export default DolphinModel3D;
