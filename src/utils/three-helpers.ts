import * as THREE from 'three';

/**
 * Type definition for Three.js interaction event.
 */
export type ThreeEvent<T> = THREE.Event & {
    clientX: number;
    clientY: number;
    intersections: THREE.Intersection<T>[];
    object: THREE.Object3D<THREE.Event>;
    eventObject: THREE.Object3D<THREE.Event>;
    [attachment: string]: any;
};

/**
 * Creates a basic cube mesh with customizable size and color.
 *
 * @param size - The size of the cube (default: 1).
 * @param color - The color of the cube (default: 0xffffff - white).
 * @returns A Three.js mesh representing the cube.
 */
export const createCube = (size: number = 1, color: string = '#ffffff'): THREE.Mesh => {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color });
    return new THREE.Mesh(geometry, material);
};

/**
 * Creates a basic sphere mesh with customizable radius, widthSegments, heightSegments and color.
 *
 * @param radius - The radius of the sphere (default: 1).
 * @param widthSegments - The number of horizontal segments (default: 32).
 * @param heightSegments - The number of vertical segments (default: 32).
 * @param color - The color of the sphere (default: 0xffffff - white).
 * @returns A Three.js mesh representing the sphere.
 */
export const createSphere = (radius: number = 1, widthSegments: number = 32, heightSegments: number = 32, color: string = '#ffffff'): THREE.Mesh => {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshStandardMaterial({ color });
    return new THREE.Mesh(geometry, material);
};

/**
 * Creates a basic plane mesh with customizable width, height and color.
 *
 * @param width - The width of the plane (default: 1).
 * @param height - The height of the plane (default: 1).
 * @param color - The color of the plane (default: 0xffffff - white).
 * @returns A Three.js mesh representing the plane.
 */
export const createPlane = (width: number = 1, height: number = 1, color: string = '#ffffff'): THREE.Mesh => {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
};

/**
 * Creates a MeshStandardMaterial with the specified properties.
 * @param options - Material properties.
 * @returns A MeshStandardMaterial with pre-configured options.
 */
export const createStandardMaterial = (options: THREE.MeshStandardMaterialParameters): THREE.MeshStandardMaterial => {
    return new THREE.MeshStandardMaterial(options);
};

/**
 * Creates a MeshPhysicalMaterial with the specified properties.
 * @param options - Material properties.
 * @returns A MeshPhysicalMaterial with pre-configured options.
 */
export const createPhysicalMaterial = (options: THREE.MeshPhysicalMaterialParameters): THREE.MeshPhysicalMaterial => {
    return new THREE.MeshPhysicalMaterial(options);
};

/**
 * Recursively disposes of the geometry, material, and textures of a Three.js object to prevent memory leaks.
 * This function carefully checks for the existence of properties and their `dispose` methods before calling them.
 *
 * @param object - The Three.js object (e.g., Mesh, Group) to dispose of.
 */
export const disposeObject = (object: THREE.Object3D): void => {
    if (!object) return;

    object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            if (child.geometry) {
                child.geometry.dispose();
            }

            if (child.material) {
                const disposeMaterial = (material: THREE.Material) => {
                    if (material.map) material.map.dispose();
                    if (material.lightMap) material.lightMap.dispose();
                    if (material.bumpMap) material.bumpMap.dispose();
                    if (material.normalMap) material.normalMap.dispose();
                    if (material.specularMap) material.specularMap.dispose();
                    if (material.envMap) material.envMap.dispose();

                    material.dispose();
                };

                if (Array.isArray(child.material)) {
                    child.material.forEach(disposeMaterial);
                } else {
                    disposeMaterial(child.material);
                }
            }
        }
    });
};

/**
 * Sets the background of the scene
 * @param scene The THREE.Scene where the fog will be applied
 * @param color The color of the background
 */
export const setSceneBackground = (scene: THREE.Scene, color: THREE.ColorRepresentation): void => {
    scene.background = new THREE.Color(color);
};

/**
 * Applies fog to the provided Three.js scene
 * @param scene The THREE.Scene where the fog will be applied
 * @param color The color of the fog
 * @param near The near value of the fog
 * @param far The far value of the fog
 */
export const setSceneFog = (scene: THREE.Scene, color: THREE.ColorRepresentation, near: number, far: number): void => {
    scene.fog = new THREE.Fog(color, near, far);
}

/**
 * Configures renderer pixel ratio, used for optimizing scenes
 * @param renderer The THREE.WebGLRenderer
 * @param pixelRatio The device's pixel ratio
 */
export const setRendererPixelRatio = (renderer: THREE.WebGLRenderer, pixelRatio: number): void => {
    renderer.setPixelRatio(pixelRatio);
}

/**
 * Configures shadow settings for the 3D Scene
 * @param renderer The THREE.WebGLRenderer
 */
export const setRendererShadows = (renderer: THREE.WebGLRenderer) => {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

/**
 * Applies all passed in settings to a 3D scene.
 * @param scene The Three.js scene object.
 * @param color The color of the background.
 * @param near The near value of the fog.
 * @param far The far value of the fog.
 */
export const configureScene = (scene: THREE.Scene, color: THREE.ColorRepresentation, near: number, far: number): void => {
    setSceneBackground(scene, color);
    setSceneFog(scene, color, near, far);
};

/**
 * A utility function to set the scale of an object, all axis at once
 * @param object Three object to manipulate
 * @param value number to set the x,y and z for the object
 */
export const setScale = (object: THREE.Object3D, value: number) => {
    object.scale.set(value, value, value);
};

/**
 *  A function used to manage lighting of a 3D enviroment, applying settings to a provided directional light.
 * @param light THREE.DirectionalLight - Target Light that will be modified.
 * @param intensity number to modify brightness.
 * @param x number for X coordenate.
 * @param y number for Y coordenate.
 * @param z number for Z coordenate.
 */
export const configureDirectionalLight = (light: THREE.DirectionalLight, intensity: number, x: number, y: number, z: number) => {
    light.intensity = intensity
    light.position.set(x,y,z)
}

/**
 *  A function used to manage lighting of a 3D enviroment, applying settings to a provided point light.
 * @param light THREE.PointLight - Target Light that will be modified.
 * @param intensity number to modify brightness.
 * @param x number for X coordenate.
 * @param y number for Y coordenate.
 * @param z number for Z coordenate.
 * @param distance number to modify the range where the light emits.
 */
export const configurePointLight = (light: THREE.PointLight, intensity: number, x: number, y: number, z: number, distance: number) => {
    light.intensity = intensity;
    light.distance = distance;
    light.position.set(x,y,z)
}

/**
 * Helper const to define lighting that makes sense, for a three scene
 *//*
 export const LightingConfigurations = {
  Default: (scene:THREE.Scene) => {
        const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
  },
  HighContrast: (scene:THREE.Scene, isDarkMode: boolean) => {
        const ambientLight = new THREE.AmbientLight(isDarkMode ? 0x222222 : 0xffffff);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(isDarkMode ? 0xffffff : 0x222222, 0.7);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
  }
 }
 
 /**
 * Helper function to set basic properties of a material based on the theme.
 * @param material The material that needs to be configurated.
 * @param isDarkMode A boolean indicating the color for object.
 */
 export const applyThemeToMaterial = (material: THREE.Material, isDarkMode: boolean) => {
    if (material instanceof THREE.MeshStandardMaterial) {
        material.roughness = 0.7;
        material.metalness = isDarkMode ? 0.1 : 0.3;
        material.color.set(isDarkMode ? '#90a4ae' : '#ffffff');
    }
 };