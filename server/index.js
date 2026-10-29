
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./Routes/auth');
const RecipeRouter = require('./Routes/reciper');

const app = express();

// Allowed frontend origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://recipe-53x5pkfbu-learning-portal.vercel.app',
    'https://recipe-app-git-main-learning-portal.vercel.app',
    'https://recipe-3jkkbqyny-learning-portal.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

// CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests without an Origin header, such as server-to-server calls
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.warn('CORS blocked origin:', origin);
        return callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/auth', userRouter);
app.use('/recipe', RecipeRouter);

// Health-check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Recipe App API is running'
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}`);
});
