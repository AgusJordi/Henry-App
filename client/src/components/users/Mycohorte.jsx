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
import InfoIcon from '@material-ui/icons/Info';
import List from "@material-ui/core/List";
import martin from "../../images/martinborchardt.png";
import Modal from "@material-ui/core/Modal";
import Profile from "../Profile.jsx";
import { connect } from "react-redux";
import { getAllGroups, userLogIn, getAlumnosFromCohorte, getAllStudents, getAllCohortes } from "../../actions/index.js";
import Cohorte from "../Cohorte";
import Alumnos from "../modalUsers2";
import Usersgroup from "../modalUsersGroup";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

 



const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: "30px",
  },
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
    margin: "25px",
  },
  icon: {
    marginTop: "30px",
    fontSize: 70,

  },
  icon2: {
    marginTop: "50px",
    fontSize: 70,

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
    backgroundColor: "rgb(255, 255, 222)",
    overflow: "auto",
    borderRadius: "0 0 0 30px",
  },
  boxr: {
    marginTop: "25%",
    padding: 20,
    justifyContent: "space-evenly",
    width: "100%",
  },
  botones:{
    margin: 5,
    marginTop: 20
  },

  boxtitulo:{
    borderRadius: "0 0 30px 0",
    width: "100%",
	  backgroundColor: "rgb(255, 255, 200)",
  },
  miembros:{
    marginBottom: "90px"
  },
  a:{
    margin: "15px",
  },
  box2: {
    backgroundColor: "black",
    borderRadius: "30px",
    marginTop: "20px",
    marginLeft: "30px",
    width: "90%",
    height: "80%",
  },
  div:{
    marginTop: "50px"
  }
}));

 function Mycohorte(props) {

  const [showAlumnos, setshowAlumnos] = React.useState(false);
  
  const handleOpenAlumnos = () => {
    setshowAlumnos(true);
    setshowAlumnos2(false);
  };
  const handleCloseAlumnos = () => {
    setshowAlumnos(false);
  };

  const [showAlumnos2, setshowAlumnos2] = React.useState(false);
  
  const handleOpenAlumnos2 = () => {
    setshowAlumnos2(true);
    setshowAlumnos(false);
  };
  const handleCloseAlumnos2 = () => {
    setshowAlumnos2(false);
  };

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
  const myCohorte = props.students_from_cohorte;
  const groups = props.all_groups  
  const  cohortes  = props.all_cohortes;//todos los cohortes
  global.myID = id_user.id //Este es el ID del USER LOGUEADO, My ID

   //console.log('TODOS LOS GRUPOS ', groups)
  // console.log('TODOS LOS USUARIOS ', users)
  //console.log('TODOS LOS COHORTES ', cohortes)
   //console.log('TODOS LOS ESTUDIANTES ', students) // id de mi COHORTE
   //console.log('TODOS LOS DEL COHORTE ', myCohorte)//Todos LOS USERSDEL DE MI COHORTE
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
  console.log(students)

  var miGrupo = students.filter(elem=>
    elem.groupId === idMyGroup
  )
  
     
  var userMyGroup = miGrupo.map((elem)=>{
    return elem.user 
  })
   

   
  var miCohorte = students.filter(elem=>
    elem.cohorteId === idDelCohorte
  )

  
  var compasCohortes = miCohorte.map((elem)=>{
    return elem.user 
  })

  //console.log('que salio de l MAPPP', usersA)
  const classes = useStyles();
  return (

    <React.Fragment className={classes.container} >
      <div className={classes.box2}>
        <div className="boxt">
        {showAlumnos === true ?
        <Alumnos
          show={setshowAlumnos}
          users={userMyGroup}
          state={showAlumnos}
          close={handleCloseAlumnos}
        />
        : ''}
        {showAlumnos2 === true ?
        <Usersgroup
          show={setshowAlumnos2}
          users={compasCohortes}
          state={showAlumnos2}
          close={handleCloseAlumnos2}
        />
        : ''}
          <Typography
            className={classes.title}
            bgcolor="text.primary"
            gutterBottom
          >
            Mi Cohorte {nameCohorte}
          </Typography>
        </div>

        <div className="boxs">
          
          <div className={classes.boxl}>
            <InfoIcon className={classes.icon} />
            <div className={classes.div}>
            <Typography className={classes.a} variant="h5" component="h2">
              INSTRUCTOR: {nombreInstructor}
            </Typography>
            <Typography className={classes.a} variant="h5" component="h2">
              FECHA DE INICIO: {fechaInicio}
            </Typography>
            <Typography className={classes.a} variant="h5" component="h2">
            {nombrePM1 ? 'MI PM1: ' + nombrePM1 : ''}
            </Typography>
            <Typography className={classes.a} variant="h5" component="h2">
            {nombrePM2 ? 'MI PM2: ' + nombrePM2 : ''}
            </Typography>
            <Typography className={classes.a} variant="h5" component="h2">
              GRUPO N° {idMyGroup}
            </Typography>
            </div>
          </div>

          <div className={classes.boxtitulo}>
            <div className={classes.miembros}>
              <AccountCircleIcon className={classes.icon2} />
              {/* <Typography variant="h3" component="h1">
                Miembros
              </Typography> */}
            </div>
            <div>
            <Typography className={classes.a} variant="h5"><a onClick={handleOpenAlumnos2} className={classes.a} href="#">Ver todos los miembros del cohorte</a></Typography>
            <Typography className={classes.a}  variant="h5"><a onClick={handleOpenAlumnos} className={classes.a} href="#">Ver todos los miembros de mi grupo</a></Typography>

            </div>
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
