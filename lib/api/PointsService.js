import axios from "axios";
import { getAccessToken } from "@/lib/utils/token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
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
export const fetchLastDrawTime = async () => {
  try {
    const response = await api.get("/points/last-draw-time");
    return response.data.lastDrawTime; // 서버에서 받은 `lastDrawTime` 반환
  } catch (error) {
    return { error: '마지막 뽑기 시간 조회에 실패했습니다.' };
  }
};
