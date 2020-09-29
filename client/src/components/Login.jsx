import React, { useState, useRef } from "react"; 
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
import axios from "axios";


 
import Modal from "@material-ui/core/Modal";
import { useFormik, Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

//npm install axios
//npm install router
//npm install sweetalert2
//npm install jwt-decode

import { NavLink, Redirect, Route, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUsers, userLogIn, onlineUserError, userRegister, userRegisterError, modifiedPassword, passwordResetEmail } from "../actions";
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

function Login({ getAllUsers, userLogIn, onlineUser, onlineUserError, userRegister, register, userRegisterError, passwordResetEmail }) {
  ////INICIO del del coomponente

  useEffect(() => {
    getAllUsers(589); //probando actions
    
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

   
  //////// VALIDACION DEL REGISTRO CON FORMIK ////
   
  const formik = useFormik({
    initialValues:{
      firstNameR: '',
      lastNameR: '',
      passwordR: '',
      passworRepeatdR: '',
      cityR: '',
      provinceR: '',
      countryR: '',
      emailR: ''

    },
    
    validationSchema: Yup.object({

      firstNameR: Yup.string().required("El Nombre no puede quedar vacio"),
      countryR: Yup.string().required("El Pais no puede quedar vacio"),
      lastNameR: Yup.string().required("El Apellido no puede quedar vacio"),
      cityR: Yup.string().required("La Ciudad no puede quedar vacio"),
      provinceR: Yup.string().required("La Provincia no puede quedar vacio"),
      emailR: Yup.string().email('Esto no es un Email').required("El Email no puede quedar vacio"),
      passwordR: Yup.string().required("El Password no puede quedar vacio").oneOf([Yup.ref('passworRepeatdR')], 'Las contraseñas no son iguales'),
      passworRepeatdR: Yup.string().required("El Password no puede quedar vacio")

    }),


    
    onSubmit:(formData)=>{
      console.log('el Form DATAAAAA',formData); 
      global.datos = formData;
      userRegister(formData)
      handleClose()
      modifiedPassword(formData)
    },
  })

  // console.log('El REGISTERRRRR ', global.datos)
  // console.log('El EStado USERRR ', onlineUser)
 
  if(register === 'null'){
     
    Swal.fire({
      icon: 'warning',
      title: 'Ups... EMAIL DUPLICADO!',
      text: 'Ese Email ya fue usado por otro usuario!',
      footer: '<span>Soy Henry</span>'
    })
    
    userRegisterError();
  }
  if(register === false ){
    
    Swal.fire({
      icon: 'warning',
      title: 'Ups... EMAIL NO VALIDO!',
      text: 'Debes usuar el E-email con en que inscribiste al Challenge de Henry!',
      footer: '<span>Soy Henry</span>'
    })
      userRegisterError();
      
  }

   
  if(register === true){
    Swal.fire({
      title: 'Usuario creado con Exito!',
      text: "Bienvenido a Henry",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ingresar'
    }).then((result) => {
      if (result.isConfirmed) {
    let timerInterval
    Swal.fire({
      title: 'Ingresando ...',
      html: '<b></b>',
      timer: 4000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {

              var credentials={
                email: global.datos.emailR,
                password: global.datos.passwordR
              }
              
              userLogIn(credentials)                    
              
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }) 
      }
      localStorage.setItem("idUser", onlineUser.id);
      localStorage.setItem("lastName", onlineUser.lastName);
      localStorage.setItem("username", onlineUser.name);              
      userRegisterError();
      window.location = "./home";
    })
    
    

  }
 
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
  

  const handleSubmit = (e) => {//////INICIAR SESION
    e.preventDefault();  
    if(input.password === 'XY4BP1Z6') return cambioPassword(input.email) 
    userLogIn(input);

  };


  const cambioPassword = function(emailChangePass){
    Swal.mixin({
      input: 'password',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
      inputValidator: (value) => {
        return !value && 'Los campos no pueden estar vacios!'
      },
    }).queue([
      {
        title: 'Ingresa tu nueva clave ',
        text: 'Luego inicia sesion con ella'
      },
      'Repeti la clave'
       
    ]).then((result) => {
      if(result.dismiss === "backdrop" || result.dismiss === "cancel" ){
        return
      }
      console.log('el Result',result)
      if (result.value[0] == result.value[1]) {
        const answers = JSON.stringify(result.value)

      const data = {
          email: emailChangePass,
          password: result.value[0]
        }

        global.dataPE = data
        passwordResetEmail(data)

        Swal.fire({ 
          icon: 'success',          
          title: 'Pasword actualizado con exito!',
          html: `
            Ya podes iniciar sesion
          `,          
          confirmButtonText: 'Ok!'
        })
        
         console.log(result.value[0], result.value[1])
         
      }else{
        Swal.fire({  
          icon: 'warning',         
          title: 'Ups! las claves no coinciden',                 
          confirmButtonText: 'Ok!'
        })
      }
    })
  }////en functiion



  if (onlineUser !== false && onlineUser !== 0) {
    

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

///////////////////////// RECUPERO DE EMAIL ///////////
  var emailPW = function(){
  Swal.fire({
    title: 'Ingresa tu email',
    input: 'email',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: false,     
    preConfirm: (emailPASS) => {
     const emailReq =  {"email": emailPASS}      
    
      return axios.put(`http://localhost:4000/users/passwordReques`, emailReq )
        .then(response => {
          console.log('El Response',response)
          if (!response.data) {
            throw new Error(response.email)
          }
          return response.email
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Ups! NO encontramos el email`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Listo!`,
        text: 'Ya te enviamos la clave, revisa tu correo y segui las instrucciones',
        imageUrl: 'https://www.soyhenry.com/static/rocket-176b443ed273a2a5a6f5cb11d6d33605.png'
      })
    }
  })  
}
   

  var emailPW = function(){
  Swal.fire({
    title: 'Ingresa tu email',
    input: 'email',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: false,     
    preConfirm: (email) => {
     const emailReq =  {"email": email}      
    
      return axios.put(`http://localhost:4000/users/passwordReques`, emailReq )
        .then(response => {
          console.log('El Response',response)
          if (!response.data) {
            throw new Error(response.email)
          }
          return response.email
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Ups! NO encontramos el email`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Listo!`,
        text: 'Ya te enviamos la clave, revisa tu correo y segui las instrucciones',
        imageUrl: 'https://www.soyhenry.com/static/rocket-176b443ed273a2a5a6f5cb11d6d33605.png'
      })
    }
  })  
}

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
            
         
          <form onSubmit={formik.handleSubmit} >
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="firstName"></label>
              <TextField                         
              variant="outlined"               
              required
              fullWidth
              id="firstNameR"
              label="Nombre"                            
              name="firstNameR"
              autoComplete="nombre"
              autoFocus
              onChange={formik.handleChange} error={formik.errors.firstNameR} helperText={formik.errors.firstNameR}        
              
              
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="lastName"></label>
              <TextField              
              name="lastNameR"
                id="lastNameR"
                type="text"
                required                 
                label="Apellido"
                autoComplete="Apellido"
                placeholder="Sofovich"                
                variant="outlined"
                fullWidth                              
                onChange={formik.handleChange} error={formik.errors.lastNameR} helperText={formik.errors.lastNameR}
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="lastName"></label>
              <TextField              
                id="passwordR"
                name="passwordR"
                type="password"
                required                
                label="Password"
                placeholder="********"               
                variant="outlined"
                fullWidth
                onChange={formik.handleChange} error={formik.errors.passwordR} helperText={formik.errors.passwordR}
                
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="lastName"></label>
              <TextField              
                id="passworRepeatdR"
                name="passworRepeatdR"
                type="password"
                required                
                label="Password"
                placeholder="********"               
                variant="outlined"
                fullWidth
                onChange={formik.handleChange} error={formik.errors.passworRepeatdR} helperText={formik.errors.passworRepeatdR}
                
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="city"></label>
              <TextField              
                id="cityR"
                name="cityR"
                type="text"
                required                
                label="Ciudad"
                placeholder="Buenos Aires"                
                variant="outlined"
                fullWidth
                onChange={formik.handleChange} error={formik.errors.cityR} helperText={formik.errors.cityR}
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="province"></label>
              <TextField              
                id="provinceR"
                name="provinceR"
                type="text"
                required                
                label="Provincia"
                placeholder="Buenos Aires"                
                variant="outlined"
                fullWidth
                onChange={formik.handleChange} error={formik.errors.provinceR} helperText={formik.errors.provinceR}
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="country"></label>
              <TextField              
                id="countryR"
                name="countryR"
                type="text"
                required                
                label="Pais"
                placeholder="Argentina"                
                variant="outlined"
                fullWidth
                onChange={formik.handleChange} error={formik.errors.countryR} helperText={formik.errors.countryR}
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="email"></label>
              <TextField              
                id="emailR"
                name="emailR"
                type="email"
                required                
                label="Email"
                placeholder="tuemailderegistro@canal9.com"               
                variant="outlined"
                fullWidth
                onChange={formik.handleChange} error={formik.errors.emailR} helperText={formik.errors.emailR}
                 
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
              type='email'
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
                <Link href="#" onClick={emailPW} variant="body2">
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
    userRegister: (DatosDelRegister) => dispatch(userRegister(global.datos)),
    userRegisterError: () => dispatch(userRegisterError()),
    getAllUsers: (number) => dispatch(getAllUsers(589)),
    userLogIn: (input) => dispatch(userLogIn(!input ? input  = global.datos : input)),
    onlineUserError: () => dispatch(onlineUserError()),
    passwordResetEmail: (dataPE) => dispatch(passwordResetEmail(global.dataPE)),
    
    
    
  };
};

const mapStateToProps = (state) => {
  return {
    all_users: state.all_users,
    onlineUser: state.onlineUser,
    register: state.register
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
