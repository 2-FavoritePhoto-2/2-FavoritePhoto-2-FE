import axios from "axios";
import { getAccessToken } from "@/lib/utils/token";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const createCardSale = async (saleData) => {
  try {

    const response = await instance.post('/shop', {
      price: saleData.price,
      quantity: saleData.quantity,
      exchangeGrade: saleData.exchangeGrade,
      exchangeType: saleData.exchangeType,
      exchangeDetails: saleData.exchangeDetails,
      cardId: saleData.cardId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};