import axios from "axios";

const api = axios.create({
  //baseURL: process.env.THE_NEWS_API_URL,
  baseURL: "http://localhost:8000",
});

export default api;
