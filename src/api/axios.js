import axios from "axios";

const BASE_URL = "http://localhost:3006/api";

export const request = axios.create({
  baseURL: BASE_URL,
});

// export const request = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
