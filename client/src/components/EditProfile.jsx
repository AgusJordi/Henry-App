import martin from "../images/martinborchardt.png";
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import { modifiedUser, getIdUser } from "../actions";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';




function getModalStyle() {
  const top = 20
  const left = 20

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
}


const useStyles = makeStyles((theme) => ({
  padre: {
    width: 800,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: "20px",
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    position: "fixed"
  },
  form: {
    outline: "none",
    width: 800,
    height: 500,
  },
  titulo: {
    justifyContent: "center",
    display: "flex",
    outline: "none",
  },
  img: {
    borderRadius: "30px",
    width: 150,
    height: 150,
    justifyContent: "center",
    boxShadow: theme.shadows[5],
  },
  inputP: {
    display: "flex",
    justifyContent: "space-evenly",
    width: 500,
    height: "auto",
    wordWrap: "wordbreak",
  },
  check: {
    display: "flex",
    marginLeft: 100,
    justifyContent: "center",
    width: 200,
  },
  perfil: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    width: 300,
    top: 100,
    marginLeft: 450,
  },
  button: {
    marginTop: 15,
    padding: 5,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    display: "block",
    marginTop: 10,
  },
  botones: {
    display: "flex",
  },
  botones1: {
    display: "flex",
    marginTop: 40,
    backgroundColor: theme.palette.background.paper,
    padding: 5,
    margin: 5,
  },
  botones2: {
    display: "flex",
    marginTop: 40,
    padding: 5,
    backgroundColor: "#ffff01",
    margin: 5,
  }


}));
//Action    //estado inicial
function EditProfile({ getIdUser, id_user, show, modifiedUser }) {
  //const { onlineUser } = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(true);
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    city: "",
    province: "",
    country: "",
    image: "",
    googleId: "",
    gitHubId: "",
  });

  var idUser = localStorage.getItem("idUser");

  useEffect(() => {
    setInput(id_user)
    // getIdUser(idUser)
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      
    });
  };

  const handlemodifiedUser = (e) => {
    e.preventDefault();
    modifiedUser(idUser, input)
    //window.location.reload()
    //return <Redirect to="./home" />;
  }
  // Cargar imagen de perfil
  const onChange = e => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  const onLoad = fileString => {
    setInput({ ...input, image: fileString })
  };

  const getBase64 = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
    reader.onerror = function (error) {

      alert('No se pudo cargar la imagen, intente nuevamente')
    };
  };

  const handleClose = () => {
    setOpen(false);
    show(false)
  };


  return (
    <React.Fragment>
      <div className={classes.father}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <form className={classes.form} onSubmit={handlemodifiedUser}>
            <div style={modalStyle} className={classes.padre}>
              <div className={classes.titulo}>
                <Typography variant="h4" component="h4">
                  EDITAR MI PERFIL
      </Typography>
              </div>

              <div>
                <div className={classes.inputP}>
                  <TextField
                    autoFocus
                    name="name"
                    margin="dense"
                    label="nombre"
                    placeholder={id_user.name}
                    type="text"
                    value={input.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    autoFocus
                    name="lastName"
                    margin="dense"
                    label="Apellido"
                    placeholder={id_user.lastName}
                    type="text"
                    value={input.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.inputP}>
                  <TextField
                    autoFocus
                    name="city"
                    margin="dense"
                    label="Ciudad"
                    placeholder={id_user.city}
                    type="text"
                    value={input.city}
                    onChange={handleInputChange}
                  />
                  <TextField
                    autoFocus
                    name="province"
                    margin="dense"
                    label="Provincia"
                    placeholder={id_user.province}
                    type="text"
                    value={input.province}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.inputP}>
                  <TextField
                    autoFocus
                    name="country"
                    margin="dense"
                    label="Pais"
                    placeholder={id_user.country}
                    type="text"
                    value={input.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={classes.inputP}>
                <Typography variant="h5" component="h5">
                  Datos de contacto
      </Typography>
              </div>

              <div>
                <div className={classes.inputP}>
                  <TextField
                    autoFocus
                    name="googleId"
                    margin="dense"
                    label="GoogleId"
                    placeholder={id_user.googleId}
                    type="text"
                    value={input.googleId}
                    onChange={handleInputChange}
                  />
                  <TextField
                    autoFocus
                    name="gitHubId"
                    margin="dense"
                    label="GitHubId"
                    placeholder={id_user.gitHubId}
                    type="text"
                    value={input.gitHubId}
                    onChange={handleInputChange}
                  />
                </div></div>

              <div className={classes.perfil}>
                <Typography variant="h5" component="h5">
                  Foto de perfil
               </Typography>
                <img className={classes.img} src={id_user.image}/>
                <span>Subir imagen</span>
                <input className={classes.button} type="file" onChange={handleInputChange} onChange={onChange} />
                <a className={classes.link}>
                  Eliminar imagen
                   </a>
                <div className={classes.botones}>
                  <button onClick={handleClose} className={classes.botones1}>Cancelar</button>
                  <button onClick={() => window.location.reload()} className={classes.botones2} >Guardar cambios</button>
                </div>
              </div>

            </div>
          </form>
        </Modal>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIdUser: (idUser) => dispatch(getIdUser(idUser)),
    modifiedUser: (idUser, input) => dispatch(modifiedUser(idUser, input)),

  };
};

const mapStateToProps = (state) => {
  return {
    id_user: state.id_user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);