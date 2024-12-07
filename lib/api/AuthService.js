import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeTokens
} from "@/lib/utils/token";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 로컬 스토리지에서 액세스 토큰 가져오기
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          removeTokens();
          localStorage.removeItem('isLoggedIn');
          return Promise.reject(error);
        }

        const response = await api.post('/auth/token/refresh', {
          refreshToken: refreshToken
        });

        const { accessToken } = response.data;
        setAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        removeTokens();
        localStorage.removeItem('isLoggedIn');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// 회원가입 
export const signup = async (email, password, nickname) => {
  try {
    const response = await api.post('/auth/signup', {
      email,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// 로그인 
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// 내 프로필 조회
export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      removeTokens();
      localStorage.removeItem('isLoggedIn');
    }
    throw error;
  }
};


// 토큰 재발급
export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/token/refresh');
  } catch (error) {
    throw new Error('토큰 재발급에 실패했습니다!');
  }
};

