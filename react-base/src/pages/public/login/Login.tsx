import React, { useState } from "react";
import LoginStyles from "./Login.module.css";
import { useAuthContext } from "../../../shared/contexts/AuthContext";
import { AuthForm } from "../AuthForm";
import { NavLink } from "react-router";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Extrai o método de login
  const { login } = useAuthContext();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try { 
      await login(email, password);
    } catch (error){ 
      console.log("Erro no login: ", error);
    }
    
  };

  return (
      <AuthForm title="Login" nameButton="Logar" onSubmit={handleLogin}>
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

          <NavLink to="/register"> 
            Registre-se
          </NavLink>
          
      </AuthForm>
  );
}
