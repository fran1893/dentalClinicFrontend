import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";
import { updateAuthStoreStateLogOut } from "../../features/authentication/updateAuthState";
import {
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineLogin,
} from "react-icons/md";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import navLogo from "../../assets/logo-clinic.png";

export default function Header() {
  // hooks
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const { name, role } = authState.userInfo;
  const isAdmin = role == "admin";

  // handlers
  const handleLogout = () => {
    updateAuthStoreStateLogOut();
    navigate("/");
  };

  return (
    <div className="Header">
      <Navbar
        className="bg-gradient"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={navLogo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {!isAdmin && isLoggedIn && (
                <>
                  <NavLink className="nav-link" to="/dates">
                    Citas
                  </NavLink>
                  <NavLink className="nav-link" to="/create-appointment">
                    Crear Cita
                  </NavLink>
                </>
              )}
              {isAdmin && (
                <>
                  <NavLink className="nav-link" to="/admin">
                    Admin
                  </NavLink>
                  <NavLink className="nav-link" to="/register-doctor">
                    Registrar doctor
                  </NavLink>
                </>
              )}
            </Nav>
            {!isLoggedIn && (
              <Nav>
                <NavLink className="nav-link" to="/login">
                  <MdOutlineLogin /> Iniciar sesion
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Registrarse
                </NavLink>
              </Nav>
            )}
            {isLoggedIn && (
              <Nav>
                <NavDropdown
                  title={name}
                  id="collasible-nav-dropdown"
                  align={"end"}
                >
                  <NavDropdown.Item href="/profile">
                    <MdPersonOutline /> Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    <MdOutlineLogout /> Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
