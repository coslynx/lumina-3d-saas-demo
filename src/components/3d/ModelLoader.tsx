import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

import { ModelLoaderProps } from '../types';
import { modelManager } from '../utils/modelManager';
import '../styles/components/model-loader.css';

const ModelLoader: React.FC<ModelLoaderProps> = ({ url, fallback = null }) => {
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { scene } = useThree();
  const gltf = useRef<THREE.Group>();

  useEffect(() => {
    let isMounted = true; // Track component mount status

    const loadModelAsync = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if model is cached
        const cachedModel = modelManager.getModel(url);

        if (cachedModel) {
          if (isMounted) {
            setModel(cachedModel);
            setLoading(false);
          }
          return;
        }

        // Load model using ModelManager
        const loadedModel = await modelManager.loadModel(url);

        if (isMounted) {
          setModel(loadedModel);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    };

    loadModelAsync();

    return () => {
      isMounted = false; // Set mount status to false on unmount
      if(gltf.current){
        modelManager.disposeModel(url)
      }
    };
  }, [url]);

  if (loading) {
    return (
      <div className="model-loader-container">
        <p>Loading 3D model...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="model-loader-container">
        <p>Error loading 3D model: {error.message}</p>
        {fallback}
      </div>
    );
  }

  return model ? <primitive object={model} /> : null;
};

export default ModelLoader;