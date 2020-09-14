import React, { useState, useEffect, Fragment } from "react";
import "./home.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Profile from "./Profile";
import Cohorte from "./Cohorte";
import Grid from "@material-ui/core/Grid";

function Home(props) {
  const { onSetSelect } = props;
  console.log("desde home", onSetSelect);

  //HARCODEO DE API
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUsers(res.data);
  }, []);

  function TabPanel(props) {
    //SETEO QUE DEVUELVE LOS INTEGRANTES DE UN GRUPO Y SU CARD
    const { children, value, index, ...other } = props;
    console.log(
      "children",
      children,
      "value",
      value,
      "index",
      index,
      "other",
      other
    );
    return (
      <div>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const useStyles = makeStyles((theme) => ({
    rootList: {
      backgroundColor: theme.palette.background.paper,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabPanel: {
      width: "86vw",
      height: "94vh",
    },
    tabTitel: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      textAlign: "center",
      paddingBottom: 7,
    },
    cohorteRoot: {
      display: "flex",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //RENDERISA SEGUN QUE PIDE EL USER
  if (onSetSelect === "Cohortes") {
    return (
      <Grid container>
        <Grid xs={12} container className={classes.tabPanel}>
          <Grid xs={2} className={classes.tabs}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
            >
              <h2 className={classes.tabTitel}>COHORTES</h2>
              {users.map((alumno, index) => {
                console.log(alumno);
                return <Tab label={alumno.name} />;
              })}
              {users.map((alumno, index) => {
                console.log(alumno);
                return <Tab label={alumno.name} />;
              })}
              {users.map((alumno, index) => {
                console.log(alumno);
                return <Tab label={alumno.name} />;
              })}
              {users.map((alumno, index) => {
                console.log(alumno);
                return <Tab label={alumno.name} />;
              })}
            </Tabs>
          </Grid>
          <Grid xs={10} className={classes.cohorteRoot}>
            <Cohorte />
          </Grid>
        </Grid>
      </Grid>
    );
  }
  if (onSetSelect === "Instructores") {
    return (
      <div>
        <Grid container>
          <Grid xs={12} container className={classes.tabPanel}>
            <Grid xs={2} className={classes.tabs}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
              >
                <h2 className={classes.tabTitel}>INSTRUCTORES</h2>
                {users.map((alumno, index) => {
                  console.log(alumno);
                  return <Tab label={alumno.name} />;
                })}
              </Tabs>
            </Grid>
            <Grid xs={10}>
              {users.map((alumno, index) => {
                return (
                  <Fragment>
                    <TabPanel value={value} index={index}>
                      <Profile user={alumno} />
                    </TabPanel>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
  if (onSetSelect === "Pm´s") {
    return (
      <div>
        <Grid container>
          <Grid xs={12} container className={classes.tabPanel}>
            <Grid xs={2} className={classes.tabs}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
              >
                <h2 className={classes.tabTitel}>PM´S</h2>
                {users.map((alumno, index) => {
                  console.log(alumno);
                  return <Tab label={alumno.name} />;
                })}
              </Tabs>
            </Grid>
            <Grid xs={10}>
              {users.map((alumno, index) => {
                return (
                  <Fragment>
                    <TabPanel value={value} index={index}>
                      <Profile user={alumno} />
                    </TabPanel>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
  if (onSetSelect === "Alumnos") {
    return (
      <div>
        <Grid container>
          <Grid xs={12} container className={classes.tabPanel}>
            <Grid xs={2} className={classes.tabs}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
              >
                <h2 className={classes.tabTitel}>ALUMNOS</h2>
                {users.map((alumno, index) => {
                  console.log(alumno);
                  return <Tab label={alumno.name} />;
                })}
              </Tabs>
            </Grid>
            <Grid xs={10}>
              {users.map((alumno, index) => {
                return (
                  <Fragment>
                    <TabPanel value={value} index={index}>
                      <Profile user={alumno} />
                    </TabPanel>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
  return <div></div>;
}

export default Home;
