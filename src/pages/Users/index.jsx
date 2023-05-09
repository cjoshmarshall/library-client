import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "../../api/axios";
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
        if (
          err?.response?.data === "Forbidden" ||
          err?.response?.data === "Unauthorized"
        ) {
          if (location.key === "default") return navigate("/");
          navigate(-1);
        }
      }
    };
    getUsers();
  }, []);

  return (
    <>
      {users.map((user) => (
        <Fragment key={user._id}>
          <div>{user.name}</div>
          <div>{user.username}</div>
          <div>{user.email}</div>
        </Fragment>
      ))}
    </>
  );
}

export default Users;
