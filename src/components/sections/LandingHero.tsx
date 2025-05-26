import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Html, Bloom } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { useTheme } from '../hooks/useTheme';
import { use3DAnimation } from '../hooks/use3DAnimation';
import { three3DHelpersUtil } from '../utils/three-helpers';
import { LandingHeroProps } from '../types';

import '../styles/components/landing-hero.css';

/**
 * @component
 * @example
 * <LandingHero />
 */
const LandingHero: React.FC<LandingHeroProps> = ({ className = '' }) => {
  const { isDarkMode, colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const groupRef = useRef<THREE.Group>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const modelPath = '/models/scene.glb'; // Fixed model path
  const headline = "Unleash the Power of 3D Design"; // Fixed headline
  const subheadline = "Collaborate, Visualize, and Iterate in Real-Time"; // Fixed subheadline
  const { nodes, materials, animations }: any = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && actions['Animation']) {
      const animationAction = actions['Animation'];
      animationAction.play();
      animationAction.setLoop(THREE.LoopRepeat, Infinity);
    }
    setLoading(false);
  }, [actions, mixer]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Code for animation is put here
  });

  return (
    <section className={`relative h-screen w-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="hero-canvas"
        style={{ background: isDarkMode ? '#1e293b' : '#ffffff' }}
        aria-label="3D product showcase"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        {nodes && (
          <group ref={groupRef} dispose={null}>
            <scene name="Scene">
              <mesh
                name="Cube"
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials.Material}
                position={[0,0,0]}
              />
            </scene>
            
          </group>
        )}
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} />
      </Canvas>
      <motion.div
        ref={textContainerRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{headline}</h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mt-4">{subheadline}</p>
      </motion.div>
    </section>
  );
};

export default LandingHero;