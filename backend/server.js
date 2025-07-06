const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/database');

// Import routes
const routes = require('./routes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://kle-ec-frontend.vercel.app',
            'https://kle-ec-frontend.netlify.app',
            'https://kle-ec-frontend.onrender.com',
            'https://kle-ec.vercel.app',
            'https://kle-ec.netlify.app',
            'https://kle-ec.onrender.com',
            'https://kle-ec.vercel.app'
        ];

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // For development, allow all origins
            if (process.env.NODE_ENV === 'development') {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    credentials: true
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json());

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// API test endpoint
app.get('/api/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is working correctly',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});