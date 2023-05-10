import axios from "axios";
import { global } from "../_global/global";

const userService = {};

// Obtener todos los pacientes (ADMIN)
userService.getAllPatients = async (token, page = 1) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(
      global.BASE_URL + `/users/profile/checkallpatients?page=${page}`,
      config
    )
  ).data;
};

// Obtener todos los doctores (ADMIN)
userService.getAllDoctors = async (token, page = 1) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(
      global.BASE_URL + `/users/profile/checkalldoctors?page=${page}`,
      config
    )
  ).data;
};

// Obtener el perfil del usuario
userService.getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/users/profile`, config)).data;
};

// Actualizar el perfil del usuario
userService.updateProfile = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    nombre: userData.nombre,
    apellidos: userData.apellidos,
    edad: userData.edad,
    email: userData.email,
    telefono: userData.telefono,
    password: userData.password,
  };

  return (
    await axios.put(global.BASE_URL + `/users/profile/update`, body, config)
  ).data;
};

export default userService;
