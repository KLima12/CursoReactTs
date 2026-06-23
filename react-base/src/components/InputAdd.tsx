import { useRef, useState } from "react";
import { InputAddLayout } from "../shared/layout/inputAddLayout/InputAddLayout";
import InputAddLayoutStyles from "../shared/layout/inputAddLayout/InputAddLayout.module.css";
interface InputProps {
  onAdd(value: string): void;
}
export const InputAdd = ({ onAdd }: InputProps) => {
  /*Inicializamos com valor nulo*/
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const addValue = () => {
    onAdd(value);
    setValue("");
    /*Foca no input*/
    inputRef.current?.focus();
  };
  return (
    <InputAddLayout>
      <input
        className={InputAddLayoutStyles.input}
        value={value}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className={InputAddLayoutStyles.enviar} onClick={addValue}>
        Enviar
      </button>
    </InputAddLayout>
  );
};
