import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../api/api";
import { authService } from "../auth/authService";
// Criando interface para dizer oque vamos armazenar
interface IAuthContextProps {
  email: string | undefined;
  accessToken: string | undefined;

  login(email: string, password: string): void;
  logout(): void;
  loading: boolean;
}

// Criando contexto e falando que o contexto é um contexto do IAuthContextProps
const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [email, setEmail] = useState<string>();
  const [accessToken, setAcessToken] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getAccessToken();

    if (token) {
      setAcessToken(token);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Aqui seria chamar o backend para conseguir o token de autenticação, mas nao tem backend....
    try {
      const response = await api.post("/api/login/", {
        email,
        password,
      });

      const data = response.data;

      setEmail(email);

      // Para salvar no navegador
      authService.setTokens(data.access, data.refresh);

      setAcessToken(data.access);
    } catch (error) {
      alert("Credenciais invalidas!")
      console.error("Erro no login", error);
    }
  }, []);

  const logout = useCallback(() => {
    // Aqui passamos underfined no logout
    setEmail(undefined);
    setAcessToken(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, accessToken, email, loading }}
    >
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
  return !!accessToken;
};
