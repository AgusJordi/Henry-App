const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { User } = require("./db.js")
const routes = require("./routes/index.js");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
 
var db = require("./db.js");
 
console.log(db.User.name)


passport.use(new Strategy(
  {
  usernameField: 'email',
  passwordField: 'password'
  },
  function(username, password, done, info) {
    console.log('DBDBDBDBD', username, password )
    db.User.findOne({ where: {email: username}})
    
      .then(user => {
        if (!user) {
          console.log("NO ENCUENTRA EL USUARIO")
          return done(null, false);        }
        if (password !== user.password) {//comparar con contraseña
          console.log("NO PASA LA CONTRASEÑA")
          return done(null, false);
        }
         
        console.log("ENCUENTRA EL USUARIO", user.dataValues)
        return done(null, user.dataValues);
      })
      .catch(err => {
        return done(err);
      })
  }));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.User.findOne({ where: { id } })
      .then(user => {
        done(null, user.dataValues);
      })
      .catch(err => {
        return done(err);
      })
  });
  
  const server = express();
  
  server.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));

  server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log("Session! ", req.session);
  console.log("User!", req.user);
  next();
});


//server.use('/', ind)


server.post("/login", (req, res, next) => { 
  passport.authenticate("local", (err, user, info) => {
    if (err) { return next(err); }    
    if (!user) {
      return res.send(user);
      
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send(user)
    });
  })(req, res, next);
})

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.send(false);
  }
}

server.get("/logout", (req, res) => {
req.logout();
res.send("Ok!")
});


server.get("/login",
isAuthenticated,
(req, res) => {
res.send(req.user)
});

////////////////////END./ EXPRESS ////////////////


server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
