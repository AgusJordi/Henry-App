import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import swal from 'sweetalert';


// S9 : Crear Formulario para creación de Categorías

function CrearCohorte() {
  const [input, setInput] = useState({
    cohorte: '',
    instructor: '',
    DateA: '',
    DateB: '',
  });
  const inputB = {
    cohorte: '',
    instructor: '',
    DateA: '',
    DateB: '',
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }
  

  return (
    <div>
      <div>
        <form /*Aca va el submitCrud*/>
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
            <TextField
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
            />
            <TextField
              name='DateB'
              type='text'
              id="standard-full-width"
              label="fecha de finalizacion"
              style={{ margin: 8 }}
              value={input.DateB}
              placeholder="fecha de finalizacion"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {handleInputChange}
            />

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