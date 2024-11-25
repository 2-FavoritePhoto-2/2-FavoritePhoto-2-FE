import '@/styles/globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

const noto = Noto_Sans_KR({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>피카픽포토</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={noto.className}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
