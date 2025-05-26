import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Entry point of the React application.
 * Renders the App component into the DOM.
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element with id "root" not found in the document.');
} else {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <div aria-label="Application Root" role="application">
        <App />
      </div>
    </React.StrictMode>
  );
}