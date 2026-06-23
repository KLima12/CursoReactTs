import { useState } from "react";
import LoginStyles from "./Login.module.css";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("entrar");
  };

  return (
    <div className={LoginStyles.PageContainer}>
      <div className={LoginStyles.PageContent}>
        <h1>Login</h1>

        <b className={LoginStyles.Label}>Email</b>

        <input
          value={email}
          className={LoginStyles.Input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <b className={LoginStyles.Label}>Senha</b>

        <input
          className={LoginStyles.Input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={LoginStyles.BtnEntrar} onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
