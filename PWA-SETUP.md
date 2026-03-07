# PWA Setup Guide - AnimeStream

Web app kamu sekarang sudah jadi PWA! 🎉

## Apa yang Sudah Ditambahkan?

### 1. Service Worker (`public/service-worker.js`)
- Offline support
- Caching untuk performa lebih cepat
- Background sync

### 2. Web App Manifest (`public/manifest.json`)
- Config untuk installable app
- Icons dan theme colors
- Display mode standalone (fullscreen)

### 3. PWA Meta Tags
- Theme color untuk Android
- Apple mobile web app support
- Viewport optimization

### 4. App Icons
- 8 ukuran icon (72px - 512px)
- Support Android & iOS
- Located di `public/icons/`

### 5. Offline Page
- Fallback page ketika offline
- User-friendly error message

## Cara Test PWA

### Di Desktop (Chrome/Edge):
1. Jalankan server: `npm start`
2. Buka http://localhost:3000
3. Klik icon install di address bar (⊕)
4. Atau: Menu → Install AnimeStream

### Di Android:
1. Deploy ke hosting dengan HTTPS (wajib!)
2. Buka di Chrome mobile
3. Tap "Add to Home Screen"
4. App akan muncul di home screen kayak app native

### Di iOS (Safari):
1. Buka di Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Done!

## Testing Checklist

- [ ] App bisa di-install
- [ ] Icon muncul dengan benar
- [ ] Offline mode works
- [ ] Cache berfungsi (load lebih cepat)
- [ ] Fullscreen mode (no browser UI)
- [ ] Theme color sesuai

## Deploy ke Production

### Requirements:
1. **HTTPS wajib** - PWA tidak jalan di HTTP
2. Valid SSL certificate
3. Service worker harus accessible

### Hosting Options:
- Vercel (recommended, auto HTTPS)
- Netlify (auto HTTPS)
- Firebase Hosting
- Heroku
- VPS dengan Nginx + Let's Encrypt

### Deploy ke Vercel (Gratis):
```bash
npm install -g vercel
vercel
```

## Troubleshooting

### Service Worker tidak register?
- Check console untuk error
- Pastikan path `/service-worker.js` accessible
- Clear cache dan reload

### App tidak bisa di-install?
- Pastikan pakai HTTPS (kecuali localhost)
- Check manifest.json valid
- Minimal 2 icons (192px & 512px) harus ada

### Offline mode tidak jalan?
- Check service worker status di DevTools → Application
- Pastikan cache strategy benar
- Test dengan throttling "Offline" di DevTools

## Advanced Features (Optional)

### Push Notifications
Tambahkan di `service-worker.js`:
```javascript
self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icons/icon-192x192.png'
  });
});
```

### Background Sync
```javascript
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});
```

## Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://web.dev/add-manifest/)

## Next Steps

1. Test di real device
2. Deploy ke hosting dengan HTTPS
3. Test install flow
4. Monitor dengan Lighthouse
5. Add to app stores (optional via TWA/PWABuilder)
