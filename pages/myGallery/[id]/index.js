import styles from "@/styles/MyGalleryDetail.module.css";
import Link from "next/link";
import Image from "next/image";
import back from "@/public/assets/icon_back.svg";
import MyCardDetail from "@/components/Common/CardInfo/MyCardDetail";
import { getMyPhotoCard } from "@/lib/api/UserService";

export async function getServerSideProps(context) {
  try {
    const myCardId = context.params["id"];

    const myCard = await getMyPhotoCard(myCardId);

    return {
      props: {
        myCard,
      },
    };
  } catch (err) {
    console.error("데이터를 불러오는 중 문제가 발생하였습니다.", err.message);
    throw new Error("서버에서 데이터를 가져오는 중 문제가 발생했습니다." + err.message);
  }
}

export default function MyGalleryDetail({ myCard }) {
  return (
    <div className={styles.container}>
      <div className={styles.back_icon}>
        <Link href="/myGallery">
          <Image src={back} width={22} height={22} alt="뒤로가기 아이콘" />
        </Link>
      </div>
      <div className={styles.title}>
        <h1>{myCard.name}</h1>
        <div className={styles.line}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.img_wrap}>
          <Image className={styles.img} src={myCard.image} fill alt="카드 이미지" priority />
        </div>
        <MyCardDetail data={myCard} />
      </div>
    </div>
  );
}
