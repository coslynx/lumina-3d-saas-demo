import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

/**
 * Defines the properties required for the `use3DInteraction` hook.
 */
interface Use3DInteractionProps {
  camera: THREE.Camera;
  scene: THREE.Scene;
  domElement: HTMLCanvasElement;
  onObjectClick?: (object: THREE.Object3D<THREE.Event>) => void;
  onObjectHover?: (object: THREE.Object3D<THREE.Event> | null) => void;
  onObjectDragStart?: (object: THREE.Object3D<THREE.Event>) => void;
  onObjectDrag?: (object: THREE.Object3D<THREE.Event>) => void;
  onObjectDragEnd?: (object: THREE.Object3D<THREE.Event>) => void;
}

/**
 * Defines the structure of the context value provided by the `use3DInteraction` hook.
 */
interface InteractionContextType {
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;
  intersected: THREE.Object3D<THREE.Event> | null;
  setIntersected: React.Dispatch<React.SetStateAction<THREE.Object3D<THREE.Event> | null>>;
}

/**
 * Provides utilities for raycasting and pointer management in 3D scenes.
 */
import { Vector2 } from 'three';

/**
 * Normalizes mouse coordinates for raycasting.
 *
 * @param event - Mouse event containing coordinates.
 * @param domElement - The DOM element the event is relative to.
 * @returns Normalized 2D vector representing the mouse position.
 */
const getPointerPosition = (event: MouseEvent, domElement: HTMLElement): Vector2 => {
  const rect = domElement.getBoundingClientRect();
  return new Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
};

/**
 * Performs raycasting to find intersecting objects.
 *
 * @param event - Mouse event.
 * @param camera - The scene camera.
 * @param scene - The Three.js scene.
 * @param raycaster - The raycaster instance.
 * @returns The first intersected object or null.
 */
const getIntersection = (
  event: MouseEvent,
  camera: THREE.Camera,
  scene: THREE.Scene,
  raycaster: THREE.Raycaster,
  domElement: HTMLElement
): THREE.Object3D<THREE.Event> | undefined => {
  const pointer = getPointerPosition(event, domElement);
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  return intersects.length > 0 ? intersects[0].object : undefined;
};

/**
 * Implements a custom React hook for managing user interactions with 3D objects in a Three.js scene.
 *
 * @param props - The properties for configuring the hook, including callbacks for various interaction events.
 * @returns An object containing the raycaster and pointer.
 */
const use3DInteraction = (props: Use3DInteractionProps): InteractionContextType => {
  const { camera, scene, domElement, onObjectClick, onObjectHover, onObjectDragStart, onObjectDrag, onObjectDragEnd } = props;

  const raycaster = useRef(new THREE.Raycaster()).current;
  const pointer = useRef(new THREE.Vector2()).current;
  const [intersected, setIntersected] = useState<THREE.Object3D<THREE.Event> | null>(null);

  const handlePointerMove = useCallback((event: MouseEvent) => {
    if (!domElement) return;
    pointer.x = ((event.clientX / domElement.offsetWidth) * 2) - 1;
    pointer.y = -((event.clientY / domElement.offsetHeight) * 2) + 1;
  }, [domElement, pointer]);

  const handleClick = useCallback((event: MouseEvent) => {
    if (!scene || !camera || !domElement) return;

    try {
      const intersectedObject = getIntersection(event, camera, scene, raycaster, domElement);

      if (intersectedObject && onObjectClick) {
        onObjectClick(intersectedObject);
      }
    } catch (error: any) {
      console.error('Error during click event:', error);
    }
  }, [camera, scene, raycaster, onObjectClick, domElement]);

  const handleTouch = useCallback((event: TouchEvent) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            const simulatedEvent = new MouseEvent("click", {
                clientX: touch.clientX,
                clientY: touch.clientY,
                bubbles: true,
                cancelable: true,
                view: window
            });
            domElement.dispatchEvent(simulatedEvent);
        }
    }, [domElement]);

  useEffect(() => {
    if (!domElement) return;

    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('click', handleClick);
    domElement.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('click', handleClick);
      domElement.removeEventListener('touchstart', handleTouch);
    };
  }, [domElement, handlePointerMove, handleClick, handleTouch]);

  useEffect(() => {
        if (!scene || !camera || !domElement) return;

        let hoverTimeoutId: NodeJS.Timeout;

        const checkIntersection = () => {
            try {
                const intersectedObject = getIntersection(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }), camera, scene, raycaster, domElement);

                if (intersectedObject) {
                    if (intersected !== intersectedObject) {
                        setIntersected(intersectedObject);
                        if (onObjectHover) {
                            onObjectHover(intersectedObject);
                        }
                    }
                } else {
                    if (intersected) {
                        setIntersected(null);
                        if (onObjectHover) {
                            onObjectHover(null);
                        }
                    }
                }

            } catch (error: any) {
                console.error('Error during hover event:', error);
            }
        };
        const performRaycast = () => {
            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                const object = intersects[0].object;
                if (object !== intersected) {
                    setIntersected(object);
                    if (onObjectHover) {
                        onObjectHover(object);
                    }
                }
            } else {
                if (intersected) {
                    setIntersected(null);
                    if (onObjectHover) {
                        onObjectHover(null);
                    }
                }
            }
        };

        const animationFrameCallback = () => {
            performRaycast()
        }
        const rafId = requestAnimationFrame(animationFrameCallback);

        return () => {
            cancelAnimationFrame(rafId)
        };
    }, [camera, scene, raycaster, onObjectHover, domElement, intersected, pointer]);

  return {
    raycaster,
    pointer,
    intersected,
    setIntersected
  };
};

export { use3DInteraction };