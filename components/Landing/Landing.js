import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Landing.module.css";
import pick from "@/public/assets/pick.gif";

export default function Landing() {
  const router = useRouter();

  const handleLoginButtonClick = () => {
    // 로컬 스토리지에서 액세스 토큰 확인
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // 액세스 토큰이 있으면 페이지 목록으로 이동
      router.push("/pocketPlace");
    } else {
      router.push("/auth/login");
    }
  };

  const handlePocketPlaceButtonClick = () => {
    router.push("/pocketPlace");
  };

  return (
    <>
      <div className={styles.home_container}>
        <h1 className={styles.home}>
          <span>피카</span>
          <div className={styles.pick_wrapper}>
            <Image src={pick} alt="로고이미지" layout="responsive" width={200} height={200} />
          </div>
          <span>포토</span>
        </h1>
        <button className={styles.home_button} onClick={handlePocketPlaceButtonClick}>
          포켓플레이스 구경하기
        </button>
        <button className={styles.home_button} onClick={handleLoginButtonClick}>
          로그인하러가기
        </button>
      </div>
    </>
  );
}
