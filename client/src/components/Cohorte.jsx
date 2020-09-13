import React, { useState, useEffect, Fragment } from "react";
import "./home.css";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

//
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
function Cohorte() {
  //hardcodeo
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUsers(res.data);
  }, []);
  //seteo cuadrado
  const useStyles = makeStyles((theme) => ({
    //box contenedora
    boxPrincipal: {
      backgroundColor: theme.palette.background.paper,
      width: "70vw",
      height: "80vh",
      textAlign: "center",
      paddingTop: 25,
    },
    //box titulo principal
    pruebaTitle: {
      borderBottom: `1px solid ${theme.palette.text.disabled}`,
      backgroundColor: theme.palette.text.secondary,
      width: "70vw",
      height: "10vh",
      textAlign: "center",
      textJustify: "center",
      paddingTop: "1vh",
    },
    setFontTitle: {
      color: "#EDEAE6",
      fontSize: "3.5rem",
    },
    //box cuerpo
    setBody: {
      display: "flex",
    },
    //sideBar
    rootSideBar: {
      borderRight: `1px solid ${theme.palette.divider}`,
      width: "30vw",
      height: "67vh",
      margin: 0,
    },
    rootIcon: {
      fontSize: 75,
      color: theme.palette.text.secondary,
    },
    setIcon: {
      paddingRight: 50,
    },
    titleSideBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      height: "18vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    infoSideBar: {
      height: "52vh",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },

    setTextBox: {
      textAlign: "initial",
    },
    styleTitelBodySide: {
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontSize: 30,
    },
    setTextBoxInfoSide: {},
    listOne: {
      width: "30vw",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 418,
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
    styleTextUser: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontSize: 25,
    },

    //info
    rootInfo: {
      width: "40vw",
      height: "70vh",
    },
    titleInfo: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      height: "10vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    bodyInfo: {
      height: "52vh",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    titelRootIndo: {
      fontSize: 45,
    },
    setTextBoxInfoInfo: {},
    listOneInfo: {
      width: "40vw",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 537,
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0,
    },
    styleTextUserInfo: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontSize: 25,
    },
  }));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Box xs={12} className={classes.boxPrincipal} boxShadow={2}>
          <Box className={classes.pruebaTitle}>
            <Typography className={classes.setFontTitle}>
              TITULO DE PRUEBA
            </Typography>
          </Box>
          <Box className={classes.setBody}>
            <Box className={classes.rootSideBar}>
              <Box className={classes.titleSideBar}>
                <Box className={classes.setIcon}>
                  <InfoOutlinedIcon className={classes.rootIcon} />
                </Box>
                <Box className={classes.setTextBox}>
                  <Typography variant="h5">
                    INSTRUCTOR: SARASA SARASA
                  </Typography>
                  <Typography variant="h5">
                    FECHA DE INICIO: 06/01/20
                  </Typography>
                  <Typography variant="h5">
                    FECHA DE FINALIZACION: 06/01/20
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box className={classes.styleTitelBodySide}>
                  PM`S DEL COHORTE
                </Box>
              </Box>
              <Box className={classes.infoSideBar}>
                <Box className={classes.setTextBoxInfoSide}>
                  <List className={classes.listOne}>
                    {users.map((pm) => {
                      return (
                        <ul className={classes.ul}>
                          <Box className={classes.styleTextUser}>{pm.name}</Box>
                          <Box className={classes.styleTextUser}>{pm.name}</Box>
                          <Box className={classes.styleTextUser}>{pm.name}</Box>
                        </ul>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Box>
            <Box className={classes.rootInfo}>
              <Box className={classes.titleInfo}>
                <Box className={classes.titelRootIndo}>ALUMNOS</Box>
              </Box>
              <Box className={classes.bodyInfo}>
                <Box className={classes.setTextBoxInfoInfo}>
                  <List className={classes.listOneInfo}>
                    {users.map((pm) => {
                      return (
                        <ul className={classes.ul}>
                          <Box className={classes.styleTextUserInfo}>
                            {pm.name}
                          </Box>
                          <Box className={classes.styleTextUserInfo}>
                            {pm.name}
                          </Box>
                          <Box className={classes.styleTextUserInfo}>
                            {pm.name}
                          </Box>
                        </ul>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </div>
  );
}

export default Cohorte;
