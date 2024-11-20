import styles from "@/styles/MyShop.module.css";
import MyShopTitle from "@/components/MyShop/MyShopTitle";

export default function MyShop() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MyShopTitle />
      </div>
    </div>
  );
}
