import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
//switch
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
//select
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
  getStudentFromUserId,
  modifiedCohorteInstructor,
} from "../../actions/index";
//button icon
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { green } from "@material-ui/core/colors";
//action
import {
  modifiedUser,
  modifiedStudent,
  deleteUserById,
  getCohortesById,
  deleteSetudentById,
} from "../../actions/index";
//alert
import swal from "sweetalert";
import Swal from "sweetalert2";
//reload

function AlumnoComponent(props) {
  const { user, cohortes, grupos, cohortesInst, instructores } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const studentFromUserId = useSelector((state) => state.student_from_userId);

  useEffect(() => {
    if (user.student === true) {
      dispatch(getStudentFromUserId(user.id));
    }
  }, []);

  const myPioliStudent = studentFromUserId[user.id];

  useEffect(() => {
    if (myPioliStudent) {
      setCohorteName(myPioliStudent.cohorte.name);
      if (myPioliStudent.groupId === null) {
        setGroupName("No tiene grupo");
      } else {
        setGroupName(myPioliStudent.group.name);
      }

      setStudentId(myPioliStudent.id);
      setCohorteIdStu(myPioliStudent.cohorteId);
      setGroupIdStu(myPioliStudent.groupId);
    }
  }, [myPioliStudent]);
  const cohorteTrue = cohortes.length > 0;
  const gruposTrue = grupos.length > 0;

  const [input, setInput] = useState({
    pm: user.pm,
    instructor: user.instructor,
    student: user.student,
  });
  //set state para input put student
  const [cohorteIdStu, setCohorteIdStu] = useState();
  const [groupIdStu, setGroupIdStu] = useState();

  // if (cohorteFromId) {
  //
  // }
  //state input student
  const [inputStudent, setInputStudent] = useState({
    cohorteId: cohorteIdStu,
    groupId: groupIdStu,
  });

  //estados iniciales del user
  const [cohorteName, setCohorteName] = useState("");
  const [grupoName, setGroupName] = useState("");
  const [studentId, setStudentId] = useState("");
  //estado inicial de cohorte del instructor
  const [cohorteInstructor, setCohorteInstructor] = useState(cohortesInst);
  //funciones para eliminar/ agregar cohortes de instructor
  console.log("pla", grupoName);
  const deleteCohorte = (id) => {
    const InstructorNull = { instructorId: null };
    swal({
      title: "ATENCION",
      text:
        "El cohorte que selecciono eliminar se quedara sin Instructor. ¿Desea cambiarlo?",
      icon: "warning",
      buttons: {
        cancel: "NO",
        confirm: "SI",
      },
      dangerMode: true,
    }).then((result) => {
      if (result) {
        const newCohortes = cohorteInstructor.filter((item) => item.id !== id);
        setCohorteInstructor(newCohortes);
        dispatch(modifiedCohorteInstructor(id, InstructorNull));
      }
      if (result === null) {
        return;
      }
    });
  };
  let pruebaSarasa = false;
  let cohortesConInst = cohorteInstructor.filter(
    (cohorte) => cohorte.instructorId !== user.id
  );
  let cohorteUpdate = {
    instructorId: "",
    date: "",
  };
  const addNewCohorte = (valor) => {
    setCohorteInstructor((cohorteInstructor) => [...cohorteInstructor, valor]);
  };
  // se fija si los cohortes a cambiar no pertenecen a otro instructor

  const editCohorteInst = () => {
    if (cohortesConInst.length > 0) {
      swal({
        title: "ATENCION",
        text:
          "Uno de los cohortes que eligió ya tiene un Instructor. ¿Desea cambiarlo?",
        icon: "warning",
        buttons: {
          cancel: "NO",
          confirm: "SI",
        },
        dangerMode: true,
      }).then((result) => {
        if (result) {
          cohortesConInst.map((coho) => {
            cohorteUpdate.instructorId = user.id;
            cohorteUpdate.date = coho.date;

            return dispatch(modifiedCohorteInstructor(coho.id, cohorteUpdate));
          });
        }
        if (result === null) {
          return;
        }
        if (result) {
          history.push("/");
          window.location.reload();
        }
      });
    }
  };
  // estados que cambia el user

  const [selectCohorte, setSelectCohorte] = useState("");
  const [selectGrupo, setSelectGrupo] = useState("");
  const [selectGrupoPP, setSelectGrupoPP] = useState("");
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //funciones change de select
  const handleChangeCohorte = (e) => {
    setInputStudent({
      ...inputStudent,
      cohorteId: e.target.value,
    });

    setSelectCohorte(e.target.value);
  };

  const handleChangeGrupo = (e) => {
    inputStudent.groupId = e.target.value;
    setSelectGrupo(e.target.value);
  };
  //funcion que cambia el valor de los switch
  const handleSwitchChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.checked,
    });
  };
  let pruebasa = user.student + user.pm;
  //cohorte a renderizar por instructor
  let cohortesArenderizar = [];
  if (cohortes) {
    for (let i = 0; i < cohortes.length; i++) {
      let igual = false;
      for (let j = 0; (j < cohorteInstructor.length) & !igual; j++) {
        if (cohortes[i]["id"] == cohorteInstructor[j]["id"]) igual = true;
      }
      if (!igual) cohortesArenderizar.push(cohortes[i]);
    }
  }
  //open/clese modal editar
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //open/close modal instructor cohorte
  const [openIn, setOpenIn] = useState(false);

  const handleOpenIn = () => {
    setOpenIn(true);
  };

  const handleCloseIn = () => {
    setOpenIn(false);
  };

  //funcion update

  const editUser = (id, data, studentId) => {
    if (input.student === false) {
      dispatch(deleteSetudentById(studentId));
    }
    dispatch(modifiedUser(id, data));

    history.push("/");
    window.location.reload();
  }; //test
  const editStudent = (id, data) => {
    Swal.fire({
      title: "¿Desea generar los cambios?",
      showDenyButton: true,
      denyButtonText: `No guardar`,
      confirmButtonText: `Guardar`,
      reverseButtons: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(modifiedStudent(id, data));
        Swal.fire("¡Guardado!", "", "Exito");
        history.push("/");
        window.location.reload();
      }

      if (result.isDenied) {
        Swal.fire("Los cambios no han sido guardados", "", "info");
      }
    });
  };

  //elimina un usuario por id
  const deleteUser = (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¡Está por eliminar un usurio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserById(id));
        Swal.fire("Eliminado!", "Usuario eliminado", "GG");
        history.push("/");
        window.location.reload();
      }
      if (result.isDenied) {
        Swal.fire("Los cambios no fueron realizados", "", "info");
      }
    });
  };

  //put cambia el instructor de un cohorte
  const updateCohorteInst = (id, instructorId) => {};
  //style
  const useStyles = makeStyles((theme) => ({
    switchRoot: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 22,
    },
    buttonEnviar: {
      backgroundColor: "#6BAD24",
      "&:hover": {
        backgroundColor: "#629E21",
      },
    },
    buttonMas: {
      textAlignLast: "center",
    },
    rootChips: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    cohoActual: {
      display: "flex",
    },
    addCohorte: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    swalZ: {
      zIndex: 1000,
    },
  }));
  const classes = useStyles();

  return (
    <Fragment>
      <TableRow key={user.id}>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">
          {user.instructor
            ? "Instructor"
            : user.student
            ? user.pm
              ? "Estudiante/Pm"
              : "Estudiante"
            : "No tiene estado"}
        </TableCell>
        {user.instructor ? (
          <TableCell className={classes.buttonMas}>
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button
                size="large"
                onClick={handleOpenIn} /*onClick con la props*/
                fullWidth
              >
                ...Mas
              </Button>
            </ButtonGroup>
            <div className={classes.swalZ}>
              <Dialog open={openIn} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                  Cohortes Actuales
                </DialogTitle>
                <DialogContent className={classes.cohoActual}>
                  {cohorteInstructor ? (
                    cohorteInstructor.map((cohorte) => {
                      return (
                        <div>
                          {cohorte.name}
                          <IconButton aria-label="delete" color="secondary">
                            <DeleteIcon
                              onClick={() => deleteCohorte(cohorte.id)}
                            />
                          </IconButton>
                        </div>
                      );
                    })
                  ) : (
                    <h1>No tiene cohortes</h1>
                  )}
                </DialogContent>
                <DialogTitle id="form-dialog-title">
                  Agregar Cohortes
                </DialogTitle>
                <DialogContent>
                  {cohortesArenderizar.map((cohorte) => {
                    return (
                      <div className={classes.addCohorte}>
                        {cohorte.name}
                        <IconButton
                          aria-label="add"
                          style={{ color: green[500] }}
                        >
                          <AddCircleTwoToneIcon
                            onClick={() => addNewCohorte(cohorte)}
                          />
                        </IconButton>
                      </div>
                    );
                  })}
                </DialogContent>

                <div style={{ margin: 8 }}>
                  <DialogActions>
                    <Button color="primary" onClick={handleCloseIn}>
                      Cerrar
                    </Button>

                    <Button
                      type="submit"
                      /*el onclick de actualizar debe ir con el actions*/
                      color="primary"
                      onClick={() => editCohorteInst()}
                    >
                      Modificar
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
            </div>
          </TableCell>
        ) : (
          <TableCell>
            <InputLabel id="demo-controlled-open-select-label">
              {cohorteName}
            </InputLabel>
            <Select
              labelId="selectCohorte"
              id="selectCohorteOp"
              value={selectCohorte}
              onChange={handleChangeCohorte}
              fullWidth
            >
              {/* MAPEAR LISTA DE cohortes Y DEVOLVER UN MENUITEM X CADA UNO */}
              {cohorteTrue ? (
                cohortes.map((cohorte) => {
                  let id = cohorte.id;
                  return (
                    <MenuItem value={id} key={id}>
                      {cohorte.name}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value="">
                  <em>No existen cohortes</em>
                </MenuItem>
              )}
            </Select>
          </TableCell>
        )}
        {user.instructor ? (
          <Fragment>
            <TableCell>
              <InputLabel id="demo-controlled-open-select-label">
                Sin grupo
              </InputLabel>
              <Select
                labelId="selectGroup"
                id="selectGroupOp"
                value={selectGrupo}
                onChange={handleChangeGrupo}
                fullWidth
                disabled
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {/* MAPEAR LISTA DE cohortes Y DEVOLVER UN MENUITEM X CADA UNO */}
                {gruposTrue ? (
                  grupos.map((grupo) => {
                    let id = grupo.id;
                    return <MenuItem value={id}>{grupo.name}</MenuItem>;
                  })
                ) : (
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                )}
              </Select>
            </TableCell>
          </Fragment>
        ) : (
          <Fragment>
            <TableCell>
              <InputLabel id="demo-controlled-open-select-label">
                {grupoName ? grupoName : "Sin grupo"}
              </InputLabel>
              <Select
                labelId="selectGroup"
                id="selectGroupOp"
                value={selectGrupo}
                onChange={handleChangeGrupo}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {/* MAPEAR LISTA DE cohortes Y DEVOLVER UN MENUITEM X CADA UNO */}
                {gruposTrue ? (
                  grupos.map((grupo) => {
                    let id = grupo.id;
                    return <MenuItem value={id}>{grupo.name}</MenuItem>;
                  })
                ) : (
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                )}
              </Select>
            </TableCell>
          </Fragment>
        )}

        <TableCell align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button size="small" onClick={handleOpen} /*onClick con la props*/>
              Permisos
            </Button>
          </ButtonGroup>
          <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Modificar Usuario</DialogTitle>
            <DialogContent>
              <FormGroup row className={classes.switchRoot}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={input.pm}
                      onChange={handleSwitchChange}
                      name="pm"
                      color="primary"
                    />
                  }
                  label="Pm"
                  labelPlacement="top"
                />

                {input.student === "true" || input.student === true ? (
                  <FormControlLabel
                    disabled
                    control={<Switch />}
                    label="Instructor"
                    labelPlacement="top"
                  />
                ) : (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={input.instructor}
                        onChange={handleSwitchChange}
                        name="instructor"
                        color="primary"
                      />
                    }
                    label="Instructor"
                    labelPlacement="top"
                  />
                )}
                {input.instructor === "true" || input.instructor === true ? (
                  <FormControlLabel
                    disabled
                    control={<Switch />}
                    label="Alumno"
                    labelPlacement="top"
                  />
                ) : (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={input.student}
                        onChange={handleSwitchChange}
                        name="student"
                        color="primary"
                      />
                    }
                    label="Alumno"
                    labelPlacement="top"
                  />
                )}
              </FormGroup>
            </DialogContent>
            <div style={{ margin: 8 }}>
              <DialogActions>
                <Button color="primary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button
                  type="submit"
                  /*el onclick de actualizar debe ir con el actions*/
                  color="primary"
                  onClick={() => editUser(user.id, input, studentId)}
                >
                  Modificar
                </Button>
              </DialogActions>
            </div>
          </Dialog>
          <ButtonGroup disableElevation variant="contained">
            <Button
              size="small" /* El onclick debe ir con el actions para no perderse*/
              color="primary"
              className={classes.buttonEnviar}
              onClick={() => {
                editStudent(studentId, inputStudent);
              }}
            >
              Confirmar
            </Button>
            <Button
              size="small" /* El onclick debe ir con el actions para no perderse*/
              color="secondary"
              onClick={() => deleteUser(user.id)}
            >
              Eliminar
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default AlumnoComponent;
