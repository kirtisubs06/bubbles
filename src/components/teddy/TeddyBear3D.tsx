
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Preload } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { toast } from '@/components/ui/use-toast';
import { useVertexAI } from '@/hooks/useVertexAI';
import { chatWithVertexAI, VertexMessage, textToSpeech, speechToText } from '@/utils/vertexAI';

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
  const [vertexMessages, setVertexMessages] = useState<VertexMessage[]>([
    { role: 'assistant', content: "Hello! I'm Teddy, your friendly bear companion. I love talking about science, nature, space, and telling stories. What would you like to talk about today?" }
  ]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { apiKey, isConfigured } = useVertexAI();
  
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
        description: "Please add your Google Vertex AI API key to chat with Teddy.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        // Convert speech to text
        const transcript = await speechToText(audioBlob, apiKey);
        if (transcript) {
          // Process with Vertex AI
          await processMessage(transcript);
        } else {
          toast({
            title: "Speech Recognition Failed",
            description: "Sorry, I couldn't understand what you said.",
            variant: "destructive"
          });
          setIsListening(false);
        }
        
        // Stop all tracks on the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setIsListening(true);
      
      // Record for 5 seconds maximum
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Access Failed",
        description: "Please allow access to your microphone to talk with Teddy.",
        variant: "destructive"
      });
    }
  };
  
  // Stop recording if currently recording
  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  // Process message with Vertex AI and speak response
  const processMessage = async (message: string) => {
    try {
      // Add user message to conversation history
      const updatedMessages: VertexMessage[] = [
        ...vertexMessages,
        { role: 'user', content: message }
      ];
      setVertexMessages(updatedMessages);
      
      // Get response from Vertex AI
      const response = await chatWithVertexAI(updatedMessages, apiKey);
      
      // Update conversation history with assistant response
      setVertexMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Convert text to speech and play
      const audioBlob = await textToSpeech(response, apiKey);
      
      if (audioRef.current) {
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current.src = audioUrl;
        audioRef.current.onended = () => {
          setIsListening(false);
          URL.revokeObjectURL(audioUrl);
        };
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsListening(false);
        });
      }
      
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "AI Processing Error",
        description: "There was a problem communicating with the AI.",
        variant: "destructive"
      });
      setIsListening(false);
    }
  };

  const handleClick = () => {
    if (isListening) {
      // If already listening, stop
      stopVoiceRecording();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsListening(false);
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
