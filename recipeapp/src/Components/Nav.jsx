import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Nav() {
    const navigate = useNavigate();


    const handleLogout = () => {
  axios
    .get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    })
    .then(() => {
      localStorage.removeItem("id");
      navigate("/auth/login");
    })
    .catch((err) => console.log(err));
};
    
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Food Recipe
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse"
          id="navbarTogglerDemo01"
        >
          <ul className="navbar-nav ms-2 me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/recipe/create-recipe"
              >
                Create
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/recipe/saved-recipe"
              >
                Saved Recipe
              </Link>
            </li>

          </ul>
          {
            window.localStorage.length ?
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
            :
            <Link
            to="/auth/register"
            className="btn btn-outline-light">
            Login/Register
            </Link>

          }

          

        </div>
      </div>
    </nav>
  );
}

export default Nav;