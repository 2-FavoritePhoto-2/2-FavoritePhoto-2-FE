import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../components/Common/Profile/Profile.module.css';  // 스타일 경로 확인

export default function TestPage() {
  // 테스트용 데이터 true false
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 여부
  const points = 1540; // 보유 포인트
  const nickname = '유디'; // 닉네임


  const handleAuthChange = () => {
    // 로그인/로그아웃 상태 전환
    if ( isLoggedIn ) {
      console.log("로그아웃되었습니다.");
      setIsLoggedIn (false); 
    } else {
      console.log("로그인되었습니다.");
      setIsLoggedIn (true);
    }
  };


  return (
    <h1>테스트 페이지</h1>
  );
};
