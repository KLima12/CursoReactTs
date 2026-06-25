import { AppRoutes } from "./Routes";
import { AuthProvider } from "./shared/contexts/AuthContext";
export function App() {
  /*Variavel do isAuthenticated*/

  return (
    /*{Estilização global (todas as págianas!)}*/
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
