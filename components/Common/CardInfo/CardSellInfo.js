import styles from "./CardSellInfo.module.css";
import Grade from "../Grade/Grade";
import Quantity from "../Quantity/Quantity";
import Input from "../Input/Input";

export default function CardSellInfo({ data, setSelectedQuantity, setPrice }) {
  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.category}>
          <Grade grade={data.card.grade} detail={true} />
          <p>|</p>
          <p>{data.card.type[0]}</p>
          {data.card.type[1] ? (
            <>
              <p>|</p>
              <p>{data.card.type[1]}</p>
            </>
          ) : (
            ""
          )}
        </div>
        <p className={styles.seller}>{data.seller.nickname}</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.quantity_price}>
        <div className={styles.total_quantity}>
          <p className={styles.label}>총 판매 수량</p>
          <div className={styles.quantity}>
            <Quantity
              onChange={handleQuantityChange}
              maxQuantity={data.card.quantity}
            />
            <div className={styles.max_quantity}>
              <p className={styles.max_count}>
                /<span>{data.card.quantity}</span>
              </p>
              <p className={styles.max_notice}>
                최대 <span>{data.card.quantity}</span>장
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
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="숫자만 입력"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
