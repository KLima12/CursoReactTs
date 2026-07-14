import React, { useState } from "react";
import LoginStyles from "./Login.module.css";
import { useAuthContext } from "../../shared/contexts/AuthContext";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Extrai o método de login
  const { login } = useAuthContext();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className={LoginStyles.PageContainer}>
      <h1>Login</h1>

      <form className={LoginStyles.PageContent} onSubmit={handleLogin}>
        <b className={LoginStyles.Label}>Email</b>
        <input
          value={email}
          className={LoginStyles.Input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <b className={LoginStyles.Label}>Senha</b>

        <input
          className={LoginStyles.Input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className={LoginStyles.BtnEntrar} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
