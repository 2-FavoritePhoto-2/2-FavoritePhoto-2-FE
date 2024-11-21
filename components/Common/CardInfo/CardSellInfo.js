import { useState } from "react";
import styles from "./CardSellInfo.module.css";
import Grade from "../Grade/Grade";
import Quantity from "../Quantity/Quantity";
import Input from "../Input/Input";

export default function CardSellInfo() {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [point, setPoint] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.category}>
          <Grade grade="SUPER RARE" detail={true} />
          <p>|</p>
          <p>전기</p>
          <p>|</p>
          <p>풀</p>
        </div>
        <p className={styles.seller}>판매자</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.quantity_price}>
        <div className={styles.total_quantity}>
          <p className={styles.label}>총 판매 수량</p>
          <div className={styles.quantity}>
            <Quantity
              onChange={(newQuantity) => setSelectedQuantity(newQuantity)}
              maxQuantity={3}
            />
            <div className={styles.max_quantity}>
              <p className={styles.max_count}>
                /<span>3</span>
              </p>
              <p className={styles.max_notice}>
                최대 <span>3</span>장
              </p>
            </div>
          </div>
        </div>
        <div className={styles.price}>
          <p className={styles.label}>장당 가격</p>
          <div className={styles.point_input}>
            <Input
              type="point"
              name="point"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              placeholder="숫자만 입력"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
