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
    const myCardList = await getMyPhotoCardList({ page: 1, pageSize: 9 });

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

  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 검색어 변경 시 처리 함수
  const handleSearch = async (keyword) => {
    setSearchTerm(keyword);
  };

  // 등급 필터 변경 처리 함수
  const handleGradeFilter = (grade) => {
    setGradeFilter(grade);
    setTypeFilter("");
  };

  // 속성 필터 변경 처리 함수
  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    setGradeFilter("");
  };

  // 필터와 검색어가 바뀔 때 데이터를 불러오는 함수
  const loadFilteredData = async (pageNumber = 1) => {
    try {
      const filters = [];

      if (searchTerm) filters.push({ type: "keyword", value: searchTerm });
      if (gradeFilter) filters.push({ type: "grade", value: gradeFilter });
      if (typeFilter) filters.push({ type: "type", value: typeFilter });

      const filteredResults = await getMyPhotoCardList({
        page: pageNumber,
        pageSize: 9,
        filterType: filters[0].type,
        filterValue: filters[0].value,
      });

      if (pageNumber === 1) {
        setMyCards(filteredResults.card || []);
        setHasMore(filteredResults.card.length === 9);
        setPage(2);
      } else {
        setMyCards((prevCards) => [...prevCards, ...filteredResults.card]);
        setHasMore(filteredResults.card.length === 9);
      }
    } catch (err) {
      console.error("필터링 중 오류 발생:", err);
    } finally {
      setLoading(false);
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
      loadFilteredData(page);
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 필터가 바뀔 때 데이터를 자동으로 새로 불러오기
  useEffect(() => {
    setPage(2);
    loadFilteredData(1);
  }, [searchTerm, gradeFilter, typeFilter]);

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
              <Rating sortType={handleGradeFilter} />
              <Attribute sortType={handleTypeFilter} />
            </div>
          </div>
        </div>
      </div>
      <MyGalleryList myCardList={myCards || []} />
    </div>
  );
}
