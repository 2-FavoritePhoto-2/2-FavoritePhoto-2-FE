import styles from "./PocketPlaceList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import Notification from "../Common/Modal/Notification";
import { useState, useEffect } from "react";
import throttle from "lodash/throttle";
import { getCards } from "@/lib/api/pocketPlaceAPI";
import { useRouter } from "next/router";

export default function PocketPlaceList({ searchTerm, activeFilter, onFilterCountChange }) {
  const [cardItems, setCardItems] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [count, setCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [gradeCounts, setGradeCounts] = useState({});
  const [typeCounts, setTypeCounts] = useState({});

  const router = useRouter();

  const closeNotification = () => {
    setShowNotification(false);
  };

  //무한 스크롤링
  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (filteredCards.length === 0 || scrollTop + clientHeight < scrollHeight - 200 || loading)
      return;

    if (count >= filteredCards.length) return;

    setLoading(true);
    try {
      const newCards = filteredCards.slice(count, count + 12);
      setFilteredCards((prevData) => [...prevData, ...newCards]);
      setCount((prevCount) => Math.min(prevCount + 12, filteredCards.length));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, 50);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  //로그인 여부
  const handleCardClick = (cardId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setShowNotification(true);
    } else {
      router.push(`/card/${cardId}`);
    }
  };

  //검색 및 정렬
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();

        if (searchTerm) {
          queryParams.append("keyword", searchTerm);
        }

        if (activeFilter.orderBy) {
          queryParams.append("orderBy", activeFilter.orderBy);
        }

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        const data = await getCards("/shop" + queryString);

        const cards = data.list.map((item) => ({
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

        setCardItems(cards);
        setFilteredCards(cards);
      } catch (error) {
        console.error("패치 실패", error);
      }
    };
    fetchData();
  }, [searchTerm, activeFilter]);

  /* 필터링
   * 1. 매진여부 추가하기
   */
  useEffect(() => {
    let filtered = cardItems;

    if (searchTerm !== "") {
      filtered = filtered.filter((item) =>
        item.card.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (activeFilter.type) {
      filtered = filtered.filter((item) => {
        switch (activeFilter.type) {
          case "grade":
            return item.card.grade === activeFilter.value;
          case "type":
            return item.card.type && item.card.type.includes(activeFilter.value);
          default:
            return true;
        }
      });
    }

    setFilteredCards(filtered);
    setCount(12);
  }, [searchTerm, activeFilter, cardItems]);

  /*멀티필터용 타입별 개수 세기
   * 1. 매진 여부 추가하기
   */
  useEffect(() => {
    const updateCounts = () => {
      const gradeCount = {};
      const typeCount = {};

      filteredCards.forEach((item) => {
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
    };

    updateCounts();
  }, [filteredCards]);

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
