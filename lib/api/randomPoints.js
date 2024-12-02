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
    const response = await api.post('/points/box', null);
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return { error: '1시간 이내에 이미 뽑았습니다.' };
        case 401:
          return { error: '로그인이 필요한 서비스입니다.' };
        case 429:
          return { error: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.' };
        default:
          return { error: '랜덤 포인트 획득에 실패했습니다.' };
      }
    }
    return { error: '서버와의 연결이 원활하지 않습니다.' };
  }
};

// 유저 랜덤상자 뽑은 시간 조회
export const fetchLastDrawTime = async () => {
  try {
    const response = await api.get('/points/last-draw-time');
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return { error: '로그인이 필요한 서비스입니다.' };
        default:
          return { error: '마지막 뽑기 시간 조회에 실패했습니다.' };
      }
    }
    return { error: '서버와의 연결이 원활하지 않습니다.' };
  }
};