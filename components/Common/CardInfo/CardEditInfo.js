import styles from "./CardSellInfo.module.css";
import Grade from "../Grade/Grade";
import Quantity from "../Quantity/Quantity";
import Input from "../Input/Input";
import { useState } from "react";
import Test from "./test";

export default function CardEditInfo({ data, priceValue, onPriceChange, onQuantityChange }) {
  const [remainingQuantity, setRemainingQuantity] = useState(data.remainingQuantity);
  const [totalQuantity, setTotalQuantity] = useState(data.totalQuantity);

  // const handleQuantityChange = (newQuantity) => {
  //   const difference = newQuantity - remainingQuantity;

  //   setRemainingQuantity(newQuantity); // remainingQuantity를 업데이트
  //   setTotalQuantity((prev) => prev + difference); // 변화량만큼 totalQuantity를 업데이트
  // };
  const handleQuantityChange = (newQuantity) => {
    const difference = newQuantity - remainingQuantity;

    const updatedRemainingQuantity = newQuantity;
    const updatedTotalQuantity = totalQuantity + difference;

    // Local state update
    setRemainingQuantity(updatedRemainingQuantity);
    setTotalQuantity(updatedTotalQuantity);

    // // Notify the parent component
    onQuantityChange(updatedRemainingQuantity, updatedTotalQuantity);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.category}>
          <Grade grade={data.card.grade} detail={true} />
          <p>|</p>
          <p>{data.card.type[0]}</p>
          {data.card.type[1] && (
            <>
              <p>|</p>
              <p>{data.card.type[1]}</p>
            </>
          )}
        </div>
        <p className={styles.seller}>{data.seller.nickname}</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.quantity_price}>
        <div className={styles.remaining_contain}>
          <p className={styles.remaining_name}>잔여</p>
          <div className={styles.remaining_table}>
            <p className={styles.quantity_int}>{remainingQuantity}</p>
            <p className={styles.remaining_card}>{`/ ${totalQuantity}`}</p>
          </div>
        </div>
        <div className={styles.total_quantity}>
          <p className={styles.label}>판매수량 수정</p>
          <div className={styles.quantity}>
            <Quantity
              onChange={handleQuantityChange}
              maxQuantity={data.card.quantity}
              defaultQuantity={remainingQuantity} // 초기 수량
            />
            <div className={styles.max_quantity}>
              <p className={styles.max_count}>
                /<span>{data.card.quantity}</span>
              </p>
              <p className={styles.max_notice}>보유 수량</p>
            </div>
          </div>
        </div>
        <div className={styles.price}>
          <p className={styles.label}>장당 가격</p>
          <div className={styles.point_input}>
            <Input
              type="point"
              name="price"
              value={priceValue}
              onChange={onPriceChange}
              placeholder="숫자만 입력"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
