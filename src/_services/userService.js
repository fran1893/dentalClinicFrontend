import axios from "axios";
import { global } from "../_global/global";

const userService = {};

// userService.getStudents = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   return (await axios.get(global.BASE_URL + "/api/alumnos?page=1", config))
//     .data;
// };

userService.getAllPatients = async (token, page = 1) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/users/profile/checkallpatients?page=${page}`, config))
    .data;
};

userService.getAllDoctors = async (token, page = 1) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/users/profile/checkalldoctors?page=${page}`, config))
    .data;
};

export default userService;