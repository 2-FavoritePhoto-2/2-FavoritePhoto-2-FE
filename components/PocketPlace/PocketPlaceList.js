import styles from "./PocketPlaceList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import { useState, useEffect } from "react";
import throttle from "lodash/throttle";
import { getCards } from "@/lib/api/pocketPlaceAPI";

export default function PocketPlaceList({ searchTerm, activeFilter }) {
  const [cardPerRow, setCardPerRow] = useState(3);
  const [cardItems, setCardItems] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [count, setCount] = useState(12);
  const [loading, setLoading] = useState(false);

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

        const cards = data.list.map((item) => ({
          listId: item.id,
          listPrice: item.price,
          ...item.card,
        }));
        setCardItems(cards);
        setFilteredCards(cards);
      } catch (error) {
        console.error("패치 실패", error);
      }
    };
    fetchData();
  }, [searchTerm]);

  //검색
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCards(cardItems);
      setFilteredCards(
        cardItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }
  }, [searchTerm, cardItems]);

  useEffect(() => {
    if (!activeFilter.type) {
      setFilteredCards(cardItems);
      return;
    }

    // 필터링
    const newFilteredCards = cardItems.filter((card) => {
      switch (activeFilter.type) {
        case "rating":
          return card.grade === activeFilter.value;
        case "attribute":
          return card.type && card.type.includes(activeFilter.value);
        // case "soldout":
        // return card.soldout === activeFilter.value;
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
            .map((item) => {
              return <PhotoCard key={item.listId} card={item} />;
            })}
        </div>
      ))}
    </div>
  );
}
