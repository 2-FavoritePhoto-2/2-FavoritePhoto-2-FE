import { useState } from "react";
import { useRouter } from "next/router";
import { createPhotoCard } from "@/lib/api/UserService";
import useValidate from "@/hooks/useValidate";
import Input from "../Common/Input/Input";
import Dropdown from "../Common/Input/Dropdown";
import FileInput from "../Common/Input/FileInput";
import styles from "./CreateForm.module.css";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleTypeChange = (index, value) => {
    const newType = [...values.type];
    newType[index] = value;
    handleChange("type", newType);
  };

  const handleImageChange = (file) => {
    setValues({
      ...values,
      image: file,
      fileData: file.name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("grade", values.grade);
    formData.append("type", JSON.stringify(values.type.filter((t) => t !== "")));
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("image", values.image);
    formData.append("description", values.description);

    try {
      await createPhotoCard(formData);
      router.push({
        pathname: "/SuccessFail",
        query: {
          type: "create_success",
          rate: values.grade,
          title: values.name,
        },
      });
      console.log(query.data);
    } catch (err) {
      console.error("상품 등록에 실패하였습니다.", err.message);
      return router.push({
        pathname: "/SuccessFail",
        query: { type: "create_fail" },
      });
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
            value={values.fileData || ""}
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
    </div>
  );
}
