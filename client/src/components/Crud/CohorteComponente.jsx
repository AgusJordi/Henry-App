import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import swal from "sweetalert";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function CohorteComponente(props) {
    const { cohorte } = props
    const [input, setInput] = useState({
        id: cohorte.id,
        cohorte: cohorte.name,
        instructor: cohorte.instructor,
        DateA: cohorte.date,
    });

    const allinstructors = useSelector(state => state.all_instructors);

    /*     allinstructors.forEach(inst => {
            if (inst === null) {
    
            }
            
        }); */

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

    const handleModifiedCohorte = (e) => {
        e.preventDefault();
        modifiedCohorte(input)
        swal({
            text: "Se modificó el Cohorte" + input.cohorte,
            icon: "success",
            timer: "3000",
        });
        setOpen(false)
    }


    return (
        <TableRow key={cohorte.id}>
            {console.log(props)}
            {console.log(allinstructors)}
            <TableCell align="center">{cohorte.name}</TableCell>
            <TableCell align="center">{cohorte.instructor.name}</TableCell>
            <TableCell align="center">{cohorte.date}</TableCell>
            <TableCell align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button
                        size="small"
                        onClick={handleOpen}
                    >
                        Editar
                    </Button>
                </ButtonGroup>
                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <form onSubmit={handleModifiedCohorte} >
                        <DialogTitle id="form-dialog-title">
                            Modificar Cohorte
                    </DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                name="ID"
                                margin="dense"
                                label="ID"
                                type="text"
                                fullWidth
                                value={cohorte.id}
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
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="instructor-native-simple">
                                    Instructor
                            </InputLabel>
                                <Select
                                    native
                                    value={input.instructor}
                                    onChange={handleInputChange}
                                    inputProps={{
                                        name: "instructor",
                                        id: "instructor-native-simple",
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {allinstructors && allinstructors.map((instructor) => (
                                        <option value={instructor.id}>
                                            {instructor.name + " " + instructor.lastName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                autoFocus
                                name="DateA"
                                margin="dense"
                                label="Fecha de inicio"
                                placeholder="Fecha de inicio"
                                type="date"
                                fullWidth
                                value={input.DateA}
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
                                    variant="contained"
                                    align="left"
                                    size="medium"
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
                        size="small"
                    >
                        Eliminar
                </Button>
                </ButtonGroup>

            </TableCell>
        </TableRow >
    )
}


export default CohorteComponente;
