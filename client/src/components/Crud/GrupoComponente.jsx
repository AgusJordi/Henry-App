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
import { modifiedGroup, getAllGroups } from "../../actions/index.js";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function GrupoComponente(props) {
    const { group } = props;
    const [input, setInput] = useState({
        id: group.id,
        grupo: group.name,
        pm1: group.PM1Id,
        pm2: group.PM2Id,
    });


    const [open, setOpen] = useState(false);

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const classes = useStyles();

    const handleModifiedGroup = (e) => {
        e.preventDefault();

        var groupX = {
            id: input.id,
            name: input.grupo,
            PM1Id: input.pm1,
            PM2Id: input.pm2
        }

        props.modifiedGroup(groupX)

        Swal.fire({
            title: 'Bien',
            text: "Modificaste el grupo! " + input.grupo,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {

                props.getAllGroups()
            }
        })
    };

    return (
        <TableRow key={group.id}>
            {/* <form onSubmit={handleModifiedGroup}> */}
            <TableCell align="center">{group.name}</TableCell>
            <TableCell align="center">Seleccioná PM1 </TableCell>
            <TableCell align="center">Seleccioná PM2</TableCell>
            <TableCell align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button size="small" type="submit">
                        Confirmar
                        </Button>
                </ButtonGroup>
                <ButtonGroup disableElevation variant="contained" color="secondary">
                    <Button size="small">Eliminar</Button>
                </ButtonGroup>
            </TableCell>
            {/*  </form> */}
        </TableRow>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        modifiedGroup: (group) => dispatch(modifiedGroup(group)),
        getAllGroups: () => dispatch(getAllGroups())
    };
};

const mapStateToProps = (state) => {
    return {
        all_groups: state.all_groups
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GrupoComponente);
