const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const routes = require("./routes/index.js");

require("./db.js");

const { User } = require("./db.js");

const server = express();

server.name = "API";

//Estrategia LOCAL Passport
passport.use(
  new Strategy({ usernameField: "email", passwordField: "password" }, function (
    username,
    password,
    done
  ) {
    //Buscamos si existe el usuario
    User.findOne({ where: { email: username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Usuario/Password Invalido" });
        }
        //Comparamos si password es igual
        bcrypt.compare(password, user.password).then((res) => {
          if (res) {
            return done(null, user);
          }
          return done(null, false, { message: "Usuario/Password Invalido" });
        });
      })
      .catch((err) => {
        return done(err);
      });
  })
);

//Serialize y deserialize

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ where: { id: id } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

//CORS
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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
  next();
});

server.use(
  session({
    secret: "top secret",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use((req, res, next) => {
  next();
});

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
