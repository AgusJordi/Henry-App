import React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpIcon from "@material-ui/icons/Help";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Navbar.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useEffect } from "react";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ModifiedPassword from "./ModifiedPassword.jsx";
import { getAllUsers, userLogIn, onlineUserError, onlineUser } from "../actions/index.js";
import axios from "axios";
import {Link} from "react-router-dom";
import ModalSearchBar from "./ModalSearchBar";

var lsName = localStorage.getItem("username");

function Navbar({ onlineUser, userLogIn, getIdUser, id_user, all_users }) {
  useEffect(() => {
    getAllUsers(589); //probando actions
    userLogIn(onlineUser);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showPerfil, setshowPerfil] = React.useState(false);
  const [showPerfilUpdate, setshowPerfilUpdate] = React.useState(false);
  const [showPerfilPassword, setshowPerfilPassword] = React.useState(false);
  const [showModalSearch, setShowModalSearch] = React.useState(false);
  const [input, setInput] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.removeItem("idUser");
    localStorage.removeItem("lastName");
    localStorage.removeItem("username");
    window.location = "./login";
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenProfile = () => {
    setshowPerfil(true);
    setshowPerfilUpdate(false);
  };
  const handleOpenEditProfile = () => {
    setshowPerfilUpdate(true);
  };
  const handleClseProfile = () => {
    setshowPerfil(false);
  };
  const handleOpenPassword = () => {
    setshowPerfilPassword(true);
    setshowPerfil(false);
    setshowPerfilUpdate(false);
  };
  const handleOpenModalSearch = () => {
    setShowModalSearch(true);
  };

  //ESTA ES NUESTRA ACTION QUE PUEDE HACERSE UNA CONSTANTE PARA ESE ICONO
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    img: {
      display: "block",
      margin: "auto",
      width: theme.spacing(8),
      height: theme.spacing(8),
      borderRadius: "50px",
    },
    name: {
      fontSize: "16px",
      marginLeft: "15px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    cohorte: {
      fontSize: "14px",
      marginTop: "2px",
      marginLeft: "15px",
    },
    imgRoot: {
      marginLeft: 10,
    },
    fontAwesome: {
      fontFamily: "Helvetica, Roboto, FontAwesome",
      fontSize: "15px",
      padding: "5px",
      outline: "none",
    },
  }));

  const classes = useStyles();
  // var searchInput= document.getElementById('#search_input')
  //   searchInput.click(function(e) {
  //     alert('clicked');
  //   });
  // const myFunc = ( ) =>{
    
  // }
  // document.getElementById("search_input").onclick = function() {
  //   alert ("tocaste el input")}

  return (
    <div className="navbar">
      <div className="navbar_left">      
        <AccessTimeIcon fontSize="large" />
      </div>
      <div className="navbar_search" id="esto">
        <input
          id="search_input"
          type="text"
          // onChange={handleOpenModalSearch}
          onClick={()=>handleOpenModalSearch()}
          placeholder="&#xF002; Buscar en Henry"
          className={classes.fontAwesome}
        />
      </div>
      <div>
        <img
          src="https://emojis.wiki/emoji-pics/apple/rocket-apple.png"
          alt="Cohete"
          className={classes.imgRoot}
        />
      </div>
      <div className="navbar_right">
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon fontSize="large" />
          <span style={{ marginLeft: "10px" }}>
            <large>
              {" "}
              Hola! <b>{id_user.name}</b>              
            </large>
          </span>
        </Button>
        <Menu
          display="inline"
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleCloseMenu}
          TransitionComponent={Fade}
        >
          <div>
            <img className={classes.img} src={id_user.image} />
            <p className={classes.name}>
              {id_user.name} {id_user.lastName}
            </p>
            <p className={classes.cohorte}>Cohorte 2</p>
          </div>
          <Divider light />
          <MenuItem onClick={handleOpenProfile}>Ver mi perfil</MenuItem>
          <Divider light />
          <MenuItem onClick={handleOpenEditProfile}>Editar mi perfil</MenuItem>
          <Divider light />
          <MenuItem onClick={handleOpenPassword}>Cambiar contraseña</MenuItem>
          <Divider light />
          <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
        </Menu>
        <Profile
        
          show={setshowPerfil}
          user={id_user}
          state={showPerfil}
          close={handleClseProfile}
        />
        {showPerfilUpdate === true ? (
          <EditProfile show={setshowPerfilUpdate} />
        ) : (
          ""
        )}
        {showPerfilPassword === true ? (
          <ModifiedPassword show={setshowPerfilPassword} />
        ) : (
          ""
        )}
           {showModalSearch === true ? (
          <ModalSearchBar show={setShowModalSearch} users={all_users}/>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (number) => dispatch(getAllUsers(589)),
    userLogIn: (input) => dispatch(userLogIn(input)),
    onlineUserError: () => dispatch(onlineUserError()),
    
  };
};

const mapStateToProps = (state) => {
  return {
    all_users: state.all_users,
    onlineUser: state.onlineUser,
    id_user: state.id_user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
