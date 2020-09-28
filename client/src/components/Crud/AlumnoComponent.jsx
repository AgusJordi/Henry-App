import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { getStudentFromUserId } from "../../actions/index";
//button icon
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { green } from "@material-ui/core/colors";
//action
import { modifiedUser, modifiedStudent } from "../../actions/index";

function AlumnoComponent(props) {
  const { user, cohortes, grupos, cohortesInst } = props;

  const dispatch = useDispatch();
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
      setGroupName(myPioliStudent.group);
      setStudentId(myPioliStudent.id);
    }
  }, [myPioliStudent]);

  const cohorteTrue = cohortes.length > 0;
  const gruposTrue = grupos.length > 0;

  const [input, setInput] = useState({
    cohorte: ``,
    group: ``,
    pairProgramming: ``,
    pm: user.pm,
    instructor: user.instructor,
    student: user.student,
  });
  //estados iniciales del user
  const [cohorteName, setCohorteName] = useState("");
  const [grupoName, setGroupName] = useState("");
  const [studentId, setStudentId] = useState("");
  //estado inicial de instructor

  const [cohorteInstructor, setCohorteInstructor] = useState(cohortesInst);
  //funciones para eliminar/ agregar cohortes de instructor
  const deleteCohorte = (id) => {
    const newCohortes = cohorteInstructor.filter((item) => item.id !== id);
    setCohorteInstructor(newCohortes);
  };
  const addNewCohorte = (valor) => {
    setCohorteInstructor((cohorteInstructor) => [...cohorteInstructor, valor]);
  };

  // estados que cambia el user
  const [selectCohorte, setSelectCohorte] = useState("");
  const [selectGrupo, setSelectGrupo] = useState("");

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  //funciones change de select
  const handleChangeCohorte = (e) => {
    input.cohorte = e.target.value;
    setSelectCohorte(e.target.value);
  };

  const handleChangeGrupo = (e) => {
    input.group = e.target.value;
    setSelectGrupo(e.target.value);
  };
  //funcion que cambia el valor de los switch
  const handleSwitchChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.checked,
    });
  };
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
  const editUser = (id, data) => {
    dispatch(modifiedUser(id, data));
    console.log("click");
  };
  const editStudent = (id, data) => {
    dispatch(modifiedStudent(id, data));
    console.log("click stu");
  };
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
  }));
  const classes = useStyles();

  return (
    <Fragment>
      <TableRow key={user.id}>
        <TableCell align="center">{user.email}</TableCell>
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
            <Dialog open={openIn} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">
                Cohortes Actuales
              </DialogTitle>
              <DialogContent className={classes.cohoActual}>
                {cohorteInstructor.map((cohorte) => {
                  return (
                    <div>
                      {cohorte.name}
                      <IconButton aria-label="delete" color="secondary">
                        <DeleteIcon onClick={() => deleteCohorte(cohorte.id)} />
                      </IconButton>
                    </div>
                  );
                })}
              </DialogContent>
              <DialogTitle id="form-dialog-title">Agregar Cohortes</DialogTitle>
              <DialogContent>
                {cohortes.map((cohorte) => {
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
                    onClick={() => {
                      editStudent(user.id, input);
                    }}
                  >
                    Modificar
                  </Button>
                </DialogActions>
              </div>
            </Dialog>
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
                  <em>no existen array</em>
                </MenuItem>
              )}
            </Select>
          </TableCell>
        )}
        <TableCell>
          <InputLabel id="demo-controlled-open-select-label">
            {grupoName ? grupoName : "Namegrupo afk"}
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
        <TableCell>
          <Select
            labelId="selectpairProgramming"
            id="selectpairProgrammingOp"
            value={input.pairProgramming}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* MAPEAR LISTA DE cohortes Y DEVOLVER UN MENUITEM X CADA UNO */}
            {/* {prueba ? (
              allCohortes.map((cohorte) => {
                let id = cohorte.id;
                return <MenuItem value={id}>{cohorte.name}</MenuItem>;
              })
            ) : (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )} */}
          </Select>
        </TableCell>
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
                  onClick={() => editUser(user.id, input)}
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
                editStudent(myPioliStudent.id, input);
              }}
            >
              Confirmar
            </Button>
            <Button
              size="small" /* El onclick debe ir con el actions para no perderse*/
              color="secondary"
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
