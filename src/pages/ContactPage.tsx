import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useTheme } from '../hooks/useTheme';
import { three3DHelpersUtil } from '../utils/three-helpers';
import MinimalLayout from '../components/layout/MinimalLayout';
import ThreeScene from '../components/3d/ThreeScene';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  subject: Yup.string().required('Required'),
  message: Yup.string().min(10, 'Too Short!').required('Required'),
});

interface ContactPageProps {}

const ContactPage: React.FC<ContactPageProps> = () => {
  const { isDarkMode } = useTheme();
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setSubmissionStatus('loading');
    setErrorMessage(null);

    try {
      // Simulate API call (replace with your actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success response
      setSubmissionStatus('success');
      resetForm();
    } catch (error: any) {
      setSubmissionStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <MinimalLayout>
      <div className="container mx-auto py-8 relative">
	  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', zIndex: 0, pointerEvents: 'none' }}>
		  <Canvas
			  dpr={[1, 2]}
			  camera={{ position: [0, 0, 5], fov: 75 }}
			  style={{ height: '100px', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
		  >
			  <ambientLight intensity={0.3} />
			  <directionalLight position={[2, 5, 2]} intensity={0.5} />
			  <motion.mesh
				  ref={sphereRef}
				  initial={{ rotation: { x: 0, y: 0, z: 0 } }}
				  animate={{ rotation: { x: 0.3, y: 0.3, z: 0 } }}
				  transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror' }}
			  >
				  <sphereGeometry args={[1, 32, 32]} />
				  <motion.meshStandardMaterial
					  color={isDarkMode ? '#3b82f6' : '#2563eb'}
					  transparent opacity={0.6} />
			  </motion.mesh>
			  <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
		  </Canvas>
	  </div>
        <h1 className="text-3xl font-bold mb-4 text-center relative z-10">Contact Us</h1>
        <div className="max-w-md mx-auto bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 relative z-10">
          <Formik
            initialValues={{ name: '', email: '', subject: '', message: '' }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-200"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-200"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    Subject
                  </label>
                  <Field
                    type="text"
                    id="subject"
                    name="subject"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-200"
                  />
                  <ErrorMessage name="subject" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    Message
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-200"
                    rows={4}
                  />
                  <ErrorMessage name="message" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                    aria-label="Submit Contact Form"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {submissionStatus === 'success' && (
            <div className="text-green-500 mt-4">
              Thank you! Your message has been sent.
            </div>
          )}
          {submissionStatus === 'error' && (
            <div className="text-red-500 mt-4">
              Error: {errorMessage}
            </div>
          )}
        </div>
      </div>
    </MinimalLayout>
  );
};

export default ContactPage;