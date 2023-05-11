import axios from "axios";
import { global } from "../_global/global";

const appointmentService = {};

// MOSTRAR CITAS PACIENTE
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

// MOSTRAR CITAS DOCTOR
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

// ACTUALIZAR CITA
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

// BORRAR CITA
appointmentService.deleteAppointment = async (token, appointId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.delete(global.BASE_URL + `/appointment/${appointId}`, config)
  ).data;
};

// CREAR CITA PACIENTE
appointmentService.createAppointment = async (token, newAppointData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    fecha: newAppointData.fecha,
    horario: newAppointData.horario,
    tratamiento: newAppointData.tratamiento,
    id_doctor: newAppointData.id_doctor,
    id_centro: newAppointData.id_centro,
  };

  return (
    await axios.post(global.BASE_URL + `/appointment/patient`, body, config)
  ).data;
};

export default appointmentService;
