import { useRouter } from "next/router";
import styles from "./MyGalleryTitle.module.css";
import Link from "next/link";
import Image from "next/image";
import back from "@/public/assets/icon_back.svg";

export default function MyGalleryTitle() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.title_button}>
        <div className={styles.back_icon}>
          <Link href="/pocketPlace">
            <Image src={back} width={22} height={22} alt="뒤로가기 아이콘" />
          </Link>
        </div>
        <h1>마이 갤러리</h1>
        <button onClick={() => router.push("/myGallery/create")}>포토카드 생성하기</button>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
