
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Routes/auth');
const cookieParser = require('cookie-parser');
const RecipeRouter = require('./Routes/reciper');

const app = express();

// CORS configuration for local development and deployed frontend
const allowedOrigins = [
    'http://localhost:5173',
    'https://recipe-53x5pkfbu-learning-portal.vercel.app',
    'https://recipe-app-git-main-learning-portal.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/auth', userRouter);
app.use('/recipe', RecipeRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}`);
});
