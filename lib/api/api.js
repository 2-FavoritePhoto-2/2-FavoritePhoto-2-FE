import axios from "axios";

const instance = axios.create({
  baseURL:
    // "https://pikapick.onrender.com",
    "http://localhost:3100",
});

export default instance;
