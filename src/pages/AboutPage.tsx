import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import MinimalLayout from '../components/layout/MinimalLayout';

interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = () => {
  const { isDarkMode } = useTheme();
  const sphereRef = useRef<THREE.Mesh>(null);

  return (
    <MinimalLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Our Company</h2>
          <p>
            Lumina SaaS is dedicated to revolutionizing how businesses interact with 3D technology.
            Our mission is to provide accessible, innovative, and visually stunning solutions that drive growth and improve customer engagement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <article className="bg-white dark:bg-gray-700 shadow-md rounded p-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 1"
                className="w-24 h-24 rounded-full mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold text-center">John Doe</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 text-center">CEO</p>
            </article>
            <article className="bg-white dark:bg-gray-700 shadow-md rounded p-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 2"
                className="w-24 h-24 rounded-full mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold text-center">Jane Smith</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 text-center">CTO</p>
            </article>
            <article className="bg-white dark:bg-gray-700 shadow-md rounded p-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 3"
                className="w-24 h-24 rounded-full mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold text-center">Peter Jones</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 text-center">Lead Designer</p>
            </article>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p>
            To empower businesses worldwide with innovative 3D solutions that enhance customer
            engagement, drive sales, and redefine the digital experience.
          </p>
        </section>

		<section className="relative h-64 w-full">
            {/* Add a description of the object for those unable to visualize it */}
            <p className="sr-only">A 3D animated sphere.</p>
                <Canvas
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    style={{
                        height: '100px',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
						pointerEvents: 'none',
                        background: isDarkMode ? '#1e293b' : '#ffffff'
                    }}
                    aria-label="3D animated sphere"
                >
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[2, 5, 2]} intensity={0.5} />
                    <motion.mesh
                        ref={sphereRef}
                        initial={{rotation: {x: 0, y: 0, z: 0}}}
                        animate={{rotation: {x: 0.3, y: 0.3, z: 0}}}
                        transition={{duration: 4, repeat: Infinity, repeatType: 'mirror'}}
                    >
                        <sphereGeometry args={[1, 32, 32]} />
                        <motion.meshStandardMaterial
                            color={isDarkMode ? '#3b82f6' : '#2563eb'}
                            transparent opacity={0.6}/>
                    </motion.mesh>
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false}/>
                </Canvas>
        </section>
      </div>
    </MinimalLayout>
  );
};

export default AboutPage;