import React, { useEffect } from "react";
import useRefresh from "../../hooks/useRefresh";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

function PersistRoute() {
  const refresh = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      }
    };
    verifyRefreshToken();
  }, []);

  return <Outlet />;
}

export default PersistRoute;
