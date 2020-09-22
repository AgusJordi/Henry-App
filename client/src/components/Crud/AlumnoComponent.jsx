import React, { useState, useEffect, Fragment } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function AlumnoComponent(props) {
  const { user } = props;
  //open, closeFunc, openFunc
  const [input, setInput] = useState({
    name: `${user.name}`,
    lastname: `${user.lastName}`,
    description: `${user.name}`,
    cohorte: `${user.name}`,
    group: `${user.name}`,
    pairProgramming: `${user.name}`,
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("desde componente", user);
  return (
    <Fragment>
      <TableRow key={user.id}>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">poner select</TableCell>
        <TableCell align="center">poner select</TableCell>
        <TableCell align="center">poner select</TableCell>
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
                name="lastname"
                margin="dense"
                label="Apellido"
                type="text"
                fullWidth
                value={input.lastName}
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                name="description"
                margin="dense"
                label="Descripcion"
                type="text"
                fullWidth
                value={input.description}
                onChange={handleInputChange}
              />
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
                name="group"
                margin="dense"
                label="Grupo"
                type="text"
                fullWidth
                value={input.group}
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                name="pairProgramming"
                margin="dense"
                label="Pair Programming"
                type="text"
                fullWidth
                value={input.pairProgramming}
                onChange={handleInputChange}
              />
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
