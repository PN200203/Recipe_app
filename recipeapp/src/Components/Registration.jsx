
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "https://recipe-app-api-qyk2.onrender.com/auth/register",
        { username, password },
        { withCredentials: true }
      );

      console.log("Registration response:", result.data);
      navigate("/auth/login");
    } catch (err) {
      console.error(
        "Registration error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Registration failed. Please check the backend connection."
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 border border-1 w-25">
        <h3>Register</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter Username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="mt-1 btn btn-success w-100">
            Submit
          </button>

          <Link to="/auth/login" className="d-block mt-2">
            <button type="button" className="btn btn-default w-100 border">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Registration;
