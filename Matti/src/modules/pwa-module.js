
/**
 * Module for pwa functions
 *
 * @author Jonsson-123
 * @module pwa
 *
 */

const applyServiceWorkers = () => {
  if (APP_CONF.productionMode && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
};

const pwaFunctions = {applyServiceWorkers};

export default pwaFunctions;

