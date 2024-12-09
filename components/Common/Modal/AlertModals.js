import styles from './AlertModals.module.css';
import { updateNotification } from '@/lib/api/AlarmService';
import Image from 'next/image';
import backIcon from '@/public/assets/icon_back.svg';
import { getAccessToken } from '@/lib/utils/token';

const AlertModals = ({ notifications, onUpdate, onClose }) => {

  const handleNotificationClick = async (notificationId) => {
    if (!notificationId) return;

    const token = getAccessToken();
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

    if (hours < 24) {
      return `${hours}시간 전`;
    }

    if (days < 7) {
      return `${days}일 전`;
    }

    if (weeks <= 3) {
      return `${weeks}주일 전`;
    }

    if (months < 12) {
      return `${months}개월 전`;
    }

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
  const isMobile = window.innerWidth <= 743;
  const displayNotifications = notifications;
  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertList}>
        <div className={styles.mobileHeader}>
          <Image
            src={backIcon}
            alt="뒤로가기"
            width={24}
            height={24}
            className={styles.backButton}
            onClick={onClose}
          />
          <span className={styles.headerTitle}>알림</span>
        </div>
        {displayNotifications.map((notification) => (
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