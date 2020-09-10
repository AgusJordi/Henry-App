import React, { useState }from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

function Register() {

  function getModalStyle() {
    return {
      display: 'flex',
      flexWrap:'wrap',
      justifyContent:'center',
      borderRadius: '5px'
    };
  }
  
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
      outline: 'none',
      '&:focus': {
        boxShadow: '0 0 0 0.2rem #F5D553',
      },
    },
  }));

  const CustomButton = withStyles({
    root: {
      marginRight:'10px',
      backgroundColor:'#57D47A',
      '&:hover': {
        backgroundColor: '#45EB55',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#45EB55',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem #57D433',
      },
    },
  })(Button);

  const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  // HARDCODEO COSMICO

  const [users, setUsers] = useState([])



  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <div>
          <h2 id="simple-modal-title">REGISTRARSE</h2>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, 'Ingresa menos de 15 caracteres')
                .required('Required'),
              lastName: Yup.string()
                .max(15, 'Ingresa menos de 15 caracteres')
                .required('Required'),
              email: Yup.string()
                .email('Email invalido')
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setUsers({values})
                setSubmitting(false);
          
            }}
          >
            <Form>
              <div>
                <label htmlFor="firstName"></label>
                <Field name="firstName" type="text" placeHolder='Ingresa tu nombre'/>
                <ErrorMessage name="firstName" />
              </div>
              <div>
                <label htmlFor="lastName"></label>
                <Field name="lastName" type="text" placeHolder='Ingresa tu apellido'/>
                <ErrorMessage name="lastName" />
              </div>
              <div>
                <label htmlFor="email"></label>
                <Field name="email" type="email" placeHolder='Ingresa tu email'/>
                <ErrorMessage name="email" />
              </div>
              <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <CustomButton type='submit' variant="contained" color="primary" >
                  Registrarse
                </CustomButton>
                <Button onClick={handleClose} variant="contained" color="secondary">
                  Cerrar
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    );

    
  console.log('seEnvio', users)

    return (
      <div>
        <button onClick={handleOpen}>
          Open Modal
        </button>
        <Modal
          open={open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          {body}
        </Modal>
      </div>
    );

}
export default Register;