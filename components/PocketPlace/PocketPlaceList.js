import styles from "./PocketPlaceList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import { useState, useEffect, useMemo } from "react";
import throttle from "lodash/throttle";
import { fetchData } from "@/lib/api/poketPlaceAPI";

export default function PocketPlaceList({ ratingFilter }) {
  const [cardPerRow, setCardPerRow] = useState(3);
  const [cardData, setCardData] = useState([]);
  const [count, setCount] = useState(12);
  const [loading, setLoading] = useState(false);

  const updateCardPerRow = () => {
    setCardPerRow(window.innerWidth <= 1199 ? 2 : 3);
  };

  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (cardData.length === 0 || scrollTop + clientHeight < scrollHeight - 200 || loading) return;

    if (count >= cardData.length) return;

    setLoading(true);
    try {
      const newCards = cardData.slice(count, count + 12);
      setCardData((prevData) => [...prevData, ...newCards]);
      setCount((prevCount) => Math.min(prevCount + 12, cardData.length));
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
    const fetchCardData = async () => {
      try {
        const list = await fetchData();
        const cardData = list.map((item) => item.card);
        setCardData(cardData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCardData();
  }, []);

  const filteredData = useMemo(() => {
    if (ratingFilter) {
      return cardData.filter((card) => card.grade === ratingFilter); // ratingFilter에 맞는 카드만 필터링
    }
    return cardData;
  }, [cardData, ratingFilter]);

  const rows = Array.from({ length: Math.ceil(count / cardPerRow) });

  return (
    <div className={styles.pocketItem_container}>
      {rows.map((_, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {filteredData
            .slice(rowIndex * cardPerRow, rowIndex * cardPerRow + cardPerRow)
            .map((item) => (
              <PhotoCard key={item.id} card={{ ...item }} />
            ))}
        </div>
      ))}
    </div>
  );
}
