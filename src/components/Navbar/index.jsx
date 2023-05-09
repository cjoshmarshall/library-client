import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { request } from "../../api/axios";

function Navbar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await request.get("/auth/signout", { withCredentials: true });
      setAuth(null);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-subcontainer">
        <ul className="navbar-lists">
          {auth?.admin && (
            <li className="navbar-list">
              <Link to="/users">Users</Link>
            </li>
          )}
          <li className="navbar-list">
            <Link to="/books">Books</Link>
          </li>
        </ul>
        <div className="navbar-button-container">
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
