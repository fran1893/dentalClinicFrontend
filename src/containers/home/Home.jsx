import React from "react";
import "./Home.scss";
import { Button, Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import dentalCleaning from "../../assets/dental-cleaning.jpg";
import dentalWhitening from "../../assets/whitening.jpg";
import dentalBrakets from "../../assets/brakets.jpg";
import {Footer} from "../../components";

export default function Home() {
  return (
    <div className="Home">
      <div className="text-center welcome">
        <div className="welcomeText">
          <h1>Somos tu Clínica Dental</h1>
        </div>
      </div>

      <div className="register">
        <div className="paragraphsAndButton">
          <div className="paragraphs">
            <p>
              En nuestra clínica, nos dedicamos a brindar una atención dental de
              calidad para cuidar de tu salud bucal.
            </p>
            <p>
              Contamos con un equipo de profesionales altamente capacitados y
              las últimas tecnologías en el campo de la odontología.
            </p>
          </div>
          <div className="buttonWelcome text-center">
            <Button size="lg" variant="primary">
              ¡Regístrate y crea una cita!
            </Button>
          </div>
        </div>
      </div>

      <CardGroup className="treatments">
        <Card>
          <Card.Img variant="top" src={dentalCleaning} />
          <Card.Body>
            <Card.Title>Limpieza dental</Card.Title>
            <Card.Text>
              Realizamos limpiezas dentales profesionales para mantener tus
              dientes y encías saludables.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-center">
            <small className="text-muted">¡Registrate y pide cita!</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={dentalWhitening} />
          <Card.Body>
            <Card.Title>Blanqueamiento dental</Card.Title>
            <Card.Text>
              Mejora el color de tus dientes con nuestro servicio de
              blanqueamiento dental.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-center">
            <small className="text-muted">¡Registrate y pide cita!</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={dentalBrakets} />
          <Card.Body>
            <Card.Title>Tratamientos de ortodoncia</Card.Title>
            <Card.Text>
              Corregimos problemas de alineación dental utilizando diferentes
              opciones de ortodoncia.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-center">
            <small className="text-muted">¡Registrate y pide cita!</small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <Footer />
    </div>
  );
}
