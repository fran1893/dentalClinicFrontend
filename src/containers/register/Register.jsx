import React, { useState } from "react";
import "./Register.scss";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import authService from "../../_services/authService";
import Form from "react-bootstrap/Form";
import registerImage from "../../assets/register-image.png"

export default function Register() {
  // HOOKS
  const [formValues, setFormValues] = useState({});
  const [showForm, setShowForm] = useState(true);

  // FUNCTIONS

  const registerUser = async (credentials) => {
    await authService.register(credentials);
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
    registerUser(formValues);
    setShowForm(false);
  };
  return (
    <div className="Register container">
      {!showForm && (
        <div className="d-flex justify-content-center mt-5">
          <h1>Registrado Correctamente!</h1>
        </div>
      )}
      {showForm && (
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="my-4">
              <MDBRow className="g-0">
                <MDBCol md="6" className="d-none d-md-block">
                  <MDBCardImage
                    src= {registerImage}
                    alt="Sample photo"
                    fluid
                  />
                </MDBCol>

                <MDBCol md="6">
                  <Form onSubmit={handleSubmit}>
                    <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                      <h3 className="mb-5 text-uppercase fw-bold">
                        Registrate en nuestra clínica!
                      </h3>

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Nombre"
                            size="lg"
                            type="text"
                            onChange={handleChange}
                            name="nombre"
                            value={formValues.nombre}
                          />
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Apellido"
                            size="lg"
                            type="text"
                            onChange={handleChange}
                            name="apellidos"
                            value={formValues.apellidos}
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Edad"
                        size="lg"
                        type="number"
                        onChange={handleChange}
                        name="edad"
                        value={formValues.edad}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email"
                        size="lg"
                        type="email"
                        onChange={handleChange}
                        name="email"
                        value={formValues.email}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Contraseña"
                        size="lg"
                        type="password"
                        onChange={handleChange}
                        name="password"
                        value={formValues.password}
                      />

                      <div className="d-flex justify-content-center pt-3">
                        <Button
                          className="ms-2"
                          variant="success"
                          size="lg"
                          type="submit"
                        >
                          Registrarse
                        </Button>
                      </div>
                    </MDBCardBody>
                  </Form>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      )}
    </div>
  );
}
