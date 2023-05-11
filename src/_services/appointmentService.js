import axios from "axios";
import { global } from "../_global/global";

const appointmentService = {};

appointmentService.getAppointmentPatient = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + `/users/appointments/checkall`, config)
  ).data;
};

appointmentService.getAppointmentDoctor = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(
      global.BASE_URL + `/users/appointments/checkall/doctor`,
      config
    )
  ).data;
};

appointmentService.updateAppointment = async (
  token,
  appointData,
  appointId
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    fecha: appointData.fecha,
    horario: appointData.horario,
    tratamiento: appointData.tratamiento,
    id_centro: appointData.id_centro,
  };

  return (
    await axios.put(global.BASE_URL + `/appointment/${appointId}`, body, config)
  ).data;
};

export default appointmentService;
