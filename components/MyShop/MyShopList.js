import styles from "./MyShopList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";

export default function MyShopList() {
  const count = 30;

  return (
    <div className={styles.card_list}>
      {Array.from({ length: count }).map((_, index) => (
        <PhotoCard key={index} />
      ))}
    </div>
  );
}
