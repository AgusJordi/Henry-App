import React from "react";
import "./Profile.css";
import Container from "@material-ui/core/Container";

function Profile() {
  return (
    <div>
      <div className="padre">
        <div>
          <img
            className="foto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1fxA9MKWMi0uLOqys3eK8Ez8DQIPVB3b3gQ&usqp=CAU"
            alt=""
          />
        </div>
        <div className="hijouno">
          <h1>Cohorte: *7*</h1>
          <h1>Pm: Emi Checker</h1>
          <h1>Nombre: Henry's</h1>
          <h1>Apellido: IT</h1>
          <h1>Email: 7@soyHenry.com</h1>
          <h1>Ciudad: Henrylandia</h1>
          <h1>Provincia: Donde todo es posible</h1>
          <h1>Pais: IT</h1>
          <h1>Ubicacion: Internet</h1>
          <h1>Github: Androidpure</h1>
          <h1>Modulo: **HEnryApp**</h1>
          <h1>Pair programming: Everyday....</h1>
        </div>
        <div className="hijodos">
          <h1>Aca irian las estrellas del feedback</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
