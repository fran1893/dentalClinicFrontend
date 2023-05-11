import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Citas.scss";
import { DataListTable } from "../../components";
import appointmentService from "../../_services/appointmentService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Citas() {
  // HOOKS
  const authState = useSelector((state) => state.auth);
  const [citas, setCitas] = useState([]);
  const [citaId, setCitaId] = useState();
  const [showForm, setShowForm] = useState(false);
  const [tableIdAttr_name, setTableIdAttr_name] = useState("");
  const [tableIdHead_name, setTableIdHead_name] = useState("");
  const [formValues, setFormValues] = useState({});
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

  const updateAppointment = async (token, appointData, appointId) => {
    try {
      await appointmentService.updateAppointment(token, appointData, appointId);
    } catch (error) {
      console.log(error);
    }
  };

  const newCitas = (citas) =>
    citas.map((cita) => {
      cita.centro = cita.Centro.nombre_lugar;
      cita.direccion = cita.Centro.direccion;

      return cita;
    });

  // HANDLERS
  const handleCita = (e) => {
    const { dataId } = e.currentTarget.dataset;

    setCitaId(dataId);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleShowForm = () => {
    setShowForm(false);
  };

  const handleSubmit = () =>{
    updateAppointment(authState.userToken, formValues, citaId)
  }

  // RETURN
  return (
    <div className="container Citas">
      <pre style={{ textAlign: "left", width: "250px", margin: "auto" }}>
        {JSON.stringify(formValues, null, 2)}
      </pre>
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
      {showForm && (
        <div className="updateFormDates">
          <h2>Modificar la cita con ID: {citaId}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Nueva Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={formValues.fecha}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Elegir horario</Form.Label>
              <br />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="15:45:00"
                onChange={handleChange}
                label={`15:45`}
              />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="10:00:00"
                onChange={handleChange}
                id={2}
                label={`10:00`}
              />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="11:30:00"
                onChange={handleChange}
                label={`11:30`}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Cambiar Tratamiento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escriba su consulta"
                name="tratamiento"
                value={formValues.tratamiento}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Elegir el centro</Form.Label>
              <Form.Check
                type={"radio"}
                name="id_centro"
                value={1}
                onChange={handleChange}
                label={`Clinica Barcelona`}
              />
              <Form.Check
                type={"radio"}
                name="id_centro"
                value={2}
                onChange={handleChange}
                label={`Clinica Madrid`}
              />
              <Form.Check
                type={"radio"}
                name="id_centro"
                value={3}
                onChange={handleChange}
                label={`Clinica Valencia`}
              />
            </Form.Group>
            <div className="updateDateButtons">
              <Button variant="primary" type="submit">
                Cambiar Cita
              </Button>
              <Button variant="success" onClick={handleShowForm}>
                No modificar la cita
              </Button>
              <Button variant="danger">Borrar la cita</Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
