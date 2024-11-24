import '@/styles/globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalNavigationBar from '@/lib/gnb/gnb';
import Head from 'next/head';
import { useState } from 'react';

const noto = Noto_Sans_KR({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const points = 1540; // 보유 포인트
  const nickname = "유디"; // 닉네임

  // 인증 상태 변경 함수
  const handleAuthChange = () => {
    setIsLoggedIn((prev) => !prev); // 로그인 상태 반전
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>피카픽포토</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={noto.className}>
        <GlobalNavigationBar 
        isLoggedin={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        points={points} 
        nickname={nickname} 
        handleAuthChange={handleAuthChange} 
        />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

