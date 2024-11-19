import styles from "./PocketPlaceList.module.css";
import PhotoCard from "@/components/PhotoCard/PhotoCard";
import { useState, useEffect } from "react";

export default function MyGalleryList() {
  const count = 30;
  const [cardPerRow, setCardPerRow] = useState(3);

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

    return () => {
      window.removeEventListener("resize", updateCardPerRow);
    };
  }, []);

  const rows = Array.from({ length: Math.ceil(count / cardPerRow) });

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
