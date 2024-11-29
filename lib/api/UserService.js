import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("주의 : 에러 발생!", err);
    throw err;
  },
);

async function get(url, params = {}) {
  return instance.get(url, { params });
}

async function post(url, body) {
  return instance.post(url, body);
}

// 내 프로필 조회
export async function getUserProfile() {
  const res = await get(`/user/profile`);
  return res.data;
}

// 상점에 등록한 포토 카드 목록 조회
export async function getSaleList({ page, pageSize, grade, type, available, mode, keyword }) {
  const params = {
    page,
    pageSize,
    grade,
    type,
    available,
    mode,
    keyword,
  };

  const res = await get("/user/my-cards/sales", params);
  return res.data;
}

// 포토 카드 등록
export async function createPhotoCard(formData) {
  try {
    const res = await post("/user/cards", formData); // 요청 보내는 부분
    return res.data;
  } catch (err) {
    // 오류가 발생한 경우, 더 상세한 에러 출력
    if (err.response) {
      // 서버 응답을 받은 경우
      console.error("Error response:", err.response);
      console.error("Error response status:", err.response.status);
      console.error("Error response data:", err.response.data);
    } else if (err.request) {
      // 요청은 했지만 응답을 받지 못한 경우
      console.error("Error request:", err.request);
    } else {
      // 다른 에러가 발생한 경우
      console.error("Error message:", err.message);
    }
    throw err; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
}

// 구매한 내 포토 카드 전체 조회
export async function getMyPhotoCardList({ page, pageSize, grade, type, keyword }) {
  const params = {
    page,
    pageSize,
    grade,
    type,
    keyword,
  };

  const res = await get(`/user/cards`, params);
  return res.data;
}

// 구매한 내 포토 카드 상세 조회
export async function getMyPhotoCard(cardId) {
  const res = await get(`/user/cards/${cardId}`);
  return res.data;
}

const users = {
  getUserProfile,
  getSaleList,
  createPhotoCard,
  getMyPhotoCard,
};

export default users;
