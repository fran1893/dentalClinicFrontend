import React, { useEffect, useState } from "react";
import authService from "../../_services/authService";
import { updateAuthStoreStateLogIn } from "../../features/authentication/updateAuthState";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import "./Login.scss";

export default function Login() {
  const initialFormValues = {
    email: "pancho@gmail.com",
    password: "12345678",
  };

  // HOOKS
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialFormValues);

  const [loginError, setLoginError] = useState(null);

  const authState = useSelector((state) => state.auth);

  const isAdmin = authState.userInfo.role == "admin";

  useEffect(() => {
    if (authState.userToken) {
      isAdmin ? navigate("/admin") : navigate("/");
    }
  }, [authState.userToken]);

  // HANDLERS
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: formValues.email,
      password: formValues.password,
    };

    if (
      validator.isEmail(credentials.email) &&
      validator.isByteLength(credentials.password, { min: 8, max: undefined })
    ) {
      login(credentials);
    } else if (!validator.isEmail(credentials.email)) {
      setLoginError("Debes introducir un correo real");
    } else if (
      !validator.isByteLength(credentials.password, { min: 8, max: undefined })
    ) {
      setLoginError("La contraseña debe contener mínimo 8 caracteres");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // FUNCTIONS
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      console.log(response);
      const token = response.token;
      setLoginError(null);
      updateAuthStoreStateLogIn(token);
    } catch (error) {
      console.log(error);
      setLoginError(error.response.data.message);
    }
  };

  // RETURN
  return (
    <div className="container">
      <div className="abs-center">
        {/* <pre style={{ textAlign: "left", width: "250px", margin: "auto" }}>
        {JSON.stringify(formValues, null, 2)}
      </pre> */}
        <form noValidate onSubmit={handleSubmit} className="form">
          <h1>Inicia Sesión</h1>
          <div className="form-group">
            <label htmlFor="">Email</label> <br />
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label> <br />
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <br />
          <button className="btn btn-primary">Iniciar Sesión</button>
        </form>
        <br />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </div>
    </div>
  );
}
