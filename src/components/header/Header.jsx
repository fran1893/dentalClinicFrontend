import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";
import { updateAuthStoreStateLogOut } from "../../features/authentication/updateAuthState";
import {
  MdPersonOutline,
  MdOutlineLogout,
  MdKeyboardArrowDown,
  MdOutlineLogin,
} from "react-icons/md";

export default function Header() {
  // HOOKS
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const { name, role } = authState.userInfo;
  const isAdmin = role == "admin";

  // HANDLERS
  const handleLogout = () => {
    updateAuthStoreStateLogOut();
    navigate("/");
  };

  // RETURN
  return (
    <div className="Header">
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dates">Citas</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about">Acerca de</NavLink>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <NavLink to="/admin">Admin</NavLink>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav">
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/login">
                  <MdOutlineLogin />
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register">Registrarse</NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item dropdown ">
                <a>
                  <MdPersonOutline className="icon" />
                  {name} <MdKeyboardArrowDown />
                </a>

                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <NavLink to="/profile">Perfil</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <a onClick={handleLogout}>
                      <MdOutlineLogout /> Cerrar sesión
                    </a>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
