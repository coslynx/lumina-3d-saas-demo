import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import * as THREE from 'three';
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';
import {
  OrbitControls,
  useHelper,
  Environment,
} from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing';
import { RenderPixelatedPass } from '@react-three/postprocessing';
import gsap from 'gsap';
import { useTheme } from '../hooks/useTheme';
import { use3DAnimation } from '../hooks/use3DAnimation';
import { use3DInteraction } from '../hooks/use3DInteraction';
import { three3DHelpersUtil } from '../utils/three-helpers';
import type { ThreeDComponentProps } from '../types';
import ModelLoader from './ModelLoader';

export interface AdvancedSceneProps extends ThreeDComponentProps {
  environmentMap?: string;
  cameraPosition?: [number, number, number];
  contactShadows?: boolean;
  intensity?: number;
}

const AdvancedScene = forwardRef<THREE.Group, AdvancedSceneProps>(
  ({
    environmentMap,
    cameraPosition = [0, 0, 5],
    contactShadows = false,
    intensity = 1,
    ...props
  }, ref) => {
    const { scene, camera, gl } = useThree();
    const { isDarkMode } = useTheme();
    const groupRef = useRef<THREE.Group>(null);
    const pointLightRef = useRef<THREE.PointLight>(null);
    const directionalLightRef = useRef<THREE.DirectionalLight>(null);

    useImperativeHandle(ref, () => groupRef.current as THREE.Group, []);

    // Environment setup
    useEffect(() => {
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();

      return () => {
        pmremGenerator.dispose();
      };
    }, [gl]);

    useEffect(() => {
      camera.position.set(...cameraPosition);
    }, [camera, cameraPosition]);

    useFrame(() => {
      // Animate or update something every frame
    });

    return (
      <group ref={groupRef} {...props}>
        <ambientLight intensity={0.3} />
        <directionalLight
          ref={directionalLightRef}
          position={[5, 5, 5]}
          intensity={0.5}
        />
        <pointLight
          ref={pointLightRef}
          position={[-5, 5, -5]}
          intensity={0.5}
        />
        <ModelLoader modelPath="/models/scene.glb" />
        <OrbitControls />
        <EffectComposer>
          <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} intensity={0.8} />
        </EffectComposer>
      </group>
    );
  }
);

AdvancedScene.displayName = 'AdvancedScene';

export default AdvancedScene;