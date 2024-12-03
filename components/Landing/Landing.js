import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Landing.module.css";
import pick from "@/public/assets/pick.gif";

export default function Landing() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/auth/login");
  };

  const images = [
    "/assets/피카츄.png",
    "/assets/이브이.png",
    "/assets/꼬부기.png",
    "/assets/나옹이.png",
    "/assets/고라파덕.png",
    "/assets/푸린.png",
    "/assets/이상해씨.png",
    "/assets/파이리.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3초마다 이미지 변경

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 정리
  }, []);

  return (
    <>
      <div className={styles.home_container}>
        <div className={styles.wrap}>
          <h1 className={styles.home}>
            <span>피카</span>
            <div className={styles.pick_wrapper}>
              <Image src={pick} alt="로고이미지" layout="responsive" width={200} height={200} />
            </div>
            <span>포토</span>
          </h1>
          <div className={styles.img_wrap}>
            <Image src={images[currentIndex]} fill alt="슬라이드 이미지" className="slider-image" />
          </div>
        </div>
        <h1>다양한 포켓몬 카드를 구입하거나 교환할 수 있어요!</h1>
        <h1>본인 만의 사진첩을 꾸며보세요!</h1>
        <button className={styles.home_button} onClick={handleButtonClick}>
          로그인하러가기
        </button>
      </div>
    </>
  );
}
