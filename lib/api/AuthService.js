import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('isLoggedIn');
          return Promise.reject(error);
        }
        
        const response = await api.post('/auth/token/refresh', {
          refreshToken: refreshToken
        });
        
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isLoggedIn');
    }
    throw error;
  }
};


// 토큰 재발급
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) {
    throw new Error('No refresh token');
  }
  
  try {
    const response = await api.post('/auth/token/refresh'
    //   , {
    //   refreshToken: refresh
    // }
    );
    return response.data;
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isLoggedIn');
    throw error;
  }
};
