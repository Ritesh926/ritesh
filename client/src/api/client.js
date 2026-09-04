import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("portfolio_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith("/admin") && !window.location.pathname.includes("/login")) {
      localStorage.removeItem("portfolio_token");
      window.location.assign("/admin/login");
    }
    return Promise.reject(error);
  }
);

export function mediaUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  let origin = import.meta.env.VITE_API_ORIGIN;
  if (!origin && import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.startsWith("http")) {
    try {
      origin = new URL(import.meta.env.VITE_API_URL).origin;
    } catch {
      origin = "";
    }
  }
  if (!origin) {
    origin = import.meta.env.DEV ? "http://localhost:5000" : "https://ritesh-wpda.onrender.com";
  }
  const cleanOrigin = origin.replace(/\/$/, "");
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${cleanOrigin}${cleanPath}`;
}

export default api;
