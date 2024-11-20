import '@/styles/globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import GlobalNavigationBar from '@/lib/gnb/gnb';

const noto = Noto_Sans_KR({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {

    // 테스트용 데이터
    const isLoggedIn = true; // 로그인 여부
    const points = 1540; // 보유 포인트
    const nickname = '유디'; // 닉네임

    // 로그아웃 처리
    const onLogout = () => {
      console.log("로그아웃 처리");
    //로그아웃 로직 추가하겠습니다
    }


  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>피카픽포토</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <div className={noto.className}>
        <GlobalNavigationBar
          isLoggedIn={isLoggedIn}
          points={points}
          nickname={nickname}
          onLogout={onLogout}
          />

          <Component {...pageProps} />
        </div>
    </QueryClientProvider>
  );
}
