import styles from "@/styles/MyGallery.module.css";
import Image from "next/image";
import resetIcon from "@/public/assets/icon_exchange.svg";
import MyGalleryTitle from "@/components/MyGallery/MyGalleryTitle";
import MyOwnedCards from "@/components/MyGallery/MyOwnedCards";
import MyGalleryList from "@/components/MyGallery/MyGalleryList";
import MultiFilterModal from "@/components/Common/Modal/MultiFilter";
import SearchBar from "@/components/Common/SearchBar/SearchBar";
import Rating from "@/components/Common/Dropdown/Sort/Rating";
import Attribute from "@/components/Common/Dropdown/Sort/Attribute";
import { getMyPhotoCardList, getUserProfile } from "@/lib/api/UserService";
import { useState, useEffect } from "react";

export default function MyGallery() {
  const [myCards, setMyCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [page, setPage] = useState(1);

  const [gradeReset, setGradeReset] = useState(false);
  const [typeReset, setTypeReset] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filterCounts, setFilterCounts] = useState({
    grade: {},
    type: {},
  });

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchProfile = await getUserProfile();
        setProfile(fetchProfile);
      } catch (err) {
        console.error("프로필 정보를 불러오는데 실패했습니다.", err);
      }
    };

    fetchData();
  }, []);

  // 검색어 변경 시 처리 함수
  const handleSearch = async (keyword) => {
    setSearchTerm(keyword);
  };

  // 등급 필터 변경 처리 함수
  const handleGradeFilter = (grade) => {
    setGradeFilter(grade);
    setTypeFilter("");

    setGradeReset(false);
    setTypeReset(true);
  };

  // 속성 필터 변경 처리 함수
  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    setGradeFilter("");

    setTypeReset(false);
    setGradeReset(true);
  };

  // 멀티 필터 변경 처리 함수
  const handleFilterChange = (filterType, value) => {
    if (filterType === "grade") {
      setGradeFilter(value);
      setTypeFilter("");
    } else if (filterType === "type") {
      setTypeFilter(value);
      setGradeFilter("");
    }
  };

  // 필터 리셋 처리 함수
  const handleFilterReset = () => {
    setGradeFilter("");
    setTypeFilter("");
    setGradeReset(true);
    setTypeReset(true);

    setTimeout(() => {
      setGradeReset(false);
      setTypeReset(false);
    }, 1000);
  };

  // 필터와 검색어가 바뀔 때 데이터를 불러오는 함수
  const loadFilteredData = async () => {
    try {
      setLoading(true);

      const res = await getMyPhotoCardList({ page: 1 });
      const filteredResults = await getMyPhotoCardList({
        page: 1,
        pageSize: res.totalCount,
        grade: gradeFilter,
        type: typeFilter,
        keyword: searchTerm,
      });

      setFilteredCards(filteredResults.card || []);

      const newFilterCounts = {
        grade: {},
        type: {},
      };

      filteredResults.card.forEach((card) => {
        const { grade, type } = card;

        newFilterCounts.grade[grade] = (newFilterCounts.grade[grade] || 0) + 1;
        newFilterCounts.type[type] = (newFilterCounts.type[type] || 0) + 1;
      });

      setFilterCounts(newFilterCounts);

      setMyCards(filteredResults.card.slice(0, 9));
      setHasMore(filteredResults.card.length > 9);
    } catch (err) {
      console.error("필터링 중 오류 발생:", err);
    } finally {
      setLoading(false);
    }
  };

  // 페이지네이션을 위한 데이터 로드
  const loadMoreCards = async () => {
    const startIdx = myCards.length;

    if (startIdx >= filteredCards.length) {
      setHasMore(false);
      return;
    }

    const nextCards = filteredCards.slice(startIdx, startIdx + 9);
    setMyCards((prevCards) => [...prevCards, ...nextCards]);
    setLoading(false);
  };

  useEffect(() => {
    if (page > 1) {
      loadMoreCards();
    }
  }, [page]);

  // 스크롤 이벤트 처리 함수
  const handleScroll = () => {
    if (loading || !hasMore) return;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 필터가 바뀔 때 데이터를 자동으로 새로 불러오기
  useEffect(() => {
    setPage(1);
    setMyCards([]);
    loadFilteredData();
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
        <MyOwnedCards myCardList={filteredCards || []} profile={profile} />
        <div className={styles.filter}>
          <div className={styles.line}></div>
          <div className={styles.search_filters}>
            <div className={styles.mobile_filter}>
              <MultiFilterModal
                filterKeys={["등급", "속성"]}
                onFilterChange={handleFilterChange}
                filterCounts={filterCounts}
                reset={() => {
                  setGradeFilter("");
                  setTypeFilter("");
                }}
              />
            </div>
            <div className={styles.search}>
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.filters}>
              <Rating sortType={handleGradeFilter} reset={gradeReset} />
              <Attribute sortType={handleTypeFilter} reset={typeReset} />
              <Image
                src={resetIcon}
                width={24}
                height={24}
                onClick={handleFilterReset}
                alt="리셋 아이콘"
              />
            </div>
          </div>
        </div>
      </div>
      <MyGalleryList myCardList={myCards || []} profile={profile} />
    </div>
  );
}
