import axios from "axios";

const instance = axios.create({
  baseURL: "https://pikapick.onrender.com",
  // "http://localhost:3100",
});

export const getCards = async (url, params = {}, method = "GET") => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const config = {
      url,
      method,
      headers,
      params: method === "GET" || method === "DELETE" ? params : {},
      data: method !== "GET" && method !== "DELETE" ? params : undefined,
    };

    const response = await instance.request(config);

    return response.data;
  } catch (error) {
    console.error("API 에러", error.response?.data || error.message);
    throw error;
  }
};
