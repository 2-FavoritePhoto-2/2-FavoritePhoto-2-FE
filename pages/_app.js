import "@/styles/globals.css";
import { Noto_Sans_KR } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalNavigationBar from "@/lib/gnb/gnb";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import { getUserProfile } from "@/lib/api/auth"; 

const noto = Noto_Sans_KR({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [points, setPoints] = useState(0); 
  const [nickname, setNickname] = useState(""); 

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile(); 
      setPoints(profile.point); 
      setNickname(profile.nickname); 
    } catch (error) {
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('토큰 확인:', token); 
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(); 
    }
  }, []);

  // 로그인 성공 후 프로필 정보 가져오기...
  const handleLogin = async () => {
    setIsLoggedIn(true);
    await fetchUserProfile(); 
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
        />
        <div className="body_container">
          <Component {...pageProps} handleLogin={handleLogin} />
        </div> 
      </div>
    </QueryClientProvider>
  );
}
