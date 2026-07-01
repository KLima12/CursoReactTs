import { useState } from "react";
import LoginStyles from "./Login.module.css";
import { useAuthContext } from "../../shared/contexts/AuthContext";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Extrai o método de login
  const { login } = useAuthContext();

  const handleLogin = () => {
    console.log(email, password);

    login(email, password);
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
