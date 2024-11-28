"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import UserDrop from "@/components/Common/Profile/Profile";
import AlertModals from "@/components/Common/Modal/AlertModals";

import styles from "./gnb.module.css";

const GlobalNavigationBar = ({ isLoggedin, setIsLoggedIn, points, nickname, handleAuthChange }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    setIsLoggedIn(false); 
    router.push("/"); 
  };

  const notifications = [
    { message: "기며누님이 [RARE | 마자용]을 1장 구매 했습니다.", date: new Date() },
    { message: "예진쓰님이 [COMMON | 파치리스]의 포토카드 교환을 제안했습니다.", date: new Date() },
    { message: "[LEGENDARY | 스이쿤]이 품절되었습니다.", date: new Date() },
    // 추가 알림 데이터
  ];

  return (
    <div className={styles.globalNavigationBar_container}>
      <Link href="/" className={styles.homeLogo}>
        <Image
          src="/assets/logo.svg"
          width={100}
          height={100}
          alt="홈 로고"
          className={styles.logoImage}
        />
      </Link>

      <div className={styles.menu_container}>
        <Image
          src="/assets/icon_menu.svg"
          width={100}
          height={100}
          alt="메뉴"
          className={styles.menuIcon}
        />

        {isLoggedin ? (
          <>
            <span className={styles.points}>{Number(points).toLocaleString()} P</span>

            <div className={styles.bellContainer}>
              <Image
                src="/assets/icon_alarm.svg"
                width={24}
                height={24}
                alt="알림"
                className={styles.bellIcon}
                onClick={() => setShowAlerts((prev) => !prev)}
              />
              {notifications.length > 0 && (
                <span className={styles.notificationCount}>{notifications.length}</span>
              )}
              {showAlerts && <AlertModals notifications={notifications} />}
            </div>

            <span className={styles.nickname} onClick={() => setShowProfile((prev) => !prev)}>
              {nickname}
            </span>

            {showProfile && (
              <UserDrop
                nickname={nickname}
                points={points}
                handleAuthChange={handleAuthChange}
                onClose={() => setShowProfile(false)}
              />
            )}

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
            <Link href="/auth/login" className={styles.loginLink}>로그인</Link>
            <Link href="/auth/signup" className={styles.signupLink}>회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default GlobalNavigationBar;
