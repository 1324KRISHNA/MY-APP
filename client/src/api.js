import axios from "axios";

const API = axios.create({ baseURL: "/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const getProfile = () => API.get("/auth/profile");

// Outbreaks
export const getOutbreaks = (params) => API.get("/outbreaks", { params });
export const getOutbreak = (id) => API.get(`/outbreaks/${id}`);
export const createOutbreak = (data) => API.post("/outbreaks", data);
export const updateOutbreak = (id, data) => API.put(`/outbreaks/${id}`, data);
export const deleteOutbreak = (id) => API.delete(`/outbreaks/${id}`);
export const getStats = () => API.get("/outbreaks/stats");
export const getTrends = () => API.get("/outbreaks/trends");

export default API;
