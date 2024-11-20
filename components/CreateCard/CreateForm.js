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

  // 전체적인 컴포넌트 수정 시 이 부분은 제거 예정
  const grades = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
  const types = [
    "노말",
    "불꽃",
    "물",
    "풀",
    "전기",
    "얼음",
    "격투",
    "독",
    "땅",
    "비행",
    "에스퍼",
    "벌레",
    "바위",
    "고스트",
    "드래곤",
    "악",
    "강철",
    "페어리",
  ];

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
        <Dropdown label="등급" name="grade" value={grade} setValue={setGrade} options={grades} />
        <div className={styles.types}>
          <Dropdown
            label="속성 ①"
            name="type"
            value={type[0]}
            setValue={(value) => handleTypeChange(0, value)}
            options={types}
          />
          <Dropdown
            label="속성 ②"
            name="type"
            value={type[1]}
            setValue={(value) => handleTypeChange(1, value)}
            options={types}
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
        <Input
          label="포토카드 설명"
          type="textarea"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="카드 설명을 입력해 주세요"
        />
        <button className={styles.create}>생성하기</button>
      </form>
    </div>
  );
}
