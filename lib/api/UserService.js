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
export async function createPhotoCard(card) {
  const res = await post(`/user/cards`, card);
  return res.data;
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
