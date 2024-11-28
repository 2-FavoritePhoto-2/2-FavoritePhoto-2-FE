import SuccessFail from "@/components/Common/SuccessFail/SuccessFail";
import styles from "./SuccessFail.module.css";
import { useRouter } from "next/router";

export default function SuccessFailPage() {
  const router = useRouter();
  const { type, ...data } = router.query;

  return (
    <>
      <div className={styles.successFail_container}>
        <SuccessFail type={type} data={data} />
      </div>
    </>
  );
}
