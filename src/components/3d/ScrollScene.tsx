import React, { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll, useTransform } from '@react-three/drei';
import { motion, useMotionValue } from 'framer-motion';

import { use3DAnimation } from '../hooks/use3DAnimation';
import { three3DHelpersUtil } from '../utils/three-helpers';
import type { ThreeDComponentProps } from '../types';
import { useTheme } from '../hooks/useTheme';
import '../styles/components/scroll-scene.css';

export interface ScrollSceneProps extends ThreeDComponentProps {
  start: number;
  end: number;
  map: (scrollProgress: number) => { [key: string]: any };
  children?: React.ReactNode;
}

/**
 * @component
 * @description A component that links scroll position to 3D scene properties, creating a parallax effect or triggering animations as the user scrolls.
 * @example
 * <ScrollScene start={0} end={1} map={(y) => ({ position: [0, y * 5, 0] })}>
 *   <mesh>
 *     <boxGeometry />
 *     <meshStandardMaterial color="red" />
 *   </mesh>
 * </ScrollScene>
 */
export const ScrollScene: React.FC<ScrollSceneProps> = ({
  start,
  end,
  map,
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  className = '',
  style,
  ...props
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, camera } = useThree();
  const { scrollYProgress } = useScroll();
  const { isDarkMode } = useTheme();

  const mappedValues = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: false });

  useFrame(() => {
    if (!groupRef.current) return;

    const scrollProgress = mappedValues.get();
    const values = map(scrollProgress);

    // Apply transformations
    if (values.position) {
      groupRef.current.position.set(values.position[0] || 0, values.position[1] || 0, values.position[2] || 0);
    }
    if (values.rotation) {
      groupRef.current.rotation.set(values.rotation[0] || 0, values.rotation[1] || 0, values.rotation[2] || 0);
    }
    if (values.scale) {
      groupRef.current.scale.set(values.scale[0] || 1, values.scale[1] || 1, values.scale[2] || 1);
    }
    // Add additional transformations and material properties mapping as needed
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </group>
  );
};