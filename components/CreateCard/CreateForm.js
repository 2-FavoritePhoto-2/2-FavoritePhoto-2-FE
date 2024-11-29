import { useState } from "react";
import { useRouter } from "next/router";
import Input from "../Common/Input/Input";
import styles from "./CreateForm.module.css";
import Dropdown from "../Common/Input/Dropdown";
import useValidate from "@/hooks/useValidate";
import { createPhotoCard } from "@/lib/api/UserService";
import FileInput from "../Common/Input/FileInput";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleTypeChange = (index, value) => {
    const newType = [...values.type];
    newType[index] = value;
    handleChange("type", newType);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues({
        ...values,
        image: file.name,
        fileData: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("grade", values.grade);
    formData.append("type", values.type[0]);
    formData.append("type", values.type[1]);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);

    if (values.fileData) {
      formData.append("image", values.fileData);
    }

    try {
      await createPhotoCard(formData);
      return router.push("/myGallery");
    } catch (err) {
      console.error("상품 등록에 실패하였습니다.", err.message);
      setError("상품 등록에 실패하였습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="포토카드 이름"
            type="text"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            placeholder="포토카드 이름을 입력해 주세요"
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>
        <div>
          <Dropdown
            label="등급"
            value={values.grade}
            setValue={(value) => handleChange("grade", value)}
            option="등급"
          />
          {errors.grade && <div className={styles.error}>{errors.grade}</div>}
        </div>
        <div>
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
          {errors.type && <div className={styles.error}>{errors.type}</div>}
        </div>
        <div>
          <Input
            label="가격"
            type="text"
            name="price"
            value={values.price}
            onChange={handleInputChange}
            placeholder="가격을 입력해 주세요"
          />
          {errors.price && <div className={styles.error}>{errors.price}</div>}
        </div>
        <div>
          <Input
            label="총 발행량"
            type="text"
            name="quantity"
            value={values.quantity}
            onChange={handleInputChange}
            placeholder="총 발행량을 입력해 주세요"
          />
          {errors.quantity && <div className={styles.error}>{errors.quantity}</div>}
        </div>
        <div>
          <FileInput
            label="사진 업로드"
            name="image"
            value={values.image}
            onChange={handleImageChange}
          />
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </div>
        <div className={styles.description}>
          <Input
            label="포토카드 설명"
            type="textarea"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            placeholder="카드 설명을 입력해 주세요"
          />
          {errors.description && <div className={styles.error}>{errors.description}</div>}
        </div>
        <button type="submit" className={styles.create}>
          생성하기
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
