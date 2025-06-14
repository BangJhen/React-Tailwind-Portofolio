import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text } from '@react-three/drei';

// A colorful particle system
function ParticleSystem() {
  const particles = useRef();
  const count = 1000;
  
  // Create positions and colors for particles
  const [positions, colors] = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position in a sphere
      const radius = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random colors with blue/purple bias
      colors[i * 3] = 0.5 + Math.random() * 0.5; // R
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.5; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }
    
    return [positions, colors];
  }, [count]);
  
  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.y += 0.001;
      particles.current.rotation.x += 0.0005;
    }
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// A floating 3D model
function Model(props) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Rotate the model every frame
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.5;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float
      speed={1.5} // Animation speed
      rotationIntensity={0.5} // Rotation intensity
      floatIntensity={0.5} // Float intensity
    >
      <mesh
        {...props}
        ref={mesh}
        scale={hovered ? 1.6 : 1.5}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#8b5cf6" : "#6366f1"}
          roughness={0.3}
          metalness={0.8}
          emissive={hovered ? "#7c3aed" : "#4338ca"}
          emissiveIntensity={hovered ? 0.4 : 0.2}
        />
      </mesh>
    </Float>
  );
}

// Orbiting spheres
function OrbitingSpheres() {
  const group = useRef();
  
  const spheres = [
    { radius: 3, speed: 0.5, size: 0.3, color: "#ec4899", offset: 0 },
    { radius: 4, speed: 0.3, size: 0.4, color: "#8b5cf6", offset: Math.PI / 2 },
    { radius: 5, speed: 0.2, size: 0.5, color: "#3b82f6", offset: Math.PI },
    { radius: 6, speed: 0.1, size: 0.6, color: "#10b981", offset: Math.PI * 1.5 }
  ];
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group ref={group}>
      {spheres.map((sphere, index) => (
        <Sphere key={index} {...sphere} />
      ))}
    </group>
  );
}

function Sphere({ radius, speed, size, color, offset }) {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = radius * Math.cos(t);
    ref.current.position.z = radius * Math.sin(t);
    ref.current.position.y = Math.sin(t * 2) * 0.5;
  });
  
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.4} 
        metalness={0.6} 
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Main component that wraps the 3D scene
const ThreeScene = ({ className }) => {
  return (
    <div className={`${className || ''} w-full h-full`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Model position={[0, 0, 0]} />
        <OrbitingSpheres />
        <ParticleSystem />
        <Environment preset="city" />
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;