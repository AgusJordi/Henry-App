import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createCohorte, createUsersStudents } from "../../actions/index.js";
import Chip from "./chip.jsx"

function CrearCohorte() {
  const [input, setInput] = useState({
    cohorte: "",
    instructor: "",
    DateA: '',
  });

  const [emails, setEmails] = useState([])

  const [inputB, setInputB] = useState({
    cohorte: "",
    instructor: "",
    DateA: '',
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };


  const handleCreateCohorte = function (e) {
    /*setInput({
      ...input,
      [e.target.name]: e.target.value
    });*/
    e.preventDefault(); //A TENER EN CUENTA
    console.log(
      emails,
      input,
      "ACA ESTOY EN COMPONENTE"
    );
    createCohorte(input, emails);
    swal({
      text: "Se creó el Cohorte" + input.cohorte,
      icon: "success",
      timer: "3000",
    });
    setInputB(inputB);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleCreateCohorte}>
          <div>
            <TextField
              required
              name="cohorte"
              type="text"
              id="standard-full-width"
              label="Nombre Cohorte"
              helperText="Ej: FT03"
              style={{ margin: 8 }}
              placeholder="Ingrese nombre de cohorte"
              fullWidth
              value={input.cohorte}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              name="instructor"
              type="text"
              id="standard-full-width"
              label="Instructor"
              style={{ margin: 8 }}
              value={input.instructor}
              placeholder="instructor"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              name='DateA'
              type='date'
              id="standard-full-width"
              label="Fecha de inicio"
              style={{ margin: 8 }}
              value={input.DateA}
              placeholder="Fecha de inicio"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />


            <Chip
              onChange={setEmails}
            // seteando={setEmails}
            />
            <br />


            {/* <TextField
              name='students'
              type='text'
              id="standard-full-width"
              label="Alumnos del cohorte"
              style={{ margin: 8 }}
              value={input.students} 
              placeholder="Ingresar alumnos"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {handleInputChange}
            />  */}
            <div>
              <br />
              <Button
                type="submit"
                variant="contained"
                align="left"
                size="medium"
                color="primary"
              >
                AGREGAR COHORTE
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CrearCohorte;
