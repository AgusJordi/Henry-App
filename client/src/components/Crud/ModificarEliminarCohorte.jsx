import React, { Fragment } from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function ModificarEliminarCohorte() {
  const classes = useStyles();

  var allcohortes = useSelector((state) => state.all_cohortes);
  /* const [cohortes, setCohortes] = useState([]) */

  /* useEffect(() => {
    fetch("http://localhost:4000/cohorte")
      .then((response) => response.json())
      .then((chs) => {
        setCohortes(chs)
      })
  }, [cohortes]) */

  let prueba = false;
  if (allcohortes.length > 0) {
    prueba = true;
  }
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
          {prueba ? (
            allcohortes.map((ch) => {
              return (
                <Fragment>
                  <CohorteComponente cohorte={ch} />
                </Fragment>
              );
            })
          ) : (
            <h1>no existen cohortes</h1>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ModificarEliminarCohorte;
