import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';
import * as THREE from 'three';
import {
  OrbitControls,
  useGLTF,
  useProgress,
  Environment,
  Html,
} from '@react-three/drei';
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing';
import { motion } from 'framer-motion';

import { useTheme } from '../hooks/useTheme';
import { use3DAnimation } from '../hooks/use3DAnimation';
import { use3DInteraction } from '../hooks/use3DInteraction';
import { three3DHelpersUtil } from '../utils/three-helpers';
import type { ThreeDComponentProps } from '../types';
import MinimalLayout from '../components/layout/MinimalLayout';
import ModelLoader from '../components/3d/ModelLoader';
import ScrollScene from '../components/3d/ScrollScene';
import AdvancedScene from '../components/3d/AdvancedScene';

const ExperiencePage = () => {
  const { isDarkMode } = useTheme();

  const section1Map = useCallback((scrollProgress: number) => ({
    position: [0, scrollProgress * 5, 0],
    rotation: [0, scrollProgress * Math.PI, 0],
  }), []);

  const section2Map = useCallback((scrollProgress: number) => ({
    scale: [1 + scrollProgress * 0.5, 1 + scrollProgress * 0.5, 1 + scrollProgress * 0.5],
  }), []);

  const section3Map = useCallback((scrollProgress: number) => ({
    rotation: [0, scrollProgress * Math.PI * 2, 0],
  }), []);

  return (
    <MinimalLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Immersive 3D Experience</h1>

        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: isDarkMode ? '#1e293b' : '#ffffff', height: '500px' }}
          aria-label="Interactive 3D environment"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1} />

          <ScrollScene start={0} end={0.3} map={section1Map}>
            <ModelLoader modelPath="/models/scene.glb" />
          </ScrollScene>

          <ScrollScene start={0.3} end={0.6} map={section2Map}>
            <mesh>
              <boxGeometry />
              <meshStandardMaterial color="blue" />
            </mesh>
          </ScrollScene>

          <ScrollScene start={0.6} end={1} map={section3Map}>
            <AdvancedScene />
          </ScrollScene>

          <OrbitControls enableZoom enablePan enableRotate />
          <EffectComposer>
            <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} intensity={0.8} />
          </EffectComposer>
        </Canvas>
      </div>
    </MinimalLayout>
  );
};

export default ExperiencePage;