const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { User, Cohorte, Group, Student } = require("./db.js")
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
  function (username, password, done, info) {
    console.log('DBDBDBDBD', username, password)
    db.User.findOne({ where: { email: username } })

      .then(user => {
        if (!user) {
          console.log("NO ENCUENTRA EL USUARIO")
          return done(null, false);
        }
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


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
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
  if (req.isAuthenticated()) {
    next();
  }
  else {
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

server.post('/usuarios', async(req, res) => {
  const admin = User.create({  //id: 1
    "email": "admin@gmail.com",
    "password": 1234,
    "name": "admin",
    "lastName" : "Cofounder",
    "admin": true,
    "status": "habilitado",
    "student": false,
    "instructor": true
  })

  const instructor = User.create({ //id: 2
    "email": "instructor@gmail.com",
    "password": 1234,
    "name": "Emi",
    "lastName" : "Chequer",
    "admin": false,
    "status": "habilitado",
    "student": false,
    "instructor": true,
    "pm": true
  })

  const pm = User.create({ //id: 3
    "email": "pm@gmail.com",
    "password": 1234,
    "name": "Oliver",
    "lastName" : "Balfour",
    "admin": false,
    "status": "habilitado",
    "student": false,
    "instructor": true,
    "pm": true
  })
  
  const pmyalumno1 = User.create({ //id: 4
    "email": "pmyalumno@gmail.com",
    "password": 1234,
    "name": "Victoria",
    "lastName" : "Henry",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true
  })

  const pmyalumno2 = User.create({ //id: 5
    "email": "pmyalumno2@gmail.com",
    "password": 1234,
    "name": "Carlos",
    "lastName" : "Merge",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true
  })

  const pmyalumno3 = User.create({ //id: 6
    "email": "alpm@gmail.com",
    "password": 1234,
    "name": "Sergio",
    "lastName" : "Furrer",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true
  })

  const pmyalumno4 = User.create({ //id: 7
    "email": "dario1@gmail.com",
    "password": 1234,
    "name": "Dario",
    "lastName" : "Lotus",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true
  })

  const pmyalumno5 = User.create({ //id: 8
    "email": "clavedesol@gmail.com",
    "password": 1234,
    "name": "Soledad",
    "lastName" : "Solitaria",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true
  })


  const alum = User.create({ //id: 9
    "email": "student@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
  })

  const alum1 = User.create({ //id: 10
    "email": "student1@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false
  })

  const alum2 = User.create({ //id: 11
    "email": "student2@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false
  })

  const alum3 = User.create({ //id: 12
    "email": "student3@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false
  })

  const alum4 = User.create({ //id: 13
    "email": "student4@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false
  })

  const alum5 = User.create({ //id: 14
    "email": "student5@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false
  })


  const alum6 = User.create({ //id: 15
    "email": "student6@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false
  })

  const prueba1 = User.create({ //id: 16
    "email": "prueba1@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "inhabilitado",
    "student": true,
    "instructor": false
  })
  
  const prueba2 = User.create({ //id: 17
    "email": "prueba2@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "inhabilitado",
    "student": true,
    "instructor": false
  })
  
  const prueba3 = User.create({ //id: 18
    "email": "prueba3@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "inhabilitado",
    "student": true,
    "instructor": false
  })
  
  const prueba4 = User.create({ //id: 19
    "email": "prueba4@gmail.com",
    "password": 1234,
    "name": "Henrys",
    "lastName" : "It",
    "admin": false,
    "status": "inhabilitado",
    "student": true,
    "instructor": false
  })
  

})
server.post('/cohor', async (req, res) => {
  const cohorte1 = Cohorte.create({
    "date": "09-12-2020",
    "instructorId": 2
  })
  const cohorte2 = Cohorte.create({
    "date": "09-20-2020",
    "instructorId": 3
  })
})

///////////// CREAR GRUPOS //////////

server.post('/gruposhard', async(req, res) => { //grupo 1 (cohorte1)
  const group1 = Group.create({
    // "name" : "HenryGroup01",
    "PM1Id": 4,
    "PM2Id": 5,
    "cohorteId": 1
  })

  const group2 = Group.create({   //grupo 2 (cohorte2)
    // "name" : "HenryGroup02",
    "PM1Id": 6,
    "PM2Id": 7,
    "cohorteId": 2
  })

})


 //////// CREAR ESTUDIANTES
 server.post('/studentshard', async(req, res) => {

  const student1 = await Student.create({   
    "groupPP" : null,
    'userId': 9,    
    "cohorteId": 1,
    "groupId": 1,
  })
  
  const student2 = await Student.create({
    "groupPP" : null,
    'userId': 10,     
    "cohorteId": 1,
    "groupId": 1,
  })

  const student3 = await Student.create({
    "groupPP" : null,
    'userId': 11,     
    "cohorteId": 1,
    "groupId": 1,
  })
  const student4 = await Student.create({
    "groupPP" : null,
    'userId': 12,     
    "cohorteId": 1,
    "groupId": 1,
  })

  const student5 = await Student.create({
    "groupPP" : null,
    'userId': 13,    
    "cohorteId": 2,
    "groupId": 2,
  })

  const student6 = await Student.create({
    "groupPP" : null,
    'userId': 14,     
    "cohorteId": 2,
    "groupId": 2,
  })

  const student7 = await Student.create({
    "groupPP" : null,
    'userId': 15,     
    "cohorteId": 2,
    "groupId": 2,
  })
  const student8 = await Student.create({
    "groupPP" : null,
    'userId': 16,     
    "cohorteId": 2,
    "groupId": 2,
  })
  const student9 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 17,     
    "cohorteId": 2,
    "groupId": 2,     
  })
  const student10 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 18,     
    "cohorteId": 1,
    "groupId": 1,     
  })
  const student11 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 19,     
    "cohorteId": 1,
    "groupId": 1,     
  })
 })



// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});



module.exports = server;

