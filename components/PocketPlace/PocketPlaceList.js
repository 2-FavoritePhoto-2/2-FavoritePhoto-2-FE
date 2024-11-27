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

  const handleCardClick = (cardId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setShowNotification(true);
    } else {
      router.push(`/card/${cardId}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = searchTerm ? `?keyword=${searchTerm}` : "";
        const data = await getCards("/shop" + query);
        // console.log(data);

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
  }, [searchTerm]);

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
          case "rating":
            return item.card.grade === activeFilter.value;
          case "attribute":
            return item.card.type && item.card.type.includes(activeFilter.value);
          default:
            return true;
        }
      });
    }

    setFilteredCards(filtered);
    setCount(12);
  }, [searchTerm, activeFilter, cardItems]);

  //멀티필터용 타입별 개수 세기
  useEffect(() => {
    const updateCounts = () => {
      const gradeCountData = {};
      const typeCountData = {};

      filteredCards.forEach((item) => {
        const grade = item.card.grade;
        gradeCountData[grade] = (gradeCountData[grade] || 0) + 1;

        const types = item.card.type || [];

        types.forEach((type) => {
          typeCountData[type] = (typeCountData[type] || 0) + 1;
        });
      });

      setGradeCounts(gradeCountData);
      setTypeCounts(typeCountData);

      onFilterCountChange({ grade: gradeCountData, type: typeCountData });
    };

    updateCounts();
  }, [filteredCards]);

  const closeNotification = () => {
    setShowNotification(false);
  };

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
