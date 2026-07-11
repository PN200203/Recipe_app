import React, { useEffect, useState } from "react";
import axios from "axios";

function SavedRecipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("id");

    axios
      .get(`http://localhost:3001/recipe/saved-recipes/${userId}`)
      .then((result) => {
        setRecipes(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Saved Recipes</h2>

      {recipes.map((recipe) => (
        <div key={recipe._id} className="card p-3 mb-3">
          <h3>{recipe.name}</h3>

          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            style={{
              width: "300px",
              height: "200px",
              objectFit: "cover",
            }}
          />

          <p>{recipe.description}</p>

          <p>
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SavedRecipe;