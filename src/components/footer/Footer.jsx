import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <>
      <footer className="Footer">
        <div className="contactData">
          <h3>Direccion</h3>
          <div>C/ Francesc Moragas 3, 1º 3ª. Sant Cugat del Vallès, 08172</div>
        </div>
        <div className="contactData">
          <h3>Horario</h3>
          <div>Lunes a viernes de 9:30 a 14:00h</div>
          <div>Lunes y martes de 16:00 a 20:00h</div>
        </div>
        <div className="contactData">
          <h3>Contacto</h3>
          <div>Teléfono: 684165405</div>
          <div>Correo: diazsalerno@hotmail.com</div>
        </div>
      </footer>
    </>
  );
}
