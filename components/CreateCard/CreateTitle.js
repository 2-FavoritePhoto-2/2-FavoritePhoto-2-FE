import Link from "next/link";
import Image from "next/image";
import back from "@/public/assets/icon_back.svg";
import styles from "./CreateTitle.module.css";

export default function CreateTitle() {
  return (
    <div className={styles.container}>
      <div className={styles.back_icon}>
        <Link href="/myGallery">
          <Image src={back} width={22} height={22} alt="뒤로가기 아이콘" />
        </Link>
      </div>
      <h1 className={styles.title}>포토카드 생성</h1>
      <div className={styles.line}></div>
    </div>
  );
}
