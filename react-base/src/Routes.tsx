import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AppLayout } from "./shared/layout/AppLayout";
import { About } from "./pages/About";
import { Detail } from "./pages/Detail";
import { Login } from "./pages/public/login/Login";
import { useAuthContext, useIsAuthenticated } from "./shared/contexts/AuthContext";
import { Register } from "./pages/public/register/Register";
export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const {loading} = useAuthContext(); 
  if (loading) { 
    return <div>Carregando...</div>
  }
  return (
    <BrowserRouter>
      {isAuthenticated && (
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/detalhe/:id" element={<Detail />} />
            {/*Criando para caso não encontrar página. Navego ele para página principal*/}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      )}
      {!isAuthenticated && (
        <Routes>
          <Route path="*" element={<Login />} />          
          <Route path="/register" element={<Register />}></Route>
          
        </Routes>
      )}
    </BrowserRouter>
  );
};
