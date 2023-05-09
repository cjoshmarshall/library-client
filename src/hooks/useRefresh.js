import { privateRequest } from "../api/axios";
import useAuth from "./useAuth";

function useRefresh() {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const res = await privateRequest.get("/auth/refresh");
    setAuth((prev) => ({
      ...prev,
      admin: res.data.admin,
      accessToken: res.data.accessToken,
    }));
    return res.data.accessToken;
  };
  return refresh;
}

export default useRefresh;
