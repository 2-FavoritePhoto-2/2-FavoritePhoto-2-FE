import { useState } from "react";
import styles from "./Quantity.module.css";

//구매수량
export default function Quantity() {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className={styles.quantity_table}>
      <img
        src="/assets/btn_minus.png"
        className={styles.minus_button}
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
      />
      <p className={styles.quantity}>{quantity}</p>
      <img src="/assets/btn_plus.png" className={styles.plus_button} onClick={increaseQuantity} />
    </div>
  );
}
