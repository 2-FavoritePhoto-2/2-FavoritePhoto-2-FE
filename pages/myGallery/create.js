import styles from "@/styles/CreateCard.module.css";
import CreateTitle from "@/components/CreateCard/CreateTitle";

export default function CreateCard() {
  return (
    <div className={styles.container}>
      <CreateTitle />
    </div>
  );
}
