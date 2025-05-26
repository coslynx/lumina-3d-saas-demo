import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/**
 * Array of sample GLTF model URLs.
 * @private
 * @constant
 */
const sampleModelURLs = [
  '/models/scene.glb',
  '/models/gltf/CesiumMan/CesiumMan.gltf',
  '/models/gltf/Duck/Duck.gltf',
  '/models/gltf/Lantern/Lantern.gltf'
];

let currentModelIndex = 0;

/**
 * Returns a URL for a sample 3D model, cycling through the available URLs in a round-robin fashion.
 *
 * @returns The URL of the next sample 3D model in the sequence.
 * @jsdoc
 */
export const getSampleModelURL = (): string => {
  const url = sampleModelURLs[currentModelIndex];
  currentModelIndex = (currentModelIndex + 1) % sampleModelURLs.length;
  return url;
};

/**
 * Creates a basic Three.js scene with an ambient light, a directional light, and a 3D model loaded from the provided URL.
 * If model loading fails, an empty scene is returned, and the error is logged.
 *
 * @param modelURL - The URL of the 3D model to load.
 * @returns A Three.js scene containing the loaded model, or an empty scene if loading fails.
 * @jsdoc
 */
export const createSampleScene = (modelURL: string): THREE.Scene => {
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x404040)); // soft white light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);
  THREE.Cache.enabled = true;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/'); // Specify the path to the DRACO decoder files
  //dracoLoader.setDecoderConfig({type: 'js'}); //Draco Loader Configuration

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  try {
    loader.load(
      modelURL,
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the model:', error);
      }
    );
  } catch (error) {
    console.error('Error loading model:', error);
    return new THREE.Scene();
  }

  return scene;
};

/**
 * Applies a default MeshStandardMaterial to all meshes in the provided 3D model if they don't already have a material assigned.
 *
 * @param model - The root `THREE.Group` of the 3D model to process.
 * @jsdoc
 */
export const applyDefaultMaterials = (model: THREE.Group): void => {
  model.traverse((child) => {
    if (child instanceof THREE.Mesh && !child.material) {
      child.material = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Gray color
    }
  });
};