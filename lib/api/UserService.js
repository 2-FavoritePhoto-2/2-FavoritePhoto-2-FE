import axios from "axios";
import { getAccessToken } from "@/lib/utils/token";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {},
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

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

// 상점에 등록한 포토 카드 전체 개수
export async function getSaleListCount() {
  const res = await get("/user/my-cards/sales");
  return res.data.totalCount;
}

// 상점에 등록한 포토 카드 목록 조회
export async function getSaleList({ page, pageSize, grade, type, mode, available, keyword }) {
  const params = {
    page,
    pageSize,
    grade,
    type,
    mode,
    available,
    keyword,
    orderBy: "newest",
  };

  const res = await get("/user/my-cards/sales", params);
  return res.data;
}

// 포토 카드 등록
export async function createPhotoCard(formData) {
  try {
    const res = await post("/user/cards", formData);
    console.log(formData);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error("Error response:", err.response);
      console.error("Error response status:", err.response.status);
      console.error("Error response data:", err.response.data);
    } else if (err.request) {
      console.error("Error request:", err.request);
    } else {
      console.error("Error message:", err.message);
    }
    throw err;
  }
}

// 구매한 내 포토 카드 전체 개수
export async function getMyPhotoCardListCount() {
  const res = await get(`/user/cards`);
  return res.data.totalCount;
}

// 구매한 내 포토 카드 전체 조회
export async function getMyPhotoCardList({ page, pageSize, grade, type, keyword }) {
  const params = {
    page,
    pageSize,
    grade,
    type,
    keyword,
    orderBy: "newest",
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
  getSaleListCount,
  getSaleList,
  createPhotoCard,
  getMyPhotoCardListCount,
  getMyPhotoCardList,
  getMyPhotoCard,
};

export default users;
