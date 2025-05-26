import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

import { ModelLoader } from '../components/3d/ModelLoader';
import '../styles/pages/model-showcase.css';
import { getSampleModelURL, createSampleScene } from '../utils/sampleModelHelper';
import MinimalLayout from '../components/layout/MinimalLayout';

interface ModelShowcasePageProps {}

const ModelShowcasePage: React.FC<ModelShowcasePageProps> = () => {
  const [modelUrl, setModelUrl] = useState<string>(getSampleModelURL());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const sceneRef = useRef<THREE.Scene>(null);

  const handleModelSelect = useCallback((newModelUrl: string) => {
    setModelUrl(newModelUrl);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [modelUrl]);

  return (
    <MinimalLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">3D Model Showcase</h1>

        <div className="mb-4 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => handleModelSelect(getSampleModelURL())}
            aria-label="Load Sample Model"
          >
            Load Sample Model
          </button>
        </div>

        <div className="canvas-container relative">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="model-canvas"
            aria-label="3D Model Viewer"
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <ModelLoader
              url={modelUrl}
              fallback={
                <mesh>
                  <boxGeometry />
                  <meshBasicMaterial color="red" />
                </mesh>
              }
            />
            <OrbitControls enableZoom enablePan enableRotate />
          </Canvas>
        </div>

        {error && (
          <div className="error-message text-red-500 mt-4">
            Error loading 3D model: {error.message}
          </div>
        )}
      </div>
    </MinimalLayout>
  );
};

export default ModelShowcasePage;