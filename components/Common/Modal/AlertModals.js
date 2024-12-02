import { useState } from 'react';
import styles from './AlertModals.module.css';

const AlertModals = ({ notifications, accessToken }) => {

  const handleNotificationClick = async (notificationId) => {
    if (!notificationId) return;

    await updateNotification(notificationId, accessToken);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks}주일 전`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths}개월 전`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}년 전`;
  };

  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertList}>
      {notifications.map((notification) => (
        <>
          <div 
            key={notification.id} 
            className={`${styles.alertItem} ${!notification.isRead ? styles.unread : ''}`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div className={`${styles.alertType} ${styles[notification.type?.toLowerCase()] || ''}`}>
              {notification.type}
            </div>
            <p className={styles.alertMessage}>{notification.message}</p>
            <span className={styles.alertTime}>
              {formatTimeAgo(notification.createdAt)}
            </span>
          </div>
          <div className={styles.line}></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default AlertModals;