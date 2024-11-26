import styles from "./PocketPlaceList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import { useState, useEffect } from "react";
import throttle from "lodash/throttle";
import { getCards } from "@/lib/api/pocketPlaceAPI";
import { useRouter } from "next/router";

export default function PocketPlaceList({ searchTerm, activeFilter }) {
  const [cardPerRow, setCardPerRow] = useState(3);
  const [cardItems, setCardItems] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [count, setCount] = useState(12);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const updateCardPerRow = () => {
    setCardPerRow(window.innerWidth <= 1199 ? 2 : 3);
  };

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

  const handleCardClick = (cardId) => {
    router.push(`/card/${cardId}`);
  };

  useEffect(() => {
    updateCardPerRow();
    window.addEventListener("resize", updateCardPerRow);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateCardPerRow);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = searchTerm ? `?keyword=${searchTerm}` : "";
        const data = await getCards("/shop" + query);
        console.log(data);

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

  // 검색
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCards(cardItems);
      return;
    }

    const filtered = cardItems.filter((item) =>
      item.card.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCards(filtered);
  }, [searchTerm, cardItems]);

  // 필터링
  useEffect(() => {
    if (!activeFilter.type) {
      setFilteredCards(cardItems);
      return;
    }

    const newFilteredCards = cardItems.filter((item) => {
      switch (activeFilter.type) {
        case "rating":
          return item.card.grade === activeFilter.value;
        case "attribute":
          return item.card.type && item.card.type.includes(activeFilter.value);
        default:
          return true;
      }
    });

    setFilteredCards(newFilteredCards);
  }, [activeFilter, cardItems]);

  const rows = Array.from({ length: Math.ceil(filteredCards.length / cardPerRow) });

  return (
    <div className={styles.pocketItem_container}>
      {rows.map((_, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {filteredCards
            .slice(rowIndex * cardPerRow, rowIndex * cardPerRow + cardPerRow)
            .map((item) => (
              <div
                key={item.listId}
                className={styles.cardWrapper}
                onClick={() => handleCardClick(item.listId)}
                style={{ cursor: "pointer" }}
              >
                {console.log(item)}
                <PhotoCard
                  data={{
                    ...item,
                    remainingQuantity: item.card.remainingQuantity,
                    totalQuantity: item.card.totalQuantity,
                  }}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
