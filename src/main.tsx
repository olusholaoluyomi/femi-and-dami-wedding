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
<script>
// Run after page loads
document.addEventListener('DOMContentLoaded', function() {
  // Function to remove unwanted elements
  function removeBoltOverlay() {
    const selectors = [
      '#bolt-overlay',
      '[class*="bolt"]',
      '[class*="Bolt"]',
      '[data-bolt]',
      '#stackblitz-overlay',
      '[class*="stackblitz"]',
      '[class*="StackBlitz"]',
      '[data-stackblitz]'
    ];
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (element.innerHTML.includes('Bolt') || element.innerHTML.includes('bolt') ||
            element.src.includes('bolt') || element.src.includes('Bolt')) {
          element.remove();
        }
      });
    });
    
    // Remove any iframes that might contain the overlay
    document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.src.includes('bolt') || iframe.src.includes('Bolt') ||
          iframe.src.includes('stackblitz') || iframe.src.includes('StackBlitz')) {
        iframe.remove();
      }
    });
  }
  
  // Run initially
  removeBoltOverlay();
  
  // Set up a mutation observer to catch dynamically added elements
  const observer = new MutationObserver(removeBoltOverlay);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Also check periodically
  setInterval(removeBoltOverlay, 1000);
});
</script>