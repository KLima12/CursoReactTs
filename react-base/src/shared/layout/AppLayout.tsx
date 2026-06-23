import type React from "react";
import { NavLink } from "react-router";
import "./AppLayout.css";

export const AppLayout = ({ children }: React.PropsWithChildren) => {
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
      </div>
      <hr className="layout-divider" />

      <div>{children}</div>
    </div>
  );
};
