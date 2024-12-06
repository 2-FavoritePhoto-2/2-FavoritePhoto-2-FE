import { useState, useEffect } from "react";
import { getSaleList, getSaleListCount, getUserProfile } from "@/lib/api/UserService";
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
import styles from "@/styles/MyShop.module.css";

export default function MyShop() {
  const [mySales, setMySales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    searchTerm: "",
    grade: "",
    type: "",
    mode: "",
    available: "",
  });
  const [resetFlags, setResetFlags] = useState({
    grade: false,
    type: false,
    mode: false,
    available: false,
  });

  const [filterCounts, setFilterCounts] = useState({
    grade: {},
    type: {},
    mode: {},
    available: {},
  });

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [profile, setProfile] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

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

  // 필터 변경 처리 함수
  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      searchTerm: filters.searchTerm,
      grade: "",
      type: "",
      mode: "",
      available: "",
    };

    switch (filterType) {
      case "grade":
        newFilters.grade = value;
        break;
      case "type":
        newFilters.type = value;
        break;
      case "mode":
        newFilters.mode = value === "판매중" ? "shop" : "exchange";
        if (value === "판매중") {
          newFilters.available = true;
        }
        break;
      case "available":
        newFilters.available = value;
        newFilters.mode = "shop";
        break;
    }

    const newResetFlags = {
      grade: filterType !== "grade",
      type: filterType !== "type",
      mode: filterType !== "mode",
      available: filterType !== "available",
    };

    setFilters(newFilters);
    setResetFlags(newResetFlags);
  };

  // 필터 리셋 처리 함수
  const handleFilterReset = () => {
    setFilters({
      searchTerm: "",
      grade: "",
      type: "",
      mode: "",
      available: "",
    });
    setResetFlags({
      grade: true,
      type: true,
      mode: true,
      available: true,
    });
    setTimeout(() => {
      setResetFlags({
        grade: false,
        type: false,
        mode: false,
        available: false,
      });
    }, 1000);
  };

  // 필터와 검색어가 바뀔 때 데이터를 불러오는 함수
  const loadFilteredData = async () => {
    try {
      setLoading(true);

      const totalCount = await getSaleListCount();
      const filteredResults = await getSaleList({
        page: 1,
        pageSize: totalCount,
        grade: filters.grade,
        type: filters.type,
        mode: filters.mode,
        available: filters.available,
        keyword: filters.searchTerm,
      });

      // 교환이 완료된 항목 제외
      const filtered = filteredResults.card.filter(
        (card) => !(card.mode === "exchange" && card.available === false),
      );
      setFilteredSales(filtered);

      const newFilterCounts = {
        grade: {},
        type: {},
        mode: {},
        available: {},
      };

      filtered.forEach((card) => {
        const { grade, type, mode, available } = card;

        newFilterCounts.grade[grade] = (newFilterCounts.grade[grade] || 0) + 1;
        newFilterCounts.type[type] = (newFilterCounts.type[type] || 0) + 1;
        newFilterCounts.mode[mode] = (newFilterCounts.mode[mode] || 0) + 1;
        newFilterCounts.available[available] = (newFilterCounts.available[available] || 0) + 1;
      });

      setFilterCounts(newFilterCounts);

      setMySales(filtered.slice(0, 9));
      setHasMore(filtered.length > 9);
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
  }, [page, filteredSales, mySales]);

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
  }, [filters.grade, filters.type, filters.mode, filters.available, filters.searchTerm]);

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
        <MySaleCards mySales={filteredSales || []} profile={profile} />
        <div className={styles.filter}>
          <div className={styles.line}></div>
          <div className={styles.search_filters}>
            <div className={styles.mobile_filter}>
              <MultiFilterModal
                filterKeys={["등급", "속성", "판매여부", "매진여부"]}
                onFilterChange={handleFilterChange}
                filterCounts={filterCounts}
                reset={handleFilterReset}
              />
            </div>
            <div className={styles.search}>
              <SearchBar
                onSearch={(keyword) => setFilters((prev) => ({ ...prev, searchTerm: keyword }))}
              />
            </div>
            <div className={styles.filters}>
              <Rating
                sortType={(value) => handleFilterChange("grade", value)}
                reset={resetFlags.grade}
                isOpen={openDropdown === "grade"}
                onToggle={() => handleDropdownToggle("grade")}
              />
              <Attribute
                sortType={(value) => handleFilterChange("type", value)}
                reset={resetFlags.type}
                isOpen={openDropdown === "type"}
                onToggle={() => handleDropdownToggle("type")}
              />
              <Sale
                sortType={(value) => handleFilterChange("mode", value)}
                reset={resetFlags.mode}
                isOpen={openDropdown === "mode"}
                onToggle={() => handleDropdownToggle("mode")}
              />
              <Soldout
                sortType={(value) => handleFilterChange("available", value)}
                reset={resetFlags.available}
                isOpen={openDropdown === "available"}
                onToggle={() => handleDropdownToggle("available")}
              />
              <Image
                src={resetIcon}
                width={24}
                height={24}
                onClick={handleFilterReset}
                alt="리셋 아이콘"
                className={styles.refreshIcon}
              />
            </div>
          </div>
        </div>
      </div>
      <MyShopList mySales={mySales || []} profile={profile} />
    </div>
  );
}
