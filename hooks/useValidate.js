import { useState } from "react";

export default function useValidate(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    let newError = {};

    if (!values.name || values.name.length < 1 || values.name.length > 10) {
      isValid = false;
      newError.name = "10자 이내로 입력해주세요.";
    }

    if (!values.grade) {
      isValid = false;
      newError.grade = "등급을 선택해주세요.";
    }

    if (!values.type[0]) {
      isValid = false;
      newError.type = "속성①은 필수 선택입니다.";
    }

    if (!values.price || values.price.length < 1 || isNaN(values.price)) {
      isValid = false;
      newError.price = "숫자로 입력해주세요.";
    }

    if (!values.quantity || values.quantity.length < 1 || isNaN(values.quantity)) {
      isValid = false;
      newError.quantity = "숫자로 입력해주세요.";
    }

    if (!values.fileData) {
      isValid = false;
      newError.image = "이미지를 선택해주세요.";
    }

    if (!values.description || values.description.length < 10 || values.description.length > 100) {
      isValid = false;
      newError.description = "10자 이상 입력해주세요.";
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return {
    values,
    setValues,
    errors,
    validate,
    handleChange,
  };
}
