# AnimeStream - Modern Anime Streaming Website

A modern anime streaming website with a premium Liquid Glass UI design, built with Node.js, Express, and Vanilla JavaScript.

## Quick Start

**Windows:**
```bash
# Double click START.bat
# OR run in terminal:
npm install
npm start
```

**Mac/Linux:**
```bash
npm install
npm start
```

Then open: `http://localhost:3000`

## Features

- 🎨 Liquid Glass UI with Glassmorphism design
- 🌙 Dark mode optimized
- 📱 Fully responsive (mobile-first)
- 🔍 Real-time anime search
- 📺 Multiple streaming servers
- 📅 Release schedule
- 🎭 Genre browsing
- ⚡ Fast API with caching (60s)
- 🎬 Netflix/Crunchyroll inspired interface

## Tech Stack

### Frontend
- HTML5
- CSS3 (Glassmorphism, Grid, Flexbox)
- Vanilla JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- Axios
- CORS enabled
- In-memory caching

## Installation

1. Install dependencies:
```bash
npm install
```

2. Test API endpoints (optional):
```bash
npm run test-api
```

3. Start the server:
```bash
npm start
```

4. For development with auto-reload:
```bash
npm run dev
```

5. Open your browser:
```
http://localhost:3000
```

## Troubleshooting

### API Issues

If you see errors like "502 Bad Gateway" or "API temporarily unavailable":

1. **This is normal** - The sankavollerei.com API sometimes goes down or is slow
2. **Wait a few minutes** - The API usually comes back online quickly
3. **Cached data** - The app will show cached data when API is down
4. **Check API status** - Run `npm run test-api` to check if API is working

### Common Errors:

- **404 Not Found** - Halaman tidak ditemukan, cek URL atau gunakan search
- **403 Forbidden** - Akses ditolak, mungkin IP diblokir atau konten dibatasi
- **500 Internal Server Error** - Error di server, cek logs dan restart server
- **502 Bad Gateway** - API server is down, wait and try again
- **503 Service Unavailable** - Server maintenance atau overload
- **504 Gateway Timeout** - API is slow, increase timeout or try again

### Error Pages

Aplikasi memiliki halaman error yang informatif untuk setiap jenis error di folder `/public/errors/`:
- `/errors/404.html` - Halaman tidak ditemukan
- `/errors/403.html` - Akses ditolak
- `/errors/500.html` - Server error
- `/errors/502.html` - Bad gateway
- `/errors/503.html` - Service unavailable
- `/errors/504.html` - Gateway timeout

Setiap halaman error menjelaskan:
- Apa yang terjadi
- Kemungkinan penyebab
- Solusi yang bisa dicoba

### Testing Errors

Run error handling tests:
```bash
npm run test-errors
```

### If anime fails to load:

1. Check if the API is accessible:
```bash
npm run test-api
```

2. Check browser console for errors (F12)

3. Check server logs for API responses

4. The app will automatically fallback to alternative endpoints if the primary fails

5. Clear cache by restarting the server

### Learn More

- **Full Error Documentation**: See `ERROR-HANDLING.md`
- **Quick Reference**: See `ERROR-QUICK-REFERENCE.md`

## API Endpoints

- `/api/home` - Home page data
- `/api/ongoing?page=1` - Ongoing anime
- `/api/completed?page=1` - Completed anime
- `/api/all` - All anime catalog
- `/api/anime/:slug` - Anime details
- `/api/episode/:slug` - Episode details
- `/api/genres` - All genres
- `/api/genre/:slug?page=1` - Anime by genre
- `/api/schedule` - Release schedule
- `/api/search/:keyword` - Search anime
- `/api/stream/:serverId` - Stream URL

## Pages

1. **Home** (`/`) - Featured anime, latest updates, ongoing series
2. **Catalog** (`/catalog`) - Browse all anime
3. **Detail** (`/detail/:slug`) - Anime information and episodes
4. **Episode** (`/episode/:slug`) - Watch episodes with multiple servers
5. **Genres** (`/genres`) - Browse by genre
6. **Schedule** (`/schedule`) - Weekly release schedule

## Design Features

- Apple VisionOS inspired blur effects
- Smooth animations and transitions
- Hover effects with glow borders
- Skeleton loading states
- Lazy loading images
- Sticky glass navbar
- Responsive grid layouts

## Color Palette

- Background: `#0f0f0f`
- Glass: `rgba(255,255,255,0.08)`
- Border: `rgba(255,255,255,0.15)`
- Accent: `#8b5cf6`
- Text: `#ffffff`

## Project Structure

```
project/
├── server/
│   ├── server.js       # Express server
│   └── routes.js       # API routes
├── public/
│   ├── index.html      # Home page
│   ├── catalog.html    # Anime catalog
│   ├── detail.html     # Anime detail
│   ├── episode.html    # Episode player
│   ├── genres.html     # Genres page
│   ├── schedule.html   # Schedule page
│   ├── style/
│   │   └── style.css   # Main styles
│   └── js/
│       ├── api.js      # API functions
│       └── ui.js       # UI components
└── package.json
```

## API Source

This project uses the Otakudesu API provided by SankaVollerei:
- Base URL: https://www.sankavollerei.com

## License

ISC
