import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import Notification from "../Common/Modal/Notification";
import throttle from "lodash/throttle";
import { getCards } from "@/lib/api/ShopService";
import { getAccessToken } from "@/lib/utils/token";
import styles from "./PocketPlaceList.module.css";

export default function PocketPlaceList({ searchTerm, activeFilter, onFilterCountChange }) {
  const [cardItems, setCardItems] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const isFetching = useRef(false);

  const router = useRouter();

  const closeNotification = () => {
    setShowNotification(false);
  };

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

  const handleCardClick = (cardId, remainingQuantity) => {
    if (remainingQuantity === 0) {
      return;
    }
    const accessToken = getAccessToken();
    if (!accessToken) {
      setShowNotification(true);
    } else {
      router.push(`/card/${cardId}`);
    }
  };

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
        available: activeFilter.available || "",
      });

      const data = await getCards(`/shop?${queryParams.toString()}`);

      const newCards = data.list.map((item) => ({
        listId: item.id,
        available: item.available,
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

  const fetchAllData = async () => {
    try {
      const queryParams = new URLSearchParams({
        keyword: searchTerm || "",
      });

      const data = await getCards(`/shop?${queryParams.toString()}&pageSize=10000`);

      const allItems = data.list.map((item) => ({
        listId: item.id,
        available: item.available ?? false,
        card: {
          grade: item.card.grade,
          type: item.card.type,
        },
        seller: {
          nickname: item.seller.nickname,
        },
      }));

      setAllCards(allItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const filtered = cardItems.filter((item) => {
      if (!activeFilter.grade && !activeFilter.type && activeFilter.available === undefined) {
        return true;
      }

      if (activeFilter.grade && item.card.grade !== activeFilter.grade) return false;
      if (activeFilter.type && !item.card.type.includes(activeFilter.type)) return false;
      if (activeFilter.available !== undefined && item.available !== activeFilter.available)
        return false;
      return true;
    });

    setFilteredCards(filtered);
  }, [cardItems, activeFilter]);

  useEffect(() => {
    const gradeCount = {};
    const typeCount = {};
    const availableCount = { true: 0, false: 0 };

    allCards.forEach((item) => {
      if (!activeFilter.grade || item.card.grade === activeFilter.grade) {
        if (!activeFilter.type || item.card.type.includes(activeFilter.type)) {
          if (activeFilter.available === undefined || item.available === activeFilter.available) {
            const grade = item.card.grade;
            gradeCount[grade] = (gradeCount[grade] || 0) + 1;

            const types = item.card.type || [];
            types.forEach((type) => {
              typeCount[type] = (typeCount[type] || 0) + 1;
            });

            availableCount[item.available ? "true" : "false"] += 1;
          }
        }
      }
    });

    onFilterCountChange({
      grade: gradeCount,
      type: typeCount,
      available: availableCount,
      total: allCards.length,
    });
  }, [allCards, activeFilter]);

  useEffect(() => {
    setCurrentPage(1);
    setCardItems([]);
    fetchData(1, true);
    fetchAllData();
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
          className={`${styles.card_wrapper} ${item.card.remainingQuantity === 0 ? styles.disabled : ""
            }`}
          onClick={() => handleCardClick(item.listId, item.card.remainingQuantity)}
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
