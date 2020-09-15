import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
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
//import swal from 'sweetalert';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});





const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function ModificarEliminarAlumno() {
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    description: "",
    cohorte: "",
    group: "",
  });
  
  const [open, setOpen] = useState(false);
  
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }
  
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
            <TableCell align="center">nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Cohorte</TableCell>
            <TableCell align="center">Grupo</TableCell>
            <TableCell align="center">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {/*se debe hacer el map
          {props.categorias.categorias.map((row) => (
            <TableRow key={row.name}>
          */}  <TableRow >
           
              <TableCell align="center">Gaston</TableCell>
              <TableCell align="center" >Gomez </TableCell>
              <TableCell align="center">Instructor</TableCell>
              <TableCell align="center">Webft04</TableCell>
              <TableCell align="center" >A</TableCell>
              <TableCell align="center">             
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"
                >
                  <Button size="small" onClick={() => handleOpen()}/*onClick con la props*/>
                    Editar
                  </Button>
                  </ButtonGroup>
                  <Dialog
                    open={open}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Modificar Instructor/Pm
                    </DialogTitle>
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
                        value={input.lastname}
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
                    </DialogContent>
                    <div style={{ margin: 8 }}>
                      <DialogActions >
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
                  color="secondary">
                  <Button size="small" className={theme.palette.secondary.dark} /* El onclick debe ir con el actions para no perderse*/>
                    Eliminar
                  </Button>
                  </ButtonGroup>
                  <ButtonGroup 
                  disableElevation
                  variant="contained"
                  color="primary">
                  <Button size="small" /* El onclick debe ir con el actions para no perderse*/>
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


export default ModificarEliminarAlumno;