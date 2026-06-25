import React, { createContext, useContext, useState } from "react";

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
  const login = (email: string) => {
    // Aqui seria chamar o backend para conseguir o token de autenticação, mas nao tem backend....

    setEmail(email);
    // Aqui gera uma string aleatoria
    setAcessToken(crypto.randomUUID());
  };

  const logout = () => {
    // Aqui passamos underfined no logout
    setEmail(undefined);
    setAcessToken(undefined);
  };
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
