import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./PairProgramming.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import List from "@material-ui/core/List";
import martin from "../../images/martinborchardt.png";
import Modal from "@material-ui/core/Modal";
import Profile from "../Profile.jsx";
import { connect } from "react-redux";
import { getAllGroups, userLogIn, getAlumnosFromCohorte, getAllStudents, getAllCohortes } from "../../actions/index.js";
import Cohorte from "../Cohorte";

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
  root2: {
    flexGrow: 2,
  },
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bullet: {
    display: "inline-block",
    marginTop: "10px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 24,
  },
  icon: {
    fontSize: 72,
  },
  pos: {
    marginBottom: 12,
  },
  containerAlumnos: {
    width: "100%",

    overflow: "auto",

    maxHeight: "95%",

    padding: 5,
  },
  boxl: {
    padding: 20,
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "rgb(249, 231, 159)",
    overflow: "auto",
  },
  boxr: {
    marginTop: "25%",

    padding: 20,

    justifyContent: "space-evenly",

    width: "100%",
  },
}));

 function Mycohorte(props) {

  useEffect(() => {      
    //  getAllUsers();
    //  getAllPms();
     getAllGroups();
     getAllStudents();
     getAlumnosFromCohorte(global.myID);      
     getAllCohortes();
  }, []);

  const { users } = props;
  const { id_user } = props; //Todos Mis datos
  const  students  = props.all_students
  const myCohorte= props.students_from_cohorte;
  const groups = props.all_groups  
  const  cohortes  = props.all_cohortes;//todos los cohortes
  global.myID = id_user.id //Este es el ID del USER LOGUEADO, My ID

  // console.log('TODOS LOS GRUPOS ', groups)
  // console.log('TODOS LOS USUARIOS ', users)
  // console.log('TODOS LOS COHORTES ', cohortes)
  // console.log('TODOS LOS ESTUDIANTES ', students) // id de mi COHORTE
  // console.log('TODOS LOS DEL COHORTE ', myCohorte)//Todos LOS USERSDEL DE MI COHORTE
  // console.log('My COHORTESSS ', id_user) //TODO mis datos

  for (let i = 0; i < students.length; i++) {
      if(students[i].userId === global.myID){
        var idDelCohorte = students[i].cohorteId  
        var idMyGroup = students[i].groupId      
      } 
  }
  for (let i = 0; i < cohortes.length; i++) {
    if(cohortes[i].id === idDelCohorte){
      var nameCohorte = cohortes[i].name
      var idInstructorCohorte = cohortes[i].instructorId 
      var fechaInicio = cohortes[0].date       
      } 
  }
  for (let i = 0; i < users.length; i++) {
    if(users[i].id === idInstructorCohorte){
      var nombreInstructor = users[i].name +' '+ users[i].lastName        
      }
    if(users[i].id === pmId1){
      var nombrePM = users[i].name +' '+ users[i].lastName        
      } 
      
  }
  for (let i = 0; i < groups.length; i++) {
    if(groups[i].id === idMyGroup){
      var idMyGroup = groups[i].id 
      var pmId1 = groups[i].PM1Id
      var pmId2 = groups[i].PM2Id      
      } 
  }
  for (let i = 0; i < users.length; i++) {
    if(users[i].id === pmId1){
      var nombrePM1 = users[i].name +' '+ users[i].lastName        
      }
    if(users[i].id === pmId2){
      var nombrePM2 = users[i].name +' '+ users[i].lastName        
      } 
      
  }



  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [miembros, setMiembros] = React.useState(users);
  const [filtrados, setFiltrados] = React.useState(users);
  const [input, setInput] = React.useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalUser, setModalUser] = useState([]);

  let arrayClear = false;

  if (props.length > 0) {
    arrayClear = true;
  }
  const handleOpenModal = (value) => {
    setOpenModal(true);
    setModalUser(value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpen(false);
    // props.show(false); //pasarle desde el componente padre una funcion show por props
  };

  // setea el input
  const onChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setInput(inputValue);
  };

  useEffect(() => {
    filterList();
  }, [input]);

  const filterList = () => {
    let users = miembros;
    let q = input;
    if (arrayClear === false) {
      return setFiltrados("No hay usuarios");
    }
    users = users.filter(function (user) {
      if (user.name !== null || user.lastName !== null) {
        return (
          user.name.toLowerCase().indexOf(q) !== -1 ||
          user.lastName.toLowerCase().indexOf(q) !== -1
        ); // returns true or false
      } else return false;
    });
    setFiltrados(users);
  };

  if (arrayClear) {
    const listaFiltrados = filtrados.map((user) => {
      if (user.name !== null || user.lastName !== null) {
        return (
          <div className={classes.divs}>
            <img className={classes.img} src={martin} />
            <h3 className={classes.h3} onClick={() => handleOpenModal(user)}>
              {" "}
              {user.name + " " + user.lastName}
            </h3>
          </div>
        );
      }
    });
  }

  const contarActivos = (miembros) => {
    var suma = 0;
    for (let i = 0; i < miembros.length; i++) {
      if (miembros[i].name !== null || miembros[i].lastName !== null) {
        suma = suma + 1;
      }
    }
    return suma;
  };

  return (
    <React.Fragment>
      <div className="box2">
        <div className="boxt">
          <Typography
            className={classes.title}
            bgcolor="text.primary"
            gutterBottom
          >
            MI COHORTE {nameCohorte}
          </Typography>
        </div>

        <div className="boxs">
          <Profile
            user={modalUser}
            state={openModal}
            close={handleCloseModal}
          />
          <div className={classes.boxl}>
            <ErrorOutlineIcon className={classes.icon} />
            <Typography variant="h5" component="h2">
              INSTRUCTOR: {nombreInstructor}
            </Typography>
            <Typography variant="h5" component="h2">
              FECHA DE INICIO: {fechaInicio}
            </Typography>
            <Typography variant="h5" component="h2">
              {nombrePM1 ? 'MI PM1: ' + nombrePM1 : ''}
            </Typography>
            <Typography variant="h5" component="h2">
            {nombrePM2 ? 'MI PM2: ' + nombrePM2 : ''}
            </Typography>
            <Typography variant="h5" component="h2">
              GRUPO N° {idMyGroup}
            </Typography>
          </div>

          <div className="boxtitulo">
            <div>
              <Typography variant="h3" component="h1">
                Miembros
              </Typography>
            </div>
            <List className={classes.containerAlumnos}>
              {/* {arrayClear ? (
                users.map((user) => {
                  console.log("da", user);
                  let nombreCompleto = `${user.name} ${user.lastName}`;
                  let id = user.id;
                  return (
                    <Fragment>
                      <ul
                        className={classes.boxr}
                        onClick={() => handleOpenModal(user)}
                      >
                      <Typography variant="h4">Ver todos los miembros del cohorte</Typography>
                      <Typography variant="h4">Ver todos los miembros de mi grupo</Typography>
                      </ul>
                    </Fragment>
                  );
                })
              ) : (
                <p>No existen users</p>
              )} */}
               <Fragment>
                  <ul
                    className={classes.boxr}
                    onClick={() => handleOpenModal()}
                  >
                  <Typography variant="h4">Ver todos los miembros del cohorte</Typography>
                  <Typography variant="h4">Ver todos los miembros de mi grupo</Typography>
                  </ul>
                </Fragment>
            </List>
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {    
    // getAllUsers: () => dispatch(getAllUsers()),
    // getAllPms: () => dispatch(getAllPms()),
    // getAllInstructors: () => dispatch(getAllInstructors()),
    getAllStudents: () => dispatch(getAllStudents()),
    getAllCohortes: () => dispatch(getAllCohortes()),
    getAlumnosFromCohorte: (id) => dispatch(getAlumnosFromCohorte(global.myID)),
    getAllGroups: () => dispatch(getAllGroups())    
  };
};

const mapStateToProps = (state) => {
  return {
    all_users: state.all_users,
    onlineUser: state.onlineUser,
    id_user: state.id_user,
    all_cohortes: state.all_cohortes,
    students_from_cohorte: state.students_from_cohorte,
    all_students: state.all_students,
    all_groups: state.all_groups
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mycohorte);
