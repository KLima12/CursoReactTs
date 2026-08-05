import type React from "react";
import AuthFormStyles from "./AuthForm.module.css";
interface IauthForm {
  title: string;
  nameButton: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function AuthForm({
  title,
  nameButton,
  onSubmit,
  children,
  isLoading,
}: IauthForm) {
  return (
    <div className={AuthFormStyles.PageContainer}>
      <h1>{title}</h1>
      <form className={AuthFormStyles.PageContent} onSubmit={onSubmit}>
        {children}
        <button className={AuthFormStyles.BtnEntrar}>
          {isLoading ? "Processando..." : `${nameButton}`}
        </button>
      </form>
    </div>
  );
}
