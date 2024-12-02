"use client"
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from 'next/link';
import RandomBoxModal from "@/components/Common/RandomBox/RandomBoxModal";
import UserDrop from "@/components/Common/Profile/Profile";
import AlertModals from "@/components/Common/Modal/AlertModals";

import styles from './gnb.module.css';

const GlobalNavigationBar = ({ isLoggedin , setIsLoggedIn , points, nickname, handleAuthChange, accessToken  }) => {
  const [showRandomBoxModal, setShowRandomBoxModal] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false); 
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // 추가 알림 데이터
  const notifications = [
    { message: "기며누님이 [RARE | 마자용]을 1장 구매 했습니다.", date: new Date() },
    { message: "예진쓰님이 [COMMON | 파치리스]의 포토카드 교환을 제안했습니다.", date: new Date() },
    { message: "[LEGENDARY | 스이쿤]이 품절되었습니다.", date: new Date() },
  ];

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
                <span className={styles.notificationCount} >{notifications.length}</span> 
              )}
              {showAlerts && (<AlertModals notifications={notifications} />)}
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