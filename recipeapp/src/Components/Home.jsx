import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipe/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <div key={recipe._id} className="card p-3 mb-3">
          <Link to={`/read-recipe/${recipe._id}`} className="text-decoration-none text-dark">
          <h3>{recipe.name}</h3>
          </Link>
          
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            style={{ width: "300px", height: "200px", objectFit: "cover" }}
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

export default Home;