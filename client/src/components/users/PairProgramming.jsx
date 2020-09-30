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
    fontSize: 72,
    marginTop: "50px",
    marginBottom: "30px",
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
  boxr: {
    marginTop: 50,

    display: "flex",

    justifyContent: "space-evenly",

    width: "100%",
  },
  boxl: {
    float: "left",
    verticalAlign: "middle",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(255, 255, 222)",	
    overflow: "auto",
    borderRadius: "0 0 0 30px",
  },
  boxtitulo: {
    borderRadius: "0 0 30px 0",
    width: "80%",
    backgroundColor: "rgb(255, 255, 200)",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems:"center"
  },
  box2: {
    backgroundColor: "black",
    borderRadius: "30px",
    marginTop: "20px",
    marginLeft: "30px",
    width: "90%",
    height: "80%",
  },
  divs: {
    display: "flex",
    margin: "15px",
  },
  img: {
    borderRadius: "50px",
    width: "50px",
    height: "50px",
    marginRight: "10px",
    boxShadow: theme.shadows[5],
  },
  h3: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  div: {
    width: "400px"
  },
  miembros:{
    marginBottom: "30px",
    marginTop: "50px"
  },
  text:{
    display:"flex",
    flexDirection:"column",
    margin:"30px",
    textAlign:"justify"
  }
}));

export default function PairProgramming(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [input, setInput] = React.useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalUser, setModalUser] = useState([]);


  const usuariosPP= 
  [{"id":19,"name":"Marco","lastName":"Lazo","email":"prueba4@gmail.com","city":null,"province":null,"country":null,"status":"inhabilitado","student":true,"pm":false,"instructor":false,"admin":false,"image":null,"googleId":null,"gitHubId":null,"createdAt":"2020-09-30T14:27:49.876Z","updatedAt":"2020-09-30T14:27:49.876Z"},
  {"id":6,"name":"Agustina","lastName":"Grimaldi","email":"pmyalumno2@gmail.com","city":null,"province":null,"country":null,"status":"habilitado","student":true,"pm":true,"instructor":false,"admin":false,"image":"https://ca.slack-edge.com/TPRS7H4PN-U013C65N3EE-94afb08ee1d6-512","googleId":null,"gitHubId":null,"createdAt":"2020-09-30T14:27:49.871Z","updatedAt":"2020-09-30T14:27:49.871Z"},
  {"id":2,"name":"admin","lastName":"Cofounder","email":"admin@gmail.com","city":null,"province":null,"country":null,"status":"habilitado","student":false,"pm":true,"instructor":true,"admin":true,"image":"https://img2.freepng.es/20190706/hpx/kisspng-portable-network-graphics-computer-icons-system-ad-system-administration-database-administrator-png-5d206ab0b91e91.7890932215624055527583.jpg","googleId":null,"gitHubId":null,"createdAt":"2020-09-30T14:27:49.868Z","updatedAt":"2020-09-30T16:58:45.634Z"},
  {"id":11,"name":"Henrys","lastName":"It","email":"student2@gmail.com","city":null,"province":null,"country":null,"status":"habilitado","student":true,"pm":false,"instructor":false,"admin":false,"image":"https://ca.slack-edge.com/TPRS7H4PN-U011PFSHT5Z-3d88007c066e-512","googleId":null,"gitHubId":null,"createdAt":"2020-09-30T14:27:49.872Z","updatedAt":"2020-09-30T14:27:49.872Z"},
  {"id":12,"name":"Rodrigo","lastName":"Blanca","email":"student3@gmail.com","city":null,"province":null,"country":null,"status":"habilitado","student":true,"pm":false,"instructor":false,"admin":false,"image":"https://ca.slack-edge.com/TPRS7H4PN-U01B61MBSES-a32ccae237ec-512","googleId":null,"gitHubId":null,"createdAt":"2020-09-30T14:27:49.873Z","updatedAt":"2020-09-30T14:27:49.873Z"}
]
  
  
  
  // const handleOpen = () => {
  //   setOpen(true);
  // };
 
  
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



  return (
    <React.Fragment>
      <div className={classes.box2}>
        <div className="boxt">
          <Typography
            className={classes.title}
            bgcolor="text.primary"
            gutterBottom
          >
            Pair Programming
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
            <div className={classes.text} >

            <Typography variant="h5" component="h2">
              En esta seccion podrás ver a tus compañeros de Pair-Programming,
              con los que deberás ponerte en contacto para programar una reunión
              diaria donde podrán intercambiar sobre código. Todos los viernes
              deberás calificar el desempeño de tus compañeros de
              Pair-Programming ingresando a este enlace:
            </Typography>
            <Typography variant="h5" component="h4"><a href="#">
              Completar el formulario de feedback semanal
            </a>
            </Typography>
            </div>
          </div>

          <div className={classes.boxtitulo}>
            <div className={classes.miembros}>
              <Typography variant="h3" component="h1">
                Miembros
              </Typography>
            </div>
            <div className={classes.div}>
              {usuariosPP.map((user) => {
                  let nombreCompleto = `${user.name} ${user.lastName}`;
                  let id = user.id;
                  return (
                    
                    <div className={classes.divs}>
                      <img className={classes.img} src={user.image ? user.image : 'https://camo.githubusercontent.com/f8ea5eab7494f955e90f60abc1d13f2ce2c2e540/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323037383234352f3235393331332f35653833313336322d386362612d313165322d383435332d6536626439353663383961342e706e67'} />
                      <h3 className={classes.h3} onClick={() => handleOpenModal(user)}>
                        {" "}
                        {nombreCompleto}
                      </h3>
                    </div>
                  );
                })
              }

            </div>
            {/* <div className = "boxr">
    <Avatar  alt="Remy Sharp" src="data:image/jpeg;base64,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" />
    <Typography variant="h5" component="h2">        
      Juan
    </Typography>
    <Typography variant="h5" component="h2">        
      Lezama
    </Typography>
    
    </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
