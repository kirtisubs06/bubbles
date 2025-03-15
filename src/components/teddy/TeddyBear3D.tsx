
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
import { Mesh, Group, Vector3, MeshStandardMaterial } from 'three';
import { motion } from 'framer-motion-3d';
import { useInView } from 'framer-motion';

// Helper component for the 3D teddy bear model
const TeddyModel = ({ 
  setIsListening, 
  isListening 
}: { 
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  isListening: boolean
}) => {
  const group = useRef<Group>(null);
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

  // We're creating a simple teddy bear shape with primitives since we don't have an actual model
  return (
    <group 
      ref={group} 
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <motion.group
          animate={isListening ? {
            y: [0, 0.1, 0],
            scale: [1, 1.02, 1],
            transition: { 
              repeat: Infinity,
              duration: 0.8
            }
          } : {}}
        >
          {/* Body */}
          <mesh position={[0, -0.2, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial color="#FF8882" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Head */}
          <mesh position={[0, 1.3, 0]}>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial color="#FF8882" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Muzzle */}
          <mesh position={[0, 1.1, 0.6]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#FEC89A" roughness={0.7} metalness={0.1} />
          </mesh>
          
          {/* Ears */}
          <mesh position={[-0.7, 2, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#FF8882" roughness={0.8} metalness={0.1} />
          </mesh>
          <mesh position={[0.7, 2, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#FF8882" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Inner Ears */}
          <mesh position={[-0.7, 2, 0.15]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#FEC89A" roughness={0.7} metalness={0.1} />
          </mesh>
          <mesh position={[0.7, 2, 0.15]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#FEC89A" roughness={0.7} metalness={0.1} />
          </mesh>
          
          {/* Arms */}
          <mesh position={[-1.2, 0, 0]} rotation={[0, 0, -0.5]}>
            <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
            <meshStandardMaterial color="#FF8882" roughness={0.8} metalness={0.1} />
          </mesh>
          <mesh position={[1.2, 0, 0]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
            <meshStandardMaterial color="#FF8882" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Legs */}
          <mesh position={[-0.5, -1.5, 0]} rotation={[0, 0, -0.2]}>
            <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
            <meshStandardMaterial color="#FF8882" roughness={0.8} metalness={0.1} />
          </mesh>
          <mesh position={[0.5, -1.5, 0]} rotation={[0, 0, 0.2]}>
            <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
            <meshStandardMaterial color="#FF8882" roughness={0.8} metalness={0.1} />
          </mesh>
          
          {/* Eyes */}
          <mesh position={[-0.3, 1.4, 0.7]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#2A2D34" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0.3, 1.4, 0.7]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#2A2D34" roughness={0.5} metalness={0.5} />
          </mesh>
          
          {/* Eye shine */}
          <mesh position={[-0.28, 1.42, 0.8]}>
            <sphereGeometry args={[0.03, 32, 32]} />
            <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
          </mesh>
          <mesh position={[0.32, 1.42, 0.8]}>
            <sphereGeometry args={[0.03, 32, 32]} />
            <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
          </mesh>
          
          {/* Nose */}
          <mesh position={[0, 1.1, 0.85]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="#2A2D34" roughness={0.5} metalness={0.2} />
          </mesh>
          
          {/* Belly patch */}
          <mesh position={[0, -0.2, 1]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#FEC89A" roughness={0.7} metalness={0.1} />
          </mesh>
          
          {/* Button/speaker */}
          <motion.mesh 
            position={[0, -0.2, 1.2]} 
            animate={{
              scale: isListening ? [1, 1.2, 1] : 1,
              transition: { 
                repeat: isListening ? Infinity : 0,
                duration: 0.8
              }
            }}
          >
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial 
              color={isListening ? "#A0D2EB" : hovered ? "#A2E1DB" : "#B8B5FF"} 
              roughness={0.3} 
              metalness={0.7} 
              emissive={isListening ? "#A0D2EB" : hovered ? "#A2E1DB" : "#000000"}
              emissiveIntensity={isListening ? 0.5 : hovered ? 0.2 : 0}
            />
          </motion.mesh>
        </motion.group>
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
