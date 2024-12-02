import { useState, useEffect } from "react";
import { getSaleList } from "@/lib/api/UserService";
import styles from "@/styles/MyShop.module.css";
import Image from "next/image";
import resetIcon from "@/public/assets/icon_exchange.svg";
import MyShopTitle from "@/components/MyShop/MyShopTitle";
import MySaleCards from "@/components/MyShop/MySaleCards";
import MyShopList from "@/components/MyShop/MyShopList";
import SearchBar from "@/components/Common/SearchBar/SearchBar";
import Rating from "@/components/Common/Dropdown/Sort/Rating";
import Attribute from "@/components/Common/Dropdown/Sort/Attribute";
import Sale from "@/components/Common/Dropdown/Sort/Sale";
import Soldout from "@/components/Common/Dropdown/Sort/Soldout";
import MultiFilterModal from "@/components/Common/Modal/MultiFilter";

export default function MyShop() {
  const [mySales, setMySales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [page, setPage] = useState(1);

  const [gradeReset, setGradeReset] = useState(false);
  const [typeReset, setTypeReset] = useState(false);
  const [modeReset, setModeReset] = useState(false);
  const [availableReset, setAvailableReset] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [modeFilter, setModeFilter] = useState("");
  const [availableFilter, setAvailableFilter] = useState("");
  const [filterCounts, setFilterCounts] = useState({
    grade: {},
    type: {},
    mode: {},
    available: {},
  });

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
    setModeFilter("");
    setAvailableFilter("");

    setGradeReset(false);
    setTypeReset(true);
    setModeReset(true);
    setAvailableReset(true);
  };

  // 속성 필터 변경 처리 함수
  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    setGradeFilter("");
    setModeFilter("");
    setAvailableFilter("");

    setGradeReset(true);
    setTypeReset(false);
    setModeReset(true);
    setAvailableReset(true);
  };

  // 판매방법 필터 변경 처리 함수
  const handleModeFilter = (mode) => {
    setModeFilter(mode === "판매중" ? "shop" : "exchange");
    setGradeFilter("");
    setTypeFilter("");
    setAvailableFilter("");

    setGradeReset(true);
    setTypeReset(true);
    setModeReset(false);
    setAvailableReset(true);
  };

  // 매진여부 필터 변경 처리 함수
  const handleAvailableFilter = (available) => {
    setAvailableFilter(available === "매진안됨" ? true : false);
    setGradeFilter("");
    setTypeFilter("");
    setModeFilter("");

    setGradeReset(true);
    setTypeReset(true);
    setModeReset(true);
    setAvailableReset(false);
  };

  // 멀티 필터 변경 처리 함수
  const handleFilterChange = (filterType, value) => {
    if (filterType === "grade") {
      setGradeFilter(value);
      setTypeFilter("");
      setModeFilter("");
      setAvailableFilter("");
    } else if (filterType === "type") {
      setTypeFilter(value);
      setGradeFilter("");
      setModeFilter("");
      setAvailableFilter("");
    } else if (filterType === "mode") {
      setModeFilter(value === "판매중" ? "shop" : "exchange");
      setGradeFilter("");
      setTypeFilter("");
      setAvailableFilter("");
    } else if (filterType === "available") {
      setAvailableFilter(value === "매진안됨" ? true : false);
      setGradeFilter("");
      setTypeFilter("");
      setModeFilter("");
    }
  };

  // 필터 리셋 처리 함수
  const handleFilterReset = () => {
    setGradeFilter("");
    setTypeFilter("");
    setModeFilter("");
    setAvailableFilter("");
    setGradeReset(true);
    setTypeReset(true);
    setModeReset(true);
    setAvailableReset(true);

    setTimeout(() => {
      setGradeReset(false);
      setTypeReset(false);
      setModeReset(false);
      setAvailableReset(false);
    }, 1000);
  };

  // 필터와 검색어가 바뀔 때 데이터를 불러오는 함수
  const loadFilteredData = async () => {
    try {
      setLoading(true);

      const res = await getSaleList({ page: 1 });
      const filteredResults = await getSaleList({
        page: 1,
        pageSize: res.totalCount,
        grade: gradeFilter,
        type: typeFilter,
        mode: modeFilter,
        available: availableFilter,
        keyword: searchTerm,
      });

      setFilteredSales(filteredResults.card || []);

      const newFilterCounts = {
        grade: {},
        type: {},
        mode: {},
        available: {},
      };

      filteredResults.card.forEach((card) => {
        const { grade, type, mode, available } = card;

        newFilterCounts.grade[grade] = (newFilterCounts.grade[grade] || 0) + 1;
        newFilterCounts.type[type] = (newFilterCounts.type[type] || 0) + 1;
        newFilterCounts.mode[mode] = (newFilterCounts.mode[mode] || 0) + 1;
        newFilterCounts.available[available] = (newFilterCounts.available[available] || 0) + 1;
      });

      setFilterCounts(newFilterCounts);
      setMySales(filteredResults.card.slice(0, 9));
      setHasMore(filteredResults.card.length > 9);
    } catch (err) {
      console.error("필터링 중 오류 발생:", err);
    } finally {
      setLoading(false);
    }
  };

  // 페이지네이션을 위한 데이터 로드
  const loadMoreCards = async () => {
    const startIdx = mySales.length;

    if (startIdx >= filteredSales.length) {
      setHasMore(false);
      return;
    }

    const nextCards = filteredSales.slice(startIdx, startIdx + 9);
    setMySales((prevCards) => [...prevCards, ...nextCards]);
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
    setMySales([]);
    loadFilteredData();
  }, [searchTerm, gradeFilter, typeFilter, modeFilter, availableFilter]);

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
        <MyShopTitle />
        <MySaleCards mySales={filteredSales || []} />
        <div className={styles.filter}>
          <div className={styles.line}></div>
          <div className={styles.search_filters}>
            <div className={styles.mobile_filter}>
              <MultiFilterModal
                filterKeys={["등급", "속성", "판매여부", "매진여부"]}
                onFilterChange={handleFilterChange}
                filterCounts={filterCounts}
                reset={() => {
                  setGradeFilter("");
                  setTypeFilter("");
                  setModeFilter("");
                  setAvailableFilter("");
                }}
              />
            </div>
            <div className={styles.search}>
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.filters}>
              <Rating sortType={handleGradeFilter} reset={gradeReset} />
              <Attribute sortType={handleTypeFilter} reset={typeReset} />
              <Sale sortType={handleModeFilter} reset={modeReset} />
              <Soldout sortType={handleAvailableFilter} reset={availableReset} />
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
      <MyShopList mySales={mySales || []} />
    </div>
  );
}
