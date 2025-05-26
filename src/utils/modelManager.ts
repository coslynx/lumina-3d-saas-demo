import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/**
 * Manages the loading, caching, and disposal of 3D models to improve performance and reduce memory usage.
 */
class ModelManager {
  private cache: Map<string, THREE.Group> = new Map();
  private dracoLoader: DRACOLoader;
  private gltfLoader: GLTFLoader;

  constructor() {
    THREE.Cache.enabled = true;
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/');

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  /**
   * Loads a 3D model from the given URL, using the cache if available, and applies DRACO compression if supported.
   *
   * @param url - The URL of the 3D model to load.
   * @param onProgress - Optional callback to track the loading progress.
   * @returns A promise that resolves with the loaded THREE.Group model.
   * @throws An error if the model fails to load.
   */
  public async loadModel(url: string, onProgress?: (progress: number) => void): Promise<THREE.Group> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!.clone();
    }

    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          this.applyDefaultMaterials(model)
          this.cache.set(url, model);
          resolve(model);
        },
        (xhr) => {
          if (onProgress) {
            const progress = (xhr.loaded / xhr.total) * 100;
            onProgress(progress);
          }
        },
        (error) => {
          console.error('An error happened while loading the model:', error);
          reject(error);
        }
      );
    });
  }
  
    /**
     * Applies a default MeshStandardMaterial to all meshes in the provided 3D model if they don't already have a material assigned.
     *
     * @param model - The root `THREE.Group` of the 3D model to process.
     * @jsdoc
     */
    private applyDefaultMaterials = (model: THREE.Group): void => {
        model.traverse((child) => {
            if (child instanceof THREE.Mesh && !child.material) {
                child.material = new THREE.MeshStandardMaterial({color: 0x808080}); // Gray color
            }
        });
    };

  /**
   * Retrieves a cached model from memory.
   *
   * @param url - The URL of the model to retrieve.
   * @returns The cached THREE.Group model, or undefined if not found.
   */
  public getModel(url: string): THREE.Group | undefined {
    return this.cache.get(url)?.clone();
  }

  /**
   * Disposes of a loaded model and its resources to free up memory.
   *
   * @param url - The URL of the model to dispose of.
   */
  public disposeModel(url: string): void {
    const model = this.cache.get(url);

    if (model) {
      model.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry.dispose();

          if (child.material.isMaterial) {
            this.disposeMaterial(child.material);
          } else if (Array.isArray(child.material)) {
            child.material.forEach((material: THREE.Material) => {
              this.disposeMaterial(material);
            });
          }
        }
      });

      this.cache.delete(url);
    }
  }

  /**
   * Disposes of a material and its textures to free up memory.
   *
   * @param material - The THREE.Material to dispose of.
   */
  private disposeMaterial(material: THREE.Material): void {
    if (material.map) material.map.dispose();
    if (material.lightMap) material.lightMap.dispose();
    if (material.bumpMap) material.bumpMap.dispose();
    if (material.normalMap) material.normalMap.dispose();
    if (material.specularMap) material.specularMap.dispose();
    if (material.envMap) material.envMap.dispose();

    material.dispose();
  }
}

export const modelManager = new ModelManager();