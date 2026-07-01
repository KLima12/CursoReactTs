import React, { createContext, useCallback, useContext, useState } from "react";

// Criando interface para dizer oque vamos armazenar
interface IAuthContextProps {
  email: string | undefined;
  accessToken: string | undefined;

  login(email: string, password: string): void;
  logout(): void;
}

// Criando contexto e falando que o contexto é um contexto do IAuthContextProps
const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [email, setEmail] = useState<string>();
  const [accessToken, setAcessToken] = useState<string>();

  const login = useCallback(async (email: string, password: string) => {
    // Aqui seria chamar o backend para conseguir o token de autenticação, mas nao tem backend....
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();

      setEmail(email);
      setAcessToken(data.access);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
    } catch (error) {
      console.error("Erro no login", error);
    }
  }, []);

  const logout = useCallback(() => {
    // Aqui passamos underfined no logout
    setEmail(undefined);
    setAcessToken(undefined);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, accessToken, email }}>
      {children}
    </AuthContext.Provider>
  );
};

// Aqui estou exportando o hook useContext de dentro do nosso authCOntext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Verificar se está autenticado ou não!
export const useIsAuthenticated = () => {
  const { accessToken } = useAuthContext();
  console.log("Autenticado");
  return !!accessToken;
};
