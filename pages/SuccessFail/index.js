import SuccessFail from "@/components/Common/SuccessFail/SuccessFail";
import styles from "./SuccessFail.module.css";
import { useRouter } from "next/router";

export default function SuccessFailPage() {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      <div className={styles.successFail_container}>
        <SuccessFail type={type} />
      </div>
    </>
  );
}
