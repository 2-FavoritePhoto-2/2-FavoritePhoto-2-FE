import { useEffect, useState } from "react";
import styles from "./Quantity.module.css";

//수량
export default function Quantity({ onChange, maxQuantity }) {
  const [quantity, setQuantity] = useState(1);

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

  // quantity가 변경될 때마다 상위 컴포넌트의 함수를 호출(상위컴포넌트에 수량 표시)
  useEffect(() => {
    onChange(quantity);
  }, [quantity, onChange]);

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
        disabled={quantity >= maxQuantity} //수량 최대 도달시 버튼 비활성화
      />
    </div>
  );
}