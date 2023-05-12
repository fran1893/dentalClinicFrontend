import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import authService from "../../_services/authService";
import Form from "react-bootstrap/Form";
import registerImage from "../../assets/register-doctor-image.png";
import "./RegisterDoctor.scss";

export default function RegisterDoctor() {
  // HOOKS
  const [formValues, setFormValues] = useState({});
  const [showForm, setShowForm] = useState(true);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isAdmin = authState.userInfo.role == "admin";
  const isLoggedIn = authState.isLoggedIn;

  useEffect(() => {
    if (!isLoggedIn && !isAdmin) {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const registerDoctor = async (credentials, token) => {
    await authService.registerDoctor(credentials, token);
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
    registerDoctor(formValues, authState.userToken);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setFormValues({});
  };

  return (
    <div className="container Registerdoctor">
      {!showForm && (
        <div className="d-flex justify-content-center mt-5">
          <h1>Registrado Correctamente!</h1>
          <Button onClick={handleShowForm}>Registrar un nuevo doctor</Button>
        </div>
      )}
      {showForm && (
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="my-4 registerCard">
              <MDBRow className="g-0">
                <MDBCol md="6" className="d-none d-md-block">
                  <MDBCardImage src={registerImage} alt="Clinic Logo" fluid />
                </MDBCol>

                <MDBCol md="6">
                  <Form onSubmit={handleSubmit}>
                    <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                      <h3 className="mb-5 text-uppercase fw-bold">
                        Registrar un Doctor
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
                      <div className="d-md-flex ustify-content-start align-items-center mb-4">
                        <h6 className="fw-bold mb-0 me-4">Activo: </h6>
                        <MDBRadio
                          name="activo"
                          id="inlineRadio1"
                          value="si"
                          label="Si"
                          onChange={handleChange}
                          inline
                        />
                        <MDBRadio
                          name="activo"
                          id="inlineRadio2"
                          value="no"
                          label="No"
                          onChange={handleChange}
                          inline
                        />
                      </div>
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
