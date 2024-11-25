import axios from "axios";

const instance = axios.create({
  baseURL: "https://pikapick.onrender.com",
});

export default instance;
