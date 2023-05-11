import React, { useEffect, useState } from "react";
import "./CreateAppoint.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appointmentService from "../../_services/appointmentService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateAppoint() {
  // HOOKS
  const authState = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({});
  const isLoggedIn = authState.isLoggedIn;
  const isPatient = authState.userInfo.role == "user";
  const [isAppointCreated, setIsAppointCreated] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isPatient) {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const createAppointment = async (token, newAppointData) => {
    try {
      await appointmentService.createAppointment(token, newAppointData);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    createAppointment(authState.userToken, formValues);
    setIsAppointCreated(true);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setIsAppointCreated(false);
  };
  // RETURN
  return (
    <div className="container">
      {isAppointCreated && (
        <>
          <h2>Cita Creada!</h2>
          <Button variant="light" onClick={handleShowForm}>
            Crear nueva cita
          </Button>
        </>
      )}
      {showForm && (
        <>
          <h1>Crea una cita en nuestra clínica</h1>
          <Form className="updateForm" onSubmit={handleSubmit}>
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
                label={`15:45`}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="10:00:00"
                id={2}
                label={`10:00`}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type={"radio"}
                name="horario"
                value="11:30:00"
                label={`11:30`}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tratamiento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escriba su consulta"
                name="tratamiento"
                value={formValues.tratamiento}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Elige el Doctor</Form.Label>
              <Form.Check
                type={"radio"}
                name="id_doctor"
                value={1}
                label={`Doctor Alberto Mendez`}
                onChange={handleChange}
              />
              <Form.Check
                type={"radio"}
                name="id_doctor"
                value={2}
                label={`Doctor Gilberto Mendez`}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Elegir el centro</Form.Label>
              <Form.Check
                type={"radio"}
                name="id_centro"
                value={1}
                label={`Clinica Barcelona`}
                onChange={handleChange}
              />
              <Form.Check
                type={"radio"}
                name="id_centro"
                value={2}
                label={`Clinica Madrid`}
                onChange={handleChange}
              />
              <Form.Check
                type={"radio"}
                name="id_centro"
                value={3}
                label={`Clinica Valencia`}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="formButton">
              Crear cita
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
