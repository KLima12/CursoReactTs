import React, { useState } from "react";
import { useAuthContext } from "../../../shared/contexts/AuthContext";
import { AuthForm } from "../AuthForm";
import { NavLink } from "react-router";
import { Input } from "../../../shared/components/Input/Input";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Extrai o método de login
  const { login } = useAuthContext();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Ativa evento de loading.
    try {
      await login(email, password);
    } catch (error) {
      console.log("Erro no login: ", error);
      setIsLoading(false); // Desativa evento de loading
    }
  };

  return (
    <AuthForm
      title="Login"
      nameButton="Logar"
      onSubmit={handleLogin}
      isLoading={isLoading}
    >
      <Input
        label="Email"
        type="email"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeHolder="Digite seu Email"
      ></Input>

      <Input
        type="password"
        label="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
        placeHolder="Digite sua senha"
      ></Input>

      <NavLink to="/register">Registre-se</NavLink>
    </AuthForm>
  );
}
