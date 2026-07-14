import type React from "react";
import { NavLink } from "react-router";
import "./AppLayout.css";
import { useAuthContext } from "../contexts/AuthContext";

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  const {logout} = useAuthContext();
  return (
    /*{Estilização global do AppLayout!}*/
    <div className="layout-base">
      <div className="layout-header">
        {/*Abrir a página inicial*/}
        <NavLink to="/">
          <a className="layout-links">Home</a>
        </NavLink>
        {/*Naegar para sobre*/}
        <NavLink to="/sobre">
          <a className="layout-links">Sobre</a>
        </NavLink>
        <a className="layout-links" onClick={logout}>
          Sair
        </a>
      </div>
      <hr className="layout-divider" />

      <div>{children}</div>
    </div>
  );
};
