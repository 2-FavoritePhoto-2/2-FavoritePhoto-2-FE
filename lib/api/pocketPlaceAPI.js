import axios from "axios";

const instance = axios.create({
  baseURL: "https://pikapick.onrender.com",
  // "http://localhost:3100",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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

    const details = saleData.selectedType2 
    ? `${saleData.exchangeDetails} (희망 교환 타입: ${saleData.exchangeType}, ${saleData.selectedType2})`
    : `${saleData.exchangeDetails} (희망 교환 타입: ${saleData.exchangeType})`;
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
    console.error( error.response?.data || error.message);
    throw error;
  }
};