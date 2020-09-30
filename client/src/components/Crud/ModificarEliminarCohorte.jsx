import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CohorteComponente from "./CohorteComponente";
import { connect } from "react-redux";
import { getAllCohortes } from "../../actions/index.js";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function ModificarEliminarCohorte({ getAllCohortes }) {
  const classes = useStyles();

  var allcohortes = useSelector((state) => state.all_cohortes);
  /* const [cohortes, setCohortes] = useState([]) */

  useEffect(() => {
    getAllCohortes()
  }, [])


  let prueba = false;
  if (allcohortes.length > 0) {
    prueba = true;
  }
  /* console.log(allcohortes) */
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Cohorte </TableCell>
            <TableCell align="center">Instructor</TableCell>
            <TableCell align="center">Fecha de inicio</TableCell>
            <TableCell align="center">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prueba ? (
            allcohortes.map((ch) => {
              return (
                <Fragment>
                  <CohorteComponente cohorte={ch} />
                </Fragment>
              );
            })
          ) : (
              <h4>no existen cohortes</h4>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const mapDispatchToProps = (dispatch) => {

  return {
    getAllCohortes: () => dispatch(getAllCohortes()),


  };
};

const mapStateToProps = (state) => {
  return {
    all_cohortes: state.all_cohortes

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModificarEliminarCohorte);
//export default ModificarEliminarCohorte;
