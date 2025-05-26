import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

import { useTheme } from '../hooks/useTheme';
import { three3DHelpersUtil } from '../utils/three-helpers';

import '../styles/layout/header.css';

export interface HeaderProps {
  /** ClassName for styling */
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef<THREE.Mesh>(null);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center text-gray-800 dark:text-white font-bold text-xl">
          <Canvas className="logo-canvas" dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: '40px', height: '40px' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <motion.mesh
              ref={logoRef}
              initial={{ rotation: { x: 0, y: 0, z: 0 } }}
              animate={{ rotation: { x: 0.5, y: 0.5, z: 0 } }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
            >
              <boxGeometry args={[1, 1, 1]} />
              <motion.meshStandardMaterial color={isDarkMode ? '#3b82f6' : '#2563eb'} />
            </motion.mesh>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>
          <span className="ml-2">Lumina SaaS</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/model-showcase" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">Showcase</Link>
          <Link to="/experience" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">Experience</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">About</Link>
          <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">Contact</Link>
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={handleToggleMenu}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M19 6.414L17.586 5 12 10.586 6.414 5 5 6.414 10.586 12 5 17.586 6.414 19 12 13.414 17.586 19 19 17.586 13.414 12 19 6.414Z" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Framer Motion) */}
      <motion.div
        className="md:hidden bg-gray-100 dark:bg-gray-700 py-2 px-6"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-col items-start space-y-3">
          <Link to="/model-showcase" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">Showcase</Link>
          <Link to="/experience" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">Experience</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">About</Link>
          <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">Contact</Link>
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;