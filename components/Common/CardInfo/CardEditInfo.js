import styles from "./CardSellInfo.module.css";
import Grade from "../Grade/Grade";
import Input from "../Input/Input";


export default function CardEditInfo({
  data,
  priceValue,
  onPriceChange,
  onQuantityChange,
  remainingQuantity,
  setRemainingQuantity,
  totalQuantity,
  setTotalQuantity,
  quantity,
  setQuantity,
}) {
  const increaseQuantity = () => {
    if (quantity < data.card.quantity + data.remainingQuantity) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + 1;
        // 상태 업데이트 후 새로운 값을 사용하여 onQuantityChange 호출
        const newTotalQuantity = totalQuantity + 1;
        const newRemainingQuantity = remainingQuantity + 1;
        onQuantityChange(newRemainingQuantity, newTotalQuantity);
        return newQuantity; // 새로운 수량 반환
      });
      setTotalQuantity((prevQuantity) => prevQuantity + 1);
      setRemainingQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        // 상태 업데이트 후 새로운 값을 사용하여 onQuantityChange 호출
        const newTotalQuantity = totalQuantity - 1;
        const newRemainingQuantity = remainingQuantity - 1;
        onQuantityChange(newRemainingQuantity, newTotalQuantity);
        return newQuantity; // 새로운 수량 반환
      });
      setTotalQuantity((prevQuantity) => prevQuantity - 1);
      setRemainingQuantity((prevQuantity) => prevQuantity - 1);
    }
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
            <div className={styles.quantity_table}>
              <img
                src="/assets/btn_minus.png"
                className={styles.minus_button}
                onClick={decreaseQuantity}
                disabled={quantity < 1}
              />
              <p className={styles.quantity_count}>{quantity}</p>
              <img
                src="/assets/btn_plus.png"
                className={styles.plus_button}
                onClick={increaseQuantity}
                disabled={quantity >= data.card.quantity + data.remainingQuantity}
              />
            </div>
            {/* <Quantity
              onChange={handleQuantityChange}
              maxQuantity={data.card.quantity + data.remainingQuantity}
              defaultQuantity={remainingQuantity} // 초기 수량
            /> */}
            <div className={styles.max_quantity}>
              <p className={styles.max_count}>
                /<span>{data.card.quantity + data.remainingQuantity}</span>
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
