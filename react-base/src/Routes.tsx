import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AppLayout } from "./shared/layout/AppLayout";
import { About } from "./pages/About";
import { Detail } from "./pages/Detail";
import { Login } from "./pages/public/Login";
import { useIsAuthenticated } from "./shared/contexts/AuthContext";
export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
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
        </Routes>
      )}
    </BrowserRouter>
  );
};
