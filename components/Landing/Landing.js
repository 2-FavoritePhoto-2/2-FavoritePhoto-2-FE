import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Landing.module.css";
import pick from "@/public/assets/pick.gif";
import homeBtn from "@/public/assets/btn_pika.png";

export default function Landing() {
  const router = useRouter();

  const handleLoginButtonClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/pocketPlace");
    } else {
      router.push("/auth/login");
    }
  };

  const handlePocketPlaceButtonClick = () => {
    router.push("/pocketPlace");
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_wrap}>
          <h1 className={styles.title}>
            <span>피카</span>
            <div className={styles.pick_wrapper}>
              <Image src={pick} alt="로고이미지" layout="responsive" width={200} height={200} />
            </div>
            <span>포토</span>
          </h1>
          <h1 className={styles.sub_title}>
            다양한 포켓몬 카드를 통해 본인 만의 사진첩을 꾸며보세요!
          </h1>
        </div>
        <div>
          <div className={styles.btn_wrap} onClick={() => router.push("/pocketPlace")}>
            <Image className={styles.btn} src={homeBtn} fill alt="피카츄 버튼" />
            <p>포켓플레이스 구경하기</p>
          </div>
          <div className={styles.login_wrap}>
            <p>나만의 사진첩을 만들고 싶다면?</p>
            <p className={styles.login} onClick={handleLoginButtonClick}>
              로그인
            </p>
          </div>
        </div>

        <div className={styles.slide_box}>
          <input type="radio" name="slide" id="slide01" checked />
          <input type="radio" name="slide" id="slide02" />
          <input type="radio" name="slide" id="slide03" />
          <ul className={styles.slide_list}>
            <li className={styles.slide_item}>
              <div>
                <label htmlFor="slide03" className={styles.left}></label>
                <label htmlFor="slide02" className={styles.right}></label>
                <div className={styles.img_wrap}>
                  <Image className={styles.img} src="/assets/랜딩01.gif" fill alt="소개 01" />
                </div>
              </div>
            </li>
            <li className={styles.slide_item}>
              <div>
                <label htmlFor="slide01" className={styles.left}></label>
                <label htmlFor="slide03" className={styles.right}></label>
                <div className={styles.img_wrap}>
                  <Image className={styles.img} src="/assets/랜딩02.gif" fill alt="소개 02" />
                </div>
              </div>
            </li>
            <li className={styles.slide_item}>
              <div>
                <label htmlFor="slide02" className={styles.left}></label>
                <label htmlFor="slide01" className={styles.right}></label>
                <div className={styles.img_wrap}>
                  <Image className={styles.img} src="/assets/랜딩03.gif" fill alt="소개 03" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
