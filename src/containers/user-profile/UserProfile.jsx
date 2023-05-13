import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import userService from "../../_services/userService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { setUserInfo } from "../../features/authentication/authSlice";
import { store } from "../../app/store";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import profileImage from "../../assets/profile-image.png";

export default function UserProfile() {
  // HOOKS
  const [profile, setProfile] = useState({});
  const [formValues, setFormValues] = useState({});
  const [showForm, setShowForm] = useState(false);

  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.userToken) {
      getProfile(authState.userToken);
    } else {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const getProfile = async (token) => {
    try {
      const response = await userService.getProfile(token);

      setProfile(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (token, newUserData) => {
    await userService.updateProfile(token, newUserData);
  };

  // HANDLERS
  const handleSubmit = () => {
    updateProfile(authState.userToken, formValues);
    if (formValues.nombre) {
      store.dispatch(setUserInfo({ name: formValues.nombre }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, //key: value
    });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  // RETURN
  return (
    <div className="container Userprofile">
      <section>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard
                className="mb-3"
                style={{
                  borderRadius: ".5rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                }}
              >
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="text-center text-black"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src={profileImage}
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <MDBTypography tag="h5">
                      {profile.nombre} {profile.apellidos}
                    </MDBTypography>
                    <MDBCardText>
                      {authState.userInfo.role.toUpperCase()}
                    </MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Información</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol className="mb-3 col-12">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {profile.email}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol className="mb-3 col-12 col-md-6">
                          <MDBTypography tag="h6">Teléfono</MDBTypography>
                          <MDBCardText className="text-muted">
                            {profile.telefono}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol className="mb-3 col-12 col-md-6">
                          <MDBTypography tag="h6">Edad</MDBTypography>
                          <MDBCardText className="text-muted">
                            {profile.edad}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {!showForm && (
          <div className="showButtonContainer">
            <Button variant="outline-danger" onClick={handleShowForm}>
              Actualizar datos
            </Button>
          </div>
        )}

        {showForm && (
          <div className="showButtonContainer">
            <Button variant="outline-secondary" onClick={handleHideForm}>
              No actualizar datos
            </Button>
          </div>
        )}
      </section>

      {showForm && (
        <section className="formContainer">
          <Form className="updateForm" noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Actualize su nombre"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Actualize su apellido"
                name="apellidos"
                value={formValues.apellidos}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Debe incluir solo el primer apellido
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Actualize su edad"
                name="edad"
                value={formValues.edad}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Actualize su email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Nunca compartiremos tu correo con terceros.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="number"
                placeholder="Actualize su Teléfono"
                name="telefono"
                value={formValues.telefono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Cambie su contraseña"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <Form.Text muted>
                Su contraseña debe tener mínimo 8 caracteres y no debe contener
                espacios.
              </Form.Text>
            </Form.Group>
            <div className="updateButton">
              <Button variant="primary" type="submit">
                Editar
              </Button>
            </div>
          </Form>
        </section>
      )}
    </div>
  );
}
