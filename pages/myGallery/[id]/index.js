import styles from "@/styles/MyGalleryDetail.module.css";
import Link from "next/link";
import Image from "next/image";
import back from "@/public/assets/icon_back.svg";
import MyCardDetail from "@/components/Common/CardInfo/MyCardDetail";
import { getMyPhotoCard } from "@/lib/api/UserService";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MyGalleryDetail() {
  const router = useRouter();
  const cardId = router.query["id"];

  const [myCard, setMyCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cardId) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchCardData = await getMyPhotoCard(cardId);
        setMyCard(fetchCardData);
      } catch (err) {
        setError("상품 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!myCard) {
    return <div>카드를 찾을 수 없습니다.</div>;
  }

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
