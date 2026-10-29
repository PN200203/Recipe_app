
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Nav() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("id");

    const handleLogout = () => {
        // Clear the saved login ID
        localStorage.removeItem("id");

        // Redirect to the login page
        navigate("/auth/login", { replace: true });

        // Refresh the page so the navbar updates
        window.location.href = "/auth/login";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Food Recipe
                </Link>

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

                    {userId ? (
                        <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="btn btn-outline-light"
                        >
                            Login/Register
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Nav;
