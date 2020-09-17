import React from "react";
import "./Profile.css";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../actions/index";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

function Profile(props) {
  const { user } = props;
  // console.log("desde card", user);
  // const useStyles = makeStyles((theme) => ({
  //   boxPrincipal: {
  //     backgroundColor: theme.palette.background.paper,
  //     width: "70vw",
  //     height: "80vh",
  //     marginTop: 55,
  //     textAlign: "center",
  //     display: "flex",
  //   },
  //   // img
  //   boxImg: {
  //     width: theme.spacing(22),
  //     height: theme.spacing(22),
  //     marginLeft: "31vw",
  //     display: "flex",
  //     justifyContent: "center",
  //   },
  //   imgLarge: {
  //     width: theme.spacing(20),
  //     height: theme.spacing(20),
  //     marginLeft: 0,
  //   },
  //   // box interior
  //   boxLeft: {
  //     width: "25vw",
  //     height: "80vh",
  //     backgroundColor: "red",
  //   },
  //   boxRight: {
  //     width: "45vw",
  //     height: "80vh",
  //     backgroundColor: "blue",
  //   },
  // }));

  // const classes = useStyles();

  // return (
  //   <Grid container>
  //     <Box className={classes.boxImg} zIndex="tooltip" position="absolute">
  //       <Avatar
  //         className={classes.imgLarge}
  //         alt="Remy Sharp"
  //         src="https://www.latercera.com/resizer/_wAlwzeeESVVb7TfBGxNI0fK5wU=/375x250/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/6M77IUJMCVHZXLZY5X5KV5T5CI.jpg"
  //       />
  //     </Box>
  //     <Box
  //       xs={12}
  //       className={classes.boxPrincipal}
  //       boxShadow={2}
  //       position="absolute"
  //       zIndex="modal"
  //     >
  //       <Box xs={6} className={classes.boxLeft}></Box>
  //       <Box xs={6} className={classes.boxRight}></Box>
  //     </Box>
  //   </Grid>
  // );
  return (
    <div>
      <div className="padre">
        <div>
          <img
            className="foto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1fxA9MKWMi0uLOqys3eK8Ez8DQIPVB3b3gQ&usqp=CAU"
            alt=""
          />
        </div>
        <div className="hijouno">
          <h1>Cohorte: *7*</h1>
          <h1>Pm: Emi Checker</h1>
          <h1>Nombre: {user.name}</h1>
          <h1>Apellido: {user.lastName}</h1>
          <h1>Email: {user.email}</h1>
          <h1>Ciudad: {user.city}</h1>
          <h1>Provincia: {user.province}</h1>
          <h1>Pais: {user.country}</h1>
          <h1>Ubicacion: Internet</h1>
          <h1>Github: Androidpure</h1>
          <h1>Modulo: **HEnryApp**</h1>
          <h1>Pair programming: Everyday....</h1>
        </div>
        <div className="hijodos">
          <h1>Aca irian las estrellas del feedback</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
