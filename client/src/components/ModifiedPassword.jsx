import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { Formik, Form, ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { sizing } from "@material-ui/system";
import { useHistory } from "react-router-dom";
import { modifiedPassword, getIdUser } from "../actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";

function ModifiedPassword(getIdUser, id_user, props) {
console.log(props)
  function getModalStyle() {
    return {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      borderRadius: "5px",
    };
  }


  const [open, setOpen] = React.useState(true);

  
  
  const handleClose = () => {
    setOpen(false);
  };

  var idUser = localStorage.getItem("idUser");

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

  const [users, setUsers] = useState([]);

const formik = useFormik({
    initialValues: {
      id: idUser,
      password: "",
      rpassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Debe ingresar una contraseña').max(5, "Ingresa menos de 5 caracteres").oneOf([Yup.ref('rpassword')], 'Las contraseñas no son iguales'),
      rpassword: Yup.string().required('Debe repetir la ingresar una contraseña').max(5, "Ingresa menos de 5 caracteres"),
    }),
    onSubmit:(formData)=>{
    console.log('el Form DATAAAAA',formData,"IDUSEEEEEEEEEEEEEEEEEEEEEEER",idUser); 
    global.datos = formData;
    global.id = idUser;
    
    modifiedPassword(idUser,formData) 
    Swal.fire({
      icon: 'success',
      title: 'Clave modificada con exito!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })

    handleClose();

    
  },
  
  });
  

  return (
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
            CAMBIAR CONTRASEÑA
          </h2>
          <form onSubmit = {formik.handleSubmit}>
            <div>
              <label className={classesRegister.divFormRoot} htmlFor="lastName"></label>
              <TextField
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                variant="outlined"
                onChange={formik.handleChange} error={formik.errors.password} helperText={formik.errors.password}
                fullWidth
              />
              </div>
              <div>
              <label className={classesRegister.divFormRoot} htmlFor="lastName"></label>
              <TextField
                id="rpassword"
                type="password"
                label="Password"
                placeholder="********"
                variant="outlined"
                onChange={formik.handleChange} error={formik.errors.password} helperText={formik.errors.password}
                fullWidth
              />
              </div>
            
            <div className={classesRegister.buttonRoot}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
              >
            Cambiar contraseña
              </Button>
              <Button 
              onClick={handleClose} 
              variant="contained"
              className={classesRegister.rootButton}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIdUser: (idUser) => dispatch(getIdUser(idUser)),
    modifiedPassword: (datos) => dispatch(modifiedPassword( global.id,global.datos)),
  };
};

const mapStateToProps = (state) => {
  return {
    id_user: state.id_user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifiedPassword);