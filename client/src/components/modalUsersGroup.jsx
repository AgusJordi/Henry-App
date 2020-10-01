import martin from "../images/martinborchardt.png";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Profile from "./Profile";

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "20px",
    padding: theme.spacing(2, 4, 3),
    justifyContent: "center",
    display: "flex",
    outline: "none",
  },
  img: {
    borderRadius: "50px",
    width: "50px",
    height: "50px",
    marginRight: "10px",
    boxShadow: theme.shadows[5],
  },
  fontAwesome: {
    fontFamily: "Helvetica, Roboto, FontAwesome",
    fontSize: "15px",
    padding: "5px",
    outline: "none",
    width: "-webkit-fill-available",
    marginBottom: "10px",
    "&:focus": {
      outline: "auto",
    },
  },
  divs: {
    display: "flex",
    margin: "10px",
  },
  users: {
    overflow: "auto",
    maxHeight: "360px",
  },
  h3: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function ModalUsers(props) {
  const { users } = props;
   
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [miembros, setMiembros] = React.useState(users);
  const [filtrados, setFiltrados] = React.useState(users);
  const [input, setInput] = React.useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalUser, setModalUser] = useState([]);

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

  //filtra cada vez que cambia el input.value
  useEffect(() => {
    filterList();
  }, [input]);

  const filterList = () => {
    let users = miembros;
    let q = input;

    users = users.filter(function (user) {
      if(user.name!==null||user.lastName!==null){
      return (
        user.name.toLowerCase().indexOf(q) !== -1 ||
        user.lastName.toLowerCase().indexOf(q) !== -1
      ); // returns true or false
      }
      else return false
    });
    setFiltrados(users);
  };

  const listaFiltrados = filtrados.map((user) => {
    if(user.name!==null||user.lastName!==null){

      return (
        <div className={classes.divs}>
          <img className={classes.img} src={user.image ? user.image : 'https://camo.githubusercontent.com/f8ea5eab7494f955e90f60abc1d13f2ce2c2e540/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323037383234352f3235393331332f35653833313336322d386362612d313165322d383435332d6536626439353663383961342e706e67'} />
          <h3 className={classes.h3} onClick={() => handleOpenModal(user)}>
            {" "}
            {user.name + " " + user.lastName}
          </h3>
        </div>
      );

    }
  });
  
  const contarActivos = (miembros) => {
    var suma=0
    for (let i = 0 ; i<miembros.length; i++){
      if (miembros[i].name!==null || miembros[i].lastName!==null ){
        suma= suma+1
      }
    }
    return suma 
  }

  return (
    <div className={classes.father}>
      <Profile user={modalUser} state={openModal} close={handleCloseModal} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.div}>
            <h1> {contarActivos(miembros)} {contarActivos(miembros)>1? "miembros":"miembro"} en tu cohorte </h1>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Search"
                value={input}
                onChange={onChange}
                placeholder="                  &#xF002; Buscar miembros"
                className={classes.fontAwesome}
              />
            </div>
            <div className={classes.users}>{listaFiltrados}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
