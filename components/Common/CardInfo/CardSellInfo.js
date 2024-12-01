import { useState } from "react";
import styles from "./CardSellInfo.module.css";
import Grade from "../Grade/Grade";
import Quantity from "../Quantity/Quantity";
import Input from "../Input/Input";

export default function CardSellInfo({ 
  data, 
  point,          
  setPoint,      
  selectedQuantity,
  setSelectedQuantity  }) {


  console.log("CardSellInfo props:", { point, selectedQuantity });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.category}>
          <Grade grade={data.grade} detail={true} />
          <p>|</p>
          <p>{data.type[0]}</p>
          {data.type[1] ? (
            <>
              <p>|</p>
              <p>{data.type[1]}</p>
            </>
          ) : (
            ""
          )}
        </div>
        <p className={styles.seller}>판매자</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.quantity_price}>
        <div className={styles.total_quantity}>
          <p className={styles.label}>총 판매 수량</p>
          <div className={styles.quantity}>
            <Quantity
            value={selectedQuantity} 
              onChange={(newQuantity) => setSelectedQuantity(newQuantity)}
              maxQuantity={data.quantity}
            />
            <div className={styles.max_quantity}>
              <p className={styles.max_count}>
                /<span>{data.quantity}</span>
              </p>
              <p className={styles.max_notice}>
                최대 <span>{data.quantity}</span>장
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
