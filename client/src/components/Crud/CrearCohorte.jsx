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

  const handleCreateCohorte = function (e) {
    /*setInput({
      ...input,
      [e.target.name]: e.target.value
    });*/
    e.preventDefault(); //A TENER EN CUENTA
    console.log(emails, input, "ACA ESTOY EN COMPONENTE");
    createCohorte(input, emails);
    setInputB(inputB);
    swal({
      text: "Se creó el Cohorte" + input.cohorte,
      icon: "success",
      timer: "3000",
    });
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
        {console.log(props.instructores)}
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
            {/* <TextField
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
            /> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="instructor-native-simple">
                Instructor
              </InputLabel>
              <Select
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
                {/* <option aria-label="None" value="" />
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option> */}
              </Select>
            </FormControl>

            <TextField
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

            <Chip onChange={setEmails} />

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
  };
};

export default connect(mapStateToProps)(CrearCohorte);
