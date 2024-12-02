import { useEffect, useState } from "react";
import styles from "./Quantity.module.css";

export default function Quantity({ onChange, maxQuantity, defaultQuantity = 1 }) {
  const [quantity, setQuantity] = useState(defaultQuantity); // 초기값 설정

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
    if (quantity !== defaultQuantity) {
      onChange(quantity); // 값이 변경된 경우에만 상위로 전달
    } // quantity가 변경될 때 상위 컴포넌트에 전달
  }, [quantity, defaultQuantity, onChange]);

  return (
    <div className={styles.quantity_table}>
      <img
        src="/assets/btn_minus.png"
        className={styles.minus_button}
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
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
