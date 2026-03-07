# Quick Start - Deploy AnimeStream PWA

## 🚀 Deploy dalam 5 Menit

### 1. Deploy Backend ke Railway (2 menit)

```bash
# Push ke GitHub dulu
git add .
git commit -m "Setup PWA and split deployment"
git push origin main
```

1. Buka https://railway.app
2. Login → New Project → Deploy from GitHub
3. Pilih repo ini
4. Railway auto-deploy ✅
5. Copy URL Railway (contoh: `https://nekopoi-production.up.railway.app`)

### 2. Update Config (1 menit)

Edit `public/js/config.js`:
```javascript
const API_CONFIG = {
  BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : 'https://PASTE-RAILWAY-URL-DISINI.up.railway.app/api'  // ← Ganti
};
```

Commit & push:
```bash
git add public/js/config.js
git commit -m "Update Railway URL"
git push
```

### 3. Deploy Frontend ke Vercel (2 menit)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Atau via web:
1. Buka https://vercel.com
2. Import GitHub repo
3. Deploy ✅
4. Copy URL Vercel (contoh: `https://nekopoi.vercel.app`)

### 4. Update CORS (1 menit)

Edit `server/server.js`, ganti:
```javascript
'https://your-vercel-app.vercel.app'
```

Dengan URL Vercel kamu, lalu push:
```bash
git add server/server.js
git commit -m "Update CORS for Vercel"
git push
```

Railway akan auto-redeploy.

## ✅ Done!

Buka URL Vercel kamu di mobile:
- Chrome: "Add to Home Screen"
- Safari: Share → "Add to Home Screen"

## 🔧 Troubleshooting

### CORS Error?
Update `server/server.js` dengan Vercel URL yang benar.

### API 404?
Check Railway URL di `config.js` sudah benar.

### Service Worker Error?
Clear cache: DevTools → Application → Clear storage

## 📱 Test PWA

1. Buka di Chrome mobile
2. Tap menu → "Install app"
3. Test offline mode
4. Done! 🎉

## 💰 Cost

- Railway: $5 credit/month (free tier)
- Vercel: Free unlimited
- Total: $0/month untuk small traffic

## 📚 Full Guide

Baca `DEPLOYMENT.md` untuk guide lengkap.
