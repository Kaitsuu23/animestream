const ui = {
  createAnimeCard(anime, options = {}) {
    const { hideStatus = false } = options;
    const card = document.createElement('div');
    card.className = 'anime-card fade-in';

    // Extract slug from various possible formats
    let slug = anime.animeId || anime.slug || '';
    if (!slug && anime.endpoint) {
      slug = anime.endpoint.replace('/anime/', '').replace('/', '');
    }
    if (!slug && anime.href) {
      // Extract from href like "/anime/anime/champignon-majo-sub-indo"
      const parts = anime.href.split('/').filter(s => s);
      slug = parts[parts.length - 1];
    }
    if (!slug && anime.link) {
      slug = anime.link.split('/').filter(s => s).pop();
    }

    card.onclick = () => {
      if (slug) {
        window.location.href = `/detail/${slug}`;
      }
    };

    const title = anime.title || anime.name || 'Unknown';
    const image = anime.poster || anime.thumb || anime.image || 'https://via.placeholder.com/200x280';

    // Handle episode display
    let episodeBadge = '';
    if (anime.episodes) {
      episodeBadge = anime.episodes.toString().toLowerCase().includes('ep') ? anime.episodes : `Episode ${anime.episodes}`;
    } else if (anime.episode) {
      episodeBadge = anime.episode.toString().toLowerCase().includes('ep') ? anime.episode : `Episode ${anime.episode}`;
    } else if (anime.latest_episode) {
      episodeBadge = anime.latest_episode;
    }

    // Ensure episode badge has text if it is just a number
    if (episodeBadge && !isNaN(episodeBadge)) {
      episodeBadge = `Episode ${episodeBadge}`;
    }

    // Handle date and day badge representation
    let dateText = anime.releaseDate || anime.lastReleaseDate || anime.latestReleaseDate || anime.updatedAt || '';
    if (!dateText && !anime.releaseDay) {
      dateText = anime.status || anime.type || '';
    }

    let dayText = anime.releaseDay || '';
    if (!dayText && anime.score) {
      dayText = `${anime.score}`;
    }

    // Show status badge only if hideStatus is false
    const showStatusBadge = !hideStatus && anime.status;

    card.innerHTML = `
      <div class="anime-card-image">
        <img src="${image}" alt="${title}" loading="lazy" onerror="this.src='https://via.placeholder.com/200x280'">
        
        ${showStatusBadge && (anime.status.toLowerCase().includes('ongoing') || anime.status.toLowerCase().includes('on-going')) ? `
        <div class="anime-status-badge ongoing">Ongoing</div>
        ` : showStatusBadge && anime.status.toLowerCase().includes('completed') ? `
        <div class="anime-status-badge completed">Completed</div>
        ` : ''}
        
        ${episodeBadge ? `
        <div class="anime-ep-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <span style="vertical-align: middle;">${episodeBadge}</span>
        </div>` : ''}
        
        ${dateText ? `<div class="anime-date-badge">${dateText}</div>` : ''}
        
        ${dayText ? `
        <div class="anime-day-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          ${dayText.replace('⭐', '').trim()}
        </div>` : ''}
        
        <div class="anime-card-title-overlay">
          <h3 class="anime-card-title">${title}</h3>
        </div>
      </div>
    `;

    return card;
  },

  createSkeletonCard() {
    const card = document.createElement('div');
    card.className = 'skeleton skeleton-card';
    return card;
  },

  showLoading(container, count = 10) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      container.appendChild(this.createSkeletonCard());
    }
  },

  showError(container, message) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">😔</div>
        <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1rem;">${message}</p>
        <button onclick="location.reload()" class="btn btn-primary" style="display: inline-block;">
          Refresh Page
        </button>
      </div>
    `;
  },

  createSearchItem(anime) {
    const item = document.createElement('div');
    item.className = 'search-item';

    // Extract slug from various possible formats
    let slug = anime.animeId || anime.slug || '';
    if (!slug && anime.endpoint) {
      slug = anime.endpoint.replace('/anime/', '').replace('/', '');
    }
    if (!slug && anime.href) {
      const parts = anime.href.split('/').filter(s => s);
      slug = parts[parts.length - 1];
    }
    if (!slug && anime.link) {
      slug = anime.link.split('/').filter(s => s).pop();
    }

    item.onclick = () => {
      if (slug) {
        window.location.href = `/detail/${slug}`;
      }
    };

    const title = anime.title || anime.name || 'Unknown';
    const image = anime.poster || anime.thumb || anime.image || 'https://via.placeholder.com/50x70';

    let statusText = '';
    if (anime.releaseDay) {
      statusText = anime.releaseDay;
    } else if (anime.score) {
      statusText = `⭐ ${anime.score}`;
    } else if (anime.status) {
      statusText = anime.status;
    } else if (anime.type) {
      statusText = anime.type;
    }

    item.innerHTML = `
      <img src="${image}" alt="${title}" onerror="this.src='https://via.placeholder.com/50x70'">
      <div class="search-item-info">
        <h4>${title}</h4>
        <p>${statusText}</p>
      </div>
    `;

    return item;
  }
};

// Search functionality
let searchTimeout;
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

if (searchInput && searchResults) {
  // Handle Enter key to go to search page
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const keyword = searchInput.value.trim();
      if (keyword.length >= 2) {
        window.location.href = `/search/?keyword=${encodeURIComponent(keyword)}`;
      }
    }
  });

  // Live search dropdown
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const keyword = e.target.value.trim();

    if (keyword.length < 2) {
      searchResults.classList.remove('active');
      return;
    }

    searchTimeout = setTimeout(async () => {
      try {
        console.log('Searching dropdown for:', keyword);
        const data = await api.search(keyword);
        console.log('Dropdown search raw response:', JSON.stringify(data, null, 2));
        searchResults.innerHTML = '';

        // Try different possible data structures
        let results = [];
        if (data.data && data.data.animeList) {
          results = data.data.animeList;
        } else if (data.data) {
          results = data.data.results || data.data.anime || data.data;
        } else if (data.results) {
          results = data.results;
        } else if (data.anime) {
          results = data.anime;
        } else if (data.animeList) {
          results = data.animeList;
        } else if (Array.isArray(data)) {
          results = data;
        }

        console.log('Dropdown parsed results:', results);
        console.log('Results is array?', Array.isArray(results));
        console.log('Results length:', results.length);

        if (!Array.isArray(results)) {
          console.warn('Results is not an array:', results);
          results = [];
        }

        if (results.length > 0) {
          results.slice(0, 5).forEach(anime => {
            searchResults.appendChild(ui.createSearchItem(anime));
          });
          
          // Add "View all results" button
          const viewAllBtn = document.createElement('div');
          viewAllBtn.className = 'search-item';
          viewAllBtn.style.cssText = 'justify-content: center; background: var(--glass-bg-hover); cursor: pointer; font-weight: 600; color: var(--accent);';
          viewAllBtn.innerHTML = `
            <div style="text-align: center; width: 100%;">
              View all results for "${keyword}" →
            </div>
          `;
          viewAllBtn.onclick = () => {
            window.location.href = `/search/?keyword=${encodeURIComponent(keyword)}`;
          };
          searchResults.appendChild(viewAllBtn);
          
          searchResults.classList.add('active');
        } else {
          console.log('No results found or empty array');
          searchResults.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-secondary);">No results found</div>';
          searchResults.classList.add('active');
        }
      } catch (error) {
        console.error('Search error:', error);
        console.error('Error details:', error.response || error.message);
        searchResults.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-secondary);">Search failed. Try again.</div>';
        searchResults.classList.add('active');
      }
    }, 300);
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });

  // Focus search input to show dropdown again
  searchInput.addEventListener('focus', (e) => {
    if (searchInput.value.trim().length >= 2 && searchResults.children.length > 0) {
      searchResults.classList.add('active');
    }
  });
}

// Lazy loading images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  });
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container')) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
});
