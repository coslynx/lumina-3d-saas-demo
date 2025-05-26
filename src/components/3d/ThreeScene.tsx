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
import gsap from 'gsap';
import { useTheme } from '../hooks/useTheme';
import { use3DAnimation } from '../hooks/use3DAnimation';
import { use3DInteraction } from '../hooks/use3DInteraction';
import { three3DHelpersUtil } from '../utils/three-helpers';
import type { ThreeDComponentProps } from '../types';

export interface ThreeSceneProps extends ThreeDComponentProps {
  cameraPosition?: [number, number, number];
  fieldOfView?: number;
  nearPlane?: number;
  farPlane?: number;
  backgroundColor?: string;
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
  intensity?: number;
}

const ThreeScene = forwardRef<THREE.Group, ThreeSceneProps>(
  (
    {
      cameraPosition = [0, 0, 5],
      fieldOfView = 75,
      nearPlane = 0.1,
      farPlane = 1000,
      backgroundColor,
      fogColor,
      fogNear = 10,
      fogFar = 20,
	  intensity = 0.5,
      children,
      ...props
    },
    ref
  ) => {
    const { scene, camera, gl } = useThree();
    const { isDarkMode } = useTheme();
    const groupRef = useRef<THREE.Group>(null);

    useImperativeHandle(ref, () => groupRef.current as THREE.Group, []);

    // Define theme-aware default colors
    const defaultBackgroundColor = useMemo(() => (isDarkMode ? '#1e293b' : '#ffffff'), [isDarkMode]);
    const defaultFogColor = useMemo(() => (isDarkMode ? '#1e293b' : '#ffffff'), [isDarkMode]);

    useEffect(() => {
      // Set up camera
      camera.position.set(...cameraPosition);
	  camera.fov = fieldOfView;
	  camera.near = nearPlane;
	  camera.far = farPlane;
	  camera.updateProjectionMatrix();
    }, [camera, cameraPosition, fieldOfView, nearPlane, farPlane]);

    useEffect(() => {
      // Set up fog
      scene.fog = new THREE.Fog(
        fogColor || defaultFogColor,
        fogNear,
        fogFar
      );

      // Set background color
      gl.setClearColor(new THREE.Color(backgroundColor || defaultBackgroundColor));
    }, [scene, gl, backgroundColor, defaultBackgroundColor, fogColor, fogNear, fogFar, defaultFogColor]);

	useEffect(() => {
		gl.toneMappingExposure = intensity;
		gl.outputEncoding = THREE.sRGBEncoding;
	}, [gl, intensity]);

    useEffect(() => {
      // Clean up Three.js resources on unmount
      return () => {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => {
                  three3DHelpersUtil.disposeMaterial(material);
                });
              } else {
                three3DHelpersUtil.disposeMaterial(object.material);
              }
            }
          }
        });
      };
    }, [scene]);

    useFrame(() => {
      // Animate or update something every frame
    });

    return (
      <group ref={groupRef} {...props}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 5, 2]} intensity={0.5} />
        {children}
      </group>
    );
  }
);

ThreeScene.displayName = 'ThreeScene';

export default ThreeScene;