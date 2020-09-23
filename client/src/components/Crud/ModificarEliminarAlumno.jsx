import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//ver de eliminar
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// importo componente alumno
import AlumnoComponent from "./AlumnoComponent";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ModificarEliminarAlumno() {
  const allUsers = useSelector((state) => state.all_users);

  //manejo estado de dialog

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Cohorte</TableCell>
            <TableCell align="center">Grupo</TableCell>
            <TableCell align="center">Pair Programming</TableCell>
            <TableCell align="center">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*se debe hacer el map
          {props.categorias.categorias.map((row) => (
            <TableRow key={row.name}>
          */}
          {allUsers.map((user) => {
            return (
              <Fragment>
                <AlumnoComponent
                  user={user}
                  // open={open}
                  // closeFunc={handleClose}
                  // openFunc={handleOpen}
                />
              </Fragment>
            );
          })}
          {/*Aca se debe cerrar el  map)}}*/}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ModificarEliminarAlumno;
