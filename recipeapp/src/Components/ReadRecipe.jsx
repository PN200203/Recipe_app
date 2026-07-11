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
      .get(`http://localhost:3001/recipe/recipe-by-id/${id}`)
      .then((result) => {
        setRecipe(result.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSavedRecipes = () => {
    const userId = localStorage.getItem("id");

    axios
      .get(`http://localhost:3001/recipe/saved-recipes/${userId}`)
      .then((result) => {
        setSavedRecipes(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSave = () => {
    const userId = localStorage.getItem("id");

    axios
      .post(
        `http://localhost:3001/recipe/saved-recipe/${recipe._id}`,
        {
          userId,
        }
      )
      .then((result) => {
        console.log(result.data);
        alert("Recipe Saved Successfully");

        fetchSavedRecipes();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-4">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h2>{recipe.name}</h2>

          <button
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