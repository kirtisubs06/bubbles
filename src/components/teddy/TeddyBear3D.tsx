
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

  // Design inspired by plush knitted teddy bear
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
          {/* Main Body - plush and rounded */}
          <mesh position={[0, -0.7, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>

          {/* Add knitted texture through bump and normal mapping */}
          <mesh position={[0, -0.7, 0]} scale={1.01}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial 
              color="#F9F9F9" 
              roughness={1} 
              metalness={0} 
              wireframe={true} 
              transparent={true} 
              opacity={0.1} 
            />
          </mesh>
          
          {/* Head - plush and round */}
          <mesh position={[0, 1.0, 0]}>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Add knitted texture through wireframe overlay on head */}
          <mesh position={[0, 1.0, 0]} scale={1.01}>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshStandardMaterial 
              color="#F9F9F9" 
              roughness={1} 
              metalness={0}
              wireframe={true} 
              transparent={true} 
              opacity={0.1}  
            />
          </mesh>
          
          {/* Muzzle - softer, lighter color */}
          <mesh position={[0, 0.9, 0.85]}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color="#FFFFFF" roughness={1} metalness={0} />
          </mesh>
          
          {/* Left Ear */}
          <mesh position={[-0.8, 1.9, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Right Ear */}
          <mesh position={[0.8, 1.9, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Left Arm - plush and cylindrical */}
          <mesh position={[-1.3, -0.4, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.35, 0.35, 1.2, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Right Arm - plush and cylindrical */}
          <mesh position={[1.3, -0.4, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.35, 0.35, 1.2, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Left Hand */}
          <mesh position={[-1.7, -0.8, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Right Hand */}
          <mesh position={[1.7, -0.8, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Left Leg - plush and cylindrical */}
          <mesh position={[-0.6, -1.8, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.35, 0.35, 1.2, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Right Leg - plush and cylindrical */}
          <mesh position={[0.6, -1.8, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.35, 0.35, 1.2, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Left Foot */}
          <mesh position={[-0.7, -2.3, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Right Foot */}
          <mesh position={[0.7, -2.3, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#F9F9F9" roughness={1} metalness={0} />
          </mesh>
          
          {/* Eyes - black and glossy */}
          <mesh position={[-0.35, 1.1, 0.85]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.5} />
          </mesh>
          
          <mesh position={[0.35, 1.1, 0.85]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.5} />
          </mesh>
          
          {/* Eye shine */}
          <mesh position={[-0.33, 1.13, 0.95]}>
            <sphereGeometry args={[0.03, 32, 32]} />
            <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
          </mesh>
          
          <mesh position={[0.37, 1.13, 0.95]}>
            <sphereGeometry args={[0.03, 32, 32]} />
            <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
          </mesh>
          
          {/* Nose - black and glossy */}
          <mesh position={[0, 0.9, 1.2]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.5} />
          </mesh>
          
          {/* Mouth - simple curve */}
          <mesh position={[0, 0.7, 1.0]} rotation={[Math.PI/4, 0, 0]}>
            <torusGeometry args={[0.1, 0.03, 16, 16, Math.PI]} />
            <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.2} />
          </mesh>
          
          {/* Ribbon around neck */}
          <mesh position={[0, 0.05, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.9, 0.15, 16, 32]} />
            <meshStandardMaterial color="#FFF3CC" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Bow - left loop */}
          <mesh position={[-0.35, 0.15, 0.9]} rotation={[0, 0.4, 0]}>
            <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI*1.5]} />
            <meshStandardMaterial color="#FFF3CC" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Bow - right loop */}
          <mesh position={[0.35, 0.15, 0.9]} rotation={[0, -0.4, 0]}>
            <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI*1.5]} />
            <meshStandardMaterial color="#FFF3CC" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Bow - center knot */}
          <mesh position={[0, 0.15, 0.9]}>
            <boxGeometry args={[0.3, 0.2, 0.1]} />
            <meshStandardMaterial color="#FFF3CC" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Bow - hanging ribbons */}
          <mesh position={[-0.1, -0.3, 0.9]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.08, 0.6, 0.02]} />
            <meshStandardMaterial color="#FFF3CC" roughness={0.8} metalness={0.1} />
          </mesh>
          
          <mesh position={[0.1, -0.3, 0.9]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.08, 0.6, 0.02]} />
            <meshStandardMaterial color="#FFF3CC" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Speaker/Button with glow effect when listening */}
          <mesh 
            position={[0, -0.1, 1.3]} 
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
