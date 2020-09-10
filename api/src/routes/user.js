const server = require("express").Router();
const bcrypt = require("bcryptjs");

const { User } = require("../db.js");

server.post("/", (req, res, next) => {
  const {
    email,
    name,
    lastname,
    password,
    city,
    province,
    country,
    role,
  } = req.body;
  console.log(email, lastname, email, password);

  if (name && lastname && email && password) {
    bcrypt.genSalt(10, (err, hash) => {
      const newUser = {
        email: email,
        name: name,
        lastName: lastname,
        password: hash,
        role: role,
        city: city,
        province: province,
        country: country,
      };
      User.create(newUser)
        .then((user) => {
          console.log("ACA ESTA EL USER");
          console.log(user);
          return res.send(user);
        })
        .catch((error) => {
          //Mandamos el error al error endware
          next(error);
        });
    });
  } else {
    return res.send({ message: "Faltan campos obligatorios" });
  }
});

module.exports = server;
