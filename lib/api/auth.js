import axios from "axios";

const api = axios.create({
  baseURL: "https://pikapick.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
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
  } catch (error) { if (error.response) {
    console.error('로그인 에러:', error.response.data);
    if (error.response.status === 401) {
      alert('잘못된 이메일 또는 비밀번호입니다.');
    } else {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  } else {
    console.error('네트워크 에러:', error.message);
    alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요!');
  }
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

// 이메일 중복 체크
export const checkEmailDuplicate = async (email) => {
  try {
    const response = await api.get('/user/check-email', {
      params: { email },
    });
    return response.data.isDuplicate;
  } catch (error) {
    console.error('이메일 중복 체크 에러:', error.response?.data || error.message);
    throw error;
  }
};

// 닉네임 중복 체크
export const checkNicknameDuplicate = async (nickname) => {
  try {
    const response = await api.get('/user/check-nickname', {
      params: { nickname },
    });
    return response.data.isDuplicate;
  } catch (error) {
    console.error('닉네임 중복 체크 에러:', error.response?.data || error.message);
    throw error;
  }
};