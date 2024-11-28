import styles from "./MyShopTitle.module.css";
import Link from "next/link";
import Image from "next/image";
import back from "@/public/assets/icon_back.svg";

export default function MyShopTitle() {
  return (
    <div className={styles.container}>
      <div className={styles.back_icon}>
        <Link href="/pocketPlace">
          <Image src={back} width={22} height={22} alt="뒤로가기 아이콘" />
        </Link>
      </div>
      <h1 className={styles.title}>나의 판매 포토카드</h1>
      <div className={styles.line}></div>
    </div>
  );
}
