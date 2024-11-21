import styles from "./PocketPlaceList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import { useState, useEffect } from "react";
import throttle from "lodash/throttle";

export default function PocketPlaceList() {
  const [cardPerRow, setCardPerRow] = useState(3);
  const [mockData, setMockData] = useState([]);
  const [count, setCount] = useState(12);
  const [loading, setLoading] = useState(false);

  const updateCardPerRow = () => {
    setCardPerRow(window.innerWidth <= 1199 ? 2 : 3);
  };

  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (mockData.length === 0 || scrollTop + clientHeight < scrollHeight - 200 || loading) return;

    if (count >= mockData.length) return;

    setLoading(true);
    try {
      const newCards = mockData.slice(count, count + 12);
      setMockData((prevData) => [...prevData, ...newCards]);
      setCount((prevCount) => Math.min(prevCount + 12, mockData.length));
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

  //TODO: 실제 API 연결 부분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mockData.json");
        if (response.ok) {
          const data = await response.json();
          setMockData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const rows = Array.from({ length: Math.ceil(count / cardPerRow) });

  return (
    <div className={styles.pocketItem_container}>
      {rows.map((_, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {mockData.slice(rowIndex * cardPerRow, rowIndex * cardPerRow + cardPerRow).map((item) => {
            const updatedItem = { ...item, type: item.type.join(", ") };

            return <PhotoCard key={item.id} {...updatedItem} />;
          })}
        </div>
      ))}
    </div>
  );
}
