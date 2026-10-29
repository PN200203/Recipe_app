
const express = require('express');
const mongoose = require('mongoose');
const RecipeModel = require('../models/Recipe');
const userModel = require('../models/User');

const router = express.Router();

// Helper: validate MongoDB ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// 1. Create a recipe
router.post('/create-recipe', async (req, res) => {
    try {
        const { name, description, ingredients, imageUrl, userId } = req.body;

        if (!name || !description || !userId) {
            return res.status(400).json({
                message: 'Name, description, and userId are required'
            });
        }

        if (!isValidId(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID. Please log in again.'
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const recipe = await RecipeModel.create({
            name,
            description,
            ingredients,
            imageUrl,
            userId
        });

        return res.status(201).json(recipe);
    } catch (err) {
        console.error('Create recipe error:', err);
        return res.status(500).json({
            message: 'Failed to create recipe'
        });
    }
});

// 2. Get all recipes
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await RecipeModel.find().sort({ _id: -1 });
        return res.status(200).json(recipes);
    } catch (err) {
        console.error('Get recipes error:', err);
        return res.status(500).json({
            message: 'Failed to fetch recipes'
        });
    }
});

// 3. Get one recipe by ID
router.get('/recipe-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({ message: 'Invalid recipe ID' });
        }

        const recipe = await RecipeModel.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        return res.status(200).json(recipe);
    } catch (err) {
        console.error('Get recipe by ID error:', err);
        return res.status(500).json({
            message: 'Failed to fetch recipe'
        });
    }
});

// 4. Save a recipe for a user
router.post('/saved-recipe/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const { userId } = req.body;

        if (!isValidId(recipeId) || !isValidId(userId)) {
            return res.status(400).json({
                message: 'Valid recipe ID and user ID are required'
            });
        }

        const [user, recipe] = await Promise.all([
            userModel.findById(userId),
            RecipeModel.findById(recipeId)
        ]);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (!user.savedRecipes) {
            user.savedRecipes = [];
        }

        const alreadySaved = user.savedRecipes.some(
            savedId => savedId.toString() === recipeId
        );

        if (!alreadySaved) {
            user.savedRecipes.push(recipeId);
            await user.save();
        }

        return res.status(200).json({
            message: alreadySaved ? 'Recipe already saved' : 'Recipe saved successfully',
            savedRecipes: user.savedRecipes
        });
    } catch (err) {
        console.error('Save recipe error:', err);
        return res.status(500).json({
            message: 'Failed to save recipe'
        });
    }
});

// 5. Get recipes saved by a user
router.get('/saved-recipes/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        if (!isValidId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const recipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes || [] }
        });

        return res.status(200).json(recipes);
    } catch (err) {
        console.error('Get saved recipes error:', err);
        return res.status(500).json({
            message: 'Failed to fetch saved recipes'
        });
    }
});

module.exports = router;
