import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/string.js";
import { privateRequest } from "../../api/axios";

function SignupForm() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    admin: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    type: "",
  });

  const { setAuth } = useContext(AuthContext);

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
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      SignupForm
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        onChange={handleInput}
        onBlur={handleError}
      />
      {error.name}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        onChange={handleInput}
        onBlur={handleError}
      />
      {error.email}
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
      <label htmlFor="type">TYPE</label>
      <select name="type" id="type" onChange={handleInput}>
        <option value="MEMBER">Member</option>
        <option value="LIBRARIAN">Librarian</option>
      </select>
      <button>Submit</button>
    </form>
  );
}

export default SignupForm;
