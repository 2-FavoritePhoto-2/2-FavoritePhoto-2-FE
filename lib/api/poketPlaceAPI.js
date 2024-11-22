import axios from "axios";

const BASE_URL = "https://pikapick.onrender.com";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shop/cards`);
    return response.data.list;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
