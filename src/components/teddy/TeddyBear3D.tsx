import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Preload } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { toast } from '@/components/ui/use-toast';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { chatWithGeminiAI, GeminiMessage, textToSpeech } from '@/utils/geminiAI';

// Helper component for the 3D teddy bear model
const TeddyModel = ({ 
  setIsListening, 
  isListening 
}: { 
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  isListening: boolean
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [furTextureLoaded, setFurTextureLoaded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [geminiMessages, setGeminiMessages] = useState<GeminiMessage[]>([
    { role: 'assistant', content: "Hello! I'm Teddy, your friendly bear companion. I love talking about science, nature, space, and telling stories. What would you like to talk about today?" }
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
  
  // Load fur texture with error handling
  let furTexture: THREE.Texture;
  try {
    furTexture = useLoader(TextureLoader, '/fur-texture.png');
    furTexture.wrapS = furTexture.wrapT = THREE.RepeatWrapping;
    furTexture.repeat.set(4, 4);
    if (!furTextureLoaded) setFurTextureLoaded(true);
  } catch (error) {
    console.log("Fur texture loading error:", error);
    // Create a basic texture as fallback
    furTexture = new THREE.Texture();
    furTexture.needsUpdate = true;
  }
  
  // Animation for subtle breathing effect
  useFrame((state) => {
    if (group.current) {
      // Subtle breathing animation
      group.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.01;
      // Gentle rocking motion
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
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
        description: "Please add your Google Gemini API key to chat with Teddy.",
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

  // Create textures and materials based on the reference image
  const mainColor = "#C2B3A0"; // Beige/tan color matching the reference
  const muzzleColor = "#E6D9BC"; // Lighter beige for muzzle/tummy/paws
  const earColor = "#FFB6C1"; // Pink for inner ears
  const noseColor = "#222222"; // Dark for nose
  
  // Main teddy material
  const teddyMaterial = new THREE.MeshStandardMaterial({ 
    color: mainColor,
    roughness: 0.8,
    metalness: 0.1,
    bumpMap: furTextureLoaded ? furTexture : null,
    bumpScale: 0.02
  });
  
  // Muzzle/tummy/paws material
  const accentMaterial = new THREE.MeshStandardMaterial({ 
    color: muzzleColor,
    roughness: 0.7,
    metalness: 0.1,
    bumpMap: furTextureLoaded ? furTexture : null,
    bumpScale: 0.01
  });
  
  // Pink ear material
  const earInnerMaterial = new THREE.MeshStandardMaterial({ 
    color: earColor,
    roughness: 0.7,
    metalness: 0.1
  });

  return (
    <group 
      ref={group} 
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
      scale={isListening ? 1.02 : 1}
      rotation={[0.1, 0, 0]}
    >
      {/* Body - main torso */}
      <mesh position={[0, -0.2, 0]} scale={[1, 1.2, 0.8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={teddyMaterial} />
      </mesh>

      {/* Head - slightly larger than in previous version to match reference */}
      <mesh position={[0, 1.3, 0]} scale={[1, 0.9, 0.85]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <primitive object={teddyMaterial} />
      </mesh>
      
      {/* Muzzle - shaped and positioned to match reference */}
      <mesh position={[0, 1.0, 0.65]} scale={[0.65, 0.5, 0.5]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <primitive object={accentMaterial} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.05, 1]} scale={[0.22, 0.15, 0.15]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={noseColor} roughness={0.3} metalness={0.3} />
      </mesh>
      
      {/* Mouth - make sure it's a proper smile, not a frown */}
      <mesh position={[0, 0.85, 0.95]} rotation={[-0.2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 16, 16, Math.PI]} />
        <meshStandardMaterial color={noseColor} roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Left Ear - positioned to match reference */}
      <mesh position={[-0.85, 2.1, 0]} scale={[0.4, 0.5, 0.2]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={teddyMaterial} />
      </mesh>
      
      {/* Right Ear - positioned to match reference */}
      <mesh position={[0.85, 2.1, 0]} scale={[0.4, 0.5, 0.2]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={teddyMaterial} />
      </mesh>
      
      {/* Left Ear - inner pink part */}
      <mesh position={[-0.85, 2.1, 0.08]} scale={[0.3, 0.4, 0.05]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={earInnerMaterial} />
      </mesh>
      
      {/* Right Ear - inner pink part */}
      <mesh position={[0.85, 2.1, 0.08]} scale={[0.3, 0.4, 0.05]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={earInnerMaterial} />
      </mesh>

      {/* Left Eye */}
      <mesh position={[-0.28, 1.25, 0.85]} scale={[0.08, 0.12, 0.08]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={noseColor} roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Right Eye */}
      <mesh position={[0.28, 1.25, 0.85]} scale={[0.08, 0.12, 0.08]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={noseColor} roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Left Arm - positioned lower to avoid shrugging look and make thicker */}
      <mesh position={[-1.0, 0.0, 0]} rotation={[0, 0, -0.3]} scale={[0.6, 1.0, 0.6]}>
        <capsuleGeometry args={[0.5, 1, 16, 16]} />
        <primitive object={teddyMaterial} />
      </mesh>
      
      {/* Right Arm - positioned lower to avoid shrugging look and make thicker */}
      <mesh position={[1.0, 0.0, 0]} rotation={[0, 0, 0.3]} scale={[0.6, 1.0, 0.6]}>
        <capsuleGeometry args={[0.5, 1, 16, 16]} />
        <primitive object={teddyMaterial} />
      </mesh>
      
      {/* Left Leg - made more rounded and thicker */}
      <mesh position={[-0.5, -1.35, 0]} rotation={[0, 0, -0.1]} scale={[0.7, 0.9, 0.7]}>
        <capsuleGeometry args={[0.5, 0.8, 16, 16]} />
        <primitive object={teddyMaterial} />
      </mesh>
      
      {/* Right Leg - made more rounded and thicker */}
      <mesh position={[0.5, -1.35, 0]} rotation={[0, 0, 0.1]} scale={[0.7, 0.9, 0.7]}>
        <capsuleGeometry args={[0.5, 0.8, 16, 16]} />
        <primitive object={teddyMaterial} />
      </mesh>
      
      {/* Left Foot */}
      <mesh position={[-0.5, -1.85, 0.3]} rotation={[0.5, 0, 0]} scale={[0.4, 0.3, 0.5]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={accentMaterial} />
      </mesh>
      
      {/* Right Foot */}
      <mesh position={[0.5, -1.85, 0.3]} rotation={[0.5, 0, 0]} scale={[0.4, 0.3, 0.5]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={accentMaterial} />
      </mesh>
      
      {/* Left Hand */}
      <mesh position={[-1.3, -0.5, 0.3]} rotation={[0.3, 0, 0]} scale={[0.4, 0.3, 0.5]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={accentMaterial} />
      </mesh>
      
      {/* Right Hand */}
      <mesh position={[1.3, -0.5, 0.3]} rotation={[0.3, 0, 0]} scale={[0.4, 0.3, 0.5]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={accentMaterial} />
      </mesh>
      
      {/* Tummy patch - oval shaped to match reference */}
      <mesh position={[0, 0.1, 0.6]} scale={[0.8, 1.1, 0.4]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <primitive object={accentMaterial} />
      </mesh>
      
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
      <meshStandardMaterial color="#C2B3A0" />
    </mesh>
  );
};

interface TeddyBear3DProps {
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  isListening: boolean;
}

const TeddyBear3D: React.FC<TeddyBear3DProps> = ({ setIsListening, isListening }) => {
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
            <TeddyModel setIsListening={setIsListening} isListening={isListening} />
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

export default TeddyBear3D;
