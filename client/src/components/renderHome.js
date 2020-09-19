import React, { useState, useEffect, Fragment } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Profile from "./Profile";
import Cohorte from "./Cohorte";
import AreaAdmin from "./Crud/AreaAdmin.jsx";
import PairProgramming from "./users/PairProgramming.jsx";
import Grid from "@material-ui/core/Grid";
import {
  getAllUsers,
  getAllCohortes,
  getAllInstructors,
} from "../actions/index";
import Carrousel from "./Carrousel.jsx";

function Home(props) {
  const { onSetSelect } = props;

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.all_users);
  const allInstructors = useSelector((state) => state.all_instructors);
  const allCohortes = [];

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCohortes());
    dispatch(getAllInstructors());
  }, []);

  function TabPanel(props) {
    //SETEO QUE DEVUELVE LOS INTEGRANTES DE UN GRUPO Y SU CARD
    const { children, value, index, ...other } = props;

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
    prueba: {
      backgroundColor: "yellow",
    },
  }));

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [idCohorte, setIdCohorte] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveCohorte = (value) => {
    setIdCohorte(value);
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
              classes={{
                indicator: classes.prueba,
              }}
            >
              <h2 className={classes.tabTitel}>COHORTES</h2>
              {allCohortes.length === 0 ? (
                <Tab label="No hay cohortes" />
              ) : (
                allCohortes.map((cohorte, index) => {
                  return (
                    <Tab
                      label={cohorte.name}
                      onClick={() => saveCohorte(cohorte)}
                    />
                  );
                })
              )}
            </Tabs>
          </Grid>
          <Grid xs={10} className={classes.cohorteRoot}>
            {allCohortes.length === 0 ? (
              <Cohorte users={allUsers} cohorte={false} />
            ) : (
              <Cohorte users={allUsers} cohorte={allCohortes} />
            )}
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
                value="false"
                onChange={handleChange}
                classes={{
                  indicator: classes.prueba,
                }}
              >
                <h2 className={classes.tabTitel}>INSTRUCTORES</h2>
                {allUsers.map((alumno, index) => {
                  let nombreCompleto = `${alumno.name} ${alumno.lastName}`;
                  return <Tab label={nombreCompleto} />;
                })}
              </Tabs>
            </Grid>
            <Grid xs={10}>
              {allUsers.map((alumno, index) => {
                return (
                  <Fragment>
                    <TabPanel value={value} index={index + 1}>
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
                classes={{
                  indicator: classes.prueba,
                }}
              >
                <h2 className={classes.tabTitel}>PM´S</h2>
                {allUsers.map((alumno, index) => {
                  let nombreCompleto = `${alumno.name} ${alumno.lastName}`;
                  return <Tab label={nombreCompleto} />;
                })}
              </Tabs>
            </Grid>
            <Grid xs={10}>
              {allUsers.map((alumno, index) => {
                return (
                  <Fragment>
                    <TabPanel value={value} index={index + 1}>
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
                classes={{
                  indicator: classes.prueba,
                }}
              >
                <h2 className={classes.tabTitel}>ALUMNOS</h2>
                {allUsers.map((alumno, index) => {
                  let nombreCompleto = `${alumno.name} ${alumno.lastName}`;
                  return <Tab label={nombreCompleto} />;
                })}
              </Tabs>
            </Grid>
            <Grid xs={10}>
              {allUsers.map((alumno, index) => {
                return (
                  <Fragment>
                    <TabPanel value={value} index={index + 1}>
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
  if (onSetSelect === "Herramientas") {
    return (
      <div>
        <Grid container>
          <Grid xs={12} container className={classes.tabPanel}>
            <AreaAdmin instructores={allInstructors} />
          </Grid>
        </Grid>
      </div>
    );
  }
  if (onSetSelect === "Noticias") {
    return (
      <div>
        <Carrousel />
      </div>
    );
  }
  if (onSetSelect === "PairProgramming") {
    return (
      <div>
        <Grid container>
          <Grid xs={12} container className={classes.tabPanel}>
            <PairProgramming users={allUsers} />
          </Grid>
        </Grid>
      </div>
    );
  }

  return <div></div>;
}

export default Home;
