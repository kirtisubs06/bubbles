
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Preload } from '@react-three/drei';
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
  
  // Animation for subtle breathing effect
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

  // Create textures and materials
  const mainColor = "#D2B48C"; // Beige color matching the reference
  const muzzleColor = "#F5DEB3"; // Lighter beige for muzzle/tummy/paws
  const earColor = "#FFB6C1"; // Pink for inner ears
  
  // Main teddy material
  const teddyMaterial = new THREE.MeshStandardMaterial({ 
    color: mainColor,
    roughness: 0.8,
    metalness: 0.1
  });
  
  // Muzzle/tummy/paws material
  const accentMaterial = new THREE.MeshStandardMaterial({ 
    color: muzzleColor,
    roughness: 0.8,
    metalness: 0.1
  });
  
  // Pink ear material
  const earInnerMaterial = new THREE.MeshStandardMaterial({ 
    color: earColor,
    roughness: 0.8,
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
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial {...teddyMaterial} />
      </mesh>

      {/* Head - slightly larger than torso */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial {...teddyMaterial} />
      </mesh>
      
      {/* Muzzle */}
      <mesh position={[0, 1.3, 0.7]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial {...accentMaterial} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.35, 1.05]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.3} />
      </mesh>
      
      {/* Mouth - simple curved line */}
      <mesh position={[0, 1.15, 1]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 16, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Left Ear - outer */}
      <mesh position={[-0.8, 2.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial {...teddyMaterial} />
      </mesh>
      
      {/* Right Ear - outer */}
      <mesh position={[0.8, 2.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial {...teddyMaterial} />
      </mesh>
      
      {/* Left Ear - inner pink part */}
      <mesh position={[-0.8, 2.3, 0.1]} scale={[0.8, 0.8, 0.2]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial {...earInnerMaterial} />
      </mesh>
      
      {/* Right Ear - inner pink part */}
      <mesh position={[0.8, 2.3, 0.1]} scale={[0.8, 0.8, 0.2]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial {...earInnerMaterial} />
      </mesh>

      {/* Left Eye */}
      <mesh position={[-0.35, 1.6, 0.85]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Right Eye */}
      <mesh position={[0.35, 1.6, 0.85]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-1.35, 0.4, 0.3]} rotation={[0.2, -0.4, -0.7]}>
        <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
        <meshStandardMaterial {...teddyMaterial} />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[1.35, 0.4, 0.3]} rotation={[0.2, 0.4, 0.7]}>
        <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
        <meshStandardMaterial {...teddyMaterial} />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-0.6, -1.4, 0.3]} rotation={[0.4, 0, -0.2]}>
        <capsuleGeometry args={[0.35, 0.7, 8, 16]} />
        <meshStandardMaterial {...teddyMaterial} />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0.6, -1.4, 0.3]} rotation={[0.4, 0, 0.2]}>
        <capsuleGeometry args={[0.35, 0.7, 8, 16]} />
        <meshStandardMaterial {...teddyMaterial} />
      </mesh>
      
      {/* Left Foot */}
      <mesh position={[-0.7, -1.9, 0.5]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial {...accentMaterial} />
      </mesh>
      
      {/* Right Foot */}
      <mesh position={[0.7, -1.9, 0.5]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial {...accentMaterial} />
      </mesh>
      
      {/* Left Hand */}
      <mesh position={[-1.7, 0.1, 0.5]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial {...accentMaterial} />
      </mesh>
      
      {/* Right Hand */}
      <mesh position={[1.7, 0.1, 0.5]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial {...accentMaterial} />
      </mesh>
      
      {/* Tummy patch */}
      <mesh position={[0, 0.1, 0.8]} scale={[0.8, 1.2, 0.5]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial {...accentMaterial} />
      </mesh>
      
      {/* Interaction button (hidden visually but provides interactivity) */}
      <mesh position={[0, 0, 2]} visible={false} scale={3}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
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
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <spotLight position={[0, 5, 5]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          
          <TeddyModel setIsListening={setIsListening} isListening={isListening} />
          
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
