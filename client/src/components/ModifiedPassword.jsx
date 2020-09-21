import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Formik, Form, ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { sizing } from "@material-ui/system";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { modifiedPassword } from "../actions";

function ModifiedPassword(props) {
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
    props.show(false)
  };

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
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().max(15, "Ingresa menos de 15 caracteres"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setUsers({ values });
      setSubmitting(false);
      //modifiedPassword(idUser,input)
  //  history.replace('/home')
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
          <form >
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

export default ModifiedPassword;


{/*

function ResetPassword(props) {
  // const { id } = useParams();
  const { user } = props;
  const [input, setInput] = useState({
    password: '',
    repassword: ''
  });

  // const [error, setError] = useState(false); // para activar la letra roja desde material-UI
  // const [helperText, setHelperText] = useState('');

  let history = useHistory();

  let handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const submitLogIn = (e) => {
    e.preventDefault();
    modifiedUser(input)
  }

axios.put(`http://localhost:4000/auth/${id}/passwordReset`,{
      password: input.password
    }, { withCredentials: true }).then(res => {
      console.log(res)
      history.replace('/home');
    }).catch(err => {
      console.log(err)
    })}else{
      swal("", "Las contraseñas deben coincidir!")
    }





  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          *Ingresar su nueva contraseña*
        </Typography>
        <form onSubmit={submitLogIn} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nueva contraseña"
            type="password"
            id="password"
            value={input.password}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repassword"
            label="Confirme contraseña"
            type="password"
            id="repassword"
            value={input.repassword}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            cambiar contraseña
          </Button>
          <Grid container justify="flex-end">
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

    </Container>
  );
}

const mapStateToProps = ({ user }) => ({
  user
});


export default connect(mapStateToProps, null)(ResetPassword)*/}