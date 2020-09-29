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
import GrupoComponente from "./GrupoComponente";
import { connect } from "react-redux";
import { getAllGroups } from "../../actions/index.js";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function ModificarGrupo({ getAllGroups }) {
    const classes = useStyles();

    var allgroups = useSelector((state) => state.all_groups);
    /* const [cohortes, setCohortes] = useState([]) */

    useEffect(() => {
        getAllGroups()
    }, [])


    let prueba = false;
    if (allgroups.length > 0) {
        prueba = true;
    }
    console.log(allgroups)
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Grupo </TableCell>
                        <TableCell align="center">Pm 1</TableCell>
                        <TableCell align="center">Pm 2 </TableCell>
                        <TableCell align="center">Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prueba ? (
                        allgroups.map((group) => {
                            return (
                                <Fragment>
                                    <GrupoComponente group={group} />
                                </Fragment>
                            );
                        })
                    ) : (
                            <h4>No existen grupos</h4>
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
const mapDispatchToProps = (dispatch) => {

    return {
        getAllGroups: () => dispatch(getAllGroups()),
    };
};

const mapStateToProps = (state) => {
    return {
        all_groups: state.all_groups
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModificarGrupo);

