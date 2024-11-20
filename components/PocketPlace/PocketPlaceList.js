import styles from "./PocketPlaceList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import { useState, useEffect } from "react";

export default function MyGalleryList() {
  const initialCount = 40;
  const [cardPerRow, setCardPerRow] = useState(3);
  //   const [count, setCount] = useState(initialCount);

  /*TODO
   * 1. 창크기별로 보이는 ROW 개수 해야하나
   * 2. 카드 미디어쿼리 완성 후 페이지 미디어쿼리 진행하기
   */

  //   const handleScroll = () => {
  // const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
  // const bottomPosition = document.documentElement.offsetHeight;
  //
  // if (scrollPosition >= bottomPosition - 200) {
  //   loadMoreCards();
  // }
  //   };

  //   const loadMoreCards = () => {
  // if (count < 100) {
  //   setCount(count + 20);
  // }
  //   };

  useEffect(() => {
    const updateCardPerRow = () => {
      if (window.innerWidth <= 1199) {
        setCardPerRow(2);
      } else {
        setCardPerRow(3);
      }
    };
    updateCardPerRow();
    window.addEventListener("resize", updateCardPerRow);
    // window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateCardPerRow);
      //   window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const rows = Array.from({ length: Math.ceil(initialCount / cardPerRow) });

  return (
    <div className={styles.pocketItem_container}>
      {rows.map((_, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {Array.from({ length: cardPerRow }).map((_, cardIndex) => (
            <PhotoCard key={cardIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}
