import { useEffect } from "react";
import { privateRequest } from "../api/axios";
import useAuth from "./useAuth";
import useRefresh from "./useRefresh";

function usePrivate() {
  const refresh = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = privateRequest.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // const responseIntercept = privateRequest.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const prevRequest = error?.config;
    //     if (error?.response?.status === 403 && !prevRequest?.sent) {
    //       prevRequest.sent = true;
    //       const newAccessToken = await refresh();
    //       prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    //       return privateRequest(prevRequest);
    //     }
    //     return Promise.reject(error);
    //   }
    // );

    const responseIntercept = privateRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return privateRequest(prevRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateRequest.interceptors.request.eject(requestIntercept);
      privateRequest.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return privateRequest;
}

export default usePrivate;
