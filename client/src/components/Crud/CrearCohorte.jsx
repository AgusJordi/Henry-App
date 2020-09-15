import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// S9 : Crear Formulario para creación de Categorías

function CrearCohorte() {
  const [input, setInput] = useState({
    cohorte: "",
    instructor: "",
    DateA: "",
    DateB: "",
  });
  const inputB = {
    cohorte: "",
    instructor: "",
    DateA: "",
    DateB: "",
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const useStyles = makeStyles((theme) => ({
    bottonPosition: {
      display: "flex",
      justifyContent: "flex-end",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();

  return (
    <FormControl fullWidth="true" /*Aca va el submitCrud*/>
      <TextField
        name="cohorte"
        type="text"
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
        onChange={handleInputChange}
      />
      <TextField
        name="instructor"
        type="text"
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
        onChange={handleInputChange}
      />
      <TextField
        name="DateA"
        id="standard-full-width"
        label="Fecha de inicio"
        type="date"
        defaultValue="2019-05-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleInputChange}
      />
      <TextField
        name="DateB"
        id="standard-full-width"
        label="Fecha de inicio"
        type="date"
        defaultValue="2019-05-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleInputChange}
      />

      <div className={classes.bottonPosition}>
        <Button type="submit" variant="contained" size="medium" color="primary">
          AGREGAR COHORTE
        </Button>
      </div>
    </FormControl>
  );
}

export default CrearCohorte;
