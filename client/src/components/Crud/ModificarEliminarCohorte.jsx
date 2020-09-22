import React, { useState, useEffect } from "react";
import { modifiedCohorte } from "../../actions/index.js";
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
import swal from "sweetalert";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function ModificarEliminarCohorte() {
  const [input, setInput] = useState({
    id: 0,
    cohorte: "",
    instructor: "",
    DateA: "",
  });

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    cohortes: [],
  })

  useEffect(() => {
    fetch('http://localhost:4000/cohorte')
      .then(response => response.json())
      .then(cohortes => {
        setState({
          ...state,
          cohortes: cohortes
        })
      });
  }, [])

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handlemodifiedCohorte = () => {
    /*     e.preventDefault(); */
    modifiedCohorte(input)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  /*   const previousValues = (id) => {
      axios.get(`http://localhost:4000/cohorte/${id}`)
        .then(res => {
          const c = res.data;
          console.log(c[0].name)
          setInput({
            id: c[0].id,
            cohorte: c[0].name,
            instructor: c[0].instructor,
            DateA: c[0].date,
          })
          console.log(input)
        })
    } */

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Cohorte</TableCell>
            <TableCell align="center">Instructor</TableCell>
            <TableCell align="center">Fecha de inicio</TableCell>
            <TableCell align="center">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.cohortes && state.cohortes.map(ch => {
            return (
              <TableRow key={ch.id}>
                <TableCell align="center">{ch.name}</TableCell>
                <TableCell align="center">{ch.instructor.name}</TableCell>
                <TableCell align="center">{ch.date}</TableCell>
                <TableCell align="center">
                  <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button
                      size="small"
                      onClick={() => {
                        /* console.log(input) */
                        /* previousValues(ch.id) */
                        handleOpen()
                        /* console.log(input) */
                      }} /*onClick con la props*/
                    >
                      Editar
                    </Button>
                  </ButtonGroup>
                  <Dialog open={open} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">
                      Modificar Cohorte
                    </DialogTitle>
                    <form onSubmit={(e) => handlemodifiedCohorte}>
                      <DialogContent>
                        <TextField
                          autoFocus
                          name="ID"
                          margin="dense"
                          label="ID"
                          type="text"
                          fullWidth
                          value={ch.id}
                          onChange={handleInputChange}
                        />
                        <TextField
                          autoFocus
                          name="cohorte"
                          margin="dense"
                          label="Nombre Cohorte"
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
                          autoFocus
                          name="DateA"
                          margin="dense"
                          label="Fecha de inicio"
                          type="text"
                          fullWidth
                          value={input.DateA}
                          onChange={handleInputChange}
                        />

                      </DialogContent>
                      <div style={{ margin: 8 }}>
                        <DialogActions>
                          <Button color="primary" onClick={() => handleClose()}>
                            Cerrar
                        </Button>
                          <Button
                            color="primary"
                          >
                            Modificar
                        </Button>
                        </DialogActions>
                      </div>
                    </form>
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

                </TableCell>
              </TableRow>
            )
          })}

        </TableBody>
      </Table>
    </TableContainer >
  );
}

export default ModificarEliminarCohorte;
