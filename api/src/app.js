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
    "groupId": 2,     
  })
  const student12 = await Student.create({   
    "groupPP" : null,
    'userId': 20,    
    "cohorteId": 1,
    "groupId": 2,
  })
  
  const student13 = await Student.create({
    "groupPP" : null,
    'userId': 21,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student14 = await Student.create({
    "groupPP" : null,
    'userId': 22,     
    "cohorteId": 1,
    "groupId": 2,
  })
  const student15 = await Student.create({
    "groupPP" : null,
    'userId': 23,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student16 = await Student.create({
    "groupPP" : null,
    'userId': 24,    
    "cohorteId": 1,
    "groupId": 2,
  })

  const student17 = await Student.create({
    "groupPP" : null,
    'userId': 25,     
    "cohorteId": 1,
    "groupId": 2,
  })

  const student18 = await Student.create({
    "groupPP" : null,
    'userId': 26,     
    "cohorteId": 1,
    "groupId": 2,
  })
  const student19 = await Student.create({
    "groupPP" : null,
    'userId': 27,     
    "cohorteId": 1,
    "groupId": 2,
  })
  const student20 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 28,     
    "cohorteId": 1,
    "groupId": 2,     
  })
  const student21 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 29,     
    "cohorteId": 2,
    "groupId": 3,     
  })
  const student22 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 30,     
    "cohorteId": 2,
    "groupId": 3,     
  })
  const student23 = await Student.create({   
    "groupPP" : null,
    'userId': 31,    
    "cohorteId": 2,
    "groupId": 3,
  })
  
  const student24 = await Student.create({
    "groupPP" : null,
    'userId': 32,     
    "cohorteId": 2,
    "groupId": 3,
  })

  const student25 = await Student.create({
    "groupPP" : null,
    'userId': 33,     
    "cohorteId": 2,
    "groupId": 3,
  })
  const student26 = await Student.create({
    "groupPP" : null,
    'userId': 34,     
    "cohorteId": 2,
    "groupId": 3,
  })

  const student27 = await Student.create({
    "groupPP" : null,
    'userId': 35,    
    "cohorteId": 2,
    "groupId": 3,
  })

  const student28 = await Student.create({
    "groupPP" : null,
    'userId': 36,     
    "cohorteId": 2,
    "groupId": 3,
  })

  const student29 = await Student.create({
    "groupPP" : null,
    'userId': 37,     
    "cohorteId": 2,
    "groupId": 3,
  })
  const student30 = await Student.create({
    "groupPP" : null,
    'userId': 38,     
    "cohorteId": 2,
    "groupId": 4,
  })
  const student31 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 39,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student32 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 40,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student33 = await Student.create({ //vicky
    "groupPP" : null,
    'userId': 41,     
    "cohorteId": 2,
    "groupId": 4,     
  })
  const student34 = await Student.create({   
    "groupPP" : null,
    'userId': 42,    
    "cohorteId": 2,
    "groupId": 4,
  })
  
  const student35 = await Student.create({
    "groupPP" : null,
    'userId': 43,     
    "cohorteId": 2,
    "groupId": 4,
  })

  const student36 = await Student.create({
    "groupPP" : null,
    'userId': 44,     
    "cohorteId": 2,
    "groupId": 4,
  })
  const student37 = await Student.create({
    "groupPP" : null,
    'userId': 45,     
    "cohorteId": 2,
    "groupId": 4,
  })

  const student38 = await Student.create({
    "groupPP" : null,
    'userId': 46,    
    "cohorteId": 2,
    "groupId": 4,
  })

  const student39 = await Student.create({
    "groupPP" : null,
    'userId': 47,     
    "cohorteId": 2,
    "groupId": 4,
  })

  const student40 = await Student.create({
    "groupPP" : null,
    'userId': 48,     
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

