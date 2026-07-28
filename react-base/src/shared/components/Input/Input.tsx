import type React from "react";
import InputStyles from "./InputStyles.module.css";
interface InputProps {
  label?: string;
  type: string;
  value: string;
  name?: string;
  required: boolean;
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  type,
  value,
  required,
  placeHolder,
  name,
  onChange,
}: InputProps) {
  return (
    <>
      {label && <b className={InputStyles.label}>{label}</b>}
      <input
        className={InputStyles.Input}
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeHolder}
        onChange={onChange}
      ></input>
    </>
  );
}
