import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../images/henry-logo.png";
import RenderHome from "./renderHome";
import Carrousel from "./Carrousel.jsx";
import {setearUsuarios, setearCohorte, setearGroups, setearStudents} from "../actions/index"





const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  appBar: {
    zIndex: theme.zIndex.drawer - 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: "white",
    backgroundColor: "black",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  img: {
    width: "150px",
    height: "40px",
    margin: "30px",
  },
}));

export default function ClippedDrawer(user, props) {

  const creationUser = (e) => {
    setearUsuarios();
} 
  const creationCohorte = (e) => {
    setearCohorte()
}  
  const creationGroups = (e) => {
    setearGroups()
}
  const creationStudents = (e) => {
    setearStudents()
}


  const classes = useStyles();

  console.log('PROPS del SIDEBAR', user.user.name)

  

  //INTENTO
  const [click, setClick] = useState(false);
  const [buttonSet, setButtonSet] = useState("");
  const onClickSelect = (buttonSelect) => {
    setButtonSet(buttonSelect.text);
    setClick(true);
  };
  const onClickOff = () => {
    setClick(false);
  };

  return (
    <div className={classes.root}>
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}></AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <img className={classes.img} src={logo} alt="" />
        <Toolbar />
        <div className={classes.drawerContainer}>

        {user.user && user.user.student &&( 
        
          <List>
            {[
              //"Herramientas",
              "Noticias",
              "Mi cohorte",
              //"Cohortes",
              //"Instructores",
              "Pair Programming",
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText
                  primary={text}
                  onClick={() => onClickSelect({ text })}
                />
              </ListItem>
              
            ))}
          </List>
          )}
           {user.user && user.user.admin &&(
         <List>
          {[
            "Herramientas",
            "Noticias",
            "Cohortes",
            "Instructores",
            // "Mi cohorte",
            // "Pair Programming",             
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText
                primary={text}
                onClick={() => onClickSelect({ text })}
              />
             
            </ListItem>
            
          ))}
          
          <ListItem>
            <ListItemText>
               <Link onClick={creationUser} style={{ textDecoration: 'none' }} to="/">
               <p>
                 CARGA USUARIOS
                 </p>
              </Link>
              <Link onClick={creationCohorte} style={{ textDecoration: 'none' }} to="/">
              <p>
                 CARGA COHORTES
                 </p>
              </Link> 
              <Link onClick={creationGroups} style={{ textDecoration: 'none' }} to="/">
              <p>
                 CARGA GRUPOS
                 </p>
              </Link> 
              <Link onClick={creationStudents} style={{ textDecoration: 'none' }} to="/">
              <p>
                 CARGA ESTUDIANTES
                 </p>
              </Link> 
            </ListItemText>
          </ListItem>           
          </List>

            )}   
              
          <Divider />
            
          
        </div>
      </Drawer>
      {click ? <RenderHome onSetSelect={buttonSet} /> : <Carrousel />}
    </div>
  );
}
