import Gnb from '../lib/gnb/gnb.js';

export default function TestPage() {
  
  // 테스트용 데이터 true false
  const isLoggedIn = true; // 로그인 여부
  const points = 1540; // 보유 포인트
  const nickname = '유디'; // 닉네임


  const handleLogout = () => {
    console.log('로그아웃되었습니다.');
  };

  return (
  
    <>
      <Gnb isLoggedIn={isLoggedIn} points={points} nickname={nickname} onLogout={handleLogout} />

      <main style={{ padding: '20px' }}>
        <h1>GNB 테스트 페이지</h1>
        <p>이 페이지는 GNB 테스트를 위해 만들어졌습니다.

        </p>
      </main>
    </>
  );
}