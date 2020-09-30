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

  const admin = User.create({  //id: 2
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
  const instructor = User.create({ //id: 3
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
  const pm = User.create({ //id: 4
    "email": "pm@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Oliver",
    "lastName" : "Balfour",
    "admin": false,
    "status": "habilitado",
    "student": false,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013QUW30LF-7a68346d2bac-512"
  })
  const pmyalumno1 = User.create({ //id: 5
    "email": "pmyalumno1@gmail.com",
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
  const pmyalumno2 = User.create({ //id: 6
    "email": "pmyalumno2@gmail.com",
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
  const pmyalumno3 = User.create({ //id: 7
    "email": "pmyalumno3@gmail.com",
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
  const pmyalumno4 = User.create({ //id: 8
    "email": "pmyalumno4@gmail.com",
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
  const pmyalumno5 = User.create({ //id: 9
    "email": "pmyalumno5@gmail.com",
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
  const alum = User.create({ //id: 10
    "email": "student@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum2 = User.create({ //id: 11
    "email": "student2@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum3 = User.create({ //id: 12
    "email": "student3@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum4 = User.create({ //id: 13
    "email": "student4@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum5 = User.create({ //id: 14
    "email": "student5@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum6 = User.create({ //id: 15
    "email": "student6@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum7 = User.create({ //id: 16
    "email": "student7@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum8 = User.create({ //id: 17
    "email": "student8@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum9 = User.create({ //id: 18
    "email": "student9@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum10 = User.create({ //id: 19
    "email": "student10@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum11 = User.create({ //id: 20
    "email": "student11@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum12 = User.create({ //id: 21
    "email": "student12@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum13 = User.create({ //id: 22
    "email": "student13@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum14 = User.create({ //id: 23
    "email": "student14@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum15 = User.create({ //id: 24
    "email": "student15@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum16 = User.create({ //id: 25
    "email": "student16@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum17 = User.create({ //id: 26
    "email": "student17@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum18 = User.create({ //id: 27
    "email": "student18@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum19 = User.create({ //id: 28
    "email": "student19@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum20 = User.create({ //id: 29
    "email": "student20@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum21 = User.create({ //id: 30
    "email": "student21@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum22 = User.create({ //id: 31
    "email": "student22@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum23 = User.create({ //id: 32
    "email": "student23@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum24 = User.create({ //id: 33
    "email": "student24@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum25 = User.create({ //id: 34
    "email": "student25@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum26 = User.create({ //id: 35
    "email": "student26@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum27 = User.create({ //id: 36
    "email": "student27@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum28 = User.create({ //id: 37
    "email": "student28@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum29 = User.create({ //id: 38
    "email": "student29@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum30 = User.create({ //id: 39
    "email": "student30@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
  })
  const alum31 = User.create({ //id: 40
    "email": "student31@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum32 = User.create({ //id: 41
    "email": "student32@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum33 = User.create({ //id: 42
    "email": "student33@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum34 = User.create({ //id: 43
    "email": "student34@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum35 = User.create({ //id: 44
    "email": "student35@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum36 = User.create({ //id: 45
    "email": "student36@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum37 = User.create({ //id: 46
    "email": "student37@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum38 = User.create({ //id: 47
    "email": "student38@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum39 = User.create({ //id: 48
    "email": "student39@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum40 = User.create({ //id: 49
    "email": "student40@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
  })
  const alum41 = User.create({ //id: 50
    "email": "student41@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum42 = User.create({ //id: 51
    "email": "student42@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum43 = User.create({ //id: 52
    "email": "student43@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum44 = User.create({ //id: 53
    "email": "student44@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum45 = User.create({ //id: 54
    "email": "student45@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum46 = User.create({ //id: 55
    "email": "student46@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum47 = User.create({ //id: 56
    "email": "student47@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum48 = User.create({ //id: 57
    "email": "student48@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum49 = User.create({ //id: 58
    "email": "student49@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum50 = User.create({ //id: 59
    "email": "student50@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum51 = User.create({ //id: 60
    "email": "student51@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum52 = User.create({ //id: 61
    "email": "student52@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum53 = User.create({ //id: 62
    "email": "student53@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum54 = User.create({ //id: 63
    "email": "student54@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum55 = User.create({ //id: 64
    "email": "student55@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum56 = User.create({ //id: 65
    "email": "student56@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum57 = User.create({ //id: 66
    "email": "student57@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum58 = User.create({ //id: 67
    "email": "student58@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum59 = User.create({ //id: 68
    "email": "student59@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum60 = User.create({ //id: 69
    "email": "student60@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum61 = User.create({ //id: 70
    "email": "student61@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum62 = User.create({ //id: 71
    "email": "student62@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum63 = User.create({ //id: 72
    "email": "student63@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum64 = User.create({ //id: 73
    "email": "student64@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum65 = User.create({ //id: 74
    "email": "student65@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum66 = User.create({ //id: 75
    "email": "student66@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum67 = User.create({ //id: 76
    "email": "student67@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum68 = User.create({ //id: 77
    "email": "student68@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum69 = User.create({ //id: 78
    "email": "student69@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum70 = User.create({ //id: 79
    "email": "student70@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "It",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
})


server.post('/cohor', async (req, res) => {
  const cohorte1 = Cohorte.create({
    "date": "09-12-2020",
    "instructorId": 3
  })
  const cohorte2 = Cohorte.create({
    "date": "09-12-2020",
    "instructorId": 4
  })
});

///////////// CREAR GRUPOS //////////

 server.post('/gruposhard', async(req, res) => { //grupo 1 (cohorte1)
  const group1 = Group.create({
    // "name" : "HenryGroup01",
    "PM1Id": 4,
    "PM2Id": 5,
    "cohorteId": 1
  })

  const group2 = Group.create({
    // "name" : "HenryGroup01",
    "PM1Id": 6,
    "PM2Id": 7,
    "cohorteId": 2
  })

});


 //////// CREAR ESTUDIANTES
 server.post('/studentshard', async(req, res) => {

  const student1 =  Student.create({   
    "groupPP" : null, 
    "userId": 6,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student2 =  Student.create({   
    "groupPP" : null, 
    "userId": 7,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student3 =  Student.create({   
    "groupPP" : null, 
    "userId": 8,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student4 =  Student.create({   
    "groupPP" : null, 
    "userId": 9,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student5 =  Student.create({   
    "groupPP" : null, 
    "userId": 10,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student6 =  Student.create({   
    "groupPP" : null, 
    "userId": 11,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student7 =  Student.create({   
    "groupPP" : null, 
    "userId": 12,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student8 =  Student.create({   
    "groupPP" : null, 
    "userId": 13,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student9 =  Student.create({   
    "groupPP" : null, 
    "userId": 14,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student10 =  Student.create({   
    "groupPP" : null, 
    "userId": 15,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student11 =  Student.create({   
    "groupPP" : null, 
    "userId": 16,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student12 =  Student.create({   
    "groupPP" : null, 
    "userId": 17,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student13 =  Student.create({   
    "groupPP" : null, 
    "userId": 18,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student14 =  Student.create({   
    "groupPP" : null, 
    "userId": 19,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student15 =  Student.create({   
    "groupPP" : null, 
    "userId": 20,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student16 =  Student.create({   
    "groupPP" : null, 
    "userId": 21,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student17 =  Student.create({   
    "groupPP" : null, 
    "userId": 22,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student18 =  Student.create({   
    "groupPP" : null, 
    "userId": 23,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student19 =  Student.create({   
    "groupPP" : null, 
    "userId": 24,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student20 =  Student.create({   
    "groupPP" : null, 
    "userId": 25,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student21 =  Student.create({   
    "groupPP" : null, 
    "userId": 26,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student22 =  Student.create({   
    "groupPP" : null, 
    "userId": 27,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student23 =  Student.create({   
    "groupPP" : null, 
    "userId": 28,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student24 =  Student.create({   
    "groupPP" : null, 
    "userId": 29,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student25 =  Student.create({   
    "groupPP" : null, 
    "userId": 30,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student26 =  Student.create({   
    "groupPP" : null, 
    "userId": 31,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student27 =  Student.create({   
    "groupPP" : null, 
    "userId": 32,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student28 =  Student.create({   
    "groupPP" : null, 
    "userId": 33,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student29 =  Student.create({   
    "groupPP" : null, 
    "userId": 34,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student30 =  Student.create({   
    "groupPP" : null, 
    "userId": 35,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student31 =  Student.create({   
    "groupPP" : null, 
    "userId": 36,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student32 =  Student.create({   
    "groupPP" : null, 
    "userId": 37,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student33 =  Student.create({   
    "groupPP" : null, 
    "userId": 38,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student34 =  Student.create({   
    "groupPP" : null, 
    "userId": 39,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student35 =  Student.create({   
    "groupPP" : null, 
    "userId": 40,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student36 =  Student.create({   
    "groupPP" : null, 
    "userId": 41,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student37 =  Student.create({   
    "groupPP" : null, 
    "userId": 42,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student38 =  Student.create({   
    "groupPP" : null, 
    "userId": 43,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student39 =  Student.create({   
    "groupPP" : null, 
    "userId": 44,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student40 =  Student.create({   
    "groupPP" : null, 
    "userId": 45,    
    "cohorteId": 1,
    "groupId": 1
  })
  const student41 =  Student.create({   
    "groupPP" : null, 
    "userId": 46,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student42 =  Student.create({   
    "groupPP" : null, 
    "userId": 47,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student43 =  Student.create({   
    "groupPP" : null, 
    "userId": 48,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student44 =  Student.create({   
    "groupPP" : null, 
    "userId": 49,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student45 =  Student.create({   
    "groupPP" : null, 
    "userId": 50,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student46 =  Student.create({   
    "groupPP" : null, 
    "userId": 51,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student47 =  Student.create({   
    "groupPP" : null, 
    "userId": 52,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student48 =  Student.create({   
    "groupPP" : null, 
    "userId": 53,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student49 =  Student.create({   
    "groupPP" : null, 
    "userId": 54,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student50 =  Student.create({   
    "groupPP" : null, 
    "userId": 55,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student51 =  Student.create({   
    "groupPP" : null, 
    "userId": 56,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student52 =  Student.create({   
    "groupPP" : null, 
    "userId": 57,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student53 =  Student.create({   
    "groupPP" : null, 
    "userId": 58,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student54 =  Student.create({   
    "groupPP" : null, 
    "userId": 59,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student55 =  Student.create({   
    "groupPP" : null, 
    "userId": 60,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student56 =  Student.create({   
    "groupPP" : null, 
    "userId": 61,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student57 =  Student.create({   
    "groupPP" : null, 
    "userId": 62,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student58 =  Student.create({   
    "groupPP" : null, 
    "userId": 63,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student59 =  Student.create({   
    "groupPP" : null, 
    "userId": 64,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student60 =  Student.create({   
    "groupPP" : null, 
    "userId": 65,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student61 =  Student.create({   
    "groupPP" : null, 
    "userId": 66,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student62 =  Student.create({   
    "groupPP" : null, 
    "userId": 67,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student63 =  Student.create({   
    "groupPP" : null, 
    "userId": 68,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student64 =  Student.create({   
    "groupPP" : null, 
    "userId": 69,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student65 =  Student.create({   
    "groupPP" : null, 
    "userId": 70,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student66 =  Student.create({   
    "groupPP" : null, 
    "userId": 71,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student67 =  Student.create({   
    "groupPP" : null, 
    "userId": 72,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student68 =  Student.create({   
    "groupPP" : null, 
    "userId": 73,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student69 =  Student.create({   
    "groupPP" : null, 
    "userId": 74,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student70 =  Student.create({   
    "groupPP" : null, 
    "userId": 75,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student71 =  Student.create({   
    "groupPP" : null, 
    "userId": 76,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student72 =  Student.create({   
    "groupPP" : null, 
    "userId": 77,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student73 =  Student.create({   
    "groupPP" : null, 
    "userId": 78,    
    "cohorteId": 2,
    "groupId": 2
  })
  const student74 =  Student.create({   
    "groupPP" : null, 
    "userId": 79,    
    "cohorteId": 2,
    "groupId": 2
  })
});



// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});



module.exports = server;

