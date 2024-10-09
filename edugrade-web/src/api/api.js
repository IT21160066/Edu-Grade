import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the Bearer token to each request
instance.interceptors.request.use(
  (config) => {
    // Get the JWT token from cookies
    const token = Cookies.get("jwt");

    console.log("frontend token", token);
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
