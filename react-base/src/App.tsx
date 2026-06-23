import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AppLayout } from "./shared/layout/AppLayout";
import { About } from "./pages/About";
import { Detail } from "./pages/Detail";
export function App() {
  return (
    /*{Estilização global (todas as págianas!)}*/
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/detalhe/:id" element={<Detail />} />
          {/*Criando para caso não encontrar página. Navego ele para página principal*/}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
