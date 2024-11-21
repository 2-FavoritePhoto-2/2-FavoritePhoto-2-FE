import styles from "@/styles/MyGalleryDetail.module.css";
import Image from "next/image";
import MyCardDetail from "@/components/Common/CardInfo/MyCardDetail";
import data from "@/public/mockData.json";

export default function MyGalleryDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{data[15].name}</h1>
        <div className={styles.line}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.img_wrap}>
          <Image className={styles.img} src={data[15].image} fill alt="카드 이미지" priority />
        </div>
        <MyCardDetail data={data[15]} />
      </div>
    </div>
  );
}
