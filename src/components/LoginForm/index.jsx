import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { privateRequest } from "../../api/axios";
import { capitalizeFirstLetter } from "../../utils/string.js";

function LoginForm() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    if (value !== "") return setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleError = (e) => {
    const { name, value } = e.target;
    if (value === "")
      return setError((prev) => ({
        ...prev,
        [name]: `Please Enter ${capitalizeFirstLetter(name)}`,
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await privateRequest.post(
        "/auth/login",
        JSON.stringify(input)
      );
      setAuth(res.data);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login Form</h2>
      <div className="login-subcontainer">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={handleInput}
          onBlur={handleError}
        />
        <span>{error.username}</span>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleInput}
          onBlur={handleError}
        />
        <span>{error.password}</span>
        <button>LOGIN</button>
      </div>
    </form>
  );
}

export default LoginForm;
