import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import swal from 'sweetalert';
import {createCohorte} from '../../actions/index.js';


function CrearCohorte() {
  
  const [input, setInput] = useState({
    cohorte: '',
    instructor: '',
    //DateA: '',
  });

  const [inputB, setInputB] = useState({
    cohorte: '',
    instructor: '',
    //DateA: '',
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleCreateCohorte = function (e) {
    /*setInput({
      ...input,
      [e.target.name]: e.target.value
    });*/
    e.preventDefault(); //A TENER EN CUENTA
    console.log(input, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA ESTOY EN COMPONENTE")
    createCohorte(input);
    /*Aca iria la alerta*/
    setInputB(inputB);
  }
  

  return (
    <div>
      <div>
        <form onSubmit = {handleCreateCohorte} >
          <div>
            <TextField
              name='cohorte'
              type='text'
              id="standard-full-width"
              label="Cohorte"
              style={{ margin: 8 }}
              placeholder="Ingrese nombre de cohorte"
              fullWidth
              value={input.cohorte}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {handleInputChange}
            />
            <TextField
              name='instructor'
              type='text'
              id="standard-full-width"
              label="nombre"
              style={{ margin: 8 }}
              value={input.instructor}
              placeholder="instructor"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {handleInputChange}
            />
      {/*   <TextField
              name='DateA'
              type='text'
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
              onChange = {handleInputChange}
            /> falta combinar el front*/}
            <div>
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