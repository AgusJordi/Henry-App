import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpIcon from "@material-ui/icons/Help";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Navbar.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import Divider from "@material-ui/core/Divider";
import martin from "../images/martinborchardt.png";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getAllUsers, userLogIn, onlineUserError, onlineUser } from "../actions";

var lsName = localStorage.getItem("username");
console.log()

function Navbar({onlineUser, userLogIn}) {

  useEffect(() => {
    getAllUsers(589); //probando actions
    userLogIn(onlineUser)
  }, []);

  console.log('EL ESTADODDDDD', onlineUser)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.removeItem("username");
    window.location = "./login";
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
  }));

  const classes = useStyles();

  return (
    <div className="navbar">
      <div className="navbar_left">
        <HelpIcon />
        <AccessTimeIcon />
      </div>
      <div className="navbar_search">
        <SearchIcon />
        <input className="navbar_search" placeholder="Buscar en Henry" />
      </div>
      <div>
        <img
          src="https://emojis.wiki/emoji-pics/apple/rocket-apple.png"
          alt=""
        />
      </div>
      <div className="navbar_right">
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon />
          <span style={{ marginRight: "12px" }}>
            <small>
              {" "}
              Hola! <b>{lsName}</b>
              
            </small>
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
            <img className={classes.img} alt="Martin" src={martin} />
            <p className={classes.name}>Martin Borchardt</p>
            <p className={classes.cohorte}>Cohorte 2</p>
          </div>
          <Divider light />
          <MenuItem onClick={""}>Ver mi perfil</MenuItem>
          <Divider light />
          <MenuItem onClick={""}>Cambiar contraseña</MenuItem>
          <Divider light />
          <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
        </Menu>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


  
