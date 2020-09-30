const server = require("express").Router();

const { Cohorte, User } = require("../db.js");

server.get("/", (req, res, next) => {
  Cohorte.findAll({
    order: [["id", "ASC"]],
    include: [
      {
        model: User,
        as: "instructor",
        attributes: ["name"],
      },
    ],
  })
    .then((cohortes) => {
      if (cohortes.length === 0) {
        return res.send({ message: "No se han creado cohortes" });
      }
      return res.send(cohortes);
    })
    .catch((error) => next(error));
});

server.get("/:id", (req, res, next) => {
  Cohorte.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        as: "instructor",
        attributes: ["name"],
      },
    ],
  })
    .then((chFound) => {
      res.json(chFound);
    })
    .catch(next);
});

server.post("/", (req, res, next) => {
  const { name, date, instructorId } = req.body; //falta date

  Cohorte.create({ name, date, instructorId }) //falta date
    .then((cohorte) => {
      res.send(cohorte);
    })
    .catch((error) => next(error));
});

server.delete("/:id", (req, res, next) => {
  console.log(req.params.id)
  const id = req.params.id;
  Cohorte.destroy({ where: { id: id } })
    .then((num) => {
      if (num > 0) {
        return res.send({ message: `Se elimino el Cohorte : ${id}` });
      }
      return res.send({
        message: `No se pudo eliminar el Cohorte: ${id}`,
      });
    })
    .catch((err) => next(err));
});

server.put("/:id", async (req, res, next) => {
  const idCohorte = req.params.id;
  console.log(idCohorte);
  console.log(req.body);
  const { instructorId, date } = req.body;

  try {
    const cohorte = await Cohorte.findOne(
      {
        where: {
          id: idCohorte
        }

      });
    if (!cohorte) {
      return res.send({
        message: `No se encontro el Cohorte: ${idCohorte}`,
      });
    }
    const cohorteUpdate = await cohorte.update({
      instructorId: instructorId,
      date: date,
    });
    return res.send(cohorteUpdate);
  } catch (error) {
    next(error);
  }
});

server.get("/instructor/:id", (req, res, next) => {
  Cohorte.findAll({
    where: {
      instructorId: req.params.id,
    },
  })
    .then((chFound) => {
      res.json(chFound);
    })
    .catch(next);
});
module.exports = server;
