import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Updated ID to match index.html and WHMCS template container
const rootElement = document.getElementById('agent-ai-root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);