// API Configuration
// Set your Railway backend URL here after deployment
const API_CONFIG = {
  // Development: use local server
  // Production: use Railway backend URL
  BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : 'https://your-railway-app.up.railway.app/api'
};

// Export for use in api.js
window.API_CONFIG = API_CONFIG;
