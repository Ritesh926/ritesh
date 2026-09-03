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
  if (url.startsWith("http")) return url;
  const origin = import.meta.env.VITE_API_ORIGIN || "";
  return `${origin}${url}`;
}

export default api;
