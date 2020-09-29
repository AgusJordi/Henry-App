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
const crypto = require('crypto');

const crypto2 = require('crypto');


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
        const passwordKey = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64');
      if (passwordKey !== user.password) {
        return done(null, false, { status: 'error', message: 'Contraseña incorrecta' });
      }
      //Esta es la funcion que va a mantener la sesion en la cookie, para poder usarlo en la app
      return done(null, user.dataValues, { status: 'ok' });
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
  const pass = '1234'
  const salt = crypto.randomBytes(64).toString('hex');
  const passwordInit = crypto.pbkdf2Sync(pass, salt, 10000, 64, 'sha512').toString('base64');

  const admin = User.create({  //id: 1
    "email": "admin@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "admin",
    "lastName" : "Cofounder",
    "admin": true,
    "status": "habilitado",
    "student": false,
    "instructor": true,
    "image": "https://img2.freepng.es/20190706/hpx/kisspng-portable-network-graphics-computer-icons-system-ad-system-administration-database-administrator-png-5d206ab0b91e91.7890932215624055527583.jpg"

    
  })

  const instructor = User.create({ //id: 2
    "email": "instructor@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Emi",
    "lastName" : "Chequer",
    "admin": false,
    "status": "habilitado",
    "student": false,
    "instructor": true,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-UUA4ZMCG2-c61a24a585eb-512"
  })

  const pm = User.create({ //id: 3
    "email": "pm@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Oliver",
    "lastName" : "Balfour",
    "admin": false,
    "status": "habilitado",
    "student": false,
    "instructor": true,
    "pm": true,
    "image": ""
  })
  
  const pmyalumno1 = User.create({ //id: 4
    "email": "pmyalumno@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Maria de la Paz",
    "lastName" : "Casux",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013QUW30LF-7a68346d2bac-512"
  })

  const pmyalumno2 = User.create({ //id: 5
    "email": "pmyalumno2@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Agustina",
    "lastName" : "Grimaldi",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013C65N3EE-94afb08ee1d6-512"
  })

  const pmyalumno3 = User.create({ //id: 6
    "email": "alpm@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Franco",
    "lastName" : "Rivadero",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013P3WT99C-da3702fd4214-512"
  })

  const pmyalumno4 = User.create({ //id: 7
    "email": "dario1@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Lucia",
    "lastName" : "Gentile",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012W7S0WD9-b513a9cb3d26-512"
  })

  const pmyalumno5 = User.create({ //id: 8
    "email": "clavedesol@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Pamela",
    "lastName" : "Guevara",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011NN4710T-5fb3dc24edcb-512"
  })


  const alum = User.create({ //id: 9
    "email": "student@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "Cheruse",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })

  const alum1 = User.create({ //id: 10
    "email": "student1@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Santiago",
    "lastName" : "Calisaya",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U01BEBXDZCJ-cd3f4f89186a-512"
  })

  const alum2 = User.create({ //id: 11
    "email": "student2@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Lautaro",
    "lastName" : "Viscovi",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011PFSHT5Z-3d88007c066e-512"
  })

  const alum3 = User.create({ //id: 12
    "email": "student3@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Rodrigo",
    "lastName" : "Blanca",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U01B61MBSES-a32ccae237ec-512"
  })

  const alum4 = User.create({ //id: 13
    "email": "student4@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Elizer",
    "lastName" : "Zalazar",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U01B2F8BZ7G-c04270f308a9-512"
  })

  const alum5 = User.create({ //id: 14
    "email": "student5@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Pedro",
    "lastName" : "Canoero",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false
  })


  const alum6 = User.create({ //id: 15
    "email": "student6@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Carlos",
    "lastName" : "Garcia",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false
  })

  const prueba1 = User.create({ //id: 16
    "email": "prueba1@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Pablo",
    "lastName" : "Escobar",
    "admin": false,
    "status": "inhabilitado",
    "student": true,
    "instructor": false
  })
  
  const prueba2 = User.create({ //id: 17
    "email": "prueba2@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Sandra",
    "lastName" : "Willdes",
    "admin": false,
    "status": "inhabilitado",
    "student": true,
    "instructor": false
  })
  
  const prueba3 = User.create({ //id: 18
    "email": "prueba3@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Lionel",
    "lastName" : "Messi",
    "admin": false,
    "status": "inhabilitado",
    "student": true,
    "instructor": false
  })
  
  const prueba4 = User.create({ //id: 19
    "email": "prueba4@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Marco",
    "lastName" : "Lazo",
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

