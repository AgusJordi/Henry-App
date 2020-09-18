import martin from "../images/martinborchardt.png";
import React, { useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import { getAllUsers, userLogIn, onlineUserError, getIdUser } from "../actions";
import { connect } from "react-redux";


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 40 + rand();
  const left = 40 + rand();
  
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  padre: {
    position: 'relative',
    width: 800,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: "20px",
    padding: theme.spacing(2, 4, 3),
  },
  titulo:{
    justifyContent: "center",
    display: "flex",
    outline: "none",
  },
  img: {
    borderRadius: "30px",
    width: 150,
    height: 150,
    justifyContent:"center",
    boxShadow: theme.shadows[5],
  },
  inputP : {
    display:"flex",
    justifyContent:"space-evenly",
    width: 500,
    height:"auto",
    wordWrap: "wordbreak",
  },
  check :{
    display:"flex",
    marginLeft:100,
    justifyContent: "center",
    width:200,
  },
  perfil : {
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    position: "absolute",
    width: 300,
    top:100,
    marginLeft: 450,
  },
  button :{
    marginTop:15,
    padding: 5,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    display:"block",
    marginTop:10,
  },
  botones:{
    display:"flex",
  },
  botones1:{
    display:"flex",
    marginTop:40,
    backgroundColor: theme.palette.background.paper,
    padding:5,
    margin:5,
  },
  botones2:{
    display:"flex",
    marginTop:40,
    padding:5,
    backgroundColor:"#ffff01",
    margin:5,
  }


}));

 function EditProfile({getIdUser, id_user}) {
  //const { onlineUser } = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(true);
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    description: "",
    cohorte: "",
    group: "",
    pairProgramming: "",
  });

  var idUser = localStorage.getItem("idUser");

  useEffect(() => {
    getIdUser(idUser)
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

  const handleClose = () => {
    setOpen(false);
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
      <div style={modalStyle} className={classes.padre}>
      <div className={classes.titulo}>
      <Typography variant="h4" component="h4">
      EDITAR MI PERFIL
      </Typography>
      </div>

      <div>
      <div className = {classes.inputP}>
        <TextField
        autoFocus
        name="name"
        margin="dense"
        label=""
        type="text"
        value={id_user.name}
        onChange={handleInputChange}
      />
      <TextField
        autoFocus
        name="apellido"
        margin="dense"
        label=""
        type="text"
        value={id_user.lastName}
        onChange={handleInputChange}
      />
      </div>
      <div className = {classes.inputP}>
        <TextField
        autoFocus
        name="name"
        margin="dense"
        label=""
        type="text"
        value={id_user.city}
        onChange={handleInputChange}
      />
      <TextField
        autoFocus
        name="apellido"
        margin="dense"
        label=" "
        type="text"
        value={id_user.province}
        onChange={handleInputChange}
      />
      </div>
      <div className={classes.inputP}>
      <TextField
        autoFocus
        name="name"
        margin="dense"
        label=" "
        type="text"
        value={id_user.country}
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
      <div className = {classes.inputP}>
        <TextField
        autoFocus
        name="name"
        margin="dense"
        label=" "
        type="text"
        value={id_user.googleId}
        onChange={handleInputChange}
      />
      <TextField
        autoFocus
        name="name"
        margin="dense"
        label=" "
        type="text"
        value={id_user.githugId}
        onChange={handleInputChange}
      />
      </div>
      <div className = {classes.inputP}>
        <TextField
        autoFocus
        name="name"
        margin="dense"
        label="N° celular"
        type="text"
        value={input.name}
        onChange={handleInputChange}
      />
      <TextField
        autoFocus
        name="name"
        margin="dense"
        label="Linkedin"
        type="text"
        value={input.name}
        onChange={handleInputChange}
      />
      </div>
      <div className = {classes.check}>
      <Checkbox
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      /> <p>Mostrar mi número</p>
      </div>
      </div>

      <div className = {classes.perfil}>
      <Typography variant="h5" component="h5">
      Foto de perfil
      </Typography>
      <img className={classes.img} src={martin}/>
      <button className = {classes.button} >
        Subir imagen
      </button>
      <a className = {classes.link} >
        Eliminar imagen
      </a>
      <div className = {classes.botones}>
      <button className = {classes.botones1}>Cancelar</button>
      <button className = {classes.botones2}>Guardar cambios</button>
      </div>
      </div>

      </div>
     </Modal>
    </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIdUser: (idUser) => dispatch(getIdUser(idUser)),
  };
};

const mapStateToProps = (state) => {
  return {
    id_user: state.id_user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);