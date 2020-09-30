import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createCohorte, createUsersStudents } from "../../actions/index.js";
import Chip from "./chip.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";

function CrearCohorte(props) {

  const [input, setInput] = useState({
    cohorte: "",
    instructorId: "",
    DateA: "",
  });

  const [emails, setEmails] = useState([]);
  const [prueba, setPrueba] = useState(false);

  const [inputB, setInputB] = useState({
    cohorte: "",
    instructor: "",
    DateA: "",
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  var existentes = [];
  // }
  const filtrar = (emails, usuarios) => {
    for (let i = 0; i < emails.length; i++) {
      for (let j = 0; j < usuarios.length; j++) {
        if (emails[i] === usuarios[j].email) {
          existentes.push(emails[i])
        }
      }
    }
    return existentes
  }
  const borrarChips = () => {
    setPrueba(true)
  }
  const handleCreateCohorte = function (e) {
    e.preventDefault();
    console.log(emails, input, "ACA ESTOY EN COMPONENTE");
    filtrar(emails, props.all_users)    //filtrar los emails-->devolver un array de los emails que ya existen en all_users
    if (existentes.length > 0) {  //si ese array contiene aunque sea un elemento, mandar alert con un mensaje y el contenido de ese array
      swal({
        title: 'Oops...',
        text: "Los siguientes emails ya se encuentran en uso: " + existentes,
        icon: "error",
        timer: "3000",
      });
      existentes = [];
      return;
    }
    //si no contiene ningun elemento en "existentes" puede avanzar con crearCohorte
    createCohorte(input, emails);
    setInputB(inputB);
    swal({
      text: "Se creó el Cohorte" + input.cohorte,
      icon: "success",
      timer: "3000",
    });
    setInput({
      cohorte: "",
      instructorId: "",
      DateA: "",
    });
    borrarChips();
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div>
        <form onSubmit={handleCreateCohorte}>
          <div>
            {/* <TextField
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
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="instructor-native-simple">
                Instructor
              </InputLabel>
              <Select
                required
                native
                value={input.instructorId}
                onChange={handleInputChange}
                inputProps={{
                  name: "instructorId",
                  id: "instructor-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {props.all_instructors.map((instructor) => (
                  <option value={instructor.id}>
                    {instructor.name + " " + instructor.lastName}
                  </option>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              name="DateA"
              type="date"
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

            <Chip onChange={setEmails} borrar={setPrueba} estado={prueba} />

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

const mapStateToProps = (state) => {
  return {
    all_instructors: state.all_instructors,
    all_users: state.all_users,
  };
};

export default connect(mapStateToProps)(CrearCohorte);
