
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ReadRecipe() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    getRecipe();
    fetchSavedRecipes();
  }, [id]);

  const getRecipe = () => {
    axios
      .get(
        `https://recipe-app-api-qyk2.onrender.com/recipe/recipe-by-id/${id}`
      )
      .then((result) => {
        setRecipe(result.data);
      })
      .catch((err) => console.error("Error fetching recipe:", err));
  };

  const fetchSavedRecipes = () => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      setSavedRecipes([]);
      return;
    }

    axios
      .get(
        `https://recipe-app-api-qyk2.onrender.com/recipe/saved-recipes/${userId}`
      )
      .then((result) => {
        setSavedRecipes(result.data);
      })
      .catch((err) => console.error("Error fetching saved recipes:", err));
  };

  const handleSave = () => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      alert("Please log in to save this recipe.");
      return;
    }

    if (!recipe._id) {
      alert("Recipe details are not loaded yet.");
      return;
    }

    axios
      .post(
        `https://recipe-app-api-qyk2.onrender.com/recipe/saved-recipe/${recipe._id}`,
        { userId }
      )
      .then((result) => {
        console.log("Recipe saved:", result.data);
        alert("Recipe Saved Successfully");
        fetchSavedRecipes();
      })
      .catch((err) => {
        console.error("Error saving recipe:", err);
        alert(
          err.response?.data?.message ||
            "Unable to save recipe. Please try again."
        );
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.name || "Recipe"}
              className="img-fluid rounded"
            />
          )}
        </div>

        <div className="col-md-8">
          <h2>{recipe.name || "Loading recipe..."}</h2>

          <button
            type="button"
            className="btn btn-warning mb-3"
            onClick={handleSave}
          >
            Save
          </button>

          <h4>Description</h4>
          <p>{recipe.description}</p>

          <h4>Ingredients</h4>
          <p>{recipe.ingredients}</p>
        </div>
      </div>
    </div>
  );
}

export default ReadRecipe;
