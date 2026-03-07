# Deployment Guide - Split Backend & Frontend

## Architecture
- **Backend (API)**: Railway
- **Frontend (PWA)**: Vercel

## Step 1: Deploy Backend ke Railway

### 1.1 Persiapan
```bash
# Pastikan package.json sudah benar
npm install
```

### 1.2 Deploy ke Railway
1. Buka https://railway.app
2. Login dengan GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Pilih repository ini
6. Railway akan auto-detect Node.js

### 1.3 Environment Variables (Optional)
Di Railway dashboard:
- `PORT` → Railway auto-set ini
- `NODE_ENV` → `production`

### 1.4 Get Railway URL
Setelah deploy, Railway akan kasih URL seperti:
```
https://your-app-name.up.railway.app
```

Copy URL ini untuk step berikutnya.

## Step 2: Update Frontend Config

### 2.1 Update API Config
Edit `public/js/config.js`:
```javascript
const API_CONFIG = {
  BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : 'https://YOUR-RAILWAY-URL.up.railway.app/api'  // ← Ganti ini
};
```

### 2.2 Update CORS di Backend
Edit `server/server.js`, ganti:
```javascript
'https://your-vercel-app.vercel.app'  // ← Ganti dengan Vercel URL kamu
```

## Step 3: Deploy Frontend ke Vercel

### 3.1 Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 3.2 Deploy via CLI
```bash
vercel
```

Atau via GitHub:
1. Buka https://vercel.com
2. Login dengan GitHub
3. Click "Add New Project"
4. Import repository ini
5. Vercel akan auto-detect config dari `vercel.json`

### 3.3 Vercel Settings
- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: (kosongkan)
- **Output Directory**: `public`

### 3.4 Get Vercel URL
Setelah deploy:
```
https://your-app.vercel.app
```

## Step 4: Update CORS di Railway

Setelah dapat Vercel URL, update CORS di Railway:

1. Buka Railway dashboard
2. Edit `server/server.js` di repo
3. Update CORS origin dengan Vercel URL
4. Push ke GitHub
5. Railway akan auto-redeploy

Atau edit langsung di Railway:
```javascript
app.use(cors({
    origin: [
        'https://your-app.vercel.app',  // ← URL Vercel kamu
        /\.vercel\.app$/
    ],
    credentials: true
}));
```

## Step 5: Test PWA

### Test di Desktop
1. Buka Vercel URL di Chrome
2. Klik icon install di address bar
3. Test offline mode (DevTools → Network → Offline)

### Test di Mobile
1. Buka Vercel URL di Chrome mobile
2. Tap "Add to Home Screen"
3. Buka app dari home screen
4. Test offline mode

## Troubleshooting

### CORS Error
```
Access to fetch at 'https://railway.app/api/...' has been blocked by CORS
```

**Fix**: Update CORS origin di `server/server.js` dengan Vercel URL yang benar.

### Service Worker Error
```
Service worker registration failed
```

**Fix**: 
- Pastikan Vercel serve dengan HTTPS
- Check `vercel.json` routing sudah benar
- Clear cache dan reload

### API Not Found (404)
```
GET https://railway.app/api/home 404
```

**Fix**: 
- Check Railway deployment status
- Verify Railway URL di `config.js`
- Test Railway API langsung di browser

### Icons Not Loading
```
Failed to load resource: icon-192x192.png
```

**Fix**:
- Check `public/icons/` folder ada di Vercel
- Verify path di `manifest.json`

## Environment URLs

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:3000/api

### Production
- Frontend: https://your-app.vercel.app
- Backend: https://your-app.up.railway.app/api

## Monitoring

### Railway
- Dashboard: https://railway.app/dashboard
- Logs: Real-time di Railway dashboard
- Metrics: CPU, Memory, Network usage

### Vercel
- Dashboard: https://vercel.com/dashboard
- Analytics: Traffic, performance
- Logs: Function logs & build logs

## Cost Estimate

### Railway (Backend)
- Free tier: $5 credit/month
- Estimated: ~$3-5/month untuk small traffic
- Auto-sleep after inactivity (free tier)

### Vercel (Frontend)
- Free tier: Unlimited bandwidth
- 100GB bandwidth/month
- Perfect untuk PWA static files

## Quick Commands

```bash
# Test local
npm start

# Deploy backend (Railway auto-deploy on git push)
git push origin main

# Deploy frontend
vercel --prod

# Check Railway logs
railway logs

# Check Vercel logs
vercel logs
```

## Next Steps

1. ✅ Deploy backend ke Railway
2. ✅ Deploy frontend ke Vercel
3. ✅ Update CORS & API config
4. ✅ Test PWA di mobile
5. 📱 Submit ke app stores (optional via PWABuilder)
6. 📊 Setup analytics (Google Analytics, Plausible)
7. 🔔 Add push notifications
8. 🎨 Customize icons & splash screens

## Support

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- PWA Docs: https://web.dev/progressive-web-apps
