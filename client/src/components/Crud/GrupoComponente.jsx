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
import { modifiedGroup, getAllGroups, deleteGroup } from "../../actions/index.js";
import ModalUsersCheckbox from "../ModalUsersCheckbox.jsx"

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    p:{
        display: "block",
    }
});
function GrupoComponente(props) {
    const { group, all_users } = props;
    const [input, setInput] = useState({
        id: group.id,
        grupo: group.name,
    });
    const [pm1, setPm1] = useState("");
    const [pm2, setPm2] = useState("");
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const classes = useStyles();
    

    const handleOpenModal1 = () => {
        setShowModal1(true);
        setShowModal2(false);
    };
    
    const handleOpenModal2 = () => {
        setShowModal2(true);
        setShowModal1(false);
    };

    const mostrarPm = (pmId) => {
        var pm = all_users.filter ((user)=> user.id===Number(pmId))[0]
        return pm.name + " " + pm.lastName
    }

    const setearPm1 = (value) => {
        setPm1(value)
    }

    const setearPm2 = (value) => {
        setPm2(value)
    }

    const handleConfirm = () =>{

        if(pm1!=="" && pm2!==""){
            if(pm1===pm2){
                swal ({
                    title: 'Oops...',
                    text: "Los PMs de un grupo deben ser usuarios diferentes", 
                    icon: 'error',
                    timer: "3000",
                })
                return
            }
            else {
                if (esPM(pm1)===false){
                    var url = `http://localhost:4000/users/myprofile/${pm1}`;
                    axios({
                    method: "put",
                    url: url,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        pm: true,
                    },
                    });
                }
                if (esPM(pm2)===false){
                    var url = `http://localhost:4000/users/myprofile/${pm2}`;
                    axios({
                    method: "put",
                    url: url,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        pm: true,
                    },
                    });
                }
                var url = `http://localhost:4000/grupos/${input.id}`;
                    axios({
                    method: "put",
                    url: url,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        PM1Id: Number(pm1),
                        PM2Id: Number(pm2),
                    },
                    })
                    .then(()=>{
                        swal({
                            text: "Se han asignado PMs al grupo "+ input.grupo ,
                            icon: "success",
                            timer: "3000",
                        });
                    })
            }
            
        }
        else {
            swal ({
                title: 'Oops...',
                text: "Debe asignar 2 PMs para este grupo", 
                icon: 'error',
                timer: "3000",
            })
            return
        }
    } 

    const esPM = (pmId) =>{
        var pm = all_users.filter ((user)=> user.id===Number(pmId))[0]
        if (pm.pm ===true) {
            return true
        }
        return false
    }

    var borrarGrupo = function () {

        Swal.fire({
            title: 'Seguro que quieres eliminar?',
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteGroup(group.id)
                Swal.fire('Se eliminó el Grupo ' + group.name, '', 'success')
                window.location.reload()
            } else if (result.isDenied) {
                Swal.fire('No se eliminó el Grupo', '', 'info')
            }
        })
    }

    return (
        <TableRow key={group.id}>
            {/* <form onSubmit={handleModifiedGroup}> */}
            {showModal1===true? <ModalUsersCheckbox  key={group.name+"1"} users={all_users} show={setShowModal1} setearPm={setearPm1} />:""}
            {showModal2===true? <ModalUsersCheckbox  key={group.name+"2"} users={all_users} show={setShowModal2} setearPm={setearPm2} />: ""}
           
           
            <TableCell align="center">{group.name}</TableCell>
            {pm1!==""? 
            <TableCell  align="center">
                <p>{mostrarPm(pm1)}</p> 
                <a href="#"  onClick={() => handleOpenModal1()}>Modificar</a>
            </TableCell>  
            :
            <TableCell align="center">
                <a className={classes.a} href="#"  onClick={() => handleOpenModal1()}>Seleccionar PM</a>
            </TableCell>
            }
            {pm2!==""? 
            <TableCell  align="center">
                <p>{mostrarPm(pm2)}</p> 
                <a href="#"  onClick={() => handleOpenModal2()}>Modificar</a>
            </TableCell>  
            :
            <TableCell align="center">
                <a className={classes.a} href="#"  onClick={() => handleOpenModal2()}>Seleccionar PM</a>
            </TableCell>
            }
            <TableCell align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button onClick={()=>handleConfirm()} size="small" type="submit">
                        Confirmar
                        </Button>
                </ButtonGroup>
                <ButtonGroup disableElevation variant="contained" color="secondary">
                    <Button onClick={borrarGrupo} size="small">Eliminar</Button>
                </ButtonGroup>
            </TableCell>
            {/*  </form> */}
        </TableRow>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        modifiedGroup: (group) => dispatch(modifiedGroup(group)),
        getAllGroups: () => dispatch(getAllGroups()),
        deleteGroup: () => dispatch(deleteGroup())
    };
};

const mapStateToProps = (state) => {
    return {
        all_groups: state.all_groups,
        all_users: state.all_users
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GrupoComponente);
