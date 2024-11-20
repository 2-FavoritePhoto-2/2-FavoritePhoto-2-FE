import styles from "@/styles/MyGalleryDetail.module.css";
import Image from "next/image";
import test from "@/public/assets/box_blue.svg";
import MyCardDetail from "@/components/Common/CardInfo/MyCardDetail";

export default function MyGalleryDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>귀여운 피카츄</h1>
        <div className={styles.line}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.img_wrap}>
          <Image src={test} fill alt="카드 이미지" priority />
        </div>
        <MyCardDetail />
      </div>
    </div>
  );
}
