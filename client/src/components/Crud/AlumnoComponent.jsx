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
function AlumnoComponent(props) {
  const { user, cohortes } = props;

  const dispatch = useDispatch();
  const studentFromUserId = useSelector((state) => state.student_from_userId);
  useEffect(() => {
    dispatch(getStudentFromUserId(user.id));
  }, []);
  // console.log("pla", user.id, studentFromUserId);
  const prueba = cohortes.length > 0;
  const myPioliStudent = studentFromUserId[user.id];

  useEffect(() => {
    // Aca seteamo lo que faltaba en el estado
    // setInput()
  }, [myPioliStudent]);
  console.log(user.id, myPioliStudent);
  // busco el cohorte id del user

  const [input, setInput] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    cohorte: ``,
    group: ``,
    pairProgramming: ``,
    pm: user.pm,
    instructor: user.instructor,
    student: user.student,
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectChange = (e) => {
    console.log("cambie desdes function");
  };
  const handleSwitchChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.checked,
    });
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //style
  const useStyles = makeStyles((theme) => ({
    switchRoot: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 22,
    },
  }));
  const classes = useStyles();

  return (
    <Fragment>
      <TableRow key={user.id}>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell>
          <InputLabel id="demo-controlled-open-select-label">sarasa</InputLabel>
          <Select
            labelId="selectCohorte"
            id="selectCohorteOp"
            value=""
            onChange={handleSelectChange}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* MAPEAR LISTA DE cohortes Y DEVOLVER UN MENUITEM X CADA UNO */}
            {prueba ? (
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
                <em>None</em>
              </MenuItem>
            )}
          </Select>
        </TableCell>
        <TableCell>
          <Select
            labelId="selectGroup"
            id="selectGroupOp"
            value={input.group}
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
              Editar
            </Button>
          </ButtonGroup>
          <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Modificar Usuario</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                name="name"
                margin="dense"
                label="Nombre"
                type="text"
                fullWidth
                value={input.name}
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                name="lastName"
                margin="dense"
                label="Apellido"
                type="text"
                fullWidth
                value={input.lastName}
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                name="email"
                margin="dense"
                label="Email"
                type="text"
                fullWidth
                value={input.email}
                onChange={handleInputChange}
              />

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
                >
                  Modificar
                </Button>
              </DialogActions>
            </div>
          </Dialog>
          <ButtonGroup disableElevation variant="contained" color="secondary">
            <Button
              size="small" /* El onclick debe ir con el actions para no perderse*/
            >
              Eliminar
            </Button>
          </ButtonGroup>
          <ButtonGroup
            disableElevation
            variant="contained"
            color="primary"
          ></ButtonGroup>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default AlumnoComponent;
