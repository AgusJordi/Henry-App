const server = require("express").Router();

const { Group, User, Student } = require("../db.js");

server.get("/", (req, res, next) => {
  Group.findAll({
    include: [
      {
        model: User,
        as: "PM1",
        attributes: [
          "name",
          "lastName",
          "image",
          "province",
          "country",
          "email",
        ],
      },
      {
        model: User,
        as: "PM2",
        attributes: [
          "name",
          "lastName",
          "image",
          "province",
          "country",
          "email",
        ],
      },
    ],
  })
    .then((groups) => {
      if (groups.length === 0) {
        return res.send({ message: "No se crearon grupos" });
      }
      return res.send(groups);
    })
    .catch((error) => next(error));
});

server.get("/:id", (req, res, next) => {
  Group.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        as: "PM1",
        attributes: ["name", "lastName"],
      },
      {
        model: User,
        as: "PM2",
        attributes: ["name", "lastName"],
      },
    ],
  })
    .then((groups) => {
      if (groups.length === 0) {
        return res.send({ message: "No se crearon grupos" });
      }
      return res.send(groups);
    })
    .catch((error) => next(error));
});

server.post("/", (req, res, next) => {
  console.log(req.body);
  const { name, PM1Id, PM2Id, cohorteId } = req.body;
  Group.create({ name, PM1Id, PM2Id, cohorteId })
    .then((group) => {
      res.send(group);
    })
    .catch((error) => next(error));
});

server.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  const id = req.params.id;
  Group.destroy({ where: { id: id } })
    .then((num) => {
      console.log(num);
      if (num > 0) {
        return res.send({ message: `Se elimino el Grupo: ${id}` });
      }
      return res.send({
        message: `No se pudo eliminar el Grupo: ${id}`,
      });
    })
    .catch((error) => next(error));
});

server.put("/:id", async (req, res, next) => {
  const idGroup = req.params.id;
  console.log(req.body);
  const { PM1Id, PM2Id } = req.body;

  Group.findOne({
    where: {
      id: idGroup,
    },
  }).then((group) => {
    if (!group) {
      return res.send({
        message: `No se encontro el Grupo: ${idGroup}`,
      });
    }

    group
      .update({
        PM1Id: PM1Id,
        PM2Id: PM2Id,
      })
      .then((groupUp) => {
        groupUp.save();
        res.status(200);
        res.json(groupUp);
      })
      .catch((error) => {
        next(error);
      });
  });
});

// Ruta para crear grupos de forma masiva y asignar los estudiantes a esos grupos

server.post("/add", async (req, res, next) => {
  const { cohorteId, cantidadGrupos, usuariosHabilitados } = req.body;

  try {
    const students = usuariosHabilitados; //array de estudiantes habilitados de ese cohorte
    const idGroup = []; // id de grupos
    const cantidadStudents = students.length; //cantidad estudiantes

    for (let i = 0; i < cantidadGrupos; i++) {
      idGroup.push((await Group.create({ cohorteId })).dataValues.id);
    }

    for (let i = 0; i < idGroup.length; i++) {
      for (let j = 0; j < Math.floor(cantidadStudents / idGroup.length); j++) {
        //cuantos estudiantes hay x grupo
        const al = await Student.findByPk(students.shift().id);
        await al.update({ groupId: idGroup[i] });
      }
    }

    if (students) {
      //Caso en que la division tenga resto => Se mete los que sobran en el 1er grupo
      for (let i = 0; i < students.length; i++) {
        console.log("ultimo", students);
        const st = await Student.findByPk(students.shift().id);
        console.log("st", st);
        await st.update({ groupId: idGroup[0] });
      }
    }

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

module.exports = server;
