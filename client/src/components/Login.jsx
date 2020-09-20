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

import Modal from "@material-ui/core/Modal";
import { Formik, Form, ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";

//npm install axios
//npm install router
//npm install sweetalert2
//npm install jwt-decode

import { NavLink, Redirect, Route, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUsers, userLogIn, onlineUserError, userRegister } from "../actions";
import portada from "../images/welcome.png";
//import Register from "./Register";
import Swal from "sweetalert2";
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

function Login({ getAllUsers, userLogIn, onlineUser, onlineUserError, userRegister }) {
  ////INICIO del del coomponente

  useEffect(() => {
    getAllUsers(589); //probando actions
    //userLogIn(onlineUser)
  }, []);


  ////////////////////////////////////DEL MODAL/////////////////////////////////////

   

  function getModalStyle() {
    return {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      borderRadius: "5px",
    };
  }

  const useStylesS = makeStyles((theme) => ({
    paperRegister: {
      position: "absolute",
      width: 350,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      paddingBottom: 25,
      outline: "none",
      "&:focus": {
        boxShadow: "0 0 0 0.2rem #F5D553",
      },
    },
    divFormRoot: {
      marginTop: "5px",
      display: "flex",
      justifyContent: "center",
    },
    rootButton: {
      marginRight: "10px",
      backgroundColor: "#57D47A",
      color: "white",
      "&:hover": {
        backgroundColor: "#45EB55",
        boxShadow: "none",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#45EB55",
      },
      "&:focus": {
        boxShadow: "0 0 0 0.2rem #57D433",
      },
    },
    formRoot: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    buttonRoot: {
      display: "flex",
      justifyContent: "space-evenly",
      marginTop: "5px",
    },
    inputCenterPh: {
      textAlign: "center",
    },
    formRoot: {
      width: "100%",
    },
  }));

  const classesRegister = useStylesS();
  const [modalStyle] = useState(getModalStyle);
  const [inputR, setInputR] = useState({})

  const handleInputChangeR = function(e) {
    setInputR({
      ...inputR,
      [e.target.name]: e.target.value
    });
  
  }
  

   
  const handleSubmitR = function(e) {
   e.preventDefault()      
   userRegister(inputR)
   return 
  }

  // HARDCODEO COSMICO

  const [users, setUsers] = useState([]);

  // SETEO FORM
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      city: "",
      province: "",
      country: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, "Ingresa menos de 15 caracteres"),
      lastName: Yup.string().max(15, "Ingresa menos de 15 caracteres"),
      password: Yup.string().max(15, "Ingresa menos de 15 caracteres"),
      city: Yup.string().max(15, "Ingresa menos de 15 caracteres"),
      province: Yup.string().max(15, "Ingresa menos de 15 caracteres"),
      country: Yup.string().max(15, "Ingresa menos de 15 caracteres"),
      email: Yup.string().email("Email invalido"),
    }),
    
  });

  ////////////// End del Modal ///////////

  const classes = useStyles();

  const [input, setInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const [open, setOpen] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();    
    userLogIn(input);

    

     
  };
  if (onlineUser !== false && onlineUser !== 0) {
    console.log(" lo que traeel login ", onlineUser);

    localStorage.setItem("idUser", onlineUser.id);
    localStorage.setItem("lastName", onlineUser.lastName);
    localStorage.setItem("username", onlineUser.name);
    window.location = "./home";
  }

  if (onlineUser === 0) {
    Swal.fire({
      icon: "warning",
      title: "Ups! Error en los datos",
      text: "Revisalos y volve a intentarlo!",
      footer: "<a href>Perdiste tu clave ?</a>",
    });
    onlineUserError();
  }

  function backState() {
    onlineUserError();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    
    <Grid container component="main" className={classes.root}>
      <Modal    
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={modalStyle} className={classesRegister.paperRegister}>
        <div className={classesRegister.formRoot}>
          <h2 id="simple-modal-title" align="center">
            REGISTRARSE
          </h2>
          <form onSubmit={handleSubmitR} >
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="firstName"></label>
              <TextField
              // onChange={handleInputChangeR}
              // name='firstName'
              //   id="firstName"
              //   type="text"
              //   required
              //   {...formik.getFieldProps("firstName")}
              //   error={formik.errors.firstName}
              //   label="Nombre"
              //   helperText={formik.errors.firstName}
              //   placeholder="Gerardo"
              //   variant="outlined"
              //   fullWidth
              variant="outlined"               
              required
              fullWidth
              id="firstNameR"
              label="Nombre"                            
              name="firstNameR"
              autoComplete="nombre"
              autoFocus
              onChange={handleInputChangeR}
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="lastName"></label>
              <TextField
              onChange={handleInputChangeR}
              name="lastNameR"
                id="lastNameR"
                type="text"
                required                 
                label="Apellido"
                autoComplete="Apellido"
                placeholder="Sofovich"
                helperText={formik.errors.lastName}
                variant="outlined"
                fullWidth                              
                
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="lastName"></label>
              <TextField
              onChange={handleInputChangeR}
                id="passwordR"
                name="passwordR"
                type="password"
                required                
                label="Password"
                placeholder="********"               
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="city"></label>
              <TextField
              onChange={handleInputChangeR}
                id="cityR"
                name="cityR"
                type="text"
                required                
                label="Ciudad"
                placeholder="Buenos Aires"                
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="province"></label>
              <TextField
              onChange={handleInputChangeR}
                id="provinceR"
                name="provinceR"
                type="text"
                required                
                label="Provincia"
                placeholder="Buenos Aires"                
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="country"></label>
              <TextField
              onChange={handleInputChangeR}
                id="countryR"
                name="countryR"
                type="text"
                required                
                label="Pais"
                placeholder="Argentina"                
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="email"></label>
              <TextField
              onChange={handleInputChangeR}
                id="emailR"
                name="emailR"
                type="email"
                required                
                label="Email"
                placeholder="tuemailderegistro@canal9.com"               
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.buttonRoot}>
              <Button
                type="submit"
                variant="contained"
                className={classesRegister.rootButton}                
              >
                Registrarse
              </Button>
              <Button onClick={handleClose} variant="contained" color="secondary">
                Cerrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>

    
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
              id="email"
              label="EMAIL"
              name="email"
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
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleOpen}>
                  Todavia no tenes cuenta?
                </Link>
                <Link href="#" variant="body2" open={open} />
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
    userRegister: (inputR) => dispatch(userRegister(inputR)),
    getAllUsers: (number) => dispatch(getAllUsers(589)),
    userLogIn: (input) => dispatch(userLogIn(input)),
    onlineUserError: () => dispatch(onlineUserError())
    
  };
};

const mapStateToProps = (state) => {
  return {
    all_users: state.all_users,
    onlineUser: state.onlineUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
