import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
//npm install axios
//npm install router
//npm install sweetalert2
//npm install jwt-decode

import { NavLink, Redirect, Route } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUsers, userLogIn, onlineUserError } from "../actions";
import * as action from "../actions";
import { useHistory } from "react-router-dom";
import portada from "../images/welcome.png";
import Register from "./Register";
import Swal from 'sweetalert2' 
//IMPORTS PARA MODAL REGISTER

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.soyhenry.com/">
        www.soyhenry.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${portada})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({getAllUsers, userLogIn, onlineUser, onlineUserError}) {////INICIO del del coomponente

  useEffect(() => {
    getAllUsers(589)//probando actions
    
  },[])

  const classes = useStyles();
  

  const [input, setInput] = useState({username: "", password: ""});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    
  };
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();    
    userLogIn(input);    

  };
  if(onlineUser !== false && onlineUser !== 0){
    console.log(' lo que traeel login ', onlineUser)
    var username = onlineUser.username;    
    localStorage.setItem('username', username)
    window.location = './home'
    //return <Redirect to='./' />
     
   
  }  

  if(onlineUser === 0){

    Swal.fire({
      icon: 'warning',
      title: 'Ups! Error en los datos',
      text: 'Revisalos y volve a intentarlo!',
      footer: '<a href>Perdiste tu clave ?</a>'
    })
    onlineUserError()

  }

  function backState(){
    onlineUserError()
  }
  // console.log(onlineUser)
  

  const handleOpen = () => {
   // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
 

          <Typography component="h1" variant="h5">
            Iniciar Sesiòn
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="USUARIO"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField             
             onChange={handleChange}
              id="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="CONTRASEÑA"
              type="password"              
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              INGRESAR
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidadaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleOpen}>
                  Todavia no tenes cuenta?
                </Link>
                <Register open={open} onClose={handleClose} />
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (number) => dispatch(getAllUsers(589)),
    userLogIn: (input) => dispatch(userLogIn(input)),
    onlineUserError: () => dispatch(onlineUserError())
     
  }
}


const mapStateToProps = (state) => {
  return {
    all_users: state.all_users,  
    onlineUser: state.onlineUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
