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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

export default function Mycohorte(props) {
  const { users } = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [miembros, setMiembros] = React.useState(users);
  const [filtrados, setFiltrados] = React.useState(users);
  const [input, setInput] = React.useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalUser, setModalUser] = useState([]);

  let arrayClear = false;

  if (users.length > 0) {
    arrayClear = true;
  }
  const handleOpenModal = (value) => {
    setOpenModal(true);
    setModalUser(value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpen(false);
    // props.show(false); //pasarle desde el componente padre una funcion show por props
  };

  // setea el input
  const onChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setInput(inputValue);
  };

  useEffect(() => {
    filterList();
  }, [input]);

  const filterList = () => {
    let users = miembros;
    let q = input;
    if (arrayClear === false) {
      return setFiltrados("No hay usuarios");
    }
    users = users.filter(function (user) {
      if (user.name !== null || user.lastName !== null) {
        return (
          user.name.toLowerCase().indexOf(q) !== -1 ||
          user.lastName.toLowerCase().indexOf(q) !== -1
        ); // returns true or false
      } else return false;
    });
    setFiltrados(users);
  };

  if (arrayClear) {
    const listaFiltrados = filtrados.map((user) => {
      if (user.name !== null || user.lastName !== null) {
        return (
          <div className={classes.divs}>
            <img className={classes.img} src={martin} />
            <h3 className={classes.h3} onClick={() => handleOpenModal(user)}>
              {" "}
              {user.name + " " + user.lastName}
            </h3>
          </div>
        );
      }
    });
  }

  const contarActivos = (miembros) => {
    var suma = 0;
    for (let i = 0; i < miembros.length; i++) {
      if (miembros[i].name !== null || miembros[i].lastName !== null) {
        suma = suma + 1;
      }
    }
    return suma;
  };

  return (

    <React.Fragment className={classes.container} >
      <div className={classes.box2}>
        <div className="boxt">
          <Typography
            className={classes.title}
            bgcolor="text.primary"
            gutterBottom
          >
            Mi cohorte
          </Typography>
        </div>

        <div className="boxs">
          <Profile
            user={modalUser}
            state={openModal}
            close={handleCloseModal}
          />
          <div className={classes.boxl}>
            <InfoIcon className={classes.icon} />
            <div className={classes.div}>
            <Typography className={classes.a} variant="h5" component="h2">
              INSTRUCTOR: Emiliando Chequer
            </Typography>
            <Typography className={classes.a} variant="h5" component="h2">
              FECHA DE INICIO: 06/05/2020
            </Typography>
            <Typography className={classes.a} variant="h5" component="h2">
              PM1: Franco Rivadero
            </Typography>
            <Typography className={classes.a} variant="h5" component="h2">
              PM2: Agustina Grimaldi
            </Typography>
            <Typography className={classes.a} variant="h5" component="h2">
              GRUPO N° 2
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
            <Typography className={classes.a} variant="h5"><a className={classes.a} href="#">Ver todos los miembros del cohorte</a></Typography>
            <Typography className={classes.a}  variant="h5"><a className={classes.a} href="#">Ver todos los miembros de mi grupo</a></Typography>

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
