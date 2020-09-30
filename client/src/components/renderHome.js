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
import Mycohorte from "./users/Mycohorte.jsx";
import Grid from "@material-ui/core/Grid";
import {
  getAllCohortes,
  getAllInstructors,
  getAllStudents,
  getAllPms,
  getIdUser,
} from "../actions/index";
import Carrousel from "./Carrousel.jsx";

function Home(props) {
  const { onSetSelect } = props;

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.all_users);
  const allInstructors = useSelector((state) => state.all_instructors);
  const allCohortes = useSelector((state) => state.all_cohortes);
  const allStudents = useSelector((state) => state.all_students);
  const allPms = useSelector((state) => state.all_pms);
  const allGroups = useSelector((state) => state.all_groups);
  const instructoresList = [];

  // useEffect(() => {
  //   dispatch(getAllCohortes());
  //   dispatch(getAllInstructors());
  //   dispatch(getAllStudents());
  // }, []);
  //LOS DISPATCHS SE HACEN DESDE APP AHORA

  let prueba = false;
  if (allCohortes.length > 0) {
    prueba = true;
  }
  if (allUsers.length > 0) {
    allUsers.map((alumno) => {
      if (alumno.instructor === true) {
        instructoresList.push(alumno);
      }
    });
  }

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
    gridContainer: {
      position: "fixed",
      overflow: "auto",
      top: "60px",
      left: "240px",
      maxWidth: "fit-content",
    },
  }));

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [idCohorte, setIdCohorte] = useState();
  const [nameCohorte, setNameCohorte] = useState();
  const [instr, setInstru] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [grupoDelCoho, setGrupoDelCoho] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveCohorte = (value) => {
    if (value.instructor === null) {
      setInstru("No tiene instructor");
    } else {
      setInstru(value.instructor.name);
    }
    setGrupoDelCoho(allGroups.filter((grupo) => grupo.cohorteId === value.id));
    setIdCohorte(value.id);
    setNameCohorte(value.name);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //RENDERISA SEGUN QUE PIDE EL USER
  if (onSetSelect === "Cohortes") {
    return (
      <Grid container className={classes.gridContainer}>
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
              <h3 className={classes.tabTitel}>COHORTES</h3>

              {prueba === false ? (
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
              <Cohorte
                users={allUsers}
                cohorte={allCohortes}
                cohorteName={nameCohorte}
                students={allStudents}
                idCohorte={idCohorte}
                instructor={instr}
                gruposDelCohorte={grupoDelCoho}
                allGroups={allGroups}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
  if (onSetSelect === "Instructores") {
    return (
      <div>
        <Grid container className={classes.gridContainer}>
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
                <h3 className={classes.tabTitel}>INSTRUCTORES</h3>
                {instructoresList.length === 0 ? (
                  <Tab label="No hay instructores" />
                ) : (
                  instructoresList.map((alumno, index) => {
                    let nombreCompleto = `${alumno.name} ${alumno.lastName}`;
                    return (
                      <Tab label={nombreCompleto} onClick={handleOpenModal} />
                    );
                  })
                )}
              </Tabs>
            </Grid>
            <Grid xs={10}>
              {instructoresList.map((alumno, index) => {
                return (
                  <Fragment>
                    <TabPanel value={value} index={index + 1}>
                      <Profile
                        user={alumno}
                        state={openModal}
                        close={handleCloseModal}
                      />
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
        <Grid container className={classes.gridContainer}>
          <Grid xs={12} container className={classes.tabPanel}>
            <AreaAdmin instructores={allInstructors} pms={allPms} />
          </Grid>
        </Grid>
      </div>
    );
  }
  if (onSetSelect === "Noticias") {
    return (
      <div>
        <Carrousel className={classes.gridContainer} />
      </div>
    );
  }
  if (onSetSelect === "Pair Programming") {
    return (
      <div>
        <Grid container className={classes.gridContainer}>
          <Grid xs={12} container className={classes.tabPanel}>
            {/* <PairProgramming users={allUsers} /> */}
              <PairProgramming/>
          </Grid>
        </Grid>
      </div>
    );
  }
  if (onSetSelect === "Mi cohorte") {
    return (
      <div>
        <Grid container className={classes.gridContainer}>
          <Grid xs={12} container className={classes.tabPanel}>
            <Mycohorte users={allUsers} />
          </Grid>
        </Grid>
      </div>
    );
  }

  return <div></div>;
}

export default Home;
