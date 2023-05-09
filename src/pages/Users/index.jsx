import React, { useEffect, useState } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePrivate from "../../hooks/usePrivate";

function Users() {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const privateRequest = usePrivate();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await privateRequest.get("/users");
        setUsers(res.data);
      } catch (err) {
        if (err?.response?.data === "Forbidden") {
          if (location.key === "default") return navigate("/users");
          else return navigate(-1);
        }
        if (err?.response?.data === "Unauthorized") {
          navigate("/books");
        }
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="users-container">
        {users.map((user) => (
          <div className="users-subcontainer" key={user._id}>
            <div className="users-name">Name: {user.name}</div>
            <div className="users-volume">Username : {user.username}</div>
            <div className="users-status">Email : {user.email}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Users;
