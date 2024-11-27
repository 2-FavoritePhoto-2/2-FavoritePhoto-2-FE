import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Landing.module.css";
import pick from "@/public/assets/pick.gif";

export default function Landing() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/auth/login");
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
        <button className={styles.home_button} onClick={handleButtonClick}>
          로그인하러가기
        </button>
      </div>
    </>
  );
}
