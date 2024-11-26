import styles from "@/styles/MyGallery.module.css";
import MyGalleryTitle from "@/components/MyGallery/MyGalleryTitle";
import MyOwnedCards from "@/components/MyGallery/MyOwnedCards";
import MyGalleryList from "@/components/MyGallery/MyGalleryList";
import MultiFilterModal from "@/components/Common/Modal/MultiFilter";
import SearchBar from "@/components/Common/SearchBar/SearchBar";
import Rating from "@/components/Common/Dropdown/Sort/Rating";
import Attribute from "@/components/Common/Dropdown/Sort/Attribute";
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
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어 변경 시 처리 함수
  const handleSearch = async (keyword) => {
    setSearchTerm(keyword);

    try {
      const filter = {
        type: "keyword",
        value: keyword,
      };

      const searchResults = await getMyPhotoCardList({
        page: 1,
        pageSize: 9,
        filter,
      });

      setMyCards(searchResults.card || []);
      setHasMore(searchResults.card.length === 9);
      setPage(2);
    } catch (err) {
      console.error("검색 중 오류 발생:", err);
    }
  };

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
        keyword: searchTerm,
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
        <div className={styles.filter}>
          <div className={styles.line}></div>
          <div className={styles.search_filters}>
            <div className={styles.mobile_filter}>
              <MultiFilterModal filterKeys={["등급", "속성"]} />
            </div>
            <div className={styles.search}>
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.filters}>
              <Rating />
              <Attribute />
            </div>
          </div>
        </div>
      </div>
      <MyGalleryList myCardList={myCards || []} />
    </div>
  );
}
