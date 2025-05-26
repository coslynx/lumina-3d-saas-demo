import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {motion} from "framer-motion";
import * as THREE from 'three';

import {useTheme} from '../hooks/useTheme';
import {three3DHelpersUtil} from '../utils/three-helpers';

import '../styles/layout/footer.css';

export interface FooterProps {
    /** ClassName for styling */
    className?: string;
}

const Footer: React.FC<FooterProps> = ({className = ''}) => {
    const {isDarkMode} = useTheme();
    const [disclaimers, setDisclaimers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const sphereRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        // Simulate loading disclaimers from an API or file
        setTimeout(() => {
            setDisclaimers([
                "© 2024 Lumina SaaS. All rights reserved.",
                "Terms of Service",
                "Privacy Policy"
            ]);
            setLoading(false);
        }, 1500);

        return () => {
            // Make sure to cleanup 3D objects properly
        };
    }, []);

    return (
        <footer className={`bg-white dark:bg-gray-800 shadow-md ${className}`}>
            <div className="relative overflow-hidden">
                <Canvas
                    className="footer-canvas absolute inset-0"
                    dpr={[1, 2]}
                    camera={{position: [0, 0, 5], fov: 75}}
                    style={{height: '100px', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0}}
                >
                    <ambientLight intensity={0.3}/>
                    <directionalLight position={[2, 5, 2]} intensity={0.5}/>
                    <motion.mesh
                        ref={sphereRef}
                        initial={{rotation: {x: 0, y: 0, z: 0}}}
                        animate={{rotation: {x: 0.3, y: 0.3, z: 0}}}
                        transition={{duration: 4, repeat: Infinity, repeatType: 'mirror'}}
                    >
                        <sphereGeometry args={[1, 32, 32]}/>
                        <motion.meshStandardMaterial
                            color={isDarkMode ? '#3b82f6' : '#2563eb'}
                            transparent opacity={0.6}/>
                    </motion.mesh>
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false}/>
                </Canvas>

                <div className="container mx-auto py-4 px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
                    <p className="text-gray-500 dark:text-gray-300 text-sm">
                        {loading ? "Loading disclaimers..." : disclaimers[0]}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        {!loading && disclaimers.slice(1).map((disclaimer, index) => (
                            <Link
                                key={index}
                                to={`/${disclaimer.toLowerCase().replace(' ', '-')}`}
                                className="text-gray-500 dark:text-gray-300 text-sm hover:text-blue-400"
                            >
                                {disclaimer}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;