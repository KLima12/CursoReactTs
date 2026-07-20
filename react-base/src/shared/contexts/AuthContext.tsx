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
  refreshToken(): Promise<boolean>;
}

// Criando contexto e falando que o contexto é um contexto do IAuthContextProps
const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [email, setEmail] = useState<string>();
  const [accessToken, setAcessToken] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const refreshToken = useCallback(async(): Promise<boolean> => { 
    try { 
      // Pegando refresh token
      const refresh = await authService.getRefreshToken();
      if (!refresh) return false;

      // Requisição para pegar novo acess token
      const response = await api.post("/api/token/refresh/", { 
        refresh: refresh
      });

      // Armazenando novo access token
      const newAcessToken = response.data.access;
      // Atualizando pro novo access token 
      authService.setTokens(newAcessToken, refresh);
      // Atualizando estado
      setAcessToken(newAcessToken);
      return true;
    }catch(error) { 
      console.log("Erro ao renovar token: ", error); 
      return false;
    }
    },[]) 


  // Verificar autenticação ao carregar
  useEffect(() => {
    const initializeAuth = async () => { 
      // Lá no getAcessToken retorna ou str ou null, então convertemos para underfined para ficar no padrão certo.
      const token = authService.getAccessToken() ?? undefined;

      // Se não tem token, já saio do loading
      if (!token) { 
        setLoading(false);
        return;
      }
      try { 
        await api.post("/api/token/verify/", { 
          token: token
        });
        console.log("Token: ", token);
        setAcessToken(token);
      } catch(error) { 
        console.log("Ocorreu um erro ao chamar função de verificar token");
        // Token inválido, tenta renovar. Chamo a função.
        const refreshed = await refreshToken();
        if (!refreshed) { 
          // Usuário deslogado.
          authService.logout();
          // Definindo como urderfined.
          setAcessToken(undefined);
        }
      } finally { 
        setLoading(false);
      }
    }
    
    initializeAuth();
  }, []);


  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log("Fazendo requisição login");
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
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout()
    setEmail(undefined);
    setAcessToken(undefined);
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, accessToken, email, loading, refreshToken }}
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
