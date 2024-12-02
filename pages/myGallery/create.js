import CreateTitle from "@/components/CreateCard/CreateTitle";
import CreateForm from "@/components/CreateCard/CreateForm";
import styles from "@/styles/CreateCard.module.css";

export default function CreateCard() {
  return (
    <div className={styles.container}>
      <CreateTitle />
      <CreateForm />
    </div>
  );
}
