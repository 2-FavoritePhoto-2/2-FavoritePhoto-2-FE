import styles from "./MyGalleryTitle.module.css";
import { useRouter } from "next/router";

export default function MyGalleryTitle() {
  const router = useRouter;

  return (
    <div className={styles.container}>
      <div className={styles.title_button}>
        <h1>마이 갤러리</h1>
        <button onClick={() => router.push("/myGallery/create")}>포토카드 생성하기</button>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
