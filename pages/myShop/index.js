import styles from "@/styles/MyShop.module.css";
import MyShopTitle from "@/components/MyShop/MyShopTitle";
import MySaleCards from "@/components/MyShop/MySaleCards";
import MyShopFilter from "@/components/MyShop/MyShopFilter";
import MyShopList from "@/components/MyShop/MyShopList";

export default function MyShop() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MyShopTitle />
        <MySaleCards />
        <MyShopFilter />
      </div>
      <MyShopList />
    </div>
  );
}
