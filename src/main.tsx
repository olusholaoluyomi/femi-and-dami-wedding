import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastProvider } from './context/ToastContext'; // Add this import

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider> {/* Wrap App with ToastProvider */}
      <App />
    </ToastProvider>
  </StrictMode>
);
