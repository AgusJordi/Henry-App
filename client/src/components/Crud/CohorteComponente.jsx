import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import swal from "sweetalert";
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { modifiedCohorte, getAllCohortes, deleteCohorte } from "../../actions/index.js";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function CohorteComponente(props) {
  const { cohorte } = props;
  const [input, setInput] = useState({
    id: cohorte.id,
    cohorte: cohorte.name,
    instructor: cohorte.instructor,
    DateA: cohorte.date,
  });
  const allinstructors = useSelector((state) => state.all_instructors);



  const [open, setOpen] = useState(false);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const handleModifiedCohorte = (e) => {
    e.preventDefault();

    var cohorteX = {
      id: input.id,
      name: input.cohorte,
      instructorId: input.instructor,
      date: input.DateA
    }

    props.modifiedCohorte(cohorteX)

    Swal.fire({
      title: 'Bien',
      text: "Modificaste el cohorte! " + input.cohorte,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {

        props.getAllCohortes()
      }
    })


    setOpen(false);
  };

  var borrarCohorte = function () {
    /* e.preventDefault(); */
    console.log("entre al handle DEL", cohorte.id)
    Swal.fire({
      title: 'Seguro que quieres eliminar?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCohorte(cohorte.id)
        Swal.fire('Se eliminó el Cohorte ' + cohorte.name, '', 'success')
        window.location.reload()
      } else if (result.isDenied) {
        Swal.fire('No se eliminó el Cohorte', '', 'info')
      }
    })
  }

  return (
    <TableRow key={cohorte.id}>
      <TableCell align="center">{cohorte.name}</TableCell>
      <TableCell align="center">
        {cohorte.instructor ? cohorte.instructor.name : "No tiene instructor"}
      </TableCell>
      <TableCell align="center">{cohorte.date}</TableCell>
      <TableCell align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button size="small" onClick={handleOpen}>
            Editar
          </Button>
        </ButtonGroup>
        <Dialog open={open} aria-labelledby="form-dialog-title">
          <form onSubmit={handleModifiedCohorte}>
            <DialogTitle id="form-dialog-title">Modificar Cohorte</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                name="ID"
                margin="dense"
                label="ID"
                type="text"
                fullWidth
                value={cohorte.id}
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                name="cohorte"
                margin="dense"
                label="Nombre Cohorte"
                type="text"
                fullWidth
                value={cohorte.name}
                onChange={handleInputChange}
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="instructor-native-simple">
                  Elegir Instructor
                </InputLabel>
                <Select
                  native
                  value={input.instructor}
                  onChange={handleInputChange}
                  inputProps={{
                    name: "instructor",
                    id: "instructor-native-simple",
                  }}
                >
                  <option aria-label="None" />
                  {allinstructors.map((instructor) => (
                    <option value={instructor.id}>
                      {instructor.name + " " + instructor.lastName}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <TextField
                autoFocus
                name="DateA"
                margin="dense"
                label="Fecha de inicio"
                placeholder="Fecha de inicio"
                type="date"
                fullWidth
                value={input.DateA}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
              />
            </DialogContent>
            <div style={{ margin: 8 }}>
              <DialogActions>
                <Button color="primary" onClick={() => handleClose()}>
                  Cerrar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  align="left"
                  size="medium"
                  color="primary"
                >
                  Modificar
                </Button>
              </DialogActions>
            </div>
          </form>
        </Dialog>
        <ButtonGroup disableElevation variant="contained" color="secondary">
          <Button size="small" onClick={borrarCohorte} > Eliminar</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
const mapDispatchToProps = (dispatch) => {
  var cohorte = {
    id: 1,
    name: "WEB2020",
    instructorId: 4,
    date: "2020-11-11"
  }
  return {
    modifiedCohorte: (cohorte) => dispatch(modifiedCohorte(cohorte)),
    getAllCohortes: () => dispatch(getAllCohortes()),
    deleteCohorte: () => dispatch(deleteCohorte())

  };
};

const mapStateToProps = (state) => {
  return {
    all_cohortes: state.all_cohortes

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CohorteComponente);
