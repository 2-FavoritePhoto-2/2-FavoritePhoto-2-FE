import axios from "axios";

const api = axios.create({
  baseURL: "https://pikapick.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject('서버 연결에 실패했습니다.');
});

// 랜덤 포인트 획득
export const fetchRandomPoints = async () => {
  try {
    const response = await api.post('/points/box');
    return response.data;
  } catch (error) {
    return { error };
  }
};

// 유저 랜덤상자 뽑은 시간 조회
export const getLastDrawTime = () => {
  // 테스트용: 마지막 뽑기 시간
  return new Date();
};