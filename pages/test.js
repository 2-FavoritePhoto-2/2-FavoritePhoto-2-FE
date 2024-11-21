import Gnb from '../lib/gnb/gnb.js';
import { useState } from "react";

export default function TestPage() {
  // 테스트용 데이터 true false
  const [isLoggedIn , setIsLoggedIn ] = useState(true); // 로그인 여부
  const points = 1540; // 보유 포인트
  const nickname = '유디'; // 닉네임


  const handleAuthChange = () => {
    // 로그인/로그아웃 상태 전환
    if ( isLoggedin ) {
      console.log("로그아웃되었습니다.");
      setIsLoggedIn (false); 
    } else {
      console.log("로그인되었습니다.");
      setIsLoggedIn (true);
    }
  };

  return (
  
    <>
      <Gnb isLoggedIn={isLoggedIn} points={points} nickname={nickname} handleAuthChange={handleAuthChange} />

      <main style={{ padding: '2rem' }}>
        <h1>GNB 테스트 페이지</h1>
        <p>이 페이지는 GNB 테스트를 위해 만들어졌습니다.</p>
      </main>
    </>
  );
}