import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MinimalLayout from './components/layout/MinimalLayout';

const ModelShowcasePage = React.lazy(() => import('./pages/ModelShowcasePage'));
const ExperiencePage = React.lazy(() => import('./pages/ExperiencePage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MinimalLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes
            aria-label="Main Navigation"
            role="navigation"
          >
            <Route path="/" element={<Navigate replace to="/model-showcase" aria-label="Redirect to Model Showcase"/>} />
            <Route
              path="/model-showcase"
              element={
                <React.Suspense fallback={<div>Loading Model Showcase...</div>}>
                  <ModelShowcasePage />
                </React.Suspense>
              }
            />
            <Route
              path="/experience"
              element={
                <React.Suspense fallback={<div>Loading Experience...</div>}>
                  <ExperiencePage />
                </React.Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <React.Suspense fallback={<div>Loading Contact...</div>}>
                  <ContactPage />
                </React.Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <React.Suspense fallback={<div>Loading About...</div>}>
                  <AboutPage />
                </React.Suspense>
              }
            />
          </Routes>
        </Suspense>
      </MinimalLayout>
    </BrowserRouter>
  );
};

export default App;