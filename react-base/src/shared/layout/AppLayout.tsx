// AppLayout.tsx
import type React from "react";
import { NavLink, useNavigate } from "react-router";
import "./AppLayout.css";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { FaHome, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="layout-base">
      <header className="layout-header">
        <NavLink to="/" className="layout-brand" onClick={closeMenu}>
          <span>📋</span>
          <span>TodoList</span>
        </NavLink>

        <button
          className="layout-menu-toggle"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navegação */}
        <nav className={`layout-nav ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `layout-links ${isActive ? "active" : ""}`
            }
            onClick={closeMenu}
          >
            <FaHome /> Home
          </NavLink>

          <button className="layout-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Sair
          </button>
        </nav>
      </header>

      <hr className="layout-divider" />

      {/* ✅ CONTEÚDO PRINCIPAL */}
      <main className="layout-content">{children}</main>
    </div>
  );
};
