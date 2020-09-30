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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// importo componente alumno
import AlumnoComponent from "./AlumnoComponent";
//buttons
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
//select
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

//style
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  boxButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rootButton: {
    paddingLeft: 15,
    width: 340,
    display: "flex",
    justifyContent: "center",
  },
  setTableRowButton: {
    display: "flex",
    maxWidth: 350,
  },
  prueba: {
    width: 250,
  },
}));

function ModificarEliminarAlumno() {
  const allUsers = useSelector((state) => state.all_users);
  const allCohortes = useSelector((state) => state.all_cohortes);
  const allStudents = useSelector((state) => state.all_students);
  const allGroups = useSelector((state) => state.all_groups);
  const allInstructors = useSelector((state) => state.all_instructors);
  //manejo estado de dialog
  //resteo de array vacio
  let arrayClear = allUsers.length > 0;

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.prueba}>
              Email
            </TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Cohorte</TableCell>
            <TableCell align="center">Grupo de estudiante</TableCell>

            <TableCell align="center">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*se debe hacer el map
          {props.categorias.categorias.map((row) => (
            <TableRow key={row.name}>
          */}

          {arrayClear ? (
            allUsers.map((user) => {
              return (
                <AlumnoComponent
                  user={user}
                  key={user.id}
                  cohortes={allCohortes}
                  cohortesInst={
                    user.instructor && allCohortes
                      ? allCohortes.filter(
                          (cohorte) => cohorte.instructorId === user.id
                        )
                      : []
                  }
                  instructores={allInstructors}
                  grupos={allGroups}
                />
              );
            })
          ) : (
            <h1>no existen users</h1>
          )}
          {/*Aca se debe cerrar el  map)}}*/}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ModificarEliminarAlumno;
