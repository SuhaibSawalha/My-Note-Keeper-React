import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const handleOnChange = (e) => {
    setIsTouched(true);
    const currentValue = e.target.value;
    setValue(currentValue);
  };

  const clearValue = () => {
    setValue("");
    setIsTouched(false);
  };

  const isError = () => {
    return !value.trim() && isTouched;
  };

  const immediateError = () => {
    setIsTouched(true);
    return !value.trim();
  };

  return { value, handleOnChange, clearValue, isError, immediateError };
};

export default useInput;
