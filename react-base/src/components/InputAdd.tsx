import { useState } from "react";

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
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />

      <button onClick={addValue}>Enviar</button>
    </div>
  );
};
