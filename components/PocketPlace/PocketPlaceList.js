import styles from "./PocketPlaceList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import Notification from "../Common/Modal/Notification";
import { useState, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import { getCards } from "@/lib/api/pocketPlaceAPI";
import { useRouter } from "next/router";

export default function PocketPlaceList({ searchTerm, activeFilter, onFilterCountChange }) {
  const [cardItems, setCardItems] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [gradeCounts, setGradeCounts] = useState({});
  const [typeCounts, setTypeCounts] = useState({});
  const isFetching = useRef(false);

  const router = useRouter();

  const closeNotification = () => {
    setShowNotification(false);
  };

  // 무한 스크롤링
  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      filteredCards.length === 0 ||
      scrollTop + clientHeight < scrollHeight - 200 ||
      isFetching.current
    )
      return;

    isFetching.current = true;
    setCurrentPage((prevPage) => prevPage + 1);
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 로그인 여부 확인
  const handleCardClick = (cardId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setShowNotification(true);
    } else {
      router.push(`/card/${cardId}`);
    }
  };

  // 카드 데이터 가져오기 (현재 페이지)
  const fetchData = async (page, reset = false) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        pageSize: 12,
        keyword: searchTerm || "",
        orderBy: activeFilter.orderBy || "",
        grade: activeFilter.grade || "",
        type: activeFilter.type || "",
      });

      const data = await getCards(`/shop?${queryParams.toString()}`);
      const newCards = data.list.map((item) => ({
        listId: item.id,
        card: {
          image: item.card.image,
          name: item.card.name,
          grade: item.card.grade,
          type: item.card.type,
          price: item.price,
          remainingQuantity: item.remainingQuantity,
          totalQuantity: item.totalQuantity,
        },
        seller: {
          nickname: item.seller.nickname,
        },
      }));

      setCardItems((prevItems) => (reset ? newCards : [...prevItems, ...newCards]));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  // 전체 데이터 (필터 개수 계산용)
  const fetchAllData = async () => {
    try {
      const queryParams = new URLSearchParams({
        keyword: searchTerm || "",
      });

      const data = await getCards(`/shop?${queryParams.toString()}&pageSize=10000`);
      const allItems = data.list.map((item) => ({
        listId: item.id,
        card: {
          grade: item.card.grade,
          type: item.card.type,
        },
      }));
      setAllCards(allItems);
    } catch (error) {
      console.error(error);
    }
  };

  // 필터링된 카드
  useEffect(() => {
    const filtered = cardItems.filter((item) => {
      if (activeFilter.grade && item.card.grade !== activeFilter.grade) return false;
      if (activeFilter.type && !item.card.type.includes(activeFilter.type)) return false;
      return true;
    });
    setFilteredCards(filtered);
  }, [cardItems, activeFilter]);

  // 필터 개수 계산
  useEffect(() => {
    if (!allCards.length) return;

    const gradeCount = {};
    const typeCount = {};

    allCards.forEach((item) => {
      const grade = item.card.grade;
      gradeCount[grade] = (gradeCount[grade] || 0) + 1;

      const types = item.card.type || [];
      types.forEach((type) => {
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });

    setGradeCounts(gradeCount);
    setTypeCounts(typeCount);

    onFilterCountChange({ grade: gradeCount, type: typeCount });
  }, [allCards]);

  // 초기 데이터 및 전체 데이터
  useEffect(() => {
    if (currentPage === 1) {
      fetchData(1, true);
      fetchAllData();
    }
  }, [searchTerm, activeFilter]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchData(currentPage);
    }
  }, [currentPage]);

  return (
    <div className={styles.pocketItem_container}>
      {filteredCards.map((item) => (
        <div
          key={item.listId}
          className={styles.card_wrapper}
          onClick={() => handleCardClick(item.listId)}
        >
          <PhotoCard
            data={{
              ...item,
              remainingQuantity: item.card.remainingQuantity,
              totalQuantity: item.card.totalQuantity,
            }}
          />
        </div>
      ))}

      {showNotification && (
        <Notification
          type="login"
          onClose={closeNotification}
          onButtonClick={() => (window.location.href = "/auth/login")}
        />
      )}
    </div>
  );
}
