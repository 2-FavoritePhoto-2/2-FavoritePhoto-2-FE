import { useState } from "react";
import { useRouter } from "next/router";
import { login } from '@/lib/api/auth';
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import Input from '@/components/Common/Input/Input';
import styles from "@/styles/Login.module.css";
import { setAccessToken, setRefreshToken } from '@/lib/utils/token';

const LoginPage = ({ setIsLoggedIn, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '이메일 형식이 아닙니다.';
    }
    if (!password) {
      newErrors.password = '비밀번호를 입력해 주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await login(email, password);
      const { accessToken, refreshToken } = response;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      handleLogin();
      router.push('/pocketPlace');
    } catch (error) {
      alert('로그인에 실패했습니다.\n이메일과 비밀번호를 다시 확인해주세요.');
      setEmail('');
      setPassword('');
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
      <Link href="/" className={styles.homeLogo}>
        <Image src="/assets/logo.svg" width={337} height={75} alt="홈 로고" className={styles.logoImage} />
        </Link>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <Input
              label="이메일"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해 주세요"
            />
            {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
            />
            {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
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