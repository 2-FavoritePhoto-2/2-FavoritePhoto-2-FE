import axios from 'axios';

const api = axios.create({
  baseURL: "https://pikapick.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchNotifications = async (accessToken) => {
  try {
    const response = await api.get('/notifications', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('알림 API 에러', error.response || error);
    return [];
  }
};

export const updateNotification = async (notificationId, accessToken) => {
  try {
    const response = await api.patch(`/notifications/${notificationId}`, { isRead: true }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error);
    return null;
  }
};