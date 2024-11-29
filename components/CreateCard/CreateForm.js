import { useState } from "react";
import { useRouter } from "next/router";
import Input from "../Common/Input/Input";
import styles from "./CreateForm.module.css";
import Dropdown from "../Common/Input/Dropdown";
import useValidate from "@/hooks/useValidate";
import { createPhotoCard } from "@/lib/api/UserService";

export default function CreateForm() {
  const router = useRouter();
  const { values, setValues, errors, validate, handleChange } = useValidate({
    name: "",
    grade: "",
    type: ["", ""],
    price: "",
    quantity: "",
    image: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleTypeChange = (index, value) => {
    const newType = [...values.type];
    newType[index] = value;
    handleChange({ target: { id: "type", value: newType } });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValues({
      ...values,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const card = {
      name: values.name,
      grade: values.grade,
      type: [values.type[0], values.type[1]],
      price: values.price,
      quantity: values.quantity,
      image: values.image,
      description: values.description,
    };

    try {
      await createPhotoCard(card);
      return router.push("/pocketPlace");
    } catch (err) {
      console.error("상품 등록에 실패하였습니다.", err.message);
      setError("상품 등록에 실패하였습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Input
          label="포토카드 이름"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="포토카드 이름을 입력해 주세요"
        />
        <Dropdown
          label="등급"
          value={values.grade}
          setValue={(value) => handleChange({ target: { id: "grade", value } })}
          option="등급"
        />
        <div className={styles.types}>
          <Dropdown
            label="속성 ①"
            value={values.type[0]}
            setValue={(value) => handleTypeChange(0, value)}
            option="속성"
          />
          <Dropdown
            label="속성 ②"
            value={values.type[1]}
            setValue={(value) => handleTypeChange(1, value)}
            option="속성"
          />
        </div>
        <Input
          label="가격"
          type="text"
          name="price"
          value={values.price}
          onChange={handleChange}
          placeholder="가격을 입력해 주세요"
        />
        <Input
          label="총 발행량"
          type="text"
          name="totalQuantity"
          value={values.totalQuantity}
          onChange={handleChange}
          placeholder="총 발행량을 입력해 주세요"
        />
        <Input
          label="사진 업로드"
          type="file"
          name="image"
          value={values.image}
          onChange={handleImageChange}
          placeholder="사진 업로드"
        />
        <div className={styles.description}>
          <Input
            label="포토카드 설명"
            type="textarea"
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="카드 설명을 입력해 주세요"
          />
        </div>
        <button type="submit" className={styles.create}>
          생성하기
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
