import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  useThree,
  useFrame
} from '@react-three/fiber';
import * as THREE from 'three';
import { useTransform } from '@react-three/drei';
import { useMotionValue } from 'framer-motion';

import { three3DHelpersUtil } from '../utils/three-helpers';
import { useTheme } from './useTheme';

import type { ThreeDComponentProps } from '../types';

export interface ScrollAnimationConfig {
  start: number;
  end: number;
  map: (scrollProgress: number) => AnimationValues;
}

export interface AnimationValues {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  [key: string]: any;
}

export interface UseScrollAnimationProps {
  config: ScrollAnimationConfig;
  elementRef?: React.RefObject<THREE.Group>;
}

export interface UseScrollAnimationResult {
  scrollY: number;
  scrollX: number;
  visible: boolean;
}

/**
 * Hook for connecting scroll position to animation values in a 3D scene.
 *
 * @param config - Configuration for the scroll animation.
 * @param elementRef - Optional ref to the 3D element being animated.
 * @returns An object containing the scrollY value and a visibility flag.
 */
export const useScrollAnimation = ({ config, elementRef }: UseScrollAnimationProps): UseScrollAnimationResult => {
  const { start, end, map } = config;
  const { camera } = useThree();
  const { scrollYProgress } = useThree() as any; // HOTFIX
  const { isDarkMode } = useTheme();

  const scrollY = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: false });
  const [visible, setVisible] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!elementRef) {
      console.warn('No elementRef provided to useScrollAnimation. IntersectionObserver will not function.');
      return;
    }

    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [elementRef, isDarkMode]);

  return {
    scrollY: scrollY.get(),
    scrollX: 0,
    visible,
  };
};