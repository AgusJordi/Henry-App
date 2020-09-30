const server = require("express").Router();
const bcrypt = require("bcryptjs");
const mailer = require("../../templates/Registro.js");
const mailerPW = require("../../templates/RequestPassword.js");
const crypto = require("crypto");

const { User, Student, Cohorte } = require("../db.js");

//Rutar obtener todos los usuarios

server.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      if (users && users.length === 0) {
        return res.send({ message: "No hay usuarios" });
      }
      res.send(users);
    })
    .catch((err) => next(err));
});

server.get("/usandSt/:id", (req, res, next) => {
  console.log('', req.params.id)

  User.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Student,
        as: "Student",
        attributes: ["cohorteId"],
      },
      {
        model: Cohorte,
        as: "Name Cohorte",
        attributes: ["name"],
      },
    ],
  })
    .then((user) => {
      console.log(user);
      if (user && user.length === 0) {
        return res.send({ message: "No hay usuarios" });
      }
      res.send(user);
    })
    .catch((err) => next(err));
});

//Ruta para obtener los users q sean instructores
server.get("/instructor", (req, res, next) => {
  User.findAll({
    order: [["id", "ASC"]],
    where: {
      instructor: true,
    },
  })
    .then((inst) => {
      res.send(inst);
    })
    .catch(next);
});

//Ruta para obtener los users q sean pm's
server.get("/pms", (req, res, next) => {
  User.findAll({
    where: {
      pm: true,
    },
  })
    .then((pm) => {
      res.send(pm);
    })
    .catch(next);
});

//Ruta para crear usuario y alumno solo con mail de forma masiva.
server.post("/add", (req, res, next) => {
  let { name, date, instructorId } = req.body.cohorte;
  var mails = req.body.emails;
  console.log("BODY POST MASS", req.body);
  if (instructorId === "") {
    instructorId = 1;
  }
  console.log(instructorId);
  Cohorte.create({ name, date, instructorId }).then((cohorte) => {
    for (var i = 0; i < mails.length; i++) {
      User.create({
        email: mails[i],
      }).then((user) => {
        console.log(user);
        mailer.enviar_mail("Henry", user.dataValues.email);
        Student.create({
          userId: user.dataValues.id,
          cohorteId: cohorte.dataValues.id,
        });
      });
    }
  });

  res.send("Se creó usuario y alumno");
});

//Ruta crear usuario
server.post("/", (req, res, next) => {
  const salt = crypto.randomBytes(64).toString("hex");
  const password = crypto
    .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
    .toString("base64");
  const {
    email,
    name,
    lastname,
    city,
    province,
    country,
    role,
    admin,
    status,
    student,
    image,
    instructor,
    pm,
  } = req.body;
  console.log(email, lastname, email, password);

  if (name && lastname && email) {
    const newUser = {
      email: email,
      name: name,
      lastName: lastname,
      password: password,
      role: role,
      city: city,
      province: province,
      country: country,
      admin: admin,
      status: status,
      student: student,
      image: image,
      instructor: instructor,
      pm: pm,
      salt: salt,
    };
    User.create(newUser)
      .then((user) => {
        mailer.enviar_mail(newUser.name, newUser.email);
        return res.send(user.dataValues);
      })
      .catch((error) => {
        //Mandamos el error al error endware
        next(error);
      });
  } else {
    return res.send({ message: "Faltan campos obligatorios" });
  }
});

//Ruta obtener usuario por ID

server.get("/:id", async (req, res, next) => {
  let userId = req.params.id;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.send({
        message: `No se encontro el usuario con ID: ${userId}`,
      });
    }
    return res.send(user);
  } catch (error) {
    next(error);
  }
});

server.delete("/:id", (req, res, next) => {
  let userId = req.params.id;

  User.destroy({ where: { id: userId } })
    .then((num) => {
      if (num > 0) {
        return res.send({ message: `Se elimino usuario con ID ${userId}` });
      } else {
        return res.send({ message: `NO se elimino usuario con ID ${userId}` });
      }
    })
    .catch((err) => next(err));
});

//Actualizar Usuarios (Solo algunos campos)
server.put("/", async (req, res, next) => {
  const {
    name,
    lastname,
    city,
    province,
    country,
    password,
    email,
    student,
    pm,
    instructor,
    admin,
    image,
    googleId,
    gitHubId,
  } = req.body;
  const correo = req.body.email;

  try {
    //Valido que el usuario exista
    const user = await User.findOne({ where: { email: correo } });
    const libre = await User.findOne({
      where: { email: correo, status: "inhabilitado" },
    });
    const ocupado = await User.findOne({
      where: { email: correo, status: "habilitado" },
    });

    if (ocupado) {
      console.log("El MAIL ESTA OCUPADO", ocupado);
      return res.send("null"); //SI no existe el eamil
    }

    if (!user) {
      return res.send(false); //SI no existe el eamil
    }

    //actualizo el usuario con los campos enviados por body (si alguno no existe no lo actualiza)
    const updated = await user.update({
      name: name,
      lastName: lastname,
      city: city,
      province: province,
      country: country,
      password: password,
      email: email,
      status: "habilitado",
      student: student,
      pm: pm,
      instructor: instructor,
      admin: admin,
      image: image,
      googleId: googleId,
      gitHubId: gitHubId,
    });

    //envio el usuario actualizado
    return res.send(updated);
  } catch (error) {
    next(error);
  }
});

server.put("/myprofile/:id", async (req, res, next) => {
  const id = req.params.id;
  const userUp = req.body;
  User.findOne({
    where: {
      id: req.params.id,
    },
  }).then((user) => {
    user
      .update(userUp)
      .then((usuario) => {
        usuario.save();
        res.status(200);
        res.json(usuario);
      })
      .catch((err) => next(err));
  });
});

server.put("/passwordReset", (req, res, next) => {
  //const { id } = req.params;
  const { id } = req.body;
  const salt = crypto.randomBytes(64).toString("hex");
  const password = crypto
    .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
    .toString("base64");

  User.findByPk(id)
    .then((user) => {
      if (user) {
        user.password = password;
        user.salt = salt;
        return user.save();
      }
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => next(err));
});

// PASWORD RESET POR EMAIL
server.put("/passwordResetEmail", (req, res, next) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(64).toString("hex");
  const passwordResetEmail = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("base64");
  console.log(email, passwordResetEmail);

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        user.password = passwordResetEmail;
        user.salt = salt;
        return user.save();
      }
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => next(err));
});

//SOLICITAR NUEVA CLAVE POR PERDIDA
server.put("/passwordReques", (req, res, next) => {
  const salt = crypto.randomBytes(64).toString("hex");
  const password = crypto
    .pbkdf2Sync("XY4BP1Z6", salt, 10000, 64, "sha512")
    .toString("base64");

  const { email } = req.body;
  console.log("EL EMAILLLL ", email);

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        var passEnvio = "XY4BP1Z6";
        user.password = passEnvio;
        user.salt = salt;

        mailerPW.enviar_mail_req_pass(passEnvio, user.name, email);
        console.log("OBJETO de USERRRRR", user);

        return user.save();
      }
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => next(err));
});

module.exports = server;
