import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";
import { DataListTable } from "../../components";

export default function Admin() {
  // HOOKS
  const [patients, setPatients] = useState([]);
  const [patientsPage, setPatientsPage] = useState(1);
  const [patientsCount, setPatientsCount] = useState(1);
  const [totalPagesPatients, setTotalPagesPatients] = useState(1);

  const [doctors, setDoctors] = useState([]);
  const [doctorsPage, setDoctorsPage] = useState(1);
  const [doctorsCount, setDoctorsCount] = useState(1);
  const [totalPagesDoctors, setTotalPagesDoctors] = useState(1);

  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const isAdmin = authState.userInfo.role == "admin";

  useEffect(() => {
    if (isAdmin) {
      getAllPatients(authState.userToken, patientsPage);
      getAllDoctors(authState.userToken, doctorsPage);
    } else {
      navigate("/");
    }
  }, [patientsPage, doctorsPage]);

  // HANDLERS
  const handleUsersList = (e) => {
    const { page, userId } = e.currentTarget.dataset;

    handleUsersListPagination(page);
    handleSingleUser(userId);
  };

  const handleDoctorsList = (e) => {
    const { page, userId } = e.currentTarget.dataset;

    handleDoctorsListPagination(page);
    handleSingleDoctor(userId);
  };

  const handleUsersListPagination = (page) => {
    switch (page) {
      case "next":
        return setPatientsPage((page) => page + 1);
      case "prev":
        return setPatientsPage((page) => page - 1);
      case "first":
        return setPatientsPage(1);
      case "last":
        return setPatientsPage(totalPagesPatients);
    }
  };

  const handleDoctorsListPagination = (page) => {
    switch (page) {
      case "next":
        return setDoctorsPage((page) => page + 1);
      case "prev":
        return setDoctorsPage((page) => page - 1);
      case "first":
        return setDoctorsPage(1);
      case "last":
        return setDoctorsPage(totalPagesDoctors);
    }
  };

  const handleSingleUser = (id) => {
    console.log(id);
  };

  const handleSingleDoctor = (id) => {
    console.log(id);
  };

  // FUNCTIONS
  const getAllPatients = async (token, page) => {
    try {
      const response = await userService.getAllPatients(token, page);

      setPatients(response.results);
      setPatientsCount(response.info.total_results);
      setTotalPagesPatients(response.info.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDoctors = async (token, page) => {
    try {
      const response = await userService.getAllDoctors(token, page);

      setDoctors(response.results);
      setDoctorsCount(response.info.total_results);
      setTotalPagesDoctors(response.info.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const newDoctors = (users) =>
    users.map((user) => {
      user.nombre = user.Doctor.nombre;
      user.apellidos = user.Doctor.apellidos;
      user.edad = user.Doctor.edad;
      user.email = user.Doctor.email;
      user.telefono = user.Doctor.telefono;
      return user;
    });

  const newPatients = (users) =>
    users.map((user) => {
      user.nombre = user.Usuario.nombre;
      user.apellidos = user.Usuario.apellidos;
      user.edad = user.Usuario.edad;
      user.email = user.Usuario.email;
      user.telefono = user.Usuario.telefono;
      return user;
    });

  // RETURN
  return (
    <>
      {isAdmin && (
        <>
          <h1>Admin</h1>
          <DataListTable
            data={newDoctors(doctors)}
            title="Doctores"
            count={doctorsCount}
            headers={["ID", "Nombre", "Apellido", "Edad", "Email", "Teléfono"]}
            attributes={[
              "id",
              "nombre",
              "apellidos",
              "edad",
              "email",
              "telefono",
            ]}
            pagination={{
              page: doctorsPage,
              count: doctorsCount,
              totalPages: totalPagesDoctors,
            }}
            onChange={handleDoctorsList}
          />

          <br />

          <DataListTable
            data={newPatients(patients)}
            title="Pacientes"
            count={patientsCount}
            headers={["ID", "Nombre", "Apellido", "Edad", "Email", "Teléfono"]}
            attributes={[
              "id",
              "nombre",
              "apellidos",
              "edad",
              "email",
              "telefono",
            ]}
            pagination={{
              page: patientsPage,
              count: patientsCount,
              totalPages: totalPagesPatients,
            }}
            onChange={handleUsersList}
          />
        </>
      )}
    </>
  );
}
