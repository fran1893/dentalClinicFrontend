import axios from "axios";
import { global } from "../_global/global";

const authService = {};

// LOGIN
authService.login = async (credentials) => {
  const body = {
    email: credentials.email,
    password: credentials.password,
  };

  return (await axios.post(global.BASE_URL + "/auth/login", body)).data;
};

// Registrar paciente
authService.register = async (credentials) => {
  const body = {
    nombre: credentials.nombre,
    apellidos: credentials.apellidos,
    edad: credentials.edad,
    email: credentials.email,
    password: credentials.password,
  };

  return (await axios.post(global.BASE_URL + "/auth/register", body)).data;
};

export default authService;
