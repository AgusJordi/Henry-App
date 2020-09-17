import React, { useState } from "react";
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
import swal from "sweetalert";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  fecha: {
    marginLeft: 10,
  },
});
function ModificarEliminarCohorte() {
  const [input, setInput] = useState({
    cohorte: "",
    instructor: "",
    DateA: "",
    DateB: "",
  });

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

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Cohorte</TableCell>
            <TableCell align="center">Instructor</TableCell>
            <TableCell align="center">Fecha de inicio</TableCell>
            <TableCell align="center">Fecha de finalización</TableCell>
            <TableCell align="center">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*se debe hacer el map
          {props.categorias.categorias.map((row) => (
            <TableRow key={row.name}>
          */}{" "}
          <TableRow>
            <TableCell align="center">Webft03</TableCell>
            <TableCell align="center">Franco</TableCell>
            <TableCell align="center">Junio</TableCell>
            <TableCell align="center">Octubre</TableCell>
            <TableCell align="center">
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button
                  size="small"
                  onClick={() => handleOpen()} /*onClick con la props*/
                >
                  Editar
                </Button>
              </ButtonGroup>
              <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                  Modificar Cohorte
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    name="cohorte"
                    margin="dense"
                    label="Cohorte"
                    type="text"
                    fullWidth
                    value={input.cohorte}
                    onChange={handleInputChange}
                  />
                  <TextField
                    autoFocus
                    name="instructor"
                    margin="dense"
                    label="Instructor"
                    type="text"
                    fullWidth
                    value={input.instructor}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="DateA"
                    id="standard-full-width"
                    label="Fecha de inicio"
                    type="date"
                    defaultValue="2019-05-01"
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
                    className={classes.fecha}
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
                      /*el onclick de actualizar debe ir con el actions*/
                      color="primary"
                    >
                      Modificar
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
              <ButtonGroup
                disableElevation
                variant="contained"
                color="secondary"
              >
                <Button
                  size="small" /* El onclick debe ir con el actions para no perderse*/
                >
                  Eliminar
                </Button>
              </ButtonGroup>
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button
                  size="small" /* El onclick debe ir con el actions para no perderse*/
                >
                  Aprobar
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
          {/*Aca se debe cerrar el  map)}}*/}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ModificarEliminarCohorte;
