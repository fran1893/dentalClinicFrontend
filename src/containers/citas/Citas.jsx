import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Citas.scss";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { DataListTable } from "../../components";
import appointmentService from "../../_services/appointmentService";

export default function Citas() {
  // HOOKS
  const authState = useSelector((state) => state.auth);
  const [citas, setCitas] = useState([]);
  const [tableIdAttr_name, setTableIdAttr_name] = useState("");
  const [tableIdHead_name, setTableIdHead_name] = useState("");
  const isLoggedIn = authState.isLoggedIn;
  const isPatient = authState.userInfo.role == "user";
  const isDoctor = authState.userInfo.role == "doctor";
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && isPatient) {
      getAppointmentPatient(authState.userToken);
      setTableIdAttr_name("id_doctor");
      setTableIdHead_name("ID Doctor");
    } else if (isLoggedIn && isDoctor) {
      getAppointmentDoctor(authState.userToken);
      setTableIdAttr_name("id_paciente");
      setTableIdHead_name("ID Paciente");
    } else {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const getAppointmentPatient = async (token) => {
    try {
      const response = await appointmentService.getAppointmentPatient(token);

      setCitas(response.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentDoctor = async (token) => {
    try {
      const response = await appointmentService.getAppointmentDoctor(token);

      setCitas(response.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCita = (e) => {
    const { dataId } = e.currentTarget.dataset;

    console.log(dataId);
  };

  const newCitas = (citas) =>
    citas.map((cita) => {
      cita.centro = cita.Centro.nombre_lugar;
      cita.direccion = cita.Centro.direccion;

      return cita;
    });

  // RETURN
  return (
    <div className="container Citas">
      <DataListTable
        data={newCitas(citas)}
        title="Citas"
        headers={[
          "ID Cita",
          tableIdHead_name,
          "Fecha",
          "Hora",
          "Tratamiento",
          "Centro",
          "Dirección",
        ]}
        attributes={[
          "id",
          tableIdAttr_name,
          "fecha",
          "horario",
          "tratamiento",
          "centro",
          "direccion",
        ]}
        onChange={handleCita}
      />
    </div>
  );
}
