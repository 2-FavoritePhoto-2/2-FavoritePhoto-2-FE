import { useState } from "react";
import { useRouter } from "next/router";
import { login } from '@/lib/api/auth';
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import Input from '@/components/Common/Input/Input';
import styles from "@/styles/Login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log('로그인 성공:', data);
      router.push('/pocketPlace');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>로그인 페이지</title>
        <meta name="description" content="로그인 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src="/assets/logo.svg" width={337} height={75} alt="홈 로고" className={styles.logoImage} />
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
          <Input
            label="이메일"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해 주세요"
          />
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상 입력해 주세요"
            />
          </div>

          <button type="submit" className={styles.button}>
            로그인
          </button>
        </form>
        <p className={styles.loginText}>
          피카픽 포토가 처음이신가요?{" "}
          <Link href="/auth/signup" className={styles.link}>
            회원가입하기
          </Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;
