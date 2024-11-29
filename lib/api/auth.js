import axios from "axios";

const api = axios.create({
  baseURL: "https://pikapick.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 로컬 스토리지에서 액세스 토큰 가져오기
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 회원가입 
export const signup = async (email, password, nickname) => {
  try {
    const response = await api.post('/auth/signup', {
      email,
      password,
      nickname,
    });
    console.log('회원가입 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('회원가입 에러:', error.response?.data || error.message);
    throw error;
  }
};

// 로그인 
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    console.log('로그인 성공:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
    }
    throw error;
  }
};

// 내 프로필 조회
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile'); 
    return response.data; // 프로필 정보 반환
  } catch (error) {
    throw error; 
  }
};

// 토큰 재발급
export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/token/refresh');
    return response.data;
  } catch (error) {
    console.error('토큰 재발급 에러:', error.response?.data || error.message);
    throw error;
  }
};

const authApi = {
  signup,
  login,
  getUserProfile,
  refreshToken,
};

export default authApi;