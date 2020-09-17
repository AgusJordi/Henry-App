import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Formik, Form, ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { sizing } from "@material-ui/system";

function Register(props) {
  const { open, onClose } = props;

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
    onSubmit: (values, { setSubmitting }) => {
      setUsers({ values });
      setSubmitting(false);
      console.log("desde registro", values);
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
            REGISTRARSE
          </h2>
          <form>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="firstName"></label>
              <TextField
                id="firstName"
                type="text"
                required
                {...formik.getFieldProps("firstName")}
                error={formik.errors.firstName}
                label="Nombre"
                helperText={formik.errors.firstName}
                placeholder="Gerardo"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="lastName"></label>
              <TextField
                id="lastName"
                type="text"
                required
                {...formik.getFieldProps("lastName")}
                error={formik.errors.lastName}
                label="Apellido"
                placeholder="Sofovich"
                helperText={formik.errors.lastName}
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <label htmlFor="lastName"></label>
              <TextField
                id="password"
                type="password"
                required
                {...formik.getFieldProps("password")}
                error={formik.errors.password}
                label="Password"
                placeholder="********"
                helperText={formik.errors.password}
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="city"></label>
              <TextField
                id="city"
                type="text"
                required
                {...formik.getFieldProps("city")}
                error={formik.errors.city}
                label="Ciudad"
                placeholder="Buenos Aires"
                helperText={formik.errors.city}
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="province"></label>
              <TextField
                id="province"
                type="text"
                required
                {...formik.getFieldProps("province")}
                error={formik.errors.province}
                label="Provincia"
                placeholder="Buenos Aires"
                helperText={formik.errors.province}
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="country"></label>
              <TextField
                id="country"
                type="text"
                required
                {...formik.getFieldProps("country")}
                error={formik.errors.country}
                label="Pais"
                placeholder="Argentina"
                helperText={formik.errors.country}
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classesRegister.divFormRoot}>
              <label htmlFor="email"></label>
              <TextField
                id="email"
                type="email"
                required
                {...formik.getFieldProps("email")}
                error={formik.errors.email}
                label="Email"
                placeholder="gerardo@canal9.com"
                helperText={formik.errors.email}
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
              <Button onClick={onClose} variant="contained" color="secondary">
                Cerrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default Register;
