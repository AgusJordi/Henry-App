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
    "email": "jordi@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Jordi",
    "lastName" : "Rojas",
    "admin": true,
    "status": "habilitado",
    "student": false,
    "instructor": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012XHEL334-be04a56bf844-512"
  })
  const instructor = User.create({ //id: 3
    "email": "emi@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Emi",
    "lastName" : "Chequer",
    "admin": false,
    "status": "habilitado",
    "student": false,
    "instructor": true,
    "pm": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-UUA4ZMCG2-c61a24a585eb-512"
  })
  const pm = User.create({ //id: 4
    "email": "oliver@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Oliver",
    "lastName" : "Balfour",
    "admin": false,
    "status": "habilitado",
    "student": false,
    "instructor": true,
    "pm": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012S9RJLCW-3c25da77aea4-512"
  })
  const pmyalumno1 = User.create({ //id: 5
    "email": "maria@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Maria de la Paz",
    "lastName" : "Casaux",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013QUW30LF-7a68346d2bac-512"
  })
  const pmyalumno2 = User.create({ //id: 6
    "email": "victoria@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Victoria",
    "lastName" : "Cabrera",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013VRRUBEY-bf3ee53b678d-512"
  })
  const pmyalumno3 = User.create({ //id: 7
    "email": "elena@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Elena",
    "lastName" : "Gonzalez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U0131FACHDF-7abef214baa5-512"
  })
  const pmyalumno4 = User.create({ //id: 8
    "email": "fabio@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Fabio",
    "lastName" : "Argañaraz",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": true,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012PET99TM-6c7db22451f2-512"
  })
  const pmyalumno5 = User.create({ //id: 9
    "email": "jeremias@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Jeremias",
    "lastName" : "Koch",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "pm": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U0135283SLE-1ca181c531de-512"
  })
  const alum = User.create({ //id: 10
    "email": "cecilia@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Cecilia",
    "lastName" : "Hansen",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011K3U136W-df1e1f52e731-512"
  })
  const alum2 = User.create({ //id: 11
    "email": "cesar@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Cesar",
    "lastName" : "Sanchez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013NSZ7Q1E-f76976d9fdcd-512"
  })
  const alum3 = User.create({ //id: 12
    "email": "pablo@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Pablo",
    "lastName" : "Lezcano",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013BQ85MAM-3969751224b6-512"
  })
  const alum4 = User.create({ //id: 13
    "email": "matias@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Matias",
    "lastName" : "Ruiz",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012VHZAQKE-f2618f775991-512"
  })
  const alum5 = User.create({ //id: 14
    "email": "agustin@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Agustin",
    "lastName" : "Mineto",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U014KP3H2LT-c8f014ff3f29-512"
  })
  const alum6 = User.create({ //id: 15
    "email": "nicolas@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Nicolas",
    "lastName" : "Caillet",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U014LHNFWJE-9c4c5ee15558-512"
  })
  const alum7 = User.create({ //id: 16
    "email": "agustina1@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Agustina",
    "lastName" : "Grimaldi",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013C65N3EE-94afb08ee1d6-512"
  })
  const alum8 = User.create({ //id: 17
    "email": "agustinar8@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Agustina",
    "lastName" : "Rojas",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U014KC3PY00-c5328ab77031-512"
  })
  const alum9 = User.create({ //id: 18
    "email": "albertop@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Alberto",
    "lastName" : "Popelka",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013VQCMMAL-2193590cb116-512"
  })
  const alum10 = User.create({ //id: 19
    "email": "carlosm@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "carlos",
    "lastName" : "Miceli",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U01513R8QJG-41c2803c58e2-512"
  })
  const alum11 = User.create({ //id: 20
    "email": "ignaciov@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Ignacio",
    "lastName" : "Videla",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U0130JM3KDF-3b335607a188-512"
  })
  const alum12 = User.create({ //id: 21
    "email": "gustavoa@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Gustavo",
    "lastName" : "Altamiranda",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum13 = User.create({ //id: 22
    "email": "amancay@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Amancay",
    "lastName" : "Ceresola",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013EDDRPNC-7d1c2bb62999-512"
  })
  const alum14 = User.create({ //id: 23
    "email": "andrea1@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Andrea",
    "lastName" : "Zomoza",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-UU9U603R8-5cdfe7e4e4ab-512"
  })
  const alum15 = User.create({ //id: 24
    "email": "angelo@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Angelo",
    "lastName" : "Sedler",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013YTA4WTE-c9ef779cae2f-512"
  })
  const alum16 = User.create({ //id: 25
    "email": "ariel@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Ariel",
    "lastName" : "Penna",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013FEMH5T3-014aeceb9ca3-512"
  })
  const alum17 = User.create({ //id: 26
    "email": "arielr@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Ariel",
    "lastName" : "Tecay",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013VJQG7DK-68eb7e2fb7a8-512"
  })
  const alum18 = User.create({ //id: 27
    "email": "ayelen@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Ayelen",
    "lastName" : "Villaruel",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013X87Q685-0870d54eb7f7-512"
  })
  const alum19 = User.create({ //id: 28
    "email": "bautista@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Bautista",
    "lastName" : "Di Benedetto",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013JDJ8PL2-ee6de7c95dbe-512"
  })
  const alum20 = User.create({ //id: 29
    "email": "carlosj@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Carlos",
    "lastName" : "Hernandez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U014KJH4MDG-d4f5886cd927-512"
  })
  const alum21 = User.create({ //id: 30
    "email": "claudio@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Claudio",
    "lastName" : "Martinez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012X1JF0D8-15c80ca0f511-512"
  })
  const alum22 = User.create({ //id: 31
    "email": "cristobal@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Cristobal",
    "lastName" : "Carrasco",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011W62UJBE-20bc1a94ac81-512"
  })
  const alum23 = User.create({ //id: 32
    "email": "danielag@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Daniela",
    "lastName" : "Gomez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U0144Q9FB4P-5dbc6af60a4f-512"
  })
  const alum24 = User.create({ //id: 33
    "email": "dario@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Dario",
    "lastName" : "Nuñez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013QSGRRLY-18e99c1d97b5-512"
  })
  const alum25 = User.create({ //id: 34
    "email": "dayamar@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Dayamar",
    "lastName" : "Martinez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011Q3ZAL81-654487c3bb55-512"
  })
  const alum26 = User.create({ //id: 35
    "email": "emilianoc@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Emiliano",
    "lastName" : "Cobelas",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013JRY7FJR-38ae61b530ad-512"
  })
  const alum27 = User.create({ //id: 36
    "email": "ezequield@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Ezequiel",
    "lastName" : "Diaz",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011H1G2YNA-6bd38c2600c6-512"
  })
  const alum28 = User.create({ //id: 37
    "email": "facundo@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Facundo",
    "lastName" : "Uriona",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013BPV50BH-6e811ee673a5-512"
  })
  const alum29 = User.create({ //id: 38
    "email": "facundor@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Facundo",
    "lastName" : "Rivadero",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013P3WT99C-da3702fd4214-512"
  })
  const alum30 = User.create({ //id: 39
    "email": "facundos@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Facundo",
    "lastName" : "Sadava",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013CV5ULJ2-0e9f5db0e9bc-512"
  })
  const alum31 = User.create({ //id: 40
    "email": "federico@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Federico",
    "lastName" : "Uanini",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012RUHQQKZ-e5deb197ab0d-512"
  })
  const alum32 = User.create({ //id: 41
    "email": "fernandoc@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Fernando",
    "lastName" : "Checchi",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012VPUQSLS-4cc69d78afdc-512"
  })
  const alum33 = User.create({ //id: 42
    "email": "flamencip@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Pablo",
    "lastName" : "Flamenci",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013U35CX6U-89c1b57f5155-512"
  })
  const alum34 = User.create({ //id: 43
    "email": "armandog@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Armando",
    "lastName" : "Guerrero",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U019R0Z6SA3-5d1e9db88a15-512"
  })
  const alum35 = User.create({ //id: 44
    "email": "emiliac@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Emilia",
    "lastName" : "Cabral",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U016Y10NYCR-e181dad2ac49-512"
  })
  const alum36 = User.create({ //id: 45
    "email": "chantal@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Kelm",
    "lastName" : "Chantal",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011P408S5B-baf60164028e-512"
  })
  const alum37 = User.create({ //id: 46
    "email": "chris@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Christian",
    "lastName" : "Manzaraz",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U0125KD1JAU-4c99efe320b3-512"
  })
  const alum38 = User.create({ //id: 47
    "email": "ciro@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Ciro",
    "lastName" : "Escola",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U019R8CB9SA-28e48e149a3c-512"
  })
  const alum39 = User.create({ //id: 48
    "email": "clara@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Clara",
    "lastName" : "Sanchez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011ZPYLWE4-b97b7e1eb824-512"
  })
  const alum40 = User.create({ //id: 49
    "email": "clau@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Claudio",
    "lastName" : "Romano",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U0140MCPXN1-561590012747-512"
  })
  const alum41 = User.create({ //id: 50
    "email": "ema@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Emanuel",
    "lastName" : "Sarco",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011PLQM525-f2ae7778f389-512"
  })
  const alum42 = User.create({ //id: 51
    "email": "Eric@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Eric",
    "lastName" : "Gomez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum43 = User.create({ //id: 52
    "email": "lean@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Leandro",
    "lastName" : "Alvarez",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U014ARXQS3S-35c4fb1ffac1-512"
  })
  const alum44 = User.create({ //id: 53
    "email": "Lara@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Lara",
    "lastName" : "Pontura",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013JE471E1-6558055cf06b-512"
  })
  const alum45 = User.create({ //id: 54
    "email": "leo@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Leonardo",
    "lastName" : "Rufino",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013NFUQVJ6-3fea6ec8458c-512"
  })
  const alum46 = User.create({ //id: 55
    "email": "lucas@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Lucas",
    "lastName" : "Casco",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U0120RZHU2C-8dfdc0c93cd0-512"
  })
  const alum47 = User.create({ //id: 56
    "email": "lucca@gmail.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Lucca",
    "lastName" : "Lipisky",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U011KHP9329-3ba91e47f3cf-512"
  })
  const alum48 = User.create({ //id: 57
    "email": "lucia@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Lucia",
    "lastName" : "Gentile",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012W7S0WD9-b513a9cb3d26-512"
  })
  const alum49 = User.create({ //id: 58
    "email": "jcheruse@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Julieta",
    "lastName" : "Cheruse",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U017N403LS0-bdfc4b9e82d5-512"
  })
  const alum50 = User.create({ //id: 59
    "email": "lucianoc@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Luciano",
    "lastName" : "Castet",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013PGY52HG-ge53e97eabb7-512"
  })
  const alum51 = User.create({ //id: 60
    "email": "luisd@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Luis",
    "lastName" : "D'Amico",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012S86RYG6-2e4c8bc6fc19-512"
  })
  const alum52 = User.create({ //id: 61
    "email": "luisj@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Luis",
    "lastName" : "Jacobi",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012WFJCY13-121fcc0d41b2-512"
  })
  const alum53 = User.create({ //id: 62
    "email": "mjc@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "M Angel",
    "lastName" : "JC",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U01450J2MN3-19e45080a974-512"
  })
  const alum54 = User.create({ //id: 63
    "email": "marc@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Marcelo",
    "lastName" : "Britos",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012MSDFRE1-52bf40b31140-512"
  })
  const alum55 = User.create({ //id: 64
    "email": "valle@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Marcelo",
    "lastName" : "Del Valle",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012WQM9MM3-7747935eefe5-512"
  })
  const alum56 = User.create({ //id: 65
    "email": "aliaga@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Marcelo",
    "lastName" : "Aliaga",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013FLK5FRR-baabcf4e4132-512"
  })
  const alum57 = User.create({ //id: 66
    "email": "marcc@henryapp.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Marcelo",
    "lastName" : "Campana",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U013KGK3KM1-305fde5fada3-512"
  })
  const alum58 = User.create({ //id: 67
    "email": "piccato@soyhenry.com",
    "password": passwordInit,
    "salt": salt,
    "name": "Martin",
    "lastName" : "Piccato",
    "admin": false,
    "status": "habilitado",
    "student": true,
    "instructor": false,
    "image": "https://ca.slack-edge.com/TPRS7H4PN-U012NQNUUCT-be4f10a7fbc7-512"
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
    "PM1Id": 5,
    "PM2Id": 6,
    "cohorteId": 1
  })

  const group2 = Group.create({
    // "name" : "HenryGroup01",
    "PM1Id": 7,
    "PM2Id": 8,
    "cohorteId": 1
  })

  const group3 = Group.create({
    // "name" : "HenryGroup01",
    "PM1Id": 5,
    "PM2Id": 6,
    "cohorteId": 2
  })

  const group4 = Group.create({
    // "name" : "HenryGroup01",
    "PM1Id": 7,
    "PM2Id": 8,
    "cohorteId": 2
  })

});


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
    "cohorteId": 1,
    "groupId": 1,
  })

  const student6 = await Student.create({
    "groupPP" : null,
    'userId': 14,     
    "cohorteId": 1,
    "groupId": 1,
  })

  const student7 = await Student.create({
    "groupPP" : null,
    'userId': 15,     
    "cohorteId": 1,
    "groupId": 1,
  })
  const student8 = await Student.create({
    "groupPP" : null,
    'userId': 16,     
    "cohorteId": 1,
    "groupId": 1,
  })
  const student9 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 17,     
    "cohorteId": 1,
    "groupId": 1,     
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
  const student12 = await Student.create({   
    "groupPP" : null,
    'userId': 20,    
    "cohorteId": 1,
    "groupId": 1,
  })
  
  const student13 = await Student.create({
    "groupPP" : null,
    'userId': 21,     
    "cohorteId": 1,
    "groupId": 1,
  })

  const student14 = await Student.create({
    "groupPP" : null,
    'userId': 22,     
    "cohorteId": 1,
    "groupId": 1,
  })
  const student15 = await Student.create({
    "groupPP" : null,
    'userId': 23,     
    "cohorteId": 1,
    "groupId": 1,
  })

  const student16 = await Student.create({
    "groupPP" : null,
    'userId': 24,    
    "cohorteId": 1,
    "groupId": 1,
  })

  const student17 = await Student.create({
    "groupPP" : null,
    'userId': 25,     
    "cohorteId": 1,
    "groupId": 1,
  })

  const student18 = await Student.create({
    "groupPP" : null,
    'userId': 26,     
    "cohorteId": 1,
    "groupId": 1,
  })
  const student19 = await Student.create({
    "groupPP" : null,
    'userId': 27,     
    "cohorteId": 1,
    "groupId": 1,
  })
  const student20 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 28,     
    "cohorteId": 1,
    "groupId": 1,     
  })
  const student21 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 29,     
    "cohorteId": 1,
    "groupId": 2,     
  })
  const student22 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 30,     
    "cohorteId": 1,
    "groupId": 2,     
  })
  const student23 = await Student.create({   
    "groupPP" : null,
    'userId': 31,    
    "cohorteId": 1,
    "groupId": 2,
  })
  
  const student24 = await Student.create({
    "groupPP" : null,
    'userId': 32,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student25 = await Student.create({
    "groupPP" : null,
    'userId': 33,     
    "cohorteId": 1,
    "groupId": 2,
  })
  const student26 = await Student.create({
    "groupPP" : null,
    'userId': 34,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student27 = await Student.create({
    "groupPP" : null,
    'userId': 35,    
    "cohorteId": 1,
    "groupId": 2,
  })

  const student28 = await Student.create({
    "groupPP" : null,
    'userId': 36,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student29 = await Student.create({
    "groupPP" : null,
    'userId': 37,     
    "cohorteId": 1,
    "groupId": 2,
  })
  const student30 = await Student.create({
    "groupPP" : null,
    'userId': 38,     
    "cohorteId": 1,
    "groupId": 2,
  })
  const student31 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 39,     
    "cohorteId": 1,
    "groupId": 2,     
  })
  const student32 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 40,     
    "cohorteId": 1,
    "groupId": 2,     
  })
  const student33 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 41,     
    "cohorteId": 1,
    "groupId": 2,     
  })
  const student34 = await Student.create({   
    "groupPP" : null,
    'userId': 42,    
    "cohorteId": 1,
    "groupId": 2,
  })
  
  const student35 = await Student.create({
    "groupPP" : null,
    'userId': 43,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student36 = await Student.create({
    "groupPP" : null,
    'userId': 44,     
    "cohorteId": 1,
    "groupId": 2,
  })
  const student37 = await Student.create({
    "groupPP" : null,
    'userId': 45,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student38 = await Student.create({
    "groupPP" : null,
    'userId': 46,    
    "cohorteId": 1,
    "groupId": 2,
  })

  const student39 = await Student.create({
    "groupPP" : null,
    'userId': 47,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student40 = await Student.create({
    "groupPP" : null,
    'userId': 48,     
    "cohorteId": 2,
    "groupId": 3,
  })
  const student41 = await Student.create({
    "groupPP" : null,
    'userId': 49,     
    "cohorteId": 2,
    "groupId": 3,
  })
  const student42 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 50,     
    "cohorteId": 2,
    "groupId": 3,     
  })
  const student43 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 51,     
    "cohorteId": 2,
    "groupId": 3,     
  })
  const student44 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 52,     
    "cohorteId": 2,
    "groupId": 3,     
  })
  const student45 = await Student.create({   
    "groupPP" : null,
    'userId': 53,    
    "cohorteId": 2,
    "groupId": 3,
  })
  
  const student46 = await Student.create({
    "groupPP" : null,
    'userId': 54,     
    "cohorteId": 2,
    "groupId": 3,
  })

  const student47 = await Student.create({
    "groupPP" : null,
    'userId': 55,     
    "cohorteId": 2,
    "groupId": 3,
  })
  const student48 = await Student.create({
    "groupPP" : null,
    'userId': 56,     
    "cohorteId": 2,
    "groupId": 3,
  })

  const student49 = await Student.create({
    "groupPP" : null,
    'userId': 57,    
    "cohorteId": 2,
    "groupId": 3,
  })

  const student50 = await Student.create({
    "groupPP" : null,
    'userId': 58,     
    "cohorteId": 2,
    "groupId": 3,
  })

  const student51 = await Student.create({
    "groupPP" : null,
    'userId': 59,     
    "cohorteId": 2,
    "groupId": 3,
  })
  const student52 = await Student.create({
    "groupPP" : null,
    'userId': 60,     
    "cohorteId": 2,
    "groupId": 3,
  })
  const student53 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 61,     
    "cohorteId": 2,
    "groupId": 3,     
  })
  const student54 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 62,     
    "cohorteId": 2,
    "groupId": 3,     
  })
  const student55 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 63,     
    "cohorteId": 2,
    "groupId": 3,     
  })
  const student56 = await Student.create({   
    "groupPP" : null,
    'userId': 64,    
    "cohorteId": 2,
    "groupId": 3,
  })
  
  const student57 = await Student.create({
    "groupPP" : null,
    'userId': 65,     
    "cohorteId": 2,
    "groupId": 3,
  })

  const student58 = await Student.create({
    "groupPP" : null,
    'userId': 66,     
    "cohorteId": 2,
    "groupId": 3,
  })
  const student59 = await Student.create({
    "groupPP" : null,
    'userId': 67,     
    "cohorteId": 2,
    "groupId": 3,
  })

  const student60 = await Student.create({
    "groupPP" : null,
    'userId': 68,    
    "cohorteId": 2,
    "groupId": 4,
  })

  const student61 = await Student.create({
    "groupPP" : null,
    'userId': 69,     
    "cohorteId": 2,
    "groupId": 4,
  })

  const student62 = await Student.create({
    "groupPP" : null,
    'userId': 70,     
    "cohorteId": 2,
    "groupId": 4,
  })
  const student63 = await Student.create({
    "groupPP" : null,
    'userId': 71,     
    "cohorteId": 2,
    "groupId": 4,
  })
  const student64 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 72,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student65 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 73,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student66 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 73,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student67 = await Student.create({   
    "groupPP" : null,
    'userId': 74,    
    "cohorteId": 2,
    "groupId": 4,
  })
  
  const student68 = await Student.create({
    "groupPP" : null,
    'userId': 75,     
    "cohorteId": 2,
    "groupId": 4,
  })

  const student69 = await Student.create({
    "groupPP" : null,
    'userId': 76,     
    "cohorteId": 2,
    "groupId": 4,
  })
  const student70 = await Student.create({
    "groupPP" : null,
    'userId': 77,     
    "cohorteId": 2,
    "groupId": 4,
  })

  const student71 = await Student.create({
    "groupPP" : null,
    'userId': 78,    
    "cohorteId": 2,
    "groupId": 4,
  })

  const student72 = await Student.create({
    "groupPP" : null,
    'userId': 79,     
    "cohorteId": 2,
    "groupId": 4,
  })

  const student73 = await Student.create({
    "groupPP" : null,
    'userId': 80,     
    "cohorteId": 2,
    "groupId": 4,
  })
  const student74 = await Student.create({
    "groupPP" : null,
    'userId': 81,     
    "cohorteId": 2,
    "groupId": 4,
  })
  const student75 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 81,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student76 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 82,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student77 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 83,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student78 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 84,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student79 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 85,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student80 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 86,     
    "cohorteId": 2,
    "groupId": 4,     
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

