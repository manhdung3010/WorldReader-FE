import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    if (error.response?.status === 400) {
      const responseData = error.response.data;
      if (
        responseData?.message &&
        responseData.message.includes("Token not found")
      ) {
        Cookies.remove("accessToken");
        if (typeof window !== "undefined") {
          window.location.replace("/login");
        }
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosClient;
