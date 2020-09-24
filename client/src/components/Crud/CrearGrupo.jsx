import React, { useState, useEffect } from "react";
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
import ModalUsersCheckbox from "../ModalUsersCheckbox.jsx";
import { getAlumnosFromCohorte } from "../../actions/index.js";

export function CrearGrupo(props) {
  //recibe pms por props
  const { all_cohortes } = props;
  const [input, setInput] = useState({
    cohorteId: "",
    grupo: "",
    PM1Id: "",
    PM2Id: "",
  });
  // const [alumnos, setAlumnos] = useState([]);

  const [inputB, setInputB] = useState({
    cohorte: "",
    instructor: "",
    DateA: "",
  });
  // const [modalUser, setModalUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // const [alumnos, setAlumnos]= useState(props.students_from_cohorte);
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    props.getAlumnosFromCohorte(input.cohorteId);
    // setAlumnos (props.students_from_cohorte)
  }, [input.cohorteId]);
  // const handleCreateGrupo = function (e) {
  //     e.preventDefault(); //A TENER EN CUENTA

  //     createCohorte(input, emails);
  //     setInputB(inputB);
  //     swal({
  //     text: "Se creó el Grupo " + input.grupo,
  //     icon: "success",
  //     timer: "3000",
  //     });
  // };

  //reviso si array esta vacio
  let arrayClear = false;

  if (all_cohortes.length > 0) {
    arrayClear = true;
  }

  const handleOpenModal = () => {
    setOpenModal(true);
    // setModalUser(value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        <form
        // onSubmit={handleCreateGrupo}
        >
          <div>
            <ModalUsersCheckbox
              users={props.students_from_cohorte}
              state={openModal}
              close={handleCloseModal}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="cohorte-native-simple">Cohorte</InputLabel>
              <Select
                native
                value={input.cohorteId}
                onChange={handleInputChange}
                inputProps={{
                  name: "cohorteId",
                  id: "cohorte-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {arrayClear ? (
                  all_cohortes.map((cohorte) => (
                    <option value={cohorte.id}>{cohorte.name}</option>
                  ))
                ) : (
                  <option value="">No hay cohortes</option>
                )}
              </Select>
            </FormControl>

            <TextField
              required
              name="grupo"
              type="text"
              id="standard-full-width"
              label="Nombre Grupo"
              helperText="Ej: sofi-pablo"
              style={{ margin: 8 }}
              placeholder="Ingrese nombre del grupo"
              fullWidth
              value={input.grupo}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="pm1-native-simple">Pm 1</InputLabel>
              <Select
                native
                value={input.PM1Id}
                onChange={handleInputChange}
                inputProps={{
                  name: "PM1Id",
                  id: "pm1-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {props.all_pms.map((pm) => (
                  <option value={pm.id}>{pm.name + " " + pm.lastName}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="pm2-native-simple">Pm 2</InputLabel>
              <Select
                native
                value={input.PM2Id}
                onChange={handleInputChange}
                inputProps={{
                  name: "PM2Id",
                  id: "pm2-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {props.all_pms.map((pm) => (
                  <option value={pm.id}>{pm.name + " " + pm.lastName}</option>
                ))}
              </Select>
            </FormControl>
            <div>
              <a
                className={classes.a}
                href="#"
                onClick={() => handleOpenModal()}
              >
                Seleccionar alumnos
              </a>
            </div>

            {/* <Chip onChange={setEmails} /> */}

            <div>
              <br />
              <Button
                type="submit"
                variant="contained"
                align="left"
                size="medium"
                color="primary"
              >
                CREAR GRUPO
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAlumnosFromCohorte: (cohorteId) =>
      dispatch(getAlumnosFromCohorte(cohorteId)),
  };
};
const mapStateToProps = (state) => {
  return {
    all_pms: state.all_pms,
    all_cohortes: state.all_cohortes,
    students_from_cohorte: state.students_from_cohorte,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrearGrupo);
