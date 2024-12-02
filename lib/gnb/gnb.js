"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from 'next/link';
import RandomBoxModal from "@/components/Common/RandomBox/RandomBoxModal";
import UserDrop from "@/components/Common/Profile/Profile";
import AlertModals from "@/components/Common/Modal/AlertModals";
import { fetchNotifications } from "../api/notifications";

import styles from './gnb.module.css';

const GlobalNavigationBar = ({ isLoggedin , setIsLoggedIn , points, nickname, handleAuthChange, accessToken  }) => {
  const [showRandomBoxModal, setShowRandomBoxModal] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false); 
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const getNotifications = async () => {
      const token = localStorage.getItem('accessToken');
  
      if (isLoggedin && token) {
        try {
          const data = await fetchNotifications(token);
          if (Array.isArray(data)) {
            setNotifications(data);
          } 
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    getNotifications();
  }, [isLoggedin]);

  const refreshNotifications = async () => {
    const token = localStorage.getItem('accessToken');
    if (isLoggedin && token) {
      try {
        const data = await fetchNotifications(token);
        if (Array.isArray(data)) {
          setNotifications(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const unreadNotifications = notifications.filter(notification => !notification.isRead);


  return (
    <div className={styles.globalNavigationBar_container}>
      <Link href="/" className={styles.homeLogo}>
          <Image src="/assets/logo.svg" width={100} height={100} alt="홈 로고" className={styles.logoImage} />
        </Link>

        <div className={styles.menu_container}>
        <Image src="/assets/icon_menu.svg" width={100} height={100} alt="메뉴" className={styles.menuIcon} />

        {isLoggedin ? ( 
          <>
            <span className={styles.points} onClick={() => setShowRandomBoxModal(true)}>
              {Number(points).toLocaleString()} P
            </span> 
            {showRandomBoxModal && (
              <RandomBoxModal 
                onClose={() => setShowRandomBoxModal(false)} 
                accessToken={accessToken} // accessToken 전달
              />
            )}

            <div className={styles.bellContainer}>
            <div onClick={() => setShowAlerts((prev) => !prev)}>
              <Image 
                src="/assets/icon_alarm.svg" 
                width={24} 
                height={24} 
                alt="알림" 
                className={styles.bellIcon} 
    
              />
              </div>
              {notifications.length > 0 && (
                <span className={styles.notificationCount} >{unreadNotifications.length}</span> 
              )}
              {showAlerts && (
                <AlertModals 
                  notifications={notifications}
                  accessToken={accessToken}
                  onUpdate={refreshNotifications}/>
              )}
            </div>

            <div className={styles.profile} style={{ position: 'relative' }}>
              <span className={styles.nickname} onClick={handleToggle}>
                {nickname}
              </span>
              {isOpen && (
                <UserDrop
                  nickname={nickname}
                  points={points}
                  handleAuthChange={handleLogout}
                  onClose={() => setIsOpen(false)} 
                />
              )}
            </div>
            
            <span className={styles.separator}></span>

            <button
              onClick={(e) => {
                e.preventDefault(); // 기본 동작 방지
                handleLogout(); // 로그아웃 처리
              }}
              className={styles.logoutButton}> 로그아웃 </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className={styles.loginLink}> 로그인 </Link>
            <Link href="/auth/signup" className={styles.signupLink}> 회원가입 </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default GlobalNavigationBar;