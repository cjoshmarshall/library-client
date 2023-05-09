import React, { useContext, useState } from "react";
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
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      LoginForm
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        onChange={handleInput}
        onBlur={handleError}
      />
      {error.username}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={handleInput}
        onBlur={handleError}
      />
      {error.password}
      <button>LOGIN</button>
    </form>
  );
}

export default LoginForm;
