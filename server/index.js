const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Routes/auth');
const cookieParser = require('cookie-parser');
const RecipeRouter = require('./Routes/reciper');

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/auth', userRouter);
app.use('/recipe', RecipeRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}`);
});