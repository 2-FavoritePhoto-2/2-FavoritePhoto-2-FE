// pages/login.js
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import Input from '@/components/Common/Input/Input';
import { useState } from "react";
import styles from "@/styles/Login.module.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직 추가..
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    // 이메일이나 닉네임이 비어 있으면 알림
    if (!formData.email || !formData.nickname) {
      alert('모든 칸을 채워주세요!!');
      return;
    }
  
    // 회원가입 로직 호출
    console.log('회원가입 데이터:', formData);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>회원가입 페이지</title>
        <meta name="description" content="회원가입 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src="/assets/logo.svg" width={337} height={75} alt="홈 로고" className={styles.logoImage} />
        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.inputContainer}>
          <Input
            label="이메일"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해 주세요"
          />
          </div>
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="8자 이상 입력해 주세요"
            />
          </div>

          <button type="submit" className={styles.button}>
            로그인
          </button>
        </form>
        <p className={styles.signupText}>
          피카픽 포토가 처음이신가요?{" "}
          <Link href="/auth/signup" className={styles.link}>
            회원가입하기
          </Link>
        </p>
      </main>
    </div>
  );
}
