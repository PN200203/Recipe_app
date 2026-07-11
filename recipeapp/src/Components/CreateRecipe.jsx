import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    imageUrl: "",
    userId: window.localStorage.getItem("id"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/recipe/create-recipe", recipe)
      .then((result) => {
        navigate('/')
        console.log(result.data);
        alert("Recipe Created Successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 border border-1 w-25">
        <h3>Create Recipe</h3>

        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="mt-3">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              name="description"
              onChange={handleChange}
            />
          </div>

          <div className="mt-3">
            <label>Ingredients</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Ingredients"
              name="ingredients"
              onChange={handleChange}
            />
          </div>

          <div className="mt-3">
            <label>Image URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Image URL"
              name="imageUrl"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success w-100 mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;