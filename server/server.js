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
        'https://your-vercel-app.vercel.app', // Update with your Vercel URL
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
    res.sendFile(path.join(__dirname, '../public/catalog.html'));
});

app.get('/ongoing-anime', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ongoing-anime.html'));
});

app.get('/ongoing-anime/page/:page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ongoing-anime.html'));
});

app.get('/complete-anime', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/complete-anime.html'));
});

app.get('/complete-anime/page/:page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/complete-anime.html'));
});

app.get('/catalog', (req, res) => {
    res.redirect('/anime-list');
});

app.get('/detail/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/detail.html'));
});

app.get('/anime/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/detail.html'));
});

app.get('/batch/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/batch.html'));
});

app.get('/episode/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/episode.html'));
});

app.get('/genre-list/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/genre-list.html'));
});

app.get('/genres/:slug/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/genre-list.html'));
});

app.get('/genres/:slug/page/:page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/genre-list.html'));
});

app.get('/schedule/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/schedule.html'));
});

app.get('/status', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/status.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});