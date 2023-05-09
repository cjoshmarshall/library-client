import React, { useContext, useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Signin() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formChange, setFormChange] = useState(false);

  const handleFormChange = (e) => {
    const { name } = e.target;
    if (name === "login") return setFormChange(false);
    else return setFormChange(true);
  };

  useEffect(() => {
    if (auth) {
      navigate(+1);
    }
  }, [auth]);

  return (
    <>
      <button name="login" onClick={handleFormChange}>
        Login
      </button>
      <button name="signup" onClick={handleFormChange}>
        Signup
      </button>
      <div>{!formChange ? <LoginForm /> : <SignupForm />}</div>
    </>
  );
}

export default Signin;
