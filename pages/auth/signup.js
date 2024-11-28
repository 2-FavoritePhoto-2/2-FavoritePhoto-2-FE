import { useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '@/lib/api/auth';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/components/Common/Input/Input';
import styles from '@/styles/Signup.module.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const router = useRouter();

    const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    //중복된 데이터 api 요청..?
    if (!formData.email || !formData.nickname) {
      alert('모든 칸을 채워주세요!!');
      return;
    }

    if (emailError || nicknameError) {
      alert('중복된 정보가 있습니다. 다시 확인해 주세요.');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.nickname);
      router.push('/auth/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>  
        <title>회원가입 페이지</title>
        <meta name="description" content="회원가입 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Link href="/" className={styles.homeLogo}>
        <Image src="/assets/logo.svg" width={375} height={75} alt="홈 로고" className={styles.logoImage} />
      </Link>
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
            label="닉네임"
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해 주세요"
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
          <div className={styles.inputContainer}>
            <Input
              label="비밀번호 확인"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 한번 더 입력해 주세요"
            />
          </div>
          
          <button type="submit" className={styles.button}>가입하기</button>
        </form>
        <p className={styles.signupText}>
          이미 피카픽 포토 회원이신가요?{' '}
          <Link href="/auth/login" className={styles.link}>
            로그인하기
          </Link>
        </p>
      </main>
    </div>
  );
} 