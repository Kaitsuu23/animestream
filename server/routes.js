const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://www.sankavollerei.com/anime';

// Configure axios with longer timeout and retry
const axiosInstance = axios.create({
  timeout: 30000, // 30 seconds
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
});

// Simple cache implementation
const cache = new Map();
const CACHE_DURATION = 300000; // 5 minutes (longer cache for when API is slow)

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Home endpoint
router.get('/home', asyncHandler(async (req, res) => {
  const cacheKey = 'home';
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  try {
    const response = await axiosInstance.get(`${BASE_URL}/home`);
    setCachedData(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    // Return cached data even if expired when API is down
    const expiredCache = cache.get(cacheKey);
    if (expiredCache) {
      console.log('API down, returning expired cache');
      return res.json(expiredCache.data);
    }
    throw error;
  }
}));

// Ongoing anime
router.get('/ongoing', asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const cacheKey = `ongoing-${page}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  const response = await axiosInstance.get(`${BASE_URL}/ongoing-anime?page=${page}`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// Completed anime
router.get('/completed', asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const cacheKey = `completed-${page}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  const response = await axiosInstance.get(`${BASE_URL}/complete-anime?page=${page}`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// All anime (unlimited)
router.get('/all', asyncHandler(async (req, res) => {
  const cacheKey = 'all';
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  try {
    // Try unlimited endpoint first
    const response = await axiosInstance.get(`${BASE_URL}/unlimited`);
    setCachedData(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    // Fallback to ongoing anime
    try {
      const response = await axiosInstance.get(`${BASE_URL}/ongoing-anime?page=1`);
      setCachedData(cacheKey, response.data);
      res.json(response.data);
    } catch (fallbackError) {
      // Second fallback to complete anime
      const response = await axiosInstance.get(`${BASE_URL}/complete-anime?page=1`);
      setCachedData(cacheKey, response.data);
      res.json(response.data);
    }
  }
}));

// Anime detail
router.get('/anime/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `anime-${slug}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  const response = await axiosInstance.get(`${BASE_URL}/anime/${slug}`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// Episode detail
router.get('/episode/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `episode-${slug}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  const response = await axiosInstance.get(`${BASE_URL}/episode/${slug}`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// Genres list
router.get('/genres', asyncHandler(async (req, res) => {
  const cacheKey = 'genres';
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  const response = await axiosInstance.get(`${BASE_URL}/genre`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// Genre detail
router.get('/genre/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const page = req.query.page || 1;
  const cacheKey = `genre-${slug}-${page}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  const response = await axiosInstance.get(`${BASE_URL}/genre/${slug}?page=${page}`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// Schedule
router.get('/schedule', asyncHandler(async (req, res) => {
  const cacheKey = 'schedule';
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  const response = await axiosInstance.get(`${BASE_URL}/schedule`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// Search
router.get('/search/:keyword', asyncHandler(async (req, res) => {
  const { keyword } = req.params;
  const cacheKey = `search-${keyword}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  // Use the correct search endpoint
  const response = await axiosInstance.get(`${BASE_URL}/search/${encodeURIComponent(keyword)}`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// Stream server
router.get('/stream/:serverId', asyncHandler(async (req, res) => {
  const { serverId } = req.params;
  const cacheKey = `stream-${serverId}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  const response = await axiosInstance.get(`${BASE_URL}/server/${serverId}`);
  setCachedData(cacheKey, response.data);
  res.json(response.data);
}));

// Batch download
router.get('/batch/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `batch-${slug}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  try {
    const response = await axiosInstance.get(`${BASE_URL}/batch/${slug}`);
    setCachedData(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    // If batch endpoint fails, return empty batch list instead of error
    console.log(`No batch available for ${slug}`);
    res.json({ data: { batchList: [] } });
  }
}));

// Samehadaku batch download (API 2)
router.get('/samehadaku/batch/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `samehadaku-batch-${slug}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }

  try {
    // Samehadaku uses /anime/samehadaku/batch/{slug} endpoint
    const response = await axiosInstance.get(`${BASE_URL}/samehadaku/batch/${slug}`);
    setCachedData(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.log(`No Samehadaku batch available for ${slug}`);
    res.json({ data: null });
  }
}));

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  
  if (err.response) {
    // Axios error with response (502, 503, etc)
    if (err.response.status === 502 || err.response.status === 503) {
      return res.status(503).json({ 
        error: 'API temporarily unavailable',
        message: 'The anime API is currently down. Please try again in a few minutes.',
        suggestion: 'The API server is experiencing issues. Try refreshing the page later.',
        status: err.response.status
      });
    }
    res.status(err.response.status).json({ 
      error: 'API request failed',
      message: err.message
    });
  } else if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
    // Timeout error
    res.status(504).json({ 
      error: 'Request timeout',
      message: 'The API is taking too long to respond. Please try again.',
      suggestion: 'The API server may be slow or down. Try again in a few minutes.'
    });
  } else if (err.request) {
    // Axios error without response
    res.status(503).json({ 
      error: 'Service unavailable',
      message: 'Cannot reach the anime API. Please try again later.',
      suggestion: 'The API server may be down. Check back in a few minutes.'
    });
  } else {
    // Other errors
    res.status(500).json({ 
      error: 'Something went wrong!',
      message: err.message 
    });
  }
});

module.exports = router;
