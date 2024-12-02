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
    return [];
  }
};

export const updateNotification = async (notificationId, accessToken) => {
  try {
    const response = await api.patch(`/notifications/${notificationId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update notification:', error);
    return null;
  }
};