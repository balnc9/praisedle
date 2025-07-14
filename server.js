const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            mediaSrc: ["'self'", "https:", "blob:"],
            connectSrc: ["'self'", "https:"],
        },
    },
}));

// Performance middleware
app.use(compression());

// CORS middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://praisedle.com', 'https://www.praisedle.com'] 
        : true,
    credentials: false
}));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the current directory
app.use(express.static('.', {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        // Cache static assets longer
        if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
        }
        // Cache HTML files for shorter time
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
        }
    }
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'Praisedle',
        version: '1.0.0'
    });
});

// API endpoint for getting game statistics (if needed in the future)
app.get('/api/stats', (req, res) => {
    res.json({
        message: 'Statistics are stored locally in the browser',
        totalSongs: 20,
        gameVersion: '1.0.0'
    });
});

// Serve the main game page for all routes (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'praisedle.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Page not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🎵 Praisedle server is running on port ${PORT}`);
    console.log(`🌐 Visit http://localhost:${PORT} to play!`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    
    if (process.env.NODE_ENV === 'production') {
        console.log('🚀 Running in production mode');
    } else {
        console.log('🔧 Running in development mode');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

module.exports = app; 