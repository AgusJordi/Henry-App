import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { getAlumnosFromCohorte } from "../../actions/index.js";
import axios from "axios";

export function CrearGrupo(props) {
  const { all_cohortes, students_from_cohorte } = props;
  const [input, setInput] = useState({
    cohorteId: "",
    usuariosHabilitados: students_from_cohorte,
    cantidadGrupos: "",
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //Trae los alumnos x cohorte cuando cambia el select de cohorte
  useEffect(() => {
    props.getAlumnosFromCohorte(input.cohorteId);
    setInput({
      ...input,
      cantidadGrupos: "",
    });
  }, [input.cohorteId]);

  //Setea los usuarios habilitados cuando cambia el estado en redux
  var activos = [];
  useEffect(() => {
    filtrarActivos(students_from_cohorte);
    setInput({
      ...input,
      usuariosHabilitados: activos,
    });
  }, [students_from_cohorte]);

  const filtrarActivos = (students) => {
    activos = students.filter(
      (student) => student.user.status === "habilitado"
    );
    return activos;
  };

  const division = (usuarios, grupos) => {
    var resultado = Math.floor(usuarios.length / Number(grupos));
    return resultado;
  };

  const createGrupo = (input) => {
    var url = "http://localhost:4000/grupos/add";
    axios({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        cohorteId: Number(input.cohorteId),
        cantidadGrupos: input.cantidadGrupos,
        usuariosHabilitados: input.usuariosHabilitados,
      },
    });
  };

  const handleCreateGrupo = function (e) {
    e.preventDefault();
    createGrupo(input);
    swal({
      text: "Se han creado " + input.cantidadGrupos + " grupos",
      icon: "success",
      timer: "3000",
    });
    setInput({
      ...input,
      cohorteId: "",
      cantidadGrupos: "",
      usuariosHabilitados: [],
    });
  };

  //reviso si array esta vacio
  let arrayClear = false;

  if (all_cohortes.length > 0) {
    arrayClear = true;
  }

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
        <form onSubmit={(e) => handleCreateGrupo(e)}>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="cohorte-simple-select-label">
                Cohorte
              </InputLabel>
              <Select
                required
                native
                value={input.cohorteId}
                onChange={handleInputChange}
                inputProps={{
                  name: "cohorteId",
                  id: "cohorte-simple-select",
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
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="standard-number"
                value={input.cantidadGrupos}
                onChange={handleInputChange}
                label="Cantidad de grupos"
                type="number"
                min="1"
                name="cantidadGrupos"
                InputProps={{
                  inputProps: { min: 1, max: input.usuariosHabilitados.length },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            {/* No te asustes! Acá solo hacemos las cuentas para adaptar el mensaje al resultado de la división. */}

            {input.usuariosHabilitados.length ? (
              <p>
                Hay {input.usuariosHabilitados.length} alumnos activos en este
                cohorte{" "}
              </p>
            ) : (
              ""
            )}
            {input.usuariosHabilitados.length !== 1 &&
            input.cohorteId !== "" &&
            input.cantidadGrupos !== "" ? (
              <p>
                Se creara {input.cantidadGrupos}{" "}
                {input.cantidadGrupos !== "1" ? "grupos" : "grupo"} con{" "}
                {input.usuariosHabilitados.length % input.cantidadGrupos !== 0
                  ? " alrededor de "
                  : " "}{" "}
                {division(input.usuariosHabilitados, input.cantidadGrupos)}
                {division(input.usuariosHabilitados, input.cantidadGrupos) > 1
                  ? " alumnos"
                  : " alumno"}{" "}
                en cada grupo{" "}
              </p>
            ) : (
              ""
            )}

            <div>
              <br />
              <Button
                type="submit"
                variant="contained"
                align="left"
                size="medium"
                color="primary"
              >
                CREAR GRUPOS
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
