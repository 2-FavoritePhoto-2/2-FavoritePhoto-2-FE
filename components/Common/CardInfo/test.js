import { useState } from "react";
import axios from "@/lib/api/api.js";
import Input from "../Input/Input";

export default function Test({ data }) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  const [price, setPrice] = useState(1);

  const handleTestButton = async () => {
    await axios.patch(
      `/shop/${data.id}`,
      { price: Number(price) },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  };

  return (
    <>
      <button onClick={handleTestButton}>수정하기</button>
      <div>
        <Input
          type="point"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="숫자만 입력"
        />
      </div>
    </>
  );
}
