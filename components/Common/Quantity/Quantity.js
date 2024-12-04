import { useEffect, useState } from "react";
import styles from "./Quantity.module.css";

export default function Quantity({ onChange, maxQuantity }) {
  const [quantity, setQuantity] = useState(1); // 초기값 설정

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  useEffect(() => {
    onChange(quantity); // 값이 변경된 경우에만 상위로 전달
  }, [quantity, onChange]);

  return (
    <div className={styles.quantity_table}>
      <img
        src="/assets/btn_minus.png"
        className={styles.minus_button}
        onClick={decreaseQuantity}
        disabled={quantity < 1}
      />
      <p className={styles.quantity}>{quantity}</p>
      <img
        src="/assets/btn_plus.png"
        className={styles.plus_button}
        onClick={increaseQuantity}
        disabled={quantity >= maxQuantity}
      />
    </div>
  );
}
