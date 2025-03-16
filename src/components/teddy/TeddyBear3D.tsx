
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Preload, useTexture } from '@react-three/drei';
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

  // Create textures
  const mainFurTexture = new THREE.TextureLoader().load('/fur-texture.png');
  mainFurTexture.wrapS = THREE.RepeatWrapping;
  mainFurTexture.wrapT = THREE.RepeatWrapping;
  mainFurTexture.repeat.set(5, 5);

  // Create heart shape for the teddy's chest
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, 0.5, 0.5, 0.5, 0.5, 0);
  heartShape.bezierCurveTo(0.5, -0.5, 0, -0.5, 0, 0);
  
  const extrudeSettings = {
    steps: 2,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 3
  };

  // More realistic teddy bear model with improved textures and details
  return (
    <group 
      ref={group} 
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, -1, 0]}
      scale={isListening ? 1.02 : 1}
    >
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial 
          color="#B5835A" 
          roughness={0.9} 
          metalness={0.1}
          map={mainFurTexture}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial 
          color="#B5835A" 
          roughness={0.9} 
          metalness={0.1}
          map={mainFurTexture}
        />
      </mesh>
      
      {/* Muzzle */}
      <mesh position={[0, 1.5, 0.9]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#DEBA9D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Left Ear */}
      <mesh position={[-0.9, 2.7, 0]} rotation={[0, 0, -0.2]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial 
          color="#B5835A" 
          roughness={0.9} 
          metalness={0.1}
          map={mainFurTexture}
        />
      </mesh>
      
      {/* Right Ear */}
      <mesh position={[0.9, 2.7, 0]} rotation={[0, 0, 0.2]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial 
          color="#B5835A" 
          roughness={0.9} 
          metalness={0.1}
          map={mainFurTexture}
        />
      </mesh>
      
      {/* Inner Left Ear */}
      <mesh position={[-0.85, 2.7, 0.1]} rotation={[0.3, 0, -0.2]} scale={[0.8, 0.8, 0.1]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#DEBA9D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Inner Right Ear */}
      <mesh position={[0.85, 2.7, 0.1]} rotation={[0.3, 0, 0.2]} scale={[0.8, 0.8, 0.1]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#DEBA9D" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-1.45, 0.3, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
        <meshStandardMaterial 
          color="#B5835A" 
          roughness={0.9} 
          metalness={0.1}
          map={mainFurTexture}
        />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[1.45, 0.3, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
        <meshStandardMaterial 
          color="#B5835A" 
          roughness={0.9} 
          metalness={0.1}
          map={mainFurTexture}
        />
      </mesh>
      
      {/* Left Hand */}
      <mesh position={[-1.9, -0.1, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#DEBA9D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Right Hand */}
      <mesh position={[1.9, -0.1, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#DEBA9D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-0.7, -1.3, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.3, 0.3, 1.0, 32]} />
        <meshStandardMaterial 
          color="#B5835A" 
          roughness={0.9} 
          metalness={0.1}
          map={mainFurTexture}
        />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0.7, -1.3, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.3, 0.3, 1.0, 32]} />
        <meshStandardMaterial 
          color="#B5835A" 
          roughness={0.9} 
          metalness={0.1}
          map={mainFurTexture}
        />
      </mesh>
      
      {/* Left Foot */}
      <mesh position={[-0.75, -1.9, 0.2]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#DEBA9D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Right Foot */}
      <mesh position={[0.75, -1.9, 0.2]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#DEBA9D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Tummy */}
      <mesh position={[0, 0.2, 0.75]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color="#DEBA9D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Eyes - glossy and cute */}
      <mesh position={[-0.4, 1.8, 1]} scale={[1, 1.2, 1]}>
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      </mesh>
      
      <mesh position={[0.4, 1.8, 1]} scale={[1, 1.2, 1]}>
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Eye shine - to give a cute look */}
      <mesh position={[-0.35, 1.85, 1.12]}>
        <sphereGeometry args={[0.04, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
      </mesh>
      
      <mesh position={[0.45, 1.85, 1.12]}>
        <sphereGeometry args={[0.04, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Nose - black and cute */}
      <mesh position={[0, 1.5, 1.35]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.3} />
      </mesh>
      
      {/* Mouth - cute smile */}
      <mesh position={[0, 1.2, 1.2]} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 16, Math.PI]} />
        <meshStandardMaterial color="#7D5A4A" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Interactive button - glows when activated */}
      <mesh position={[0, 0.5, 1.4]} scale={isListening ? 1.2 : hovered ? 1.1 : 1}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color={isListening ? "#FF6B6B" : hovered ? "#FFA5A5" : "#FFC3C3"} 
          roughness={0.3} 
          metalness={0.7} 
          emissive={isListening ? "#FF6B6B" : hovered ? "#FFA5A5" : "#000000"}
          emissiveIntensity={isListening ? 0.5 : hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Small heart patch on chest - using proper React Three Fiber syntax */}
      <mesh position={[0, 0.8, 1.15]} rotation={[0.3, 0, 0]} scale={0.9}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial color="#FF8882" roughness={0.7} metalness={0.2} />
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
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <spotLight position={[0, 5, 5]} intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          
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
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default TeddyBear3D;
