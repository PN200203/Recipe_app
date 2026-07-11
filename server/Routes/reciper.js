const express = require('express');
const RecipeModel = require('../models/Recipe');
const userModel = require('../models/User');

const router = express.Router();    

router.post('/create-recipe', async (req, res) => {
    RecipeModel.create({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    }).then(result => {
       return res.json(result)
    }).catch(err => console.log(err))
     
})

router.get('/recipes', async (req, res) => {
    RecipeModel.find()
        .then(recipes => {
            return res.json(recipes);
        }).catch(err => res.json(err))
    })

router.get("/recipe-by-id/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    res.json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/saved-recipe/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.body.userId;

    console.log("Recipe ID:", recipeId);
    console.log("User ID:", userId);

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    }

    res.json({
      message: "Recipe Saved",
      savedRecipes: user.savedRecipes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/saved-recipes/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    const recipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;