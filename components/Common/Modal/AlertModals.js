import { useState } from 'react';
import styles from './AlertModals.module.css';
import { updateNotification } from '@/lib/api/notifications';

const AlertModals = ({ notifications, accessToken, onUpdate }) => {

  const handleNotificationClick = async (notificationId) => {
    if (!notificationId) return;

    const token = localStorage.getItem('accessToken');
  if (!token) return;

    const updatedNotification = await updateNotification(notificationId, token);
    if (updatedNotification) {
      onUpdate(); 
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // 1시간~23시간
    if (hours < 24) {
      return `${hours}시간 전`;
    }

    // 24시간~6일
    if (days < 7) {
      return `${days}일 전`;
    }

    // 7일~3주
    if (weeks <= 3) {
      return `${weeks}주일 전`;
    }

    // 4주~11개월
    if (months < 12) {
      return `${months}개월 전`;
    }

    // 12개월 이상
    return `${years}년 전`;
  };

  if (!notifications || notifications.length === 0) {
    return (
      <div className={styles.alertContainer}>
        <div className={styles.emptyAlert}>
        </div>
      </div>
    );
  }
  const recentNotifications = notifications.slice(0, 10);

  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertList}>
        {recentNotifications.map((notification) => (
          <div key={notification.id}>
            <div 
              className={`${styles.alertItem} ${notification.isRead ? styles.read : ''}`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className={`${styles.alertType} ${styles[notification.type?.toLowerCase()] || ''}`}>
                {notification.type}
              </div>
              <p className={styles.alertMessage}>{notification.content}</p>
              <span className={styles.alertTime}>
                {formatTimeAgo(notification.createdAt)}
              </span>
            </div>
            <div className={styles.line}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertModals;