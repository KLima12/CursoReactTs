import { useState } from "react";
import { InputAddLayout } from "../shared/layout/inputAddLayout/InputAddLayout";
import InputAddLayoutStyles from "../shared/layout/inputAddLayout/InputAddLayout.module.css";
interface InputProps {
  onAdd(value: string): void;
}
export const InputAdd = ({ onAdd }: InputProps) => {
  const [value, setValue] = useState("");

  const addValue = () => {
    onAdd(value);
    setValue("");
  };
  return (
    <InputAddLayout>
      <input
        className={InputAddLayoutStyles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className={InputAddLayoutStyles.enviar} onClick={addValue}>
        Enviar
      </button>
    </InputAddLayout>
  );
};
