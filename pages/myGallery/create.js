import styles from "@/styles/CreateCard.module.css";
import CreateTitle from "@/components/CreateCard/CreateTitle";
import CreateForm from "@/components/CreateCard/CreateForm";

export default function CreateCard() {
  return (
    <div className={styles.container}>
      <CreateTitle />
      <CreateForm />
    </div>
  );
}