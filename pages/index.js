import styles from "@/styles/Home.module.css";
import CardSell from "@/components/Common/Modal/CardSell";

export default function Home() {
  return (
    <>
      <CardSell />
      <h1 className={styles.home}>
        이 페이지는 저희 프로젝트의
        <br />
        <span>랜딩 페이지</span>가 될 예정이에요 &gt;_0
      </h1>
    </>
  );
}
