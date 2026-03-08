// API Configuration
// Set your Railway backend URL here after deployment
if (!window.API_CONFIG) {
  const API_CONFIG = {
    // Development: use local server
    // Production: use same domain (Vercel handles both frontend & API)
    BASE_URL: window.location.hostname === 'localhost' 
      ? 'http://localhost:3000/api'
      : 'https://animestream-mauve.vercel.app/api'  // Use relative path, Vercel will handle routing
  };

  // Export for use in api.js
  window.API_CONFIG = API_CONFIG;
}
