import styles from "./PocketPlaceList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import { useState, useEffect } from "react";
import throttle from "lodash/throttle";
import { getCards } from "@/lib/api/pocketPlaceAPI";

export default function PocketPlaceList() {
  const [cardPerRow, setCardPerRow] = useState(3);
  const [cardItems, setCardItems] = useState([]);
  const [count, setCount] = useState(12);
  const [loading, setLoading] = useState(false);

  const updateCardPerRow = () => {
    setCardPerRow(window.innerWidth <= 1199 ? 2 : 3);
  };

  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (cardItems.length === 0 || scrollTop + clientHeight < scrollHeight - 200 || loading) return;

    if (count >= cardItems.length) return;

    setLoading(true);
    try {
      const newCards = cardItems.slice(count, count + 12);
      setCardItems((prevData) => [...prevData, ...newCards]);
      setCount((prevCount) => Math.min(prevCount + 12, cardItems.length));
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
        const data = await getCards("/shop");

        const cards = data.list.map((item) => item.card);
        setCardItems(cards);
      } catch (error) {
        console.error("패치 실패", error);
      }
    };
    fetchData();
  }, []);

  const rows = Array.from({ length: Math.ceil(count / cardPerRow) });

  return (
    <div className={styles.pocketItem_container}>
      {rows.map((_, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {cardItems
            .slice(rowIndex * cardPerRow, rowIndex * cardPerRow + cardPerRow)
            .map((item) => {
              return <PhotoCard key={item.id} card={item} />;
            })}
        </div>
      ))}
    </div>
  );
}
