
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
// import { getAlumnosFromCohorte } from "../actions";
import { connect } from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";

function rand() {
    return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        justifyContent: "center",
        display: "flex",
        outline: "none",
    },
    img: {
        borderRadius: "50px",
        width: "50px",
        height: "50px",
        marginRight: "10px",
        boxShadow: theme.shadows[5],
    },
    fontAwesome: {
        fontFamily: "Helvetica, Roboto, FontAwesome",
        fontSize: "15px",
        padding: "5px",
        outline: "none",
        width: "-webkit-fill-available",
        marginBottom: "10px",
        "&:focus": {
        outline: "auto",
        },
    },
    divs: {
        display: "flex",
        margin: "10px",
    },
    users: {
        overflow: "auto",
        maxHeight: "360px",
    },
    h3: {
        "&:hover": {
        cursor: "pointer",
        },
    },
    // button:{
    //     width: "100px"
    // },
    div:{
        display:"flex",
        flexDirection: "column"
    }
}));

export default  function ModalUsersCheckbox(props) {
    const { users, state, close } = props;
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [miembros, setMiembros] = React.useState([]);
    const [filtrados, setFiltrados] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [alumnosGrupo, setAlumnosGrupo] = React.useState([]);


    useEffect(() => {
        setMiembros(users)
        setFiltrados(users)
    }, [users]);

    const handleClose = () => {
        setOpen(false);
        // props.show(false); //pasarle desde el componente padre una funcion show por props
    };

    // setea el input
    const onChange = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setInput(inputValue);
    };

    // const [checked, setChecked] = React.useState(false);
    const handleChange = (e) =>{
        // setChecked(e.target.checked);
        // if(e.target.checked)
        // console.log("checkbox en true")
        // else console.log ("checkbox en false")
        if(alumnosGrupo.includes(e.target.value)){
            var filtrados = alumnosGrupo.filter ((alumno)=> alumno !== e.target.value)
            setAlumnosGrupo(filtrados)
        }
        else setAlumnosGrupo(oldAlumnos => [...oldAlumnos, e.target.value])

    }


  //filtra cada vez que cambia el input.value
    useEffect(() => {
        filterList();
    }, [input]);

    const filterList = () => {
        let users = miembros;
        let q = input;

        users = users.filter(function (user) {
            if (!user.user.name || !user.user.lastName){
                return user.user.email.toLowerCase().indexOf(q) !== -1
            }
            else return (
                user.user.name.toLowerCase().indexOf(q) !== -1 ||
                user.user.lastName.toLowerCase().indexOf(q) !== -1 
            ); // returns true or false
        });
        setFiltrados(users);
    };

    const listaFiltrados = filtrados.map((user) => {
        if(user.user.name!==null||user.user.lastName!==null){

        return (
            <div className={classes.divs}>
            <h3 className={classes.h3}>
                {" "}
                {user.user.name + " " + user.user.lastName}
            </h3>
            <Checkbox 
                inputProps={{ 'aria-label': 'secondary checkbox' }} 
                onChange={(e)=>handleChange(e)}
                value={user.user.email}
                // checked={checked}
                // checked={handleChecked}
            />
            </div>
        );
        
        }
        else {
            return (
                <div className={classes.divs}>
                <h3 className={classes.h3}>
                    {" "}
                    {user.user.email}
                </h3>
                <Checkbox 
                    inputProps={{ 'aria-label': 'secondary checkbox' }} 
                    onChange={(e)=>handleChange(e)}
                    value={user.user.email}
                    // checked={checked}
                    // checked={handleChecked}
                />
                </div>
            );
            
        }
    });
    


    return (
        <div className={classes.father}>
        <Modal
            open={state}
            onClose={close}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
            <div className={classes.div}>
                <h1> {miembros.length} alumnos en este cohorte</h1>
                <div className={classes.input}>
                <input
                    type="text"
                    placeholder="Search"
                    value={input}
                    onChange={onChange}
                    placeholder="                  &#xF002; Buscar miembros"
                    className={classes.fontAwesome}
                />
                </div>
                <div className={classes.users}>{listaFiltrados}</div>
            <Button className={classes.button}
                type="submit"
                variant="contained"
                align="left"
                size="medium"
                color="secondary"
            >
                CONFIRMAR
            </Button>
            </div>
            </div>
        </Modal>
        </div>
    );
    }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getAlumnosFromCohorte: (cohorteId) => dispatch(getAlumnosFromCohorte(cohorteId)),
//     };
// };

// const mapStateToProps = (state) => {
//     return {
//         students_from_cohorte: state.students_from_cohorte,
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ModalUsersCheckbox);
