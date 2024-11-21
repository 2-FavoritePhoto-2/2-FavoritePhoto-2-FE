import { useState } from "react";
import Input from "../Common/Input/Input";
import styles from "./CreateForm.module.css";
import Dropdown from "../Common/Input/Dropdown";

export default function CreateForm() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [type, setType] = useState([]);
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleTypeChange = (index, value) => {
    const newType = [...type];
    newType[index] = value;
    setType(newType);
  };

  const handleImageChange = (file) => {
    setImage(file.name);
  };

  return (
    <div className={styles.container}>
      <form>
        <Input
          label="포토카드 이름"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="포토카드 이름을 입력해 주세요"
        />
        <Dropdown label="등급" name="grade" value={grade} setValue={setGrade} option="등급" />
        <div className={styles.types}>
          <Dropdown
            label="속성 ①"
            name="type"
            value={type[0]}
            setValue={(value) => handleTypeChange(0, value)}
            option="속성"
          />
          <Dropdown
            label="속성 ②"
            name="type"
            value={type[1]}
            setValue={(value) => handleTypeChange(1, value)}
            option="속성"
          />
        </div>
        <Input
          label="가격"
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="가격을 입력해 주세요"
        />
        <Input
          label="총 발행량"
          type="text"
          name="totalQuantity"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
          placeholder="총 발행량을 입력해 주세요"
        />
        <Input
          label="사진 업로드"
          type="file"
          name="image"
          value={image}
          onChange={handleImageChange}
          placeholder="사진 업로드"
        />
        <div className={styles.description}>
          <Input
            label="포토카드 설명"
            type="textarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="카드 설명을 입력해 주세요"
          />
        </div>
        <button className={styles.create}>생성하기</button>
      </form>
    </div>
  );
}
