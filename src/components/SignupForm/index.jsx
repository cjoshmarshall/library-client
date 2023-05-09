import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/string.js";
import { privateRequest } from "../../api/axios";
import useAuth from "../../hooks/useAuth";

function SignupForm() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    admin: false,
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    type: "",
  });

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (value === "LIBRARIAN")
      return setInput((prev) => ({ ...prev, admin: true }));
    else if (value === "MEMBER")
      return setInput((prev) => ({ ...prev, admin: false }));
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
        "/auth/signup",
        JSON.stringify(input)
      );
      setAuth(res.data);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <h2>Signup Form</h2>
      <div className="signin-subcontainer">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleInput}
          onBlur={handleError}
        />
        <span>{error.name}</span>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          onBlur={handleError}
        />
        <span>{error.email}</span>
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
        <label htmlFor="type">TYPE</label>
        <select name="type" id="type" onChange={handleInput}>
          <option value="MEMBER">Member</option>
          <option value="LIBRARIAN">Librarian</option>
        </select>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default SignupForm;
