// Get API base URL from config
const API_BASE = window.API_CONFIG?.BASE_URL || '/api';

// Helper function to retry failed requests
async function fetchWithRetry(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
    return fetchWithRetry(`${API_BASE}/search/${keyword}`);
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
