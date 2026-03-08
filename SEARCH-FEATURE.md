# 🔍 Search Feature Documentation

## URL Format

Search menggunakan format WordPress-style:

```
/?s={query}&post_type=anime
```

### Contoh:
```
/?s=naruto&post_type=anime
/?s=one%20piece&post_type=anime
/?s=demon%20slayer&post_type=anime
```

## Cara Menggunakan

### 1. Dari Navbar (Semua Halaman)
- Ketik minimal 2 karakter di search box
- Dropdown akan muncul dengan 5 hasil teratas
- Klik anime untuk langsung ke detail
- Klik "View all results" atau tekan Enter untuk ke halaman search

### 2. Direct URL
```
https://yoursite.com/?s=naruto&post_type=anime
```

### 3. Programmatic
```javascript
// Redirect to search
window.location.href = `/?s=${encodeURIComponent(keyword)}&post_type=anime`;

// API call
const results = await api.search('naruto');
```

## Fitur

### Live Search Dropdown
- Muncul saat ketik 2+ karakter
- Menampilkan 5 hasil teratas
- Auto-hide saat klik di luar
- Debounce 300ms untuk performa

### Search Results Page
- URL: `/?s={query}&post_type=anime`
- Live update saat mengetik (500ms debounce)
- Update URL tanpa reload page
- Loading skeleton
- No results message
- Grid layout responsive

### Mobile Responsive
- Search icon di input field
- Touch-friendly dropdown
- Responsive grid layout
- Optimized untuk mobile

## API Endpoint

```
GET /api/search/:keyword
```

### Response Format:
```json
{
  "data": {
    "results": [
      {
        "title": "Naruto",
        "slug": "naruto",
        "poster": "https://...",
        "episodes": "220",
        "score": "8.3"
      }
    ]
  }
}
```

## Files Modified

1. `public/search.html` - Search results page
2. `public/js/ui.js` - Search dropdown & redirect logic
3. `public/index.html` - Redirect handler
4. `public/style/style.css` - Search icon styling
5. `server/routes.js` - Search API endpoint (already exists)

## Technical Details

### URL Parameters
- `s` - Search query (required)
- `post_type` - Content type, must be "anime" (required)

### Validation
- Minimum 2 characters
- Auto-encode special characters
- Redirect to home if post_type !== 'anime'

### Caching
- API responses cached for 5 minutes
- Reduces server load
- Faster subsequent searches

### Performance
- Debounced input (300ms dropdown, 500ms page)
- Lazy loading images
- Skeleton loading states
- Efficient DOM updates

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ PWA mode

## SEO Friendly

- Clean URL structure
- Shareable search URLs
- Proper meta tags
- History API for navigation
