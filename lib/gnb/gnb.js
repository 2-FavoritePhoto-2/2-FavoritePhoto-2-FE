"use client"
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from 'next/link';

import styles from './gnb.module.css';

const GlobalNavigationBar = ({   isLoggedin , points, nickname, handleAuthChange  }) => {
  return (
    <div className={styles.globalNavigationBar_container}>
      <Link href="/" className={styles.homeLogo}>
          <Image src="/assets/logo.svg" width={100} height={100} alt="홈 로고" className={styles.logoImage} />
        </Link>

        <div className={styles.menu_container}>
        <Image src="/assets/icon_menu.svg" width={100} height={100} alt="메뉴" className={styles.menuIcon} />

        {  isLoggedin  ? (
          <>
            <span className={styles.points}>{Number(points).toLocaleString()} P</span>
            <Image src="/assets/icon_alarm.svg" width={24} height={24} alt="알림" className={styles.bellIcon} />
            <span className={styles.nickname}>{nickname}</span>
            <span className={styles.separator}></span>

            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleAuthChange(); // 인증 상태 변경 함수 호출
              }}
              className={styles.logoutButton}
            >
              로그아웃
            </Link>
          </>

        ) : (
          <>
            <Link href="/login" className={styles.loginLink}>
              로그인
            </Link>
            <Link href="/signup" className={styles.signupLink}>
              회원가입
            </Link>
          </>
        )}
      </div>
  </div>
  );
};

export default GlobalNavigationBar;