const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://animestream-mauve.vercel.app', // Vercel production URL
        /\.vercel\.app$/ // Allow all Vercel preview deployments
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// PWA specific headers
app.use((req, res, next) => {
    if (req.url === '/manifest.json') {
        res.setHeader('Content-Type', 'application/manifest+json');
    }
    if (req.url === '/service-worker.js') {
        res.setHeader('Service-Worker-Allowed', '/');
        res.setHeader('Cache-Control', 'no-cache');
    }
    next();
});

// API Routes
app.use('/api', routes);

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/anime-list/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/catalog.html'));
});

app.get('/ongoing-anime', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/ongoing-anime.html'));
});

app.get('/ongoing-anime/page/:page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/ongoing-anime.html'));
});

app.get('/complete-anime', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/complete-anime.html'));
});

app.get('/complete-anime/page/:page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/complete-anime.html'));
});

app.get('/catalog', (req, res) => {
    res.redirect('/anime-list');
});

app.get('/detail/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/detail.html'));
});

app.get('/anime/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/detail.html'));
});

app.get('/batch/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/batch.html'));
});

app.get('/episode/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/episode.html'));
});

app.get('/genre-list/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/genre-list.html'));
});

app.get('/genres/:slug/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/genre-list.html'));
});

app.get('/genres/:slug/page/:page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/genre-list.html'));
});

app.get('/schedule/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/schedule.html'));
});

app.get('/search/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/search.html'));
});

app.get('/status', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/status.html'));
});

// Error handling middleware
// 404 - Not Found (harus di akhir semua routes)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/errors/404.html'));
});

// 500 - Internal Server Error
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).sendFile(path.join(__dirname, '../public/errors/500.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});