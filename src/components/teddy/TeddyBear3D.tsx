
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';

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
  
  // Animation for breathing effect
  useFrame((state) => {
    if (group.current) {
      // Subtle breathing animation
      group.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.01;
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

  const handleClick = () => {
    setIsListening(!isListening);
  };

  // Improved cuter teddy bear with a more distinctive face
  return (
    <group 
      ref={group} 
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <group
          position={[0, 0, 0]}
          scale={isListening ? 1.02 : 1}
        >
          {/* Body - rounder, more plush looking */}
          <mesh position={[0, -0.2, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial color="#E8A87C" roughness={0.9} metalness={0.1} />
          </mesh>
          
          {/* Head - rounder for cuteness */}
          <mesh position={[0, 1.3, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#E8A87C" roughness={0.9} metalness={0.1} />
          </mesh>
          
          {/* Muzzle - smaller and rounder */}
          <mesh position={[0, 1.1, 0.7]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#F9D5BB" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Ears - more rounded */}
          <mesh position={[-0.7, 2.1, 0]}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial color="#E8A87C" roughness={0.9} metalness={0.1} />
          </mesh>
          <mesh position={[0.7, 2.1, 0]}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial color="#E8A87C" roughness={0.9} metalness={0.1} />
          </mesh>
          
          {/* Inner Ears - pink for cuteness */}
          <mesh position={[-0.7, 2.1, 0.18]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#F5B0CB" roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[0.7, 2.1, 0.18]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#F5B0CB" roughness={0.7} metalness={0.1} />
          </mesh>
          
          {/* Arms - more plump */}
          <mesh position={[-1.3, 0, 0]} rotation={[0, 0, -0.5]}>
            <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
            <meshStandardMaterial color="#E8A87C" roughness={0.9} metalness={0.1} />
          </mesh>
          <mesh position={[1.3, 0, 0]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
            <meshStandardMaterial color="#E8A87C" roughness={0.9} metalness={0.1} />
          </mesh>
          
          {/* Legs - more plump */}
          <mesh position={[-0.55, -1.5, 0]} rotation={[0, 0, -0.2]}>
            <capsuleGeometry args={[0.35, 0.7, 8, 16]} />
            <meshStandardMaterial color="#E8A87C" roughness={0.9} metalness={0.1} />
          </mesh>
          <mesh position={[0.55, -1.5, 0]} rotation={[0, 0, 0.2]}>
            <capsuleGeometry args={[0.35, 0.7, 8, 16]} />
            <meshStandardMaterial color="#E8A87C" roughness={0.9} metalness={0.1} />
          </mesh>
          
          {/* Paw pads - cute detail */}
          <mesh position={[-1.5, -0.1, 0.4]} rotation={[0, 0, -0.5]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#F5B0CB" roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[1.5, -0.1, 0.4]} rotation={[0, 0, 0.5]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#F5B0CB" roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[-0.6, -2.0, 0.4]} rotation={[0, 0, -0.2]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#F5B0CB" roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[0.6, -2.0, 0.4]} rotation={[0, 0, 0.2]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#F5B0CB" roughness={0.7} metalness={0.1} />
          </mesh>
          
          {/* Eyes - bigger, rounder, more cartoon-like */}
          <mesh position={[-0.35, 1.45, 0.75]}>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshStandardMaterial color="#41337A" roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh position={[0.35, 1.45, 0.75]}>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshStandardMaterial color="#41337A" roughness={0.5} metalness={0.3} />
          </mesh>
          
          {/* Eye shine - larger for cuteness */}
          <mesh position={[-0.3, 1.5, 0.9]}>
            <sphereGeometry args={[0.06, 32, 32]} />
            <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
          </mesh>
          <mesh position={[0.4, 1.5, 0.9]}>
            <sphereGeometry args={[0.06, 32, 32]} />
            <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
          </mesh>
          
          {/* Nose - heart-shaped approximation */}
          <mesh position={[0, 1.2, 0.9]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="#C06C84" roughness={0.5} metalness={0.2} />
          </mesh>
          
          {/* Mouth - smiling curve */}
          <mesh position={[0, 1.0, 0.9]}>
            <torusGeometry args={[0.15, 0.03, 16, 16, Math.PI]} />
            <meshStandardMaterial color="#6C5B7B" roughness={0.5} metalness={0.2} />
          </mesh>
          
          {/* Belly patch */}
          <mesh position={[0, -0.2, 1]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#F9D5BB" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Button/speaker with animated glow when listening */}
          <mesh 
            position={[0, -0.2, 1.2]} 
            scale={isListening ? 1.2 : hovered ? 1.1 : 1}
          >
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial 
              color={isListening ? "#A0D2EB" : hovered ? "#A2E1DB" : "#B8B5FF"} 
              roughness={0.3} 
              metalness={0.7} 
              emissive={isListening ? "#A0D2EB" : hovered ? "#A2E1DB" : "#000000"}
              emissiveIntensity={isListening ? 0.5 : hovered ? 0.2 : 0}
            />
          </mesh>
          
          {/* Bowtie for added cuteness */}
          <mesh position={[0, 0.8, 1]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.4, 0.4, 0.1]} />
            <meshStandardMaterial color="#F67280" roughness={0.7} metalness={0.2} />
          </mesh>
          
          {/* Cheeks for extra cuteness */}
          <mesh position={[-0.6, 1.2, 0.7]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#F5B0CB" roughness={0.7} metalness={0.1} opacity={0.7} transparent={true} />
          </mesh>
          <mesh position={[0.6, 1.2, 0.7]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#F5B0CB" roughness={0.7} metalness={0.1} opacity={0.7} transparent={true} />
          </mesh>
        </group>
      </Float>
    </group>
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
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <spotLight position={[0, 5, 5]} intensity={0.6} />
          
          <TeddyModel setIsListening={setIsListening} isListening={isListening} />
          
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
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
          />
        </Canvas>
      )}
    </div>
  );
};

export default TeddyBear3D;
