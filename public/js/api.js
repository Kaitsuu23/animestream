// Get API base URL from config
const API_BASE = window.API_CONFIG?.BASE_URL || '/api';

// Helper function to retry failed requests
async function fetchWithRetry(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url);
      
      // Handle specific HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Create detailed error object
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        
        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw error;
        }
        
        // Retry on server errors (5xx)
        if (i === retries) {
          throw error;
        }
        
        console.log(`Attempt ${i + 1} failed for ${url}: ${response.status}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      
      return response.json();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed for ${url}:`, error.message);
      if (i === retries) {
        throw error;
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Helper function to show error message to user
function showErrorMessage(error, container) {
  const errorHTML = `
    <div style="
      background: rgba(239, 68, 68, 0.1);
      border: 2px solid #ef4444;
      border-radius: 12px;
      padding: 20px;
      margin: 20px;
      text-align: center;
    ">
      <div style="font-size: 48px; margin-bottom: 10px;">⚠️</div>
      <h3 style="color: #ef4444; margin-bottom: 10px;">
        ${error.status ? `Error ${error.status}` : 'Terjadi Kesalahan'}
      </h3>
      <p style="color: #a0a0a0; margin-bottom: 15px;">
        ${error.message || 'Gagal memuat data. Silakan coba lagi.'}
      </p>
      ${error.data?.suggestion ? `
        <p style="color: #c0c0c0; font-size: 14px; margin-bottom: 15px;">
          💡 ${error.data.suggestion}
        </p>
      ` : ''}
      <button onclick="location.reload()" style="
        background: #6366f1;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
      ">
        Coba Lagi
      </button>
    </div>
  `;
  
  if (container) {
    container.innerHTML = errorHTML;
  }
  return errorHTML;
}

const api = {
  async fetchHome() {
    return fetchWithRetry(`${API_BASE}/home`);
  },

  async fetchOngoing(page = 1) {
    return fetchWithRetry(`${API_BASE}/ongoing?page=${page}`);
  },

  async fetchCompleted(page = 1) {
    return fetchWithRetry(`${API_BASE}/completed?page=${page}`);
  },

  async fetchAll() {
    return fetchWithRetry(`${API_BASE}/all`);
  },

  async fetchAnimeDetail(slug) {
    return fetchWithRetry(`${API_BASE}/anime/${slug}`);
  },

  async fetchEpisode(slug) {
    return fetchWithRetry(`${API_BASE}/episode/${slug}`);
  },

  async fetchGenres() {
    return fetchWithRetry(`${API_BASE}/genres`);
  },

  async fetchGenreAnime(slug, page = 1) {
    return fetchWithRetry(`${API_BASE}/genre/${slug}?page=${page}`);
  },

  async fetchSchedule() {
    return fetchWithRetry(`${API_BASE}/schedule`);
  },

  async search(keyword) {
    return fetchWithRetry(`${API_BASE}/search/${encodeURIComponent(keyword)}`);
  },

  async fetchStream(serverId) {
    return fetchWithRetry(`${API_BASE}/stream/${serverId}`);
  },

  async fetchBatch(slug) {
    return fetchWithRetry(`${API_BASE}/batch/${slug}`);
  },

  async fetchSamehadakuBatch(slug) {
    return fetchWithRetry(`${API_BASE}/samehadaku/batch/${slug}`);
  }
};
