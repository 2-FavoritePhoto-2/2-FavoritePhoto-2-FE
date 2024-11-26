import styles from "@/styles/MyGallery.module.css";
import MyGalleryTitle from "@/components/MyGallery/MyGalleryTitle";
import MyOwnedCards from "@/components/MyGallery/MyOwnedCards";
import MyGalleryFilter from "@/components/MyGallery/MyGalleryFilter";
import MyGalleryList from "@/components/MyGallery/MyGalleryList";
import { getMyPhotoCardList } from "@/lib/api/UserService";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  try {
    const myCardList = await getMyPhotoCardList({ page: 1, pageSize: 9, keyword: "" });

    return {
      props: {
        myCardList,
      },
    };
  } catch (err) {
    console.error("데이터를 불러오는 중 문제가 발생하였습니다.", err);
    throw new Error("서버에서 데이터를 가져오는 중 문제가 발생했습니다." + err.message);
  }
}

export default function MyGallery({ myCardList }) {
  const [myCards, setMyCards] = useState(myCardList.card || []);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 스크롤 이벤트 처리 함수
  const handleScroll = () => {
    if (loading || !hasMore) return;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true);
      loadMoreData();
    }
  };

  // 추가 데이터 불러오기 함수
  const loadMoreData = async () => {
    try {
      const newCardList = await getMyPhotoCardList({
        page,
        pageSize: 9,
        filter: "",
        keyword: "",
      });

      if (newCardList.card.length > 0) {
        setMyCards((prevCards) => [...prevCards, ...newCardList.card]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("데이터를 불러오는 중 에러가 발생했습니다.", err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MyGalleryTitle />
        <MyOwnedCards myCardList={myCards || []} />
        <MyGalleryFilter />
      </div>
      <MyGalleryList myCardList={myCards || []} />
    </div>
  );
}
