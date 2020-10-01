import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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
    borderRadius: "30px",
    width: "250px",
    height: "250px",
    margin: "auto",
    boxShadow: theme.shadows[5],
  },
}));

export default function Profile(props) {
  const { user, state, close } = props; 

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div className={classes.father}>
      <Modal
        open={state}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.div}>
            {user.name===null? 
            <div>
            <h1>{user.email}</h1>
            <img className={classes.img} src={user.image} />
            </div>
            :
            <div>
              <h1>
                {" "}
                {user.name} {user.lastName}
              </h1>
              <img className={classes.img} src={user.image} />
              {/* <p>
                {user.province}, {user.country}
              </p> */}
              <p>Email: {user.email}</p>
              <p>Celular: 1540856398</p>
            </div>
            }  
          </div>

          {/* <h1>Github:{user.email}</h1> */}
          {/* <Profile/> */}
        </div>
      </Modal>
    </div>
  );
}
