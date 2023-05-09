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

export default appointmentService;
