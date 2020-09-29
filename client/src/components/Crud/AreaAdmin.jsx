import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ModificarEliminarAlumno from "./ModificarEliminarAlumno.jsx";
import ModificarEliminarCohorte from "./ModificarEliminarCohorte.jsx";
import ModificarEliminarInstructorPm from "./ModificarEliminarInstructorPm.jsx";
import CrearCohorte from "./CrearCohorte.jsx";
import CrearGrupo from "./CrearGrupo.jsx";
import ModificarGrupo from "./ModificarGrupo"
import Box from "@material-ui/core/Box";
import "./AreaAdmin.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30vw",
    marginLeft: 300,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function AreaAdmin(props) {
  const classes = useStyles();

  return (
    <div className="principal">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ModificarEliminarAlumno />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Crear Cohorte</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CrearCohorte instructores={props.instructores} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Crear Grupos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CrearGrupo pms={props.pms} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Modificar Cohortes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ModificarEliminarCohorte />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Modificar Grupos
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ModificarGrupo />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AreaAdmin;
